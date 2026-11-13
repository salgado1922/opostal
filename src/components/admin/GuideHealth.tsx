import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, RefreshCw, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CITIES } from "@/data/cities";
import { checkGuideHealth, markGuideReviewed } from "@/lib/admin.functions";
import type { HealthResult } from "@/lib/admin-workflow";
import type { Json } from "@/integrations/supabase/types";

export function GuideHealth({ rows, onSaved }: { rows: { city: string; checked_at: string | null; reviewed_at: string | null; result: Json }[]; onSaved: () => void }) {
  const check = useServerFn(checkGuideHealth);
  const review = useServerFn(markGuideReviewed);
  const [busy, setBusy] = useState<string | null>(null);
  async function run(city: string, kind: "check" | "review") {
    setBusy(city);
    try { if (kind === "check") await check({ data: { city } }); else await review({ data: { city } }); onSaved(); toast.success(kind === "check" ? "Verificação guardada." : "Revisão registada."); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Não foi possível verificar."); }
    finally { setBusy(null); }
  }
  return <section className="mt-8">
    <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="font-serif text-3xl">Saúde dos guias</h2><Button asChild variant="link"><Link to="/afiliados">Gerir e testar Booking<ExternalLink /></Link></Button></div>
    <p className="mt-2 text-sm text-muted-foreground">Verificação do site publicado. Preços e horários exigem revisão nas fontes oficiais.</p>
    <div className="mt-6 divide-y divide-border">{CITIES.map(city => {
      const row = rows.find(r => r.city === city.slug);
      const result = row?.result as HealthResult | undefined;
      const findings = Array.isArray(result?.findings) ? result.findings : [];
      const outdated = !row?.reviewed_at || Date.now() - new Date(row.reviewed_at).getTime() > 90 * 86400000;
      return <div key={city.slug} className="grid gap-4 py-6 md:grid-cols-[160px_1fr_auto]">
        <div><a href={`/${city.slug}`} className="font-serif text-2xl underline-offset-4 hover:underline">{city.name}</a><p className="mt-1 text-xs text-muted-foreground">{row?.checked_at ? `Verificado: ${new Date(row.checked_at).toLocaleDateString("pt-PT")}` : "Ainda não verificado"}</p></div>
        <div className="space-y-2 text-sm">{findings.map((f, i) => <p key={i} className={f.status === "error" ? "text-destructive" : f.status === "attention" ? "text-gold" : "text-foreground"}><span className="font-medium">{f.label}:</span> {f.detail}</p>)}<p className="text-muted-foreground">{outdated ? "Revisão de preços e horários pendente" : `Informações revistas: ${new Date(row?.reviewed_at ?? "").toLocaleDateString("pt-PT")}`}</p></div>
        <div className="flex flex-wrap gap-2 md:flex-col"><Button variant="outline" disabled={busy !== null} onClick={() => run(city.slug, "check")}><RefreshCw className={busy === city.slug ? "animate-spin" : ""} />{busy === city.slug ? "A verificar…" : "Verificar"}</Button><Button variant="ghost" disabled={busy !== null} onClick={() => run(city.slug, "review")}><Check />Marcar como revisto</Button></div>
      </div>;
    })}</div>
  </section>;
}