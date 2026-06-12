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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Viagens do Carlos — Guias de viagem ao meu ritmo" },
      {
        name: "description",
        content:
          "Guias de viagem editoriais, testados por mim, cidade a cidade. Praga já está disponível; Roma, Lisboa e Viena em breve.",
      },
      { property: "og:title", content: "Viagens do Carlos" },
      {
        property: "og:description",
        content: "Guias de viagem ao meu ritmo — testados por mim, cidade a cidade.",
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
          Viagens do Carlos
        </h1>
        <div className="mx-auto my-6 h-px w-24 bg-gold/60" />
        <p className="mx-auto max-w-xl text-base text-cream/85 md:text-lg">
          Guias de viagem ao meu ritmo — testados por mim, cidade a cidade.
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

function CityCard({ city }: { city: (typeof CITIES)[number] }) {
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
  return (
    <footer className="border-t border-gold/10 px-6 py-10 text-center text-xs uppercase tracking-[0.25em] text-cream/50">
      Viagens do Carlos · feito com calma
    </footer>
  );
}