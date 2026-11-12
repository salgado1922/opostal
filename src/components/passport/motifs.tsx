import type { ReactNode } from "react";

/* Desenhos de linha (64×64) para o centro de cada carimbo. */
export const MOTIFS: Record<string, ReactNode> = {
  spires: (<><path d="M12 58V30l4-14 4 14v28M26 58V22l5-18 5 18v36M42 58V26l4-14 4 14v32M8 58h48" /><path d="M31 30v6M16 36v4M46 34v4" /></>),
  wave: (<><path d="M14 58V18c6-8 30-8 36 0v40" /><path d="M20 26c4 3 8-3 12 0s8-3 12 0M20 36c4 3 8-3 12 0s8-3 12 0" /><circle cx="24" cy="48" r="3" /><circle cx="40" cy="48" r="3" /><path d="M10 58h44" /></>),
  lizard: (<><path d="M10 40c6-10 16-12 24-10s14 2 20-6" /><path d="M10 40c4 4 10 4 14 0M34 30l-4-8M40 30l6-6M30 38l-2 10M42 34l6 8" /><circle cx="14" cy="38" r="1.5" /><path d="M18 34l4 2 4-2 4 2 4-2" /></>),
  basket: (<><path d="M10 30h44l-6 26H16z" /><path d="M20 30c0-12 24-12 24 0M18 38h28M20 46h24" /><circle cx="26" cy="22" r="4" /><circle cx="36" cy="20" r="5" /></>),
  frame: (<><rect x="10" y="10" width="44" height="44" /><rect x="16" y="16" width="32" height="32" /><path d="M22 42c2-10 6-14 10-8s6-12 10-6M24 26a3 3 0 1 0 0.1 0" /></>),
  glass: (<><path d="M20 10h24l-2 14a10 10 0 0 1-20 0z" /><path d="M32 34v18M22 54h20M22 18h20" /><circle cx="38" cy="20" r="2" /></>),
  fountain: (<><path d="M14 52h36M18 52v-6h28v6M32 46V26" /><path d="M32 26c-6-10-16-8-18 2M32 26c6-10 16-8 18 2M32 22c0-6 0-10 0-12" /><path d="M24 38c0 3 0 5 0 8M40 38v8" /></>),
  sun: (<><circle cx="32" cy="28" r="10" /><path d="M32 8v6M32 42v4M12 28h6M46 28h6M18 14l4 4M42 42l4 4M46 14l-4 4M18 42l4-4" /><path d="M8 52c6-4 10 4 16 0s10 4 16 0 10 4 16 0" /></>),
  parliament: (<><path d="M6 56h52M10 56V38h44v18M24 38V28a8 8 0 0 1 16 0v10" /><path d="M32 20v-8M12 38V30l3-6 3 6v8M46 38V30l3-6 3 6v8" /><path d="M16 46v6M24 46v6M32 46v6M40 46v6M48 46v6" /></>),
  shoes: (<><path d="M8 44h18c4 0 6-4 6-8l-4-2-6 2-6-4-8 4z" /><path d="M34 52h18c4 0 6-4 6-8l-4-2-6 2-6-4-8 4z" /><path d="M6 58h52" /></>),
  bridge: (<><path d="M4 40h56M4 50h56" /><path d="M10 50c4-12 14-12 18 0M36 50c4-12 14-12 18 0" /><path d="M20 40V16l4-4 4 4v24M38 40V16l4-4 4 4v24M24 18c6 8 10 8 14 0" /></>),
  castle: (<><path d="M10 56V26h8v-6h4v6h6V18h8v8h6v-6h4v6h8v30z" /><path d="M28 56V44a4 4 0 0 1 8 0v12M16 34h4M44 34h4M32 18V8l8 3-8 3" /></>),
  sunset: (<><path d="M14 40a18 18 0 0 1 36 0" /><path d="M6 40h52M12 48h40M20 56h24M32 14v-6M14 22l-4-4M50 22l4-4" /></>),
  steam: (<><path d="M8 44h48v8a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6z" /><path d="M20 36c-4-6 4-8 0-14M32 36c-4-6 4-8 0-14M44 36c-4-6 4-8 0-14" /></>),
  beer: (<><path d="M16 20h26v34a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4z" /><path d="M42 28h6a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-6M16 20c0-8 26-8 26 0M22 30v20M30 30v20M38 30v20" /></>),
  boat: (<><path d="M6 42h52l-8 12H14z" /><path d="M14 42V32h30v10M20 32v-8h14v8M22 36h4M30 36h4M38 36h4" /><path d="M4 58c6-3 10 3 16 0s10 3 16 0 10 3 16 0" /></>),
  statue: (<><circle cx="32" cy="14" r="6" /><path d="M32 20v18M24 26l8 4 8-6M32 38l-6 12M32 38l4 12M20 50h24v8H20z" /></>),
  gelato: (<><path d="M20 30l12 28 12-28z" /><circle cx="26" cy="24" r="7" /><circle cx="38" cy="24" r="7" /><circle cx="32" cy="14" r="7" /><path d="M24 36h16M28 44h8" /></>),
  columns: (<><path d="M8 18L32 6l24 12zM8 18h48M10 56h44M8 60h48" /><path d="M14 22v32M24 22v32M34 22v32M44 22v32M50 22v32" /></>),
  dome: (<><path d="M14 40a18 18 0 0 1 36 0" /><path d="M32 22v-8M28 14h8M8 40h48v6H8zM12 46v12M22 46v12M32 46v12M42 46v12M52 46v12M6 58h52M32 22v18M22 26l4 14M42 26l-4 14" /></>),
  tower: (<><path d="M24 58V20h16v38M20 58h24" /><path d="M24 20l8-12 8 12M28 28h8v6h-8zM28 42h8v6h-8z" /></>),
  mosque: (<><path d="M18 40a14 14 0 0 1 28 0" /><path d="M32 26v-6M14 40h36v18H14zM8 58V20l2-8 2 8v38M52 58V20l2-8 2 8v38M28 58v-8a4 4 0 0 1 8 0v8M4 58h56" /></>),
  palace: (<><path d="M4 56h56M6 56V30h52v26M6 30l26-14 26 14M28 56V44h8v12" /><path d="M12 36v6M20 36v6M44 36v6M52 36v6M12 46v6M20 46v6M44 46v6M52 46v6M32 16V8" /></>),
  lamp: (<><path d="M32 6v8M24 14h16l4 10-6 18H26l-6-18z" /><path d="M22 24h20M26 34h12M28 42l-2 8h12l-2-8M24 52h16" /></>),
  tea: (<><path d="M20 22h24l-4 30H24z" /><path d="M22 30h20M14 56h36M18 52a14 4 0 0 0 28 0M28 16c-2-4 2-6 0-10M36 16c-2-4 2-6 0-10" /></>),
  arch: (<><path d="M6 58V18h52v40M20 58V38a12 12 0 0 1 24 0v20M6 26h52M4 18h56M28 10h8v8h-8z" /></>),
  coffee: (<><path d="M14 26h30v14a12 12 0 0 1-12 12h-6a12 12 0 0 1-12-12z" /><path d="M44 30h4a5 5 0 0 1 0 10h-4M10 56h40M24 20c-2-4 2-6 0-10M32 20c-2-4 2-6 0-10" /></>),
  tram: (<><rect x="10" y="16" width="44" height="32" rx="4" /><path d="M10 28h44M18 20v8M28 20v8M38 20v8M46 20v8M18 48v6M46 48v6M6 56h52M32 16V8l-8-2" /><circle cx="18" cy="38" r="2" /><circle cx="46" cy="38" r="2" /></>),
  pastry: (<><ellipse cx="32" cy="38" rx="22" ry="12" /><ellipse cx="32" cy="36" rx="15" ry="7" /><circle cx="26" cy="35" r="1.5" /><circle cx="36" cy="37" r="1.5" /><circle cx="31" cy="33" r="1.2" /><path d="M10 40c0 6 10 10 22 10s22-4 22-10" /></>),
  clock: (<><circle cx="32" cy="30" r="18" /><circle cx="32" cy="30" r="12" /><path d="M32 30l6-8M32 30l-4 6M32 12V6M14 52h36M20 48v4M44 48v4" /><circle cx="44" cy="20" r="2" /></>),
  guard: (<><path d="M20 30c0-20 24-20 24 0v6H20z" /><path d="M20 36h24v4H20zM26 40v6a6 6 0 0 0 12 0v-6M22 58c0-6 4-10 10-10s10 4 10 10" /></>),
  wand: (<><path d="M10 54L42 22M38 20l6 6" /><path d="M50 8l2 6 6 2-6 2-2 6-2-6-6-2 6-2zM20 16l1 3 3 1-3 1-1 3-1-3-3-1 3-1zM50 40l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" /></>),
  bus: (<><rect x="10" y="8" width="44" height="44" rx="5" /><path d="M10 26h44M16 14h10v8H16zM30 14h10v8H30zM44 14h6v8h-6zM14 32h36v8H14z" /><circle cx="20" cy="54" r="4" /><circle cx="44" cy="54" r="4" /></>),
  wheel: (<><circle cx="32" cy="28" r="20" /><circle cx="32" cy="28" r="3" /><path d="M32 8v40M12 28h40M18 14l28 28M46 14L18 42M24 58l8-30 8 30M18 58h28" /></>),
  eiffel: (<><path d="M32 4v6M28 10h8l2 14h-12zM26 24h12l6 16H20zM20 40h24l8 18H12z" /><path d="M24 58c0-8 16-8 16 0M22 32h20" /></>),
  pyramid: (<><path d="M32 8L6 54h52z" /><path d="M32 8v46M19 31h26M12 44h40M32 8L19 54M32 8l13 46" /></>),
  windmill: (<><path d="M24 58l4-26h8l4 26z" /><path d="M32 30L18 12M32 30l18-14M32 30L14 44M32 30l18 12" /><circle cx="32" cy="30" r="3" /><path d="M28 50h8v8h-8zM16 58h32" /></>),
  books: (<><path d="M8 56h48M10 56V20h8v36M18 56V14h10v42M30 56V24h8v32M38 56l6-30 8 2-6 28" /><path d="M12 28h4M20 22h6M32 32h4" /></>),
  heart: (<><path d="M32 54C16 42 8 32 8 22a12 12 0 0 1 24-4 12 12 0 0 1 24 4c0 10-8 20-24 32z" /><path d="M20 24c2-4 6-4 8-2M40 30l4 4M24 36l4-4" /></>),
  skull: (<><path d="M14 30a18 18 0 0 1 36 0v8l-4 4v8H18v-8l-4-4z" /><circle cx="25" cy="32" r="5" /><circle cx="39" cy="32" r="5" /><path d="M32 38l-3 5h6zM24 50v6M32 50v6M40 50v6M10 60l44-6M10 54l44 6" /></>),
  music: (<><path d="M24 48V14l26-6v34" /><ellipse cx="18" cy="48" rx="6" ry="5" /><ellipse cx="44" cy="42" rx="6" ry="5" /><path d="M24 22l26-6" /></>),
  cake: (<><path d="M10 34l34-16 10 10v20H10z" /><path d="M10 34h44M10 42h44M44 18v16" /><path d="M30 18c0-4 4-6 4-10" /><circle cx="34" cy="8" r="2" /></>),
  camera: (<><rect x="8" y="20" width="48" height="32" rx="5" /><path d="M22 20l4-8h12l4 8" /><circle cx="32" cy="36" r="10" /><circle cx="32" cy="36" r="4" /><circle cx="48" cy="27" r="1.6" /></>),
};

export function Motif({ name, x, y, size }: { name: string; x: number; y: number; size: number }) {
  const m = MOTIFS[name];
  if (!m) return null;
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 64})`} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" fill="none">
      {m}
    </g>
  );
}
