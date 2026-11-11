import { useId } from "react";

type Props = { title: string; glyph: string; earned: boolean; size?: number };

/** Selo de lacre: distinção ganha em cera vermelha com relevo dourado; por ganhar, só o contorno. */
export function BadgeSeal({ title, glyph, earned, size = 112 }: Props) {
  const id = useId().replace(/:/g, "");
  const lobes = 14;
  const blob = Array.from({ length: lobes * 2 }, (_, i) => {
    const a = (Math.PI * i) / lobes;
    const r = i % 2 ? 88 : 96 + ((i * 7) % 5);
    return `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 200 200" width={size} aria-hidden className="overflow-visible">
      <defs>
        <radialGradient id={`w-${id}`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="var(--seal-wax)" stopOpacity={1} />
          <stop offset="100%" stopColor="var(--seal-wax-deep)" />
        </radialGradient>
        <filter id={`s-${id}`}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
          <feOffset dx="-1.5" dy="-1.5" result="o" />
          <feComposite in="SourceAlpha" in2="o" operator="out" result="hl" />
          <feFlood floodColor="white" floodOpacity="0.35" />
          <feComposite in2="hl" operator="in" result="h" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="h" />
          </feMerge>
        </filter>
        <path id={`p-${id}`} d="M 42,100 A 58,58 0 0 1 158,100" />
      </defs>
      {earned ? (
        <g filter={`url(#s-${id})`}>
          <polygon points={blob} fill={`url(#w-${id})`} strokeLinejoin="round" stroke="var(--seal-wax-deep)" strokeWidth={4} />
          <circle cx={100} cy={100} r={68} fill="none" stroke="var(--gold)" strokeOpacity={0.7} strokeWidth={1.5} />
          <circle cx={100} cy={100} r={62} fill="none" stroke="var(--seal-wax-deep)" strokeWidth={5} />
          <text fill="var(--gold-soft)" fontFamily="var(--font-sans)" fontSize={11} fontWeight={600} letterSpacing={3}>
            <textPath href={`#p-${id}`} startOffset="50%" textAnchor="middle">{title.toUpperCase()}</textPath>
          </text>
          <text x={100} y={128} textAnchor="middle" fontSize={50} fill="var(--gold)" fontFamily="var(--font-serif)">
            {glyph}
          </text>
        </g>
      ) : (
        <g fill="none" stroke="var(--cream)" strokeOpacity={0.3}>
          <polygon points={blob} strokeDasharray="3 6" strokeWidth={2} />
          <text x={100} y={122} textAnchor="middle" fontSize={44} fill="var(--cream)" fillOpacity={0.22} stroke="none" fontFamily="var(--font-serif)">
            {glyph}
          </text>
        </g>
      )}
    </svg>
  );
}
