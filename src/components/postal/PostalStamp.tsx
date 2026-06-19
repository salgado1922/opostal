type Props = {
  code: string;
  label?: string;
  value?: string;
  rotate?: number;
  className?: string;
};

/**
 * Selo postal — pequeno rectângulo com borda serrilhada (via mask), código
 * da cidade em destaque (ex.: LDN), valor e legenda discreta. Usa tokens de
 * cor semânticos para herdar o tema da página.
 */
export function PostalStamp({
  code,
  label = "O Postal",
  value = "€0,85",
  rotate = -6,
  className = "",
}: Props) {
  // Borda serrilhada (perfurações de selo) construída com radial-gradient
  // repetido em mask-image, igual nos quatro lados.
  const scallopMask =
    "radial-gradient(circle 3px at 7px 0, transparent 98%, #000 100%) top/14px 7px repeat-x," +
    "radial-gradient(circle 3px at 7px 100%, transparent 98%, #000 100%) bottom/14px 7px repeat-x," +
    "radial-gradient(circle 3px at 0 7px, transparent 98%, #000 100%) left/7px 14px repeat-y," +
    "radial-gradient(circle 3px at 100% 7px, transparent 98%, #000 100%) right/7px 14px repeat-y," +
    "linear-gradient(#000, #000) center/calc(100% - 14px) calc(100% - 14px) no-repeat";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="flex h-20 w-16 flex-col items-center justify-between px-1.5 py-2 text-center shadow-[0_8px_22px_-12px_rgba(0,0,0,0.7)]"
        style={{
          background:
            "linear-gradient(150deg, color-mix(in oklab, var(--cream) 92%, transparent), color-mix(in oklab, var(--cream) 75%, transparent))",
          WebkitMask: scallopMask,
          mask: scallopMask,
          WebkitMaskComposite: "source-over",
        }}
      >
        <span
          className="font-serif uppercase"
          style={{
            color: "color-mix(in oklab, var(--terracotta) 90%, black)",
            fontSize: "8px",
            letterSpacing: "0.28em",
          }}
        >
          {label}
        </span>
        <span
          className="font-serif font-bold leading-none"
          style={{
            color: "color-mix(in oklab, var(--terracotta) 88%, black)",
            fontSize: "20px",
            letterSpacing: "0.04em",
          }}
        >
          {code}
        </span>
        <span
          className="font-serif uppercase"
          style={{
            color: "color-mix(in oklab, var(--terracotta) 80%, black)",
            fontSize: "8px",
            letterSpacing: "0.24em",
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
