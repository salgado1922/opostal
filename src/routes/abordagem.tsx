import { SmartImage } from "@/components/SmartImage";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, MotionConfig } from "framer-motion";
import { ArrowRight } from "lucide-react";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";
import { PostalStamp } from "@/components/postal/PostalStamp";
import { PostcardBack } from "@/components/postal/PostcardBack";
import { DashedDivider } from "@/components/postal/DashedDivider";

export const Route = createFileRoute("/abordagem")({
  head: () => ({
    meta: [
      { title: "A nossa abordagem - O Postal" },
      {
        name: "description",
        content: "Como fazemos os guias d'O Postal, e porque é que os fazemos assim.",
      },
      { property: "og:title", content: "A nossa abordagem - O Postal" },
      {
        property: "og:description",
        content: "Como fazemos os guias d'O Postal, e porque é que os fazemos assim.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://opostal.pt/abordagem" },
      { property: "og:image", content: `https://opostal.pt${opostalHorizontalTransparent.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "A nossa abordagem - O Postal" },
      {
        name: "twitter:description",
        content: "Como fazemos os guias d'O Postal, e porque é que os fazemos assim.",
      },
      { name: "twitter:image", content: `https://opostal.pt${opostalHorizontalTransparent.url}` },
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/abordagem" }],
  }),
  component: AbordagemPage,
});

// ---------------------------------------------------------------------------
// IMAGENS - todas as fotos da página vivem aqui para serem fáceis de trocar.
// Substituir os URLs abaixo pelas fotos próprias d'O Postal quando existirem.
// ---------------------------------------------------------------------------
const IMAGES = {
  // Hero: Tower Bridge ao crepúsculo, destino com guia no site.
  hero:
    "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=2000&q=80",
  heroAlt:
    "Tower Bridge em Londres ao crepúsculo, com as luzes refletidas no Tamisa.",

  // Bloco 01 - Testado no terreno: Praga ao pôr-do-sol, destino com guia no site.
  block1:
    "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1400&q=80",
  block1Alt:
    "Praga ao pôr-do-sol vista sobre o rio Vltava, com a cidade antiga em primeiro plano.",

  // Bloco 02 - Sem turistadas: Istambul à hora azul, destino com guia no site.
  block2:
    "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1400&q=80",
  block2Alt:
    "Istambul à hora azul, com a silhueta das mesquitas sobre o Bósforo.",

  // Bloco 03 - Pensado ao teu ritmo: Florença vista do alto, destino com guia no site.
  block3:
    "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1400&q=80",
  block3Alt:
    "Florença vista do alto ao fim da tarde, com o Duomo e os telhados de terracota.",
};

const METHOD_BLOCKS = [
  {
    n: "01",
    title: "Testado no terreno",
    body: "Nenhum roteiro é publicado a partir de uma secretária. Cada cidade é percorrida a pé antes de entrar no site, com os mesmos cafés, as mesmas esquinas e as mesmas distâncias que vais encontrar. Se um percurso não funciona na vida real, reescrevemo-lo até funcionar.",
    image: IMAGES.block1,
    alt: IMAGES.block1Alt,
  },
  {
    n: "02",
    title: "Sem turistadas",
    body: "Não enchemos os dias com aquilo que aparece nas primeiras dez listas da internet. Escolhemos a dedo o que merece o teu tempo e cortamos sem pena o resto. O objetivo não é encher, é que voltes a casa a sentir que viste a cidade, não uma fila de monumentos.",
    image: IMAGES.block2,
    alt: IMAGES.block2Alt,
  },
  {
    n: "03",
    title: "Pensado ao teu ritmo",
    body: "Os guias são desenhados para viajar devagar. Damos a ordem que faz sentido a pé, dizemos a que horas vale a pena chegar a cada sítio, e deixamos espaço para o improviso. Tu mandas no dia, o guia só te tira o peso de decidir tudo.",
    image: IMAGES.block3,
    alt: IMAGES.block3Alt,
  },
];

function AbordagemPage() {
  return (
    <MotionConfig reducedMotion="user">
    <main className="bg-twilight-radial min-h-screen overflow-x-hidden">
      <TopNav />

      {/* Hero full-bleed com imagem de fundo */}
      <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden">
        <SmartImage
          src={IMAGES.hero}
          alt={IMAGES.heroAlt}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          loading="eager"
        />
        {/* Gradiente escuro para contraste do texto branco */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-background/85 via-background/55 to-background"
        />

        {/* Carimbo postal decorativo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-28 hidden h-36 w-36 items-center justify-center rounded-full border border-dashed border-gold/60 opacity-25 md:flex md:right-12 md:top-32 md:h-44 md:w-44"
        >
          <div className="flex h-[82%] w-[82%] flex-col items-center justify-center rounded-full border border-gold/50 text-center">
            <span className="font-serif text-[10px] uppercase tracking-[0.42em] text-gold">
              O Postal
            </span>
            <span className="mt-2 text-[9px] uppercase tracking-[0.3em] text-gold/80">
              MMXXVI
            </span>
          </div>
        </div>

        {/* Selo postal decorativo */}
        <div className="pointer-events-none absolute left-6 top-32 hidden md:block md:left-12">
          <PostalStamp code="OP" label="O Postal" value="€0,85" rotate={-12} />
        </div>

        <div className="relative mx-auto w-full max-w-4xl px-6 pb-24 pt-40 text-center md:px-10 md:pb-32 md:pt-48">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-6 text-[11px] uppercase tracking-[0.42em] text-gold">
              O Postal
            </p>
            <h1
              className="text-gradient-gold font-serif leading-[1.02]"
              style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
            >
              A nossa abordagem
            </h1>
            <div className="mx-auto my-8 h-px w-24 bg-gold/70" />
            <p className="mx-auto max-w-2xl text-lg text-cream/90 md:text-xl">
              Como fazemos os guias d'O Postal, e porque é que os fazemos assim.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[640px] text-center"
        >
          <p className="text-cream/85 font-serif text-xl leading-relaxed md:text-2xl">
            O Postal nasceu de uma frustração simples: quase todos os guias de viagem dizem para ver tudo,
            e quase nenhum ajuda a ver bem. Os nossos roteiros existem para o contrário. Menos pontos,
            mais sentido. Tempo para parar num café sem culpa de estar a perder outra coisa qualquer.
          </p>
          {/* Divisor tracejado, como na linha das costas de um postal */}
          <div
            aria-hidden="true"
            className="mx-auto mt-10 h-px w-40 border-t border-dashed border-gold/60"
          />
        </motion.div>
      </section>

      {/* Pull-quote */}
      <section className="px-6 pb-24 pt-4 md:px-10 md:pb-32">
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p
            className="text-gradient-gold font-serif italic leading-[1.05]"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.25rem)" }}
          >
            "Menos pontos, mais sentido."
          </p>
        </motion.blockquote>
      </section>

      {/* Method blocks (zigue-zague editorial) */}
      <section className="px-6 pb-28 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-center text-[11px] uppercase tracking-[0.35em] text-gold/80">
            O nosso método
          </p>
          <div className="flex flex-col gap-20 md:gap-28">
            {METHOD_BLOCKS.map((b, i) => (
              <div key={`${b.n}-wrap`} className="flex flex-col gap-20 md:gap-28">
              {i > 0 && <DashedDivider withStamp className="mx-auto w-full max-w-3xl" />}
              <motion.article
                key={b.n}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? "md:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="relative overflow-hidden rounded-2xl border border-gold/15 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
                  <SmartImage
                    src={b.image}
                    alt={b.alt}
                    loading="lazy"
                    className="aspect-[4/5] h-full w-full object-cover md:aspect-[5/6]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"
                  />
                </figure>

                <div className="relative">
                  {/* Numeral grande fantasma em dourado */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 -left-2 select-none font-serif font-bold leading-none text-gold/10 md:-top-16 md:-left-6"
                    style={{ fontSize: "clamp(8rem, 16vw, 14rem)" }}
                  >
                    {b.n}
                  </span>
                  <div className="relative">
                    <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-gold">
                      {b.n}
                    </p>
                    <h2 className="font-serif text-3xl text-cream md:text-4xl">
                      {b.title}
                    </h2>
                    <div className="my-6 h-px w-14 bg-gold/60" />
                    <p className="text-base text-cream/80 leading-relaxed md:text-lg">
                      {b.body}
                    </p>
                  </div>
                </div>
              </motion.article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing band */}
      <section className="relative border-t border-dashed border-gold/40 bg-plum/40 px-6 py-24 md:px-10 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl"
        >
          <PostcardBack
            city="O POSTAL"
            stampCode="OP"
            message={
              <>
                Menos pontos, mais sentido. Cada guia é percorrido e verificado
                antes de o publicarmos — é essa a promessa d'O Postal.
              </>
            }
            signature="O Postal"
            addressLines={[
              "Para: viajante curioso",
              "Um café qualquer, hora dourada",
              "Próxima paragem a teu gosto",
            ]}
          />
          <div className="mt-12 flex justify-center">
            <Link
              to="/"
              hash="cidades"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[12px] uppercase tracking-[0.25em] text-[oklch(0.18_0.04_285)] shadow-[0_18px_40px_-18px_rgba(200,119,46,0.7)] transition-all hover:bg-gold-soft hover:shadow-[0_22px_50px_-18px_rgba(216,162,74,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Ver os guias
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-gold/10 px-6 py-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs text-cream/55">
            O Postal. Guias editoriais de cidades europeias, feitos com calma e partilhados com gosto.
          </p>
        </div>
      </footer>
    </main>
    </MotionConfig>
  );
}

function TopNav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/" aria-label="O Postal" className="ml-1 inline-flex items-center transition hover:opacity-85">
          <SmartImage src={opostalHorizontalTransparent.url} alt="O Postal" className="h-8 w-auto object-contain md:h-10" />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            hash="cidades"
            className="text-xs uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-cream"
          >
            Cidades
          </Link>
          <Link
            to="/abordagem"
            className="text-xs uppercase tracking-[0.2em] text-cream transition-colors"
          >
            A nossa abordagem
          </Link>
        </div>
      </div>
    </nav>
  );
}