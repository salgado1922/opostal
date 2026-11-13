import { AUTHOR } from "@/data/author";

export function AuthorBlock({ align = "center" }: { align?: "center" | "left" }) {
  const c = align === "center" ? "md:grid-cols-[180px_1fr] md:text-left text-center" : "md:grid-cols-[180px_1fr] text-left";
  return (
    <div className={`mt-10 grid items-center gap-8 border-t border-gold/20 pt-10 ${c}`}>
      <div className="mx-auto aspect-[4/5] w-40 overflow-hidden border border-gold/30 bg-cream/5 md:w-full">
        {AUTHOR.foto ? (
          <img src={AUTHOR.foto} alt={AUTHOR.fotoAlt} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-[11px] uppercase tracking-[0.25em] text-gold/60">[FOTO]</div>
        )}
      </div>
      <div>
        <p className="font-serif text-2xl text-cream">{AUTHOR.nomes}</p>
        <p className="mt-2 leading-relaxed text-muted-foreground">{AUTHOR.bio}</p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-gold/80">{AUTHOR.cidadesVisitadas} cidades visitadas</p>
        <p className="mt-4 font-serif italic leading-relaxed text-cream/85">{AUTHOR.comoTestamos}</p>
      </div>
    </div>
  );
}
