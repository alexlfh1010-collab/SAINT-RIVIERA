import { CatalogPage } from "@/components/catalog-page";
export const metadata = { title: "Mulheres" };
export default function Page() { return <CatalogPage eyebrow="Saint Riviera Femme" title="Força em voz baixa." description="Linhas fluidas, matéria luminosa e uma feminilidade segura de si." filter={(p) => p.gender === "feminino" || p.gender === "unissex"} />; }
