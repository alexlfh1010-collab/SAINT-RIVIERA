"use client";

import { useState } from "react";
import type { Product } from "@/types";

export function ProductPurchase({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [loading, setLoading] = useState(false);

  async function checkout() {
    setLoading(true);
    try {
      const response = await fetch("/api/infinitepay/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1, size, color }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível abrir o checkout.");
      window.location.href = data.checkoutUrl;
    } catch (error) {
      alert(error instanceof Error ? error.message : "Tente novamente em instantes.");
      setLoading(false);
    }
  }

  const message = encodeURIComponent(`Olá, quero ajuda para escolher meu tamanho e montar meu look SAINT RIVIERA. Tenho interesse em: ${product.name}.`);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const conciergeHref = phone ? `https://wa.me/${phone}?text=${message}` : "/concierge";

  return (
    <div className="purchase-panel">
      <div className="option-group"><span>Tamanho</span><div>{product.sizes.map((item) => <button className={size === item ? "selected" : ""} onClick={() => setSize(item)} type="button" key={item}>{item}</button>)}</div></div>
      <div className="option-group"><span>Cor</span><div>{product.colors.map((item) => <button className={color === item ? "selected" : ""} onClick={() => setColor(item)} type="button" key={item}>{item}</button>)}</div></div>
      <button className="button button--dark purchase-button" type="button" onClick={checkout} disabled={loading}>{loading ? "Preparando checkout…" : "Comprar agora"}<span>↗</span></button>
      <a className="button button--line purchase-button" href={conciergeHref} target={phone ? "_blank" : undefined} rel={phone ? "noreferrer" : undefined}>Falar com o Concierge <span>↗</span></a>
      <p>Pagamento seguro via InfinitePay · Até 12x</p>
    </div>
  );
}
