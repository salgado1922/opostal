import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { XMAS_CITIES, type XmasPhoto, type Provar } from "@/data/mercados-natal";
import natalVienaRathaus from "@/assets/natal/natal-viena-rathaus.jpg.asset.json";
import { Snow, FairyLights, Sleigh, Gift, MarketHuts, Tree } from "@/components/natal/Festive";
import { Stars, Skyline, Countdown, Bauble } from "@/components/natal/Wow";
import { PhotoTwinkle, LightString } from "@/components/natal/PhotoLights";

const URL = "https://opostal.pt/mercados-de-natal";
const TITLE = "Mercados de Natal 2026: Viena, Praga e Budapeste | O Postal";
const DESC = "Datas, horários, preços e dicas dos mercados de Natal de Viena, Praga e Budapeste em 2026, em português de Portugal.";

export const Route = createFileRoute("/mercados-de-natal")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: "Mercados de Natal 2026: Viena, Praga e Budapeste" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: `https://opostal.pt${natalVienaRathaus.url}` },
      { name: "twitter:image", content: `https://opostal.pt${natalVienaRathaus.url}` },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Mercados de Natal 2026: Viena, Praga e Budapeste", description: DESC, inLanguage: "pt-PT", dateModified: "2026-11-20", mainEntityOfPage: URL, publisher: { "@type": "Organization", name: "O Postal" } }) }],
  }),
  component: XmasPage,
});

function XmasPage() {
  return (
    <main className="theme-natal relative min-h-screen overflow-x-hidden">
      <SiteNav />

      {/* HERO */}
      <header className="relative isolate overflow-hidden px-5 pb-0 pt-28 md:min-h-[92vh] md:px-6 md:pt-40">
        <img
          src={natalVienaRathaus.url}
          alt=""
          width={1280}
          height={960}
          fetchPriority="high"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-25 md:opacity-30"
          style={{ maskImage: "linear-gradient(to bottom, black 55%, transparent 96%)", WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 96%)" }}
        />
        <Stars />
        <Snow />
        <div className="pointer-events-none absolute right-[22%] top-0 z-[2] hidden gap-6 md:flex">
          <Bauble className="h-44 w-12" />
          <Bauble className="h-28 w-10" color="var(--gold)" delay={1.2} />
          <Bauble className="h-56 w-12" color="oklch(0.5 0.1 155)" delay={0.6} />
        </div>
        <div className="pointer-events-none absolute left-[62%] top-0 z-[2] flex gap-4 md:hidden">
          <Bauble className="h-24 w-8" />
          <Bauble className="h-16 w-7" color="var(--gold)" delay={1.2} />
        </div>
        <div aria-hidden className="pointer-events-none absolute right-[8%] top-24 z-0 h-28 w-28 rounded-full md:h-44 md:w-44" style={{ background: "radial-gradient(circle at 35% 35%, var(--frost), oklch(0.85 0.03 90) 70%)", boxShadow: "0 0 80px 10px oklch(0.97 0.01 230 / 18%)" }} />
        <div className="pointer-events-none absolute inset-x-0 top-32 z-[2] md:top-40">
          <Sleigh className="sleigh h-8 w-32 text-cream/70 md:h-12 md:w-48" />
        </div>
        <div className="relative z-[3] mx-auto max-w-5xl">
          <p className="mb-5 flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] text-gold">
            <span className="h-px w-10 bg-gold/70" />Postal de inverno · 2026
          </p>
          <h1 className="font-serif text-[3.4rem] leading-[0.95] text-cream md:text-[9rem]">
            Mercados<br /><em className="xmas-glow text-gold">de Natal</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80 md:text-xl">
            Viena, Praga e Budapeste: datas, horários, preços e as armadilhas a evitar.
          </p>
          <div className="mt-8">
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">Faltam para a Consoada</p>
            <Countdown />
          </div>
          <nav aria-label="Cidades" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {XMAS_CITIES.map((c) => (
              <a key={c.slug} href={`#${c.slug}`} className="inline-flex min-h-11 items-center font-serif text-2xl text-cream underline decoration-gold/50 underline-offset-[8px] hover:decoration-gold">
                {c.city}
              </a>
            ))}
          </nav>
          <div className="mt-8 flex items-end gap-2" aria-hidden>
            <Gift className="h-9 w-9" />
            <Gift className="h-7 w-7" box="var(--gold)" ribbon="var(--holly)" />
            <Tree className="h-14 w-10" />
            <Gift className="h-8 w-8" box="oklch(0.5 0.1 155)" ribbon="var(--cream)" />
          </div>
        </div>
        <Skyline className="relative z-[2] -mx-5 mt-6 block h-28 w-[calc(100%+2.5rem)] max-w-none md:-mx-6 md:-mt-10 md:h-60 md:w-[calc(100%+3rem)]" />
        <MarketHuts className="relative z-[3] -mt-2 block h-16 w-full md:h-24" />
      </header>
      <div className="h-3 bg-[color:var(--frost)] opacity-80" aria-hidden />

      {/* RESUMO */}
      <section className="relative mx-auto max-w-5xl px-5 py-14 md:px-6 md:py-20">
        <FairyLights className="mb-8" />
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Resposta curta</p>
        <div className="mt-4 grid gap-0 border-t border-gold/25 md:grid-cols-3">
          {XMAS_CITIES.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="block border-b border-gold/15 py-5 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0">
              <p className="font-serif text-2xl text-cream">{c.city}</p>
              <p className="mt-1 text-sm text-muted-foreground">Abre {c.markets[0]!.quando.split("–")[0]!.trim()} · {c.markets[0]!.name}</p>
            </a>
          ))}
        </div>
      </section>

      {/* CIDADES */}
      {XMAS_CITIES.map((c, idx) => (
        <section key={c.slug} id={c.slug} className="relative scroll-mt-24 border-t border-gold/20 px-5 py-14 md:px-6 md:py-24">
          {idx % 2 === 0 && <Snow count={16} />}
          <div className="relative z-[2] mx-auto max-w-5xl">
            <div className="flex items-baseline gap-4">
              <span aria-hidden className="font-serif text-6xl leading-none md:text-8xl" style={{ color: "transparent", WebkitTextStroke: "1px color-mix(in oklab, var(--gold) 60%, transparent)" }}>
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">{c.kicker}</p>
                <h2 className="font-serif text-4xl leading-tight text-cream md:text-6xl">{c.city}</h2>
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">{c.intro}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-6">
              {c.fotos.map((f, i) => (
                <XmasFigure key={f.src} foto={f} tilt={i % 2 === 0 ? "-rotate-1" : "rotate-1"} />
              ))}
            </div>

            <div className="mt-12">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">O que provar</p>
              <ul className="mt-4 grid list-none gap-4 p-0 md:grid-cols-3 md:gap-6">
                {c.provar.map((f, i) => <ProvarCard key={f.nome} item={f} tilt={["md:-rotate-1", "md:rotate-[0.6deg]", "md:-rotate-[0.4deg]"][i % 3]!} />)}
              </ul>
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
              <ol className="list-none border-t border-gold/25 p-0">
                {c.markets.map((m) => (
                  <li key={m.name} className="border-b border-gold/15 py-5">
                    <h3 className="font-serif text-2xl text-cream">{m.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{m.local}</p>
                    <p className="mt-2 text-[13px] uppercase tracking-[0.15em] text-gold">{m.quando}</p>
                    {m.horario && <p className="mt-1 text-sm text-cream/75">{m.horario}</p>}
                    <p className="mt-2 leading-relaxed text-cream/85">{m.nota}</p>
                  </li>
                ))}
              </ol>

              <div className="space-y-10">
                <div>
                  <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold/80"><Gift className="h-5 w-5" />Quanto custa uma noite</p>
                  <dl className="mt-3 border-t border-gold/25">
                    {c.noite.linhas.map((p) => (
                      <div key={p.item} className="flex items-baseline justify-between gap-4 border-b border-dashed border-gold/20 py-3">
                        <dt className="text-sm text-cream/85">{p.item}</dt>
                        <dd className="shrink-0 font-serif text-lg text-gold">{p.valor}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 border-b-2 border-double border-gold/50 pb-3 font-serif text-xl text-cream md:text-2xl">{c.noite.total}</p>
                  {c.noite.extra && <p className="mt-3 text-sm leading-relaxed text-cream/75">{c.noite.extra}</p>}
                  {c.noite.nota && <p className="mt-2 text-xs text-muted-foreground">{c.noite.nota}</p>}
                </div>
                <div>
                  <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold/80"><ClockIcon />Melhor hora para ir</p>
                  <ul className="mt-3 list-none space-y-3 border-t border-gold/25 p-0 pt-3">
                    {c.melhorHora.map((h) => (
                      <li key={h} className="flex gap-3 leading-relaxed text-cream/85"><span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/70" />{h}</li>
                    ))}
                  </ul>
                </div>
                <div className="border-l-2 border-[color:var(--holly)] pl-5">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Antes de ires</p>
                  <ul className="mt-3 space-y-3">
                    {c.dicas.map((d) => <li key={d} className="leading-relaxed text-cream/85">{d}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-8">
              <Link to={c.guide} className="inline-flex min-h-11 items-center text-[12px] uppercase tracking-[0.22em] text-cream underline decoration-gold/60 underline-offset-[6px] hover:decoration-gold">
                Abrir o guia completo de {c.city} →
              </Link>
              <a href={c.stay.href} target="_blank" rel="sponsored noopener" className="inline-flex min-h-11 items-center text-[12px] uppercase tracking-[0.22em] text-gold underline decoration-gold/50 underline-offset-[6px] hover:decoration-gold">
                {c.stay.label} →
              </a>
            </div>
          </div>
        </section>
      ))}

      {/* ROTEIRO */}
      <section className="relative border-t border-gold/20 px-5 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Tree className="mx-auto h-16 w-12" />
          <p className="mt-6 font-serif text-3xl italic leading-snug text-cream md:text-4xl">Vais em dezembro? Faço-te o roteiro com os mercados à hora certa.</p>
          <Link to="/roteiro-personalizado" className="mt-6 inline-flex min-h-11 items-center text-[12px] uppercase tracking-[0.22em] text-gold underline decoration-gold/50 underline-offset-[6px] hover:decoration-gold">
            Ver o roteiro personalizado →
          </Link>
        </div>
      </section>

      <p className="px-5 pb-10 text-center text-xs text-muted-foreground">Os horários podem mudar. Confirma no site do mercado antes de saíres. Links de alojamento são de afiliado Booking.</p>

      <SiteFooter city="Mercados de Natal" farewell="Frohe Weihnachten · Veselé Vánoce · Boldog karácsonyt" />
    </main>
  );
}

function XmasFigure({ foto, tilt }: { foto: XmasPhoto; tilt: string }) {
  return (
    <figure className={`${tilt} relative border border-gold/30 bg-cream p-2 pb-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:rotate-0`}>
      <div className="relative">
        <img src={foto.src} alt={foto.alt} width={foto.width} height={foto.height} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        {foto.brilho && <PhotoTwinkle src={foto.src} areas={foto.brilho} />}
      </div>
      <figcaption className="pt-2 text-center font-serif text-sm italic text-ink/80">{foto.legenda}</figcaption>
    </figure>
  );
}

function ProvarCard({ item, tilt }: { item: Provar; tilt: string }) {
  return (
    <li className={`${tilt} relative grid grid-cols-[38%_1fr] border border-gold/30 bg-cream shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:rotate-0 md:block md:p-2 md:pb-4`}>
      <LightString />
      <img src={item.src} alt={item.alt} width={900} height={675} loading="lazy" decoding="async" className="h-full w-full object-cover md:aspect-[4/3] md:h-auto" />
      <div className="p-3 md:px-2 md:pb-0 md:pt-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 className="font-serif text-xl leading-tight text-ink">{item.nome}</h3>
          {item.preco && <p className="font-serif text-sm italic text-ink/70">{item.preco}</p>}
        </div>
        <p className="mt-1 text-[13px] leading-snug text-ink/80 md:text-sm">{item.desc}</p>
      </div>
    </li>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 5.5V10l3 2" strokeLinecap="round" />
    </svg>
  );
}
