import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";

export default function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <Image src="/assets/hero-riviera.webp" alt="Alfaiataria Saint Riviera sob uma colunata mediterrânea" fill priority sizes="100vw" />
        <div className="home-hero__shade" />
        <div className="home-hero__copy">
          <p className="eyebrow">Primavera / Verão 2026</p>
          <h1>Uma certa forma<br />de <em>viver.</em></h1>
          <Link className="text-link text-link--light" href="/colecoes">Ver coleção <span>↗</span></Link>
        </div>
        <p className="coordinates">Cap d&apos;Antibes<br />43.564° N</p>
      </section>

      <section className="maison-statement content-section">
        <span className="section-number">01 / La Maison</span>
        <div>
          <p className="eyebrow">A filosofia Saint Riviera</p>
          <h2>Luxo não é o que se vê.<br /><em>É o que se entende.</em></h2>
          <p className="body-copy">Nascida entre a calma do Mediterrâneo e a precisão da alfaiataria atemporal, a SAINT RIVIERA cria para uma vida conduzida com intenção. Cada peça é considerada. Nada é incidental.</p>
          <Link className="text-link" href="/inside">Conhecer a maison <span>↗</span></Link>
        </div>
      </section>

      <section className="featured-products content-section">
        <div className="section-heading">
          <div><p className="eyebrow">A coleção permanente</p><h2>Objetos de <em>desejo.</em></h2></div>
          <p className="body-copy">Um guarda-roupa construído sem pressa.<br />Produzido em quantidades consideradas.</p>
        </div>
        <div className="home-product-grid">{products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}</div>
        <Link className="button button--line" href="/colecoes">Ver toda a coleção <span>↗</span></Link>
      </section>

      <section className="society-block">
        <Image src="/assets/private-salon.webp" alt="Salão privado na Riviera ao anoitecer" fill sizes="100vw" />
        <div className="society-block__shade" />
        <div className="society-block__copy">
          <p className="eyebrow">Além do guarda-roupa</p>
          <h2>The Private<br /><em>Society.</em></h2>
          <p>Você não paga para entrar. Você ganha acesso — crédito mensal, drops privados e um mundo revelado com discrição.</p>
          <Link className="button button--light" href="/pagamento-redirecionando">Entrar para The Private Society <span>↗</span></Link>
        </div>
      </section>

      <section className="inside-preview content-section">
        <div><p className="eyebrow">Inside Saint Riviera · Edição 04</p><h2>Entre a luz<br />e o <em>silêncio.</em></h2></div>
        <article>
          <div className="inside-preview__image"><Image src="/assets/private-salon.webp" alt="Arquitetura da Riviera à noite" fill sizes="60vw" /></div>
          <div><p className="eyebrow">Lugares · Ensaio 06</p><h3>As horas entre luzes.</h3><p>Sobre a hora azul, a pedra antiga e o silêncio particular que chega antes do jantar na costa.</p><Link className="text-link" href="/inside">Ler a história <span>↗</span></Link></div>
        </article>
      </section>
    </main>
  );
}
