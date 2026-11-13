import { useId } from "react";
import type { StampShape } from "./stamps";
import { MOTIFS, Motif } from "./motifs";

/** Arredonda ao milésimo para que servidor e browser escrevam exatamente o mesmo número. */
const r3 = (n: number) => Math.round(n * 1000) / 1000;

type Props = {
  top: string;
  bottom?: string;
  center: string;
  sub?: string;
  motif?: string;
  ink: string;
  shape?: StampShape;
  size?: number | string;
  rotate?: number;
  /** Carimbo ainda por fazer: só um contorno fantasma. */
  ghost?: boolean;
  className?: string;
  title?: string;
  /** Desenho alusivo à atração, no lugar do texto central. */
  icon?: string;
  /** Nível do carimbo: "plain" = feito sem confirmação, "verified" = confirmado no local. */
  tier?: "plain" | "verified";
  /** Fotografia associada: aparece como polaroide presa atrás do carimbo. */
  photo?: string;
  /** Altura explícita (necessária quando vai dentro de outro SVG). */
  height?: number;
};

/** Carimbo de borracha em SVG, com tinta gasta e bordas irregulares. */
export function InkStamp({
  top,
  bottom = "O POSTAL",
  center,
  sub,
  motif = "✦",
  ink,
  shape = "circle",
  size = 120,
  rotate = 0,
  ghost = false,
  className = "",
  title,
  icon,
  tier = "verified",
  photo,
  height,
}: Props) {
  const verified = !ghost && tier === "verified";
  const id = useId().replace(/:/g, "");
  const wide = shape === "oval" || shape === "rect";
  const W = wide ? 240 : 200;
  const H = wide ? 170 : 200;
  const cx = W / 2;
  const cy = H / 2;
  const rx = W / 2 - 8;
  const ry = H / 2 - 8;

  const outline = (inset: number, extra: Record<string, string | number> = {}) => {
    const a = rx - inset;
    const b = ry - inset;
    if (shape === "rect")
      return <rect x={cx - a} y={cy - b} width={a * 2} height={b * 2} rx={6} {...extra} />;
    if (shape === "hex") {
      const pts = Array.from({ length: 6 }, (_, i) => {
        const ang = (Math.PI / 3) * i - Math.PI / 2;
        return `${r3(cx + a * Math.cos(ang))},${r3(cy + b * Math.sin(ang))}`;
      }).join(" ");
      return <polygon points={pts} {...extra} />;
    }
    return <ellipse cx={cx} cy={cy} rx={a} ry={b} {...extra} />;
  };

  // Arcos para o texto curvo (em cima e em baixo)
  const ta = rx - 30;
  const tb = ry - 30;
  const arcTop = `M ${cx - ta},${cy} A ${ta},${tb} 0 0 1 ${cx + ta},${cy}`;
  const arcBot = `M ${cx - ta},${cy} A ${ta},${tb} 0 0 0 ${cx + ta},${cy}`;
  const curved = shape !== "rect";
  const topLen = Math.max(1, top.length);
  const topSize = curved ? Math.min(19, 230 / topLen) : Math.min(20, (2 * rx - 36) / (topLen * 0.78));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={height}
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, color: ink, overflow: "visible" }}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <filter id={`ink-${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={id.length * 7} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 1.45" result="holes" />
          <feComposite in="SourceGraphic" in2="holes" operator="in" result="worn" />
          <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="2" result="w" />
          <feDisplacementMap in="worn" in2="w" scale="2.6" />
        </filter>
        <path id={`t-${id}`} d={arcTop} />
        <path id={`b-${id}`} d={arcBot} />
      </defs>
      {photo && !ghost && (
        <g transform={`translate(${W - 40},${H - 34})`} filter={`url(#ink-${id})`} opacity={0.9} color="currentColor" style={{ color: ink }}>
          <g transform="translate(-15 -15) scale(0.47)" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {MOTIFS.camera}
          </g>
        </g>
      )}
      {verified && (
        <g fill="currentColor" opacity={0.75} filter={`url(#ink-${id})`}>
          {Array.from({ length: 40 }, (_, i) => {
            const a = (Math.PI * 2 * i) / 40;
            return <circle key={i} cx={r3(cx + (rx + 5) * Math.cos(a))} cy={r3(cy + (ry + 5) * Math.sin(a))} r={1.7} />;
          })}
        </g>
      )}
      <g
        filter={ghost ? undefined : `url(#ink-${id})`}
        fill="none"
        stroke="currentColor"
        opacity={ghost ? 0.6 : verified ? 1 : 0.88}
        strokeDasharray={ghost ? "5 5" : undefined}
      >
        {outline(0, { strokeWidth: verified ? 5.5 : 3 })}
        {(ghost || verified) && outline(12, { strokeWidth: 1.6 })}
        {ghost && icon && <Motif name={icon} x={cx} y={cy} size={wide ? 58 : 66} />}
        {!ghost && (
          <>
            {curved ? (
              <text fill="currentColor" stroke="none" fontFamily="var(--font-serif)" fontWeight={700} fontSize={topSize} letterSpacing={topSize > 15 ? 4 : 2}>
                <textPath href={`#t-${id}`} startOffset="50%" textAnchor="middle">
                  {top.toUpperCase()}
                </textPath>
              </text>
            ) : (
              <text x={cx} y={cy - ry + (icon ? 38 : 44)} textAnchor="middle" fill="currentColor" stroke="none" fontFamily="var(--font-serif)" fontWeight={700} fontSize={topSize} letterSpacing={topSize > 15 ? 4 : 2}>
                {top.toUpperCase()}
              </text>
            )}
            {curved ? (
              <text fill="currentColor" stroke="none" fontFamily="var(--font-sans)" fontWeight={600} fontSize={11} letterSpacing={3}>
                <textPath href={`#b-${id}`} startOffset="50%" textAnchor="middle" dominantBaseline="hanging">
                  {`${motif} ${bottom} ${motif}`}
                </textPath>
              </text>
            ) : (
              <text x={cx} y={cy + ry - (icon ? 30 : 22)} textAnchor="middle" fill="currentColor" stroke="none" fontFamily="var(--font-sans)" fontWeight={600} fontSize={11} letterSpacing={3}>
                {`${motif} ${bottom} ${motif}`}
              </text>
            )}
            {icon ? (
              <>
                <Motif name={icon} x={cx} y={cy - (wide ? 2 : 6)} size={wide ? 46 : 66} />
                <text x={cx} y={cy + (wide ? 30 : 44)} textAnchor="middle" fill="currentColor" stroke="none" fontFamily="var(--font-serif)" fontWeight={700} fontSize={14} letterSpacing={2}>
                  {center}
                </text>
              </>
            ) : (
            <>
            {center && (
              <>
                <line x1={cx - 44} x2={cx + 44} y1={cy - 16} y2={cy - 16} strokeWidth={1.4} />
                <line x1={cx - 44} x2={cx + 44} y1={cy + 22} y2={cy + 22} strokeWidth={1.4} />
                <text x={cx} y={cy + 13} textAnchor="middle" fill="currentColor" stroke="none" fontFamily="var(--font-serif)" fontWeight={700} fontSize={center.length > 7 ? 22 : 30} letterSpacing={2}>
                  {center}
                </text>
              </>
            )}
            {sub && (
              <text x={cx} y={center ? cy + (wide ? 36 : 40) : cy + 6} textAnchor="middle" fill="currentColor" stroke="none" fontFamily="var(--font-sans)" fontWeight={600} fontSize={9} letterSpacing={2}>
                {sub.toUpperCase()}
              </text>
            )}
            </>
            )}
          </>
        )}
      </g>
    </svg>
  );
}
