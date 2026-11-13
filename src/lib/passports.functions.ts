import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Json } from "@/integrations/supabase/types";

export type AdminPassportRow = {
  user_id: string;
  email: string | null;
  display_name: string | null;
  data: Json;
  updated_at: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function requireAdmin(supabase: any, userId: string) {
  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin");
  if (!roles || roles.length === 0) throw new Response("Forbidden", { status: 403 });
}

// Admin-only: every passport, with the owner's email, newest activity first.
export const listUserPassports = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ data: rows, error }, { data: profiles }] = await Promise.all([
      supabaseAdmin
        .from("passports")
        .select("user_id, data, updated_at")
        .order("updated_at", { ascending: false }),
      supabaseAdmin.from("profiles").select("id, email, display_name"),
    ]);
    if (error) throw new Error(error.message);
    const byId = new Map((profiles ?? []).map((p) => [p.id, p]));
    return (rows ?? []).map(
      (r): AdminPassportRow => ({
        user_id: r.user_id,
        data: r.data ?? {},
        updated_at: r.updated_at,
        email: byId.get(r.user_id)?.email ?? null,
        display_name: byId.get(r.user_id)?.display_name ?? null,
      }),
    );
  });

const saveSchema = z.object({
  userId: z.string().uuid(),
  data: z.record(z.string(), z.any()),
});

// Admin-only: replace a user's whole passport (stamps edited in the panel).
export const adminSavePassport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => saveSchema.parse(d))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("passports").upsert({
      user_id: data.userId,
      data: data.data as never,
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
