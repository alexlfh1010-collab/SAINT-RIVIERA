import { PaymentRedirect } from "@/components/payment-redirect";
import { getOptionalMembershipLink } from "@/lib/env";

export const metadata = { title: "Finalizar entrada" };

export default function PaymentRedirectPage() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const message = encodeURIComponent("Ol\u00e1, iniciei meu acesso \u00e0 The Private Society e preciso de ajuda para finalizar o pagamento.");
  const membershipLink = getOptionalMembershipLink();
  const conciergeHref = phone ? "https://wa.me/" + phone + "?text=" + message : "/concierge";

  return <PaymentRedirect membershipLink={membershipLink} conciergeHref={conciergeHref} />;
}
