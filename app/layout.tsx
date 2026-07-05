import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteUrl } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "SAINT RIVIERA — The Private Society",
    template: "%s — SAINT RIVIERA",
  },
  description: "Moda quiet luxury brasileira, acesso privado, drops exclusivos e peças essenciais de presença.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "SAINT RIVIERA",
    title: "SAINT RIVIERA — The Private Society",
    description: "Moda quiet luxury brasileira, acesso privado, drops exclusivos e peças essenciais de presença.",
    images: [{
      url: "/assets/hero-riviera.webp",
      width: 1536,
      height: 1024,
      alt: "SAINT RIVIERA — The Private Society",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAINT RIVIERA — The Private Society",
    description: "Moda quiet luxury brasileira, acesso privado, drops exclusivos e peças essenciais de presença.",
    images: ["/assets/hero-riviera.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="grain" aria-hidden="true" />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
