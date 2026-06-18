import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Clock,
  Coffee,
  Compass,
  Footprints,
  Link2,
  Lock,
  User,
} from "lucide-react";
import { CITIES, type CityMeta } from "@/data/cities";
import hubHero from "@/assets/hub-hero.jpg";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";
import { HomePremiumCTA, PremiumCardTag } from "@/components/PremiumPromo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";
import worldGeo from "world-atlas/countries-110m.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O Postal: guias de viagem pela Europa" },
      {
        name: "description",
        content:
          "Guias de viagem editoriais, testados por mim, cidade a cidade. Praga e Istambul já disponíveis. Paris, Viena, Lisboa, Budapeste, Florença, Barcelona e Londres a caminho.",
      },
      { property: "og:title", content: "O Postal: guias de viagem pela Europa" },
      {
        property: "og:description",
        content:
          "Guias de viagem editoriais, testados por mim, cidade a cidade. Praga e Istambul já disponíveis. Paris, Viena, Lisboa, Budapeste, Florença, Barcelona e Londres a caminho.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://opostal.pt/" },
      { property: "og:image", content: `https://opostal.pt${opostalHorizontalTransparent.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "O Postal: guias de viagem pela Europa" },
      { name: "twitter:description", content: "Guias de viagem editoriais, testados por mim, cidade a cidade." },
      { name: "twitter:image", content: `https://opostal.pt${opostalHorizontalTransparent.url}` },
    ],
    links: [
      { rel: "canonical", href: "https://opostal.pt/" },
      { rel: "preload", as: "image", href: hubHero, fetchpriority: "high" },
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
      <FeaturedBand />
      <CityGrid />
      <MethodStrip />
      <EuropeMap />
      <About />
      <HomePremiumCTA />
      <SiteFooter />
    </main>
  );
}

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out ${
        scrolled
          ? "border-b border-gold/15 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link
          to="/"
          aria-label="O Postal"
          className={`ml-1 inline-flex items-center transition duration-300 hover:scale-[1.01] hover:opacity-85 ${
            scrolled ? "" : "[filter:drop-shadow(0_1px_8px_rgba(0,0,0,0.65))]"
          }`}
        >
          <img src={opostalHorizontalTransparent.url} alt="O Postal" className="h-8 w-auto object-contain md:h-10" />
        </Link>
        <a
          href="#cidades"
          className={`text-xs uppercase tracking-[0.2em] transition-colors ${
            scrolled ? "text-cream/70 hover:text-cream" : "text-cream/90 hover:text-cream [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]"
          }`}
        >
          Cidades
        </a>
        <Link
          to="/abordagem"
          className={`ml-6 text-xs uppercase tracking-[0.2em] transition-colors ${
            scrolled ? "text-cream/70 hover:text-cream" : "text-cream/90 hover:text-cream [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]"
          }`}
        >
          A nossa abordagem
        </Link>
        <Link
          to="/conta"
          aria-label="A minha conta"
          className={`ml-4 md:ml-6 inline-flex items-center transition-colors ${
            scrolled ? "text-cream/70 hover:text-cream" : "text-cream/90 hover:text-cream [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]"
          }`}
        >
          <User className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </Link>
      </div>
    </nav>
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
];

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
    document.getElementById("destaque")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-grain bg-vignette relative isolate flex min-h-screen items-end overflow-hidden">
      {/* crossfading background slides */}
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
        {/* scrims */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.10_0.03_290/0.55)_0%,transparent_28%,transparent_45%,oklch(0.10_0.03_290/0.75)_78%,var(--background)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_70%,oklch(0.62_0.14_38/0.18),transparent_55%)]" />
      </div>

      {/* content block */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="max-w-2xl"
        >
          <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-gold [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
            Diários de viagem · Europa
          </p>
          <h1
            className="text-gradient-gold font-serif leading-[1.02] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
            style={{ fontSize: "clamp(3rem, 7.2vw, 6.5rem)" }}
          >
            O Postal
          </h1>
          <div className="my-7 h-px w-28 bg-gold/70" />
          <p className="max-w-xl text-lg text-cream md:text-xl [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
            Guias de viagem ao teu ritmo, testados no terreno, cidade a cidade.
          </p>
          <p className="mt-4 max-w-xl text-sm text-cream/75 md:text-base [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
            Roteiros de ritmo tranquilo, sem turistadas, para quem quer ver bem em vez de ver tudo.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={goToCidades}
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[12px] uppercase tracking-[0.25em] text-[oklch(0.18_0.04_285)] shadow-[0_18px_40px_-18px_rgba(200,119,46,0.7)] transition-all hover:bg-gold-soft hover:shadow-[0_22px_50px_-18px_rgba(216,162,74,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Ver cidades
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </button>
            <a
              href="#mapa"
              className="text-[11px] uppercase tracking-[0.3em] text-cream/75 gold-link"
            >
              Ver mapa
            </a>
          </div>
        </motion.div>

        {/* slide indicators */}
        <div className="mt-14 flex items-center gap-2" aria-hidden>
          {HERO_SLIDES.map((_, i) => (
            <span
              key={i}
              className={`h-px transition-all duration-700 ${i === index ? "w-10 bg-gold" : "w-5 bg-cream/30"}`}
            />
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="relative h-12 w-px overflow-hidden bg-cream/15">
          <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-gold animate-scroll-cue" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------- FEATURED BAND ----------------------- */

type Featured = {
  to: string;
  badge?: string;
  title: string;
  country: string;
  tagline: string;
  chips: string[];
  img: string;
  alt: string;
};

const FEATURED: Featured[] = [
  {
    to: "/istambul",
    badge: "Novo",
    title: "Istambul",
    country: "Turquia",
    tagline: "Entre dois continentes, do azul do Bósforo ao azulejo de İznik.",
    chips: ["Abr–Jun / Set", "€€", "Ritmo tranquilo", "5 dias"],
    img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1800&q=80",
    alt: "Mesquita iluminada em Istambul ao entardecer",
  },
  {
    to: "/praga",
    title: "Praga",
    country: "Chéquia",
    tagline: "Hora dourada sobre o Vltava, sem turistadas.",
    chips: ["Mai–Set", "€€", "Ritmo tranquilo", "4 dias"],
    img: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1800&q=80",
    alt: "Telhados de Praga ao pôr-do-sol",
  },
];

function FeaturedBand() {
  return (
    <section id="destaque" className="relative px-6 pt-20 pb-10 md:pt-28 md:pb-14">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex items-end justify-between gap-6"
        >
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-gold/80">
              Em destaque
            </p>
            <h2 className="font-serif text-3xl text-cream md:text-4xl">
              Os guias já a viver online
            </h2>
          </div>
          <a href="#cidades" className="hidden sm:inline-flex text-[11px] uppercase tracking-[0.3em] text-cream/65 gold-link">
            Todas as cidades
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {FEATURED.map((f, i) => (
            <motion.div
              key={f.to}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={f.to}
                aria-label={`Abrir guia de ${f.title}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-3xl border border-gold/15 bg-plum/40 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/45 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <img
                  src={f.img}
                  alt={f.alt}
                  loading="lazy"
                  decoding="async"
                  width={1800}
                  height={1350}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                {f.badge && (
                  <span className="absolute right-4 top-4 inline-flex items-center rounded-full border border-gold/50 bg-background/55 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-gold backdrop-blur">
                    {f.badge}
                  </span>
                )}
                <div className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-gold/85">
                    {f.country}
                  </p>
                  <h3 className="font-serif text-3xl text-cream md:text-4xl">
                    <span className="bg-[linear-gradient(var(--gold),var(--gold))] bg-[length:0%_1.5px] bg-[position:0_100%] bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1.5px]">
                      {f.title}
                    </span>
                  </h3>
                  <p className="mt-2 max-w-md text-sm italic text-cream/85 md:text-base">
                    {f.tagline}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {f.chips.map((c) => (
                      <li
                        key={c}
                        className="inline-flex items-center rounded-full border border-gold/30 bg-gold/[0.08] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-gold/90 backdrop-blur-sm"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold">
                    Abrir guia
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
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
          <h2 className="font-serif text-3xl text-cream md:text-5xl">Cidades</h2>
          <p className="mt-3 text-cream/70">
            Cada guia é uma cidade que percorri a pé, com tempo. Abre o que te interessar.
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
      <li className={`${base} ${tone}`} title="Melhor época">
        {city.bestSeason}
      </li>
      <li className={`${base} ${tone}`} title="Nível de preço">
        {city.price}
      </li>
      <li className={`${base} ${tone}`} title="Ideal para">
        {city.idealFor}
      </li>
    </ul>
  );
}

function CityCard({ city }: { city: CityMeta }) {
  const isReady = city.status === "ready";

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

      {!isReady && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold backdrop-blur">
          <Lock className="h-3 w-3" /> Em breve
        </span>
      )}

      <div className="absolute inset-x-4 bottom-4">
        <div className="glass rounded-xl px-4 py-3">
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
                Abrir guia <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            )}
          </div>
          {isReady && (
            <div className="mt-2">
              <PremiumCardTag slug={city.slug} />
            </div>
          )}
        </div>
      </div>
    </article>
  );

  if (isReady && city.to) {
    return (
      <Link to={city.to} aria-label={`Abrir guia de ${city.name}`} className="block rounded-2xl outline-none">
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

function MethodStrip() {
  const items = [
    { icon: Footprints, label: "Feito a pé" },
    { icon: Coffee, label: "Ritmo tranquilo" },
    { icon: Compass, label: "Sem turistadas" },
    { icon: Clock, label: "Horários sugeridos" },
  ];
  return (
    <section className="px-6 pb-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-gold/70">
          Como faço estes guias
        </p>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {items.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-2.5 rounded-xl border border-gold/10 bg-plum/20 px-4 py-5 text-center transition-colors hover:border-gold/25"
            >
              <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} aria-hidden />
              <span className="text-[12px] uppercase tracking-[0.18em] text-cream/75">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------- EUROPE MAP ----------------------- */

const MAP_W = 1000;
const MAP_H = 720;

function EuropeMap() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.25 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Connect only the active guides — a single calm line between them.
  const activeCities = CITIES.filter((c) => c.status === "ready");
  const pairs: Array<[CityMeta, CityMeta]> = [];
  for (let i = 0; i < activeCities.length - 1; i++) {
    pairs.push([activeCities[i], activeCities[i + 1]]);
  }

  return (
    <section id="mapa" className="relative px-6 py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 max-w-2xl"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">Constelação</p>
          <h2 className="font-serif text-3xl text-cream md:text-5xl">O mapa das viagens</h2>
        </motion.div>

        <div className="relative overflow-hidden rounded-3xl border border-gold/15 bg-plum/25 p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-6">
          {/* sea background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "oklch(0.16 0.035 290)" }}
          />
          {/* radial golden glow behind the map */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 45% 55%, oklch(0.82 0.14 78 / 14%), transparent 55%), radial-gradient(ellipse at 80% 20%, oklch(0.62 0.14 38 / 10%), transparent 50%)",
            }}
          />
          <div
            role="img"
            aria-label="Mapa da Europa com as cidades visitadas"
            className="relative"
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ center: [10, 52], scale: 700 }}
              width={MAP_W}
              height={MAP_H}
              style={{ width: "100%", height: "auto", display: "block" }}
            >
              <defs>
                <filter id="pinGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>

              <Geographies geography={worldGeo as unknown as object}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "oklch(0.28 0.055 310)",
                          stroke: "oklch(0.82 0.14 78 / 0.18)",
                          strokeWidth: 0.4,
                          outline: "none",
                        },
                        hover: {
                          fill: "oklch(0.28 0.055 310)",
                          stroke: "oklch(0.82 0.14 78 / 0.18)",
                          strokeWidth: 0.4,
                          outline: "none",
                        },
                        pressed: {
                          fill: "oklch(0.28 0.055 310)",
                          stroke: "oklch(0.82 0.14 78 / 0.18)",
                          strokeWidth: 0.4,
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* connector constellation lines */}
              {pairs.map(([a, b]) => (
                <motion.g
                  key={`${a.slug}-${b.slug}`}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={reduce ? undefined : { opacity: visible ? 1 : 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                >
                  <Line
                    from={[a.coords.lng, a.coords.lat]}
                    to={[b.coords.lng, b.coords.lat]}
                    stroke="oklch(0.82 0.14 78 / 0.32)"
                    strokeWidth={0.8}
                    strokeDasharray="2 5"
                    strokeLinecap="round"
                  />
                </motion.g>
              ))}

              {/* pins */}
              {CITIES.map((city, i) => (
                <CityMarker
                  key={city.slug}
                  city={city}
                  visible={visible}
                  reduce={!!reduce}
                  delay={0.2 + i * 0.15}
                />
              ))}
            </ComposableMap>
          </div>

          <p className="mt-6 text-center font-serif text-sm italic text-gold/85 md:text-base">
            Uma cidade percorrida, e o mapa só vai crescer.
          </p>
        </div>
      </div>
    </section>
  );
}

function CityMarker({
  city,
  visible,
  reduce,
  delay,
}: {
  city: CityMeta;
  visible: boolean;
  reduce: boolean;
  delay: number;
}) {
  const active = city.status === "ready";
  const dotColor = active ? "oklch(0.82 0.14 78)" : "oklch(0.75 0.03 75 / 0.55)";
  const labelClass = active
    ? "fill-[oklch(0.96_0.02_75)] font-medium"
    : "fill-[oklch(0.75_0.03_75/0.6)]";

  const inner = (
    <motion.g
      initial={reduce ? false : { opacity: 0, scale: 0.4 }}
      animate={
        reduce ? undefined : visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }
      }
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={active ? "cursor-pointer" : ""}
    >
      {active && (
        <>
          <circle r={18} fill={dotColor} opacity={0.25} filter="url(#pinGlow)" />
          {!reduce && (
            <circle r={8} fill="none" stroke={dotColor} strokeWidth={1.2}>
              <animate attributeName="r" from="8" to="22" dur="2.4s" repeatCount="indefinite" />
              <animate
                attributeName="opacity"
                from="0.7"
                to="0"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </>
      )}
      <circle r={active ? 5 : 3.5} fill={dotColor} />
      {active && <circle r={2} fill="oklch(0.96 0.02 75)" />}
      <text
        x={active ? 12 : 9}
        y={4}
        fontSize={active ? 16 : 13}
        className={labelClass}
        style={{ fontFamily: "var(--font-serif)", letterSpacing: "0.02em" }}
      >
        {city.name}
      </text>
    </motion.g>
  );

  const marker = (
    <Marker coordinates={[city.coords.lng, city.coords.lat]}>{inner}</Marker>
  );

  if (active && city.to) {
    return (
      <Link to={city.to} aria-label={`Abrir guia de ${city.name}`}>
        {marker}
      </Link>
    );
  }
  return (
    <g aria-label={`${city.name}: em breve`} opacity={0.85}>
      {marker}
    </g>
  );
}

function About() {
  return (
    <section className="relative px-6 pb-24">
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
          Estes guias são feitos com cuidado. Percorremos cada rua a pé, provámos antes de recomendar, ouvimos cada concerto.
          Aqui só fica o que valeu a pena: horários sugeridos, nunca obrigatórios. Adapta ao teu ritmo.
        </p>
      </motion.div>
    </section>
  );
}

function SiteFooter() {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };
  return (
    <footer className="border-t border-gold/10 px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="space-y-1.5">
          <p className="text-xs text-cream/55">
            O Postal. Guias editoriais de cidades europeias, feitos com calma e partilhados com gosto.
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-cream/35">
            Fotos: Unsplash · Wikimedia Commons
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-gold transition-colors hover:border-gold/60 hover:bg-gold/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-live="polite"
        >
          <Link2 className="h-3.5 w-3.5" />
          {copied ? "Link copiado" : "Copiar link"}
        </button>
      </div>
    </footer>
  );
}