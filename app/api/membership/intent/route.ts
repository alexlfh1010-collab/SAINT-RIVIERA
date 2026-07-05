import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getMembershipLink, isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createInfinitePayCheckout } from "@/lib/infinitepay";

export async function POST() {
  let fixedMembershipLink: string;
  try {
    fixedMembershipLink = getMembershipLink();
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "InfinitePay ainda não configurada." }, { status: 503 });
  }
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase ainda não configurado." }, { status: 503 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Faça login para continuar." }, { status: 401 });
  const admin = createAdminClient();
  const orderNsu = `membership-${randomUUID()}`;
  const { error } = await admin.from("orders").insert({
    user_id: user.id,
    type: "membership",
    status: "pending",
    amount: 2999,
    order_nsu: orderNsu,
    metadata: { source: "fixed-membership-link" },
  });
  if (error) return NextResponse.json({ error: "Não foi possível registrar sua solicitação." }, { status: 500 });
  await admin.from("profiles").update({ infinitepay_order_nsu: orderNsu, updated_at: new Date().toISOString() }).eq("id", user.id);

  let checkoutUrl = fixedMembershipLink;
  if (process.env.INFINITEPAY_HANDLE) {
    try {
      const checkout = await createInfinitePayCheckout({
        orderNsu,
        items: [{ quantity: 1, price: 2999, description: "Acesso The Private Society" }],
        customer: {
          name: String(user.user_metadata.full_name || "Membro SAINT RIVIERA"),
          email: user.email || "",
          ...(user.user_metadata.whatsapp ? { phone_number: String(user.user_metadata.whatsapp) } : {}),
        },
      });
      checkoutUrl = checkout.checkoutUrl;
      await admin.from("orders").update({ metadata: { source: "integrated-checkout" } }).eq("order_nsu", orderNsu);
    } catch (checkoutError) {
      await admin.from("orders").update({ metadata: { source: "fixed-membership-link", checkout_error: checkoutError instanceof Error ? checkoutError.message : "unknown" } }).eq("order_nsu", orderNsu);
      return NextResponse.json({ error: "Não foi possível iniciar o checkout seguro. Tente novamente em instantes." }, { status: 502 });
    }
  }

  return NextResponse.json({ checkoutUrl, pendingUrl: "/pagamento-pendente", orderNsu });
}
