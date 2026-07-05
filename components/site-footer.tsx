import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="wordmark wordmark--footer" href="/">SAINT <i>R</i>IVIERA</Link>
      <div className="footer-grid">
        <p>Quiet luxury · Riviera lifestyle<br />Private Society</p>
        <div><Link href="/colecoes">Coleções</Link><Link href="/homens">Homens</Link><Link href="/mulheres">Mulheres</Link></div>
        <div><Link href="/the-private-society">Private Society</Link><Link href="/founders-circle">Founder&apos;s Circle</Link><Link href="/inside">Inside</Link></div>
        <div><Link href="/login">Acesso privado</Link><Link href="/concierge">Concierge</Link><Link href="/admin">Administração</Link></div>
      </div>
      <div className="footer-legal"><span>© 2026 SAINT RIVIERA</span><span>São Paulo · Riviera</span></div>
    </footer>
  );
}
