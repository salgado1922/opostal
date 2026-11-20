/** Cabana de mercado de Natal, com telhado nevado, letreiro e luzes. */
type Slug = "viena" | "praga" | "budapeste";

const ROOF: Record<Slug, string> = {
  viena: "oklch(0.5 0.17 25)",
  praga: "oklch(0.4 0.08 160)",
  budapeste: "oklch(0.42 0.09 250)",
};
const BULBS = ["var(--holly)", "var(--gold)", "oklch(0.65 0.15 150)", "var(--frost)"];

function Emblem({ slug }: { slug: Slug }) {
  if (slug === "viena")
    return <path d="M60 11 C54 5 48 9 52 2 C55 -2 59 0 60 3 C61 0 65 -2 68 2 C72 9 66 5 60 11 Z" transform="translate(0 2)" fill="var(--gold)" />;
  if (slug === "praga")
    return (
      <g fill="var(--gold)">
        <path d="M53 14 l3 -13 l3 13 z" />
        <path d="M61 14 l3 -13 l3 13 z" />
        <circle cx="56" cy="1" r="1.4" />
        <circle cx="64" cy="1" r="1.4" />
      </g>
    );
  return (
    <g fill="var(--gold)">
      <path d="M52 14 a8 8 0 0 1 16 0 z" />
      <path d="M59 6 h2 v-6 h-2 z" />
    </g>
  );
}

export function Stall({ slug, name, className = "" }: { slug: Slug; name: string; className?: string }) {
  const id = `stall-glow-${slug}`;
  const roofBulbs = Array.from({ length: 13 }, (_, i) => {
    const t = i / 12;
    const x = 6 + t * 108;
    const y = 52 - (1 - Math.abs(t - 0.5) * 2) * 38;
    return { x: Math.round(x * 10) / 10, y: Math.round((y + 2) * 10) / 10, c: BULBS[i % 4]!, d: (i % 4) * 0.35 };
  });
  return (
    <svg viewBox="0 0 120 134" className={className} aria-hidden>
      <defs>
        <radialGradient id={id} cx="50%" cy="60%" r="70%">
          <stop offset="0" stopColor="oklch(0.95 0.09 85)" />
          <stop offset="0.6" stopColor="var(--gold)" />
          <stop offset="1" stopColor="oklch(0.55 0.12 60)" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="129" rx="58" ry="5" fill="var(--frost)" opacity=".75" />
      <rect x="10" y="52" width="100" height="76" fill="oklch(0.36 0.06 45)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="10" x2="110" y1={66 + i * 13} y2={66 + i * 13} stroke="oklch(0.29 0.05 45)" strokeWidth="1" />
      ))}
      <rect x="22" y="64" width="76" height="17" fill="var(--cream)" />
      <rect x="22" y="64" width="76" height="17" fill="none" stroke="oklch(0.45 0.07 50)" strokeWidth="1.5" />
      <text x="60" y="76.5" textAnchor="middle" className="font-serif" fontSize="13" fontStyle="italic" fill="oklch(0.25 0.03 40)">{name}</text>
      <rect x="18" y="85" width="84" height="24" fill={`url(#${id})`} />
      <g fill="oklch(0.36 0.06 45)" opacity=".85">
        <rect x="26" y="99" width="7" height="10" rx="1" />
        <rect x="38" y="96" width="9" height="13" rx="1" />
        <path d="M54 109 l5 -14 l5 14 z" />
        <rect x="70" y="100" width="7" height="9" rx="1" />
        <rect x="82" y="97" width="9" height="12" rx="1" />
      </g>
      <rect x="14" y="108" width="92" height="7" fill="oklch(0.46 0.07 50)" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => (
        <path key={j} d={`M${10 + j * 12.5} 52 h12.5 v5 a6.25 6.25 0 0 1 -12.5 0 Z`} fill={j % 2 ? "var(--cream)" : "var(--holly)"} />
      ))}
      <path d="M2 54 L60 14 L118 54 Z" fill={ROOF[slug]} />
      <path d="M60 15 L25 38.5 q4 4 8 0 q4 5 9 0 q4 4 9 0 q5 5 9 0 q4 4 9 0 q4 5 9 0 q4 4 8 0 Z" fill="var(--frost)" opacity=".95" />
      <Emblem slug={slug} />
      {roofBulbs.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r="2.3" fill={b.c} className="largo-bulb" style={{ animationDelay: `${b.d}s` }} />
      ))}
    </svg>
  );
}

/** Árvore do centro do largo, com luzes. */
export function LargoTree({ className = "" }: { className?: string }) {
  const lights = [[30, 30], [22, 42], [40, 46], [30, 56], [16, 64], [44, 66], [26, 74], [36, 78], [12, 84], [48, 84], [30, 88]] as const;
  return (
    <svg viewBox="0 0 60 110" className={className} aria-hidden>
      <circle cx="30" cy="10" r="12" fill="var(--gold)" opacity=".25" />
      <path d="M30 8 L46 36 H38 L52 62 H42 L58 92 H2 L18 62 H8 L22 36 H14 Z" fill="oklch(0.38 0.09 155)" />
      <path d="M30 8 L46 36 H38 L52 62 H42 L58 92 H30 Z" fill="oklch(0.32 0.08 155)" />
      <path d="M14 36 q16 8 32 0 M8 62 q22 10 44 0 M2 92" stroke="var(--frost)" strokeOpacity=".5" strokeWidth="1.5" fill="none" />
      <rect x="26" y="92" width="8" height="12" fill="oklch(0.35 0.06 45)" />
      <path d="M30 0 l2.6 5.4 5.8.6-4.3 4 1.2 5.8L30 13l-5.3 2.8 1.2-5.8-4.3-4 5.8-.6Z" fill="var(--gold)" />
      {lights.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill={BULBS[i % 4]} className="largo-bulb" style={{ animationDelay: `${(i % 5) * 0.3}s` }} />
      ))}
    </svg>
  );
}
