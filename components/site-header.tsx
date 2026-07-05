"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  ["/colecoes", "Coleções"],
  ["/homens", "Homens"],
  ["/mulheres", "Mulheres"],
  ["/the-private-society", "The Private Society"],
  ["/inside", "Inside Saint Riviera"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solid = scrolled || pathname !== "/";

  return (
    <>
      <header className={`site-header ${solid ? "site-header--solid" : ""}`}>
        <button className="menu-trigger" type="button" onClick={() => setOpen(true)} aria-label="Abrir menu">
          <span /><span />
        </button>
        <Link className="wordmark" href="/" aria-label="SAINT RIVIERA, início">SAINT <i>R</i>IVIERA</Link>
        <Link className="member-link" href="/login">Acesso privado</Link>
      </header>
      <aside className={`menu-panel ${open ? "menu-panel--open" : ""}`} aria-hidden={!open}>
        <div className="menu-panel__top">
          <span className="eyebrow">SAINT RIVIERA</span>
          <button type="button" onClick={() => setOpen(false)}>Fechar</button>
        </div>
        <nav aria-label="Navegação principal">
          {links.map(([href, label], index) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</Link>
          ))}
        </nav>
        <div className="menu-panel__bottom">
          <p>Vista presença.<br />Entre antes.</p>
          <Link href="/concierge" onClick={() => setOpen(false)}>Falar com o Concierge ↗</Link>
        </div>
      </aside>
    </>
  );
}
