import { useEffect, useState } from "react";

/** Céu estrelado com cintilação. */
export function Stars({ count = 60 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => {
    const r = (n: number) => ((Math.sin(i * 9301 + n * 49297) + 1) / 2);
    const q = (v: number) => Math.round(v * 10) / 10;
    return { left: q(r(1) * 100), top: q(r(2) * 60), size: q(1 + r(3) * 2), delay: q(r(4) * 4) };
  });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {stars.map((s, i) => (
        <i key={i} className="xmas-star" style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }} />
      ))}
    </div>
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
