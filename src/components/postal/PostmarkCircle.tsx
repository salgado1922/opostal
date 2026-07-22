import { motion } from "framer-motion";

type Props = {
  city: string;
  year?: string;
  rotate?: number;
  className?: string;
};

const ROMAN: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function toRoman(input: string): string {
  const n = Number(input);
  if (!Number.isInteger(n) || n <= 0 || n >= 4000) return input;
  let num = n;
  let out = "";
  for (const [v, s] of ROMAN) {
    while (num >= v) { out += s; num -= v; }
  }
  return out;
}

/**
 * Carimbo postal circular — duplo círculo tracejado com cidade + ano.
 * Usa o token `--gold` (re-encaminhado por cada tema de cidade), por isso
 * adapta-se automaticamente a Praga, Istambul, Florença e Londres.
 */
export function PostmarkCircle({
  city,
  year = "MMXXVI",
  rotate = -8,
  className = "",
}: Props) {
  const displayYear = /^\d+$/.test(year) ? toRoman(year) : year;
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.85, rotate: rotate - 6 }}
      animate={{ opacity: 0.55, scale: 1, rotate }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none select-none ${className}`}
    >
      <div
        className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed md:h-40 md:w-40"
        style={{ borderColor: "var(--gold)", opacity: 0.7 }}
      >
        <div
          className="flex h-[82%] w-[82%] flex-col items-center justify-center rounded-full border text-center"
          style={{ borderColor: "var(--gold)", opacity: 0.85 }}
        >
          <span
            className="font-serif uppercase"
            style={{
              color: "var(--gold)",
              fontSize: "11px",
              letterSpacing: "0.42em",
            }}
          >
            {city}
          </span>
          <span
            className="mt-2 uppercase"
            style={{
              color: "var(--gold)",
              opacity: 0.85,
              fontSize: "9px",
              letterSpacing: "0.3em",
            }}
          >
            {displayYear}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
