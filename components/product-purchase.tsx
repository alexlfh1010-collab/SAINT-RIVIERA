"use client";

import { useRef, useState } from "react";
import { formatBRL } from "@/data/products";
import type { Product } from "@/types";
import { getInfinitePayPaymentLink, getWhatsAppLink } from "@/lib/env";

export function ProductPurchase({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [loading, setLoading] = useState(false);
  const [showPix, setShowPix] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const pixTextareaRef = useRef<HTMLTextAreaElement>(null);

  const pixCopyPaste = product.pixCopyPaste?.trim();
  const paymentHref = getInfinitePayPaymentLink(product.paymentLink);
  const hasExplicitEmptyPaymentLink = product.paymentLink !== undefined && !product.paymentLink.trim();
  const conciergeHref =
    getWhatsAppLink(
      `Olá, quero ajuda para escolher meu tamanho e montar meu look SAINT RIVIERA. Tenho interesse em: ${product.name}.`,
    ) || "/concierge";
  const externalConcierge = conciergeHref.startsWith("https://");
  const purchaseFallbackHref =
    getWhatsAppLink(`Olá, quero comprar o ${product.name} da SAINT RIVIERA. Tamanho: ${size}. Cor: ${color}.`) ||
    conciergeHref;
  const externalPurchaseFallback = purchaseFallbackHref.startsWith("https://");
  const proofProductName = product.slug === "camisa-elise-off-white" ? "Camisa Élise Off-White" : product.name;
  const proofHref = getWhatsAppLink(
    `Olá, acabei de pagar via Pix a ${proofProductName} da SAINT RIVIERA. Quero enviar meu comprovante.`,
  );
  const externalProof = proofHref?.startsWith("https://") ?? false;

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

  async function copyPixCode() {
    if (!pixCopyPaste) return;

    let copied = false;

    try {
      const textarea = pixTextareaRef.current || document.createElement("textarea");
      const shouldRemove = !pixTextareaRef.current;
      textarea.value = pixCopyPaste;
      textarea.setAttribute("readonly", "");

      if (shouldRemove) {
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
      }

      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      copied = document.execCommand("copy");

      if (shouldRemove) document.body.removeChild(textarea);
    } catch {
      copied = false;
    }

    if (!copied && navigator.clipboard?.writeText && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(pixCopyPaste);
        copied = true;
      } catch {
        copied = false;
      }
    }

    setCopyStatus(copied || pixTextareaRef.current ? "Código Pix copiado." : "Não foi possível copiar automaticamente. Selecione o código Pix.");
  }

  return (
    <div className="purchase-panel">
      <div className="option-group">
        <span>Tamanho</span>
        <div>
          {product.sizes.map((item) => (
            <button className={size === item ? "selected" : ""} onClick={() => setSize(item)} type="button" key={item}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="option-group">
        <span>Cor</span>
        <div>
          {product.colors.map((item) => (
            <button className={color === item ? "selected" : ""} onClick={() => setColor(item)} type="button" key={item}>
              {item}
            </button>
          ))}
        </div>
      </div>
      {paymentHref ? (
        <a className="button button--dark purchase-button" href={paymentHref}>
          Comprar agora <span>↗</span>
        </a>
      ) : hasExplicitEmptyPaymentLink ? (
        <a
          className="button button--dark purchase-button"
          href={purchaseFallbackHref}
          target={externalPurchaseFallback ? "_blank" : undefined}
          rel={externalPurchaseFallback ? "noreferrer" : undefined}
        >
          Comprar agora <span>↗</span>
        </a>
      ) : (
        <button className="button button--dark purchase-button" type="button" onClick={checkout} disabled={loading}>
          {loading ? "Preparando checkout…" : "Comprar agora"} <span>↗</span>
        </button>
      )}
      {pixCopyPaste && (
        <>
          <button
            className="button button--line purchase-button"
            type="button"
            onClick={() => setShowPix((current) => !current)}
            aria-expanded={showPix}
          >
            Pagar com Pix <span>↓</span>
          </button>
          {showPix && (
            <section className="pix-payment" aria-label="Pagamento via Pix Copia e Cola">
              <div className="pix-payment__meta">
                <span>Valor</span>
                <strong>{formatBRL(product.price)}</strong>
              </div>
              <label htmlFor={`pix-code-${product.slug}`}>Pix Copia e Cola</label>
              <textarea
                id={`pix-code-${product.slug}`}
                ref={pixTextareaRef}
                value={pixCopyPaste}
                readOnly
                aria-label="Código Pix Copia e Cola"
              />
              <button className="button button--dark purchase-button" type="button" onClick={copyPixCode}>
                Copiar código Pix <span>→</span>
              </button>
              {copyStatus && (
                <p className="pix-payment__status" aria-live="polite">
                  {copyStatus}
                </p>
              )}
              <p className="pix-payment__note">
                Após o pagamento, envie o comprovante para o Concierge para liberação do pedido.
              </p>
              {proofHref ? (
                <a
                  className="button button--line purchase-button"
                  href={proofHref}
                  target={externalProof ? "_blank" : undefined}
                  rel={externalProof ? "noreferrer" : undefined}
                >
                  Enviar comprovante pelo WhatsApp <span>↗</span>
                </a>
              ) : (
                <p className="pix-payment__fallback">Concierge temporariamente indisponível.</p>
              )}
            </section>
          )}
        </>
      )}
      <a
        className="button button--line purchase-button"
        href={conciergeHref}
        target={externalConcierge ? "_blank" : undefined}
        rel={externalConcierge ? "noreferrer" : undefined}
      >
        Falar com o Concierge <span>↗</span>
      </a>
      <p>Pagamento seguro via InfinitePay · Até 12x</p>
    </div>
  );
}
