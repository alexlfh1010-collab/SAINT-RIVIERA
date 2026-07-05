import Link from "next/link";
import { requireMember } from "@/lib/profile";
import { logout } from "@/app/(auth)/actions";

export const dynamic = "force-dynamic";

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireMember();
  return <main className="member-shell"><aside><p className="eyebrow">Área privada</p><h2>{profile.fullName}</h2><span>{profile.status === "founder" ? "Founder’s Circle" : "Membro Private"}</span><nav><Link href="/membro/dashboard">Visão geral</Link><Link href="/membro/creditos">Créditos</Link><Link href="/membro/private-drops">Private drops</Link><Link href="/membro/indicacoes">Indicações</Link><Link href="/membro/wishlist">Wishlist</Link></nav><form action={logout}><button type="submit">Sair do acesso</button></form></aside><div className="member-content">{children}</div></main>;
}
