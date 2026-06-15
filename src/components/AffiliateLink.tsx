import { Ticket, ExternalLink } from "lucide-react";

type AffiliateLinkProps = {
  /** O teu link de afiliado (GetYourGuide, Booking, etc.) */
  href: string;
  /** Texto do botão. Por omissão: "Reservar" */
  label?: string;
  /** Classes extra opcionais */
  className?: string;
};

/**
 * Botão reutilizável para links de afiliado.
 * Inclui rel="sponsored nofollow noopener" (exigido pelo Google e
 * por vários programas de afiliados) e abre numa nova aba.
 */
export function AffiliateLink({
  href,
  label = "Reservar",
  className = "",
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={`inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/25 hover:shadow-[0_10px_30px_-10px_oklch(0.82_0.14_78/0.6)] ${className}`}
    >
      <Ticket className="h-3.5 w-3.5" />
      {label}
      <ExternalLink className="h-3 w-3 opacity-70" />
    </a>
  );
}
