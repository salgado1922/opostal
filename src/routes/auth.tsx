import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { traduzErro } from "@/lib/auth-errors";
import { AppleButton, GoogleButton } from "@/components/auth/ProviderButtons";

/** Para onde levar a pessoa depois de entrar. */
function nextPath() {
  try {
    const n = window.sessionStorage.getItem("opostal:next");
    return n && n.startsWith("/") && !n.startsWith("//") ? n : "/passaporte";
  } catch {
    return "/passaporte";
  }
}

function goNext() {
  const n = nextPath();
  try {
    window.sessionStorage.removeItem("opostal:next");
  } catch {
    /* ignora */
  }
  window.location.replace(n);
}

const FIELD =
  "w-full rounded-[2px] border-0 border-b border-gold/30 bg-transparent px-1 py-3 text-cream placeholder:text-cream/35 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40";
const LABEL = "text-[11px] uppercase tracking-[0.22em] text-gold/80";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar | O Postal" },
      {
        name: "description",
        content: "Entra no O Postal para guardar o teu passaporte de carimbos em qualquer telemóvel.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aTentar, setATentar] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  // Já está sessão? Vai direto ao destino.
  useEffect(() => {
    let cancelado = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelado && data.session) goNext();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") goNext();
    });
    return () => {
      cancelado = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setATentar(true);
    setErro(null);
    setAviso(null);
    const mail = email.trim();

    if (modo === "criar") {
      const { data, error } = await supabase.auth.signUp({
        email: mail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: nome.trim() ? { full_name: nome.trim() } : undefined,
        },
      });
      if (error) {
        setErro(traduzErro(error.message));
        setATentar(false);
        return;
      }
      if (data.session) {
        goNext();
        return;
      }
      setAviso(
        "Falta um passo: abre a carta que te mandámos e confirma o email. Depois disso o passaporte é teu.",
      );
      setATentar(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email: mail, password });
    if (error) {
      setErro(traduzErro(error.message));
      setATentar(false);
      return;
    }
    // a mudança de sessão trata do resto
  };

  const recuperar = async () => {
    const mail = email.trim();
    setErro(null);
    setAviso(null);
    if (!mail) {
      setErro("Escreve primeiro o teu email.");
      return;
    }
    setATentar(true);
    const { error } = await supabase.auth.resetPasswordForEmail(mail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setATentar(false);
    if (error) {
      setErro(traduzErro(error.message));
      return;
    }
    setAviso(
      "Se esse email tiver conta, receberás uma carta com o link para criares uma password nova.",
    );
  };

  return (
    <main className="bg-twilight-radial min-h-screen px-6 py-14 md:py-24">
      <div className="mx-auto w-full max-w-md">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold/80">O Postal</p>
        <h1 className="mt-5 font-serif text-5xl leading-[0.95] text-cream md:text-6xl">
          {modo === "criar" ? "Criar conta" : "Entrar"}
        </h1>
        <p className="mt-4 max-w-sm font-serif text-lg italic text-cream/70">
          O teu passaporte de carimbos fica guardado na tua conta e segue-te para qualquer
          telemóvel.
        </p>
        <div className="mt-8 h-px w-16 bg-gold/50" />

        <div className="mt-8 space-y-3">
          <GoogleButton onError={setErro} disabled={aTentar} />
          <AppleButton onError={setErro} disabled={aTentar} />
        </div>

        <div className="mt-8 flex items-center gap-4">
          <span aria-hidden className="h-px flex-1 bg-gold/20" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-cream/45">
            ou com email
          </span>
          <span aria-hidden className="h-px flex-1 bg-gold/20" />
        </div>

        <div className="mt-7 flex gap-7 border-b border-gold/15">
          {(["entrar", "criar"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setModo(m);
                setErro(null);
                setAviso(null);
              }}
              aria-current={modo === m}
              className={`-mb-px min-h-[44px] border-b-2 pb-3 font-serif text-lg italic transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
                modo === m
                  ? "border-gold text-gold"
                  : "border-transparent text-cream/50 hover:text-cream/80"
              }`}
            >
              {m === "entrar" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        <form onSubmit={enviar} className="mt-6 space-y-6">
          {modo === "criar" && (
            <div>
              <label htmlFor="f-nome" className={LABEL}>
                Nome
              </label>
              <input
                id="f-nome"
                autoComplete="name"
                maxLength={60}
                className={`${FIELD} mt-2`}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Como te chamamos"
              />
            </div>
          )}

          <div>
            <label htmlFor="f-email" className={LABEL}>
              Email
            </label>
            <input
              id="f-email"
              type="email"
              required
              autoComplete="email"
              maxLength={255}
              className={`${FIELD} mt-2`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@exemplo.pt"
            />
          </div>

          <div>
            <label htmlFor="f-password" className={LABEL}>
              Password
            </label>
            <input
              id="f-password"
              type="password"
              required
              minLength={6}
              autoComplete={modo === "criar" ? "new-password" : "current-password"}
              maxLength={72}
              className={`${FIELD} mt-2`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="pelo menos 6 letras"
            />
          </div>

          <button
            type="submit"
            disabled={aTentar}
            className="inline-flex min-h-[48px] w-full items-center justify-center border border-gold/50 px-5 font-serif text-lg italic text-gold transition-colors hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 disabled:opacity-60"
          >
            {aTentar ? "A tentar…" : modo === "criar" ? "Criar conta" : "Entrar"}
          </button>

          {modo === "entrar" && (
            <button
              type="button"
              onClick={recuperar}
              disabled={aTentar}
              className="min-h-[44px] text-sm text-cream/55 underline decoration-gold/30 underline-offset-4 transition-colors hover:text-cream disabled:opacity-60"
            >
              Esqueceste-te da password?
            </button>
          )}
        </form>

        {aviso && (
          <p className="mt-6 border-l-2 border-gold/60 pl-4 text-sm text-cream/85" role="status">
            {aviso}
          </p>
        )}
        {erro && (
          <p className="mt-6 text-sm text-terracotta" role="alert">
            {erro}
          </p>
        )}

        <p className="mt-12 flex items-center justify-between gap-4 text-xs text-cream/45">
          <Link to="/" className="underline-offset-4 hover:text-cream/80 hover:underline">
            ← Voltar à homepage
          </Link>
          <Link to="/admin" className="underline-offset-4 hover:text-cream/80 hover:underline">
            Área reservada
          </Link>
        </p>
      </div>
    </main>
  );
}
