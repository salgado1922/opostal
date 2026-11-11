import { SmartImage } from "@/components/SmartImage";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CITIES, type CityMeta } from "@/data/cities";
import hubHero from "@/assets/hub-hero.jpg";
import pragaImg from "@/assets/city-praga.jpg";
import istambulImg from "@/assets/istambul/home-card.jpg";
import florencaImg from "@/assets/city-florenca.jpg";
import londresImg from "@/assets/city-londres.jpg";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

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
    <main
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-background"
    >
      <SiteNav />
      <Hero />
      <CityGrid />
      <HowItWorks />
      <About />
      <SiteFooter />
    </main>
  );
}

/* ---------------- HERO ---------------- */

const HERO_SLIDES: { src: string; alt: string }[] = [
  { src: hubHero, alt: "Cidade europeia ao entardecer" },
  { src: pragaImg, alt: "Praga ao pôr-do-sol sobre o rio Vltava" },
  { src: istambulImg, alt: "Istambul à hora azul sobre o Bósforo" },
  { src: florencaImg, alt: "Florença com o Duomo e os telhados ao fim da tarde" },
  { src: londresImg, alt: "Londres com o Big Ben e o Tamisa à hora dourada" },
  {
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2400&q=80",
    alt: "Paris com a Torre Eiffel vista do Trocadéro à luz dourada",
  },
];

function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const postmarkRef = useRef<HTMLDivElement | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !visible) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [reduce, visible]);

  const goToCidades = () => {
    document.getElementById("cidades")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] flex min-h-[100svh] items-end overflow-hidden md:min-h-screen"
    >
      <div className="absolute inset-0 -z-10">
        {HERO_SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <SmartImage
          sizes="100vw"
              key={slide.src}
              src={slide.src}
              alt={i === 0 ? slide.alt : ""}
              aria-hidden={i !== 0}
              width={1920}
              height={1080}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out"
              style={{
                opacity: active ? 1 : 0,
              }}
            />
          );
        })}

        <div className="absolute inset-0 bg-background/25" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div
        ref={postmarkRef}
        aria-hidden
        className="pointer-events-none absolute right-6 top-28 hidden md:right-12 md:top-32 md:block"
        style={{ transform: "rotate(-10deg)" }}
      >
        <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-dashed border-gold opacity-60">
          <div className="flex h-[82%] w-[82%] flex-col items-center justify-center rounded-full border border-gold">
            <span className="font-serif text-[11px] uppercase tracking-[0.42em] text-gold">
              O Postal
            </span>
            <span className="mt-2 text-[9px] uppercase tracking-[0.3em] text-gold/85">MMXXVI</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 pt-32 md:px-10 md:pb-28 md:pt-44">
        <div className="max-w-4xl">
          <div className="mb-5 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-gold [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
            <span className="h-px w-10 bg-gold/70 md:w-12" />
            Correspondência de viagem
          </div>
          <h1
            className="font-serif font-semibold text-cream [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
            style={{ margin: 0, lineHeight: 0.92, letterSpacing: "-0.025em", fontSize: "clamp(4.2rem, 15vw, 10rem)" }}
          >
            O Postal
          </h1>
          <p className="mt-6 max-w-xl font-serif text-xl italic leading-snug text-cream/90 md:text-2xl [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
            Roteiros escritos à mão, cidade a cidade, depois de lá termos andado. Em português e de borla.
          </p>
          <div className="mt-8 h-px w-full max-w-xl bg-gradient-to-r from-gold/60 via-gold/20 to-transparent" />
          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
            <button
              type="button"
              onClick={goToCidades}
              className="gold-link inline-flex min-h-11 items-center gap-2 text-[13px] uppercase tracking-[0.25em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Ver as cidades <span aria-hidden>↓</span>
            </button>
            <span className="font-hand text-[1.35rem] text-cream/80 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              nove postais, nove cidades
            </span>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-2 md:mt-14" aria-hidden>
          {HERO_SLIDES.map((_, i) => (
            <span
              key={i}
              className={`h-px transition-all duration-700 ${i === index ? "w-10 bg-gold" : "w-5 bg-cream/30"}`}
            />
          ))}
        </div>
      </div>


    </section>
  );
}

/* ---------------- CITY GRID (flip postcards) ---------------- */

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

const CITY_MESSAGES: Record<string, string> = {
  praga: "Subi ao castelo ao fim da tarde e a cidade inteira ficou cor de mel. Guardei-te o melhor banco.",
  istambul: "Atravessei a pé de um continente ao outro. Cheira a especiarias, a chá e a maresia. Vem ver.",
  florenca: "O Duomo abriu-se entre os telhados como se fosse a primeira vez. O Renascimento ainda mora aqui.",
  londres: "Chuva miudinha, museus de graça e um chá a ferver. Saiu mais barato do que toda a gente jura.",
  barcelona: "Subi ao Park Güell antes do calor e desci até ao mar. Gaudí faz mais sentido a pé.",
  paris: "Ainda a passear pelos bairros e a escolher os cafés certos. Não tarda mando-te postal.",
  viena: "Bolo e café à hora certa, valsa no fundo e um palácio a cada esquina. Traz sapatos calmos.",
  lisboa: "Perdi-me de propósito em Alfama e acabei num miradouro só nosso. Vou levar-te lá.",
  budapeste: "Terminei o dia nas termas com o Parlamento aceso do outro lado do Danúbio. Inesquecível.",
};

function CityGrid() {
  // Só um postal pode estar virado de cada vez.
  const [flippedSlug, setFlippedSlug] = useState<string | null>(null);
  return (
    <section id="cidades" className="relative z-[2] scroll-mt-16 py-14 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 md:mb-14">
          <div className="mb-4 flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] text-gold">
            <span className="h-px w-10 bg-gold/70 md:w-12" />
            N.º 01 — 09
          </div>
          <h2 className="max-w-3xl font-serif text-[2.6rem] leading-[1.02] text-cream md:text-6xl">
            Os postais que já mandámos
          </h2>
          <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-muted-foreground">
            Toca num postal para o virar e ler o recado. Atrás está o roteiro.
          </p>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-gold/50 via-gold/15 to-transparent" />
        </div>
      </div>

      {/* Telemóvel: fila deslizante; computador: grelha */}
      <ul
        className="no-scrollbar flex snap-x snap-mandatory list-none gap-4 overflow-x-auto overscroll-x-contain scroll-px-6 px-6 pb-2 md:mx-auto md:grid md:max-w-6xl md:snap-none md:gap-7 md:overflow-visible md:p-0 md:px-6"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        aria-label="Postais das cidades"
      >
        {CITIES.map((city) => (
          <li key={city.slug} className="postcard-perspective w-[78vw] max-w-[340px] shrink-0 snap-start md:w-auto md:max-w-none">
            <PostcardFlip
              city={city}
              flipped={flippedSlug === city.slug}
              onToggle={() =>
                setFlippedSlug((cur) => (cur === city.slug ? null : city.slug))
              }
            />
          </li>
        ))}
      </ul>
      <p className="mt-3 px-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:hidden" aria-hidden>
        desliza → 
      </p>

      <CityIndex />
    </section>
  );
}

function CityIndex() {
  return (
    <nav aria-label="Índice das cidades" className="mx-auto mt-14 max-w-6xl px-6 md:mt-24">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl italic text-cream md:text-3xl">Índice</h3>
        <span className="text-[11px] uppercase tracking-[0.3em] text-gold/80">vai direto ao roteiro</span>
      </div>
      <ol className="list-none border-t border-gold/25 p-0 md:grid md:grid-cols-2 md:gap-x-12">
        {CITIES.map((city, i) => {
          const ready = city.status === "ready" && city.to;
          const inner = (
            <>
              <span className="w-8 shrink-0 font-serif text-lg italic text-gold">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-serif text-2xl leading-tight text-cream">{city.name}</span>
                <span className="block truncate text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {city.country} · {city.duration}
                </span>
              </span>
              <span aria-hidden className="shrink-0 text-xl text-gold transition-transform group-hover:translate-x-1">
                {ready ? "→" : "·"}
              </span>
            </>
          );
          return (
            <li key={city.slug} className="border-b border-gold/15">
              {ready ? (
                <Link
                  to={city.to!}
                  className="group flex min-h-[64px] items-center gap-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {inner}
                </Link>
              ) : (
                <div className="flex min-h-[64px] items-center gap-4 py-3 opacity-50">{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function PostcardFlip({
  city,
  flipped,
  onToggle,
}: {
  city: CityMeta;
  flipped: boolean;
  onToggle: () => void;
}) {
  const ready = city.status === "ready";
  const code = CITY_STAMP_CODES[city.slug] ?? city.slug.slice(0, 3).toUpperCase();
  const message = CITY_MESSAGES[city.slug] ?? "Postal em preparação. Em breve mando-te notícias.";
  const stampValue = ready ? "Visitado" : "Em breve";
  const stampInk = ready ? "oklch(0.62 0.14 38)" : "oklch(0.75 0.03 75)";

  return (
    <div
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={(ready ? "Abrir postal de " : "Em breve: ") + city.name}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className="postcard-flip relative w-full cursor-pointer rounded-[3px] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        aspectRatio: "4 / 5",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
      {/* FRONT */}
      <article
        className="postcard-face postcard-front absolute inset-0 overflow-hidden rounded-[3px] shadow-[0_10px_34px_-18px_rgba(0,0,0,0.8)]"
        style={{ background: "oklch(0.22 0.055 320 / 0.4)" }}
      >
        <SmartImage
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 620px"
          src={city.cover}
          alt={city.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: ready ? undefined : "grayscale(1) brightness(.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Selo serrilhado */}
        <div
          className="absolute left-3 top-3"
          style={{ transform: "rotate(-6deg)" }}
        >
          <div
            className="flex h-20 w-16 flex-col items-center justify-between px-1.5 py-2 text-center"
            style={{
              background:
                "linear-gradient(150deg, oklch(0.96 0.02 75 / 0.92), oklch(0.96 0.02 75 / 0.75))",
              WebkitMask:
                "radial-gradient(circle 3px at 7px 0, transparent 98%, #000 100%) top/14px 7px repeat-x, radial-gradient(circle 3px at 7px 100%, transparent 98%, #000 100%) bottom/14px 7px repeat-x, radial-gradient(circle 3px at 0 7px, transparent 98%, #000 100%) left/7px 14px repeat-y, radial-gradient(circle 3px at 100% 7px, transparent 98%, #000 100%) right/7px 14px repeat-y, linear-gradient(#000,#000) center/calc(100% - 14px) calc(100% - 14px) no-repeat",
              mask:
                "radial-gradient(circle 3px at 7px 0, transparent 98%, #000 100%) top/14px 7px repeat-x, radial-gradient(circle 3px at 7px 100%, transparent 98%, #000 100%) bottom/14px 7px repeat-x, radial-gradient(circle 3px at 0 7px, transparent 98%, #000 100%) left/7px 14px repeat-y, radial-gradient(circle 3px at 100% 7px, transparent 98%, #000 100%) right/7px 14px repeat-y, linear-gradient(#000,#000) center/calc(100% - 14px) calc(100% - 14px) no-repeat",
            }}
          >
            <span className="font-serif text-[8px] uppercase tracking-[0.28em]" style={{ color: "color-mix(in oklab, oklch(0.62 0.14 38) 90%, black)" }}>
              Postal
            </span>
            <span className="font-serif text-[20px] font-bold leading-none tracking-[0.04em]" style={{ color: "color-mix(in oklab, oklch(0.62 0.14 38) 88%, black)" }}>
              {code}
            </span>
            <span className="font-serif text-[8px] uppercase tracking-[0.18em]" style={{ color: "color-mix(in oklab, oklch(0.62 0.14 38) 80%, black)" }}>
              {stampValue}
            </span>
          </div>
        </div>

        {/* Flip hint — texto simples, sem pílula */}
        <span className="absolute right-4 top-4 text-[11px] italic text-cream/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
          {flipped ? "verso" : "vira →"}
        </span>

        {/* Texto sobre a foto, sem caixa */}
        <div className="absolute inset-x-5 bottom-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-serif text-3xl leading-none text-cream [text-shadow:0_1px_10px_rgba(0,0,0,0.55)]">{city.name}</h3>
            <span className="text-[10px] uppercase tracking-[0.25em] text-cream/75">{city.country}</span>
          </div>
          <p className="mt-2 font-serif italic text-cream/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">{city.vibe}</p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-cream/60">
            {city.duration} · <span className="text-gold-soft">{ready ? "vira o postal →" : "em breve"}</span>
          </p>
        </div>
      </article>

      {/* BACK */}
      <article
        className="postcard-face postcard-back absolute inset-0 overflow-hidden rounded-[3px] shadow-[0_10px_34px_-18px_rgba(0,0,0,0.8)]"
        style={{
          background:
            "oklch(0.20 0.05 318)",
          backgroundImage:
            "repeating-linear-gradient(135deg, oklch(0.82 0.14 78 / 0.045) 0 2px, transparent 2px 13px)",
        }}
      >
        <div className="absolute inset-0 flex flex-col p-5">
          <div className="flex items-start justify-between">
            <span className="text-[9px] uppercase tracking-[0.35em] text-gold">
              Mensagem · {city.name}
            </span>
          </div>
          <p className="mt-2.5 font-hand text-[1.32rem] font-medium leading-snug text-cream">
            {message}
          </p>
          <p className="mt-auto font-hand text-[1.12rem] text-cream/85">— O Postal</p>

          <div className="mt-3.5 flex items-end justify-between border-t border-dashed border-gold/25 pt-3">
            {ready && city.to ? (
              <Link
                to={city.to}
                onClick={(e) => e.stopPropagation()}
                className="gold-link inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em]"
              >
                Abrir roteiro <span aria-hidden>→</span>
              </Link>
            ) : (
              <span className="text-[11px] uppercase tracking-[0.2em] text-cream/50">
                Em breve
              </span>
            )}
            {/* mini postmark */}
            <div
              className="flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-dashed border-gold/70"
              style={{ transform: "rotate(-10deg)" }}
            >
              <div className="flex h-[80%] w-[80%] flex-col items-center justify-center rounded-full border border-gold/80">
                <span className="font-serif text-[8px] uppercase tracking-[0.2em] text-gold">{code}</span>
                <span className="mt-0.5 text-[6.5px] uppercase tracking-[0.18em] text-gold/85">MMXXVI</span>
              </div>
            </div>
          </div>
        </div>

        {/* INK STAMP que aparece ao virar */}
        {flipped && (
          <div
            className="pointer-events-none absolute right-3.5 top-3.5"
            style={{ animation: "stampPress .7s cubic-bezier(.2,.9,.3,1) forwards" }}
          >
            <div
              className="rounded-md px-2.5 py-1.5 font-serif text-sm font-bold uppercase tracking-[0.18em] opacity-90"
              style={{
                border: `2.5px solid ${stampInk}`,
                color: stampInk,
                transform: "rotate(-12deg)",
                boxShadow: `inset 0 0 0 1px ${stampInk}`,
              }}
            >
              {stampValue}
            </div>
          </div>
        )}
      </article>

      <style>{`@keyframes stampPress{0%{transform:scale(2.6) rotate(-26deg);opacity:0;filter:blur(2px)}55%{opacity:1}70%{transform:scale(.92) rotate(-10deg)}100%{transform:scale(1) rotate(-12deg);opacity:.92;filter:blur(0)}}`}</style>
    </div>
  );
}

/* ---------------- HOW IT WORKS (carta) ---------------- */

const STEPS: { title: string; body: string }[] = [
  { title: "Escolhes a cidade.", body: "Viras o postal e abres o roteiro. Não pedimos email nem conta." },
  { title: "Levas o roteiro no bolso.", body: "Dias, horários e mapa. Os horários são sugestões — atrasa-te à vontade." },
  { title: "Vais aos sítios que valem.", body: "Só escrevemos sobre o que comemos e caminhámos. Ninguém nos paga para pôr lá nada." },
];

function HowItWorks() {
  return (
    <section id="como-funciona" className="relative z-[2] px-6 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-10 bg-gold/70 md:w-12" />
          Como funciona
        </div>
        <h2 className="max-w-3xl font-serif text-[2.4rem] leading-[1.04] text-cream md:text-6xl">
          <span className="font-hand text-gold-soft">Olá,</span> sem complicações.
        </h2>
        <ol className="mt-10 list-none border-t border-gold/25 p-0 md:mt-14 md:grid md:grid-cols-3 md:border-t-0">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="flex gap-5 border-b border-gold/15 py-6 md:block md:border-b-0 md:border-l md:border-gold/20 md:px-8 md:py-2 md:first:border-l-0 md:first:pl-0"
            >
              <span
                aria-hidden
                className="shrink-0 font-serif text-5xl leading-none md:text-7xl"
                style={{ color: "transparent", WebkitTextStroke: "1px color-mix(in oklab, var(--gold) 55%, transparent)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 md:mt-6">
                <h3 className="font-serif text-2xl leading-tight text-cream">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-[11px] uppercase tracking-[0.25em] text-gold/70">
          Gratuito · Sem registo · Em português
        </p>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */

function About() {
  return (
    <section id="sobre" className="relative z-[2] px-6 pb-20 pt-4 md:pb-28">
      <div className="mx-auto max-w-3xl border-t border-gold/25 pt-12 text-center md:pt-16">
        <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold/80">Quem escreve</p>
        <p className="font-serif text-2xl italic leading-snug text-cream/90 md:text-4xl">
          Viajamos devagar e voltamos com cadernos cheios. O que não valeu a pena fica de fora — o resto vem parar aqui.
        </p>
        <p className="mt-6 font-hand text-2xl text-gold-soft">— Um abraço, O Postal</p>
      </div>
    </section>
  );
}
