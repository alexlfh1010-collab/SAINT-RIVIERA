import Image from "next/image";
import Link from "next/link";
export const metadata = { title: "Founder's Circle" };
export default function FoundersPage() {
  return <main className="founders-page"><section className="founders-hero"><div><p className="eyebrow">Founder&apos;s Circle · Primeira turma</p><h1>Os primeiros nomes<br /><em>ficam na história.</em></h1><p>O Founder&apos;s Circle é a primeira turma da The Private Society. São os membros que entram antes, validam os primeiros drops e recebem o selo de fundadores da SAINT RIVIERA.</p><Link className="button button--dark" href="/pagamento-redirecionando">Entrar para The Private Society <span>↗</span></Link></div><div className="founders-visual"><Image src="/assets/tobacco-blazer.webp" alt="Peça fundadora Saint Riviera" fill priority sizes="45vw" /><span><b>100</b> acessos fundadores</span></div></section><section className="founders-note"><span>01</span><p>Não é uma campanha temporária.<br />É um lugar permanente na origem da maison.</p></section></main>;
}
