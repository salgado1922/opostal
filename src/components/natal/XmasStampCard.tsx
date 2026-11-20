import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { usePassport } from "@/hooks/use-passport";
import {
  PASSPORT_AUTH_EVENT,
  getPosition,
  goSignIn,
  passportIsAdmin,
  passportUser,
  removeXmasStamp,
  stampXmas,
} from "@/lib/passport";
import { XMAS_SEASON, XMAS_SPOTS, checkXmasSpot, dayLabel, xmasStatus, xmasWindow, type XmasSlug, type XmasStatus } from "@/data/natal-stamps";
import { XmasStamp } from "./XmasStamp";

const fmtDay = (iso: string) => {
  const d = new Date(iso);
  return `${d.getDate()} de ${d.toLocaleDateString("pt-PT", { month: "long" })}`;
};
const joinPt = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} e ${xs.at(-1)}`);

/** Secção da página da cidade: o carimbo de Natal e o botão para o ganhar no mercado. */
export function XmasStampCard({ slug, city }: { slug: XmasSlug; city: string }) {
  const p = usePassport();
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [admin, setAdmin] = useState(false);
  const [status, setStatus] = useState<XmasStatus | null>(null);
  const [checking, setChecking] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    setStatus(xmasStatus(slug, new Date()));
    const auth = () => { setSignedIn(!!passportUser()); setAdmin(passportIsAdmin()); };
    window.addEventListener(PASSPORT_AUTH_EVENT, auth);
    auth();
    return () => window.removeEventListener(PASSPORT_AUTH_EVENT, auth);
  }, [slug]);

  const stamp = p[slug]?.natal?.[XMAS_SEASON];
  const win = xmasWindow(slug);
  const spots = XMAS_SPOTS[slug].map((m) => m.name);

  const carimbar = async () => {
    setMsg(null);
    if (!passportUser()) { goSignIn(); return; }
    setChecking(true);
    try {
      const pos = await getPosition(0);
      const r = checkXmasSpot(slug, [pos.coords.latitude, pos.coords.longitude], pos.coords.accuracy, new Date());
      if (!r) setMsg("Hoje não há nenhum mercado aberto nesta cidade.");
      else if (r.ok) {
        stampXmas(slug, XMAS_SEASON, r.spot.name);
        setMsg(`Carimbado no mercado de ${r.spot.name}. Feliz Natal!`);
      } else {
        const far = r.d > 2000 ? `${(r.d / 1000).toFixed(1).replace(".", ",")} km` : `${Math.round(r.d)} m`;
        setMsg(`Ainda estás a ${far} do mercado mais perto (${r.spot.name}). Entra no mercado e tenta outra vez.`);
      }
    } catch {
      setMsg("Não consegui saber onde estás. Autoriza a localização no telemóvel e tenta outra vez.");
    } finally {
      setChecking(false);
    }
  };

  const btn = "inline-flex min-h-[48px] items-center gap-2 border border-gold bg-transparent px-6 font-serif text-lg italic text-gold hover:bg-gold/10 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70";
  const small = "min-h-[44px] text-sm text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold";

  return (
    <section aria-labelledby="carimbo-natal" className="relative border-t border-gold/20 px-5 py-14 md:px-6 md:py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
        <div
          className="mx-auto w-[230px] -rotate-2 px-6 pb-5 pt-7 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9)] md:w-[270px]"
          style={{ backgroundColor: "var(--passport-paper)", color: "var(--ink)" }}
        >
          <p className="flex justify-between text-[9px] uppercase tracking-[0.3em] opacity-60">
            <span>Vistos · Natal</span><span>{XMAS_SEASON}</span>
          </p>
          <div className="mt-1 h-px opacity-25" style={{ background: "var(--ink)" }} />
          <XmasStamp slug={slug} city={city} at={stamp?.at} rotate={stamp ? -8 : 0} className="mt-4 w-full" />
          <p className="mt-3 text-center font-serif text-sm italic opacity-75">
            {stamp ? `${stamp.market} · ${fmtDay(stamp.at)}` : "Por carimbar"}
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Carimbo de Natal · {XMAS_SEASON}</p>
          <h2 id="carimbo-natal" className="mt-3 font-serif text-4xl leading-tight text-cream md:text-5xl">
            {stamp ? <>Já tens o Natal de {city} <em className="text-gold">no passaporte</em>.</> : <>Carimba o Natal <em className="text-gold">em {city}</em></>}
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/80">
            {stamp
              ? "Fica numa página especial do teu passaporte, ao lado dos carimbos de Viena, Praga e Budapeste."
              : `Este carimbo só se ganha dentro de um mercado, entre ${dayLabel(win.open)} e ${dayLabel(win.close)}. Abre esta página lá, toca no botão e o telemóvel confirma que estás no mercado.`}
          </p>
          {!stamp && <p className="mt-3 text-sm text-muted-foreground">Vale em {joinPt(spots)}, enquanto cada um estiver aberto.</p>}

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            {stamp ? (
              <Link to="/passaporte" className={btn}>Ver no passaporte →</Link>
            ) : status === "antes" ? (
              <p className="font-serif text-xl italic text-gold">Os carimbos abrem a {dayLabel(win.open)}.</p>
            ) : status === "fechado" ? (
              <p className="font-serif text-xl italic text-gold">A época de {XMAS_SEASON} já fechou. Até ao próximo Natal!</p>
            ) : signedIn === false ? (
              <button type="button" onClick={goSignIn} className={btn}>Entrar para carimbar</button>
            ) : (
              <button type="button" onClick={carimbar} disabled={checking || status === null} className={btn}>
                <MapPin className="h-4 w-4" aria-hidden />
                {checking ? "A confirmar onde estás…" : "Carimbar no mercado"}
              </button>
            )}
            {admin && !stamp && (
              <button type="button" onClick={() => { stampXmas(slug, XMAS_SEASON, XMAS_SPOTS[slug][0]!.name, "admin"); setMsg("Carimbo de admin colocado."); }} className={small}>
                Admin: carimbar sem GPS
              </button>
            )}
            {admin && stamp && (
              <button type="button" onClick={() => { removeXmasStamp(slug, XMAS_SEASON); setMsg("Carimbo de Natal retirado."); }} className={small}>
                Admin: tirar carimbo
              </button>
            )}
          </div>
          {msg && <p role="status" className="mt-4 max-w-xl border-l-2 border-gold/60 pl-3 text-cream/90">{msg}</p>}
        </div>
      </div>
    </section>
  );
}
