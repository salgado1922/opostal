import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { CITIES, type CityMeta } from "@/data/cities";
import hubHero from "@/assets/hub-hero.jpg";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";
import { PostmarkCircle } from "@/components/postal/PostmarkCircle";
import { PostalStamp } from "@/components/postal/PostalStamp";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O Postal: roteiros de viagem gratuitos" },
      {
        name: "description",
        content:
          "Roteiros de viagem gratuitos em português, testados no terreno, cidade a cidade. Para viajar com calma, ver bem e fugir às turistadas.",
      },
      { property: "og:title", content: "O Postal: roteiros de viagem gratuitos" },
      {
        property: "og:description",
        content:
          "Roteiros de viagem gratuitos em português, testados no terreno, cidade a cidade.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://opostal.pt/" },
      { property: "og:image", content: `https://opostal.pt${opostalHorizontalTransparent.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "O Postal: roteiros de viagem gratuitos" },
      {
        name: "twitter:description",
        content: "Roteiros de viagem gratuitos em português, testados no terreno, cidade a cidade.",
      },
      { name: "twitter:image", content: `https://opostal.pt${opostalHorizontalTransparent.url}` },
    ],
    links: [
      { rel: "canonical", href: "https://opostal.pt/" },
      { rel: "preload", as: "image", href: hubHero, fetchPriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", name: "O Postal", url: "https://opostal.pt/" },
            { "@type": "WebSite", name: "O Postal", url: "https://opostal.pt/" },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main id="top" className="bg-twilight-radial min-h-screen overflow-x-hidden">
      <SiteNav />
      <Hero />
      <CityGrid />
      <MethodSection />
      <CustomItinerary />
      <Faq />
      <About />
      <SiteFooter />
    </main>
  );
}

const HERO_SLIDES: { src: string; alt: string }[] = [
  { src: hubHero, alt: "Vista cinematográfica de uma cidade europeia ao entardecer" },
  {
    src: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=2000&q=80",
    alt: "Praga ao pôr-do-sol sobre o rio Vltava",
  },
  {
    src: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=2000&q=80",
    alt: "Istambul à hora azul sobre o Bósforo",
  },
  {
    src: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=2000&q=80",
    alt: "Florença com o Duomo e os telhados ao fim da tarde",
  },
  {
    src: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=2000&q=80",
    alt: "Londres com o Big Ben e o Tamisa à hora dourada",
  },
];

const CITY_STAMP_CODES: Record<string, string> = {
  praga: "PRG",
  istambul: "IST",
  florenca: "FLR",
  londres: "LDN",
  barcelona: "BCN",
  paris: "PAR",
  viena: "VIE",
  lisboa: "LIS",
  budapeste: "BUD",
};

function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const goToCidades = () => {
    document.getElementById("cidades")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-grain bg-vignette relative isolate flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {HERO_SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <motion.img
              key={slide.src}
              src={slide.src}
              alt={i === 0 ? slide.alt : ""}
              aria-hidden={i !== 0}
              width={1920}
              height={1080}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              loading={i === 0 ? "eager" : "lazy"}
              initial={false}
              animate={
                reduce
                  ? { opacity: i === 0 ? 1 : 0 }
                  : { opacity: active ? 1 : 0, scale: active ? 1.08 : 1.0 }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : { opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: 14, ease: "linear" } }
              }
              className="absolute inset-0 h-full w-full object-cover"
              style={{ willChange: "opacity, transform" }}
            />
          );
        })}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.10_0.03_290/0.55)_0%,transparent_28%,transparent_45%,oklch(0.10_0.03_290/0.75)_78%,var(--background)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_70%,oklch(0.62_0.14_38/0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.05)_60%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-44">
        <div className="pointer-events-none absolute right-6 top-28 hidden md:block md:right-12 md:top-32">
          <PostmarkCircle city="O POSTAL" year="MMXXVI" rotate={-10} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-gold [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
            Diários de viagem · Europa
          </p>
          <h1
            className="text-gradient-gold font-serif leading-[1.05] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] [-webkit-text-stroke:1.2px_rgba(0,0,0,0.55)]"
            style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.6rem)" }}
          >
            O Postal
          </h1>
          <div className="my-7 h-px w-28 bg-gold/70" />
          <p className="max-w-xl text-base text-cream md:text-lg [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
            Guias em português, testados no terreno, cidade a cidade. Para viajar com calma, ver bem e fugir às turistadas.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={goToCidades}
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[12px] uppercase tracking-[0.25em] text-[oklch(0.18_0.04_285)] shadow-[0_18px_40px_-18px_rgba(200,119,46,0.7)] transition-all hover:bg-gold-soft hover:shadow-[0_22px_50px_-18px_rgba(216,162,74,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Explorar roteiros gratuitos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </button>
          </div>
        </motion.div>

        <div className="mt-14 flex items-center gap-2" aria-hidden>
          {HERO_SLIDES.map((_, i) => (
            <span
              key={i}
              className={`h-px transition-all duration-700 ${i === index ? "w-10 bg-gold" : "w-5 bg-cream/30"}`}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="relative h-12 w-px overflow-hidden bg-cream/15">
          <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-gold animate-scroll-cue" />
        </div>
      </div>
    </section>
  );
}

function CityGrid() {
  return (
    <section id="cidades" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">Catálogo</p>
          <h2 className="font-serif text-3xl text-cream md:text-5xl">
            Começa com um roteiro gratuito
          </h2>
          <p className="mt-4 text-cream/70 leading-relaxed">
            Cada cidade do catálogo tem um guia completo e aberto a toda a gente, com itinerário sugerido dia a dia. Lê, guarda e parte quando quiseres. Sem registo e sem pagar nada.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((city, i) => (
            <motion.li
              key={city.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <CityCard city={city} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MetaPills({ city, dimmed }: { city: CityMeta; dimmed?: boolean }) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm";
  const tone = dimmed
    ? "border-cream/15 bg-cream/[0.04] text-cream/45"
    : "border-gold/30 bg-gold/[0.08] text-gold/90";
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Resumo da cidade">
      <li className={`${base} ${tone}`} title="Melhor época">{city.bestSeason}</li>
      <li className={`${base} ${tone}`} title="Nível de preço">{city.price}</li>
      <li className={`${base} ${tone}`} title="Ideal para">{city.idealFor}</li>
    </ul>
  );
}

function CityCard({ city }: { city: CityMeta }) {
  const isReady = city.status === "ready";
  const stampCode = CITY_STAMP_CODES[city.slug] ?? city.slug.slice(0, 3).toUpperCase();

  const inner = (
    <article
      className={`group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-gold/15 bg-plum/40 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 ${
        isReady
          ? "hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          : ""
      }`}
    >
      <img
        src={city.cover}
        alt={`${city.name}, ${city.country}`}
        loading="lazy"
        decoding="async"
        width={1024}
        height={1280}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out ${
          isReady ? "group-hover:scale-[1.06]" : "grayscale opacity-55"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="absolute left-3 top-3">
        <PostalStamp
          code={stampCode}
          label="Postal"
          value={isReady ? "VISITADO" : "EM BREVE"}
          rotate={-6}
        />
      </div>

      {!isReady && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold backdrop-blur">
          <Lock className="h-3 w-3" /> Em breve
        </span>
      )}

      <div className="absolute inset-x-4 bottom-4">
        <div className="glass rounded-xl px-4 py-3">
          {isReady && (
            <span className="mb-2 inline-flex items-center rounded-full border border-gold/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.22em] text-cream/60">
              Guia gratuito
            </span>
          )}
          <div className="flex items-baseline justify-between gap-3">
            <h3
              className={`font-serif text-2xl leading-none ${
                isReady ? "text-cream group-hover:text-gold transition-colors" : "text-cream/80"
              }`}
            >
              {city.name}
            </h3>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold/80">
              {city.country}
            </span>
          </div>
          <p className="mt-2 text-sm italic text-cream/80">{city.vibe}</p>
          <MetaPills city={city} dimmed={!isReady} />
          <div className="mt-3 flex items-center justify-between border-t border-gold/15 pt-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-cream/60">
              {city.duration}
            </span>
            {isReady && (
              <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-gold">
                Abrir roteiro <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );

  if (isReady && city.to) {
    return (
      <Link to={city.to} aria-label={`Abrir roteiro de ${city.name}`} className="block rounded-2xl outline-none">
        {inner}
      </Link>
    );
  }
  return (
    <div aria-disabled="true" aria-label={`${city.name}: em breve`}>
      {inner}
    </div>
  );
}

function MethodSection() {
  const bullets = [
    "Percorremos cada cidade a pé, com tempo, sem pressa de cumprir lista.",
    "Testamos os sítios antes de os recomendar: as mesas, os miradouros, os cafés.",
    "Ficamos só com o que vale mesmo a pena, e dizemos do que vale a pena fugir.",
    "Só recomendamos cidades que percorremos pessoalmente, rua a rua.",
  ];
  return (
    <section className="relative px-6 py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl"
      >
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">Método</p>
        <h2 className="font-serif text-3xl text-cream md:text-4xl">
          Como fazemos os roteiros
        </h2>
        <p className="mt-4 font-serif italic text-cream/80 md:text-lg">
          Cada guia nasce no chão da cidade, não atrás de um ecrã.
        </p>
        <ul className="mt-8 space-y-4">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3 text-cream/80 leading-relaxed">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-cream/75 leading-relaxed">
          Não copiamos listas nem repetimos o que toda a gente diz. O que está aqui foi visto, provado e escolhido com critério.
        </p>
      </motion.div>
    </section>
  );
}

function CustomItinerary() {
  return (
    <section id="roteiro-personalizado" className="relative px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-2xl"
      >
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">À tua medida</p>
        <h2 className="font-serif text-3xl text-cream md:text-4xl">
          Quando o roteiro precisa de ser teu
        </h2>
        <p className="mt-4 text-cream/75 leading-relaxed">
          Os guias gratuitos servem a maioria das viagens. Mas às vezes queres algo desenhado à tua medida: o teu ritmo, os teus interesses, as tuas datas. Para isso, preparamos roteiros personalizados.
        </p>
        <div className="mt-8">
          <a
            href="/roteiro-personalizado"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:border-gold/70 hover:bg-gold/[0.08]"
          >
            Ver roteiro personalizado
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

const FAQS: { q: string; a: string }[] = [
  {
    q: "Os roteiros são mesmo gratuitos?",
    a: "São. Os guias base de cada cidade do catálogo estão abertos a toda a gente, sem registo e sem pagamento.",
  },
  {
    q: "Como é que O Postal ganha dinheiro?",
    a: "Com os roteiros personalizados e com ligações úteis a parceiros de reserva. Alguns desses links são afiliados, o que significa que podemos receber uma pequena comissão, sem qualquer custo adicional para ti.",
  },
  {
    q: "O que é um roteiro testado no terreno?",
    a: "É um guia de uma cidade que percorremos pessoalmente, a pé, antes de a recomendar. Tudo o que está no guia foi visto e provado.",
  },
];

function Faq() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">FAQ</p>
          <h2 className="font-serif text-3xl text-cream md:text-4xl">Perguntas frequentes</h2>
        </motion.div>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="border-b border-gold/10"
            >
              <AccordionTrigger className="text-left font-serif text-lg text-cream hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-cream/75 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="relative px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="glass mx-auto max-w-3xl rounded-2xl px-8 py-10 text-center"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/80">Sobre</p>
        <h2 className="font-serif text-2xl text-cream md:text-3xl">
          Viajar devagar, sem turistadas.
        </h2>
        <p className="mt-4 text-cream/75 leading-relaxed">
          Estes guias são feitos com cuidado. Percorremos cada rua a pé, provámos antes de recomendar, ouvimos cada concerto. Aqui só fica o que valeu a pena: horários sugeridos, nunca obrigatórios. Adapta ao teu ritmo.
        </p>
      </motion.div>
    </section>
  );
}


