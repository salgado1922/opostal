import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AUTHOR } from "@/data/author";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SmartImage } from "@/components/SmartImage";
import { Button } from "@/components/ui/button";

const TITLE = "Quem escreve e a nossa abordagem | O Postal";
const DESCRIPTION = "Conhece Carlos Salgado, o autor do O Postal, e a forma como as viagens dão origem aos nossos guias de cidade.";

export const Route = createFileRoute("/abordagem")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://opostal.pt/abordagem" },
      { property: "og:image", content: "https://opostal.pt/og-default.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "https://opostal.pt/og-default.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/abordagem" }],
  }),
  component: AbordagemPage,
});

const METHOD = [
  {
    title: "Primeiro a viagem. Depois o guia.",
    body: "Os nossos postais partem de cidades que visitámos. Juntamos as paragens que valeram a pena, os percursos que fizemos e os detalhes que gostaríamos de ter sabido antes de chegar.",
  },
  {
    title: "Um percurso, não uma lista sem fim.",
    body: "Organizamos cada dia por zonas, para não passares a viagem a atravessar a cidade. Há monumentos, mas também mercados, cafés e tempo para ficar numa praça sem olhar para o relógio.",
  },
  {
    title: "Na rua, o guia vai contigo.",
    body: "Os guias são gratuitos e pensados para consultar no telemóvel durante a viagem. No modo de rua, levas uma paragem de cada vez; no passaporte, guardas os carimbos e as memórias que quiseres trazer de volta.",
  },
];

function AbordagemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <header className="mx-auto max-w-6xl px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36">
        <p className="mb-5 text-xs uppercase tracking-[0.2em] text-gold">Quem escreve</p>
        <h1 className="max-w-3xl font-serif text-5xl leading-none sm:text-7xl md:text-8xl">{AUTHOR.nomes}</h1>
        <div className={`mt-8 grid gap-8 ${AUTHOR.foto ? "md:grid-cols-[1fr_240px]" : ""}`}>
          <div className="max-w-2xl">
            <p className="font-serif text-2xl leading-relaxed sm:text-3xl">Sou o Carlos, o autor por trás d’O Postal. Os guias que encontras aqui nascem das minhas viagens.</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">Praga, Istambul, Florença, Londres, Paris, Barcelona, Viena, Lisboa e Budapeste: são as nove cidades que já visitei e que deram origem a estes postais.</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">É essa experiência que quero partilhar contigo: o que visitar, como juntar as paragens num dia e onde vale a pena abrandar.</p>
            <p className="mt-7 font-hand text-2xl text-gold">Carlos Salgado</p>
          </div>
          {AUTHOR.foto && <SmartImage src={AUTHOR.foto} alt={AUTHOR.fotoAlt} className="aspect-[4/5] w-full max-w-60 object-cover" sizes="240px" />}
        </div>
      </header>

      <section aria-labelledby="abordagem" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-16">
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div><p className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">Como fazemos os postais</p><h2 id="abordagem" className="font-serif text-4xl leading-tight sm:text-5xl">A nossa abordagem</h2></div>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">Um guia deve ajudar-te a aproveitar a cidade, não dar-te mais uma lista de tarefas. Nos nossos roteiros, procuramos uma ordem que faça sentido e deixamos espaço para mudares de ideias pelo caminho.</p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4">
            {[
              { slug: "praga", caption: "Praga", alt: "Vista de Praga e do rio Vltava" },
              { slug: "istambul", caption: "Istambul", alt: "Vista de Istambul" },
              { slug: "florenca", caption: "Florença", alt: "Vista de Florença e da catedral" },
            ].map(city => <figure key={city.slug} className="min-w-0"><SmartImage src={`/img/cities/${city.slug}-card-1024.jpg`} alt={city.alt} sizes="(max-width: 640px) 33vw, (max-width: 1200px) 30vw, 370px" className="aspect-[4/5] w-full object-cover md:aspect-[4/3]" /><figcaption className="mt-2 font-serif text-base italic text-muted-foreground">{city.caption}</figcaption></figure>)}
          </div>

          <div className="mt-10 divide-y divide-border border-y border-border">
            {METHOD.map((item, i) => <article key={item.title} className="grid gap-3 py-7 md:grid-cols-[60px_1fr_1.2fr] md:gap-8 md:py-9"><span aria-hidden="true" className="font-serif text-3xl text-gold">0{i + 1}</span><h3 className="font-serif text-2xl leading-tight sm:text-3xl">{item.title}</h3><p className="max-w-xl text-base leading-relaxed text-muted-foreground">{item.body}</p></article>)}
          </div>

          <aside className="mt-8 max-w-2xl border-l-2 border-gold/60 pl-5"><h3 className="font-serif text-2xl">Uma nota antes de partir</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Uma viagem fica na memória; um horário pode mudar. Confirma preços, horários e condições nos sites oficiais antes de reservar. Alguns links de alojamento são de afiliado, como indicamos no rodapé.</p></aside>
          <div className="mt-9 flex flex-wrap gap-3"><Button variant="outline" asChild className="min-h-12 rounded-sm"><Link to="/" hash="cidades">Escolher o próximo postal<ArrowRight /></Link></Button><Button variant="link" asChild className="min-h-12"><Link to="/roteiro-personalizado">Um roteiro à tua medida<ArrowRight /></Link></Button></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}