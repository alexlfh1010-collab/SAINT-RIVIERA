import Link from "next/link";
import { getOptionalMembershipLink } from "@/lib/env";

export const metadata = { title: "Pagamento pendente" };

export default function PendingPage() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const message = encodeURIComponent("Ol\u00e1, acabei de solicitar minha entrada na The Private Society e gostaria de acompanhar a confirma\u00e7\u00e3o.");
  const membershipLink = getOptionalMembershipLink();

  return (
    <main className="pending-page">
      <span className="pending-seal">SR</span>
      <p className="eyebrow">The Private Society &middot; Pagamento</p>
      <h1>Entrada em<br /><em>an&aacute;lise.</em></h1>
      <p>Recebemos sua solicita&ccedil;&atilde;o de entrada na The Private Society. Assim que o pagamento for confirmado, seu acesso privado ser&aacute; liberado.</p>
      <div className="payment-actions">
        {membershipLink && <a className="button button--dark" href={membershipLink}>Finalizar pagamento <span>↗</span></a>}
        {phone ? <a className="button button--line" href={"https://wa.me/" + phone + "?text=" + message} target="_blank" rel="noreferrer">Falar com o Concierge <span>↗</span></a> : <Link className="button button--line" href="/concierge">Falar com o Concierge <span>↗</span></Link>}
      </div>
      <Link href="/the-private-society">Voltar para The Private Society</Link>
    </main>
  );
}
