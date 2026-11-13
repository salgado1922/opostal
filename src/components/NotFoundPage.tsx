import { SmartImage } from "@/components/SmartImage";
import { Link } from "@tanstack/react-router";
import { CITIES } from "@/data/cities";

export function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">Erro 404 · Página não encontrada</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-cream md:text-6xl">
          Este postal perdeu-se no correio.
        </h1>
        <p className="mt-4 max-w-xl text-base text-cream/70">
          A página que procuras não existe ou mudou de morada. Escolhe uma cidade e segue viagem.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CITIES.map((c) => (
            <li key={c.slug}>
              <a href={c.to ?? `/${c.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-[2px] border border-gold/15">
                  <SmartImage src={c.cover} alt={c.name} sizes="(max-width: 640px) 50vw, 300px" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="mt-2 font-serif text-lg text-cream group-hover:text-gold">{c.name}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-cream/50">{c.country}</p>
              </a>
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className="mt-10 inline-flex items-center justify-center rounded-[2px] bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Voltar à homepage
        </Link>
      </div>
    </main>
  );
}

