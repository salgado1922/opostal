/** Elementos decorativos natalícios (SVG/CSS, sem imagens externas). */
import { CandyCane, Gingerbread } from "@/components/natal/Treats";

// Posições determinísticas para não haver diferenças entre servidor e browser.
const FLAKES = Array.from({ length: 42 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { left: r(1) * 100, size: 2 + r(2) * 4, dur: 9 + r(3) * 12, delay: -r(4) * 20, drift: (r(5) - 0.5) * 80, op: 0.4 + r(6) * 0.5 };
});

export function Snow({ count = 42 }: { count?: number }) {
  return (
    <div className="snow" aria-hidden>
      {FLAKES.slice(0, count).map((f, i) => (
        <i key={i} style={{ left: `${f.left.toFixed(2)}%`, width: Math.round(f.size), height: Math.round(f.size), opacity: Number(f.op.toFixed(2)), animationDuration: `${f.dur.toFixed(1)}s`, animationDelay: `${f.delay.toFixed(1)}s`, ["--drift" as string]: `${Math.round(f.drift)}px` }} />
      ))}
    </div>
  );
}

export function Sleigh({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 60" className={className} aria-hidden fill="currentColor">
      {[0, 34, 68].map((x) => (
        <g key={x} transform={`translate(${x} 18)`}>
          <path d="M4 18 Q10 8 22 10 L28 6 L30 10 Q32 14 26 16 L24 24 L21 24 L21 18 L10 18 L9 24 L6 24 Z" />
          <path d="M26 6 L24 0 M28 6 L32 1 M24 2 L21 1 M31 3 L34 3" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </g>
      ))}
      <path d="M30 32 L110 34" stroke="currentColor" strokeWidth=".8" />
      <path d="M112 30 Q118 46 150 46 L176 46 Q186 46 188 36 L186 26 L160 28 Q150 22 148 30 Z" />
      <path d="M110 50 L192 50 Q198 50 198 44" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="162" cy="18" r="6" />
      <path d="M156 16 L166 6 L170 14 Z" />
    </svg>
  );
}

export function Gift({ className = "", ribbon = "var(--gold)", box = "var(--holly)" }: { className?: string; ribbon?: string; box?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="6" y="18" width="36" height="26" fill={box} />
      <rect x="3" y="12" width="42" height="8" fill={box} />
      <rect x="21" y="12" width="6" height="32" fill={ribbon} />
      <path d="M24 12 C16 2 8 8 14 12 Z M24 12 C32 2 40 8 34 12 Z" fill="none" stroke={ribbon} strokeWidth="2.5" />
    </svg>
  );
}

const HUT_ROOFS = ["oklch(0.5 0.17 25)", "oklch(0.4 0.08 160)", "oklch(0.42 0.09 250)", "oklch(0.55 0.1 70)"];

/** Uma cabana de mercado: telhado nevado, toldo às riscas e balcão iluminado. */
function Hut({ i }: { i: number }) {
  const roof = HUT_ROOFS[i % HUT_ROOFS.length]!;
  const id = `hut-glow-${i}`;
  const stripe = i % 2 ? "var(--gold)" : "var(--holly)";
  return (
    <svg viewBox="0 0 120 110" className="block h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.95 0.09 85)" />
          <stop offset="1" stopColor="var(--gold)" />
        </linearGradient>
      </defs>
      <rect x="10" y="40" width="100" height="70" fill="oklch(0.36 0.06 45)" />
      {[0, 1, 2, 3].map((k) => (
        <line key={k} x1="10" x2="110" y1={92 + k * 5} y2={92 + k * 5} stroke="oklch(0.29 0.05 45)" strokeWidth="1" />
      ))}
      <rect x="18" y="52" width="84" height="32" fill={`url(#${id})`} />
      <g fill="oklch(0.36 0.06 45)" opacity=".8">
        {i % 3 === 0 && <><circle cx="34" cy="62" r="5" /><circle cx="60" cy="60" r="6" /><circle cx="86" cy="62" r="5" /><path d="M34 52 v5 M60 52 v3 M86 52 v5" stroke="oklch(0.36 0.06 45)" strokeWidth="1" /></>}
        {i % 3 === 1 && <><path d="M28 84 l6 -16 l6 16 z M48 84 l7 -20 l7 20 z M70 84 l6 -16 l6 16 z" /><rect x="86" y="72" width="8" height="12" /></>}
        {i % 3 === 2 && <><rect x="26" y="74" width="10" height="10" rx="1" /><rect x="42" y="70" width="12" height="14" rx="1" /><rect x="60" y="74" width="10" height="10" rx="1" /><rect x="76" y="68" width="14" height="16" rx="1" /></>}
      </g>
      <rect x="12" y="84" width="96" height="6" fill="oklch(0.46 0.07 50)" />
      <path d="M12 84 h96 v2 q-6 3 -12 0 q-6 3 -12 0 q-6 3 -12 0 q-6 3 -12 0 q-6 3 -12 0 q-6 3 -12 0 q-6 3 -12 0 q-6 3 -12 0 Z" fill="var(--frost)" opacity=".9" />
      {Array.from({ length: 8 }, (_, j) => (
        <path key={j} d={`M${10 + j * 12.5} 40 h12.5 v5 a6.25 6.25 0 0 1 -12.5 0 Z`} fill={j % 2 ? "var(--cream)" : stripe} />
      ))}
      <path d="M0 42 L60 6 L120 42 Z" fill={roof} />
      <path d="M60 7 L18 32 q4 4 8 0 q4 5 9 0 q4 4 9 0 q4 5 8 0 q5 4 9 0 q4 5 9 0 q4 4 8 0 q4 5 8 0 Z" fill="var(--frost)" opacity=".95" />
      <circle cx="60" cy="6" r="3" fill="var(--gold)" />
    </svg>
  );
}

/** Fileira de cabanas de mercado com doces, prendas e árvores entre elas. */
export function MarketHuts({ className = "" }: { className?: string }) {
  const hut = (i: number, small = false) => (
    <div key={`h${i}`} className={small ? "h-14 w-[3.8rem] shrink-0 md:h-24 md:w-[6.5rem]" : "h-16 w-[4.4rem] shrink-0 md:h-28 md:w-[7.6rem]"}>
      <Hut i={i} />
    </div>
  );
  const cane = (k: string, flip = false) => <CandyCane key={k} flip={flip} className="h-9 w-4 shrink-0 md:h-14 md:w-6" />;
  const man = (k: string) => <Gingerbread key={k} className="h-8 w-7 shrink-0 md:h-12 md:w-10" />;
  const tree = (k: string) => <Tree key={k} className="h-11 w-7 shrink-0 md:h-[4.5rem] md:w-12" />;
  const gift = (k: string, v = 0) => (
    <Gift key={k} className={v ? "h-5 w-5 shrink-0 md:h-7 md:w-7" : "h-6 w-6 shrink-0 md:h-9 md:w-9"} {...(v === 1 ? { box: "var(--gold)", ribbon: "var(--holly)" } : v === 2 ? { box: "oklch(0.5 0.1 155)", ribbon: "var(--cream)" } : {})} />
  );
  return (
    <div className={`pointer-events-none relative flex items-end justify-center gap-1 overflow-hidden md:gap-2 ${className}`} aria-hidden>
      {tree("t0")}
      {hut(0, true)}
      {gift("g0", 2)}
      {cane("c0")}
      {hut(1)}
      {man("m0")}
      {gift("g1")}
      {hut(2)}
      {cane("c1")}
      {cane("c2", true)}
      {tree("t1")}
      {hut(3)}
      {gift("g2", 1)}
      {man("m1")}
      {hut(4)}
      {gift("g3")}
      {cane("c3", true)}
      {hut(5, true)}
      {tree("t2")}
      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/50 to-transparent" />
    </div>
  );
}

export function Tree({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={className} aria-hidden>
      <path d="M30 4 L52 40 H40 L56 66 H4 L20 40 H8 Z" fill="oklch(0.42 0.1 155)" />
      <rect x="26" y="66" width="8" height="14" fill="oklch(0.35 0.06 45)" />
      <path d="M30 0 l2.4 5 5.4.6-4 3.7 1.1 5.4L30 12l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6Z" fill="var(--gold)" />
      {[[22, 34], [38, 30], [30, 48], [16, 58], [44, 56]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={i % 2 ? "var(--holly)" : "var(--gold)"} />
      ))}
    </svg>
  );
}
