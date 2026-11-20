import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { usePassport } from "@/hooks/use-passport";
import { XMAS_CITIES } from "@/data/mercados-natal";
import { XMAS_SEASON } from "@/data/natal-stamps";
import { XmasStamp } from "./XmasStamp";
import { XmasStampViewer } from "./XmasStampViewer";
import type { XmasSlug } from "@/data/natal-stamps";

/** Os três carimbos de Natal numa folha de passaporte, para colecionar. */
export function XmasCollection() {
  const p = usePassport();
  const got = XMAS_CITIES.filter((c) => p[c.slug]?.natal?.[XMAS_SEASON]).length;
  const [view, setView] = useState<XmasSlug | null>(null);
  const vc = XMAS_CITIES.find((c) => c.slug === view);
  const vs = vc ? p[vc.slug]?.natal?.[XMAS_SEASON] : undefined;
  return (
    <section aria-labelledby="carimbos-natal" className="relative mx-auto max-w-5xl px-5 pb-14 md:px-6 md:pb-20">
      <h2 id="carimbos-natal" className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Carimbos de Natal · {XMAS_SEASON}</h2>
      <p className="mt-3 max-w-2xl font-serif text-2xl leading-snug text-cream md:text-3xl">
        Três mercados, três carimbos. Cada um só se ganha lá dentro, com o telemóvel na mão.
      </p>
      <div
        className="mt-8 grid grid-cols-3 gap-2 px-3 pb-5 pt-6 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9)] sm:gap-6 md:px-12 md:pt-8"
        style={{ backgroundColor: "var(--passport-paper)", color: "var(--ink)" }}
      >
        {XMAS_CITIES.map((c, i) => {
          const s = p[c.slug]?.natal?.[XMAS_SEASON];
          const cls = "group flex flex-col items-center rounded-sm text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]";
          const inner = (
            <>
              <XmasStamp slug={c.slug} city={c.city} at={s?.at} rotate={s ? [-7, 5, -3][i] : 0} className="w-full max-w-[180px] transition-transform group-hover:scale-105" />
              <span className="mt-2 font-serif text-lg leading-tight md:text-xl">{c.city}</span>
              <span className="text-[10px] uppercase tracking-[0.18em] opacity-60">{s ? "ver em grande" : "por carimbar"}</span>
            </>
          );
          return s ? (
            <button key={c.slug} type="button" onClick={() => setView(c.slug)} className={cls} aria-label={`Ver o carimbo de Natal de ${c.city} em grande`}>
              {inner}
            </button>
          ) : (
            <Link key={c.slug} to="/mercados-de-natal/$cidade" params={{ cidade: c.slug }} className={cls}>
              {inner}
            </Link>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        {got > 0 ? `Tens ${got} de 3. ` : ""}
        Toca numa cidade para saber onde e até quando se carimba.{" "}
        <Link to="/passaporte" className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">Ver o passaporte</Link>
      </p>
      {vc && vs && (
        <XmasStampViewer open onOpenChange={(o) => !o && setView(null)} slug={vc.slug} city={vc.city} at={vs.at} market={vs.market} />
      )}
    </section>
  );
}
