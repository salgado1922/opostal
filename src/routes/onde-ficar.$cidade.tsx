import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { STAY_ARTICLES } from "@/data/onde-ficar";
import { shareImgFor } from "@/data/share-images";

export const Route = createFileRoute("/onde-ficar/$cidade")({
  loader: ({ params }) => {
    const a = STAY_ARTICLES[params.cidade];
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData: a }) => {
    if (!a) return { meta: [{ title: "Página indisponível · O Postal" }, { name: "robots", content: "noindex" }] };
    const url = `https://opostal.pt/onde-ficar/${a.slug}`;
    return {
      meta: [
        { title: `${a.title} · O Postal` },
        { name: "description", content: a.description },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image", content: shareImgFor(a.slug) },
        { name: "twitter:image", content: shareImgFor(a.slug) },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.description, inLanguage: "pt-PT", mainEntityOfPage: url, publisher: { "@type": "Organization", name: "O Postal" } }) }],
    };
  },
  notFoundComponent: () => (
    <main className="min-h-screen bg-background px-6 py-32 text-center text-cream">
      <p className="font-serif text-3xl">Ainda não temos este artigo.</p>
      <Link to="/" className="mt-6 inline-block text-gold underline underline-offset-4">Voltar aos postais</Link>
    </main>
  ),
  component: StayPage,
});

function StayPage() {
  const a = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
      <article className="mx-auto max-w-3xl px-6 pb-20 pt-28 md:pt-36">
        <p className="mb-4 flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-10 bg-gold/70" />Onde ficar
        </p>
        <h1 className="font-serif text-[2.5rem] leading-[1.04] text-cream md:text-6xl">{a.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{a.intro}</p>

        <div className="mt-10 border-l-2 border-gold/60 pl-5">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Resposta curta</p>
          <p className="mt-2 font-serif text-xl italic leading-snug text-cream/90">{a.verdict}</p>
        </div>

        <ol className="mt-12 list-none border-t border-gold/25 p-0">
          {a.zones.map((z, i) => (
            <li key={z.name} className="border-b border-gold/15 py-9">
              <div className="flex items-baseline gap-4">
                <span aria-hidden className="font-serif text-5xl leading-none" style={{ color: "transparent", WebkitTextStroke: "1px color-mix(in oklab, var(--gold) 55%, transparent)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-serif text-2xl leading-tight text-cream md:text-3xl">{z.name}</h2>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-gold/80">Para: {z.for}</p>
                </div>
              </div>
              <p className="mt-4 leading-relaxed text-muted-foreground">{z.body}</p>
              <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                <ul className="space-y-1 text-cream/85">{z.pros.map((p) => <li key={p}>+ {p}</li>)}</ul>
                <ul className="space-y-1 text-muted-foreground">{z.cons.map((c) => <li key={c}>− {c}</li>)}</ul>
              </div>
              <a href={z.href} target="_blank" rel="sponsored noopener" className="mt-5 inline-flex min-h-11 items-center text-[12px] uppercase tracking-[0.22em] text-gold underline decoration-gold/50 underline-offset-[6px] hover:decoration-gold">
                Ver alojamentos em {z.name.split(" (")[0]} →
              </a>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <p className="text-muted-foreground">Já sabes onde dormir? Falta o resto.</p>
          <Link to={a.guide} className="mt-3 inline-block font-serif text-2xl text-cream underline decoration-gold/60 underline-offset-[6px]">
            Ler o roteiro de {a.days} dias em {a.city} →
          </Link>
        </div>
        <p className="mt-10 text-xs text-muted-foreground/80">As ligações de alojamento são de afiliado: se reservares, recebemos uma pequena comissão, sem custo extra para ti.</p>
      </article>
      <SiteFooter />
    </main>
  );
}
