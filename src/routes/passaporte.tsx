import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Share2 } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { PassportBook, StampPreview, type Open } from "@/components/passport/PassportBook";
import { InkStamp } from "@/components/passport/InkStamp";
import { STAMP_STYLE, inkFor, stampDate } from "@/components/passport/stamps";
import { stampStopFor } from "@/data/stamp-stops";
import { supabase } from "@/integrations/supabase/client";
import { BadgeSeal } from "@/components/passport/BadgeSeal";

const GLYPH: Record<string, string> = { primeiro: "✉", completa: "✪", tres: "✈", madrugador: "☀", verificado: "⚑", album: "❀" };
import { CITIES } from "@/data/cities";
import {
  PASSPORT_EVENT,
  PASSPORT_AUTH_EVENT,
  goSignIn,
  passportUser,
  startPassportSync,
  badgesFor,
  isComplete,
  readPassport,
  rewardFor,
  type Passport,
} from "@/lib/passport";

const TITLE = "O meu passaporte - O Postal";
const DESC =
  "Os carimbos das paragens que visitaste com os guias d'O Postal, com data, hora, fotografia e distinções.";

export const Route = createFileRoute("/passaporte")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://opostal.pt/passaporte" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/passaporte" }],
  }),
  component: PassaportePage,
});

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/** Desenha o passaporte numa imagem 1080×1350 para Instagram/TikTok. */
async function drawShareImage(p: Passport): Promise<Blob | null> {
  const W = 1080;
  const H = 1350;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  if (!g) return null;
  await document.fonts?.ready;
  const ink = "#14110d";
  const gold = "#c9a45c";
  const cream = "#efe6d4";
  g.fillStyle = ink;
  g.fillRect(0, 0, W, H);
  g.strokeStyle = gold;
  g.lineWidth = 2;
  g.strokeRect(48, 48, W - 96, H - 96);
  g.fillStyle = gold;
  g.font = "500 26px Inter, sans-serif";
  g.textAlign = "center";
  g.fillText("O POSTAL · PASSAPORTE", W / 2, 140);
  const cities = CITIES.filter((ct) => p[ct.slug] && Object.keys(p[ct.slug].stamps).length);
  const total = cities.reduce((n, ct) => n + Object.keys(p[ct.slug].stamps).length, 0);
  g.fillStyle = cream;
  g.font = "italic 600 96px 'Cormorant Garamond', Georgia, serif";
  g.fillText(`${total} carimbos`, W / 2, 270);
  g.font = "italic 40px 'Cormorant Garamond', Georgia, serif";
  g.fillStyle = gold;
  g.fillText(`${cities.length} ${cities.length === 1 ? "cidade" : "cidades"}`, W / 2, 330);

  const cols = 3;
  const r = 118;
  cities.slice(0, 9).forEach((ct, i) => {
    const cx = 210 + (i % cols) * 330;
    const cy = 540 + Math.floor(i / cols) * 300;
    const cp = p[ct.slug];
    const n = Object.keys(cp.stamps).length;
    const frac = cp.total ? Math.min(1, n / cp.total) : 0;
    g.save();
    g.translate(cx, cy);
    g.rotate(((i * 37) % 13 - 6) * (Math.PI / 180));
    g.strokeStyle = "rgba(201,164,92,0.25)";
    g.lineWidth = 6;
    g.beginPath();
    g.arc(0, 0, r, 0, Math.PI * 2);
    g.stroke();
    g.strokeStyle = gold;
    g.beginPath();
    g.arc(0, 0, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * frac);
    g.stroke();
    g.setLineDash([4, 8]);
    g.lineWidth = 2;
    g.beginPath();
    g.arc(0, 0, r - 18, 0, Math.PI * 2);
    g.stroke();
    g.setLineDash([]);
    g.fillStyle = cream;
    g.font = "italic 600 44px 'Cormorant Garamond', Georgia, serif";
    g.fillText(ct.name, 0, 8);
    g.fillStyle = gold;
    g.font = "500 20px Inter, sans-serif";
    g.fillText(`${n} / ${cp.total}`, 0, 48);
    g.restore();
  });
  g.fillStyle = "rgba(239,230,212,0.6)";
  g.font = "500 24px Inter, sans-serif";
  g.fillText("opostal.pt", W / 2, H - 100);
  return new Promise((res) => c.toBlob(res, "image/png"));
}

function PassaportePage() {
  const [p, setP] = useState<Passport>({});
  const [msg, setMsg] = useState("");
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [account, setAccount] = useState<{ email: string; name?: string; avatar?: string } | null>(null);
  const [openStamp, setOpenStamp] = useState<Open | null>(null);
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      const u = data.user;
      setSignedIn(!!u);
      setAccount(
        u
          ? {
              email: u.email ?? "",
              name: (u.user_metadata?.full_name ?? u.user_metadata?.name) as string | undefined,
              avatar: (u.user_metadata?.avatar_url ?? u.user_metadata?.picture) as string | undefined,
            }
          : null,
      );
    };
    void load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => void load());
    return () => sub.subscription.unsubscribe();
  }, []);
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  useEffect(() => {
    const auth = () => setSignedIn(!!passportUser());
    window.addEventListener(PASSPORT_AUTH_EVENT, auth);
    startPassportSync();
    if (passportUser()) auth();
    return () => window.removeEventListener(PASSPORT_AUTH_EVENT, auth);
  }, []);
  useEffect(() => {
    const sync = () => setP(readPassport());
    sync();
    window.addEventListener(PASSPORT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PASSPORT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const all = useMemo(() => Object.values(p).flatMap((c) => Object.values(c.stamps)), [p]);
  const verified = all.filter((s) => s.verified).length;
  const badges = badgesFor(p);
  const cities = CITIES.filter((c) => c.status === "ready");

  const share = async () => {
    setMsg("");
    const blob = await drawShareImage(p);
    if (!blob) return;
    const file = new File([blob], "passaporte-opostal.png", { type: "image/png" });
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "O meu passaporte O Postal", text: "opostal.pt" });
        return;
      }
    } catch {
      return;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = file.name;
    a.click();
    setMsg("Imagem guardada.");
  };

  return (
    <main className="min-h-screen bg-background text-cream">
      <header className="mx-auto max-w-4xl px-5 pb-10 pt-16 md:px-6 md:pt-24">
        <Link to="/" className="text-[11px] uppercase tracking-[0.3em] text-gold/80 hover:text-gold">
          O Postal
        </Link>
        <h1 className="mt-6 font-serif leading-[0.95]" style={{ fontSize: "clamp(3rem, 12vw, 6.5rem)" }}>
          Passaporte
        </h1>
        <p className="mt-4 max-w-xl font-serif text-xl italic text-cream/75">
          Cada paragem que visitas no modo de rua fica aqui carimbada, com a data, a hora e, se quiseres, uma fotografia.
        </p>
        <div className="mt-8 h-px w-24 bg-gold/60" />
        {account && (
          <div className="mt-8 flex items-center gap-4 border-y border-gold/15 py-4">
            {account.avatar ? (
              <img src={account.avatar} alt="" referrerPolicy="no-referrer" className="h-12 w-12 shrink-0 rounded-full border border-gold/50 object-cover" />
            ) : (
              <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 font-serif text-xl text-gold">
                {(account.name ?? account.email).charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Titular</p>
              <p className="truncate font-serif text-xl">{account.name ?? account.email}</p>
              {account.name && <p className="truncate text-xs text-cream/60">{account.email}</p>}
            </div>
            <button type="button" onClick={signOut} className="min-h-[44px] shrink-0 text-sm text-cream/60 underline decoration-gold/40 underline-offset-4 hover:text-cream">
              Sair
            </button>
          </div>
        )}
        {signedIn === false && (
          <div className="mt-8 border-l-2 border-gold/60 pl-4">
            <p className="text-cream/85">
              O passaporte guarda-se na tua conta, para não se perder quando mudas de telemóvel. Entra para começar a carimbar.
            </p>
            <button
              type="button"
              onClick={goSignIn}
              className="mt-3 inline-flex min-h-[48px] items-center border border-gold/50 px-5 font-serif text-lg italic text-gold hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            >
              Entrar na conta
            </button>
          </div>
        )}
        {signedIn && (<>
        <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-gold/15 py-6 text-center">
          {[
            [all.length, "carimbos"],
            [verified, "confirmados no local"],
            [Object.values(p).filter((c) => Object.keys(c.stamps).length).length, "cidades"],
          ].map(([n, l]) => (
            <div key={l as string}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-serif text-4xl text-gold md:text-5xl">{n}</dd>
              <dd className="mt-1 text-[11px] uppercase tracking-[0.2em] text-cream/60">{l}</dd>
            </div>
          ))}
        </dl>
        {all.length > 0 && (
          <div className="mt-6">
            <button
              type="button"
              onClick={share}
              className="inline-flex min-h-[48px] items-center gap-2 border border-gold/50 px-5 font-serif text-lg italic text-gold hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            >
              <Share2 className="h-4 w-4" aria-hidden />
              Partilhar o passaporte
            </button>
            {msg && <p className="mt-2 text-sm text-gold/90" role="status">{msg}</p>}
          </div>
        )}
        </>)}
      </header>
      {signedIn && (<>
      <StampPreview open={openStamp} onClose={() => setOpenStamp(null)} />

      <section aria-labelledby="livro" className="mx-auto max-w-4xl px-5 pb-14 md:px-6">
        <h2 id="livro" className="mb-6 text-[11px] uppercase tracking-[0.3em] text-gold/80">Folheia o teu passaporte</h2>
        <PassportBook p={p} />
      </section>

      <section aria-labelledby="distincoes" className="mx-auto max-w-4xl px-5 pb-12 md:px-6">
        <h2 id="distincoes" className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Distinções</h2>
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
          {badges.map((b) => (
            <li key={b.id} className="flex flex-col items-center text-center">
              <BadgeSeal title={b.title} glyph={GLYPH[b.id] ?? "✦"} earned={b.earned} />
              <p className={`mt-3 font-serif text-xl ${b.earned ? "text-gold" : "text-cream/55"}`}>{b.title}</p>
              <p className="mt-1 max-w-[16ch] text-sm text-cream/60">{b.body}</p>
              <span className="sr-only">{b.earned ? "Ganha" : "Por ganhar"}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cidades" className="mx-auto max-w-4xl px-5 pb-16 md:px-6">
        <h2 id="cidades" className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Cidades</h2>
        {all.length === 0 && (
          <p className="mt-4 max-w-xl text-cream/75">
            Ainda sem carimbos. Abre um guia, desce até passares a capa e toca em <em className="text-gold">Modo de rua</em>.
            Quando chegares a uma paragem, carimba-a.
          </p>
        )}
        <ol className="mt-4">
          {cities.map((ct) => {
            const cp = p[ct.slug];
            const entries = cp ? Object.entries(cp.stamps).sort((a, b) => a[1].at.localeCompare(b[1].at)) : [];
            const reward = cp ? rewardFor(ct.slug, cp) : null;
            return (
              <li key={ct.slug} className="border-t border-gold/15 py-6">
                <div className="flex items-baseline justify-between gap-4">
                  <Link
                    to={ct.to ?? "/"}
                    className="font-serif text-3xl text-cream underline decoration-gold/0 underline-offset-4 hover:decoration-gold/60 md:text-4xl"
                  >
                    {ct.name}
                  </Link>
                  <span className="text-sm text-cream/60">
                    {cp && isComplete(cp) ? <span className="text-gold">completa</span> : cp ? `${entries.length} / ${cp.total}` : "por começar"}
                  </span>
                </div>
                {reward && (
                  <p className="mt-3 text-sm text-cream/80">
                    Código <span className="font-serif text-lg text-gold">{reward}</span> · 10% no{" "}
                    <Link to="/roteiro-personalizado" className="text-gold underline decoration-gold/40 underline-offset-4">
                      roteiro personalizado
                    </Link>
                  </p>
                )}
                {entries.length > 0 && (
                  <ul className="mt-4 space-y-3">
                    {entries.map(([title, s]) => {
                      const st = stampStopFor(ct.slug, title) ?? { title, label: title, motif: "star" };
                      const style = STAMP_STYLE[ct.slug] ?? { shape: "circle" as const, motif: "✦", code: "" };
                      return (
                      <li key={title}>
                        <button
                          type="button"
                          onClick={() => setOpenStamp({ slug: ct.slug, stop: st, stamp: s })}
                          aria-label={`Ver carimbo ${st.label}${s.photo ? " e fotografia" : ""}`}
                          className="flex w-full items-center gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                        >
                        <span className="shrink-0 p-1" style={{ backgroundColor: "var(--passport-paper)" }}>
                          <InkStamp
                            top={st.label.length > 16 ? `${st.label.slice(0, 15).trim()}…` : st.label}
                            bottom={s.verified ? "CONFIRMADO" : ct.name}
                            center={stampDate(s.at).split(" ").slice(0, 2).join(" ")}
                            icon={st.motif}
                            ink={inkFor(ct.slug)}
                            shape={style.shape}
                            size={76}
                            rotate={-6}
                          />
                        </span>
                        {s.photo && (
                          <img src={s.photo} alt={`Fotografia em ${title}`} className="h-14 w-14 shrink-0 rotate-2 border-2 border-cream object-cover" />
                        )}
                        <div className="min-w-0">
                          <p className="font-serif text-lg leading-snug">{st.label}</p>
                          <p className="text-xs text-cream/60">
                            {fmt(s.at)} · {s.verified ? <span className="text-gold">confirmado no local</span> : "sem confirmação"}
                          </p>
                        </div>
                        </button>
                      </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-8 border-t border-gold/15 pt-6 text-sm text-cream/55">
          Os carimbos ficam guardados na tua conta. Completa uma cidade com a maioria das paragens
          confirmadas no local e recebes um código de desconto para o roteiro personalizado.
        </p>
      </section>
      </>)}
      <SiteFooter />
    </main>
  );
}
