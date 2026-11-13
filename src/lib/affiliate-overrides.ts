import { supabase } from "@/integrations/supabase/client";
import { BOOKING_BAIRROS } from "@/data/booking-bairros";

/**
 * Links de afiliado editados no painel (/afiliados) substituem os do código.
 * Troca-se o href no momento do clique, para não mexer no HTML inicial.
 */
let installed = false;
export function installAffiliateOverrides() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  const byFallback = new Map<string, string>();
  for (const city of Object.values(BOOKING_BAIRROS))
    for (const [id, b] of Object.entries(city)) byFallback.set(b.fallback, id);
  let overrides: Record<string, string> = {};
  supabase.from("affiliate_links").select("id,url").then(({ data }) => {
    overrides = Object.fromEntries((data ?? []).filter((r) => r.url.trim()).map((r) => [r.id, r.url.trim()]));
  });
  const swap = (e: Event) => {
    const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!a) return;
    const id = byFallback.get(a.getAttribute("href") ?? "");
    const url = id && overrides[id];
    if (url) a.setAttribute("href", url);
  };
  document.addEventListener("pointerdown", swap, true);
  document.addEventListener("click", swap, true);
  document.addEventListener("keydown", (e) => { if ((e as KeyboardEvent).key === "Enter") swap(e); }, true);
}
