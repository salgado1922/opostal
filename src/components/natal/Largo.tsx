import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { XMAS_CITIES } from "@/data/mercados-natal";
import { Stall, LargoTree } from "@/components/natal/Stall";
import { CandyCane, Gingerbread, Lamp } from "@/components/natal/Treats";
import { Gift } from "@/components/natal/Festive";

const STEP = 360 / XMAS_CITIES.length;
const at = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return { left: `${Math.round((50 + r * Math.cos(a)) * 10) / 10}%`, top: `${Math.round((50 + r * Math.sin(a)) * 10) / 10}%` };
};

type Decor = { deg: number; r: number; el: React.ReactNode };
const DECOR: Decor[] = [
  { deg: 0, r: 0, el: <LargoTree className="block w-[20cqw]" /> },
  { deg: 60, r: 9, el: <Gift className="block w-[5cqw]" /> },
  { deg: 120, r: 9, el: <Gift className="block w-[4.4cqw]" box="var(--gold)" ribbon="var(--holly)" /> },
  { deg: 150, r: 36, el: <Gingerbread className="block w-[8cqw]" /> },
  { deg: 30, r: 37, el: <span className="flex items-end gap-[0.6cqw]"><CandyCane className="block w-[4.4cqw]" /><CandyCane flip className="block w-[3.6cqw]" /></span> },
  { deg: 270, r: 30, el: <Gingerbread className="block w-[6cqw]" /> },
  { deg: 252, r: 44, el: <Lamp className="block w-[4cqw]" /> },
  { deg: 288, r: 44, el: <Lamp className="block w-[4cqw]" /> },
  { deg: 180, r: 45, el: <CandyCane className="block w-[3.6cqw]" /> },
  { deg: 205, r: 44, el: <CandyCane flip className="block w-[3.6cqw]" /> },
];

/** Largo de Natal em 3D: cada cabana é uma cidade. Arrasta para rodar, toca para entrar. */
export function Largo() {
  const [rot, setRot] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; start: number; moved: boolean; id: number } | null>(null);
  const suppress = useRef(false);
  const front = (((Math.round(-rot / STEP) % XMAS_CITIES.length) + XMAS_CITIES.length) % XMAS_CITIES.length);
  const frontCity = XMAS_CITIES[front]!;

  useEffect(() => {
    stage.current?.style.setProperty("--rot", `${rot}deg`);
  }, [rot]);

  const bringToFront = (i: number) => {
    setRot((r) => {
      const base = -i * STEP;
      return base + 360 * Math.round((r - base) / 360);
    });
  };

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, start: rot, moved: false, id: e.pointerId };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || !stage.current) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 8) return;
    if (!d.moved) {
      d.moved = true;
      stage.current.classList.add("is-dragging");
      stage.current.setPointerCapture(d.id);
    }
    stage.current.style.setProperty("--rot", `${d.start + dx * 0.45}deg`);
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.moved || !stage.current) return;
    suppress.current = true;
    stage.current.classList.remove("is-dragging");
    const r = d.start + (e.clientX - d.x) * 0.45;
    const snap = Math.round(r / STEP) * STEP;
    stage.current.style.setProperty("--rot", `${snap}deg`);
    setRot(snap);
  };

  return (
    <div className="relative">
      <div
        ref={stage}
        className="largo"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onClickCapture={(e) => {
          if (suppress.current) {
            e.preventDefault();
            e.stopPropagation();
            suppress.current = false;
          }
        }}
      >
        <div className="largo-floor">
          {DECOR.map((d, i) => (
            <div key={i} className="largo-item" style={at(d.deg + 90, d.r)} aria-hidden>
              <div className="largo-up">{d.el}</div>
            </div>
          ))}
          {XMAS_CITIES.map((c, i) => (
            <div key={c.slug} className="largo-item" style={at(90 + i * STEP, 31)}>
              <div className="largo-up">
                <Link
                  to="/mercados-de-natal/$cidade"
                  params={{ cidade: c.slug }}
                  draggable={false}
                  onFocus={() => bringToFront(i)}
                  data-front={i === front}
                  aria-label={`Entrar na cabana de ${c.city}: mercados de Natal de ${c.city}`}
                  className="largo-stall block w-[30cqw]"
                >
                  <Stall slug={c.slug} name={c.city} className="block w-full" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-[3] mt-1 flex items-center justify-center gap-3 md:gap-5">
        <button type="button" onClick={() => setRot((r) => r + STEP)} aria-label="Rodar o largo para a cidade anterior" className="inline-flex h-11 w-11 items-center justify-center border border-gold/40 text-xl text-gold hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">‹</button>
        <Link
          to="/mercados-de-natal/$cidade"
          params={{ cidade: frontCity.slug }}
          className="min-w-[11rem] text-center"
          aria-live="polite"
        >
          <span className="block text-[10px] uppercase tracking-[0.3em] text-gold/80">Toca na cabana</span>
          <span className="block font-serif text-2xl text-cream underline decoration-gold/50 underline-offset-[6px] md:text-3xl">Entrar em {frontCity.city} →</span>
        </Link>
        <button type="button" onClick={() => setRot((r) => r - STEP)} aria-label="Rodar o largo para a cidade seguinte" className="inline-flex h-11 w-11 items-center justify-center border border-gold/40 text-xl text-gold hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">›</button>
      </div>
      <p className="mt-2 text-center text-[11px] uppercase tracking-[0.25em] text-cream/50">Arrasta para rodar o largo</p>
    </div>
  );
}
