import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { workflowSchema } from "./admin-workflow";

export const saveRequestWorkflow = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => workflowSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: admin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!admin) throw new Error("Forbidden");
    const { id, ...values } = data;
    const { data: saved, error } = await context.supabase.from("itinerary_requests").update({ ...values, updated_at: new Date().toISOString() }).eq("id", id).select("id").single();
    if (error || !saved) throw new Error("Não foi possível guardar o pedido.");
    return { ok: true };
  });

export const getAdminOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: admin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!admin) throw new Error("Forbidden");
    const since = new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10);
    const [metrics, health, ai] = await Promise.all([
      context.supabase.from("site_metric_daily").select("*").gte("day", since).order("day"),
      context.supabase.from("guide_health").select("*"),
      context.supabase.from("admin_ai_state").select("*").eq("id", "itinerary").maybeSingle(),
    ]);
    if (metrics.error || health.error || ai.error) throw new Error("Não foi possível carregar o painel.");
    return { metrics: metrics.data ?? [], health: health.data ?? [], ai: ai.data };
  });

export const checkGuideHealth = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ city: z.enum(["praga", "istambul", "florenca", "londres", "paris", "barcelona", "viena", "lisboa", "budapeste"]) }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: admin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!admin) throw new Error("Forbidden");
    const { inspectGuide } = await import("./guide-health.server");
    const result = await inspectGuide(data.city);
    const { error } = await context.supabase.from("guide_health").upsert({ city: data.city, checked_at: result.checkedAt, result });
    if (error) throw new Error("Não foi possível guardar a verificação.");
    return result;
  });

export const markGuideReviewed = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ city: z.enum(["praga", "istambul", "florenca", "londres", "paris", "barcelona", "viena", "lisboa", "budapeste"]) }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: admin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!admin) throw new Error("Forbidden");
    const { error } = await context.supabase.from("guide_health").upsert({ city: data.city, reviewed_at: new Date().toISOString() });
    if (error) throw new Error("Não foi possível guardar a revisão.");
    return { ok: true };
  });

export const resumeAdminAI = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data: admin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (!admin) throw new Error("Forbidden");
  const { error } = await context.supabase.from("admin_ai_state").upsert({ id: "itinerary", blocked: false, message: "", updated_at: new Date().toISOString() });
  if (error) throw new Error("Não foi possível retomar.");
  return { ok: true };
});