/** Doces e enfeites de Natal desenhados em SVG (sem imagens externas). */

export function CandyCane({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const d = "M26 96 V30 A12 12 0 0 0 2 30";
  return (
    <svg viewBox="0 0 40 100" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      <g transform="translate(6 0)">
        <path d={d} fill="none" stroke="var(--cream)" strokeWidth="8" strokeLinecap="round" />
        <path d={d} fill="none" stroke="var(--holly)" strokeWidth="8" strokeDasharray="6 7" />
        <path d={d} fill="none" stroke="var(--cream)" strokeOpacity=".35" strokeWidth="2" transform="translate(-2 0)" />
      </g>
    </svg>
  );
}

export function Gingerbread({ className = "" }: { className?: string }) {
  const dough = "oklch(0.56 0.11 55)";
  return (
    <svg viewBox="0 0 60 72" className={className} aria-hidden>
      <g stroke={dough} strokeLinecap="round" fill="none">
        <path d="M30 26 L10 34" strokeWidth="10" />
        <path d="M30 26 L50 34" strokeWidth="10" />
        <path d="M30 44 L18 66" strokeWidth="11" />
        <path d="M30 44 L42 66" strokeWidth="11" />
      </g>
      <rect x="18" y="22" width="24" height="28" rx="10" fill={dough} />
      <circle cx="30" cy="14" r="11" fill={dough} />
      <g fill="none" stroke="var(--cream)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M8 31 q2 3 0 6 M52 31 q-2 3 0 6" />
        <path d="M14 63 q3 2 6 1 M40 64 q3 1 6 -1" />
        <path d="M25 18 q5 4 10 0" />
      </g>
      <circle cx="26" cy="12" r="1.6" fill="var(--ink, #2a1d14)" />
      <circle cx="34" cy="12" r="1.6" fill="var(--ink, #2a1d14)" />
      <circle cx="30" cy="30" r="2.2" fill="var(--holly)" />
      <circle cx="30" cy="38" r="2.2" fill="oklch(0.6 0.14 150)" />
      <circle cx="30" cy="46" r="2.2" fill="var(--holly)" />
    </svg>
  );
}

/** Candeeiro de rua com luz quente. */
export function Lamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 120" className={className} aria-hidden>
      <circle cx="20" cy="22" r="18" fill="var(--gold)" opacity=".18" />
      <rect x="18.5" y="34" width="3" height="84" fill="oklch(0.22 0.02 160)" />
      <rect x="14" y="112" width="12" height="6" fill="oklch(0.22 0.02 160)" />
      <path d="M12 14 h16 l-3 18 h-10 z" fill="var(--gold)" />
      <path d="M10 14 h20 l-10 -8 z" fill="oklch(0.22 0.02 160)" />
      <path d="M10 13 h20" stroke="var(--frost)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
