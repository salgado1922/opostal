import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CITIES } from "@/data/cities";
import { STAMP_STOPS, type StampStop } from "@/data/stamp-stops";
import type { Stamp } from "@/lib/passport";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Passport } from "@/lib/passport";
import { InkStamp } from "./InkStamp";
import { STAMP_STYLE, inkFor, seeded, stampDate } from "./stamps";


function Cover() {
  return (
    <div
      className="relative flex h-full flex-col items-center justify-between px-8 py-12 text-center"
      style={{
        background:
          "radial-gradient(120% 90% at 30% 20%, var(--passport-cover), var(--passport-cover-deep))",
        color: "var(--gold)",
      }}
    >
      <div className="absolute inset-3 border" style={{ borderColor: "color-mix(in oklab, var(--gold) 45%, transparent)" }} />
      <p className="relative text-[11px] uppercase tracking-[0.5em]">República dos Postais</p>
      <div className="relative">
        <svg viewBox="0 0 120 120" width="110" aria-hidden className="mx-auto">
          <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="60" cy="60" rx="22" ry="52" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <line x1="8" x2="112" y1="60" y2="60" stroke="currentColor" strokeWidth="1.2" />
          <path d="M14 38 H106 M14 82 H106" stroke="currentColor" strokeWidth="1" />
          <text x="60" y="66" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="18" fill="currentColor" fontStyle="italic">
            O P
          </text>
        </svg>
        <h3 className="mt-6 font-serif text-4xl tracking-[0.1em] sm:text-5xl" style={{ textShadow: "0 1px 0 color-mix(in oklab, black 50%, transparent)" }}>
          PASSAPORTE
        </h3>
        <p className="mt-2 font-serif text-lg italic opacity-80">Passport · Passeport</p>
      </div>
      <p className="relative text-[11px] uppercase tracking-[0.5em]">O Postal</p>
    </div>
  );
}

function CityPage({ slug, p, n, total, onOpen }: { slug: string; p: Passport; n: number; total: number; onOpen: (o: Open) => void }) {
  const city = CITIES.find((c) => c.slug === slug)!;
  const cp = p[slug];
  const style = STAMP_STYLE[slug] ?? { shape: "circle" as const, motif: "✦", code: slug.slice(0, 3).toUpperCase() };
  const entries = cp ? Object.entries(cp.stamps).sort((a, b) => a[1].at.localeCompare(b[1].at)) : [];
  const first = entries[0]?.[1];
  const ink = inkFor(slug);
  const confirmed = entries.filter(([, s]) => s.verified).length;
  return (
    <div
      className="relative h-full overflow-hidden px-6 pb-6 pt-5"
      style={{
        backgroundColor: "var(--passport-paper)",
        backgroundImage:
          "repeating-radial-gradient(circle at 50% 120%, transparent 0 9px, color-mix(in oklab, var(--passport-paper-shade) 55%, transparent) 9px 10px), linear-gradient(90deg, color-mix(in oklab, var(--passport-paper-shade) 70%, transparent), transparent 8%)",
        color: "var(--ink)",
      }}
    >
      <div className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.3em] opacity-70">
        <span>Vistos · Visas</span>
        <span>
          {n} / {total}
        </span>
      </div>
      <div className="mt-1 h-px opacity-30" style={{ background: "var(--ink)" }} />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-serif text-4xl leading-none">{city.name}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.25em] opacity-70">{city.country}</p>
          <p className="mt-3 font-serif text-sm italic opacity-80">
            {entries.length ? `${entries.length} de ${cp!.total} carimbos · ${confirmed} confirmadas` : "Por carimbar"}
          </p>
        </div>
        <InkStamp
          top={city.name}
          center={first ? stampDate(first.at).split(" ").slice(0, 2).join(" ") : style.code}
          sub={first ? style.code : undefined}
          motif={style.motif}
          ink={ink}
          shape={style.shape}
          size={132}
          rotate={-8 + seeded(slug) * 16}
          ghost={!first}
          title={first ? `Carimbo de ${city.name}` : undefined}
        />
      </div>

      <div className="relative mt-2 grid grid-cols-3 gap-x-2 gap-y-0">
        {(STAMP_STOPS[slug] ?? []).map((st) => {
          const s = cp?.stamps[st.title];
          const r = seeded(st.title);
          return (
            <button
              key={st.title}
              type="button"
              onClick={() => onOpen({ slug, stop: st, stamp: s })}
              aria-label={`${st.label}${s ? ", carimbado" : ", por carimbar"}. Ver carimbo`}
              className="flex justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]"
              style={{ transform: `translate(${(r - 0.5) * 12}px, ${(seeded(st.title + "y") - 0.5) * 10}px)` }}
            >
              <InkStamp
                top={st.label.length > 16 ? `${st.label.slice(0, 15).trim()}…` : st.label}
                bottom={s?.verified ? "CONFIRMADO" : city.name}
                center={s ? stampDate(s.at).split(" ").slice(0, 2).join(" ") : ""}
                icon={st.motif}
                ink={ink}
                shape={style.shape}
                size={84}
                rotate={(r - 0.5) * 24}
                ghost={!s}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

type Open = { slug: string; stop: StampStop; stamp?: Stamp };

function StampPreview({ open, onClose }: { open: Open | null; onClose: () => void }) {
  const city = open ? CITIES.find((c) => c.slug === open.slug) : undefined;
  const style = open ? STAMP_STYLE[open.slug] : undefined;
  return (
    <Dialog open={!!open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-sm rounded-none border-0 p-8 text-center"
        style={{ backgroundColor: "var(--passport-paper)", color: "var(--ink)" }}
      >
        {open && city && style && (
          <>
            <div className="flex justify-center">
              <InkStamp
                top={open.stop.label}
                bottom={open.stamp?.verified ? "CONFIRMADO" : city.name}
                center={open.stamp ? stampDate(open.stamp.at) : ""}
                icon={open.stop.motif}
                ink={inkFor(open.slug)}
                shape={style.shape}
                size={250}
                rotate={-4}
                ghost={!open.stamp}
              />
            </div>
            <DialogTitle className="mt-4 font-serif text-3xl font-normal">{open.stop.label}</DialogTitle>
            <DialogDescription className="font-serif text-base italic" style={{ color: "var(--ink)" }}>
              {city.name} ·{" "}
              {open.stamp
                ? `${new Date(open.stamp.at).toLocaleString("pt-PT", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })} · ${open.stamp.verified ? "confirmado no local" : "sem confirmação"}`
                : "por carimbar — abre o modo de rua quando lá estiveres"}
            </DialogDescription>
            {open.stamp?.photo && (
              <img src={open.stamp.photo} alt={`A tua fotografia em ${open.stop.label}`} className="mx-auto mt-4 w-40 rotate-2 border-[6px] border-[color:var(--cream)] shadow-md" />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Passaporte em livro: capa e uma página de vistos por cidade, folheável. */
export function PassportBook({ p }: { p: Passport }) {
  const reduce = useReducedMotion();
  const cities = CITIES.filter((c) => c.status === "ready").map((c) => c.slug);
  const pages = ["cover", ...cities];
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [openStamp, setOpenStamp] = useState<Open | null>(null);
  const touch = useRef<number | null>(null);
  const go = (to: number) => {
    const n = Math.max(0, Math.min(pages.length - 1, to));
    setDir(n > page ? 1 : -1);
    setPage(n);
  };
  const current = pages[page];
  const label = current === "cover" ? "Capa" : CITIES.find((c) => c.slug === current)?.name;

  return (
    <div className="mx-auto w-full max-w-[400px]">
      <StampPreview open={openStamp} onClose={() => setOpenStamp(null)} />
      <div
        className="relative aspect-[5/7] w-full [perspective:1600px]"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current == null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 50) go(page + (dx < 0 ? 1 : -1));
          touch.current = null;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(page + 1);
          if (e.key === "ArrowLeft") go(page - 1);
        }}
        tabIndex={0}
        role="group"
        aria-roledescription="livro"
        aria-label={`Passaporte, página ${page + 1} de ${pages.length}: ${label}`}
      >
        {/* páginas por baixo, a dar espessura */}
        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-r-md" style={{ background: "var(--passport-paper-shade)" }} />
        <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] rounded-r-md" style={{ background: "var(--passport-paper)" }} />
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={current}
            custom={dir}
            className="absolute inset-0 overflow-hidden rounded-r-md shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9)]"
            style={{ transformOrigin: "left center" }}
            variants={{
              enter: (d: number) => (reduce ? { opacity: 0 } : d > 0 ? { rotateY: 0, x: 40, opacity: 0 } : { rotateY: -80, x: 0, opacity: 0 }),
              center: { rotateY: 0, x: 0, opacity: 1 },
              exit: (d: number) => (reduce ? { opacity: 0 } : d > 0 ? { rotateY: -95, x: 0, opacity: 0, zIndex: 2 } : { rotateY: 0, x: 40, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.3, 0.7, 0.2, 1] }}
          >
            {current === "cover" ? <Cover /> : <CityPage slug={current} p={p} n={page} total={cities.length} onOpen={setOpenStamp} />}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(page - 1)}
          disabled={page === 0}
          aria-label="Página anterior"
          className="grid h-12 w-12 place-items-center text-gold disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <p className="font-serif text-lg italic text-cream/80" aria-live="polite">
          {label}
        </p>
        <button
          type="button"
          onClick={() => go(page + 1)}
          disabled={page === pages.length - 1}
          aria-label="Página seguinte"
          className="grid h-12 w-12 place-items-center text-gold disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="mt-1 flex justify-center gap-1.5">
        {pages.map((pg, i) => (
          <button
            key={pg}
            type="button"
            onClick={() => go(i)}
            aria-label={pg === "cover" ? "Capa" : CITIES.find((c) => c.slug === pg)?.name}
            className="grid h-6 w-5 place-items-center"
          >
            <span className={`block h-1 rounded-full transition-all ${i === page ? "w-4 bg-gold" : "w-1 bg-cream/35"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
