import { timingSafeEqual } from "crypto";
import { after, NextResponse } from "next/server";
import { checkInfinitePayPayment } from "@/lib/infinitepay";
import { createAdminClient } from "@/lib/supabase/admin";

type WebhookPayload = {
  invoice_slug?: string; amount?: number; paid_amount?: number; capture_method?: string;
  transaction_nsu?: string; order_nsu?: string; receipt_url?: string;
};

async function processPayment(payload: WebhookPayload) {
  if (!payload.order_nsu || !payload.transaction_nsu || !payload.invoice_slug) return;
  const admin = createAdminClient();
  const { data: order } = await admin.from("orders").select("*").eq("order_nsu", payload.order_nsu).single();
  if (!order || order.status === "paid") return;

  // InfinitePay não documenta assinatura de webhook. A confirmação autoritativa é feita no payment_check.
  const confirmation = await checkInfinitePayPayment({ orderNsu: payload.order_nsu, transactionNsu: payload.transaction_nsu, slug: payload.invoice_slug });
  if (!confirmation?.success || !confirmation.paid || confirmation.amount !== order.amount) return;

  await admin.from("orders").update({
    status: "paid", paid_amount: confirmation.paid_amount, transaction_nsu: payload.transaction_nsu,
    infinitepay_slug: payload.invoice_slug, receipt_url: payload.receipt_url || null,
    capture_method: confirmation.capture_method, updated_at: new Date().toISOString(),
  }).eq("id", order.id);
  if (order.type === "membership" && order.user_id) await admin.rpc("activate_membership", { p_user_id: order.user_id, p_order_nsu: order.order_nsu });
}

export async function POST(request: Request) {
  const expectedToken = process.env.INFINITEPAY_WEBHOOK_SECRET?.trim();
  if (expectedToken) {
    const providedToken = new URL(request.url).searchParams.get("token") || "";
    const expected = Buffer.from(expectedToken);
    const provided = Buffer.from(providedToken);
    if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  let payload: WebhookPayload;
  try { payload = await request.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (!payload.order_nsu || !payload.transaction_nsu) return NextResponse.json({ ok: false }, { status: 400 });
  after(() => processPayment(payload));
  return NextResponse.json({ ok: true });
}
