import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { ChevronDown, LogOut, Mail, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { listItineraryRequests, type ItineraryRequest } from "@/lib/requests.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Pedidos de roteiro | O Postal" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const DETAIL_FIELDS: { key: keyof ItineraryRequest; label: string }[] = [
  { key: "destino", label: "Destino" },
  { key: "datas", label: "Datas da viagem" },
  { key: "dias", label: "Número de dias" },
  { key: "pessoas", label: "Número de pessoas" },
  { key: "orcamento", label: "Orçamento aproximado" },
  { key: "ritmo", label: "Ritmo de viagem" },
  { key: "interesses", label: "Interesses" },
  { key: "restricoes", label: "Restrições alimentares" },
  { key: "alojamento", label: "Tipo de alojamento" },
  { key: "partida", label: "Ponto de partida" },
  { key: "observacoes", label: "Observações" },
];

function AdminPage() {
  const fetchRequests = useServerFn(listItineraryRequests);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["itinerary-requests"],
    queryFn: async () => (await fetchRequests()) as ItineraryRequest[],
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  const forbidden = error instanceof Error && /forbidden/i.test(error.message);

  return (
    <main className="bg-twilight-radial min-h-screen px-6 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-gold/80">Área privada</p>
            <h1 className="font-serif text-3xl text-cream md:text-4xl">Pedidos de roteiro</h1>
            <p className="mt-2 text-sm text-cream/65">
              {data ? `${data.length} ${data.length === 1 ? "pedido" : "pedidos"}` : "A carregar…"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 rounded-md border border-gold/30 px-3 py-2 text-xs text-cream/80 transition-colors hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin")} />
              Atualizar
            </button>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-md border border-cream/20 px-3 py-2 text-xs text-cream/60 transition-colors hover:bg-cream/5 focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          </div>
        </div>

        {isLoading && <p className="mt-12 text-cream/60">A carregar pedidos…</p>}

        {forbidden && (
          <div className="glass mt-10 rounded-2xl border border-red-400/30 px-6 py-8">
            <p className="text-cream">Esta conta não tem permissões de administrador.</p>
            <p className="mt-2 text-sm text-cream/60">
              Entra com a conta de gestão d'O Postal para veres os pedidos.
            </p>
          </div>
        )}

        {error && !forbidden && (
          <p className="mt-10 text-red-400">Erro ao carregar os pedidos. Tenta atualizar.</p>
        )}

        {data && data.length === 0 && (
          <div className="glass mt-10 rounded-2xl border border-gold/20 px-6 py-10 text-center">
            <p className="font-serif text-xl text-cream">Ainda não há pedidos.</p>
            <p className="mt-2 text-sm text-cream/60">
              Quando alguém pedir um roteiro personalizado, aparece aqui.
            </p>
          </div>
        )}

        <ul className="mt-8 space-y-4">
          {data?.map((r) => {
            const open = expanded === r.id;
            return (
              <li key={r.id} className="glass overflow-hidden rounded-2xl border border-gold/20">
                <button
                  type="button"
                  onClick={() => setExpanded(open ? null : r.id)}
                  aria-expanded={open}
                  className="flex w-full flex-wrap items-center gap-x-6 gap-y-1 px-5 py-4 text-left transition-colors hover:bg-gold/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold/50"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-cream">
                      {r.nome?.trim() || "Sem nome"}
                    </span>
                    <span className="block truncate text-sm text-cream/60">{r.email}</span>
                  </span>
                  <span className="hidden text-sm text-cream/70 sm:block">{r.destino || "—"}</span>
                  <span className="text-xs uppercase tracking-wider text-cream/50">
                    {format(new Date(r.created_at), "d MMM yyyy, HH:mm", { locale: pt })}
                  </span>
                  <ChevronDown
                    className={cn("h-4 w-4 text-gold/70 transition-transform", open && "rotate-180")}
                  />
                </button>
                {open && (
                  <div className="border-t border-gold/15 px-5 py-5">
                    <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {DETAIL_FIELDS.map(({ key, label }) => {
                        const value = (r[key] as string | null)?.trim();
                        if (!value) return null;
                        return (
                          <div key={key}>
                            <dt className="text-[10px] uppercase tracking-[0.2em] text-cream/50">{label}</dt>
                            <dd className="mt-1 whitespace-pre-wrap text-sm text-cream/85">{value}</dd>
                          </div>
                        );
                      })}
                    </dl>
                    <a
                      href={`mailto:${r.email}?subject=${encodeURIComponent(
                        `O teu roteiro personalizado${r.destino ? ` — ${r.destino}` : ""}`,
                      )}`}
                      className="mt-6 inline-flex items-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-4 py-2 text-sm text-cream transition-colors hover:bg-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    >
                      <Mail className="h-4 w-4" />
                      Responder por email
                    </a>
                  </div>
                )}
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
