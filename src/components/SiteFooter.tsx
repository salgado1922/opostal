import { Youtube } from "lucide-react";

const LINKS = [
  { href: "/#cidades", label: "Roteiros gratuitos" },
  { href: "/roteiro-personalizado", label: "Roteiro personalizado" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#sobre", label: "Sobre" },
  { href: "mailto:contacto@opostal.pt", label: "Contacto" },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.53V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.76 1.54V7.26a4.78 4.78 0 0 1-1.03-.57z" />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cream/55 transition-colors hover:text-gold"
    >
      {icon}
      <span className="hidden sm:inline">{label.replace("O Postal no ", "")}</span>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/10 px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 text-center sm:text-left">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 sm:justify-start">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[11px] uppercase tracking-[0.22em] text-cream/65 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-cream/40 leading-relaxed">
          Alguns dos links de reserva são afiliados. Só recomendo o que faz sentido para a viagem.
        </p>
        <div className="flex flex-col gap-4 border-t border-gold/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/55">
            O Postal. Guias editoriais de cidades europeias, feitos com calma e partilhados com gosto.
          </p>
          <div className="flex items-center justify-center gap-5 sm:justify-end">
            <SocialLink
              href="https://www.tiktok.com/@opostal.pt"
              label="O Postal no TikTok"
              icon={<TikTokIcon className="h-4 w-4" />}
            />
            <SocialLink
              href="https://www.youtube.com/@opostalpt"
              label="O Postal no YouTube"
              icon={<Youtube className="h-4 w-4" />}
            />
            <ContactDialog />
          </div>

        </div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-cream/35">
          Fotos: Unsplash · Wikimedia Commons
        </p>
      </div>
    </footer>
  );
}
