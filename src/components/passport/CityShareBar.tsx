import { useEffect, useState } from "react";
import { Check, Copy, Facebook, MessageCircle, Send, Share2, Twitter } from "lucide-react";

type Props = {
  /** Nome da cidade, ex.: "Praga". */
  name: string;
  /** Número de carimbos da cidade. */
  count: number;
  /** URL absoluta da página, ex.: "https://opostal.pt/carimbos/praga". */
  url: string;
};

const SHARE_TEXT = (name: string, count: number) =>
  `Os carimbos de ${name}: ${count} paragens para carimbar no local. Passaporte d'O Postal.`;

async function copyText(text: string) {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* segue para o plano B */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function CityShareBar({ name, count, url }: Props) {
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  // Detetado só no browser, para não partir a hidratação.
  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (!copied && !copyFailed) return;
    const t = setTimeout(() => {
      setCopied(false);
      setCopyFailed(false);
    }, 2600);
    return () => clearTimeout(t);
  }, [copied, copyFailed]);

  const text = SHARE_TEXT(name, count);
  const e = encodeURIComponent;

  const targets = [
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: <MessageCircle className="h-4 w-4" aria-hidden="true" />,
      href: `https://wa.me/?text=${e(`${text} ${url}`)}`,
    },
    {
      key: "x",
      label: "X",
      icon: <Twitter className="h-4 w-4" aria-hidden="true" />,
      href: `https://twitter.com/intent/tweet?text=${e(text)}&url=${e(url)}`,
    },
    {
      key: "facebook",
      label: "Facebook",
      icon: <Facebook className="h-4 w-4" aria-hidden="true" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`,
    },
    {
      key: "telegram",
      label: "Telegram",
      icon: <Send className="h-4 w-4" aria-hidden="true" />,
      href: `https://t.me/share/url?url=${e(url)}&text=${e(text)}`,
    },
  ];

  async function shareNative() {
    try {
      await navigator.share({ title: `Os carimbos de ${name}`, text, url });
    } catch {
      /* a pessoa fechou a janela do telemóvel */
    }
  }

  async function copyLink() {
    const ok = await copyText(url);
    if (ok) setCopied(true);
    else setCopyFailed(true);
  }

  const item =
    "inline-flex min-h-[44px] items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <section className="mx-auto max-w-4xl border-t border-cream/10 px-5 py-10">
      <h2 className="font-serif text-2xl italic text-gold/85 sm:text-3xl">
        Partilhar os carimbos de {name}
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/60">
        Manda a página a quem vai contigo, ou guarda o link para a viagem.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        {canShare && (
          <button type="button" onClick={shareNative} className={item}>
            <Share2 className="h-4 w-4" aria-hidden="true" />
            Partilhar
          </button>
        )}
        {targets.map((t) => (
          <a
            key={t.key}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Partilhar os carimbos de ${name} no ${t.label}`}
            className={item}
          >
            {t.icon}
            {t.label}
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          aria-label={`Copiar o link da página dos carimbos de ${name}`}
          className={item}
        >
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? "Link copiado" : copyFailed ? "Não conseguiu copiar" : "Copiar link"}
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {copied ? "Link copiado." : copyFailed ? "Não foi possível copiar o link." : ""}
      </p>
    </section>
  );
}
