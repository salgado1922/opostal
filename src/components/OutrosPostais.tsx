import { Link } from "@tanstack/react-router";
import { SmartImage } from "@/components/SmartImage";
import { CITIES } from "@/data/cities";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const n = items.length;
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + n) % n),
    [n],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const slotFor = (idx: number): "center" | "left" | "right" | "hidden" => {
    if (idx === active) return "center";
    if (idx === (active - 1 + n) % n) return "left";
    if (idx === (active + 1) % n) return "right";
    return "hidden";
  };

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

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Outros postais"
          className="relative mx-auto h-[380px] w-full select-none sm:h-[440px] md:h-[500px]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {items.map((g, idx) => {
            const city = CITIES.find((c) => c.slug === g.slug);
            const anchor = `${g.cidade} — ${g.subtitulo}`;
            const slot = slotFor(idx);
            const isCenter = slot === "center";

            const offset =
              slot === "left" ? "-58%" : slot === "right" ? "58%" : "0%";
            const scale =
              slot === "center" ? 1 : slot === "hidden" ? 0.7 : 0.78;
            const opacity =
              slot === "center" ? 1 : slot === "hidden" ? 0 : 0.45;
            const zIndex = slot === "center" ? 20 : slot === "hidden" ? 0 : 10;
            const filter = slot === "left" || slot === "right" ? "blur(1px)" : "none";
            const pointer = slot === "hidden" ? "none" : "auto";

            const handleClick = (e: React.MouseEvent) => {
              if (!isCenter) {
                e.preventDefault();
                setActive(idx);
              }
            };

            return (
              <div
                key={g.slug}
                aria-hidden={!isCenter}
                className="absolute left-1/2 top-1/2 h-full w-[260px] transition-all duration-500 ease-out motion-reduce:transition-none sm:w-[320px] md:w-[360px]"
                style={{
                  transform: `translate(calc(-50% + ${offset}), -50%) scale(${scale})`,
                  opacity,
                  zIndex,
                  filter,
                  pointerEvents: pointer,
                }}
              >
                <Link
                    to={`/${g.slug}` as string}
                    tabIndex={isCenter ? 0 : -1}
                    onClick={handleClick}
                    className="group relative block h-full w-full overflow-hidden rounded-[18px] border border-gold/15 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    style={{ background: "oklch(0.22 0.055 320 / 0.4)" }}
                  >
                    {city ? (
                      <SmartImage
                        src={city.cover}
                        alt={g.cidade}
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 768px) 360px, 320px"
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
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Postal anterior"
            className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-gold/25 bg-background/70 p-2.5 text-cream backdrop-blur transition hover:bg-background/90 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:left-4 md:p-3"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximo postal"
            className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-gold/25 bg-background/70 p-2.5 text-cream backdrop-blur transition hover:bg-background/90 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:right-4 md:p-3"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default OutrosPostais;