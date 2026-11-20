/** Brilhos sobre as árvores das fotos e fio de luzes à volta das polaroides. */

export type GlowArea =
  | { tipo: "arvore"; x: number; topo: number; base: number; meia: number; n?: number }
  | { tipo: "caixa"; x: number; y: number; w: number; h: number; n?: number };

// Valores determinísticos e arredondados: iguais no servidor e no browser.
const rnd = (i: number, n: number) => ((Math.sin(i * 127.1 + n * 311.7) * 43758.5453) % 1 + 1) % 1;
const q = (v: number) => Math.round(v * 10) / 10;

function points(area: GlowArea, seed: number) {
  const n = area.n ?? 18;
  return Array.from({ length: n }, (_, k) => {
    const i = seed * 97 + k;
    let x: number, y: number;
    if (area.tipo === "arvore") {
      // Mais pontos para baixo (onde a árvore é mais larga).
      const t = Math.sqrt(0.06 + 0.94 * rnd(i, 1));
      y = area.topo + t * (area.base - area.topo);
      x = area.x + (rnd(i, 2) * 2 - 1) * area.meia * t;
    } else {
      x = area.x + rnd(i, 1) * area.w;
      y = area.y + rnd(i, 2) * area.h;
    }
    return { x: q(x), y: q(y), s: Math.round(7 + rnd(i, 3) * 9), d: q(rnd(i, 4) * 4), dur: q(1.8 + rnd(i, 5) * 2.4) };
  });
}

export function TreeGlints({ areas }: { areas: GlowArea[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {areas.flatMap((a, ai) =>
        points(a, ai + 1).map((p, k) => (
          <i
            key={`${ai}-${k}`}
            className="xmas-glint"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s`, animationDuration: `${p.dur}s` }}
          />
        )),
      )}
    </div>
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
