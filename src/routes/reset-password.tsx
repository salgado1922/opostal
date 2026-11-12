import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { traduzErro } from "@/lib/auth-errors";

// Guardado o mais cedo possível: o cliente da sessão pode limpar o endereço
// antes de a página ser desenhada.
const HASH_INICIAL = typeof window === "undefined" ? "" : window.location.hash;
const QUERY_INICIAL = typeof window === "undefined" ? "" : window.location.search;

function eRecuperação() {
  try {
    const h = new URLSearchParams(HASH_INICIAL.replace(/^#/, ""));
    const q = new URLSearchParams(QUERY_INICIAL.replace(/^\?/, ""));
    return h.get("type") === "recovery" || q.get("type") === "recovery";
  } catch {
    return false;
  }
}

const FIELD =
  "w-full rounded-[2px] border-0 border-b border-gold/30 bg-transparent px-1 py-3 text-cream placeholder:text-cream/35 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40";
const LABEL = "text-[11px] uppercase tracking-[0.22em] text-gold/80";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Criar password nova | O Postal" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [recuperacao, setRecuperacao] = useState(() => eRecuperação());
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [email, setEmail] = useState("");
  const [aTentar, setATentar] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [feito, setFeito] = useState(false);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    if (recuperacao) return;
    let cancelado = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelado && data.session && eRecuperação()) setRecuperacao(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && eRecuperação())) {
        setRecuperacao(true);
      }
    });
    return () => {
      cancelado = true;
      sub.subscription.unsubscribe();
    };
  }, [recuperacao]);

  const criar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    if (password.length < 6) {
      setErro("A password tem de ter pelo menos 6 letras.");
      return;
    }
    if (password !== confirmar) {
      setErro("As duas passwords não são iguais.");
      return;
    }
    setATentar(true);
    const { error } = await supabase.auth.updateUser({ password });
    setATentar(false);
    if (error) {
      setErro(traduzErro(error.message));
      return;
    }
    setFeito(true);
  };

  const pedirOutro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setEnviado(false);
    const mail = email.trim();
    if (!mail) {
      setErro("Escreve o teu email.");
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
    setEnviado(true);
  };

  return (
    <main className="bg-twilight-radial min-h-screen px-6 py-14 md:py-24">
      <div className="mx-auto w-full max-w-md">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold/80">O Postal</p>
        <h1 className="mt-5 font-serif text-4xl leading-[1] text-cream md:text-5xl">
          {feito ? "Tudo pronto" : recuperacao ? "Password nova" : "Recuperar acesso"}
        </h1>
        <div className="mt-8 h-px w-16 bg-gold/50" />

        {feito ? (
          <>
            <p className="mt-6 max-w-sm font-serif text-lg italic text-cream/70">
              A tua password nova está a valer. Já podes entrar e carimbar.
            </p>
            <Link
              to="/passaporte"
              className="mt-8 inline-flex min-h-[48px] items-center border border-gold/50 px-5 font-serif text-lg italic text-gold transition-colors hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            >
              Ir para o passaporte
            </Link>
          </>
        ) : recuperacao ? (
          <>
            <p className="mt-6 max-w-sm font-serif text-lg italic text-cream/70">
              Escolhe uma password nova para a tua conta.
            </p>
            <form onSubmit={criar} className="mt-8 space-y-6">
              <div>
                <label htmlFor="f-new" className={LABEL}>
                  Password nova
                </label>
                <input
                  id="f-new"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  maxLength={72}
                  className={`${FIELD} mt-2`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="pelo menos 6 letras"
                />
              </div>
              <div>
                <label htmlFor="f-confirm" className={LABEL}>
                  Repete a password
                </label>
                <input
                  id="f-confirm"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  maxLength={72}
                  className={`${FIELD} mt-2`}
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={aTentar}
                className="inline-flex min-h-[48px] w-full items-center justify-center border border-gold/50 px-5 font-serif text-lg italic text-gold transition-colors hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 disabled:opacity-60"
              >
                {aTentar ? "A guardar…" : "Guardar password"}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="mt-6 max-w-sm font-serif text-lg italic text-cream/70">
              Esse link para criar password nova já não é válido, ou já o usaste. Escreve o teu
              email e mando-te outro.
            </p>
            <form onSubmit={pedirOutro} className="mt-8 space-y-6">
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
              <button
                type="submit"
                disabled={aTentar}
                className="inline-flex min-h-[48px] w-full items-center justify-center border border-gold/50 px-5 font-serif text-lg italic text-gold transition-colors hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 disabled:opacity-60"
              >
                {aTentar ? "A enviar…" : "Mandar novo link"}
              </button>
            </form>
            {enviado && (
              <p className="mt-6 border-l-2 border-gold/60 pl-4 text-sm text-cream/85" role="status">
                Se esse email tiver conta, receberás uma carta com o link.
              </p>
            )}
          </>
        )}

        {erro && (
          <p className="mt-6 text-sm text-terracotta" role="alert">
            {erro}
          </p>
        )}

        <p className="mt-12">
          <Link to="/auth" className="text-xs text-cream/45 underline-offset-4 hover:text-cream/80 hover:underline">
            ← Voltar a entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
