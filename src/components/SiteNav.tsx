import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/#cidades", label: "Roteiros gratuitos" },
  { href: "/#sobre", label: "Sobre" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const linkClass = scrolled
    ? "text-cream/70 hover:text-cream"
    : "text-cream/90 hover:text-cream [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]";
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
          <img
            src={opostalHorizontalTransparent.url}
            alt="O Postal"
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
          <a
            href="/roteiro-personalizado"
            className="inline-flex items-center rounded-full border border-gold/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gold transition-colors hover:border-gold/70 hover:bg-gold/[0.08]"
          >
            Roteiro personalizado
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 ${linkClass}`}
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-xs uppercase tracking-[0.22em] text-cream/80 transition-colors hover:bg-gold/[0.08] hover:text-cream"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/roteiro-personalizado"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-gold/40 px-4 py-2.5 text-[11px] uppercase tracking-[0.22em] text-gold transition-colors hover:border-gold/70 hover:bg-gold/[0.08]"
            >
              Roteiro personalizado
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}