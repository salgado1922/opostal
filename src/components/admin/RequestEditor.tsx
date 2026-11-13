import { useState, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Mail, Save, Wand, Square, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { saveRequestWorkflow } from "@/lib/admin.functions";
import { REQUEST_STATES, REVIEW_ITEMS, workflowSchema } from "@/lib/admin-workflow";
import type { ItineraryRequest } from "@/lib/requests.functions";

export function RequestEditor({ request: r, onSaved }: { request: ItineraryRequest; onSaved: () => void }) {
  const [status, setStatus] = useState(r.status);
  const [notes, setNotes] = useState(r.admin_notes);
  const [date, setDate] = useState(r.delivery_date ?? "");
  const [proposal, setProposal] = useState(r.proposal);
  const [checks, setChecks] = useState(r.review_checks ?? {});
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const abort = useRef<AbortController | null>(null);
  const save = useServerFn(saveRequestWorkflow);
  const fields = [["Destino", r.destino], ["Datas", r.datas], ["Dias / pessoas", `${r.dias || "—"} / ${r.pessoas || "—"}`], ["Orçamento", r.orcamento], ["Ritmo", r.ritmo], ["Interesses", r.interesses], ["Restrições", r.restricoes], ["Alojamento", r.alojamento], ["Partida", r.partida], ["Observações", r.observacoes]];
  async function persist() {
    setError("");
    const parsed = workflowSchema.safeParse({ id: r.id, status, admin_notes: notes, delivery_date: date || null, proposal, review_checks: checks });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Confirma os campos."); return; }
    setSaving(true);
    try { await save({ data: parsed.data }); toast.success("Pedido guardado."); onSaved(); }
    catch (e) { setError(e instanceof Error ? e.message : "Não foi possível guardar."); }
    finally { setSaving(false); }
  }
  async function generate() {
    setBusy(true); setError("");
    const controller = new AbortController(); abort.current = controller;
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) throw new Error("Inicia sessão novamente.");
      const response = await fetch("/api/public/admin-proposal", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${data.session.access_token}` }, body: JSON.stringify({ id: r.id }), signal: controller.signal });
      if (!response.ok) { const body = await response.json(); throw new Error(body.error || "Não foi possível preparar."); }
      if (!response.body) throw new Error("Não foi recebida uma proposta.");
      const reader = response.body.getReader(); const decoder = new TextDecoder(); let text = "";
      while (true) { const chunk = await reader.read(); if (chunk.done) break; text += decoder.decode(chunk.value, { stream: true }); setProposal(text); }
      text += decoder.decode();
      if (!text.trim() || text.includes("[ERRO]")) throw new Error(text.split("[ERRO]")[1]?.trim() || "A IA não devolveu uma proposta.");
      setProposal(text); setChecks({}); toast.success("Proposta preparada. Revê e guarda o pedido.");
    } catch (e) { setError(controller.signal.aborted ? "Preparação interrompida; revê o texto parcial antes de guardar." : e instanceof Error ? e.message : "Não foi possível preparar."); }
    finally { setBusy(false); abort.current = null; }
  }
  return <div className="grid gap-8 border-t border-border p-5 lg:grid-cols-[1fr_1.5fr]">
    <div className="min-w-0 space-y-5">
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">{fields.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="whitespace-pre-wrap break-words text-sm">{value}</dd></div>)}</dl>
      <label className="block text-sm">Estado<select aria-label="Estado do pedido" className="mt-2 h-11 w-full border border-input bg-background px-3" value={status} onChange={e => setStatus(e.target.value as typeof status)}>{Object.entries(REQUEST_STATES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      <label className="block text-sm">Entrega prevista<Input aria-label="Entrega prevista" className="mt-2 h-11" type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
      <label className="block text-sm">Notas privadas<Textarea aria-label="Notas privadas" className="mt-2" value={notes} maxLength={10000} onChange={e => setNotes(e.target.value)} /></label>
      <Button variant="outline" asChild><a href={`mailto:${r.email}?subject=${encodeURIComponent(`O teu roteiro — ${r.destino}`)}`}><Mail />Responder por email</a></Button>
    </div>
    <div className="min-w-0 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-serif text-2xl">Proposta de roteiro</h3>{busy ? <Button variant="outline" onClick={() => abort.current?.abort()}><Square />Parar</Button> : <Button variant="outline" onClick={generate} disabled={!!proposal.trim()}><Wand />Preparar com IA</Button>}</div>
      {!proposal && <p className="text-xs text-muted-foreground">Rascunho sujeito à tua revisão. A preparação usa créditos Lovable AI.</p>}
      <Textarea aria-label="Proposta de roteiro" className="min-h-96 font-mono text-sm leading-relaxed" value={proposal} maxLength={60000} disabled={busy} onChange={e => setProposal(e.target.value)} />
      {proposal && <div className="flex flex-wrap gap-2"><Button variant="ghost" onClick={async () => { try { await navigator.clipboard.writeText(proposal); toast.success("Texto copiado."); } catch { toast.error("Não foi possível copiar."); } }}><Copy />Copiar texto</Button><Button variant="ghost" disabled={busy} onClick={() => { if (window.confirm("Limpar a proposta para preparar outra? O texto guardado mantém-se até guardares novamente.")) setProposal(""); }}>Limpar proposta</Button></div>}
      <fieldset><legend className="mb-3 text-sm text-gold">Antes de enviar</legend><div className="grid gap-3 sm:grid-cols-2">{Object.entries(REVIEW_ITEMS).map(([key, label]) => <label key={key} className="flex min-h-8 items-center gap-2 text-sm"><input type="checkbox" checked={!!checks[key]} onChange={e => setChecks({ ...checks, [key]: e.target.checked })} />{label}</label>)}</div></fieldset>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button disabled={busy || saving} onClick={persist}><Save />{saving ? "A guardar…" : "Guardar pedido"}</Button>
    </div>
  </div>;
}