import { Link } from "@tanstack/react-router";
import type { XmasCity, XmasPhoto, Provar } from "@/data/mercados-natal";
import { Gift } from "@/components/natal/Festive";
import { PhotoTwinkle, LightString } from "@/components/natal/PhotoLights";

/** Conteúdo completo dos mercados de uma cidade (fotos, provar, mercados, custos, horas, dicas). */
export function CityMarkets({ c }: { c: XmasCity }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
        {c.fotos.map((f, i) => (
          <XmasFigure key={f.src} foto={f} tilt={i % 2 === 0 ? "-rotate-1" : "rotate-1"} />
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-gold/80">O que provar</h2>
        <ul className="mt-4 grid list-none gap-4 p-0 md:grid-cols-3 md:gap-6">
          {c.provar.map((f, i) => <ProvarCard key={f.nome} item={f} tilt={["md:-rotate-1", "md:rotate-[0.6deg]", "md:-rotate-[0.4deg]"][i % 3]!} />)}
        </ul>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Os mercados</h2>
          <ol className="mt-3 list-none border-t border-gold/25 p-0">
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
        </div>

        <div className="space-y-10">
          <div>
            <h2 className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold/80"><Gift className="h-5 w-5" />Quanto custa uma noite</h2>
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
            <h2 className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold/80"><ClockIcon />Melhor hora para ir</h2>
            <ul className="mt-3 list-none space-y-3 border-t border-gold/25 p-0 pt-3">
              {c.melhorHora.map((h) => (
                <li key={h} className="flex gap-3 leading-relaxed text-cream/85"><span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/70" />{h}</li>
              ))}
            </ul>
          </div>
          <div className="border-l-2 border-[color:var(--holly)] pl-5">
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Antes de ires</h2>
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
    </>
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
