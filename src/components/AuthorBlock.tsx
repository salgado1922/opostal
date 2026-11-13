import { AUTHOR } from "@/data/author";
import SmartImage from "@/components/SmartImage";

export function AuthorBlock({ align = "center" }: { align?: "center" | "left" }) {
  const hasPhoto = !!AUTHOR.foto;
  const c0 = align === "center" ? "md:grid-cols-[180px_1fr] md:text-left text-center" : "md:grid-cols-[180px_1fr] text-left";
  const c = hasPhoto ? c0 : align === "center" ? "text-center" : "text-left";
  return (
    <div className={`mt-10 grid items-center gap-8 border-t border-gold/20 pt-10 ${c}`}>
      {hasPhoto && (
        <div className="mx-auto aspect-[4/5] w-40 overflow-hidden border border-gold/30 md:w-full">
          <SmartImage
            src={AUTHOR.foto}
            alt={AUTHOR.fotoAlt}
            width={768}
            height={960}
            sizes="(max-width: 768px) 160px, 180px"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div>
        <p className="font-serif text-2xl text-cream">{AUTHOR.nomes}</p>
        <p className="mt-2 leading-relaxed text-muted-foreground">{AUTHOR.bio}</p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-gold/80">{AUTHOR.cidadesVisitadas} cidades visitadas</p>
        <p className="mt-4 font-serif italic leading-relaxed text-cream/85">{AUTHOR.comoTestamos}</p>
      </div>
    </div>
  );
}
