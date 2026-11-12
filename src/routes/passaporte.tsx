import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Share2 } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { PassportBook, StampPreview, type Open } from "@/components/passport/PassportBook";
import { InkStamp } from "@/components/passport/InkStamp";
import { STAMP_STYLE, inkFor, stampDate } from "@/components/passport/stamps";
import { STAMP_STOPS, stampStopFor } from "@/data/stamp-stops";
import { supabase } from "@/integrations/supabase/client";
import { TripShare } from "@/components/passport/TripShare";
import { BadgeSeal } from "@/components/passport/BadgeSeal";

const GLYPH: Record<string, string> = { primeiro: "✉", completa: "✪", tres: "✈", madrugador: "☀", verificado: "⚑", album: "❀" };
import { CITIES } from "@/data/cities";
import {
  PASSPORT_EVENT,
  PASSPORT_AUTH_EVENT,
  goSignIn,
  passportUser,
  passportIsAdmin,
  setStampVerified,
  addStamp,
  removeStamp,
  resetAdminTestStates,
  confirmAllStamps,
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

function PassaportePage() {
  const [p, setP] = useState<Passport>({});
  const [msg, setMsg] = useState("");
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [account, setAccount] = useState<{ email: string; name?: string; avatar?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openStamp, setOpenStamp] = useState<Open | null>(null);
  const [sharing, setSharing] = useState(false);
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
    const auth = () => { setSignedIn(!!passportUser()); setIsAdmin(passportIsAdmin()); };
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
              onClick={() => setSharing(true)}
              className="inline-flex min-h-[48px] items-center gap-2 border border-gold/50 px-5 font-serif text-lg italic text-gold hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            >
              <Share2 className="h-4 w-4" aria-hidden />
              Partilhar a viagem
            </button>
            {msg && <p className="mt-2 text-sm text-gold/90" role="status">{msg}</p>}
          </div>
        )}
        {isAdmin && (
          <div className="mt-8 border-l-2 border-gold/60 pl-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Controlos de admin</p>
            <p className="mt-2 text-sm text-cream/70">Em cada carimbo da lista de cidades podes trocar entre confirmado no local e por confirmar.</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              <button type="button" onClick={() => { resetAdminTestStates(); setMsg("Estados de teste repostos."); }} className="min-h-[44px] text-sm text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
                Repor estados de teste
              </button>
              <button type="button" onClick={() => { confirmAllStamps(); setMsg("Todos os carimbos confirmados."); }} className="min-h-[44px] text-sm text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
                Confirmar todos no local
              </button>
            </div>
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
        <p className="mt-3 max-w-xl text-sm text-cream/55">
          Aqui estão todos os carimbos à espera de tinta. Os contornos tracejados são as paragens que ainda não carimbaste.
        </p>
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
            const cityStyle = STAMP_STYLE[ct.slug] ?? { shape: "circle" as const, motif: "✦", code: "" };
            const missing = (STAMP_STOPS[ct.slug] ?? []).filter((s) => !entries.some(([t]) => t === s.title));
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
                      return (
                      <li key={title}>
                        <button
                          type="button"
                          onClick={() => setOpenStamp({ slug: ct.slug, stop: st, stamp: s })}
                          aria-label={`Ver carimbo ${st.label}${s.photo ? " e fotografia" : ""}`}
                          className="flex w-full items-center gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                        >
                        <span className="shrink-0 transition">
                          <InkStamp
                            top={st.label.length > 16 ? `${st.label.slice(0, 15).trim()}…` : st.label}
                            bottom={ct.name}
                            center={stampDate(s.at).split(" ").slice(0, 2).join(" ")}
                            icon={st.motif}
                            ink={inkFor(ct.slug)}
                            shape={cityStyle.shape}
                            size={76}
                            rotate={-6}
                            tier={s.verified ? "verified" : "plain"}
                            photo={s.photo}
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="font-serif text-lg leading-snug">{st.label}</p>
                          <p className="text-xs text-cream/60">
                            {fmt(s.at)}
                          </p>
                        </div>
                        </button>
                        {isAdmin && (
                          <div className="ml-[92px] mt-1 flex flex-wrap gap-x-4">
                          <button
                            type="button"
                            onClick={() => setStampVerified(ct.slug, title, !s.verified)}
                            aria-pressed={s.verified}
                            className="min-h-[36px] text-xs text-cream/60 underline decoration-gold/40 underline-offset-4 hover:text-gold"
                          >
                            {s.verified ? "Confirmado no local · marcar por confirmar" : "Por confirmar · marcar confirmado"}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeStamp(ct.slug, title)}
                            className="min-h-[36px] text-xs text-cream/60 underline decoration-gold/40 underline-offset-4 hover:text-gold"
                          >
                            Tirar carimbo
                          </button>
                          </div>
                        )}
                      </li>
                      );
                    })}
                  </ul>
                )}
                {missing.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-cream/45">
                      Por carimbar · {missing.length} {missing.length === 1 ? "paragem" : "paragens"}
                    </p>
                    <ul className="mt-3 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4">
                      {missing.map((st) => (
                        <li key={st.title} className="flex flex-col items-center text-center">
                          <InkStamp
                            ghost
                            top={st.label}
                            bottom={ct.name}
                            center=""
                            icon={st.motif}
                            ink="var(--cream)"
                            shape={cityStyle.shape}
                            size={96}
                            rotate={-4}
                          />
                          <p className="mt-1 max-w-[16ch] text-xs leading-snug text-cream/55">{st.label}</p>
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => { addStamp(ct.slug, st.title); setMsg(`«${st.label}» carimbado.`); }}
                              className="mt-1 min-h-[36px] text-xs text-cream/60 underline decoration-gold/40 underline-offset-4 hover:text-gold"
                            >
                              Carimbar
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
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
      {sharing && <TripShare p={p} onClose={() => setSharing(false)} />}
      <SiteFooter />
    </main>
  );
}
