import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { BOOKING_BAIRROS } from "@/data/booking-bairros";
import { useIsAdmin } from "@/hooks/use-is-admin";

export const Route = createFileRoute("/_authenticated/afiliados")({
  head: () => ({
    meta: [
      { title: "Links de afiliado | O Postal" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AfiliadosPage,
});

const CITY_NAMES: Record<string, string> = {
  praga: "Praga", londres: "Londres", istambul: "Istambul", florenca: "Florença",
  barcelona: "Barcelona", viena: "Viena", lisboa: "Lisboa", budapeste: "Budapeste",
};

const label = (city: string, id: string) =>
  id.replace(`${city}-`, "").split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

const isValid = (u: string) => !u.trim() || /^https:\/\/\S+$/i.test(u.trim());

function AfiliadosPage() {
  const admin = useIsAdmin();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("affiliate_links").select("id,url").then(({ data }) => {
      const m = Object.fromEntries((data ?? []).map((r) => [r.id, r.url]));
      setValues(m); setSaved(m);
    });
  }, []);

  const save = async (id: string) => {
    const url = (values[id] ?? "").trim();
    if (!isValid(url)) return toast.error("O link tem de começar por https://");
    setBusy(id);
    const { error } = url
      ? await supabase.from("affiliate_links").upsert({ id, url, updated_at: new Date().toISOString() })
      : await supabase.from("affiliate_links").delete().eq("id", id);
    setBusy(null);
    if (error) return toast.error("Não foi possível guardar.");
    setSaved((s) => ({ ...s, [id]: url }));
    toast.success(url ? "Link guardado" : "A usar o link original");
  };

  return (
    <main className="bg-twilight-radial min-h-screen px-6 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-gold/80">Área privada</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-serif text-3xl text-cream md:text-4xl">Links de afiliado</h1>
          <div className="flex gap-4 text-xs text-cream/70">
            <Link to="/admin" className="hover:text-gold">Pedidos</Link>
            <Link to="/passaportes" className="hover:text-gold">Passaportes</Link>
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-cream/65">
          Cola um link Booking diferente para cada bairro. Se deixares vazio, o botão "Ver alojamentos em…" usa o link original.
        </p>

        {!admin && <p className="mt-10 text-cream/60">Só a conta de admin pode editar estes links.</p>}

        {admin && Object.entries(BOOKING_BAIRROS).map(([city, bairros]) => (
          <section key={city} className="mt-12 border-t border-gold/20 pt-6">
            <h2 className="font-serif text-2xl text-cream">{CITY_NAMES[city] ?? city}</h2>
            <ul className="mt-4 space-y-6">
              {Object.entries(bairros).map(([id, b]) => {
                const v = values[id] ?? "";
                const dirty = v.trim() !== (saved[id] ?? "");
                const active = (saved[id] ?? "").trim();
                return (
                  <li key={id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <label htmlFor={id} className="text-[11px] uppercase tracking-[0.22em] text-gold/85">{label(city, id)}</label>
                      <span className="text-[11px] text-cream/50">{active ? "Link próprio" : "Link original"}</span>
                    </div>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                      <input
                        id={id}
                        type="url"
                        inputMode="url"
                        value={v}
                        placeholder={b.affiliateUrl || b.fallback}
                        onChange={(e) => setValues((s) => ({ ...s, [id]: e.target.value }))}
                        className="min-h-11 w-full border border-gold/30 bg-background/40 px-3 text-base text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none sm:text-sm"
                      />
                      <button
                        type="button"
                        disabled={!dirty || busy === id}
                        onClick={() => save(id)}
                        className="min-h-11 shrink-0 border border-gold/50 px-4 text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/10 disabled:opacity-40"
                      >
                        {busy === id ? "A guardar…" : "Guardar"}
                      </button>
                    </div>
                    {!isValid(v) && <p className="mt-1 text-xs text-destructive">Tem de começar por https://</p>}
                    <a href={active || b.affiliateUrl || b.fallback} target="_blank" rel="sponsored noopener" className="mt-1 inline-block text-[11px] text-cream/50 underline-offset-2 hover:text-gold hover:underline">Testar link</a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
