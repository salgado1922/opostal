import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Camera, Check, Footprints, MapPin, Share2, X } from "lucide-react";
import { STAMP_STOPS, stampStopFor } from "@/data/stamp-stops";
import {
  PASSPORT_EVENT,
  compressPhoto,
  coordsFor,
  distanceM,
  getPosition,
  isNear,
  migrateLegacy,
  passportUser,
  goSignIn,
  startPassportSync,
  readPassport,
  rewardFor,
  writePassport,
  type Passport,
} from "@/lib/passport";
import { PostmarkCircle } from "@/components/postal/PostmarkCircle";

/* ------------------------------------------------------------------ *
 * Modo de rua
 * Um ecrã, uma paragem de cada vez. Feito para se usar a pé, com o
 * telemóvel na mão, no meio da cidade: letra grande, botões de dedo,
 * swipe vertical e um carimbo para cada paragem visitada.
 * ------------------------------------------------------------------ */

export type StreetStop = {
  time: string;
  title: string;
  desc: string;
  tip?: string;
  link?: string;
  hours?: string;
  hoursNote?: string;
  walkTo?: string;
  optional?: boolean;
};

export type StreetDay = {
  key: string;
  label: string;
  date: string;
  title: string;
  vibe?: string;
  stops: StreetStop[];
};

type Props = {
  city: string;
  slug: string;
  days: StreetDay[];
};

type Stamped = Record<string, string[]>;

export function StreetMode({ city, slug, days }: Props) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);
  const [dayKey, setDayKey] = useState(days[0]?.key ?? "");
  const [idx, setIdx] = useState(0);
  const [passport, setPassport] = useState<Passport>({});
  const [checking, setChecking] = useState(false);
  const [notice, setNotice] = useState<{ text: string; offerFree?: boolean; signIn?: boolean } | null>(null);
  const photoRef = useRef<HTMLInputElement | null>(null);
  const totalStops = STAMP_STOPS[slug]?.length ?? 0;
  const cityStamps = passport[slug]?.stamps ?? {};
  const stamped: Stamped = useMemo(() => {
    const out: Stamped = {};
    for (const d of days) out[d.key] = d.stops.map((s) => s.title).filter((t) => cityStamps[t]);
    return out;
  }, [days, cityStamps]);
  const [card, setCard] = useState(false);
  const [copied, setCopied] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const actions = useRef<{ next: () => void; prev: () => void; close: () => void }>({
    next: () => {},
    prev: () => {},
    close: () => {},
  });

  const day = useMemo(
    () => days.find((d) => d.key === dayKey) ?? days[0],
    [days, dayKey],
  );
  const stops = day?.stops ?? [];
  const stop = stops[idx];
  const done = stamped[day?.key ?? ""] ?? [];
  const isStamped = !!stop && done.includes(stop.title);
  const totalStamped = useMemo(
    () => days.reduce((n, d) => n + (stamped[d.key]?.length ?? 0), 0),
    [days, stamped],
  );

  /* O botão só aparece depois de se passar a capa do guia. */
  useEffect(() => {
    const onScroll = () => setArmed(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    startPassportSync();
    migrateLegacy(slug, city, totalStops);
    const sync = () => setPassport(readPassport());
    sync();
    window.addEventListener(PASSPORT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PASSPORT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [slug, city, totalStops]);

  const saveStamps = (mut: (stamps: Passport[string]["stamps"]) => void) => {
    const p = readPassport();
    const c = p[slug] ?? { name: city, total: totalStops, stamps: {} };
    c.name = city;
    c.total = totalStops;
    mut(c.stamps);
    p[slug] = c;
    if (!writePassport(p)) setNotice({ text: "O telemóvel está sem espaço para guardar mais." });
    setPassport(p);
  };

  /* Bloqueia o scroll da página enquanto o modo de rua está aberto. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setCard(false);
    setCopied(false);
    triggerRef.current?.focus();
  }, []);

  const next = useCallback(() => {
    setCopied(false);
    setNotice(null);
    setIdx((i) => {
      if (i < stops.length - 1) return i + 1;
      setCard(true);
      return i;
    });
  }, [stops.length]);

  const prev = useCallback(() => {
    setCopied(false);
    setNotice(null);
    setCard(false);
    setIdx((i) => Math.max(0, i - 1));
  }, []);

  actions.current = { next, prev, close };

  /* Teclado: fechar, avançar, recuar, e Tab a circular dentro do ecrã. */
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        actions.current.close();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        actions.current.next();
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        actions.current.prev();
        return;
      }
      if (e.key === "Tab") {
        const el = dialogRef.current;
        if (!el) return;
        const nodes = Array.from(
          el.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((n) => n.offsetParent !== null);
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const pickDay = (key: string) => {
    setDayKey(key);
    setIdx(0);
    setCard(false);
    setCopied(false);
  };

  const stampNow = (verified: boolean) => {
    if (!stop || !day) return;
    saveStamps((st) => {
      st[stop.title] = { at: new Date().toISOString(), verified, day: day.key };
    });
  };

  const toggleStamp = async () => {
    if (!stop || !day || checking || !stampStopFor(slug, stop.title)) return;
    setNotice(null);
    if (!passportUser()) {
      setNotice({ text: "Para guardar carimbos no teu passaporte, entra com a tua conta Google.", signIn: true });
      return;
    }
    if (isStamped) {
      saveStamps((st) => {
        delete st[stop.title];
      });
      return;
    }
    const target = coordsFor(slug, stop.title);
    if (!target) {
      stampNow(false);
      return;
    }
    setChecking(true);
    try {
      const pos = await getPosition();
      const d = distanceM([pos.coords.latitude, pos.coords.longitude], target);
      if (isNear(d, pos.coords.accuracy)) {
        stampNow(true);
        setNotice({ text: "Confirmado no local. Carimbo verdadeiro." });
      } else {
        const far = d > 2000 ? `${(d / 1000).toFixed(1).replace(".", ",")} km` : `${Math.round(d)} m`;
        setNotice({ text: `Ainda estás a ${far} daqui. Aproxima-te para um carimbo confirmado.`, offerFree: true });
      }
    } catch {
      setNotice({ text: "Não consegui saber onde estás. Autoriza a localização ou carimba sem confirmação.", offerFree: true });
    } finally {
      setChecking(false);
    }
  };

  const addPhoto = async (file?: File) => {
    if (!file || !stop) return;
    try {
      const photo = await compressPhoto(file);
      saveStamps((st) => {
        if (st[stop.title]) st[stop.title].photo = photo;
      });
    } catch {
      setNotice({ text: "Não consegui ler esta fotografia." });
    }
  };

  const resetDay = () => {
    if (!day) return;
    saveStamps((st) => {
      for (const s of day.stops) delete st[s.title];
    });
    setIdx(0);
    setCard(false);
  };

  const reward = passport[slug] ? rewardFor(slug, passport[slug]) : null;

  const shareText = useMemo(
    () => `${city} — ${day?.label ?? ""} · ${done.length} de ${stops.length} paragens carimbadas`,
    [city, day?.label, done.length, stops.length],
  );

  const share = async () => {
    const url = typeof window === "undefined" ? "" : window.location.href;
    const payload = { title: `O Postal — ${city}`, text: shareText, url };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
      await navigator.clipboard.writeText(`${shareText}\n${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3500);
    } catch {
      /* a pessoa cancelou: não fazemos nada */
    }
  };

  if (!days.length) return null;

  const progress = stops.length ? ((idx + 1) / stops.length) * 100 : 0;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 border border-gold/45 bg-background px-4 py-3 font-serif text-sm italic text-gold shadow-[0_14px_34px_-20px_rgba(0,0,0,0.9)] transition-[opacity,transform] duration-500 hover:border-gold/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:bottom-6 md:right-6 ${
          open || !armed
            ? "pointer-events-none translate-y-3 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <Footprints className="h-4 w-4 shrink-0" aria-hidden />
        Modo de rua
      </button>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Modo de rua — ${city}`}
          className="fixed inset-0 z-[70] flex flex-col bg-background"
          onTouchStart={(e) => {
            const t = e.touches[0];
            touchRef.current = t ? { x: t.clientX, y: t.clientY } : null;
          }}
          onTouchEnd={(e) => {
            const start = touchRef.current;
            const t = e.changedTouches[0];
            touchRef.current = null;
            if (!start || !t) return;
            const dx = t.clientX - start.x;
            const dy = t.clientY - start.y;
            if (Math.abs(dy) < 60 || Math.abs(dy) < Math.abs(dx)) return;
            if (dy < 0) actions.current.next();
            else actions.current.prev();
          }}
        >
          {/* topo: cidade, dias, fechar */}
          <div className="border-b border-gold/20 px-4 pb-2 pt-4 md:px-8 md:pt-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">
                Modo de rua
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Fechar modo de rua"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-cream/70 transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <h2 className="mt-1 font-serif text-2xl italic text-cream md:text-3xl">{city}</h2>

            <div className="mt-2 -mx-1 flex gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {days.map((d) => {
                const isActive = d.key === day?.key;
                const count = stamped[d.key]?.length ?? 0;
                return (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => pickDay(d.key)}
                    aria-current={isActive ? "true" : undefined}
                    className={`shrink-0 border-b-2 px-3 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                      isActive
                        ? "border-gold text-gold"
                        : "border-transparent text-cream/55 hover:text-cream"
                    }`}
                  >
                    {d.label}
                    {count > 0 && <span className="ml-1 text-gold/80">· {count}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* corpo */}
          <div className="relative flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-10">
            <p
              aria-live="polite"
              className="sr-only"
            >{`Paragem ${idx + 1} de ${stops.length}: ${stop?.title ?? ""}`}</p>

            {card ? (
              <div className="mx-auto flex min-h-full max-w-md flex-col items-center justify-center text-center">
                <PostmarkCircle city={city} className="mb-6" />
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">
                  {day?.label} · {day?.date}
                </p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-cream md:text-4xl">
                  {done.length === stops.length
                    ? "Dia carimbado."
                    : "Faltam carimbos."}
                </h3>
                <p className="mt-3 text-cream/70">
                  {done.length} de {stops.length} paragens visitadas
                  {totalStamped > done.length
                    ? ` · ${totalStamped} em toda a viagem`
                    : ""}
                  .
                </p>
                <div className="mt-8 flex w-full flex-col gap-3">
                  <button
                    type="button"
                    onClick={share}
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-gold/50 px-5 py-3 font-serif text-lg italic text-gold transition-colors hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                  >
                    <Share2 className="h-4 w-4" aria-hidden />
                    Partilhar
                  </button>
                  {copied && (
                    <p className="text-sm text-gold/90">Ligação copiada.</p>
                  )}
                  {reward && (
                    <div className="border-y border-gold/25 py-4">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Cidade completa</p>
                      <p className="mt-2 font-serif text-2xl text-gold">{reward}</p>
                      <p className="mt-1 text-sm text-cream/70">
                        10% no roteiro personalizado da próxima viagem. Indica o código no pedido.
                      </p>
                    </div>
                  )}
                  <a
                    href="/passaporte"
                    className="min-h-[44px] py-2 font-serif text-lg italic text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  >
                    Ver o passaporte
                  </a>
                  <button
                    type="button"
                    onClick={resetDay}
                    className="min-h-[44px] text-sm uppercase tracking-[0.2em] text-cream/55 underline-offset-4 transition-colors hover:text-cream hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  >
                    Recomeçar este dia
                  </button>
                </div>
              </div>
            ) : stop ? (
              <div className="mx-auto max-w-xl">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-serif text-3xl italic text-gold md:text-4xl">
                    {stop.time}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-cream/50">
                    {idx + 1} / {stops.length}
                  </span>
                </div>

                <h3
                  className="mt-3 font-serif leading-[1.06] text-cream"
                  style={{ fontSize: "clamp(1.9rem, 8vw, 3.1rem)" }}
                >
                  {stop.title}
                </h3>

                <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground md:text-lg">
                  {stop.desc}
                </p>

                {(stop.walkTo || stop.hours) && (
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gold/15 pt-4 text-sm text-cream/70">
                    {stop.walkTo && (
                      <span className="inline-flex items-center gap-2">
                        <Footprints className="h-4 w-4 text-gold/80" aria-hidden />
                        {stop.walkTo}
                      </span>
                    )}
                    {stop.hours && (
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gold/80" aria-hidden />
                        {stop.hours}
                      </span>
                    )}
                  </div>
                )}

                {stop.hoursNote && (
                  <p className="mt-4 border-l-2 border-gold/60 pl-4 text-sm italic text-gold">
                    {stop.hoursNote}
                  </p>
                )}

                {stop.tip && (
                  <p className="mt-5 font-serif text-lg italic leading-snug text-cream/80">
                    {stop.tip}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${stop.title} ${city}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  >
                    Ver no mapa
                  </a>
                  {stop.link && (
                    <a
                      href={stop.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                    >
                      Saber mais
                    </a>
                  )}
                </div>

                {stampStopFor(slug, stop.title) ? (
                  <>
                <button
                  type="button"
                  onClick={toggleStamp}
                  aria-pressed={isStamped}
                  aria-busy={checking}
                  className={`mt-7 inline-flex min-h-[52px] items-center gap-3 border px-5 py-3 font-serif text-lg italic transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
                    isStamped
                      ? "border-gold/70 bg-gold/10 text-gold"
                      : "border-gold/35 text-cream/80 hover:border-gold/70 hover:text-cream"
                  }`}
                >
                  {isStamped ? (
                    <>
                      <span
                        aria-hidden
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-gold/80"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {cityStamps[stop.title]?.verified ? "Carimbado no local" : "Carimbado"}
                    </>
                  ) : (
                    <>
                      <span
                        aria-hidden
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-gold/40"
                      />
                      {checking ? "A confirmar onde estás…" : "Carimbar aqui"}
                    </>
                  )}
                </button>

                  </>
                ) : (
                  <p className="mt-7 text-sm italic text-cream/50">Esta paragem não tem carimbo. Os carimbos ficam para as atrações principais.</p>
                )}
                {!isStamped && !notice && stampStopFor(slug, stop.title) && coordsFor(slug, stop.title) && (
                  <p className="mt-2 text-sm text-cream/55">
                    Confirmamos pela localização que estás mesmo aqui.
                  </p>
                )}

                {notice && (
                  <div className="mt-3 text-sm text-cream/80" role="status">
                    <p>{notice.text}</p>
                    {notice.offerFree && (
                      <button
                        type="button"
                        onClick={() => {
                          stampNow(false);
                          setNotice(null);
                        }}
                        className="mt-2 min-h-[44px] text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                      >
                        Carimbar sem confirmação
                      </button>
                    )}
                    {notice.signIn && (
                      <button
                        type="button"
                        onClick={goSignIn}
                        className="mt-2 min-h-[44px] text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                      >
                        Entrar com Google
                      </button>
                    )}
                  </div>
                )}

                {isStamped && (
                  <div className="mt-5 flex items-center gap-4">
                    {cityStamps[stop.title]?.photo && (
                      <img
                        src={cityStamps[stop.title]?.photo}
                        alt={`A tua fotografia em ${stop.title}`}
                        className="h-20 w-20 rotate-[-3deg] border-4 border-cream object-cover shadow-md"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => photoRef.current?.click()}
                      className="inline-flex min-h-[44px] items-center gap-2 text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                    >
                      <Camera className="h-4 w-4" aria-hidden />
                      {cityStamps[stop.title]?.photo ? "Trocar fotografia" : "Juntar fotografia"}
                    </button>
                    <input
                      ref={photoRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) => {
                        void addPhoto(e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* barra de progresso + navegar */}
          <div className="border-t border-gold/20">
            <div className="h-px w-full bg-gold/15">
              <div
                className="h-px bg-gold transition-[width] duration-500 ease-out"
                style={{ width: `${card ? 100 : progress}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-px bg-gold/15">
              <button
                type="button"
                onClick={prev}
                disabled={idx === 0 && !card}
                className="min-h-[56px] bg-background px-4 py-4 text-sm uppercase tracking-[0.2em] text-cream/85 transition-colors hover:text-cream disabled:cursor-not-allowed disabled:text-cream/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/60"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={card ? close : next}
                className="min-h-[56px] bg-background px-4 py-4 text-sm uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/60"
              >
                {card ? "Voltar ao guia" : idx === stops.length - 1 ? "Fechar o dia" : "Próxima paragem"}
              </button>
            </div>
            {!reduce && !card && (
              <p className="pb-2 pt-1 text-center text-[10px] uppercase tracking-[0.25em] text-cream/55">
                desliza para cima ou para baixo
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
