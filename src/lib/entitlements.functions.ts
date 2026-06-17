import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  createStripeClient,
  getStripeErrorMessage,
  type StripeEnv,
} from "./stripe.server";

const SLUG = z.string().min(1).max(64).regex(/^[a-z0-9-]+$/);
const ENV = z.enum(["sandbox", "live"]);

const PRICE_BY_BUNDLE: Record<1 | 2 | 3, { priceId: string; amount: number }> = {
  1: { priceId: "guide_bundle_1_eur", amount: 790 },
  2: { priceId: "guide_bundle_2_eur", amount: 1490 },
  3: { priceId: "guide_bundle_3_eur", amount: 1890 },
};

function publicSupabase() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

/** Public: read access for the current bearer token (if any). */
export const getMyAccess = createServerFn({ method: "POST" }).handler(async () => {
  const auth = getRequestHeader("authorization");
  if (!auth) return { signedIn: false as const };
  const token = auth.replace(/^Bearer\s+/i, "");
  if (!token) return { signedIn: false as const };

  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    },
  );

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { signedIn: false as const };

  const [accessRes, profileRes] = await Promise.all([
    supabase.from("guide_access").select("guide_slug"),
    supabase.from("profiles").select("credits_remaining,display_name,email").maybeSingle(),
  ]);

  return {
    signedIn: true as const,
    userId: userData.user.id,
    email: userData.user.email ?? null,
    slugs: (accessRes.data ?? []).map((r) => r.guide_slug),
    credits: profileRes.data?.credits_remaining ?? 0,
    displayName: profileRes.data?.display_name ?? null,
  };
});

/** Authenticated: redeem one bundle credit to unlock a guide. */
export const redeemCreditForGuide = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { slug: string }) => ({ slug: SLUG.parse(data.slug) }))
  .handler(async ({ data, context }) => {
    const { data: ok, error } = await context.supabase.rpc("redeem_credit_for_guide", {
      _slug: data.slug,
    });
    if (error) return { success: false as const, error: error.message };
    return { success: Boolean(ok) };
  });

/** Authenticated: create a Stripe Checkout session for a bundle. */
export const createBundleCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: { bundle: 1 | 2 | 3; slug: string; returnUrl: string; environment: StripeEnv }) => ({
      bundle: z.union([z.literal(1), z.literal(2), z.literal(3)]).parse(data.bundle),
      slug: SLUG.parse(data.slug),
      returnUrl: z.string().url().max(500).parse(data.returnUrl),
      environment: ENV.parse(data.environment),
    }),
  )
  .handler(async ({ data, context }) => {
    try {
      const stripe = createStripeClient(data.environment);
      const { priceId, amount } = PRICE_BY_BUNDLE[data.bundle];

      const prices = await stripe.prices.list({ lookup_keys: [priceId] });
      if (!prices.data.length) return { error: "Preço não encontrado." };
      const stripePrice = prices.data[0];

      const email = context.claims?.email as string | undefined;
      const userId = context.userId;

      // resolve customer
      let customerId: string | undefined;
      if (/^[a-zA-Z0-9_-]+$/.test(userId)) {
        const found = await stripe.customers.search({
          query: `metadata['userId']:'${userId}'`,
          limit: 1,
        });
        if (found.data.length) customerId = found.data[0].id;
      }
      if (!customerId && email) {
        const list = await stripe.customers.list({ email, limit: 1 });
        if (list.data.length) {
          customerId = list.data[0].id;
          if (list.data[0].metadata?.userId !== userId) {
            await stripe.customers.update(customerId, {
              metadata: { ...list.data[0].metadata, userId },
            });
          }
        }
      }
      if (!customerId) {
        const created = await stripe.customers.create({
          ...(email ? { email } : {}),
          metadata: { userId },
        });
        customerId = created.id;
      }

      // Record pending purchase
      const { data: purchase } = await context.supabase
        .from("purchases")
        .insert({
          user_id: userId,
          bundle_size: data.bundle,
          amount_cents: amount,
          currency: "eur",
          initial_guide_slug: data.slug,
          status: "pending",
        })
        .select("id")
        .single();

      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: stripePrice.id, quantity: 1 }],
        mode: "payment",
        ui_mode: "embedded_page",
        return_url: data.returnUrl,
        customer: customerId,
        payment_intent_data: { description: `O Postal — ${data.bundle} guia(s) premium` },
        metadata: {
          userId,
          bundle: String(data.bundle),
          initial_slug: data.slug,
          purchase_id: purchase?.id ?? "",
        },
      });

      if (purchase?.id) {
        await context.supabase
          .from("purchases")
          .update({ stripe_session_id: session.id })
          .eq("id", purchase.id);
      }

      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });

/** Internal helper used by the webhook to confirm a session and grant access. */
export async function fulfillCheckoutSession(args: {
  env: StripeEnv;
  sessionId: string;
}) {
  const stripe = createStripeClient(args.env);
  const session = await stripe.checkout.sessions.retrieve(args.sessionId);
  if (!session) return { ok: false, reason: "session_not_found" as const };
  if (session.payment_status !== "paid") return { ok: false, reason: "not_paid" as const };

  const meta = session.metadata ?? {};
  const userId = meta.userId;
  const bundle = Number(meta.bundle ?? "0");
  const initialSlug = meta.initial_slug;
  if (!userId || ![1, 2, 3].includes(bundle) || !initialSlug) {
    return { ok: false, reason: "missing_metadata" as const };
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // Idempotency: if already marked complete, skip
  const { data: existing } = await supabaseAdmin
    .from("purchases")
    .select("id,status")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (existing?.status === "complete") {
    return { ok: true, alreadyComplete: true as const };
  }

  // Grant access to initial guide
  await supabaseAdmin
    .from("guide_access")
    .upsert(
      { user_id: userId, guide_slug: initialSlug, source: "purchase" },
      { onConflict: "user_id,guide_slug", ignoreDuplicates: true },
    );

  // Remaining credits to add
  const remaining = bundle - 1;
  if (remaining > 0) {
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("credits_remaining")
      .eq("id", userId)
      .maybeSingle();
    const current = profile?.credits_remaining ?? 0;
    await supabaseAdmin
      .from("profiles")
      .update({ credits_remaining: current + remaining })
      .eq("id", userId);
  }

  // Mark purchase complete
  await supabaseAdmin
    .from("purchases")
    .update({
      status: "complete",
      stripe_payment_intent:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
    })
    .eq("stripe_session_id", session.id);

  return { ok: true };
}

/** Authenticated: confirm a checkout session after the return URL lands. */
export const confirmCheckoutSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: { sessionId: string; environment: StripeEnv }) => ({
      sessionId: z.string().min(1).max(200).parse(data.sessionId),
      environment: ENV.parse(data.environment),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const result = await fulfillCheckoutSession({
        env: data.environment,
        sessionId: data.sessionId,
      });
      return result;
    } catch (error) {
      return { ok: false as const, reason: "error" as const, message: getStripeErrorMessage(error) };
    }
  });

// keep publicSupabase from being tree-shaken-out warning
void publicSupabase;