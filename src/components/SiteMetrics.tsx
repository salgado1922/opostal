import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { metricCity } from "@/lib/admin-workflow";
import { CITIES } from "@/data/cities";
import { supabase } from "@/integrations/supabase/client";

export function SiteMetrics() {
  const path = useRouterState({ select: state => state.location.pathname });
  useEffect(() => {
    const city = metricCity(path, CITIES.map(c => c.slug));
    if (!city) return;
    let alive = true;
    const record = (kind: "view" | "booking") => {
      if (navigator.webdriver) return;
      void fetch("/api/public/metrics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ city, kind }), keepalive: true }).catch(() => {});
    };
    let lastClick = 0;
    const clicked = (event: MouseEvent) => {
      const a = event.target instanceof Element ? event.target.closest("a") : null;
      if (!a || !a.rel.includes("sponsored")) return;
      try {
        const url = new URL(a.href);
        if (!/(^|\.)(booking\.com|kqzyfj\.com|anrdoezrs\.net|tkqlhce\.com|dpbolvw\.net|jdoqocy\.com)$/.test(url.hostname)) return;
        if (Date.now() - lastClick < 1000) return;
        lastClick = Date.now(); record("booking");
      } catch { /* Invalid URLs are not counted. */ }
    };
    void supabase.auth.getUser().then(async ({ data }) => {
      const { data: admin } = data.user ? await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" }) : { data: false };
      if (!alive || admin) return;
      record("view"); document.addEventListener("click", clicked, true);
    });
    return () => { alive = false; document.removeEventListener("click", clicked, true); };
  }, [path]);
  return null;
}