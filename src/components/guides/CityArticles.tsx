import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { SmartImage } from "@/components/SmartImage";
import type { RelatedGuide } from "@/lib/related-guides";

function published(g: RelatedGuide): string {
  if (!g.published_at) return "";
  const d = new Date(g.published_at);
  if (Number.isNaN(d.getTime())) return "";
  return format(d, "d MMMM yyyy", { locale: pt });
}

function ArticleRow({ g }: { g: RelatedGuide }) {
  const meta = [g.city, g.duration, published(g)].filter(Boolean).join(" · ");
  return (
    <li className="border-t border-gold/15 pt-6 first:border-t-0 first:pt-0">
      <Link
        to="/guia/$slug"
        params={{ slug: g.slug }}
        className="group grid gap-5 sm:grid-cols-[168px_minmax(0,1fr)] sm:items-start"
      >
        {g.hero_url && (
          <SmartImage
            src={g.hero_url}
            alt={g.hero_alt || `${g.city || g.title} — foto de capa`}
            sizes="(max-width: 640px) 100vw, 168px"
            className="h-40 w-full object-cover sm:h-28"
          />
        )}
        <div className="min-w-0">
          {meta && (
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold/70">
              {meta}
            </p>
          )}
          <h3 className="mt-2 font-serif text-xl leading-snug text-cream transition-colors group-hover:text-gold-soft md:text-2xl">
            {g.title || g.city || "Postal sem título"}
          </h3>
          {g.intro && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cream/60">
              {g.intro}
            </p>
          )}
          <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-gold/80 underline decoration-gold/50 underline-offset-[6px]">
            Ler o postal
          </p>
        </div>
      </Link>
    </li>
  );
}

/**
 * Articles written for this city in the admin panel.
 * Renders nothing when there are none, so guides stay untouched.
 */
export function CityArticles({
  city,
  items,
}: {
  city: string;
  items: RelatedGuide[];
}) {
  if (items.length === 0) return null;
  const shown = items.slice(0, 3);

  return (
    <section className="relative z-[2] px-5 py-12 md:px-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-10 bg-gold/60" />
          Escrito para {city}
        </div>
        <h2 className="mb-8 font-serif text-3xl leading-tight md:mb-10 md:text-5xl">
          <span className="text-gradient-gold">Mais sobre esta cidade</span>
        </h2>
        <ul className="grid gap-8">
          {shown.map((g) => (
            <ArticleRow key={g.slug} g={g} />
          ))}
        </ul>
        <p className="mt-9">
          <Link to="/postais" className="gold-link text-sm">
            Ver todos os postais →
          </Link>
        </p>
      </div>
    </section>
  );
}
