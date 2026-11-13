import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronDown, LogOut, RefreshCw, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { listItineraryRequests } from "@/lib/requests.functions";
import { getAdminOverview, resumeAdminAI } from "@/lib/admin.functions";
import { REQUEST_STATES } from "@/lib/admin-workflow";
import { RequestEditor } from "@/components/admin/RequestEditor";
import { GuideHealth } from "@/components/admin/GuideHealth";
import { AdminResults } from "@/components/admin/AdminResults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [
    { title: "Painel de administração | O Postal" },
    { name: "description", content: "Área privada de gestão dos pedidos, revisão dos guias e resultados do O Postal." },
    { property: "og:title", content: "Painel de administração | O Postal" },
    { property: "og:description", content: "Área privada de gestão do O Postal." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }), component: AdminPage,
});

function AdminPage() {
  const fetchRequests = useServerFn(listItineraryRequests);
  const overview = useServerFn(getAdminOverview);
  const resume = useServerFn(resumeAdminAI);
  const [tab, setTab] = useState("pedidos");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");
  const requests = useQuery({ queryKey: ["itinerary-requests"], queryFn: () => fetchRequests() });
  const info = useQuery({ queryKey: ["admin-overview"], queryFn: () => overview() });
  const rows = requests.data ?? [];
  const visible = rows.filter(r => (filter === "todos" || r.status === filter) && `${r.nome} ${r.email} ${r.destino}`.toLocaleLowerCase("pt-PT").includes(search.toLocaleLowerCase("pt-PT")));
  const error = requests.error || info.error;
  return <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-8"><div className="mx-auto max-w-6xl">
    <header className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-7"><div><p className="mb-2 text-xs uppercase text-gold">Área privada · O Postal</p><h1 className="font-serif text-4xl">Mesa de trabalho</h1></div><nav className="flex flex-wrap gap-2"><Button variant="ghost" asChild><Link to="/passaportes">Passaportes</Link></Button><Button variant="ghost" asChild><Link to="/afiliados">Afiliados</Link></Button><Button variant="outline" aria-label="Atualizar painel" title="Atualizar painel" size="icon" onClick={() => { void requests.refetch(); void info.refetch(); }}><RefreshCw /></Button><Button variant="ghost" title="Sair da conta" aria-label="Sair da conta" size="icon" onClick={async () => { await supabase.auth.signOut(); window.location.href = "/auth"; }}><LogOut /></Button></nav></header>
    <div role="tablist" aria-label="Secções do painel" className="mt-6 flex overflow-x-auto border-b border-border">{[["pedidos", "Pedidos"], ["saude", "Saúde dos guias"], ["resultados", "Resultados"]].map(([id, label]) => <Button key={id} role="tab" aria-selected={tab === id} variant="ghost" className={`h-12 rounded-none border-b-2 ${tab === id ? "border-gold text-gold" : "border-transparent text-muted-foreground"}`} onClick={() => setTab(id)}>{label}</Button>)}</div>
    {error ? <p role="alert" className="mt-8 text-destructive">{error instanceof Error && /forbidden/i.test(error.message) ? "Esta conta não tem permissões de administrador." : "Não foi possível carregar o painel. Tenta atualizar."}</p> : requests.isLoading || info.isLoading ? <p className="mt-8 text-muted-foreground">A carregar…</p> : <>
      {tab === "pedidos" && <section className="mt-8">
        <div className="grid grid-cols-2 gap-4 border-b border-border pb-6 sm:grid-cols-4">{Object.entries(REQUEST_STATES).map(([key, label]) => <div key={key}><p className="font-serif text-3xl text-gold">{rows.filter(r => r.status === key).length}</p><p className="text-xs text-muted-foreground">{label}</p></div>)}</div>
        {info.data?.ai?.blocked && <div className="mt-6 border-y border-border py-4"><p role="alert" className="text-sm text-destructive">{info.data.ai.message}</p><Button variant="outline" className="mt-3" onClick={async () => { try { await resume(); await info.refetch(); toast.success("Podes iniciar um novo pedido de preparação."); } catch { toast.error("Não foi possível retomar."); } }}>Retomar após resolver o acesso à IA</Button></div>}
        <div className="my-6 flex flex-wrap gap-3"><label className="relative min-w-0 flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input aria-label="Pesquisar pedidos" placeholder="Nome, email ou destino" className="h-11 pl-9" value={search} onChange={e => setSearch(e.target.value)} /></label><select aria-label="Filtrar estado" value={filter} onChange={e => setFilter(e.target.value)} className="h-11 border border-input bg-background px-3 text-sm"><option value="todos">Todos os estados</option>{Object.entries(REQUEST_STATES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></div>
        {!visible.length && <p className="border-y border-border py-12 text-center text-muted-foreground">{rows.length ? "Nenhum pedido corresponde à pesquisa." : "Ainda não há pedidos."}</p>}
        <ul className="space-y-4">{visible.map(r => <li key={r.id} className="overflow-hidden rounded-sm border border-border"><Button variant="ghost" aria-expanded={expanded === r.id} className="h-auto w-full justify-between whitespace-normal rounded-none p-5 text-left" onClick={() => setExpanded(expanded === r.id ? null : r.id)}><span className="min-w-0 flex-1"><span className="block break-words font-medium">{r.nome || "Sem nome"} · {r.destino || "Destino por definir"}</span><span className="block break-all text-xs text-muted-foreground">{r.email}</span></span><span className="ml-3 shrink-0 text-right"><span className="block text-xs text-gold">{REQUEST_STATES[r.status]}</span><span className="block text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("pt-PT")}</span>{r.delivery_date && <span className="block text-xs text-muted-foreground">Entrega: {new Date(`${r.delivery_date}T12:00:00`).toLocaleDateString("pt-PT")}</span>}</span><ChevronDown className={`ml-3 ${expanded === r.id ? "rotate-180" : ""}`} /></Button>{expanded === r.id && <RequestEditor request={r} onSaved={() => { void requests.refetch(); void info.refetch(); }} />}</li>)}</ul>
      </section>}
      {tab === "saude" && <GuideHealth rows={info.data?.health ?? []} onSaved={() => { void info.refetch(); }} />}
      {tab === "resultados" && <AdminResults metrics={info.data?.metrics ?? []} requests={rows} />}
    </>}
    <Button asChild variant="link" className="mt-12"><Link to="/">← Voltar ao site</Link></Button>
  </div></main>;
}