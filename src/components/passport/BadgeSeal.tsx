import { useId } from "react";

type Props = { title: string; glyph: string; earned: boolean; size?: number; onPaper?: boolean };

/**
 * Distinção: um carimbo de borracha como os outros, mas em tinta dourada
 * "premium" — anel triplo, pequenas estrelas laterais e brilho metálico
 * discreto. Por ganhar, fica só o contorno fantasma tracejado.
 * `onPaper` escurece a tinta para se ler sobre o papel creme do passaporte.
 */
export function BadgeSeal({ title, glyph, earned, size = 124, onPaper = false }: Props) {
  const id = useId().replace(/:/g, "");
  const cx = 100;
  const cy = 100;
  const g1 = onPaper ? "color-mix(in oklab, var(--gold) 70%, var(--ink))" : "var(--gold-soft)";
  const g2 = onPaper ? "color-mix(in oklab, var(--gold) 55%, var(--ink))" : "var(--gold)";
  const g3 = onPaper ? "color-mix(in oklab, var(--gold) 40%, var(--ink))" : "var(--gold-deep, var(--gold))";

  const arcTop = "M 32,100 A 68,68 0 0 1 168,100";
  const arcBot = "M 32,100 A 68,68 0 0 0 168,100";
  const topSize = Math.min(15, 210 / Math.max(1, title.length));

  // pequena estrela decorativa
  const star = (x: number, y: number, r: number) => {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = (Math.PI / 5) * i - Math.PI / 2;
      const rr = i % 2 ? r * 0.45 : r;
      return `${x + rr * Math.cos(a)},${y + rr * Math.sin(a)}`;
    }).join(" ");
    return <polygon points={pts} fill="currentColor" stroke="none" />;
  };

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      aria-hidden
      className="pointer-events-none select-none overflow-visible"
      style={{ transform: earned ? "rotate(-4deg)" : undefined }}
    >
      <defs>
        {/* tinta gasta, igual aos carimbos */}
        <filter id={`bi-${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={id.length * 11} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 1.45" result="holes" />
          <feComposite in="SourceGraphic" in2="holes" operator="in" result="worn" />
          <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="2" result="w" />
          <feDisplacementMap in="worn" in2="w" scale="2.4" />
        </filter>
        {/* dourado com leve variação, como tinta metalizada */}
        <radialGradient id={`bg-${id}`} cx="42%" cy="36%" r="80%">
          <stop offset="0%" stopColor={g1} />
          <stop offset="55%" stopColor={g2} />
          <stop offset="100%" stopColor={g3} />
        </radialGradient>
        <path id={`bt-${id}`} d={arcTop} />
        <path id={`bb-${id}`} d={arcBot} />
      </defs>

      {earned ? (
        <g filter={`url(#bi-${id})`} fill="none" stroke={`url(#bg-${id})`} opacity={0.96}>
          {/* anel triplo: mais denso que um carimbo comum */}
          <circle cx={cx} cy={cy} r={92} strokeWidth={6} />
          <circle cx={cx} cy={cy} r={82} strokeWidth={1.4} />
          <circle cx={cx} cy={cy} r={56} strokeWidth={2.2} />
          {/* estrelas laterais entre os anéis */}
          {star(cx - 74, cy, 6)}
          {star(cx + 74, cy, 6)}
          {/* título curvo em cima, "O POSTAL" em baixo */}
          <text fill={`url(#bg-${id})`} stroke="none" fontFamily="var(--font-serif)" fontWeight={700} fontSize={topSize} letterSpacing={topSize > 12 ? 3 : 2}>
            <textPath href={`#bt-${id}`} startOffset="50%" textAnchor="middle">
              {title.toUpperCase()}
            </textPath>
          </text>
          <text fill={`url(#bg-${id})`} stroke="none" fontFamily="var(--font-sans)" fontWeight={600} fontSize={10} letterSpacing={4}>
            <textPath href={`#bb-${id}`} startOffset="50%" textAnchor="middle" dominantBaseline="hanging">
              ✦ DISTINÇÃO O POSTAL ✦
            </textPath>
          </text>
          {/* símbolo central grande, em serifada */}
          <text x={cx} y={cy + 22} textAnchor="middle" fontSize={54} fill={`url(#bg-${id})`} stroke="none" fontFamily="var(--font-serif)">
            {glyph}
          </text>
        </g>
      ) : (
        <g fill="none" stroke={onPaper ? "var(--ink)" : "var(--cream)"} strokeOpacity={0.28} strokeDasharray="4 6">
          <circle cx={cx} cy={cy} r={92} strokeWidth={4} />
          <circle cx={cx} cy={cy} r={82} strokeWidth={1.2} />
          <circle cx={cx} cy={cy} r={56} strokeWidth={1.6} />
          <text x={cx} y={cy + 20} textAnchor="middle" fontSize={48} fill={onPaper ? "var(--ink)" : "var(--cream)"} fillOpacity={0.2} stroke="none" strokeDasharray="none" fontFamily="var(--font-serif)">
            {glyph}
          </text>
        </g>
      )}
    </svg>
  );
}
