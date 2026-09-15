import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const requestSchema = z.object({
  nome: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email().max(255),
  destino: z.string().trim().max(120).optional().default(""),
  datas: z.string().trim().max(120).optional().default(""),
  dias: z.string().trim().max(10).optional().default(""),
  pessoas: z.string().trim().max(10).optional().default(""),
  orcamento: z.string().trim().max(120).optional().default(""),
  ritmo: z.string().trim().max(120).optional().default(""),
  interesses: z.string().trim().max(500).optional().default(""),
  restricoes: z.string().trim().max(300).optional().default(""),
  alojamento: z.string().trim().max(120).optional().default(""),
  partida: z.string().trim().max(120).optional().default(""),
  observacoes: z.string().trim().max(1000).optional().default(""),
});

export type ItineraryRequest = z.infer<typeof requestSchema> & {
  id: string;
  created_at: string;
};

// Public: stores a custom-itinerary request. Privileged insert (RLS has no
// public insert policy), validated above.
export const submitItineraryRequest = createServerFn({ method: "POST" })
  .inputValidator((data) => requestSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("itinerary_requests").insert({
      nome: data.nome || null,
      email: data.email,
      destino: data.destino || null,
      datas: data.datas || null,
      dias: data.dias || null,
      pessoas: data.pessoas || null,
      orcamento: data.orcamento || null,
      ritmo: data.ritmo || null,
      interesses: data.interesses || null,
      restricoes: data.restricoes || null,
      alojamento: data.alojamento || null,
      partida: data.partida || null,
      observacoes: data.observacoes || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Admin-only: list all requests, newest first.
export const listItineraryRequests = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: roles } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin");
    if (!roles || roles.length === 0) {
      throw new Response("Forbidden", { status: 403 });
    }
    const { data, error } = await context.supabase
      .from("itinerary_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as ItineraryRequest[];
  });
