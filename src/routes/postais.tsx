import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SmartImage } from "@/components/SmartImage";
import { allGuides, type RelatedGuide } from "@/lib/related-guides";

const BASE = "https://opostal.pt";

export const Route = createFileRoute("/postais")({
  loader: () => allGuides(),
  staleTime: 5 * 60_000,
  head: () => {
    const title = "Todos os postais — artigos de viagem | O Postal";
    const description =
      "Os artigos d'O Postal: roteiros, custos, bairros e conselhos escritos cidade a cidade, em português.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${BASE}/postais` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `${BASE}/postais` }],
    };
  },
  errorComponent: () => <Missing />,
  notFoundComponent: () => <Missing />,
  component: PostaisPage,
});

function Missing() {
  return (
    <main className="bg-twilight-radial flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-serif text-3xl text-cream">
        Este postal ainda não foi enviado.
      </h1>
      <Link to="/" className="gold-link text-sm">
        ← Voltar à homepage
      </Link>
    </main>
  );
}

function published(g: RelatedGuide): string {
  if (!g.published_at) return "";
  const d = new Date(g.published_at);
  if (Number.isNaN(d.getTime())) return "";
  return format(d, "d MMMM yyyy", { locale: pt });
}

function PostaisPage() {
  const guides = Route.useLoaderData();

  return (
    <main className="bg-twilight-radial min-h-screen overflow-x-hidden">
      <SiteNav />

      <header className="relative px-5 pb-4 pt-28 md:px-12 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold/60" />
            Arquivo
          </div>
          <h1 className="font-serif text-5xl leading-[0.95] text-cream md:text-7xl">
            <span className="text-gradient-gold">Todos os postais</span>
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg italic leading-relaxed text-cream/75 md:text-xl">
            Tudo o que escrevi fora dos roteiros: bairros, custos, o que vale a
            pena e o que se pode saltar.
          </p>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-gold/50 via-gold/15 to-transparent" />
        </div>
      </header>

      <section className="relative z-[2] px-5 py-10 md:px-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          {guides.length === 0 ? (
            <div className="border-t border-gold/15 pt-10">
              <p className="font-serif text-2xl italic leading-snug text-cream/85 md:text-3xl">
                Ainda não há artigos aqui. Os roteiros das cidades já estão
                todos escritos — começa por um deles.
              </p>
              <p className="mt-6">
                <Link to="/" className="gold-link text-sm">
                  Ver os roteiros gratuitos →
                </Link>
              </p>
            </div>
          ) : (
            <ul className="grid gap-10">
              {guides.map((g) => (
                <ArticleCard key={g.slug} g={g} />
              ))}
            </ul>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ArticleCard({ g }: { g: RelatedGuide }) {
  const meta = [g.city, g.country, g.duration, published(g)]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className="border-t border-gold/15 pt-8 first:border-t-0 first:pt-0">
      <Link
        to="/guia/$slug"
        params={{ slug: g.slug }}
        className="group block"
        aria-label={`Ler ${g.title || g.city || "o postal"}`}
      >
        {g.hero_url && (
          <SmartImage
            src={g.hero_url}
            alt={g.hero_alt || `${g.city || g.title} — foto de capa`}
            sizes="(max-width: 768px) 100vw, 960px"
            className="mb-5 h-52 w-full object-cover md:h-80"
          />
        )}
        {meta && (
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold/70">
            {meta}
          </p>
        )}
        <h2 className="mt-3 font-serif text-3xl leading-tight text-cream transition-colors group-hover:text-gold-soft md:text-4xl">
          {g.title || g.city || "Postal sem título"}
        </h2>
        {g.intro && (
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-cream/65">
            {g.intro}
          </p>
        )}
        <p className="mt-4 inline-block text-[11px] uppercase tracking-[0.25em] text-gold/85 underline decoration-gold/50 underline-offset-[6px]">
          Ler o postal
        </p>
      </Link>
    </li>
  );
}
