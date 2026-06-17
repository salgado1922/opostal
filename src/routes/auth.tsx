import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";

type Search = { redirect?: string };

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — O Postal" },
      { name: "description", content: "Inicie sessão para aceder aos seus guias premium da O Postal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): Search => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [forgotMode, setForgotMode] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        if (redirect) window.location.href = redirect;
        else navigate({ to: "/" });
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        if (redirect) window.location.href = redirect;
        else navigate({ to: "/" });
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, redirect]);

  const onGoogle = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + window.location.pathname + window.location.search,
    });
    if (result.error) setError("Não foi possível iniciar sessão com Google.");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (forgotMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/reset-password",
        });
        if (error) throw error;
        setInfo("Se existir uma conta com este email, enviámos um link de reposição.");
      } else if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + (redirect ?? "/") },
        });
        if (error) throw error;
        setInfo("Conta criada. Verifique o seu email para confirmar.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo correu mal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-twilight-radial min-h-screen px-6 py-16">
      <div className="mx-auto max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-cream">
          <img
            src={opostalHorizontalTransparent.url}
            alt="O Postal"
            className="h-8 w-auto object-contain"
          />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-2xl border border-gold/20 bg-background/40 p-8 backdrop-blur-sm"
        >
          <h1 className="font-serif text-3xl">
            {forgotMode ? "Repor palavra-passe" : mode === "signin" ? "Iniciar sessão" : "Criar conta"}
          </h1>
          <p className="mt-2 text-sm text-cream/70">
            {forgotMode
              ? "Indique o seu email e enviamos um link para definir uma nova palavra-passe."
              : mode === "signin"
              ? "Aceda aos seus guias premium."
              : "Crie a sua conta para guardar os guias premium."}
          </p>

          {!forgotMode && (
          <>
          <button
            type="button"
            onClick={onGoogle}
            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-md border border-gold/30 bg-background/60 px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-gold/10"
          >
            <GoogleG /> Continuar com Google
          </button>

          <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-cream/40">
            <span className="h-px flex-1 bg-cream/15" />
            <span>ou com email</span>
            <span className="h-px flex-1 bg-cream/15" />
          </div>
          </>
          )}

          <form onSubmit={onSubmit} className="space-y-3">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-cream/60">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-gold/20 bg-background/60 px-3 py-2 text-sm text-cream outline-none focus:border-gold/50"
              />
            </label>
            {!forgotMode && (
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-cream/60">Palavra-passe</span>
              <input
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-gold/20 bg-background/60 px-3 py-2 text-sm text-cream outline-none focus:border-gold/50"
              />
            </label>
            )}

            {error && <p className="text-xs text-red-300">{error}</p>}
            {info && <p className="text-xs text-cream/80">{info}</p>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-gold px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {forgotMode ? "Enviar link" : mode === "signin" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <div className="mt-6 flex flex-col items-start gap-2">
            {!forgotMode && (
              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-xs text-cream/65 underline-offset-4 hover:text-cream hover:underline"
              >
                {mode === "signin"
                  ? "Ainda não tem conta? Criar conta."
                  : "Já tem conta? Iniciar sessão."}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setForgotMode(!forgotMode);
                setError(null);
                setInfo(null);
              }}
              className="text-xs text-cream/65 underline-offset-4 hover:text-cream hover:underline"
            >
              {forgotMode ? "Voltar ao início de sessão" : "Esqueceu-se da palavra-passe?"}
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function GoogleG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.96h5.51c-.24 1.46-1.74 4.28-5.51 4.28-3.31 0-6.02-2.74-6.02-6.12s2.71-6.12 6.02-6.12c1.89 0 3.16.81 3.88 1.5l2.65-2.55C16.8 3.7 14.6 2.8 12 2.8 6.94 2.8 2.83 6.92 2.83 12s4.11 9.2 9.17 9.2c5.29 0 8.79-3.72 8.79-8.95 0-.6-.07-1.06-.16-1.55H12z"
      />
    </svg>
  );
}