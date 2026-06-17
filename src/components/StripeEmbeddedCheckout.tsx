import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useServerFn } from "@tanstack/react-start";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createBundleCheckout } from "@/lib/entitlements.functions";

interface Props {
  bundle: 1 | 2 | 3;
  slug: string;
  returnUrl?: string;
}

export function StripeEmbeddedCheckoutBundle({ bundle, slug, returnUrl }: Props) {
  const startCheckout = useServerFn(createBundleCheckout);

  const fetchClientSecret = async (): Promise<string> => {
    const result = await startCheckout({
      data: {
        bundle,
        slug,
        returnUrl:
          returnUrl ??
          `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}&slug=${slug}`,
        environment: getStripeEnvironment(),
      },
    });
    if ("error" in result && result.error) throw new Error(result.error);
    if (!("clientSecret" in result) || !result.clientSecret) {
      throw new Error("Não foi possível iniciar o pagamento.");
    }
    return result.clientSecret;
  };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}