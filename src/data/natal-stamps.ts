/* Carimbos de Natal: um por cidade e por época, só nos mercados, só enquanto estão abertos.
   Datas iguais às de src/data/mercados-natal.ts (época 2026). */
export const XMAS_SEASON = "2026";
/** Os mercados são praças grandes: mais folga do que nas paragens dos guias. */
export const XMAS_RADIUS_M = 250;

export type XmasSlug = "viena" | "praga" | "budapeste";
export type XmasSpot = { name: string; coords: [number, number]; open: string; close: string };

export const XMAS_MOTIF: Record<XmasSlug, string> = { viena: "xmasViena", praga: "xmasPraga", budapeste: "xmasBudapeste" };

export const XMAS_SPOTS: Record<XmasSlug, XmasSpot[]> = {
  viena: [
    { name: "Rathausplatz", coords: [48.2104, 16.3578], open: "2026-11-13", close: "2026-12-26" },
    { name: "Schönbrunn", coords: [48.186, 16.3125], open: "2026-11-06", close: "2027-01-06" },
    { name: "Spittelberg", coords: [48.2028, 16.355], open: "2026-11-13", close: "2026-12-23" },
    { name: "Belvedere", coords: [48.191, 16.381], open: "2026-11-20", close: "2026-12-31" },
  ],
  praga: [
    { name: "Praça da Cidade Velha", coords: [50.0875, 14.4213], open: "2026-11-28", close: "2027-01-06" },
    { name: "Praça Venceslau", coords: [50.0818, 14.427], open: "2026-11-28", close: "2027-01-06" },
    { name: "Náměstí Míru", coords: [50.0753, 14.4376], open: "2026-11-20", close: "2026-12-24" },
    { name: "Náměstí Republiky", coords: [50.088, 14.4282], open: "2026-11-25", close: "2026-12-24" },
  ],
  budapeste: [
    { name: "Advent Bazilika", coords: [47.5007, 19.0528], open: "2026-11-13", close: "2027-01-01" },
    { name: "Vörösmarty tér", coords: [47.4966, 19.0505], open: "2026-11-13", close: "2026-12-28" },
    { name: "Advent Óbudán", coords: [47.5415, 19.0453], open: "2026-11-27", close: "2026-12-23" },
  ],
};

export const isXmasSlug = (s: string): s is XmasSlug => s in XMAS_SPOTS;

// As três cidades estão na hora da Europa Central (UTC+1 no inverno).
const start = (d: string) => Date.parse(`${d}T00:00:00+01:00`);
const end = (d: string) => Date.parse(`${d}T23:59:59+01:00`);

export function openSpots(slug: XmasSlug, now: Date) {
  const t = now.getTime();
  return XMAS_SPOTS[slug].filter((m) => t >= start(m.open) && t <= end(m.close));
}

export type XmasStatus = "antes" | "aberto" | "fechado";
export function xmasStatus(slug: XmasSlug, now: Date): XmasStatus {
  const t = now.getTime();
  const spots = XMAS_SPOTS[slug];
  if (t < Math.min(...spots.map((m) => start(m.open)))) return "antes";
  if (t > Math.max(...spots.map((m) => end(m.close)))) return "fechado";
  return openSpots(slug, now).length ? "aberto" : "fechado";
}

/** Primeiro e último dia em que se pode carimbar nesta cidade. */
export function xmasWindow(slug: XmasSlug) {
  const spots = XMAS_SPOTS[slug];
  const open = spots.map((m) => m.open).sort()[0]!;
  const close = spots.map((m) => m.close).sort().at(-1)!;
  return { open, close };
}

const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
/** "2027-01-06" → "6 de janeiro" (igual no servidor e no telemóvel). */
export const dayLabel = (iso: string) => `${Number(iso.slice(8, 10))} de ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;

function distance(a: [number, number], b: [number, number]) {
  const R = 6371000;
  const rad = (d: number) => (d * Math.PI) / 180;
  const s = Math.sin(rad(b[0] - a[0]) / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(rad(b[1] - a[1]) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** Mercado aberto mais perto e se a pessoa está mesmo lá (com folga para o erro do GPS, até 100 m). */
export function checkXmasSpot(slug: XmasSlug, at: [number, number], accuracy: number, now: Date) {
  const spots = openSpots(slug, now);
  if (!spots.length) return null;
  const ranked = spots.map((m) => ({ spot: m, d: distance(at, m.coords) })).sort((a, b) => a.d - b.d);
  const best = ranked[0]!;
  return { ...best, ok: best.d - Math.min(accuracy, 100) <= XMAS_RADIUS_M };
}
