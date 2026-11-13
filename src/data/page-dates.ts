/** Real last-content-change dates (ISO) per public page, used by the sitemap and JSON-LD. Update when a page's content changes. */
export const GUIDE_PUBLISHED: Record<string, string> = {
  praga: "2026-06-12", istambul: "2026-06-12", florenca: "2026-06-16", londres: "2026-06-18",
  paris: "2026-07-22", barcelona: "2026-09-16", viena: "2026-09-16", lisboa: "2026-09-16", budapeste: "2026-09-16",
};

export const PAGE_LASTMOD: Record<string, string> = {
  "/": "2026-11-13",
  "/abordagem": "2026-11-13",
  "/roteiro-personalizado": "2026-11-11",
  "/praga": "2026-11-13", "/istambul": "2026-11-13", "/florenca": "2026-11-13", "/londres": "2026-11-13",
  "/paris": "2026-11-13", "/barcelona": "2026-11-13", "/viena": "2026-11-13", "/lisboa": "2026-11-13",
  "/budapeste": "2026-11-13",
  "/onde-ficar/praga": "2026-11-13", "/onde-ficar/lisboa": "2026-11-13",
  "/carimbos/*": "2026-11-11",
};

export const lastmodFor = (path: string) =>
  PAGE_LASTMOD[path] ?? (path.startsWith("/carimbos/") ? PAGE_LASTMOD["/carimbos/*"] : undefined);

const CITY_NAMES: Record<string, string> = {
  praga: "Praga", istambul: "Istambul", florenca: "Florença", londres: "Londres", paris: "Paris",
  barcelona: "Barcelona", viena: "Viena", lisboa: "Lisboa", budapeste: "Budapeste",
};

/** JSON-LD: Início > Roteiros > Cidade */
export const cityBreadcrumbScript = (slug: string) => ({
  type: "application/ld+json",
  children: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://opostal.pt/" },
      { "@type": "ListItem", position: 2, name: "Roteiros", item: "https://opostal.pt/#cidades" },
      { "@type": "ListItem", position: 3, name: CITY_NAMES[slug], item: `https://opostal.pt/${slug}` },
    ],
  }),
});
