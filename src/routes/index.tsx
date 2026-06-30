import { createFileRoute, Link } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
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
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, oklch(0.62 0.14 38 / 0.15), transparent 55%),radial-gradient(ellipse at 90% 30%, oklch(0.82 0.14 78 / 0.12), transparent 50%),radial-gradient(ellipse at 50% 100%, oklch(0.22 0.055 320 / 0.6), transparent 60%),oklch(0.16 0.035 290)",
      }}
    >
      <SiteNav />
      <RouteThread />
      <Hero />
      <CityGrid />
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
];

function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const postmarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      const y = window.scrollY;
      const el = postmarkRef.current;
      if (el) el.style.transform = `translateY(${y * 0.18}px) rotate(${-y * 0.01 - 10}deg)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  const goToCidades = () => {
    document.getElementById("cidades")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative z-[2] flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {HERO_SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <img
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
                animation: reduce ? undefined : "kenburns 16s linear infinite alternate",
              }}
            />
          );
        })}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.10_0.03_290/0.55)_0%,transparent_28%,transparent_45%,oklch(0.10_0.03_290/0.78)_80%,oklch(0.16_0.035_290)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_70%,oklch(0.62_0.14_38/0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.05)_60%)]" />
      </div>

      <div
        ref={postmarkRef}
        aria-hidden
        className="pointer-events-none absolute right-6 top-28 hidden md:right-12 md:top-32 md:block"
        style={{ transform: "rotate(-10deg)", willChange: "transform" }}
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

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 pt-40 md:px-10 md:pb-32 md:pt-44">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-gold [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
            Diários de viagem · Europa
          </p>
          <h1
            className="text-gradient-gold font-serif leading-[1.05] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] [-webkit-text-stroke:1.2px_rgba(0,0,0,0.55)]"
            style={{ fontSize: "clamp(2.6rem, 5.4vw, 4.8rem)" }}
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
              <span aria-hidden className="text-base leading-none">→</span>
            </button>
            <span className="font-hand text-[1.45rem] text-cream/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              vira cada postal ↓
            </span>
          </div>
        </div>

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

      <style>{`@keyframes kenburns{from{transform:scale(1.02)}to{transform:scale(1.13)}}`}</style>
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
  barcelona: "Ainda a percorrer cada esquina do Gaudí, com tempo. Este postal está quase pronto para ti.",
  paris: "Ainda a passear pelos bairros e a escolher os cafés certos. Não tarda mando-te postal.",
  viena: "A ouvir valsa nos cafés imperiais. O postal está em escrita.",
  lisboa: "Por casa, mas a redescobri-la rua a rua. Postal quase pronto.",
  budapeste: "Entre termas e o Danúbio. Em breve ponho tudo em postal.",
};

function CityGrid() {
  return (
    <section id="cidades" className="relative z-[2] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 max-w-2xl">
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">Catálogo</p>
          <h2 className="font-serif text-3xl text-cream md:text-5xl">
            Começa com um roteiro gratuito
          </h2>
          <p className="mt-4 text-cream/70 leading-relaxed">
            Cada cidade é um postal. <strong className="text-gold-soft font-semibold">Vira</strong> para leres a mensagem do terreno e abrir o roteiro. Sem registo e sem pagar nada.
          </p>
        </div>

        <p className="mb-10 font-hand text-[1.3rem] text-gold/85">
          Segue o fio dourado — cada postal é uma paragem da viagem.
        </p>

        <ul
          className="grid list-none gap-7 p-0"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {CITIES.map((city) => (
            <li key={city.slug} style={{ perspective: "1600px" }}>
              <PostcardFlip city={city} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PostcardFlip({ city }: { city: CityMeta }) {
  const [flipped, setFlipped] = useState(false);
  const ready = city.status === "ready";
  const code = CITY_STAMP_CODES[city.slug] ?? city.slug.slice(0, 3).toUpperCase();
  const message = CITY_MESSAGES[city.slug] ?? "Postal em preparação. Em breve mando-te notícias.";
  const stampValue = ready ? "Visitado" : "Em breve";
  const stampInk = ready ? "oklch(0.62 0.14 38)" : "oklch(0.75 0.03 75)";

  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={(ready ? "Abrir postal de " : "Em breve: ") + city.name}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      className="relative w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-[18px]"
      style={{
        aspectRatio: "4 / 5",
        transformStyle: "preserve-3d",
        transition: "transform .85s cubic-bezier(.2,.8,.2,1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
      {/* FRONT */}
      <article
        className="absolute inset-0 overflow-hidden rounded-[18px] border border-gold/15 shadow-[0_12px_44px_-22px_rgba(0,0,0,0.85)]"
        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", background: "oklch(0.22 0.055 320 / 0.4)" }}
      >
        <img
          src={city.cover}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: ready ? undefined : "grayscale(1) brightness(.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Selo serrilhado */}
        <div
          className="absolute left-3 top-3"
          style={{ transform: "rotate(-6deg)", filter: "drop-shadow(0 8px 16px rgba(0,0,0,.5))" }}
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

        {/* Flip hint */}
        <span className="absolute right-3 top-3.5 inline-flex items-center gap-1 rounded-full border border-gold/35 bg-background/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-gold-soft backdrop-blur">
          {flipped ? "verso" : "vira →"}
        </span>

        {/* Bottom panel */}
        <div className="absolute inset-x-4 bottom-4">
          <div className="glass rounded-2xl px-4 py-3.5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-2xl leading-none text-cream">{city.name}</h3>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold/80">{city.country}</span>
            </div>
            <p className="mt-2 font-serif italic text-cream/80">{city.vibe}</p>
            <div className="mt-3 flex items-center justify-between border-t border-gold/15 pt-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-cream/60">{city.duration}</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
                {ready ? "vira o postal →" : "em breve"}
              </span>
            </div>
          </div>
        </div>
      </article>

      {/* BACK */}
      <article
        className="absolute inset-0 overflow-hidden rounded-[18px] border border-gold/25 shadow-[0_12px_44px_-22px_rgba(0,0,0,0.85)]"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background:
            "oklch(0.20 0.05 318)",
          backgroundImage:
            "repeating-linear-gradient(135deg, oklch(0.82 0.14 78 / 0.045) 0 2px, transparent 2px 13px)",
        }}
      >
        <div className="absolute inset-[10px] flex flex-col rounded-xl border border-dashed border-gold/35 p-4">
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
                className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/10"
              >
                Abrir roteiro <span aria-hidden>→</span>
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] text-cream/60">
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

/* ---------------- ROUTE THREAD (golden dashed path) ---------------- */

function RouteThread() {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const baseRef = useRef<SVGPathElement | null>(null);
  const progRef = useRef<SVGPathElement | null>(null);
  const tokenRef = useRef<SVGGElement | null>(null);
  const totalRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const build = useCallback(() => {
    const svg = svgRef.current;
    const base = baseRef.current;
    const prog = progRef.current;
    if (!svg || !base || !prog) return;
    const w = window.innerWidth;
    const h = document.documentElement.scrollHeight;
    if (!w || !h) return;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.style.height = `${h}px`;
    const cx = w * 0.5;
    const amp = Math.min(120, w * 0.085);
    const top = h * 0.16;
    const bot = h * 0.9;
    const n = 80;
    let d = "";
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const y = top + (bot - top) * t;
      const x = cx + Math.sin(t * Math.PI * 3.2) * amp * (1 - t * 0.25);
      d += (i === 0 ? "M " : " L ") + x.toFixed(1) + " " + y.toFixed(1);
    }
    base.setAttribute("d", d);
    prog.setAttribute("d", d);
    const total = prog.getTotalLength();
    totalRef.current = total;
    prog.style.strokeDasharray = String(total);
    prog.style.strokeDashoffset = String(total);
  }, []);

  const update = useCallback(() => {
    const prog = progRef.current;
    const token = tokenRef.current;
    const total = totalRef.current;
    if (!prog || !token || !total) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
    prog.style.strokeDashoffset = (total * (1 - p)).toFixed(1);
    const pt = prog.getPointAtLength(total * Math.max(0.001, p));
    token.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
  }, []);

  useEffect(() => {
    build();
    update();
    const t1 = window.setTimeout(() => {
      build();
      update();
    }, 500);
    const t2 = window.setTimeout(() => {
      build();
      update();
    }, 1500);
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };
    const onResize = () => {
      build();
      update();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(() => {
      build();
      update();
    });
    ro.observe(document.body);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [build, update]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-[1] w-full"
      style={{ overflow: "visible" }}
    >
      <path
        ref={baseRef}
        fill="none"
        stroke="oklch(0.82 0.14 78)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="1 11"
        opacity={0.22}
      />
      <path
        ref={progRef}
        fill="none"
        stroke="oklch(0.88 0.09 82)"
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.9}
        style={{ filter: "drop-shadow(0 0 6px oklch(0.82 0.14 78 / 0.6))" }}
      />
      <g ref={tokenRef}>
        <circle
          r={15}
          fill="oklch(0.82 0.14 78)"
          style={reduce ? undefined : { animation: "tokenPulse 2.4s ease-in-out infinite" }}
        />
        <circle r={5.5} fill="oklch(0.88 0.09 82)" />
        <circle r={5.5} fill="none" stroke="oklch(0.96 0.02 75)" strokeWidth={1} opacity={0.7} />
      </g>
      <style>{`@keyframes tokenPulse{0%,100%{opacity:.14;transform:scale(1)}50%{opacity:.32;transform:scale(1.25)}}`}</style>
    </svg>
  );
}

/* ---------------- ABOUT ---------------- */

function About() {
  return (
    <section id="sobre" className="relative z-[2] px-6 pb-28 pt-4">
      <div className="glass mx-auto max-w-3xl rounded-2xl px-8 py-10 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/80">Sobre</p>
        <h2 className="font-serif text-2xl text-cream md:text-3xl">
          Viajar devagar, sem turistadas.
        </h2>
        <p className="mt-4 text-cream/75 leading-relaxed">
          Percorremos cada rua a pé, provámos antes de recomendar. Aqui só fica o que valeu a pena — horários sugeridos, nunca obrigatórios. Chegaste ao fim do fio: agora é a tua vez de partir.
        </p>
      </div>
      <p className="mx-auto mt-12 max-w-3xl text-center text-[11px] uppercase tracking-[0.25em] text-cream/35">
        O Postal · MMXXVI · Diários de viagem
      </p>
    </section>
  );
}
