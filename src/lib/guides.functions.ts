import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { guideInputSchema, normalizeContent, type GuideRow } from "@/lib/guides-schema";

type SupabaseLike = { from: (t: string) => any; rpc: (n: string, a: unknown) => any };

async function assertAdmin(supabase: SupabaseLike, userId: string) {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin");
  if (!data || data.length === 0) throw new Response("Forbidden", { status: 403 });
}

function toRow(record: Record<string, unknown>): GuideRow {
  return { ...record, content: normalizeContent(record["content"]) } as GuideRow;
}

// ---------------- public reads (no auth) ----------------

async function publicClient() {
  const { createClient } = await import("@supabase/supabase-js");
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"]!;
  return createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listPublishedGuides = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = await publicClient();
  const { data, error } = await supabase
    .from("guides")
    .select("slug, title, city, country, duration, hero_url, hero_alt, intro, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) return [];
  return data ?? [];
});

export const getPublishedGuide = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ slug: z.string().trim().max(60) }).parse(data))
  .handler(async ({ data }) => {
    const supabase = await publicClient();
    const { data: row, error } = await supabase
      .from("guides")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (error || !row) return null;
    return toRow(row as Record<string, unknown>);
  });

// ---------------- admin ----------------

export const listGuidesAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase as unknown as SupabaseLike, context.userId);
    const { data, error } = await context.supabase
      .from("guides")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return ((data ?? []) as unknown as Record<string, unknown>[]).map(toRow);
  });

export const getGuideAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as unknown as SupabaseLike, context.userId);
    const { data: row, error } = await context.supabase
      .from("guides")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Guia não encontrado");
    return toRow(row as unknown as Record<string, unknown>);
  });

export const saveGuide = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => guideInputSchema.parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as unknown as SupabaseLike, context.userId);
    const { id, status, ...fields } = data;
    const payload: Record<string, unknown> = {
      ...fields,
      status,
      content: data.content,
      ...(status === "published" ? { published_at: new Date().toISOString() } : {}),
    };

    if (id) {
      const { data: row, error } = await context.supabase
        .from("guides")
        .update(payload as never)
        .eq("id", id)
        .select("*")
        .maybeSingle();
      if (error) throw new Error(error.message);
      return toRow(row as unknown as Record<string, unknown>);
    }

    const { data: row, error } = await context.supabase
      .from("guides")
      .insert(payload as never)
      .select("*")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return toRow(row as unknown as Record<string, unknown>);
  });

export const setGuideStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({ id: z.string().uuid(), status: z.enum(["draft", "published"]) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as unknown as SupabaseLike, context.userId);
    const { error } = await context.supabase
      .from("guides")
      .update({
        status: data.status,
        ...(data.status === "published" ? { published_at: new Date().toISOString() } : {}),
      } as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteGuide = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as unknown as SupabaseLike, context.userId);
    const { error } = await context.supabase.from("guides").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
