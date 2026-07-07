import Link from "next/link";

export function MembershipCTA({ className = "button button--dark" }: { className?: string }) {
  return <Link className={className} href="/pagamento-redirecionando">Entrar para The Private Society <span>↗</span></Link>;
}
