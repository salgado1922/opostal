import { type ReactNode } from "react";
import { PostmarkCircle } from "./PostmarkCircle";
import { PostalStamp } from "./PostalStamp";

type Props = {
  message: ReactNode;
  signature?: string;
  city?: string;
  year?: string;
  stampCode?: string;
  stampLabel?: string;
  addressLines?: string[];
  className?: string;
};

/**
 * Verso de postal — linha vertical central a dividir mensagem (manuscrita,
 * à esquerda) e morada (à direita) com selo e carimbo. Os tokens de cor
 * herdam do tema da página, por isso encaixa em qualquer cidade.
 */
export function PostcardBack({
  message,
  signature = "O Postal",
  city = "O POSTAL",
  year = "MMXXVI",
  stampCode = "OP",
  stampLabel = "O Postal",
  addressLines = [
    "Para: viajante curioso",
    "Rua dos Roteiros, 1",
    "Em qualquer lado da Europa",
  ],
  className = "",
}: Props) {
  return (
    <div
      className={`relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/25 bg-plum/30 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)] ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, color-mix(in oklab, var(--gold) 4%, transparent) 0 2px, transparent 2px 12px)",
      }}
      role="figure"
      aria-label="Verso de um postal d'O Postal"
    >
      {/* moldura interior tracejada */}
      <div className="m-3 rounded-xl border border-dashed border-gold/30 p-6 md:m-4 md:p-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_auto_1fr] md:gap-10">
          {/* mensagem manuscrita */}
          <div className="relative">
            <p
              className="mb-3 text-[10px] uppercase tracking-[0.35em]"
              style={{ color: "var(--gold)" }}
            >
              Mensagem
            </p>
            <p
              className="font-hand leading-[1.4] text-cream"
              style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)" }}
            >
              {message}
            </p>
            <p
              className="mt-6 font-hand text-cream/85"
              style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)" }}
            >
              — {signature}
            </p>
          </div>

          {/* divisor vertical central */}
          <div
            aria-hidden="true"
            className="hidden w-px md:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--gold) 55%, transparent) 0 6px, transparent 6px 12px)",
            }}
          />

          {/* morada + selo + carimbo */}
          <div className="relative flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <p
                className="text-[10px] uppercase tracking-[0.35em]"
                style={{ color: "var(--gold)" }}
              >
                Para
              </p>
              <PostalStamp code={stampCode} label={stampLabel} value="€0,85" />
            </div>

            <ul className="mt-4 space-y-3">
              {addressLines.map((line, i) => (
                <li key={i} className="relative">
                  <span className="text-sm text-cream/85 md:text-base">
                    {line}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-px border-t border-dashed border-gold/25"
                  />
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-end">
              <PostmarkCircle city={city} year={year} rotate={-10} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
