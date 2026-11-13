import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { InkStamp } from "@/components/passport/InkStamp";
import { CityShareBar } from "@/components/passport/CityShareBar";
import { STAMP_STYLE, inkFor } from "@/components/passport/stamps";
import { STAMP_STOPS } from "@/data/stamp-stops";
import { CITIES } from "@/data/cities";

export const Route = createFileRoute("/carimbos/$cidade")({
  loader: ({ params }) => {
    const city = CITIES.find((c) => c.slug === params.cidade);
    const stops = STAMP_STOPS[params.cidade];
    if (!city || !stops) throw notFound();
    return { slug: city.slug, name: city.name, country: city.country, to: city.to ?? `/${city.slug}`, stops };
  },
  head: ({ loaderData, params }) => {
    const name = loaderData?.name ?? "Cidade";
    const n = loaderData?.stops.length ?? 0;
    const title = `Carimbos de ${name} — passaporte O Postal`;
    const desc = `${n} carimbos para colecionar em ${name}, um por cada atração principal do guia gratuito d'O Postal. Visita, carimba no local e guarda a memória.`;
    const url = `https://opostal.pt/carimbos/${params.cidade}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <main className="min-h-screen bg-background px-6 py-24 text-center text-cream">
      <p className="font-serif text-3xl">Esta cidade ainda não tem carimbos.</p>
      <Link to="/" className="mt-6 inline-block text-gold underline underline-offset-4">Ver os postais</Link>
    </main>
  ),
  component: CarimbosPage,
});

function CarimbosPage() {
  const { slug, name, country, to, stops } = Route.useLoaderData();
  const style = STAMP_STYLE[slug] ?? { shape: "circle" as const, motif: "✦", code: "" };
  return (
    <main className="min-h-screen bg-background text-cream">
      <section className="mx-auto max-w-4xl px-5 pb-10 pt-24 sm:pt-32">
        <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Passaporte O Postal · {country}</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] sm:text-7xl">Os carimbos de {name}</h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
          {stops.length} carimbos, um por cada paragem principal do guia. Carimbas no local, com a localização do telemóvel,
          e podes juntar a tua fotografia como memória.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link to="/passaporte" className="inline-flex min-h-[48px] items-center bg-gold px-6 font-medium text-background">
            Coleciona os teus
          </Link>
          <a href={to} className="text-cream/80 underline decoration-gold/50 underline-offset-4 hover:text-gold">
            Ler o guia de {name}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl border-t border-cream/10 px-5 py-12">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
          {stops.map((st, i) => (
            <li key={st.title} className="flex flex-col items-center text-center">
              <InkStamp
                top={st.label.length > 16 ? `${st.label.slice(0, 15).trim()}…` : st.label}
                bottom={name}
                center=""
                icon={st.motif}
                ink={inkFor(slug)}
                shape={style.shape}
                size={128}
                rotate={(i % 3) * 4 - 4}
              />
              <p className="mt-2 font-serif text-lg leading-snug">{st.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <CityShareBar name={name} count={stops.length} url={`https://opostal.pt/carimbos/${slug}`} />

      <section className="mx-auto max-w-4xl border-t border-cream/10 px-5 py-14">
        <h2 className="font-serif text-3xl sm:text-4xl">Como se carimba</h2>
        <ol className="mt-6 space-y-4 text-cream/75">
          <li><span className="font-serif text-gold">1.</span> Abre o guia de {name} no telemóvel e entra na tua conta.</li>
          <li><span className="font-serif text-gold">2.</span> Chegado à paragem, toca em «Carimbei aqui» — a localização confirma que estiveste lá.</li>
          <li><span className="font-serif text-gold">3.</span> No fim da viagem, partilha a página do passaporte nas histórias do Instagram.</li>
        </ol>
        <Link to="/passaporte" className="mt-8 inline-flex min-h-[48px] items-center bg-gold px-6 font-medium text-background">
          Abrir o meu passaporte
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
