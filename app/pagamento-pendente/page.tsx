import Link from "next/link";
import { getOptionalMembershipLink, getWhatsAppLink } from "@/lib/env";

export const metadata = { title: "Pagamento pendente" };

export default function PendingPage() {
  const membershipLink = getOptionalMembershipLink();
  const conciergeHref = getWhatsAppLink("Olá, acabei de solicitar minha entrada na The Private Society e gostaria de acompanhar a confirmação.") || "/concierge";
  const externalConcierge = conciergeHref.startsWith("https://");

  return (
    <main className="pending-page">
      <span className="pending-seal">SR</span>
      <p className="eyebrow">The Private Society &middot; Pagamento</p>
      <h1>Entrada em<br /><em>análise.</em></h1>
      <p>Recebemos sua solicitação de entrada na The Private Society. Assim que o pagamento for confirmado, seu acesso privado será liberado.</p>
      <div className="payment-actions">
        {membershipLink && <a className="button button--dark" href={membershipLink}>Finalizar pagamento <span>↗</span></a>}
        <a className="button button--line" href={conciergeHref} target={externalConcierge ? "_blank" : undefined} rel={externalConcierge ? "noreferrer" : undefined}>Falar com o Concierge <span>↗</span></a>
      </div>
      <Link href="/the-private-society">Voltar para The Private Society</Link>
    </main>
  );
}
