import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { CITIES } from "@/data/cities";
import { useMyAccess, useSignOut } from "@/hooks/use-auth";
import { redeemCreditForGuide } from "@/lib/entitlements.functions";
import { Loader2, Check, Lock } from "lucide-react";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";

export const Route = createFileRoute("/conta")({
  head: () => ({
    meta: [
      { title: "A minha conta — O Postal" },
      { name: "description", content: "Os seus guias premium e créditos." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ContaPage,
});

function ContaPage() {
  const navigate = useNavigate();
  const { data, isLoading, sessionLoaded } = useMyAccess();
  const signOut = useSignOut();
  const qc = useQueryClient();
  const redeem = useServerFn(redeemCreditForGuide);
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionLoaded && data && !data.signedIn) {
      navigate({ to: "/auth", search: { redirect: "/conta" } });
    }
  }, [data, sessionLoaded, navigate]);

  if (!data || !data.signedIn) {
    return (
      <main className="bg-twilight-radial flex min-h-screen items-center justify-center px-6 text-cream/70">
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
      </main>
    );
  }

  const unlocked = CITIES.filter((c) => c.status === "ready" && data.slugs.includes(c.slug));
  const lockedReady = CITIES.filter((c) => c.status === "ready" && !data.slugs.includes(c.slug));

  const onUseCredit = async (slug: string) => {
    setPending(slug);
    setError(null);
    try {
      const r = await redeem({ data: { slug } });
      if (!r.success) setError("Não foi possível usar o crédito.");
      else await qc.invalidateQueries({ queryKey: ["my-access"] });
    } catch {
      setError("Algo correu mal.");
    } finally {
      setPending(null);
    }
  };

  return (
    <main className="bg-twilight-radial min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-cream">
          <img src={opostalHorizontalTransparent.url} alt="O Postal" className="h-8 w-auto object-contain" />
        </Link>

        <header className="mt-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">A minha conta</p>
            <h1 className="mt-2 font-serif text-3xl md:text-4xl">
              Olá{data.displayName ? `, ${data.displayName.split(" ")[0]}` : ""}
            </h1>
            <p className="mt-1 text-sm text-cream/70">{data.email}</p>
          </div>
          <button
            type="button"
            onClick={() => signOut().then(() => navigate({ to: "/" }))}
            className="text-xs text-cream/60 underline-offset-4 hover:text-cream hover:underline"
          >
            Terminar sessão
          </button>
        </header>

        <section className="mt-10 rounded-2xl border border-gold/20 bg-background/40 p-6 backdrop-blur-sm">
          <h2 className="font-serif text-xl">Créditos por usar</h2>
          <p className="mt-1 text-sm text-cream/70">
            {data.credits > 0
              ? `Tem ${data.credits} ${data.credits === 1 ? "crédito" : "créditos"} para desbloquear outros guias.`
              : "Sem créditos. Os pacotes de 2 ou 3 guias dão créditos para outros guias à sua escolha."}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl">Guias desbloqueados</h2>
          {unlocked.length === 0 ? (
            <p className="mt-2 text-sm text-cream/65">Ainda não tem nenhum guia desbloqueado.</p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {unlocked.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={c.to ?? "/"}
                    className="flex items-center justify-between rounded-lg border border-gold/20 bg-background/30 px-4 py-3 transition-colors hover:bg-gold/5"
                  >
                    <span className="font-serif text-lg">{c.name}</span>
                    <Check className="h-4 w-4 text-gold" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl">Outros guias disponíveis</h2>
          {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {lockedReady.map((c) => (
              <li
                key={c.slug}
                className="flex items-center justify-between rounded-lg border border-gold/15 bg-background/20 px-4 py-3"
              >
                <div>
                  <div className="font-serif text-lg">{c.name}</div>
                  <div className="text-xs text-cream/55">{c.country}</div>
                </div>
                {data.credits > 0 ? (
                  <button
                    type="button"
                    onClick={() => onUseCredit(c.slug)}
                    disabled={pending === c.slug}
                    className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-3 py-1.5 text-xs text-gold transition-colors hover:bg-gold/10 disabled:opacity-60"
                  >
                    {pending === c.slug ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      "Usar 1 crédito"
                    )}
                  </button>
                ) : (
                  <Link
                    to={c.to ?? "/"}
                    className="inline-flex items-center gap-2 rounded-md border border-gold/20 px-3 py-1.5 text-xs text-cream/70 transition-colors hover:bg-gold/5"
                  >
                    <Lock className="h-3 w-3" aria-hidden /> Ver guia
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}