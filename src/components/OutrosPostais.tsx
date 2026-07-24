import { Link } from "@tanstack/react-router";
import { SmartImage } from "@/components/SmartImage";
import { CITIES } from "@/data/cities";

type Guide = {
  slug: "florenca" | "praga" | "londres" | "paris" | "istambul";
  cidade: string;
  subtitulo: string;
};

// Subtítulos derivados dos títulos/head de cada rota.
const GUIDES: Guide[] = [
  { slug: "florenca", cidade: "Florença", subtitulo: "roteiro de 3 dias" },
  { slug: "praga", cidade: "Praga", subtitulo: "roteiro de 4 dias a pé" },
  { slug: "londres", cidade: "Londres", subtitulo: "roteiro de 3 dias a pé" },
  { slug: "paris", cidade: "Paris", subtitulo: "3 dias + Versalhes" },
  { slug: "istambul", cidade: "Istambul", subtitulo: "roteiro de 5 dias" },
];

export function OutrosPostais({ currentSlug }: { currentSlug: string }) {
  const items = GUIDES.filter((g) => g.slug !== currentSlug);

  return (
    <section className="relative z-[2] px-6 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">
            Outros postais
          </p>
          <h2 className="font-serif text-3xl text-cream md:text-4xl">
            Se este te serviu, talvez o próximo também.
          </h2>
        </div>

        <ul
          className="grid list-none gap-7 p-0"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
        >
          {items.map((g) => {
            const city = CITIES.find((c) => c.slug === g.slug);
            const anchor = `${g.cidade} — ${g.subtitulo}`;
            return (
              <li key={g.slug}>
                <Link
                  to={`/${g.slug}` as string}
                  className="group relative block overflow-hidden rounded-[18px] border border-gold/15 shadow-[0_12px_44px_-22px_rgba(0,0,0,0.85)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  style={{ aspectRatio: "4 / 5", background: "oklch(0.22 0.055 320 / 0.4)" }}
                >
                  {city ? (
                    <SmartImage
                      src={city.cover}
                      alt={g.cidade}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4">
                    <div className="glass rounded-2xl px-4 py-3.5">
                      <h3 className="font-serif text-xl leading-tight text-cream">
                        {anchor}
                      </h3>
                      <div className="mt-3 flex items-center justify-between border-t border-gold/15 pt-2">
                        <span className="text-[11px] uppercase tracking-[0.2em] text-cream/60">
                          {city?.country ?? ""}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
                          abrir postal →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default OutrosPostais;