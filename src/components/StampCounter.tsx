import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Stats = { total: number; this_month: number; travellers: number };

/** Prova social: carimbos feitos por viajantes (sem contar a conta de admin). */
export function StampCounter() {
  const [s, setS] = useState<Stats | null>(null);
  useEffect(() => {
    supabase.rpc("public_stamp_stats").then(({ data }) => {
      const r = Array.isArray(data) ? data[0] : data;
      if (r) setS({ total: Number(r.total), this_month: Number(r.this_month), travellers: Number(r.travellers) });
    });
  }, []);
  if (!s || s.total < 10) return null;
  return (
    <section aria-label="Carimbos dos viajantes" className="relative z-[2] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-10 gap-y-4 border-y border-gold/20 py-6">
        <p className="font-serif text-4xl text-cream md:text-5xl">{s.total.toLocaleString("pt-PT")}<span className="ml-3 align-middle text-[11px] uppercase tracking-[0.3em] text-gold/80">carimbos no total</span></p>
        {s.this_month > 0 && <p className="font-serif text-2xl italic text-cream/85">{s.this_month} este mês</p>}
        <p className="font-serif text-2xl italic text-cream/85">{s.travellers} viajantes com passaporte</p>
      </div>
    </section>
  );
}
