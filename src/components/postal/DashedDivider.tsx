import { Stamp } from "lucide-react";

type Props = {
  withStamp?: boolean;
  className?: string;
};

/**
 * Divisor tracejado dourado, opcionalmente com um pequeno carimbo
 * decorativo no centro — para separar secções de um postal.
 */
export function DashedDivider({ withStamp = false, className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-4 ${className}`}
    >
      <span className="h-px flex-1 border-t border-dashed border-gold/45" />
      {withStamp && (
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-gold/60"
          style={{ color: "var(--gold)" }}
        >
          <Stamp className="h-3.5 w-3.5" strokeWidth={1.4} />
        </span>
      )}
      <span className="h-px flex-1 border-t border-dashed border-gold/45" />
    </div>
  );
}
