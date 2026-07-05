import { CatalogPage } from "@/components/catalog-page";
export const metadata = { title: "Looks completos" };
export default function Page() { return <CatalogPage eyebrow="Curadoria Saint Riviera" title="O gesto completo." description="Composições pensadas como uma única ideia: proporção, tom e textura em equilíbrio." filter={(p) => p.category === "looks"} />; }
