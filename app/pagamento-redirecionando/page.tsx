import { PaymentRedirect } from "@/components/payment-redirect";
import { getOptionalMembershipLink, getWhatsAppLink } from "@/lib/env";

export const metadata = { title: "Finalizar entrada" };

export default function PaymentRedirectPage() {
  const membershipLink = getOptionalMembershipLink();
  const conciergeHref = getWhatsAppLink("Olá, iniciei meu acesso à The Private Society e preciso de ajuda para finalizar o pagamento.") || "/concierge";

  return <PaymentRedirect membershipLink={membershipLink} conciergeHref={conciergeHref} />;
}
