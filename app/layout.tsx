import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteUrl } from "@/lib/env";

const siteUrl = getSiteUrl();
const socialImage = siteUrl ? `${siteUrl}/assets/hero-riviera.webp` : undefined;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "SAINT RIVIERA — The Private Society",
    template: "%s — SAINT RIVIERA",
  },
  description: "Moda quiet luxury brasileira, acesso privado, drops exclusivos e peças essenciais de presença.",
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    ...(siteUrl ? { url: siteUrl } : {}),
    siteName: "SAINT RIVIERA",
    title: "SAINT RIVIERA — The Private Society",
    description: "Moda quiet luxury brasileira, acesso privado, drops exclusivos e peças essenciais de presença.",
    ...(socialImage ? { images: [{ url: socialImage, width: 1536, height: 1024, alt: "SAINT RIVIERA — The Private Society" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "SAINT RIVIERA — The Private Society",
    description: "Moda quiet luxury brasileira, acesso privado, drops exclusivos e peças essenciais de presença.",
    ...(socialImage ? { images: [socialImage] } : {}),
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
