import { useState } from "react";
import { lovable } from "@/integrations/lovable";

type Provider = "google" | "apple";

/**
 * Botões de entrada com as cores exigidas pelas marcas (Google e Apple).
 * Estas cores são imposição das próprias marcas e não passam pela tema do site.
 * Os dois têm a mesma altura, a mesma largura e o mesmo verbo.
 */
const BASE =
  "inline-flex min-h-[48px] w-full items-center justify-center rounded-[2px] px-[12px] text-[15px] font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0a12] disabled:opacity-60";

function useSocial(provider: Provider, onError: (m: string) => void) {
  const [busy, setBusy] = useState(false);

  const signIn = async () => {
    setBusy(true);
    onError("");
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: `${window.location.origin}/auth`,
    });
    if (result.error) {
      onError(
        provider === "google"
          ? "Não foi possível entrar com a Google. Tenta outra vez."
          : "Não foi possível entrar com a Apple. Tenta outra vez.",
      );
      setBusy(false);
      return;
    }
    if (result.redirected) return; // o navegador trata do resto
    // sem redirecionamento, a sessão já fica definida pelo helper
  };

  return { busy, signIn };
}

export function GoogleButton({
  onError,
  disabled,
}: {
  onError: (m: string) => void;
  disabled?: boolean;
}) {
  const { busy, signIn } = useSocial("google", onError);

  return (
    <button
      type="button"
      onClick={signIn}
      disabled={busy || disabled}
      className={`${BASE} border border-[#8E918F] bg-[#131314] text-[#E3E3E3] hover:bg-[#1f1f21]`}
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={18}
        height={18}
        className="shrink-0"
      >
        <path
          fill="#4285F4"
          d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
        />
      </svg>
      <span className="ml-[10px] mr-[-2px]">Continuar com Google</span>
    </button>
  );
}

export function AppleButton({
  onError,
  disabled,
}: {
  onError: (m: string) => void;
  disabled?: boolean;
}) {
  const { busy, signIn } = useSocial("apple", onError);

  return (
    <button
      type="button"
      onClick={signIn}
      disabled={busy || disabled}
      className={`${BASE} border border-[#FFFFFF] bg-[#FFFFFF] text-[#000000] hover:bg-[#E8E8E8]`}
    >
      <span className="mr-[-2px]">Continuar com Apple</span>
    </button>
  );
}
