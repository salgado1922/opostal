/** Luzes reais das árvores a cintilar, fios de luzes nas árvores e fio à volta das polaroides de comida. */

export type GlowArea =
  | { tipo: "arvore"; x: number; topo: number; base: number; meia: number; fio?: number[] }
  | { tipo: "caixa"; x: number; y: number; w: number; h: number };

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
          <img src={src} alt="" loading="lazy" decoding="async" className="xmas-halo" style={{ animationDelay: `${i * 0.7}s` }} />
          <img src={src} alt="" loading="lazy" decoding="async" className="xmas-sparkle xmas-sparkle-a" />
          <img src={src} alt="" loading="lazy" decoding="async" className="xmas-sparkle xmas-sparkle-b" />
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

const BULB_COLORS = ["var(--holly)", "var(--gold)", "oklch(0.72 0.16 150)", "var(--frost)"];

/** Pontos do fio, em coordenadas 0–100 da moldura. */
function bulbs(top: number, side: number) {
  const out: { x: number; y: number; r: number }[] = [];
  for (let k = 0; k <= top; k++) out.push({ x: q((k / top) * 100), y: 0, r: 180 });
  for (let k = 1; k < side; k++) out.push({ x: 100, y: q((k / side) * 100), r: 270 });
  for (let k = top; k >= 0; k--) out.push({ x: q((k / top) * 100), y: 100, r: 0 });
  for (let k = side - 1; k >= 1; k--) out.push({ x: 0, y: q((k / side) * 100), r: 90 });
  return out;
}

function wirePath(pts: { x: number; y: number }[]) {
  // Curvas a descair entre lâmpadas, para parecer um fio pendurado.
  let d = `M${pts[0]!.x} ${pts[0]!.y}`;
  const all = [...pts, pts[0]!];
  for (let k = 1; k < all.length; k++) {
    const a = all[k - 1]!, b = all[k]!;
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const sag = 2.2;
    const cx = a.y === b.y ? mx : mx + (a.x === 0 ? -sag : a.x === 100 ? sag : 0);
    const cy = a.x === b.x ? my : my + (a.y === 0 ? sag : a.y === 100 ? sag : 0);
    d += ` Q${q(cx)} ${q(cy)} ${b.x} ${b.y}`;
  }
  return d;
}

export function LightString({ portrait = false }: { portrait?: boolean }) {
  const pts = bulbs(portrait ? 7 : 9, portrait ? 8 : 6);
  return (
    <div aria-hidden className="pointer-events-none absolute -inset-[7px] z-[2]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <path d={wirePath(pts)} fill="none" stroke="oklch(0.3 0.04 150)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      </svg>
      {pts.map((p, k) => (
        <span
          key={k}
          className="xmas-bulb"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: `translate(-50%, -50%) rotate(${p.r}deg)`,
            ["--bulb" as string]: BULB_COLORS[k % BULB_COLORS.length],
            animationDelay: `${(k % 3) * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}
