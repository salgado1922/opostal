import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Eye, FilePlus2, PenLine, Trash2 } from "lucide-react";
import {
  deleteGuide,
  listGuidesAdmin,
  setGuideStatus,
} from "@/lib/guides.functions";
import type { GuideRow } from "@/lib/guides-schema";

export const Route = createFileRoute("/_authenticated/guias/")({
  head: () => ({
    meta: [
      { title: "Guias | O Postal" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: GuidesAdmin,
});

function GuidesAdmin() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchGuides = useServerFn(listGuidesAdmin);
  const toggleStatus = useServerFn(setGuideStatus);
  const removeGuide = useServerFn(deleteGuide);

  const { data, isLoading, error } = useQuery({
    queryKey: ["guides-admin"],
    queryFn: async () => (await fetchGuides()) as GuideRow[],
  });

  const statusMutation = useMutation({
    mutationFn: (v: { id: string; status: "draft" | "published" }) => toggleStatus({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["guides-admin"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => removeGuide({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["guides-admin"] }),
  });

  const forbidden = error instanceof Error && /forbidden/i.test(error.message);

  return (
    <main className="bg-twilight-radial min-h-screen px-5 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-gold/80">Área privada</p>
            <h1 className="font-serif text-3xl text-cream md:text-4xl">Guias</h1>
            <p className="mt-2 text-sm text-cream/65">
              Escreve, guarda como rascunho e publica sem tocar no código.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate({ to: "/guias/$id", params: { id: "novo" } })}
            className="inline-flex items-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-4 py-2 text-sm text-cream transition-colors hover:bg-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/50"
          >
            <FilePlus2 className="h-4 w-4" />
            Novo guia
          </button>
        </div>

        {isLoading && <p className="mt-12 text-cream/60">A carregar…</p>}

        {forbidden && (
          <p className="glass mt-10 rounded-2xl border border-red-400/30 px-6 py-8 text-cream">
            Esta conta não tem permissões de administrador.
          </p>
        )}

        {error && !forbidden && (
          <p className="mt-10 text-red-400">Erro ao carregar os guias.</p>
        )}

        {data && data.length === 0 && (
          <div className="glass mt-10 rounded-2xl border border-gold/20 px-6 py-10 text-center">
            <p className="font-serif text-xl text-cream">Ainda não há guias escritos aqui.</p>
            <p className="mt-2 text-sm text-cream/60">Começa com “Novo guia”.</p>
          </div>
        )}

        <ul className="mt-8 space-y-3">
          {data?.map((g) => (
            <li
              key={g.id}
              className="glass flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-gold/20 px-5 py-4"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-cream">
                  {g.title || g.city || g.slug}
                </span>
                <span className="block truncate text-xs text-cream/50">
                  /guia/{g.slug} · {format(new Date(g.updated_at), "d MMM yyyy, HH:mm", { locale: pt })}
                </span>
              </span>
              <span
                className={
                  g.status === "published"
                    ? "rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold"
                    : "rounded-full border border-cream/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cream/55"
                }
              >
                {g.status === "published" ? "Publicado" : "Rascunho"}
              </span>
              <span className="flex items-center gap-2">
                {g.status === "published" && (
                  <a
                    href={`/guia/${g.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver no site"
                    className="rounded-md border border-gold/25 p-2 text-cream/70 transition-colors hover:bg-gold/10"
                  >
                    <Eye className="h-4 w-4" />
                  </a>
                )}
                <Link
                  to="/guias/$id"
                  params={{ id: g.id }}
                  aria-label="Editar"
                  className="rounded-md border border-gold/25 p-2 text-cream/70 transition-colors hover:bg-gold/10"
                >
                  <PenLine className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    statusMutation.mutate({
                      id: g.id,
                      status: g.status === "published" ? "draft" : "published",
                    })
                  }
                  className="rounded-md border border-gold/25 px-3 py-2 text-xs text-cream/80 transition-colors hover:bg-gold/10"
                >
                  {g.status === "published" ? "Despublicar" : "Publicar"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Apagar “${g.title || g.slug}”? Não dá para desfazer.`)) {
                      deleteMutation.mutate(g.id);
                    }
                  }}
                  aria-label="Apagar"
                  className="rounded-md border border-cream/15 p-2 text-cream/45 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center">
          <Link
            to="/admin"
            className="text-xs text-cream/50 underline-offset-4 hover:text-cream/80 hover:underline"
          >
            ← Pedidos de roteiro
          </Link>
        </p>
      </div>
    </main>
  );
}
