import { CatalogPage } from "@/components/catalog-page";
export const metadata = { title: "Homens" };
export default function Page() { return <CatalogPage eyebrow="Saint Riviera Homme" title="A calma da precisão." description="Alfaiataria relaxada e texturas táteis para uma presença que não precisa se explicar." filter={(p) => p.gender === "masculino" || p.gender === "unissex"} />; }
