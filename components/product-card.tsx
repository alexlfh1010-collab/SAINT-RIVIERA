import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatBRL } from "@/data/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="product-card">
      <Link className="product-card__image" href={`/produto/${product.slug}`}>
        <Image src={product.images[0]} alt={product.imageAlts?.[0] || product.name} fill sizes="(max-width: 720px) 50vw, 33vw" priority={priority} />
        {product.privateDrop && <span className="private-badge">Private drop</span>}
        <span className="view-piece">Ver peça</span>
      </Link>
      <div className="product-card__meta">
        <div><h3>{product.name}</h3><p>{product.colors.join(" · ")}</p></div>
        <span>{formatBRL(product.price)}</span>
      </div>
    </article>
  );
}
