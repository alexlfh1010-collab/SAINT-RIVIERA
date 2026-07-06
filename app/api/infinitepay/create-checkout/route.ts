import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { createInfinitePayCheckout } from "@/lib/infinitepay";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

type CheckoutBody = {
  userId?: string; productId?: string; quantity?: number; size?: string; color?: string;
  customer?: { name?: string; email?: string; phone_number?: string };
  address?: { cep?: string; street?: string; neighborhood?: string; number?: string; complement?: string };
};

export async function POST(request: Request) {
  try {
    const body = await request.json() as CheckoutBody;
    const product = products.find((item) => item.id === body.productId);
    const quantity = Math.max(1, Math.min(5, Number(body.quantity || 1)));
    if (!product) return NextResponse.json({ error: "Produto não encontrado." }, { status: 404 });
    if (!body.size || !product.sizes.includes(body.size as never)) return NextResponse.json({ error: "Tamanho inválido." }, { status: 400 });
    if (!body.color || !product.colors.includes(body.color)) return NextResponse.json({ error: "Cor inválida." }, { status: 400 });
    if (!process.env.INFINITEPAY_HANDLE) return NextResponse.json({ error: "Checkout de produtos aguardando configuração da InfinitePay." }, { status: 503 });
    if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: "Banco de pedidos ainda não configurado." }, { status: 503 });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id || null;
    if (body.userId && userId && body.userId !== userId) return NextResponse.json({ error: "Usuário inválido." }, { status: 403 });
    const orderNsu = `product-${randomUUID()}`;
    const amount = product.price * quantity;
    const admin = createAdminClient();
    const { error: orderError } = await admin.from("orders").insert({
      user_id: userId, type: "product", status: "pending", amount, order_nsu: orderNsu,
      metadata: { product_id: product.id, quantity, size: body.size, color: body.color },
    });
    if (orderError) throw new Error("Não foi possível registrar o pedido.");

    const customer = body.customer?.name && body.customer.email ? {
      name: body.customer.name,
      email: body.customer.email,
      ...(body.customer.phone_number ? { phone_number: body.customer.phone_number } : {}),
    } : undefined;
    const address = body.address?.cep && body.address.street && body.address.neighborhood && body.address.number ? {
      cep: body.address.cep, street: body.address.street, neighborhood: body.address.neighborhood, number: body.address.number,
      ...(body.address.complement ? { complement: body.address.complement } : {}),
    } : undefined;
    const checkout = await createInfinitePayCheckout({
      orderNsu,
      items: [{ quantity, price: product.price, description: `${product.name} · ${body.size} · ${body.color}` }],
      customer,
      address,
      siteUrl: new URL(request.url).origin,
    });
    return NextResponse.json({ checkoutUrl: checkout.checkoutUrl, orderNsu });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao criar checkout." }, { status: 500 });
  }
}
