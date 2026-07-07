import Link from "next/link";
import { getWhatsAppLink } from "@/lib/env";

export const metadata = { title: "Ativar acesso" };

export default function SignupPage() {
  const conciergeHref = getWhatsAppLink("Olá, já concluí meu pagamento da The Private Society e preciso liberar meu acesso.") || "/concierge";
  const externalConcierge = conciergeHref.startsWith("https://");

  return (
    <main className="auth-page">
      <section>
        <p className="eyebrow">Acesso pós-pagamento</p>
        <h1>Primeiro,<br /><em>a entrada.</em></h1>
        <p>O cadastro com senha é liberado somente depois da confirmação do pagamento. Se você já concluiu sua assinatura, fale com o Concierge para ativar seu acesso privado.</p>
      </section>
      <div className="auth-form">
        <p className="eyebrow">The Private Society</p>
        <p>Nenhum dado ou senha é solicitado antes do checkout seguro da InfinitePay.</p>
        <Link className="button button--dark" href="/pagamento-redirecionando">Entrar para The Private Society <span>↗</span></Link>
        <a className="button button--line" href={conciergeHref} target={externalConcierge ? "_blank" : undefined} rel={externalConcierge ? "noreferrer" : undefined}>Falar com o Concierge <span>↗</span></a>
        <p>Já é membro? <Link href="/login">Entrar no acesso privado</Link></p>
      </div>
    </main>
  );
}
