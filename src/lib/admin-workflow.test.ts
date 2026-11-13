import { describe, it, expect } from "vitest";
import { metricCity, workflowSchema, REVIEW_ITEMS } from "./admin-workflow";

const draft = { id: "00000000-0000-4000-8000-000000000001", status: "novo", admin_notes: "", delivery_date: null, proposal: "", review_checks: {} };
describe("itinerary workflow", () => {
  it("accepts the four requested tracking states with a completed review", () => {
    const review_checks = Object.fromEntries(Object.keys(REVIEW_ITEMS).map(key => [key, true]));
    for (const status of ["novo", "preparacao", "enviado", "concluido"]) expect(workflowSchema.safeParse({ ...draft, status, review_checks }).success).toBe(true);
    expect(workflowSchema.safeParse({ ...draft, status: "unknown", review_checks }).success).toBe(false);
  });
  it("requires human review before marking sent", () => {
    expect(workflowSchema.safeParse({ ...draft, status: "enviado" }).success).toBe(false);
  });
  it("requires human review before marking completed", () => {
    expect(workflowSchema.safeParse({ ...draft, status: "concluido" }).success).toBe(false);
  });
  it("limits city measurement to public city content", () => {
    expect(metricCity("/praga", ["praga"])).toBe("praga");
    expect(metricCity("/carimbos/praga", ["praga"])).toBe("praga");
    expect(metricCity("/onde-ficar/praga", ["praga"])).toBe("praga");
    expect(metricCity("/admin", ["praga"])).toBe(null);
    expect(metricCity("/auth/praga", ["praga"])).toBe(null);
  });
});