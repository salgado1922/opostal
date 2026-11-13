import { Link } from "@tanstack/react-router";
import { useIsAdmin } from "@/hooks/use-is-admin";

/** Atalhos do painel, visíveis só para a conta admin. */
export function AdminLinks({ floating = false }: { floating?: boolean }) {
  const admin = useIsAdmin();
  if (!admin) return null;
  const cls = "text-[11px] uppercase tracking-[0.22em] text-cream/65 transition-colors hover:text-gold";
  const links = (
    <>
      <span className="text-[11px] uppercase tracking-[0.22em] text-gold/70">Admin</span>
      <Link to="/admin" className={cls}>Pedidos</Link>
      <Link to="/passaportes" className={cls}>Passaportes</Link>
      <Link to="/afiliados" className={cls}>Afiliados</Link>
    </>
  );
  if (floating)
    return (
      <nav aria-label="Painel de admin" className="fixed bottom-4 right-4 z-40 flex items-baseline gap-4 border border-gold/30 bg-background/90 px-4 py-2.5 backdrop-blur">
        {links}
      </nav>
    );
  return (
    <nav aria-label="Painel de admin" className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-2 sm:justify-start">
      {links}
    </nav>
  );
}
