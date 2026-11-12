import { useEffect, useMemo, useRef, useState } from "react";
import { X, Download, Share2, Copy } from "lucide-react";
import { InkStamp } from "./InkStamp";
import { STAMP_STYLE, stampDate } from "./stamps";
import { stampStopFor } from "@/data/stamp-stops";
import type { Passport } from "@/lib/passport";
import { CITIES } from "@/data/cities";

type Look = "clear" | "paper" | "night";
const LOOKS: { id: Look; label: string; hint: string }[] = [
  { id: "clear", label: "Sem fundo", hint: "PNG transparente, para pôr por cima de uma foto" },
  { id: "paper", label: "Com fundo", hint: "Página creme de passaporte" },
  { id: "night", label: "Noite", hint: "Fundo escuro, tinta da cidade" },
];
type Format = "story" | "square";
const FORMATS: { id: Format; label: string; hint: string; w: number; h: number }[] = [
  { id: "story", label: "História", hint: "1080×1920, o formato das histórias do Instagram", w: 1080, h: 1920 },
  { id: "square", label: "Quadrada", hint: "1080×1080, mais compacta, para publicações", w: 1080, h: 1080 },
];
const SERIF = "'Cormorant Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif";
const SANS = "Inter, 'Helvetica Neue', Arial, sans-serif";

function cssVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/** Página do passaporte de uma cidade, num único SVG. */
function SharePage({ slug, p, look, ink, format }: { slug: string; p: Passport; look: Look; ink: string; format: Format }) {
  const { w: W, h: H } = FORMATS.find((f) => f.id === format)!;
  const city = CITIES.find((c) => c.slug === slug);
  const cp = p[slug];
  const entries = cp ? Object.entries(cp.stamps).sort((a, b) => a[1].at.localeCompare(b[1].at)) : [];
  const style = STAMP_STYLE[slug] ?? { shape: "circle" as const, motif: "✦", code: "" };
  const wide = style.shape === "oval" || style.shape === "rect";
  const text = look === "paper" ? "#2a2118" : "#f4ecdc";
  const soft = look === "paper" ? "rgba(42,33,24,.55)" : "rgba(244,236,220,.7)";
  const n = entries.length;
  const cols = n <= 4 ? 2 : 3;
  const story = format === "story";
  const cell = story ? (cols === 2 ? 420 : 300) : cols === 2 ? 340 : 230;
  const rows = Math.ceil(Math.min(n, 9) / cols);
  const nameY = story ? 300 : 170;
  const lineY = nameY + 50;
  const gridTop = lineY + (story ? 150 : 55) + (3 - rows) * cell * 0.5;
  const dates = entries.map(([, s]) => s.at).sort();
  const span = dates.length
    ? new Date(dates[0]).toLocaleDateString("pt-PT", { month: "long", year: "numeric" })
    : "";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
      {look === "paper" && <rect width={W} height={H} fill="#efe4cc" />}
      {look === "night" && <rect width={W} height={H} fill="#14110d" />}
      {look !== "clear" && (
        <rect x={44} y={44} width={W - 88} height={H - 88} fill="none" stroke={look === "paper" ? "rgba(42,33,24,.35)" : "rgba(201,164,92,.5)"} strokeWidth={2} />
      )}
      <text x={W / 2} y={nameY} textAnchor="middle" fill={text} fontFamily={SERIF} fontStyle="italic" fontWeight={600} fontSize={city && city.name.length > 8 ? 130 : 160}>
        {city?.name ?? slug}
      </text>
      <line x1={W / 2 - 60} x2={W / 2 + 60} y1={lineY} y2={lineY} stroke={look === "paper" ? "#a3824a" : "#c9a45c"} strokeWidth={2} />
      {entries.slice(0, 9).map(([title, s], i) => {
        const st = stampStopFor(slug, title) ?? { title, label: title, motif: "star" };
        const rowN = Math.min(cols, Math.min(n, 9) - Math.floor(i / cols) * cols);
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = W / 2 + (col - (rowN - 1) / 2) * cell;
        const cy = gridTop + row * cell + cell / 2;
        const size = cell * 0.92;
        const h = wide ? size * (170 / 240) : size;
        const rot = ((i * 47) % 17) - 8;
        return (
          <g key={title} transform={`translate(${cx} ${cy}) rotate(${rot}) translate(${-size / 2} ${-h / 2})`}>
            <InkStamp
              top={st.label.length > 16 ? `${st.label.slice(0, 15).trim()}…` : st.label}
              bottom={city?.name ?? ""}
              center={stampDate(s.at).split(" ").slice(0, 2).join(" ")}
              icon={st.motif}
              ink={ink}
              shape={style.shape}
              size={size}
              height={h}
              tier={s.verified ? "verified" : "plain"}
            />
          </g>
        );
      })}
      <text x={W / 2} y={H - 68} textAnchor="middle" fill={soft} fontFamily={SANS} fontSize={22} fontWeight={600} letterSpacing={7}>
        {span.toUpperCase()} · OPOSTAL.PT
      </text>
    </svg>
  );
}

async function toPng(svg: SVGSVGElement, w: number, h: number): Promise<Blob | null> {
  await document.fonts?.ready;
  let xml = new XMLSerializer().serializeToString(svg);
  xml = xml.replace(/var\(--font-serif\)/g, SERIF.replace(/'/g, "&apos;")).replace(/var\(--font-sans\)/g, SANS.replace(/'/g, "&apos;"));
  const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    c.getContext("2d")!.drawImage(img, 0, 0, w, h);
    return await new Promise((r) => c.toBlob(r, "image/png"));
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function TripShare({ p, onClose }: { p: Passport; onClose: () => void }) {
  const done = useMemo(
    () => CITIES.filter((c) => p[c.slug] && Object.keys(p[c.slug].stamps).length)
      .sort((a, b) => {
        const last = (s: string) => Object.values(p[s].stamps).map((x) => x.at).sort().pop() ?? "";
        return last(b.slug).localeCompare(last(a.slug));
      }),
    [p],
  );
  const [slug, setSlug] = useState(done[0]?.slug ?? "");
  const [look, setLook] = useState<Look>("clear");
  const [format, setFormat] = useState<Format>("story");
  const [busy, setBusy] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [copied, setCopied] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const ink = look === "clear" ? "#f7f0e2" : cssVar(`--stamp-${slug}`, cssVar("--terracotta", "#b5523b"));
  const dims = FORMATS.find((f) => f.id === format)!;

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    const o = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = o; };
  }, [onClose]);

  // Gera a imagem antes do toque, para a partilha no telemóvel não perder o gesto.
  useEffect(() => {
    setBlob(null);
    setCopied("");
    let alive = true;
    const t = setTimeout(async () => {
      const svg = ref.current?.querySelector("svg");
      if (!svg) return;
      setBusy(true);
      const b = await toPng(svg as SVGSVGElement, dims.w, dims.h).catch(() => null);
      if (alive) { setBlob(b); setBusy(false); }
    }, 150);
    return () => { alive = false; clearTimeout(t); };
  }, [slug, look, ink, format, dims]);

  const name = `passaporte-${slug}-${look === "clear" ? "sem-fundo" : look}-${format}.png`;
  const save = () => {
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 30000);
  };
  const share = async () => {
    if (!blob) return;
    const file = new File([blob], name, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], title: "O meu passaporte O Postal" }); } catch { /* cancelado */ }
      return;
    }
    save();
  };
  const canCopy = typeof window !== "undefined" && "ClipboardItem" in window && !!navigator.clipboard?.write;
  const copy = async () => {
    if (!blob) return;
    try {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied("Copiada. Abre a história no Instagram, toca no ecrã e escolhe «Colar».");
    } catch {
      setCopied("O teu telemóvel não deixou copiar. Usa «Guardar imagem».");
    }
  };
  const canShare = typeof navigator !== "undefined" && !!navigator.canShare;

  return (
    <div role="dialog" aria-modal="true" aria-label="Partilhar página do passaporte" className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-full max-w-lg flex-col px-5 pb-10 pt-6">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Partilhar a viagem</p>
          <button type="button" onClick={onClose} aria-label="Fechar" className="flex h-11 w-11 items-center justify-center text-cream/70 hover:text-cream">
            <X className="h-5 w-5" />
          </button>
        </div>
        {done.length === 0 ? (
          <p className="mt-8 text-cream/75">Ainda não tens carimbos para partilhar.</p>
        ) : (
          <>
            <div className="-mx-5 mt-4 flex gap-5 overflow-x-auto px-5 pb-1" role="tablist" aria-label="Cidade">
              {done.map((c) => (
                <button key={c.slug} type="button" role="tab" aria-selected={slug === c.slug} onClick={() => setSlug(c.slug)}
                  className={`min-h-[44px] shrink-0 font-serif text-2xl ${slug === c.slug ? "text-gold underline decoration-gold underline-offset-8" : "text-cream/55"}`}>
                  {c.name}
                </button>
              ))}
            </div>
            <div
              ref={ref}
              className="relative mt-5 w-full overflow-hidden border border-gold/20 [&>svg]:h-auto [&>svg]:w-full"
              style={look === "clear" ? { backgroundImage: "repeating-conic-gradient(rgba(255,255,255,.07) 0 25%, transparent 0 50%)", backgroundSize: "24px 24px" } : undefined}
            >
              <SharePage slug={slug} p={p} look={look} ink={ink} format={format} />
            </div>
            <div className="mt-5 grid grid-cols-2 border-y border-gold/15" role="radiogroup" aria-label="Formato">
              {FORMATS.map((f) => (
                <button key={f.id} type="button" role="radio" aria-checked={format === f.id} onClick={() => setFormat(f.id)}
                  className={`min-h-[52px] font-serif text-lg italic ${format === f.id ? "text-gold" : "text-cream/55"}`}>
                  {f.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 border-b border-gold/15" role="radiogroup" aria-label="Estilo">
              {LOOKS.map((l) => (
                <button key={l.id} type="button" role="radio" aria-checked={look === l.id} onClick={() => setLook(l.id)}
                  className={`min-h-[52px] font-serif text-lg italic ${look === l.id ? "text-gold" : "text-cream/55"}`}>
                  {l.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-center text-xs text-cream/55">{dims.hint} · {LOOKS.find((l) => l.id === look)?.hint}</p>
            <div className="mt-6 flex flex-col gap-3">
              {canCopy && (
                <button type="button" disabled={!blob} onClick={copy}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-gold bg-gold/10 font-serif text-xl italic text-gold disabled:opacity-50">
                  <Copy className="h-4 w-4" aria-hidden /> Copiar para colar na história
                </button>
              )}
              {copied && <p role="status" className="text-center text-sm text-gold/90">{copied}</p>}
              {canShare && (
                <button type="button" disabled={!blob} onClick={share}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-gold/60 font-serif text-xl italic text-gold disabled:opacity-50">
                  <Share2 className="h-4 w-4" aria-hidden /> {busy ? "A preparar…" : "Partilhar"}
                </button>
              )}
              <button type="button" disabled={!blob} onClick={save}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 text-cream/75 underline decoration-gold/40 underline-offset-4 disabled:opacity-50">
                <Download className="h-4 w-4" aria-hidden /> Guardar imagem (.png)
              </button>
            </div>
            {look === "clear" && (
              <p className="mt-4 text-center text-xs text-cream/50">Na história do Instagram, põe uma foto da viagem e cola esta imagem por cima.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
