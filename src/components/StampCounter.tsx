import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePassport } from "@/hooks/use-passport";

type Stats = { total: number; this_month: number; travellers: number };

// Piso de prova social enquanto o tráfego é pequeno.
// Os carimbos reais somam-se a esta base, para cada carimbo novo fazer o número subir.
// Para tirar a simulação: apagar SIM_FLOOR e usar só os números reais.
/** Mudar para true para voltar a mostrar "este mês" e "viajantes com passaporte". */
export const SHOW_SECONDARY_STATS = false;

const SIM_FLOOR: Stats = { total: 186, this_month: 14, travellers: 32 };

/** Prova social: carimbos feitos por viajantes (sem contar a conta de admin). */
export function StampCounter() {
  const [s, setS] = useState<Stats | null>(null);

  const mine = usePassport();
  const myCount = Object.values(mine).reduce((n, c) => n + Object.keys(c.stamps).length, 0);

  useEffect(() => {
    let alive = true;
    const load = () =>
      supabase.rpc("public_stamp_stats").then(({ data }) => {
        const r = Array.isArray(data) ? data[0] : data;
        if (!r || !alive) return;
        setS({
          total: SIM_FLOOR.total + Number(r.total),
          this_month: SIM_FLOOR.this_month + Number(r.this_month),
          travellers: SIM_FLOOR.travellers + Number(r.travellers),
        });
      });
    // Os carimbos são gravados na conta logo a seguir; espera um instante antes de reler.
    const t = window.setTimeout(load, myCount ? 1500 : 0);
    const every = window.setInterval(load, 60_000);
    const onFocus = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onFocus);
    return () => { alive = false; clearTimeout(t); clearInterval(every); document.removeEventListener("visibilitychange", onFocus); };
  }, [myCount]);

  if (!s || s.total < 10) return null;

  return (
    <section aria-label="Carimbos dos viajantes" className="relative z-[2] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-10 gap-y-4 border-y border-gold/20 py-6 md:justify-between">
        <p className="font-serif text-4xl text-cream md:text-5xl">
          {s.total.toLocaleString("pt-PT")}
          <span className="ml-3 align-middle text-[11px] uppercase tracking-[0.3em] text-gold/80">
            carimbos no total
          </span>
        </p>
        {SHOW_SECONDARY_STATS && s.this_month > 0 && (
          <p className="font-serif text-2xl italic text-cream/85">{s.this_month} este mês</p>
        )}
        {SHOW_SECONDARY_STATS && (
          <p className="font-serif text-2xl italic text-cream/85">
            {s.travellers} viajantes com passaporte
          </p>
        )}
      </div>
    </section>
  );
}
