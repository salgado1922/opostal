import { z } from "zod";

export const REQUEST_STATES = { novo: "Novo", preparacao: "Em preparação", enviado: "Enviado", concluido: "Concluído" } as const;
export const REVIEW_ITEMS = { prices: "Preços e orçamento", times: "Horários e bilhetes", logistics: "Deslocações e ritmo", rain: "Plano B", map: "Mapa privado e bilhetes", final: "Revisão final" } as const;
export const workflowSchema = z.object({
  id: z.string().uuid(), status: z.enum(["novo", "preparacao", "enviado", "concluido"]),
  admin_notes: z.string().max(10000), proposal: z.string().max(60000),
  delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  review_checks: z.record(z.boolean()),
}).superRefine((data, ctx) => {
  if ((data.status === "enviado" || data.status === "concluido") && Object.keys(REVIEW_ITEMS).some(key => !data.review_checks[key])) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Conclui as verificações antes de marcar como enviado ou concluído." });
  }
});

export function metricCity(path: string, cities: string[]) {
  const parts = path.split("/").filter(Boolean);
  const slug = parts.length === 1 ? parts[0] : ["carimbos", "onde-ficar"].includes(parts[0]) ? parts[1] : undefined;
  return slug && cities.includes(slug) ? slug : null;
}

export type HealthResult = { findings: { label: string; status: "ok" | "attention" | "error"; detail: string }[]; checkedAt: string };