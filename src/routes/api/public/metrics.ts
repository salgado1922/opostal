import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/api/public/metrics")({ server: { handlers: { POST: async ({ request }) => {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin || request.headers.get("content-type") !== "application/json") return new Response(null, { status: 403 });
  if (Number(request.headers.get("content-length") ?? 0) > 500) return new Response(null, { status: 413 });
  const text = await request.text();
  if (text.length > 500) return new Response(null, { status: 413 });
  let data;
  try { data = z.object({ city: z.enum(["praga", "istambul", "florenca", "londres", "paris", "barcelona", "viena", "lisboa", "budapeste"]), kind: z.enum(["view", "booking"]) }).parse(JSON.parse(text)); }
  catch { return new Response(null, { status: 400 }); }
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) return new Response(null, { status: 503 });
  const hashKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const fingerprint = await crypto.subtle.sign("HMAC", hashKey, new TextEncoder().encode(`${new Date().toISOString().slice(0, 10)}:${request.headers.get("cf-connecting-ip") ?? "local"}`));
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.rpc("record_site_metric", { p_city: data.city, p_kind: data.kind, p_fingerprint: Array.from(new Uint8Array(fingerprint), b => b.toString(16).padStart(2, "0")).join("") });
  return new Response(null, { status: error ? 503 : 204 });
} } } });