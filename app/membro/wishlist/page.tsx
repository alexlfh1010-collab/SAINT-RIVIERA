import { MemberHeading } from "@/components/member-heading";import { products } from "@/data/products";import { ProductCard } from "@/components/product-card";
export default function WishlistPage(){return <><MemberHeading eyebrow="Seleção reservada" title="Sua wishlist."/><div className="member-product-grid">{products.slice(3,5).map(p=><ProductCard key={p.id} product={p}/>)}</div></>}
