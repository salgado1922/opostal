import { SmartImage } from "@/components/SmartImage";
import { usePassport } from "@/hooks/use-passport";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Menu } from "lucide-react";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/#cidades", label: "Roteiros gratuitos" },
];

/** Selo de borracha: o sinal do passaporte, sempre junto ao link. */
function StampMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" strokeDasharray="1.6 2.1" opacity="0.75" />
      <circle cx="12" cy="12" r="6.6" />
      <path d="M12 8.6l1 2.4 2.4.3-1.8 1.7.5 2.4-2.1-1.2-2.1 1.2.5-2.4-1.8-1.7 2.4-.3z" strokeWidth="0.9" />
    </svg>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const passport = usePassport();
  const carimbos = useMemo(
    () =>
      Object.values(passport).reduce(
        (n, c) => n + Object.keys(c?.stamps ?? {}).length,
        0,
      ),
    [passport],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = scrolled
    ? "text-cream/70 hover:text-cream"
    : "text-cream/90 hover:text-cream [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]";

  const passportClass = scrolled
    ? "text-gold-soft"
    : "text-gold [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]";

  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out ${
        scrolled
          ? "border-b border-gold/15 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link
          to="/"
          aria-label="O Postal"
          className={`ml-1 inline-flex items-center transition duration-300 hover:scale-[1.01] hover:opacity-85 ${
            scrolled ? "" : "[filter:drop-shadow(0_1px_8px_rgba(0,0,0,0.65))]"
          }`}
        >
          <SmartImage
            src={opostalHorizontalTransparent.url}
            alt="O Postal"
            priority
            className="h-8 w-auto object-contain md:h-10"
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-xs uppercase tracking-[0.2em] transition-colors ${linkClass}`}
            >
              {l.label}
            </a>
          ))}

          <Link
            to="/passaporte"
            className={`group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors ${passportClass}`}
          >
            <StampMark className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-rotate-6" />
            <span className="border-b border-gold/50 pb-0.5 transition-colors group-hover:border-gold">
              O meu passaporte
            </span>
            {carimbos > 0 && (
              <span className="text-[11px] tracking-[0.14em] text-gold/90">· {carimbos}</span>
            )}
          </Link>

          <a
            href="/roteiro-personalizado"
            className="gold-link text-xs uppercase tracking-[0.2em]"
          >
            Roteiro personalizado
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden inline-flex h-9 w-9 items-center justify-center ${linkClass}`}
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            <Link
              to="/passaporte"
              onClick={() => setOpen(false)}
              className="mb-1 flex items-center gap-3 border-b border-gold/15 px-3 pb-4 text-xs uppercase tracking-[0.22em] text-gold"
            >
              <StampMark className="h-5 w-5 shrink-0" />
              <span className="border-b border-gold/50 pb-0.5">O meu passaporte</span>
              {carimbos > 0 && (
                <span className="text-xs tracking-[0.14em] text-gold/90">· {carimbos}</span>
              )}
            </Link>

            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-xs uppercase tracking-[0.22em] text-cream/80 transition-colors hover:text-cream"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/roteiro-personalizado"
              onClick={() => setOpen(false)}
              className="gold-link mt-2 inline-flex items-center px-3 py-2.5 text-[11px] uppercase tracking-[0.22em]"
            >
              Roteiro personalizado
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
