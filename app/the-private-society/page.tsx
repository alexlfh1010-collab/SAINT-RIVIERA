import Image from "next/image";
import Link from "next/link";
import { MembershipCTA } from "@/components/membership-cta";

const benefits = ["R$30 em crédito mensal", "Acesso 48h antes do público", "Frete liberado para membros", "Prioridade em reposições", "Condições privadas", "Link privado de indicação", "Status de membro"];

export const metadata = { title: "The Private Society" };
export default function ThePrivateSocietyPage() {
  return (
    <main className="society-page">
      <section className="society-page__hero">
        <Image src="/assets/private-salon.webp" alt="The Private Society" fill priority sizes="100vw" />
        <div /><div className="society-page__hero-copy"><p className="eyebrow">The Private Society · SAINT RIVIERA</p><h1>Você não paga para entrar.<br /><em>Você ganha acesso.</em></h1><MembershipCTA className="button button--light" /></div>
      </section>
      <section className="society-intro content-section">
        <span className="section-number">Acesso / 0826</span>
        <div><p className="eyebrow">Um círculo, não um programa</p><h2>Um acesso que devolve<br /><em>valor em presença.</em></h2><p>Por R$29,99/mês, você recebe R$30 em crédito mensal, acesso antecipado aos drops, prioridade nas reposições e condições privadas dentro da SAINT RIVIERA.</p></div>
      </section>
      <section className="benefit-grid content-section">{benefits.map((benefit, index) => <article key={benefit}><span>0{index + 1}</span><h3>{benefit}</h3></article>)}</section>
      <section className="society-closing"><p className="eyebrow">A porta está entreaberta</p><h2>Vista presença.<br /><em>Entre antes.</em></h2><MembershipCTA /><Link href="/founders-circle">Conhecer o Founder&apos;s Circle →</Link></section>
    </main>
  );
}
