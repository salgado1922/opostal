import { createFileRoute, Link } from "@tanstack/react-router";

function nextPath() {
  try {
    const n = window.sessionStorage.getItem("opostal:next");
    return n && n.startsWith("/") && !n.startsWith("//") ? n : "/admin";
  } catch {
    return "/admin";
  }
}
function goNext() {
  const n = nextPath();
  try { window.sessionStorage.removeItem("opostal:next"); } catch { /* ignora */ }
  window.location.replace(n);
}
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Entrar | O Postal" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled && data.session) {
        goNext();
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") goNext();
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    setLoading(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/auth`,
    });
    if (result.error) {
      setError("Não foi possível iniciar sessão. Tenta novamente.");
      setLoading(false);
    }
  };

  return (
    <main className="bg-twilight-radial flex min-h-screen items-center justify-center px-6">
      <div className="glass w-full max-w-sm rounded-2xl border border-gold/20 px-8 py-10 text-center">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">O Postal</p>
        <h1 className="font-serif text-3xl text-cream">Entrar</h1>
        <p className="mt-3 text-sm text-cream/70">
          Entra para guardar o teu passaporte de carimbos em qualquer telemóvel.
        </p>
        <button
          type="button"
          onClick={signIn}
          disabled={loading}
          className="mt-8 w-full rounded-md border border-gold/40 bg-gold/10 px-4 py-3 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-60"
        >
          {loading ? "A ligar…" : "Entrar com Google"}
        </button>
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        <p className="mt-8">
          <Link to="/" className="text-xs text-cream/50 underline-offset-4 hover:text-cream/80 hover:underline">
            ← Voltar à homepage
          </Link>
        </p>
      </div>
    </main>
  );
}
