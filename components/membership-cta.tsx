import Link from "next/link";

export function MembershipCTA({ className = "button button--dark" }: { className?: string }) {
  return <Link className={className} href="/cadastro">Entrar na Private Society <span>↗</span></Link>;
}
