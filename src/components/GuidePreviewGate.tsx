import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useHasGuideAccess } from "@/hooks/use-auth";

/**
 * Minimal shape every guide day must expose for the preview gate.
 * Reuses the existing per-city Day type (which extends this).
 */
export type PreviewDay = {
  key: string;
  label: string;
  date: string;
  title: string;
  vibe: string;
};

export interface GuidePreviewGateProps<D extends PreviewDay> {
  slug: string;
  days: D[];
  /** Number of days shown in full to visitors without access. Default 1. */
  sampleDays?: number;
  /** Renders one day in full. Reuse the existing per-city DayBlock. */
  renderDay: (day: D) => React.ReactNode;
}

/**
 * Reusable free-sample mechanism for guide itineraries.
 * Visitors with access see every day in full, no badges, no gate.
 * Visitors without access see the first `sampleDays` day(s) in full (with a
 * small "Amostra grátis" badge) and the remaining days as locked summary
 * cards. The existing PremiumGate paywall (rendered by the route just after
 * this component) provides the purchase CTA, so this component never
 * duplicates it.
 */
export function GuidePreviewGate<D extends PreviewDay>({
  slug,
  days,
  sampleDays = 1,
  renderDay,
}: GuidePreviewGateProps<D>) {
  const { ready, hasAccess } = useHasGuideAccess(slug);

  // While access is being checked, render nothing premium-revealing.
  // The free first day still needs to appear quickly, so we optimistically
  // show the preview shape (free first day + locked stubs) until ready,
  // then upgrade to full content if access is granted.
  if (ready && hasAccess) {
    return (
      <div className="space-y-24">
        {days.map((d) => (
          <div key={d.key}>{renderDay(d)}</div>
        ))}
      </div>
    );
  }

  const free = Math.max(1, Math.min(sampleDays, days.length));
  const sample = days.slice(0, free);
  const locked = days.slice(free);

  return (
    <div className="space-y-24">
      {sample.map((d) => (
        <div key={d.key} className="space-y-6">
          <div className="flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-gold/90">
              <span aria-hidden className="h-1 w-1 rounded-full bg-gold/70" />
              Amostra grátis
            </span>
          </div>
          {renderDay(d)}
        </div>
      ))}

      {locked.map((d) => (
        <LockedDayCard key={d.key} day={d} />
      ))}
    </div>
  );
}

function LockedDayCard({ day }: { day: PreviewDay }) {
  return (
    <motion.div
      id={day.key}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24"
    >
      <div className="mb-6 border-b border-gold/15 pb-5">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80">
          {day.label} · {day.date}
        </div>
        <h3 className="mt-3 font-serif text-3xl text-cream/90 md:text-4xl">
          {day.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm italic text-cream/60 md:text-base">
          {day.vibe}
        </p>
      </div>

      <div className="rounded-2xl border border-gold/15 bg-twilight/40 p-8 text-center backdrop-blur-sm md:p-10">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
          <Lock className="h-4 w-4 text-gold" aria-hidden />
        </div>
        <h4 className="mt-5 font-serif text-xl text-cream md:text-2xl">
          Continua no guia completo
        </h4>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/70">
          Este dia faz parte do itinerário detalhado. Desbloqueia o guia
          completo para o veres.
        </p>
        <a
          href="#desbloquear"
          className="mt-6 inline-flex items-center justify-center rounded-md border border-gold/40 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold/10"
        >
          Desbloquear guia
        </a>
      </div>
    </motion.div>
  );
}