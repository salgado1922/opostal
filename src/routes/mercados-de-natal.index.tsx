import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { XMAS_CITIES } from "@/data/mercados-natal";
import natalVienaRathaus from "@/assets/natal/natal-viena-rathaus.jpg.asset.json";
import { Snow, Sleigh, MarketHuts, Tree } from "@/components/natal/Festive";
import { Stars, Countdown, Bauble } from "@/components/natal/Wow";
import { Largo } from "@/components/natal/Largo";

const URL = "https://opostal.pt/mercados-de-natal";
const TITLE = "Mercados de Natal 2026: Viena, Praga e Budapeste | O Postal";
const DESC = "Datas, horários, preços e dicas dos mercados de Natal de Viena, Praga e Budapeste em 2026, em português de Portugal.";

export const Route = createFileRoute("/mercados-de-natal/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: "Mercados de Natal 2026: Viena, Praga e Budapeste" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: `https://opostal.pt${natalVienaRathaus.url}` },
      { name: "twitter:image", content: `https://opostal.pt${natalVienaRathaus.url}` },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "CollectionPage", name: "Mercados de Natal 2026: Viena, Praga e Budapeste", description: DESC, inLanguage: "pt-PT", url: URL,
        hasPart: XMAS_CITIES.map((c) => ({ "@type": "Article", headline: `Mercados de Natal em ${c.city} 2026`, url: `${URL}/${c.slug}` })),
        publisher: { "@type": "Organization", name: "O Postal" },
      }),
    }],
  }),
  component: XmasHub,
});

function XmasHub() {
  const navigate = useNavigate();
  // Ligações antigas com #viena / #praga / #budapeste passam para a página da cidade.
  useEffect(() => {
    const h = window.location.hash.slice(1);
    const c = XMAS_CITIES.find((x) => x.slug === h);
    if (c) navigate({ to: "/mercados-de-natal/$cidade", params: { cidade: c.slug }, replace: true });
  }, [navigate]);

  return (
    <main className="theme-natal relative min-h-screen overflow-x-hidden">
      <SiteNav />

      <header className="relative isolate overflow-hidden px-5 pb-0 pt-28 md:px-6 md:pt-36">
        <Stars />
        <Snow />
        <div className="pointer-events-none absolute right-[40%] top-0 z-[2] hidden gap-6 lg:flex">
          <Bauble className="h-44 w-12" />
          <Bauble className="h-28 w-10" color="var(--gold)" delay={1.2} />
          <Bauble className="h-56 w-12" color="oklch(0.5 0.1 155)" delay={0.6} />
        </div>
        <div className="pointer-events-none absolute left-[62%] top-0 z-[2] flex gap-4 md:hidden">
          <Bauble className="h-24 w-8" />
          <Bauble className="h-16 w-7" color="var(--gold)" delay={1.2} />
        </div>
        <div aria-hidden className="pointer-events-none absolute right-[6%] top-24 z-0 h-24 w-24 rounded-full md:h-36 md:w-36" style={{ background: "radial-gradient(circle at 35% 35%, var(--frost), oklch(0.85 0.03 90) 70%)", boxShadow: "0 0 80px 10px oklch(0.97 0.01 230 / 18%)" }} />
        <div className="pointer-events-none absolute inset-x-0 top-32 z-[2] md:top-40">
          <Sleigh className="sleigh h-8 w-32 text-cream/70 md:h-12 md:w-48" />
        </div>

        <div className="relative z-[3] mx-auto grid max-w-6xl items-end gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-4">
          <div className="lg:pb-24">
            <p className="mb-5 flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] text-gold">
              <span className="h-px w-10 bg-gold/70" />Postal de inverno · 2026
            </p>
            <h1 className="font-serif text-[3.4rem] leading-[0.95] text-cream md:text-[7rem] lg:text-[7.5rem]">
              Mercados<br /><em className="xmas-glow text-gold">de Natal</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80 md:text-xl">
              Viena, Praga e Budapeste. Entra no largo e escolhe a tua cabana.
            </p>
            <div className="mt-8">
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">Faltam para a Consoada</p>
              <Countdown />
            </div>
          </div>

          <section aria-label="Largo dos mercados: escolhe uma cidade" className="relative">
            <Largo />
          </section>
        </div>
        <MarketHuts className="z-[2] -mx-5 mt-8 md:-mx-6" />
      </header>

      <section className="relative mx-auto max-w-5xl px-5 py-14 md:px-6 md:py-20">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-gold/80">As três cabanas</h2>
        <ul className="mt-4 grid list-none gap-0 border-t border-gold/25 p-0 md:grid-cols-3">
          {XMAS_CITIES.map((c) => (
            <li key={c.slug} className="border-b border-gold/15 md:border-b-0 md:border-r md:last:border-r-0">
              <Link to="/mercados-de-natal/$cidade" params={{ cidade: c.slug }} className="group block py-5 md:px-5 md:group-first:pl-0">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold/70">{c.kicker}</p>
                <p className="mt-1 font-serif text-3xl text-cream underline decoration-gold/0 underline-offset-[6px] transition group-hover:decoration-gold/70">{c.city} →</p>
                <p className="mt-1 text-sm text-muted-foreground">Abre {c.markets[0]!.quando.split("–")[0]!.trim()} · {c.markets[0]!.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative border-t border-gold/20 px-5 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Tree className="mx-auto h-16 w-12" />
          <p className="mt-6 font-serif text-3xl italic leading-snug text-cream md:text-4xl">Vais em dezembro? Faço-te o roteiro com os mercados à hora certa.</p>
          <Link to="/roteiro-personalizado" className="mt-6 inline-flex min-h-11 items-center text-[12px] uppercase tracking-[0.22em] text-gold underline decoration-gold/50 underline-offset-[6px] hover:decoration-gold">
            Ver o roteiro personalizado →
          </Link>
        </div>
      </section>

      <p className="px-5 pb-10 text-center text-xs text-muted-foreground">Os horários podem mudar. Confirma no site do mercado antes de saíres.</p>

      <SiteFooter city="Mercados de Natal" farewell="Frohe Weihnachten · Veselé Vánoce · Boldog karácsonyt" />
    </main>
  );
}
