import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Stats = { total: number; this_month: number; travellers: number };

// Piso de prova social enquanto o tráfego é pequeno.
// Quando os números reais ultrapassarem o piso, passam a ser mostrados os reais.
// Para tirar a simulação: apagar SIM_FLOOR e usar só os números reais.
const SIM_FLOOR: Stats = { total: 347, this_month: 26, travellers: 61 };

/** Prova social: carimbos feitos por viajantes (sem contar a conta de admin). */
export function StampCounter() {
  const [s, setS] = useState<Stats | null>(null);

  useEffect(() => {
    supabase.rpc("public_stamp_stats").then(({ data }) => {
      const r = Array.isArray(data) ? data[0] : data;
      if (!r) return;
      setS({
        total: Math.max(Number(r.total), SIM_FLOOR.total),
        this_month: Math.max(Number(r.this_month), SIM_FLOOR.this_month),
        travellers: Math.max(Number(r.travellers), SIM_FLOOR.travellers),
      });
    });
  }, []);

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
        {s.this_month > 0 && (
          <p className="font-serif text-2xl italic text-cream/85">{s.this_month} este mês</p>
        )}
        <p className="font-serif text-2xl italic text-cream/85">
          {s.travellers} viajantes com passaporte
        </p>
      </div>
    </section>
  );
}
