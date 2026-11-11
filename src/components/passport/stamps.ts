export type StampShape = "circle" | "oval" | "rect" | "hex";

export const STAMP_STYLE: Record<string, { shape: StampShape; motif: string; code: string }> = {
  praga: { shape: "circle", motif: "✦", code: "PRG" },
  istambul: { shape: "hex", motif: "☾", code: "IST" },
  florenca: { shape: "oval", motif: "⚜", code: "FLR" },
  londres: { shape: "rect", motif: "♛", code: "LDN" },
  paris: { shape: "circle", motif: "❦", code: "PAR" },
  barcelona: { shape: "hex", motif: "☀", code: "BCN" },
  viena: { shape: "oval", motif: "♪", code: "VIE" },
  lisboa: { shape: "rect", motif: "⚓", code: "LIS" },
  budapeste: { shape: "circle", motif: "❖", code: "BUD" },
};

export const inkFor = (slug: string) => `var(--stamp-${slug}, var(--terracotta))`;

/** Número estável a partir de um texto, para rodar e espalhar os carimbos sempre igual. */
export function seeded(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return ((h >>> 0) % 1000) / 1000;
}

export const stampDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "2-digit" }).replace(/\./g, "").toUpperCase()
    : "";
