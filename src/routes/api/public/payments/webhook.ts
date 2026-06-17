import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { createStripeClient, getWebhookSecret, type StripeEnv } from "@/lib/stripe.server";
import { fulfillCheckoutSession } from "@/lib/entitlements.functions";

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const envParam = (url.searchParams.get("env") ?? "sandbox") as StripeEnv;
        const env: StripeEnv = envParam === "live" ? "live" : "sandbox";

        const signature = request.headers.get("stripe-signature");
        if (!signature) return new Response("Missing signature", { status: 400 });

        const rawBody = await request.text();
        const stripe = createStripeClient(env);
        const secret = getWebhookSecret(env);

        let event: Stripe.Event;
        try {
          event = await stripe.webhooks.constructEventAsync(rawBody, signature, secret);
        } catch (err) {
          console.error("[webhook] signature verification failed", err);
          return new Response("Invalid signature", { status: 401 });
        }

        try {
          if (
            event.type === "checkout.session.completed" ||
            event.type === "checkout.session.async_payment_succeeded"
          ) {
            const session = event.data.object as Stripe.Checkout.Session;
            await fulfillCheckoutSession({ env, sessionId: session.id });
          }
        } catch (err) {
          console.error("[webhook] fulfillment error", err);
          return new Response("Internal error", { status: 500 });
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});