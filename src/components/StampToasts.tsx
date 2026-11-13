import { useEffect, useState } from "react";
import { STAMP_STOPS } from "@/data/stamp-stops";
import { CITIES } from "@/data/cities";

// Avisos simulados enquanto o tráfego é pequeno: em média 2 por hora, a intervalos aleatórios.
const MEAN_MS = 30 * 60 * 1000;
const NAMES = ["Uma viajante", "Um viajante", "A Inês", "O Tiago", "A Marta", "O Rui", "A Sofia", "O João"];

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

function randomEvent() {
  const slug = pick(Object.keys(STAMP_STOPS));
  const stop = pick(STAMP_STOPS[slug]);
  const city = CITIES.find((c) => c.slug === slug)?.name ?? slug;
  return { who: pick(NAMES), label: stop.label, city, mins: 1 + Math.floor(Math.random() * 4) };
}

export function StampToasts() {
  const [ev, setEv] = useState<ReturnType<typeof randomEvent> | null>(null);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    let hide: ReturnType<typeof setTimeout>;
    const show = () => {
      setEv(randomEvent());
      hide = setTimeout(() => setEv(null), 6000);
      // intervalo exponencial → média de 30 min (≈2 por hora)
      t = setTimeout(show, Math.max(60_000, -Math.log(1 - Math.random()) * MEAN_MS));
    };
    // primeiro aviso cedo para quem acabou de chegar
    t = setTimeout(show, 20_000 + Math.random() * 40_000);
    return () => { clearTimeout(t); clearTimeout(hide); };
  }, []);

  if (!ev) return null;
  return (
    <div role="status" aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-2 border-l-2 border-gold bg-ink/95 px-4 py-3 shadow-lg sm:right-auto">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Acabou de carimbar · há {ev.mins} min</p>
      <p className="mt-1 font-serif text-base text-cream">
        {ev.who} carimbou <em>{ev.label}</em>, {ev.city}
      </p>
    </div>
  );
}
