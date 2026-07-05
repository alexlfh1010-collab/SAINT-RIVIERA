import Link from "next/link";
import { requireMember } from "@/lib/profile";
import { MemberHeading } from "@/components/member-heading";
export const metadata = { title: "Painel do membro" };
export default async function DashboardPage() {
  const p = await requireMember();
  return <><MemberHeading eyebrow="Visão geral" title={`Bem-vindo, ${p.fullName.split(" ")[0]}.`}><div className="member-status"><span>Status</span><b>{p.status === "founder" ? "Founder’s Circle" : "Membro Private"}</b></div></MemberHeading><section className="dashboard-grid"><article className="credit-card"><span>Crédito disponível</span><strong>{new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(p.creditBalance)}</strong><p>Renovação mensal Private Society</p><Link href="/membro/creditos">Ver histórico →</Link></article><article><span>Próximo private drop</span><h2>Riviera Nocturne</h2><p>Pré-acesso em 12 dias</p><Link href="/membro/private-drops">Entrar na sala →</Link></article><article><span>Seu código privado</span><h2>{p.referralCode}</h2><p>Convide alguém que entende.</p><Link href="/membro/indicacoes">Compartilhar acesso →</Link></article></section><section className="member-benefits"><p className="eyebrow">Benefícios ativos</p><div><span>Acesso 48h antes</span><span>Frete liberado</span><span>Prioridade em reposições</span><span>Condições privadas</span></div></section></>;
}
