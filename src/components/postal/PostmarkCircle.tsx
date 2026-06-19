import { motion } from "framer-motion";

type Props = {
  city: string;
  year?: string;
  rotate?: number;
  className?: string;
};

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
            {year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
