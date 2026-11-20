import { Link } from "@tanstack/react-router";

/** Faixa sazonal: só aparece até 6 de janeiro de 2027. */
export const XMAS_UNTIL = "2027-01-07";
export const isXmasSeason = (now = new Date()) => now < new Date(`${XMAS_UNTIL}T00:00:00Z`);

const SLUGS: Record<string, "viena" | "praga" | "budapeste"> = { Viena: "viena", Praga: "praga", Budapeste: "budapeste" };
const CLS = "mx-auto flex min-h-11 max-w-5xl items-center justify-between gap-4 text-cream hover:text-gold";

export function XmasStrip({ city }: { city?: string }) {
  if (!isXmasSeason()) return null;
  const slug = city ? SLUGS[city] : undefined;
  const inner = (
    <>
      <span className="flex items-center gap-3">
        <span aria-hidden className="text-lg text-gold">✦</span>
        <span className="font-serif text-lg italic md:text-xl">
          {city ? `Mercados de Natal em ${city} — datas e preços 2026` : "Mercados de Natal · Viena, Praga, Budapeste"}
        </span>
      </span>
      <span aria-hidden className="text-gold">→</span>
    </>
  );
  return (
    <div className="border-y border-gold/20 px-5 py-4 md:px-6">
      {slug ? (
        <Link to="/mercados-de-natal/$cidade" params={{ cidade: slug }} className={CLS}>{inner}</Link>
      ) : (
        <Link to="/mercados-de-natal" className={CLS}>{inner}</Link>
      )}
    </div>
  );
}
