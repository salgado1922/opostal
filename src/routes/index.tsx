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
} from "lucide-react";
import { CITIES, type CityMeta } from "@/data/cities";
import hubHero from "@/assets/hub-hero.jpg";
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
      { title: "Viagens do Carlos — Guias de viagem ao meu ritmo" },
      {
        name: "description",
        content:
          "Guias de viagem editoriais, testados por mim, cidade a cidade. Praga já está disponível; Roma, Lisboa e Viena em breve.",
      },
      { property: "og:title", content: "Viagens do Carlos — Guias de viagem ao meu ritmo" },
      {
        property: "og:description",
        content: "Guias de viagem ao meu ritmo — testados por mim, cidade a cidade.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", name: "Viagens do Carlos", url: "/" },
            { "@type": "WebSite", name: "Viagens do Carlos", url: "/" },
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
      <MethodStrip />
      <EuropeMap />
      <About />
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
          className={`font-serif text-base tracking-wide text-gold md:text-lg hover:text-cream transition-colors ${
            scrolled ? "" : "[text-shadow:0_1px_8px_rgba(0,0,0,0.65)]"
          }`}
        >
          Viagens do Carlos
        </Link>
        <a
          href="#cidades"
          className={`text-xs uppercase tracking-[0.2em] transition-colors ${
            scrolled ? "text-cream/70 hover:text-cream" : "text-cream/90 hover:text-cream [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]"
          }`}
        >
          Cidades
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center justify-center overflow-hidden px-6 pt-24">
      <img
        src={hubHero}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold/80">
          Diários de viagem · Europa
        </p>
        <h1 className="text-gradient-gold font-serif text-5xl leading-[1.05] md:text-7xl">
          Viagens do Carlos — Guias de viagem ao meu ritmo
        </h1>
        <div className="mx-auto my-6 h-px w-24 bg-gold/60" />
        <p className="mx-auto max-w-xl text-base text-cream/85 md:text-lg">
          Guias de viagem ao meu ritmo — testados por mim, cidade a cidade.
        </p>
        <p className="mx-auto mt-4 max-w-lg text-sm text-cream/60 md:text-[15px]">
          Roteiros de ritmo tranquilo, sem turistadas — para quem quer ver bem, em vez de ver tudo.
        </p>
        <div className="mt-10 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-cream/60">
          <span className="h-px w-8 bg-gold/40" />
          <a href="#cidades" className="gold-link">Ver cidades</a>
          <span className="h-px w-8 bg-gold/40" />
        </div>
      </motion.div>
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
    <div aria-disabled="true" aria-label={`${city.name} — em breve`}>
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

  // Pairs of cities for constellation connectors
  const pairs: Array<[CityMeta, CityMeta]> = [];
  for (let i = 0; i < CITIES.length; i++) {
    for (let j = i + 1; j < CITIES.length; j++) {
      pairs.push([CITIES[i], CITIES[j]]);
    }
  }

  return (
    <section className="relative px-6 py-24 md:py-32">
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
            Uma cidade percorrida — e o mapa só vai crescer.
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
    <g aria-label={`${city.name} — em breve`} opacity={0.85}>
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
          Estes guias são pessoais. Caminhei cada rua, comi em cada mesa, escutei cada concerto.
          Aqui só fica o que valeu a pena — horários sugeridos, nunca obrigatórios. Adapta ao teu ritmo.
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
          <p className="font-serif text-base text-cream/85">Viagens do Carlos</p>
          <p className="text-xs text-cream/55">
            Guias editoriais de cidades europeias — feitos com calma, partilhados com gosto.
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