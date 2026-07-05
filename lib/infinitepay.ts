import { getSiteUrl } from "@/lib/env";

type CheckoutItem = { quantity: number; price: number; description: string };
type Customer = { name: string; email: string; phone_number?: string };
type Address = { cep: string; street: string; neighborhood: string; number: string; complement?: string };

export async function createInfinitePayCheckout(input: {
  orderNsu: string;
  items: CheckoutItem[];
  customer?: Customer;
  address?: Address;
}) {
  const handle = process.env.INFINITEPAY_HANDLE;
  if (!handle) throw new Error("INFINITEPAY_HANDLE não configurado.");
  const webhookUrl = new URL(`${getSiteUrl()}/api/webhooks/infinitepay`);
  const webhookSecret = process.env.INFINITEPAY_WEBHOOK_SECRET?.trim();
  if (webhookSecret) webhookUrl.searchParams.set("token", webhookSecret);

  const response = await fetch("https://api.checkout.infinitepay.io/links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      handle,
      items: input.items,
      order_nsu: input.orderNsu,
      redirect_url: `${getSiteUrl()}/pagamento-pendente`,
      webhook_url: webhookUrl.toString(),
      ...(input.customer ? { customer: input.customer } : {}),
      ...(input.address ? { address: input.address } : {}),
    }),
    cache: "no-store",
  });

  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) throw new Error(String(data.message || "Não foi possível criar o checkout InfinitePay."));
  const checkoutUrl = data.url || data.checkout_url || data.link;
  if (typeof checkoutUrl !== "string") throw new Error("A InfinitePay não retornou uma URL de checkout.");
  return { checkoutUrl, raw: data };
}

export async function checkInfinitePayPayment(input: { orderNsu: string; transactionNsu: string; slug: string }) {
  const handle = process.env.INFINITEPAY_HANDLE;
  if (!handle) return null;
  const response = await fetch("https://api.checkout.infinitepay.io/payment_check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      handle,
      order_nsu: input.orderNsu,
      transaction_nsu: input.transactionNsu,
      slug: input.slug,
    }),
    cache: "no-store",
  });
  if (!response.ok) return null;
  return response.json() as Promise<{ success: boolean; paid: boolean; amount: number; paid_amount: number; capture_method: string }>;
}
