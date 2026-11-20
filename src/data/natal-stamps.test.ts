import { describe, it, expect } from "vitest";
import { checkXmasSpot, openSpots, xmasStatus } from "./natal-stamps";

const at = (iso: string) => new Date(iso);

describe("carimbos de Natal", () => {
  it("só abrem quando abre o primeiro mercado da cidade", () => {
    expect(xmasStatus("viena", at("2026-11-05T12:00:00+01:00"))).toBe("antes");
    expect(xmasStatus("viena", at("2026-11-06T12:00:00+01:00"))).toBe("aberto");
  });
  it("em Praga, antes de 28 de novembro só vale Náměstí Míru", () => {
    expect(openSpots("praga", at("2026-11-21T18:00:00+01:00")).map((m) => m.name)).toEqual(["Náměstí Míru"]);
  });
  it("fecham depois do último dia do último mercado", () => {
    expect(xmasStatus("praga", at("2027-01-06T21:00:00+01:00"))).toBe("aberto");
    expect(xmasStatus("budapeste", at("2027-01-02T12:00:00+01:00"))).toBe("fechado");
  });
  it("confirma quem está na praça do mercado", () => {
    const r = checkXmasSpot("viena", [48.2106, 16.3575], 20, at("2026-12-10T19:00:00+01:00"));
    expect(r?.spot.name).toBe("Rathausplatz");
    expect(r?.ok).toBe(true);
  });
  it("recusa quem está a mais de 250 m de um mercado aberto", () => {
    const r = checkXmasSpot("viena", [48.2082, 16.3738], 20, at("2026-12-10T19:00:00+01:00"));
    expect(r?.ok).toBe(false);
  });
  it("um mercado já fechado não dá carimbo", () => {
    // Spittelberg fecha a 23 de dezembro.
    const r = checkXmasSpot("viena", [48.2028, 16.355], 20, at("2026-12-28T18:00:00+01:00"));
    expect(r?.spot.name).not.toBe("Spittelberg");
    expect(r?.ok).toBe(false);
  });
});
