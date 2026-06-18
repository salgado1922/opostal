import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Check, Loader2 } from "lucide-react";
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

const BUNDLES: { value: Bundle; label: string }[] = [
  { value: 1, label: "1 guia — 7,90 €" },
  { value: 2, label: "2 guias — 14,90 €" },
  { value: 3, label: "3 guias — 18,90 €" },
];

const INCLUDED = [
  "Itinerário detalhado, dia a dia",
  "Vídeo do guia",
  "Recursos práticos de planeamento",
  "Acesso permanente, sem subscrição",
];

export interface PremiumGateProps {
  slug: string;
  /** Full premium content (itinerary, video, practical sections). */
  children: React.ReactNode;
}

/**
 * Renders premium content only when the signed-in user has unlocked this guide.
 * Otherwise renders a discreet editorial gate with checkout options.
 * Premium DOM is NEVER emitted for users without access.
 */
export function PremiumGate({ slug, children }: PremiumGateProps) {
  const { ready, hasAccess, data } = useHasGuideAccess(slug);

  if (ready && hasAccess) {
    return <>{children}</>;
  }

  return (
    <GateUI
      slug={slug}
      loading={!ready}
      signedIn={!!(data && data.signedIn)}
      credits={data && data.signedIn ? data.credits : 0}
    />
  );
}

function GateUI({
  slug,
  loading,
  signedIn,
  credits,
}: {
  slug: string;
  loading: boolean;
  signedIn: boolean;
  credits: number;
}) {
  const navigate = useNavigate();
  const [bundle, setBundle] = useState<Bundle>(2);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const qc = useQueryClient();
  const redeem = useServerFn(redeemCreditForGuide);

  const onBuy = () => {
    if (!bundle) return;
    if (!signedIn) {
      navigate({ to: "/auth", search: { redirect: window.location.pathname + "#desbloquear" } });
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
      id="desbloquear"
      aria-label="Conteúdo premium"
      className="relative scroll-mt-24 px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        {/* Teaser: a single calm sentence with a soft fade, marking the boundary */}
        <div className="mb-10 text-center md:mb-14">
          <div
            className="mx-auto max-w-2xl"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))",
            }}
          >
            <p className="font-serif text-lg italic leading-relaxed text-cream/60 md:text-xl">
              O itinerário deste guia está organizado dia a dia, com percursos,
              horários e escolhas já feitas por si.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-gold/80">
            <span aria-hidden className="h-px w-6 bg-gold/30" />
            <span>Itinerário detalhado — premium</span>
            <span aria-hidden className="h-px w-6 bg-gold/30" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-gold/20 bg-background/40 p-8 backdrop-blur-sm md:p-12"
        >
          <h3 className="font-serif text-3xl leading-tight md:text-4xl">
            Desbloqueie o itinerário completo deste guia
          </h3>

          <p className="mt-5 text-base leading-relaxed text-cream/80 md:text-lg">
            A partir daqui começa a parte prática do guia: o itinerário detalhado, organizado dia
            a dia, com os percursos, os horários e as escolhas já feitas por si. Acesso único, sem
            subscrições — compra-se uma vez e fica seu.
          </p>

          <ul className="mt-8 space-y-2.5 text-sm text-cream/80 md:text-base">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-[0.6em] inline-block h-[3px] w-[3px] rounded-full bg-gold/70"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {signedIn && credits > 0 && (
            <div className="mt-8 rounded-lg border border-gold/25 bg-gold/5 p-4">
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

          <fieldset className="mt-10 space-y-2">
            <legend className="sr-only">Escolha um pacote</legend>
            {BUNDLES.map((b) => {
              const selected = bundle === b.value;
              return (
                <label
                  key={b.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3.5 transition-colors ${
                    selected
                      ? "border-gold/60 bg-gold/5"
                      : "border-gold/15 hover:border-gold/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="bundle"
                    value={b.value}
                    checked={selected}
                    onChange={() => setBundle(b.value)}
                    className="h-4 w-4 accent-[color:var(--color-gold,#c8a85a)]"
                  />
                  <span className="text-sm text-cream md:text-base">{b.label}</span>
                </label>
              );
            })}
          </fieldset>

          <div className="mt-8 flex flex-col gap-4">
            <button
              type="button"
              onClick={onBuy}
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-gold px-6 py-3.5 text-sm font-medium tracking-wide text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:self-start"
            >
              Comprar acesso
            </button>
            {!signedIn && (
              <Link
                to="/auth"
                search={{ redirect: typeof window !== "undefined" ? window.location.pathname + "#desbloquear" : "/" }}
                className="text-sm text-cream/60 underline-offset-4 hover:text-cream/90 hover:underline"
              >
                Já comprou? Inicie sessão para desbloquear.
              </Link>
            )}
            {signedIn && (
              <Link
                to="/conta"
                className="text-sm text-cream/60 underline-offset-4 hover:text-cream/90 hover:underline"
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