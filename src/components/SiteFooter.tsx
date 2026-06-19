const LINKS = [
  { href: "/#cidades", label: "Roteiros gratuitos" },
  { href: "/roteiro-personalizado", label: "Roteiro personalizado" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#sobre", label: "Sobre" },
  { href: "mailto:contacto@opostal.pt", label: "Contacto" },
];

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
        <div className="flex flex-col gap-1.5 border-t border-gold/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/55">
            O Postal. Guias editoriais de cidades europeias, feitos com calma e partilhados com gosto.
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-cream/35">
            Fotos: Unsplash · Wikimedia Commons
          </p>
        </div>
      </div>
    </footer>
  );
}