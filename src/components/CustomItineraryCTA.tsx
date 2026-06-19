import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

/**
 * Bloco discreto, ao fim da página de cidade, a oferecer um roteiro
 * personalizado para essa cidade. Liga ao bloco da homepage por agora;
 * será repointado para a página dedicada quando existir.
 */
export function CustomItineraryCTA({ city }: { city: string }) {
  return (
    <section className="px-6 pb-20 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="glass mx-auto max-w-3xl rounded-2xl border border-gold/20 px-8 py-10 text-center"
      >
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">
          À tua medida
        </p>
        <h2 className="font-serif text-2xl text-cream md:text-3xl">
          Queres um roteiro só para ti?
        </h2>
        <p className="mt-4 text-cream/75 leading-relaxed">
          Este guia é o mesmo para toda a gente, e serve muita viagem. Mas às
          vezes queres algo desenhado ao teu ritmo, com as tuas datas e o que
          mais gostas de fazer. Se for o teu caso, posso preparar um roteiro
          só teu.
        </p>
        <a
          href={`/roteiro-personalizado?destino=${encodeURIComponent(city)}`}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:border-gold/70 hover:bg-gold/[0.08]"
        >
          Pedir roteiro personalizado para {city}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </motion.div>
    </section>
  );
}

/**
 * Link de texto discreto, secundário, para colocar logo abaixo do bloco
 * principal do Hero da página de cidade.
 */
export function CustomItineraryHeroLink({ city }: { city?: string } = {}) {
  const href = city
    ? `/roteiro-personalizado?destino=${encodeURIComponent(city)}`
    : "/roteiro-personalizado";
  return (
    <div className="relative z-10 mt-6 flex justify-center">
      <a
        href={href}
        className="text-[11px] uppercase tracking-[0.3em] text-cream/75 transition-colors hover:text-gold"
      >
        Pedir roteiro personalizado
      </a>
    </div>
  );
}