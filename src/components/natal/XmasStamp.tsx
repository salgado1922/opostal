import { InkStamp } from "@/components/passport/InkStamp";
import { stampDate } from "@/components/passport/stamps";
import { XMAS_MOTIF, XMAS_SEASON, type XmasSlug } from "@/data/natal-stamps";

/** Raminho de azevinho preso ao carimbo de Natal. */
function Holly({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" aria-hidden className={`pointer-events-none absolute ${className}`}>
      <g style={{ fill: "var(--holly-leaf)" }}>
        <path d="M30 22C24 13 16 11 5 13c3 2 1 5 4 6-1 3 1 5 3 5 1 3 5 3 7 2 3 2 8 0 11-4z" />
        <path d="M30 22c6-9 14-11 25-9-3 2-1 5-4 6 1 3-1 5-3 5-1 3-5 3-7 2-3 2-8 0-11-4z" />
      </g>
      <path d="M29 21Q18 16 8 14M31 21q11-5 21-7" fill="none" strokeWidth="1" style={{ stroke: "var(--passport-paper)" }} opacity=".55" />
      <g style={{ fill: "var(--holly-berry)" }}>
        <circle cx="26.5" cy="24" r="4" />
        <circle cx="33.5" cy="24" r="4" />
        <circle cx="30" cy="29.5" r="4" />
      </g>
      <g style={{ fill: "var(--passport-paper)" }} opacity=".7">
        <circle cx="25.3" cy="22.8" r="1" />
        <circle cx="32.3" cy="22.8" r="1" />
        <circle cx="28.8" cy="28.3" r="1" />
      </g>
    </svg>
  );
}

type Props = {
  slug: XmasSlug;
  city: string;
  /** Data do carimbo; sem data fica só o contorno por carimbar. */
  at?: string;
  rotate?: number;
  className?: string;
};

/** Carimbo de Natal: tinta vermelha, desenho da cidade e um raminho de azevinho. */
export function XmasStamp({ slug, city, at, rotate = 0, className = "" }: Props) {
  const ghost = !at;
  return (
    <span className={`relative inline-block ${className}`}>
      <InkStamp
        top={`Natal · ${XMAS_SEASON}`}
        bottom={city}
        center={at ? stampDate(at).split(" ").slice(0, 2).join(" ") : "Advento"}
        icon={XMAS_MOTIF[slug]}
        motif="❄"
        ink="var(--stamp-natal)"
        shape="circle"
        size="100%"
        rotate={rotate}
        ghost={ghost}
        tier="verified"
        className="block"
        title={ghost ? `Carimbo de Natal de ${city}, por carimbar` : `Carimbo de Natal de ${city}, ${XMAS_SEASON}`}
      />
      {!ghost && <Holly className="-right-[4%] -top-[6%] w-[40%] rotate-[18deg]" />}
    </span>
  );
}
