import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { ChevronDown, Save } from "lucide-react";
import { toast } from "sonner";
import {
  adminSavePassport,
  listUserPassports,
  type AdminPassportRow,
} from "@/lib/passports.functions";
import { STAMP_STOPS } from "@/data/stamp-stops";
import type { Passport } from "@/lib/passport";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/passaportes")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Passaportes dos utilizadores | O Postal" },
    ],
  }),
  component: PassportsAdminPage,
});

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v)) as T;

const stampCount = (p: Passport) =>
  Object.values(p).reduce((n, c) => n + Object.keys(c.stamps ?? {}).length, 0);

function PassportsAdminPage() {
  const fetchPassports = useServerFn(listUserPassports);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-passports"],
    queryFn: async () => (await fetchPassports()) as AdminPassportRow[],
  });

  const forbidden = error instanceof Error && /forbidden/i.test(error.message);

  return (
    <main className="bg-twilight-radial min-h-screen px-6 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-gold/80">Área privada</p>
            <h1 className="font-serif text-3xl text-cream md:text-4xl">Passaportes</h1>
            <p className="mt-2 text-sm text-cream/65">
              {data
                ? `${data.length} ${data.length === 1 ? "passaporte" : "passaportes"}`
                : "A carregar…"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-3 py-2 text-xs text-cream transition-colors hover:bg-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              Pedidos
            </Link>
          </div>
        </div>

        {isLoading && <p className="mt-12 text-cream/60">A carregar passaportes…</p>}

        {forbidden && (
          <div className="glass mt-10 rounded-2xl border border-red-400/30 px-6 py-8">
            <p className="text-cream">Esta conta não tem permissões de administrador.</p>
          </div>
        )}

        {error && !forbidden && (
          <p className="mt-10 text-red-400">Erro ao carregar os passaportes. Tenta atualizar.</p>
        )}

        {data && data.length === 0 && (
          <div className="glass mt-10 rounded-2xl border border-gold/20 px-6 py-10 text-center">
            <p className="font-serif text-xl text-cream">Ainda ninguém tem passaporte.</p>
            <p className="mt-2 text-sm text-cream/60">
              Quando alguém carimbar a primeira paragem, aparece aqui.
            </p>
          </div>
        )}

        <ul className="mt-8 space-y-4">
          {data?.map((row) => {
            const open = expanded === row.user_id;
            const total = stampCount(row.data as Passport);
            return (
              <li key={row.user_id} className="glass overflow-hidden rounded-2xl border border-gold/20">
                <button
                  type="button"
                  onClick={() => setExpanded(open ? null : row.user_id)}
                  aria-expanded={open}
                  className="flex w-full flex-wrap items-center gap-x-6 gap-y-1 px-5 py-4 text-left transition-colors hover:bg-gold/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold/50"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-cream">
                      {row.display_name?.trim() || row.email || "Sem nome"}
                    </span>
                    {row.email && row.display_name?.trim() && (
                      <span className="block truncate text-sm text-cream/60">{row.email}</span>
                    )}
                  </span>
                  <span className="text-sm text-cream/70">
                    {total} {total === 1 ? "carimbo" : "carimbos"}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-cream/50">
                    {format(new Date(row.updated_at), "d MMM yyyy, HH:mm", { locale: pt })}
                  </span>
                  <ChevronDown
                    className={cn("h-4 w-4 text-gold/70 transition-transform", open && "rotate-180")}
                  />
                </button>
                {open && <PassportEditor row={row} />}
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-center">
          <Link to="/" className="text-xs text-cream/50 underline-offset-4 hover:text-cream/80 hover:underline">
            ← Voltar à homepage
          </Link>
        </p>
      </div>
    </main>
  );
}

function PassportEditor({ row }: { row: AdminPassportRow }) {
  const save = useServerFn(adminSavePassport);
  const qc = useQueryClient();
  const [p, setP] = useState<Passport>(() => clone((row.data as Passport) ?? {}));
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = (fn: (d: Passport) => void) => {
    setP((prev) => {
      const d = clone(prev);
      fn(d);
      return d;
    });
    setDirty(true);
  };

  const addStamp = (slug: string, title: string) =>
    update((d) => {
      const list = STAMP_STOPS[slug];
      const c = (d[slug] ??= { name: slug, total: list.length, stamps: {} });
      c.stamps[title] = { at: new Date().toISOString(), verified: true };
      c.removed = (c.removed ?? []).filter((t) => t !== title);
    });

  const removeStamp = (slug: string, title: string) =>
    update((d) => {
      const c = d[slug];
      if (!c?.stamps[title]) return;
      delete c.stamps[title];
      c.removed = Array.from(new Set([...(c.removed ?? []), title]));
    });

  const toggleVerified = (slug: string, title: string) =>
    update((d) => {
      const s = d[slug]?.stamps[title];
      if (!s || s.photo) return; // com fotografia fica sempre confirmado
      s.verified = !s.verified;
    });

  const removePhoto = (slug: string, title: string) =>
    update((d) => {
      const s = d[slug]?.stamps[title];
      if (s) delete s.photo;
    });

  const onSave = async () => {
    setSaving(true);
    try {
      await save({ data: { userId: row.user_id, data: p as unknown as Record<string, unknown> } });
      toast.success("Passaporte guardado.");
      setDirty(false);
      await qc.invalidateQueries({ queryKey: ["admin-passports"] });
    } catch {
      toast.error("Não consegui guardar. Tenta outra vez.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border-t border-gold/15 px-5 py-5">
      <div className="space-y-6">
        {Object.entries(STAMP_STOPS).map(([slug, stops]) => {
          const city = p[slug];
          const done = stops.filter((s) => city?.stamps[s.title]).length;
          return (
            <section key={slug}>
              <h3 className="flex items-baseline gap-3 font-serif text-lg text-cream">
                {city?.name ?? slug}
                <span className="text-xs uppercase tracking-wider text-cream/50">
                  {done}/{stops.length}
                </span>
              </h3>
              <ul className="mt-2 divide-y divide-cream/10">
                {stops.map((stop) => {
                  const s = city?.stamps[stop.title];
                  return (
                    <li key={stop.title} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2">
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-cream/85">{stop.label}</span>
                        <span className="block text-[11px] uppercase tracking-wider text-cream/45">
                          {!s
                            ? "Sem carimbo"
                            : s.photo
                              ? "Com fotografia · confirmado"
                              : s.verified
                                ? "Confirmado no local"
                                : "Por confirmar"}
                        </span>
                      </span>
                      {!s ? (
                        <button
                          type="button"
                          onClick={() => addStamp(slug, stop.title)}
                          className="rounded-md border border-gold/40 px-2.5 py-1 text-xs text-gold transition-colors hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold/50"
                        >
                          Carimbar
                        </button>
                      ) : (
                        <span className="flex flex-wrap items-center gap-2">
                          {!s.photo && (
                            <button
                              type="button"
                              onClick={() => toggleVerified(slug, stop.title)}
                              className="rounded-md border border-cream/25 px-2.5 py-1 text-xs text-cream/75 transition-colors hover:bg-cream/5 focus:outline-none focus:ring-2 focus:ring-gold/50"
                            >
                              {s.verified ? "Marcar por confirmar" : "Confirmar no local"}
                            </button>
                          )}
                          {s.photo && (
                            <button
                              type="button"
                              onClick={() => removePhoto(slug, stop.title)}
                              className="rounded-md border border-cream/25 px-2.5 py-1 text-xs text-cream/75 transition-colors hover:bg-cream/5 focus:outline-none focus:ring-2 focus:ring-gold/50"
                            >
                              Tirar fotografia
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeStamp(slug, stop.title)}
                            className="rounded-md border border-red-400/40 px-2.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-400/10 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                          >
                            Tirar carimbo
                          </button>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={!dirty || saving}
          className="inline-flex items-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-4 py-2 text-sm text-cream transition-colors hover:bg-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Save className="h-4 w-4" />
          {saving ? "A guardar…" : dirty ? "Guardar alterações" : "Sem alterações"}
        </button>
        {dirty && <p className="text-xs text-gold/80">Tens alterações por guardar.</p>}
      </div>
    </div>
  );
}
