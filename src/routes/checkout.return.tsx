import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { confirmCheckoutSession } from "@/lib/entitlements.functions";
import { getStripeEnvironment } from "@/lib/stripe";

type Search = { session_id?: string; slug?: string };

export const Route = createFileRoute("/checkout/return")({
  head: () => ({
    meta: [
      { title: "A confirmar pagamento — O Postal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): Search => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
    slug: typeof search.slug === "string" ? search.slug : undefined,
  }),
  component: ReturnPage,
});

function ReturnPage() {
  const { session_id, slug } = Route.useSearch();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const confirm = useServerFn(confirmCheckoutSession);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!session_id) {
      setState("error");
      setMessage("Sessão de pagamento em falta.");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const result = await confirm({
          data: { sessionId: session_id, environment: getStripeEnvironment() },
        });
        if (cancelled) return;
        if (result.ok) {
          await qc.invalidateQueries({ queryKey: ["my-access"] });
          setState("ok");
        } else {
          setState("error");
          setMessage("Não foi possível confirmar o pagamento.");
        }
      } catch {
        if (!cancelled) {
          setState("error");
          setMessage("Algo correu mal a confirmar o pagamento.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session_id, confirm, qc]);

  return (
    <main className="bg-twilight-radial flex min-h-screen items-center justify-center px-6 py-16">
      <div className="max-w-md text-center">
        {state === "loading" && (
          <>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-gold" />
            <p className="mt-4 text-sm text-cream/70">A confirmar o seu acesso...</p>
          </>
        )}
        {state === "ok" && (
          <>
            <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
            <h1 className="mt-4 font-serif text-3xl">Acesso desbloqueado</h1>
            <p className="mt-2 text-sm text-cream/70">Obrigado pela sua compra.</p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => navigate({ to: slug ? (`/${slug}` as never) : "/" })}
                className="inline-flex items-center justify-center rounded-md bg-gold px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
              >
                Ler o guia
              </button>
              <Link to="/conta" className="text-xs text-cream/65 underline-offset-4 hover:underline">
                Ver a minha conta
              </Link>
            </div>
          </>
        )}
        {state === "error" && (
          <>
            <AlertCircle className="mx-auto h-8 w-8 text-red-300" />
            <h1 className="mt-4 font-serif text-2xl">Pagamento não confirmado</h1>
            <p className="mt-2 text-sm text-cream/70">{message}</p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center justify-center rounded-md border border-gold/30 px-5 py-2 text-sm text-cream hover:bg-gold/10"
            >
              Voltar à página inicial
            </Link>
          </>
        )}
      </div>
    </main>
  );
}