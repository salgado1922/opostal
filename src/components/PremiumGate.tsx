import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Lock, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { useHasGuideAccess } from "@/hooks/use-auth";
import { redeemCreditForGuide } from "@/lib/entitlements.functions";
import { StripeEmbeddedCheckoutBundle } from "@/components/StripeEmbeddedCheckout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Bundle = 1 | 2 | 3;

const BUNDLES: { value: Bundle; label: string; sub: string }[] = [
  { value: 1, label: "1 guia — 7,90 €", sub: "Acesso a este guia" },
  { value: 2, label: "2 guias — 14,90 €", sub: "Este guia + 1 à escolha" },
  { value: 3, label: "3 guias — 18,90 €", sub: "Este guia + 2 à escolha" },
];

export interface PremiumGateProps {
  slug: string;
  /** Optional 2-3 short lines shown faded as itinerary teaser. */
  teaserLines?: string[];
  /** Full premium content (itinerary, video, practical sections). */
  children: React.ReactNode;
}

/**
 * Renders premium content only when the signed-in user has unlocked this guide.
 * Otherwise renders a discreet editorial gate with checkout options.
 * Premium DOM is NEVER emitted for users without access.
 */
export function PremiumGate({ slug, teaserLines, children }: PremiumGateProps) {
  const { ready, hasAccess, data } = useHasGuideAccess(slug);

  if (ready && hasAccess) {
    return <>{children}</>;
  }

  return (
    <GateUI
      slug={slug}
      teaserLines={teaserLines}
      loading={!ready}
      signedIn={!!(data && data.signedIn)}
      credits={data && data.signedIn ? data.credits : 0}
    />
  );
}

function GateUI({
  slug,
  teaserLines,
  loading,
  signedIn,
  credits,
}: {
  slug: string;
  teaserLines?: string[];
  loading: boolean;
  signedIn: boolean;
  credits: number;
}) {
  const navigate = useNavigate();
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const qc = useQueryClient();
  const redeem = useServerFn(redeemCreditForGuide);

  const defaultTeaser = [
    "Manhã. Encontro junto à praça principal, café curto antes do primeiro percurso.",
    "Passamos pelas ruelas mais calmas até ao primeiro miradouro, sem turistadas.",
  ];
  const lines = teaserLines && teaserLines.length ? teaserLines : defaultTeaser;

  const onBuy = () => {
    if (!bundle) return;
    if (!signedIn) {
      navigate({ to: "/auth", search: { redirect: window.location.pathname + "#dias" } });
      return;
    }
    setCheckoutOpen(true);
  };

  const onRedeem = async () => {
    if (credits < 1) return;
    setRedeeming(true);
    setRedeemError(null);
    try {
      const r = await redeem({ data: { slug } });
      if (!r.success) {
        setRedeemError("Não foi possível usar o crédito. Tenta novamente.");
      } else {
        await qc.invalidateQueries({ queryKey: ["my-access"] });
      }
    } catch {
      setRedeemError("Algo correu mal. Tenta novamente.");
    } finally {
      setRedeeming(false);
    }
  };

  return (
    <section
      id="dias"
      aria-label="Conteúdo premium"
      className="relative scroll-mt-24 px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        {/* Editorial divider */}
        <div className="mb-10 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold/80">
          <span className="h-px w-12 bg-gold/30" />
          <span>Conteúdo premium</span>
          <span className="h-px w-12 bg-gold/30" />
        </div>
        <h2 className="text-center font-serif text-4xl leading-tight md:text-5xl">
          Itinerário detalhado
        </h2>

        {/* Faded teaser */}
        <div className="relative mt-10">
          <div
            aria-hidden
            className="space-y-3 font-serif text-lg leading-relaxed text-cream/85 md:text-xl"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
            }}
          >
            {lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
            <p className="opacity-70">
              Depois seguimos para a próxima paragem, com horários, percursos e os pormenores que
              fazem a diferença...
            </p>
          </div>
        </div>

        {/* Teaser message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center font-serif text-base italic text-cream/75 md:text-lg"
        >
          A partir daqui começa o itinerário detalhado — o plano completo, organizado dia a dia,
          com percursos, horários e todas as escolhas já feitas por si. É a parte que transforma
          este guia num roteiro pronto a seguir.
        </motion.p>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-14 rounded-2xl border border-gold/20 bg-background/40 p-8 backdrop-blur-sm md:p-10"
        >
          <div className="flex items-center gap-3 text-gold">
            <Lock className="h-4 w-4" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em]">Acesso ao guia</span>
          </div>

          <h3 className="mt-4 font-serif text-2xl leading-snug md:text-3xl">
            Desbloqueie o itinerário completo deste guia
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/75 md:text-base">
            Acesso único, sem subscrições. Inclui o itinerário detalhado dia a dia, o vídeo do
            guia e todos os recursos práticos de planeamento. Compra-se uma vez e fica seu.
          </p>

          {signedIn && credits > 0 && (
            <div className="mt-6 rounded-lg border border-gold/25 bg-gold/5 p-4">
              <p className="text-sm text-cream/85">
                Tem {credits} {credits === 1 ? "crédito" : "créditos"} por usar do seu pacote.
              </p>
              <button
                type="button"
                onClick={onRedeem}
                disabled={redeeming}
                className="mt-3 inline-flex items-center gap-2 rounded-md border border-gold/40 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/10 disabled:opacity-60"
              >
                {redeeming ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Check className="h-4 w-4" aria-hidden />
                )}
                Desbloquear este guia com 1 crédito
              </button>
              {redeemError && <p className="mt-2 text-xs text-red-300">{redeemError}</p>}
            </div>
          )}

          <fieldset className="mt-8 space-y-2">
            <legend className="sr-only">Escolha um pacote</legend>
            {BUNDLES.map((b) => {
              const selected = bundle === b.value;
              return (
                <label
                  key={b.value}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border px-4 py-3 transition-colors ${
                    selected
                      ? "border-gold/60 bg-gold/5"
                      : "border-gold/15 hover:border-gold/35"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="bundle"
                      value={b.value}
                      checked={selected}
                      onChange={() => setBundle(b.value)}
                      className="h-4 w-4 accent-[color:var(--color-gold,#c8a85a)]"
                    />
                    <div>
                      <div className="text-sm font-medium text-cream">{b.label}</div>
                      <div className="text-xs text-cream/60">{b.sub}</div>
                    </div>
                  </div>
                </label>
              );
            })}
          </fieldset>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onBuy}
              disabled={!bundle || loading}
              className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Comprar acesso
            </button>
            {!signedIn && (
              <Link
                to="/auth"
                search={{ redirect: typeof window !== "undefined" ? window.location.pathname + "#dias" : "/" }}
                className="text-xs text-cream/65 underline-offset-4 hover:text-cream hover:underline"
              >
                Já comprou? Inicie sessão para desbloquear.
              </Link>
            )}
            {signedIn && (
              <Link
                to="/conta"
                className="text-xs text-cream/65 underline-offset-4 hover:text-cream hover:underline"
              >
                Ver a minha conta
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Finalizar compra</DialogTitle>
          </DialogHeader>
          {bundle && checkoutOpen && (
            <StripeEmbeddedCheckoutBundle bundle={bundle} slug={slug} />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}