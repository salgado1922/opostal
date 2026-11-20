/** Elementos decorativos natalícios (SVG/CSS, sem imagens externas). */

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

export function FairyLights({ className = "" }: { className?: string }) {
  const colors = ["var(--holly)", "var(--gold)", "var(--frost)", "oklch(0.65 0.15 150)"];
  return (
    <svg viewBox="0 0 400 40" preserveAspectRatio="none" className={`fairy-lights h-8 w-full ${className}`} aria-hidden>
      <path d="M0 6 Q50 30 100 6 T200 6 T300 6 T400 6" fill="none" stroke="oklch(0.45 0.03 160)" strokeWidth="1.2" />
      {Array.from({ length: 16 }, (_, i) => {
        const x = 12 + i * 24.5;
        const t = (x % 100) / 100;
        const y = Math.round((6 + 72 * t * (1 - t) + 2) * 10) / 10;
        return <circle key={i} cx={x} cy={y} r="3.2" fill={colors[i % 4]} />;
      })}
    </svg>
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

export function MarketHuts({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 90" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} transform={`translate(${i * 100 + 6} 20)`}>
          <path d="M0 26 L44 0 L88 26 Z" fill="var(--frost)" opacity=".9" />
          <rect x="8" y="26" width="72" height="44" fill="oklch(0.32 0.06 45)" />
          <rect x="16" y="34" width="56" height="18" fill="var(--gold)" opacity=".85" />
          {[0, 1, 2, 3, 4, 5].map((j) => (
            <path key={j} d={`M${8 + j * 12} 26 h12 v6 a6 6 0 0 1 -12 0 Z`} fill={j % 2 ? "var(--cream)" : "var(--holly)"} />
          ))}
        </g>
      ))}
      <rect x="0" y="88" width="600" height="2" fill="var(--frost)" opacity=".6" />
    </svg>
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
