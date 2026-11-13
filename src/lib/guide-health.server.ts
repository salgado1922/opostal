import type { HealthResult } from "./admin-workflow";

// Only inspect public editorial pages and approved image hosts, never arbitrary admin input.
export async function inspectGuide(city: string): Promise<HealthResult> {
  const findings: HealthResult["findings"] = [];
  const base = "https://opostal.pt";
  const checkedAt = new Date().toISOString();
  try {
    const response = await fetch(`${base}/${city}`, { redirect: "manual", signal: AbortSignal.timeout(15000) });
    if (!response.ok) return { checkedAt, findings: [{ label: "Página publicada", status: "error", detail: `Resposta ${response.status}` }] };
    const html = await response.text();
    findings.push({ label: "Página publicada", status: "ok", detail: `Resposta ${response.status}` });
    const image = html.match(/<img\b[^>]*src="([^"]+)"/i)?.[1]?.replaceAll("&amp;", "&");
    if (image) {
      const url = new URL(image, base);
      if (["opostal.pt", "images.unsplash.com", "upload.wikimedia.org"].includes(url.hostname) && url.protocol === "https:") {
        try {
          const img = await fetch(url, { method: "HEAD", redirect: "manual", signal: AbortSignal.timeout(10000) });
          findings.push({ label: "Imagem principal", status: img.ok ? "ok" : "attention", detail: img.ok ? "Disponível" : `Resposta ${img.status}; confirmar manualmente` });
        } catch { findings.push({ label: "Imagem principal", status: "attention", detail: "Sem resposta; confirmar manualmente" }); }
      } else findings.push({ label: "Imagem principal", status: "attention", detail: "Origem não verificada automaticamente" });
    } else findings.push({ label: "Imagem principal", status: "error", detail: "Não encontrada" });
    const links = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map(m => m[1]).filter(p => !/\.(css|js|jpg|png|svg|ico|webmanifest)$/.test(p));
    const paths = [...new Set(links)].filter(p => p !== "/" && p !== `/${city}` && !p.startsWith("//") && !p.startsWith("/auth")).slice(0, 12);
    const bad: string[] = [];
    for (const path of paths) {
      try { const link = await fetch(new URL(path, base), { method: "HEAD", redirect: "manual", signal: AbortSignal.timeout(5000) }); if (link.status >= 400) bad.push(`${path} (${link.status})`); }
      catch { bad.push(`${path} (sem resposta)`); }
    }
    findings.push({ label: "Ligações internas", status: bad.length ? "attention" : "ok", detail: bad.length ? bad.join(", ") : `${paths.length} ligações verificadas` });
    const markers = (html.match(/\[VERIFICAR\]/g) ?? []).length;
    findings.push({ label: "Informações por confirmar", status: markers ? "attention" : "ok", detail: markers ? `${markers} marcas [VERIFICAR]` : "Sem marcas [VERIFICAR]" });
    findings.push({ label: "Booking e sites externos", status: "attention", detail: "Testar em Afiliados: bloqueios automáticos não comprovam um link partido." });
  } catch { findings.push({ label: "Página publicada", status: "error", detail: "Não foi possível contactar o site publicado" }); }
  return { checkedAt, findings };
}