import { NextResponse } from "next/server";
import { getMembershipLink } from "@/lib/env";

export async function POST() {
  const checkoutUrl = getMembershipLink();
  if (!checkoutUrl) {
    return NextResponse.json({ error: "Pagamento temporariamente indisponível. Fale com o Concierge." }, { status: 503 });
  }

  return NextResponse.json({ checkoutUrl, pendingUrl: "/pagamento-pendente" });
}
