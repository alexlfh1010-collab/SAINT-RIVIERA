import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types";

export function CatalogPage({
  eyebrow, title, description, filter,
}: {
  eyebrow: string;
  title: string;
  description: string;
  filter?: (product: Product) => boolean;
}) {
  const visible = filter ? products.filter(filter) : products;
  return (
    <main className="page-shell">
      <header className="catalog-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <div className="catalog-toolbar"><span>{visible.length.toString().padStart(2, "0")} peças</span><span>Curadoria permanente</span></div>
      <section className="catalog-grid" aria-label={title}>
        {visible.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 3} />)}
      </section>
    </main>
  );
}
