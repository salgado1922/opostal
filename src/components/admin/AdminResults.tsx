import { CITIES } from "@/data/cities";
import type { ItineraryRequest } from "@/lib/requests.functions";

export function AdminResults({ metrics, requests }: { metrics: { day: string; city: string; views: number; booking_clicks: number }[]; requests: ItineraryRequest[] }) {
  const recent = requests.filter(r => new Date(r.created_at).getTime() >= Date.now() - 30 * 86400000);
  const views = metrics.reduce((n, r) => n + r.views, 0);
  const clicks = metrics.reduce((n, r) => n + r.booking_clicks, 0);
  return <section className="mt-8">
    <h2 className="font-serif text-3xl">Resultados úteis</h2><p className="mt-2 text-sm text-muted-foreground">Últimos 30 dias · Contagens observadas, sem números simulados. Visitas e cliques medidos a partir de 13/11/2026; não representam visitantes únicos. A tua conta admin não é contada.</p>
    <div className="my-8 grid grid-cols-3 divide-x divide-border border-y border-border py-5">{[[views, "Visitas aos guias"], [clicks, "Cliques Booking"], [recent.length, "Pedidos recebidos"]].map(([n, label]) => <div key={label} className="px-3 text-center"><p className="font-serif text-4xl text-gold">{n}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>)}</div>
    <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-border text-muted-foreground"><th className="py-3">Cidade</th><th className="px-3">Visitas</th><th className="px-3">Booking</th><th className="px-3">Pedidos</th></tr></thead><tbody>{CITIES.map(c => { const rows = metrics.filter(r => r.city === c.slug); return <tr key={c.slug} className="border-b border-border"><th className="py-4 font-normal">{c.name}</th><td className="px-3">{rows.reduce((n, r) => n + r.views, 0)}</td><td className="px-3">{rows.reduce((n, r) => n + r.booking_clicks, 0)}</td><td className="px-3">{recent.filter(r => r.destino?.trim().toLocaleLowerCase("pt-PT") === c.name.toLocaleLowerCase("pt-PT")).length}</td></tr>; })}</tbody></table></div>
    <p className="mt-5 text-xs text-muted-foreground">Os cliques não comprovam reservas. Receitas e reservas Booking não estão ligadas a este painel.</p>
  </section>;
}