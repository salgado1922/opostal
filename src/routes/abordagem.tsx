import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";

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
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/abordagem" }],
  }),
  component: AbordagemPage,
});

const METHOD_BLOCKS = [
  {
    n: "01",
    title: "Testado no terreno",
    body: "Nenhum roteiro é publicado a partir de uma secretária. Cada cidade é percorrida a pé antes de entrar no site, com os mesmos cafés, as mesmas esquinas e as mesmas distâncias que vais encontrar. Se um percurso não funciona na vida real, reescrevemo-lo até funcionar.",
  },
  {
    n: "02",
    title: "Sem turistadas",
    body: "Não enchemos os dias com aquilo que aparece nas primeiras dez listas da internet. Escolhemos a dedo o que merece o teu tempo e cortamos sem pena o resto. O objetivo não é encher, é que voltes a casa a sentir que viste a cidade, não uma fila de monumentos.",
  },
  {
    n: "03",
    title: "Pensado ao teu ritmo",
    body: "Os guias são desenhados para viajar devagar. Damos a ordem que faz sentido a pé, dizemos a que horas vale a pena chegar a cada sítio, e deixamos espaço para o improviso. Tu mandas no dia, o guia só te tira o peso de decidir tudo.",
  },
];

function AbordagemPage() {
  return (
    <main className="bg-twilight-radial min-h-screen overflow-x-hidden">
      <TopNav />

      {/* Hero */}
      <section className="relative px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-gold">
              O Postal
            </p>
            <h1
              className="text-gradient-gold font-serif leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              A nossa abordagem
            </h1>
            <div className="mx-auto my-7 h-px w-24 bg-gold/70" />
            <p className="text-lg text-cream/85 md:text-xl">
              Como fazemos os guias d'O Postal, e porque é que os fazemos assim.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 pb-20 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass mx-auto max-w-3xl rounded-2xl px-8 py-10 text-center"
        >
          <p className="text-cream/80 leading-relaxed md:text-lg">
            O Postal nasceu de uma frustração simples: quase todos os guias de viagem dizem para ver tudo,
            e quase nenhum ajuda a ver bem. Os nossos roteiros existem para o contrário. Menos pontos,
            mais sentido. Tempo para parar num café sem culpa de estar a perder outra coisa qualquer.
          </p>
        </motion.div>
      </section>

      {/* Method blocks */}
      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-center text-[11px] uppercase tracking-[0.35em] text-gold/80">
            O nosso método
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {METHOD_BLOCKS.map((b, i) => (
              <motion.article
                key={b.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="glass rounded-2xl border border-gold/15 px-7 py-8"
              >
                <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-gold">
                  {b.n}
                </p>
                <h2 className="font-serif text-2xl text-cream md:text-[1.65rem]">
                  {b.title}
                </h2>
                <div className="my-5 h-px w-12 bg-gold/50" />
                <p className="text-sm text-cream/75 leading-relaxed">{b.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing + CTA */}
      <section className="px-6 pb-32 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm text-cream/70 leading-relaxed md:text-base">
            Cada guia é percorrido e verificado antes de o publicarmos. É essa a promessa d'O Postal.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              hash="cidades"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[12px] uppercase tracking-[0.25em] text-[oklch(0.18_0.04_285)] shadow-[0_18px_40px_-18px_rgba(200,119,46,0.7)] transition-all hover:bg-gold-soft hover:shadow-[0_22px_50px_-18px_rgba(216,162,74,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
          <img src={opostalHorizontalTransparent.url} alt="O Postal" className="h-8 w-auto object-contain md:h-10" />
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