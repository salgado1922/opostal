import { useEffect, useState } from "react";

/** Céu estrelado com cintilação. */
export function Stars({ count = 60 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => {
    const r = (n: number) => ((Math.sin(i * 9301 + n * 49297) + 1) / 2);
    return { left: r(1) * 100, top: r(2) * 60, size: 1 + r(3) * 2, delay: r(4) * 4 };
  });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {stars.map((s, i) => (
        <i key={i} className="xmas-star" style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }} />
      ))}
    </div>
  );
}

/** Silhueta de Viena, Praga e Budapeste com janelas acesas. */
export function Skyline({ className = "" }: { className?: string }) {
  const windows = Array.from({ length: 70 }, (_, i) => {
    const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
    return { x: 20 + r(1) * 1160, y: 150 + r(2) * 70, d: r(3) * 5 };
  });
  return (
    <svg viewBox="0 0 1200 240" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="sky-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--gold)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--gold)" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect x="0" y="80" width="1200" height="160" fill="url(#sky-glow)" />
      <g fill="oklch(0.16 0.04 160)">
        {/* Viena: Stephansdom + Riesenrad */}
        <path d="M0 240V170h60v-30h20v30h30V150l40-20 40 20v20h20V60l8-40 8 40v110h30v-30h40v100z" />
        <circle cx="330" cy="150" r="48" fill="none" stroke="oklch(0.16 0.04 160)" strokeWidth="5" />
        <path d="M330 102v96M282 150h96M296 116l68 68M364 116l-68 68" stroke="oklch(0.16 0.04 160)" strokeWidth="2" />
        <path d="M300 240l30-90 30 90z" />
        {/* Praga: Týn */}
        <path d="M380 240v-60h50v-20h20V80l12-30 12 30v80h16V80l12-30 12 30v80h20v20h60v-30h40v90z" />
        <path d="M640 240v-50h40v-40l30-30 30 30v40h50v50z" />
        {/* Budapeste: Parlamento */}
        <path d="M790 240v-50h30v-30h20v-20h20v20h20v-30l40-50 40 50v30h20v-20h20v20h20v30h30v50z" />
        <path d="M970 240v-40h40v-30h30v30h40v-50l10-25 10 25v50h100v40z" />
      </g>
      {windows.map((w, i) => (
        <rect key={i} x={w.x} y={w.y} width="4" height="6" fill="var(--gold)" className="xmas-window" style={{ animationDelay: `${w.d}s` }} />
      ))}
    </svg>
  );
}

function diff() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 11, 24, 18);
  if (now > new Date(now.getFullYear(), 11, 26)) target = new Date(now.getFullYear() + 1, 11, 24, 18);
  const ms = Math.max(0, target.getTime() - now.getTime());
  return { d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60, s: Math.floor(ms / 1e3) % 60 };
}

/** Contagem decrescente até à Consoada. */
export function Countdown() {
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);
  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);
  const cells: [string, number | undefined][] = [["dias", t?.d], ["horas", t?.h], ["min", t?.m], ["seg", t?.s]];
  return (
    <div className="inline-flex items-stretch border border-gold/40 bg-[color:var(--background)]/40 backdrop-blur-sm" role="timer" aria-label="Contagem até à Consoada">
      {cells.map(([label, v]) => (
        <div key={label} className="flex min-w-[4.2rem] flex-col items-center border-r border-gold/25 px-3 py-2.5 last:border-r-0 md:min-w-[5.5rem] md:py-3">
          <span className="font-serif text-3xl tabular-nums text-cream md:text-5xl">{v === undefined ? "––" : String(v).padStart(2, "0")}</span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gold/80">{label}</span>
        </div>
      ))}
    </div>
  );
}

/** Bola de Natal pendurada, a balançar. */
export function Bauble({ className = "", color = "var(--holly)", delay = 0 }: { className?: string; color?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 60 200" className={`xmas-bauble ${className}`} style={{ animationDelay: `${delay}s` }} aria-hidden>
      <line x1="30" y1="0" x2="30" y2="130" stroke="var(--gold)" strokeOpacity="0.6" strokeWidth="1" />
      <rect x="24" y="128" width="12" height="8" fill="var(--gold)" />
      <circle cx="30" cy="162" r="27" fill={color} />
      <circle cx="21" cy="152" r="7" fill="var(--cream)" opacity="0.35" />
      <path d="M5 165q25 10 50 0" stroke="var(--gold)" strokeWidth="2" fill="none" />
    </svg>
  );
}
