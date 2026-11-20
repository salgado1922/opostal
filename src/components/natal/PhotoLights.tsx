/** Luzes reais das árvores a cintilar, fios de luzes nas árvores e fio de lâmpadas pendurado sobre as fotos de comida. */

export type GlowArea =
  | { tipo: "arvore"; x: number; topo: number; base: number; meia: number; fio?: number[] }
  | { tipo: "caixa"; x: number; y: number; w: number; h: number; suave?: boolean };

const q = (v: number) => Math.round(v * 10) / 10;

function clip(a: GlowArea) {
  if (a.tipo === "arvore") return `polygon(${a.x}% ${a.topo}%, ${q(a.x + a.meia)}% ${a.base}%, ${q(a.x - a.meia)}% ${a.base}%)`;
  return `inset(${a.y}% ${q(100 - a.x - a.w)}% ${q(100 - a.y - a.h)}% ${a.x}%)`;
}

/**
 * Faz cintilar as luzes reais da foto: cópias da imagem, recortadas à árvore,
 * misturadas em "screen" com uma máscara de pontos que alterna.
 */
export function PhotoTwinkle({ src, areas }: { src: string; areas: GlowArea[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {areas.map((a, i) => (
        <div key={i} className="absolute inset-0 mix-blend-screen" style={{ clipPath: clip(a), WebkitClipPath: clip(a) }}>
          <img src={src} alt="" loading="lazy" decoding="async" className={a.tipo === "caixa" && a.suave ? "xmas-halo xmas-halo-suave" : "xmas-halo"} style={{ animationDelay: `${i * 0.7}s` }} />
          {!(a.tipo === "caixa" && a.suave) && (
            <>
              <img src={src} alt="" loading="lazy" decoding="async" className="xmas-sparkle xmas-sparkle-a" />
              <img src={src} alt="" loading="lazy" decoding="async" className="xmas-sparkle xmas-sparkle-b" />
            </>
          )}
        </div>
      ))}
      {areas.map((a, i) => (a.tipo === "arvore" && a.fio ? <Garland key={`g${i}`} tree={a} /> : null))}
    </div>
  );
}

const GARLAND = ["oklch(0.95 0.08 85)", "oklch(0.92 0.12 80)", "var(--holly)", "oklch(0.95 0.08 85)", "oklch(0.72 0.16 150)"];

/** Fios de luzes enrolados à volta da árvore, a descer da esquerda para a direita. */
function Garland({ tree }: { tree: Extract<GlowArea, { tipo: "arvore" }> }) {
  const edge = (t: number, side: -1 | 1) => ({ x: tree.x + side * tree.meia * t, y: tree.topo + t * (tree.base - tree.topo) });
  const strands = (tree.fio ?? []).map((t) => {
    const a = edge(t, -1);
    const b = edge(Math.min(1, t + 0.1), 1);
    const c = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 + 0.05 * (tree.base - tree.topo) };
    const count = Math.max(5, Math.round(4 + t * 9));
    const bulbs = Array.from({ length: count }, (_, k) => {
      const u = (k + 0.5) / count;
      const x = (1 - u) ** 2 * a.x + 2 * (1 - u) * u * c.x + u * u * b.x;
      const y = (1 - u) ** 2 * a.y + 2 * (1 - u) * u * c.y + u * u * b.y;
      return { x: q(x), y: q(y) };
    });
    return { d: `M${q(a.x)} ${q(a.y)} Q${q(c.x)} ${q(c.y)} ${q(b.x)} ${q(b.y)}`, bulbs };
  });
  return (
    <>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {strands.map((s, i) => (
          <path key={i} d={s.d} fill="none" stroke="oklch(0.85 0.1 85 / 55%)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {strands.flatMap((s, i) =>
        s.bulbs.map((b, k) => (
          <span
            key={`${i}-${k}`}
            className="xmas-garland-bulb"
            style={{ left: `${b.x}%`, top: `${b.y}%`, ["--bulb" as string]: GARLAND[(k + i) % GARLAND.length], animationDelay: `${q(((k + i * 2) % 4) * 0.35)}s` }}
          />
        )),
      )}
    </>
  );
}

const BULB_COLORS = ["oklch(0.58 0.22 25)", "oklch(0.86 0.17 92)", "oklch(0.66 0.19 145)", "oklch(0.72 0.17 55)", "oklch(0.55 0.2 330)", "oklch(0.7 0.13 215)", "oklch(0.48 0.18 285)"];
const SWAY = [-10, 7, -4, 11, -8, 5, -12, 9, -6];

/**
 * Fio de lâmpadas pendurado sobre o topo de uma foto, com o fio a ondular
 * e as lâmpadas a cair (inspirado nas luzes de Natal clássicas).
 */
export function HangingLights({ count = 8, className = "" }: { count?: number; className?: string }) {
  // Fio ondulado em coordenadas 0–100 (x) × 0–100 (y, altura da faixa).
  const wire = (x: number) => 30 + 22 * Math.sin((x / 100) * Math.PI * 3 + 0.6);
  let d = `M0 ${q(wire(0))}`;
  for (let x = 4; x <= 100; x += 4) d += ` L${x} ${q(wire(x))}`;
  const pts = Array.from({ length: count }, (_, k) => {
    const x = q(((k + 0.5) / count) * 100);
    return { x, y: q(wire(x)), r: SWAY[k % SWAY.length]! };
  });
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 -top-3 z-[2] h-6 md:-top-3.5 md:h-7 ${className}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <path d={d} fill="none" stroke="oklch(0.22 0.02 150)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      </svg>
      {pts.map((p, k) => (
        <span
          key={k}
          className="xmas-hang"
          style={{ left: `${p.x}%`, top: `${p.y}%`, ["--r" as string]: `${p.r}deg`, animationDelay: `${q((k % 4) * 0.45)}s` }}
        >
          <svg viewBox="0 0 12 22" className="block h-full w-full overflow-visible">
            <rect x="3.6" y="0" width="4.8" height="5.5" rx="0.8" fill="oklch(0.2 0.02 150)" />
            <path
              className="xmas-hang-glass"
              d="M6 4.8 C10.6 6.4 11.4 12 9.6 16.4 C8.6 19 7.2 21.4 6 21.6 C4.8 21.4 3.4 19 2.4 16.4 C0.6 12 1.4 6.4 6 4.8 Z"
              fill={BULB_COLORS[k % BULB_COLORS.length]}
              style={{ color: BULB_COLORS[k % BULB_COLORS.length], animationDelay: `${q(((k * 3) % 5) * 0.35)}s` }}
            />
            <path d="M4.2 8.5 C3.4 10.5 3.4 12.5 3.9 14" fill="none" stroke="oklch(1 0 0 / 70%)" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
        </span>
      ))}
    </div>
  );
}
