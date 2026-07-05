import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatBRL, getProductBySlug, products } from "@/data/products";
import { ProductPurchase } from "@/components/product-purchase";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProductBySlug((await params).slug);
  return { title: product?.name || "Produto" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();
  return (
    <main className="product-page">
      <div className="product-gallery"><Image src={product.images[0]} alt={product.name} fill priority sizes="65vw" /></div>
      <section className="product-details">
        <p className="eyebrow">{product.privateDrop ? "Private drop" : "Coleção permanente"}</p>
        <h1>{product.name}</h1>
        <p className="product-price">{formatBRL(product.price)}</p>
        <p className="product-description">{product.description}</p>
        <ProductPurchase product={product} />
        <details><summary>Matéria & cuidado</summary><p>Construção de toque premium e acabamento considerado. Lavar conforme etiqueta interna; guardar com espaço para preservar a forma.</p></details>
        <details><summary>Entrega & trocas</summary><p>Frete liberado para membros Private. A primeira troca pode ser solicitada pelo Concierge.</p></details>
        <Link className="back-link" href="/colecoes">← Voltar à coleção</Link>
      </section>
    </main>
  );
}
