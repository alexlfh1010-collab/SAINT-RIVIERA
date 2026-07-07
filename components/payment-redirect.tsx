"use client";

import Link from "next/link";
import { useEffect } from "react";

type PaymentRedirectProps = {
  membershipLink: string | null;
  conciergeHref: string;
};

export function PaymentRedirect({ membershipLink, conciergeHref }: PaymentRedirectProps) {
  useEffect(() => {
    if (!membershipLink) return;
    const redirectTimer = window.setTimeout(() => window.location.assign(membershipLink), 1600);
    return () => window.clearTimeout(redirectTimer);
  }, [membershipLink]);

  const externalConcierge = conciergeHref.startsWith("https://");

  return (
    <main className="pending-page payment-redirect">
      <span className="pending-seal">SR</span>
      <p className="eyebrow">The Private Society &middot; Pagamento seguro</p>
      <h1>Seu acesso foi<br /><em>iniciado.</em></h1>
      <p>Estamos abrindo o ambiente seguro de pagamento da InfinitePay.</p>
      <p className="payment-redirect__note">Se o redirecionamento não acontecer, use o botão abaixo para continuar.</p>
      {membershipLink ? <span className="payment-loader" role="status" aria-label="Redirecionando para o pagamento"><span /></span> : <p className="payment-redirect__note">Pagamento em preparação. Fale com o Concierge para liberar seu acesso.</p>}
      <div className="payment-actions">
        {membershipLink ? <a className="button button--dark" href={membershipLink}>Finalizar pagamento <span>↗</span></a> : <Link className="button button--dark" href="/pagamento-pendente">Acompanhar solicitação <span>↗</span></Link>}
        <a className="button button--line" href={conciergeHref} target={externalConcierge ? "_blank" : undefined} rel={externalConcierge ? "noreferrer" : undefined}>Falar com o Concierge <span>↗</span></a>
      </div>
      {!membershipLink && <Link href="/pagamento-pendente">Ir para pagamento pendente</Link>}
    </main>
  );
}
