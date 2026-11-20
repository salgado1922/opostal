import { useId } from "react";
import { Motif } from "@/components/passport/motifs";
import { XMAS_MOTIF, XMAS_SEASON, type XmasSlug } from "@/data/natal-stamps";

/** Arredonda ao centésimo para que servidor e browser escrevam o mesmo número. */
const r2 = (n: number) => Math.round(n * 100) / 100;
const C = 120;

/** Contorno recortado em roseta, como um selo de lacre dourado. */
const ROSETTE = (() => {
  const N = 30;
  const rIn = 106;
  const rOut = 121;
  const pt = (r: number, a: number) => `${r2(C + r * Math.cos(a))} ${r2(C + r * Math.sin(a))}`;
  let d = `M ${pt(rIn, -Math.PI / 2)}`;
  for (let i = 0; i < N; i++) {
    const a0 = -Math.PI / 2 + (2 * Math.PI * i) / N;
    const a1 = -Math.PI / 2 + (2 * Math.PI * (i + 1)) / N;
    d += ` Q ${pt(rOut, (a0 + a1) / 2)} ${pt(rIn, a1)}`;
  }
  return `${d} Z`;
})();

/** Folhas e bagas da coroa de azevinho à volta do monumento. */
const LEAF = "M0 -10C3 -7 6 -6 4 -2C7 -1 7 3 4 4C5 7 2 9 0 10C-2 9 -5 7 -4 4C-7 3 -7 -1 -4 -2C-6 -6 -3 -7 0 -10Z";
const WREATH = Array.from({ length: 22 }, (_, i) => {
  const a = -Math.PI / 2 + (2 * Math.PI * (i + 0.5)) / 22;
  const r = 60 + (i % 2 ? 3 : -3);
  return { x: r2(C + r * Math.cos(a)), y: r2(C + r * Math.sin(a)), rot: r2((a * 180) / Math.PI + (i % 2 ? 55 : 125)) };
});
const BERRIES = Array.from({ length: 7 }, (_, i) => {
  const a = -Math.PI / 2 + (2 * Math.PI * (i + 0.75)) / 7;
  return { x: r2(C + 60 * Math.cos(a)), y: r2(C + 60 * Math.sin(a)) };
});
const SPARKS = [
  { x: 28, y: 52, s: 1, d: "0s" },
  { x: 212, y: 70, s: 0.8, d: "1.1s" },
  { x: 200, y: 196, s: 1.1, d: "2s" },
  { x: 36, y: 186, s: 0.7, d: "2.8s" },
];
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

function Star({ x, y, r, fill, stroke }: { x: number; y: number; r: number; fill: string; stroke?: string }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (Math.PI * i) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    return `${r2(x + rr * Math.cos(a))},${r2(y + rr * Math.sin(a))}`;
  }).join(" ");
  return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={stroke ? 1.2 : undefined} strokeLinejoin="round" />;
}

/** Brilho de quatro pontas, a cintilar na borda dourada. */
function Spark({ x, y, s, delay }: { x: number; y: number; s: number; delay: string }) {
  return (
    <path
      className="xmas-stamp-spark"
      style={{ animationDelay: delay, fill: "var(--foil-light)" }}
      d={`M${x} ${y - 9 * s}Q${x + 1.4 * s} ${y - 1.4 * s} ${x + 9 * s} ${y}Q${x + 1.4 * s} ${y + 1.4 * s} ${x} ${y + 9 * s}Q${x - 1.4 * s} ${y + 1.4 * s} ${x - 9 * s} ${y}Q${x - 1.4 * s} ${y - 1.4 * s} ${x} ${y - 9 * s}Z`}
    />
  );
}

/** "2026-12-12T…" → "12 · XII · 2026" */
const ribbonDate = (at: string) => {
  const d = new Date(at);
  return `${d.getDate()} · ${ROMAN[d.getMonth()]} · ${d.getFullYear()}`;
};

type Props = {
  slug: XmasSlug;
  city: string;
  /** Data do carimbo; sem data fica só o contorno por carimbar. */
  at?: string;
  rotate?: number;
  className?: string;
  /** Sem brilho animado (por exemplo em listas pequenas). */
  still?: boolean;
};

/**
 * Carimbo de Natal: o mais raro do passaporte.
 * Roseta dourada recortada, anel de tinta vermelha, coroa de azevinho com o monumento da cidade
 * e uma fita com a data em que foi ganho.
 */
export function XmasStamp({ slug, city, at, rotate = 0, className = "", still = false }: Props) {
  const id = useId().replace(/:/g, "");
  const ghost = !at;
  const arcTop = `M ${C - 79},${C} A 79,79 0 0 1 ${C + 79},${C}`;
  const arcBot = `M ${C - 86},${C} A 86,86 0 0 0 ${C + 86},${C}`;
  const ink = "var(--stamp-natal)";
  const title = ghost ? `Carimbo de Natal de ${city}, por carimbar` : `Carimbo de Natal de ${city}, ${XMAS_SEASON}`;

  return (
    <span className={`relative inline-block ${className}`}>
      <svg
        viewBox="0 0 240 240"
        width="100%"
        className="pointer-events-none block select-none"
        style={{ transform: `rotate(${rotate}deg)`, color: ink, overflow: "visible" }}
        role="img"
        aria-label={title}
      >
        <defs>
          <linearGradient id={`foil-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--foil-deep)" }} />
            <stop offset=".22" style={{ stopColor: "var(--foil-light)" }} />
            <stop offset=".45" style={{ stopColor: "var(--foil-mid)" }} />
            <stop offset=".62" style={{ stopColor: "var(--foil-light)" }} />
            <stop offset=".82" style={{ stopColor: "var(--foil-mid)" }} />
            <stop offset="1" style={{ stopColor: "var(--foil-deep)" }} />
          </linearGradient>
          <linearGradient id={`sheen-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: "var(--foil-light)", stopOpacity: 0 }} />
            <stop offset=".5" style={{ stopColor: "var(--foil-light)", stopOpacity: 0.85 }} />
            <stop offset="1" style={{ stopColor: "var(--foil-light)", stopOpacity: 0 }} />
          </linearGradient>
          <radialGradient id={`paper-${id}`} cx=".45" cy=".4" r=".7">
            <stop offset="0" style={{ stopColor: "var(--passport-paper)" }} />
            <stop offset="1" style={{ stopColor: "var(--passport-paper-shade)" }} />
          </radialGradient>
          <filter id={`ink-${id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.5" result="holes" />
            <feComposite in="SourceGraphic" in2="holes" operator="in" result="worn" />
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="w" />
            <feDisplacementMap in="worn" in2="w" scale="2" />
          </filter>
          <filter id={`emboss-${id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodOpacity=".35" />
          </filter>
          <clipPath id={`clip-${id}`}>
            <path d={ROSETTE} />
          </clipPath>
          <path id={`t-${id}`} d={arcTop} />
          <path id={`b-${id}`} d={arcBot} />
          <path id={`r-${id}`} d="M52 166 Q120 156 188 166" />
        </defs>

        {ghost ? (
          <g fill="none" stroke="currentColor" opacity={0.5}>
            <path d={ROSETTE} strokeWidth={2} strokeDasharray="5 5" />
            <circle cx={C} cy={C} r={94} strokeWidth={1.4} strokeDasharray="3 5" />
            <circle cx={C} cy={C} r={72} strokeWidth={1.2} strokeDasharray="2 5" />
            <g opacity={0.75}><Motif name={XMAS_MOTIF[slug]} x={C} y={C - 4} size={62} /></g>
            <Star x={C} y={C - 60} r={8} fill="none" stroke="currentColor" />
            <text fill="currentColor" stroke="none" fontFamily="var(--font-sans)" fontWeight={600} fontSize={11} letterSpacing={3.5}>
              <textPath href={`#t-${id}`} startOffset="50%" textAnchor="middle">SÓ NO MERCADO</textPath>
            </text>
            <text fill="currentColor" stroke="none" fontFamily="var(--font-serif)" fontWeight={700} fontSize={14} letterSpacing={3}>
              <textPath href={`#b-${id}`} startOffset="50%" textAnchor="middle">{`❄ ${city.toUpperCase()} ❄`}</textPath>
            </text>
          </g>
        ) : (
          <>
            {/* Roseta dourada */}
            <g filter={`url(#emboss-${id})`}>
              <path d={ROSETTE} fill={`url(#foil-${id})`} stroke="var(--foil-deep)" strokeWidth={1.2} />
            </g>
            <circle cx={C} cy={C} r={103} fill="none" stroke="var(--foil-deep)" strokeWidth={0.8} opacity={0.7} />
            <g fill="var(--foil-deep)" opacity={0.55}>
              {Array.from({ length: 48 }, (_, i) => {
                const a = (2 * Math.PI * i) / 48;
                return <circle key={i} cx={r2(C + 108 * Math.cos(a))} cy={r2(C + 108 * Math.sin(a))} r={1.1} />;
              })}
            </g>
            {/* Disco de papel */}
            <circle cx={C} cy={C} r={99} fill={`url(#paper-${id})`} stroke="var(--foil-deep)" strokeWidth={1} />

            {/* Tinta vermelha: anéis, letras e monumento */}
            <g filter={`url(#ink-${id})`} fill="none" stroke="currentColor">
              <circle cx={C} cy={C} r={94} strokeWidth={4.5} />
              <circle cx={C} cy={C} r={72} strokeWidth={1.6} />
              <text fill="currentColor" stroke="none" fontFamily="var(--font-serif)" fontWeight={700} fontSize={13.5} letterSpacing={3.2}>
                <textPath href={`#t-${id}`} startOffset="50%" textAnchor="middle">EDIÇÃO DE NATAL</textPath>
              </text>
              <text fill="currentColor" stroke="none" fontFamily="var(--font-serif)" fontWeight={700} fontSize={15} letterSpacing={3.5}>
                <textPath href={`#b-${id}`} startOffset="50%" textAnchor="middle">{`✦ ${city.toUpperCase()} ✦`}</textPath>
              </text>
              <g strokeWidth={3.2}><Motif name={XMAS_MOTIF[slug]} x={C} y={C - 6} size={58} /></g>
            </g>

            {/* Coroa de azevinho */}
            <g style={{ fill: "var(--holly-leaf)" }}>
              {WREATH.map((l, i) => (
                <path key={i} d={LEAF} transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(.95)`} />
              ))}
            </g>
            <g style={{ stroke: "var(--passport-paper)" }} strokeWidth={0.8} opacity={0.5} fill="none">
              {WREATH.map((l, i) => (
                <path key={i} d="M0 -8V8" transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(.95)`} />
              ))}
            </g>
            {BERRIES.map((b, i) => (
              <g key={i}>
                <circle cx={b.x - 2.6} cy={b.y + 1} r={3.2} style={{ fill: "var(--holly-berry)" }} />
                <circle cx={b.x + 2.6} cy={b.y + 1} r={3.2} style={{ fill: "var(--holly-berry)" }} />
                <circle cx={b.x} cy={b.y - 2.8} r={3.2} style={{ fill: "var(--holly-berry)" }} />
                <circle cx={b.x - 0.9} cy={b.y - 3.8} r={0.9} style={{ fill: "var(--passport-paper)" }} opacity={0.8} />
              </g>
            ))}

            {/* Estrela no topo da coroa */}
            <Star x={C} y={C - 61} r={11} fill={`url(#foil-${id})`} stroke="var(--foil-deep)" />

            {/* Fita com a data */}
            <g filter={`url(#emboss-${id})`}>
              <path d="M30 160 L56 156 L56 182 L30 186 L40 172 Z" style={{ fill: "var(--seal-wax-deep)" }} />
              <path d="M210 160 L184 156 L184 182 L210 186 L200 172 Z" style={{ fill: "var(--seal-wax-deep)" }} />
              <path d="M46 156 Q120 144 194 156 L194 178 Q120 166 46 178 Z" style={{ fill: "var(--holly-berry)" }} />
              <path d="M46 156 Q120 144 194 156" fill="none" stroke={`url(#foil-${id})`} strokeWidth={1.4} />
              <path d="M46 178 Q120 166 194 178" fill="none" stroke={`url(#foil-${id})`} strokeWidth={1.4} />
            </g>
            <text fill={`url(#foil-${id})`} fontFamily="var(--font-serif)" fontWeight={700} fontSize={12} letterSpacing={2}>
              <textPath href={`#r-${id}`} startOffset="50%" textAnchor="middle" dominantBaseline="middle">{ribbonDate(at)}</textPath>
            </text>

            {/* Brilho metálico a passar */}
            {!still && (
              <g clipPath={`url(#clip-${id})`} style={{ mixBlendMode: "screen" }}>
                <g transform="skewX(-18)">
                  <rect className="xmas-stamp-sheen" x={-120} y={-40} width={70} height={320} fill={`url(#sheen-${id})`} />
                </g>
              </g>
            )}
            {!still && SPARKS.map((s, i) => <Spark key={i} x={s.x} y={s.y} s={s.s} delay={s.d} />)}
          </>
        )}
      </svg>
    </span>
  );
}
