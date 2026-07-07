import Link from "next/link";
import { getWhatsAppLink } from "@/lib/env";

export const metadata = { title: "Pagamento pendente" };

export default function PendingPage() {
  const conciergeHref = getWhatsAppLink("Olá, concluí meu pagamento da The Private Society e gostaria de acompanhar a liberação do meu acesso.") || "/concierge";
  const externalConcierge = conciergeHref.startsWith("https://");

  return (
    <main className="pending-page">
      <span className="pending-seal">SR</span>
      <p className="eyebrow">The Private Society &middot; Confirmação</p>
      <h1>Sua solicitação<br /><em>foi recebida.</em></h1>
      <p>Assim que o pagamento for confirmado, seu acesso à The Private Society será liberado. Você receberá a confirmação pelo e-mail ou WhatsApp informado no checkout.</p>
      <div className="payment-actions">
        <a className="button button--dark" href={conciergeHref} target={externalConcierge ? "_blank" : undefined} rel={externalConcierge ? "noreferrer" : undefined}>Falar com o Concierge <span>↗</span></a>
      </div>
      <Link href="/the-private-society">Voltar para The Private Society</Link>
    </main>
  );
}
