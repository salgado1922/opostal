import { Link } from "@tanstack/react-router";
import { ArrowRight, Lock } from "lucide-react";
import { useHasGuideAccess, useMyAccess } from "@/hooks/use-auth";
import { CITIES } from "@/data/cities";

/**
 * Quiet editorial CTAs that nudge readers toward /premium without
 * making the site feel commercial. All variants self-hide when the
 * relevant user already has access.
 */

/* -------- 1. Homepage CTA (single, low on page) -------- */

export function HomePremiumCTA() {
  const { data, sessionLoaded } = useMyAccess();
  if (!sessionLoaded) return null;
  // Hide only if the user already owns every published guide.
  if (data && data.signedIn) {
    const ready = CITIES.filter((c) => c.status === "ready").map((c) => c.slug);
    const ownsAll = ready.every((s) => data.slugs.includes(s));
    if (ownsAll) return null;
  }
  return (
    <section aria-label="Roteiros premium" className="px-6 pb-20 pt-4 md:pb-28">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 h-px w-16 bg-gold/40" />
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">
          Roteiros prontos a seguir
        </p>
        <p className="font-serif text-xl leading-relaxed text-cream/85 md:text-2xl">
          Os nossos guias são gratuitos para explorar. Quando quiser passar à parte
          prática, desbloqueie o itinerário completo com uma compra única.
        </p>
        <Link
          to="/premium"
          className="mt-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold gold-link"
        >
          Conhecer os roteiros premium
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

/* -------- Shared: tiny editorial premium label -------- */

/**
 * Hairline uppercase label, no fill, no border, no icon.
 * Use above any locked section to mark it as premium.
 */
export function PremiumLabel({
  children = "Conteúdo premium",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-gold/80 ${className}`}
    >
      <span aria-hidden className="h-px w-6 bg-gold/30" />
      <span>{children}</span>
      <span aria-hidden className="h-px w-6 bg-gold/30" />
    </div>
  );
}

/* -------- 2. Guide card / listing tag -------- */

/** Discreet "Inclui roteiro premium" tag. Hidden when the user already owns the guide. */
export function PremiumCardTag({ slug, className = "" }: { slug: string; className?: string }) {
  const { ready, hasAccess } = useHasGuideAccess(slug);
  if (!ready || hasAccess) return null;
  return (
    <span
      className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/55 ${className}`}
    >
      <span aria-hidden className="text-gold/70">·</span>
      Inclui itinerário premium
    </span>
  );
}

/* -------- 3. Optional inline link earlier in article -------- */

export function ArticleInlineLink({ slug }: { slug: string }) {
  const { ready, hasAccess } = useHasGuideAccess(slug);
  if (!ready || hasAccess) return null;
  return (
    <p className="mx-auto mt-6 max-w-2xl border-l border-gold/30 pl-4 text-sm italic text-cream/65 md:text-base">
      A parte prática deste guia — o itinerário detalhado — está disponível com{" "}
      <Link to="/premium" className="gold-link not-italic">
        acesso premium
      </Link>
      .
    </p>
  );
}

/* -------- 4. Premium video gate -------- */

/**
 * Wraps a video block. Renders the video as-is for users with access;
 * otherwise shows a quiet teaser + CTA in its place.
 */
export function PremiumVideoGate({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const { ready, hasAccess } = useHasGuideAccess(slug);
  if (!ready) return null;
  if (hasAccess) return <>{children}</>;
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-gold/20 bg-background/40 px-8 py-10 text-center backdrop-blur-sm md:py-12">
      <PremiumLabel className="mb-5">Recurso premium</PremiumLabel>
      <Lock className="mx-auto mb-4 h-4 w-4 text-gold/70" aria-hidden />
      <p className="font-serif text-lg italic text-cream/80 md:text-xl">
        O vídeo deste guia faz parte do conteúdo premium.
      </p>
      <Link
        to="/premium"
        className="mt-6 inline-flex items-center justify-center rounded-md border border-gold/40 px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold/10"
      >
        Desbloquear acesso
      </Link>
    </div>
  );
}

/* -------- 5. End-of-article CTA -------- */

export function EndOfArticleCTA({ slug }: { slug: string }) {
  const { ready, hasAccess } = useHasGuideAccess(slug);
  if (!ready || hasAccess) return null;
  return (
    <section aria-label="Acesso premium" className="px-6 pb-20 pt-4 md:pb-28">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gold/15 bg-background/30 px-8 py-10 text-center md:py-12">
        <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold/80">
          Gostou deste guia?
        </p>
        <p className="font-serif text-xl leading-relaxed text-cream/85 md:text-2xl">
          Desbloqueie o itinerário detalhado e os recursos práticos com uma compra
          única — sem subscrições.
        </p>
        <Link
          to="/premium"
          className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold gold-link"
        >
          Ver opções de acesso
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}