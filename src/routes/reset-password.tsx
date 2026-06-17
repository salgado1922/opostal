import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Repor palavra-passe — O Postal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [recovery, setRecovery] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Supabase puts type=recovery in the URL hash after the email link is clicked.
    if (typeof window !== "undefined" && window.location.hash.includes("type=recovery")) {
      setRecovery(true);
    }
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("A palavra-passe deve ter pelo menos 8 caracteres.");
      return;
    }
    if (password !== confirmPwd) {
      setError("As palavras-passe não coincidem.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true);
      setTimeout(() => navigate({ to: "/conta" }), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível repor a palavra-passe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-twilight-radial min-h-screen px-6 py-16">
      <div className="mx-auto max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-cream">
          <img src={opostalHorizontalTransparent.url} alt="O Postal" className="h-8 w-auto object-contain" />
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-2xl border border-gold/20 bg-background/40 p-8 backdrop-blur-sm"
        >
          <h1 className="font-serif text-3xl">Definir nova palavra-passe</h1>
          {!recovery ? (
            <p className="mt-3 text-sm text-cream/70">
              Esta página abre a partir do link de reposição enviado para o seu email. Se chegou aqui
              por engano, <Link to="/auth" className="text-gold underline-offset-4 hover:underline">volte ao login</Link>.
            </p>
          ) : done ? (
            <p className="mt-4 text-sm text-cream/80">Palavra-passe atualizada. A redirecionar…</p>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-cream/60">Nova palavra-passe</span>
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gold/20 bg-background/60 px-3 py-2 text-sm text-cream outline-none focus:border-gold/50"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-cream/60">Confirmar</span>
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gold/20 bg-background/60 px-3 py-2 text-sm text-cream outline-none focus:border-gold/50"
                />
              </label>
              {error && <p className="text-xs text-red-300">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-md bg-gold px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                Guardar
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}