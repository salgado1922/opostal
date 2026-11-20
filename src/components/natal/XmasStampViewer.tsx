import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { XMAS_SEASON, dayLabel, xmasWindow, type XmasSlug } from "@/data/natal-stamps";
import { XmasStamp } from "./XmasStamp";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  slug: XmasSlug;
  city: string;
  at: string;
  market: string;
};

const fmtDay = (iso: string) => {
  const d = new Date(iso);
  return `${d.getDate()} de ${d.toLocaleDateString("pt-PT", { month: "long" })} de ${d.getFullYear()}`;
};

/** Ver o carimbo de Natal em grande: inclina-se com o dedo ou o rato e a folha dourada apanha a luz. */
export function XmasStampViewer({ open, onOpenChange, slug, city, at, market }: Props) {
  const reduce = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 30 });
  const win = xmasWindow(slug);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - y) * 22, ry: (x - 0.5) * 22, gx: x * 100, gy: y * 100 });
  };
  const reset = () => setT({ rx: 0, ry: 0, gx: 50, gy: 30 });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="theme-natal max-h-[92dvh] w-[calc(100vw-1.5rem)] max-w-md overflow-y-auto rounded-none border-gold/40 p-6 text-cream sm:p-8">
        <p className="text-center text-[10px] uppercase tracking-[0.35em] text-gold/80">Carimbo raro · Natal {XMAS_SEASON}</p>
        <div
          className="relative mx-auto mt-5 w-[min(78vw,320px)] touch-none"
          style={{ perspective: "900px" }}
          onPointerMove={move}
          onPointerLeave={reset}
          onPointerUp={reset}
        >
          <div
            className="relative transition-transform duration-200 ease-out"
            style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transformStyle: "preserve-3d" }}
          >
            <XmasStamp slug={slug} city={city} at={at} className="w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]" />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-[9%] rounded-full mix-blend-soft-light"
              style={{ background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, var(--foil-light), transparent 55%)`, opacity: 0.9 }}
            />
          </div>
        </div>
        <DialogTitle className="mt-6 text-center font-serif text-3xl font-normal leading-tight text-cream">
          Natal em <em className="text-gold">{city}</em>
        </DialogTitle>
        <DialogDescription asChild>
          <div className="mt-2 text-center text-cream/80">
            <p className="font-serif text-lg italic">Mercado de {market} · {fmtDay(at)}</p>
            <div className="mx-auto mt-5 h-px w-24 bg-gold/40" />
            <p className="mt-5 text-sm leading-relaxed">
              Um dos carimbos mais difíceis do passaporte: só se ganha dentro de um mercado de Natal aberto, com o telemóvel a confirmar onde estás, entre {dayLabel(win.open)} e {dayLabel(win.close)}. Depois disso, só no próximo Natal.
            </p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
