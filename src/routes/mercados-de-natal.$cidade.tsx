import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { XMAS_CITIES } from "@/data/mercados-natal";
import { Snow, MarketHuts, Tree } from "@/components/natal/Festive";
import { Stars, Bauble } from "@/components/natal/Wow";
import { Stall } from "@/components/natal/Stall";
import { CityMarkets } from "@/components/natal/CityMarkets";
import { XmasStampCard } from "@/components/natal/XmasStampCard";

const FAREWELL: Record<string, string> = {
  viena: "Frohe Weihnachten",
  praga: "Veselé Vánoce",
  budapeste: "Boldog karácsonyt",
};

export const Route = createFileRoute("/mercados-de-natal/$cidade")({
  loader: ({ params }) => {
    const c = XMAS_CITIES.find((x) => x.slug === params.cidade);
    if (!c) throw notFound();
    return { slug: c.slug };
  },
  head: ({ params }) => {
    const c = XMAS_CITIES.find((x) => x.slug === params.cidade);
    if (!c) return { meta: [{ title: "Mercado não encontrado | O Postal" }, { name: "robots", content: "noindex" }] };
    const url = `https://opostal.pt/mercados-de-natal/${c.slug}`;
    const title = `Mercados de Natal em ${c.city} 2026: datas e preços | O Postal`;
    const desc = `Mercados de Natal de ${c.city} em 2026: datas, horários, o que provar, quanto custa uma noite e a melhor hora para ir.`;
    const img = `https://opostal.pt${c.fotos[0]!.src}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: `Mercados de Natal em ${c.city} 2026` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image", content: img },
        { name: "twitter:image", content: img },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify([
          { "@context": "https://schema.org", "@type": "Article", headline: `Mercados de Natal em ${c.city} 2026`, description: desc, inLanguage: "pt-PT", dateModified: "2026-11-20", mainEntityOfPage: url, image: img, publisher: { "@type": "Organization", name: "O Postal" } },
          { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "O Postal", item: "https://opostal.pt/" },
            { "@type": "ListItem", position: 2, name: "Mercados de Natal", item: "https://opostal.pt/mercados-de-natal" },
            { "@type": "ListItem", position: 3, name: c.city, item: url },
          ] },
        ]),
      }],
    };
  },
  notFoundComponent: () => (
    <main className="theme-natal min-h-screen px-6 py-32 text-center text-cream">
      <p className="font-serif text-3xl">Esta cabana ainda não abriu.</p>
      <Link to="/mercados-de-natal" className="mt-6 inline-block text-gold underline underline-offset-4">Voltar ao largo</Link>
    </main>
  ),
  component: XmasCityPage,
});

function XmasCityPage() {
  const { slug } = Route.useLoaderData();
  const c = XMAS_CITIES.find((x) => x.slug === slug)!;
  const others = XMAS_CITIES.filter((x) => x.slug !== slug);

  return (
    <main className="theme-natal relative min-h-screen overflow-x-hidden">
      <SiteNav />

      <header className="relative isolate overflow-hidden px-5 pt-28 md:px-6 md:pt-36">
        <Stars count={40} />
        <Snow />
        <div className="pointer-events-none absolute right-[10%] top-0 z-[2] flex gap-4 md:gap-6">
          <Bauble className="h-24 w-8 md:h-40 md:w-11" />
          <Bauble className="h-16 w-7 md:h-28 md:w-10" color="var(--gold)" delay={1.2} />
        </div>
        <div className="relative z-[3] mx-auto max-w-5xl pb-6">
          <Link to="/mercados-de-natal" className="inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold hover:text-cream">
            ← Voltar ao largo
          </Link>
          <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-gold/80">{c.kicker}</p>
          <h1 className="mt-2 font-serif text-[3rem] leading-[0.95] text-cream md:text-[6.5rem]">
            Mercados de Natal<br /><em className="xmas-glow text-gold">em {c.city}</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85 md:text-xl">{c.intro}</p>
        </div>
        <MarketHuts className="z-[2] -mx-5 mt-4 md:-mx-6" />
      </header>

      <section className="relative px-5 py-14 md:px-6 md:py-20">
        <Snow count={16} />
        <div className="relative z-[2] mx-auto max-w-5xl">
          <CityMarkets c={c} />
        </div>
      </section>

      <XmasStampCard slug={c.slug} city={c.city} />

      <section className="relative border-t border-gold/20 px-5 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Outras cabanas do largo</h2>
          <ul className="mt-6 grid list-none grid-cols-2 gap-6 p-0 md:max-w-xl md:gap-10">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to="/mercados-de-natal/$cidade" params={{ cidade: o.slug }} className="largo-stall group block text-center">
                  <Stall slug={o.slug} name={o.city} className="mx-auto block w-full max-w-[200px]" />
                  <span className="mt-2 block font-serif text-xl text-cream underline decoration-gold/40 underline-offset-[6px] group-hover:decoration-gold">{o.city} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative border-t border-gold/20 px-5 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Tree className="mx-auto h-16 w-12" />
          <p className="mt-6 font-serif text-3xl italic leading-snug text-cream md:text-4xl">Vais a {c.city} em dezembro? Faço-te o roteiro com os mercados à hora certa.</p>
          <Link to="/roteiro-personalizado" className="mt-6 inline-flex min-h-11 items-center text-[12px] uppercase tracking-[0.22em] text-gold underline decoration-gold/50 underline-offset-[6px] hover:decoration-gold">
            Ver o roteiro personalizado →
          </Link>
        </div>
      </section>

      <p className="px-5 pb-10 text-center text-xs text-muted-foreground">Os horários podem mudar. Confirma no site do mercado antes de saíres. Links de alojamento são de afiliado Booking.</p>

      <SiteFooter city={`Mercados de Natal · ${c.city}`} farewell={FAREWELL[c.slug] ?? "Feliz Natal"} />
    </main>
  );
}
