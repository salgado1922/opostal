import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ChevronDown,
  MapPin,
  Clock,
  Sparkles,
  Church,
  Castle,
  Utensils,
  Wine,
  AlertTriangle,
  Check,
  X,
  CheckCircle2,
  Crown,
  Lightbulb,
  Sun,
  Coins,
  Plug,
  Phone,
  HandCoins,
  Languages,
  ExternalLink,
  Footprints,
  Menu,
  Play,
  Info,
  Calendar,
  CloudSun,
  PartyPopper,
  TrainFront,
  Palette,
  Camera,
} from "lucide-react";
import { PostmarkCircle } from "@/components/postal/PostmarkCircle";
import type { Variants } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";
import { AffiliateLink } from "@/components/AffiliateLink";
import {
  CustomItineraryCTA,
  CustomItineraryHeroLink,
} from "@/components/CustomItineraryCTA";

export const Route = createFileRoute("/florenca")({
  head: () => ({
    meta: [
      { title: "O que visitar em Florença: roteiro de 3 dias | O Postal" },
      {
        name: "description",
        content:
          "O que visitar em Florença em 3 dias, ao teu ritmo: Duomo, Uffizi, Accademia, Ponte Vecchio, Oltrarno e Piazzale Michelangelo. Dicas, comida e o que reservar.",
      },
      { property: "og:title", content: "O que visitar em Florença: roteiro de 3 dias | O Postal" },
      {
        property: "og:description",
        content:
          "O que visitar em Florença em 3 dias, ao teu ritmo: Duomo, Uffizi, Accademia, Ponte Vecchio, Oltrarno e Piazzale Michelangelo. Dicas, comida e o que reservar.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://opostal.pt/florenca" },
      { property: "og:image", content: `https://opostal.pt${opostalHorizontalTransparent.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "O que visitar em Florença: roteiro de 3 dias | O Postal" },
      {
        name: "twitter:description",
        content:
          "O que visitar em Florença em 3 dias: Duomo, Uffizi, Ponte Vecchio, Oltrarno e Piazzale Michelangelo.",
      },
      { name: "twitter:image", content: `https://opostal.pt${opostalHorizontalTransparent.url}` },
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/florenca" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          headline: "O que visitar em Florença: roteiro de 3 dias",
          name: "O que visitar em Florença: roteiro de 3 dias",
          url: "https://opostal.pt/florenca",
          image: `https://opostal.pt${opostalHorizontalTransparent.url}`,
          description:
            "O que visitar em Florença em 3 dias, ao teu ritmo: Duomo, Uffizi, Accademia, Ponte Vecchio, Oltrarno e Piazzale Michelangelo.",
          author: { "@type": "Person", name: "O Postal" },
        }),
      },
    ],
  }),
  component: Index,
});

// ----------------------- helpers -----------------------

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-14 max-w-3xl"
        >
          {eyebrow && (
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-10 bg-gold/60" />
              {eyebrow}
            </div>
          )}
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">
            <span className="text-gradient-gold">{title}</span>
          </h2>
          {intro && (
            <p className="mt-5 text-base text-muted-foreground md:text-lg">{intro}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function GoldLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="gold-link font-medium">
      {children}
    </a>
  );
}

// ----------------------- DATA -----------------------

type Stop = {
  time: string;
  title: string;
  desc: string;
  tip?: string;
  link?: string;
  icon: React.ComponentType<{ className?: string }>;
  bookingUrl?: string;
  hours?: string;
  hoursNote?: string;
  walkTo?: string;
  image?: string;
  imageAlt?: string;
};

type Day = {
  key: string;
  label: string;
  date: string;
  title: string;
  vibe: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  stops: Stop[];
  walkTotal?: string;
  howToGet?: string;
  mapEmbedUrl?: string;
  mapLinkUrl?: string;
  highlightTip?: string;
  cover?: string;
  coverAlt?: string;
};

const days: Day[] = [
  {
    key: "d1",
    label: "Dia 1",
    date: "Centro & Renascimento",
    title: "Centro & Renascimento",
    vibe: "Chegar com calma, o Duomo por fora, o David na Accademia e o primeiro gelato à beira do Arno.",
    accent: "from-amber-400/30 to-rose-400/10",
    icon: Sun,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Il_Duomo_Florence_Italy.JPG?width=1600",
    coverAlt: "Cúpula de Brunelleschi e fachada do Duomo de Florença",
    walkTotal: "A pé hoje: pouco, o centro é compacto.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Piazza+del+Duomo+Florence&daddr=Piazza+della+Repubblica+Florence+to:Mercato+Centrale+Florence+to:Galleria+dell%27Accademia+Florence+to:Ponte+Vecchio+Florence&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Piazza+del+Duomo+Florence/Piazza+della+Repubblica+Florence/Mercato+Centrale+Florence/Galleria+dell%27Accademia+Florence/Ponte+Vecchio+Florence/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "10:30",
        title: "Check-in & primeiro café",
        desc: "Deixar malas, um espresso e arrancar com o dia, sem pressa.",
        icon: MapPin,
        walkTo: "~10 min",
      },
      {
        time: "11:00",
        title: "Duomo por fora (Piazza del Duomo)",
        desc: "A Catedral de Santa Maria del Fiore, a cúpula de Brunelleschi e a fachada em mármore branco, verde e rosa. Ver o Batistério com as Portas do Paraíso de Ghiberti.",
        link: "https://pt.wikipedia.org/wiki/Catedral_de_Santa_Maria_del_Fiore",
        tip: "O exterior é o espetáculo; guarda o interior para o Dia 3.",
        icon: Church,
        walkTo: "~4 min",
      },
      {
        time: "12:15",
        title: "Piazza della Repubblica",
        desc: "A praça central animada, com o carrossel e o histórico Caffè Gilli.",
        link: "https://pt.wikipedia.org/wiki/Piazza_della_Repubblica_(Floren%C3%A7a)",
        icon: Sparkles,
        walkTo: "~5 min",
      },
      {
        time: "13:00",
        title: "Almoço no Mercato Centrale",
        desc: "Mercado coberto de San Lorenzo; o food hall do 1.º piso é perfeito para almoçar (lampredotto, massa fresca, pizza, vinho).",
        link: "https://www.mercatocentrale.com/florence/",
        icon: Utensils,
        walkTo: "~10 min",
      },
      {
        time: "15:00",
        title: "Galleria dell'Accademia",
        desc: "O David original de Michelangelo e os Prigioni inacabados.",
        link: "https://pt.wikipedia.org/wiki/Galleria_dell%27Accademia",
        tip: "Reservar slot online; esgota e a fila é enorme.",
        icon: Crown,
        bookingUrl: "[LINK_GETYOURGUIDE_FLORENCA_ACCADEMIA]",
        hours: "Ter–Dom ~8:15–18:50",
        hoursNote: "FECHA À SEGUNDA",
        walkTo: "~18 min",
      },
      {
        time: "17:30",
        title: "Ponte Vecchio",
        desc: "A ponte medieval das ourivesarias, linda ao fim da tarde sobre o Arno.",
        link: "https://pt.wikipedia.org/wiki/Ponte_Vecchio",
        icon: Camera,
        walkTo: "~5 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Ponte_Vecchio%2C_Florence%2C_Italy%2C_2023.jpg?width=1600",
        imageAlt: "Ponte Vecchio sobre o rio Arno em Florença",
      },
      {
        time: "18:30",
        title: "Gelato tradicional",
        desc: "Fechar o dia com um gelato na La Carraia (na Ponte alla Carraia), preço imbatível e dos melhores da cidade.",
        link: "https://www.lacarraiagroup.eu/",
        icon: Sparkles,
      },
    ],
  },
  {
    key: "d2",
    label: "Dia 2",
    date: "Uffizi & Oltrarno",
    title: "Uffizi & Oltrarno",
    vibe: "Manhã de obras-primas nos Uffizi, tarde no Oltrarno e o pôr do sol dourado no Piazzale Michelangelo.",
    accent: "from-amber-300/30 to-violet-500/10",
    icon: Palette,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/The_Ponte_Vecchio_%22Old_Bridge%22_and_Arno_River%2C_Florence%2C_Italy.jpg?width=1600",
    coverAlt: "Ponte Vecchio e rio Arno ao entardecer",
    howToGet: "Como andar: tudo a pé, atravessando o Arno.",
    highlightTip:
      "Dica: reservar os Uffizi com slot horário; é dos museus mais concorridos da Europa.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Piazza+della+Signoria+Florence&daddr=Galleria+degli+Uffizi+Florence+to:Piazza+Santo+Spirito+Florence+to:Palazzo+Pitti+Florence+to:Giardino+di+Boboli+Florence+to:Piazzale+Michelangelo+Florence&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Piazza+della+Signoria+Florence/Galleria+degli+Uffizi+Florence/Piazza+Santo+Spirito+Florence/Palazzo+Pitti+Florence/Giardino+di+Boboli+Florence/Piazzale+Michelangelo+Florence/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:00",
        title: "Piazza della Signoria",
        desc: "Museu a céu aberto, com o Palazzo Vecchio, a Loggia dei Lanzi, a cópia do David e a Fonte de Neptuno.",
        link: "https://pt.wikipedia.org/wiki/Piazza_della_Signoria",
        icon: Castle,
        walkTo: "~3 min",
      },
      {
        time: "09:45",
        title: "Galleria degli Uffizi",
        desc: "Uma das maiores coleções de arte do mundo. Botticelli (O Nascimento de Vénus), Leonardo, Caravaggio. Reservar.",
        link: "https://pt.wikipedia.org/wiki/Gal%C3%A9ria_Uffizi",
        tip: "Reservar slot horário com semanas de antecedência.",
        icon: Palette,
        bookingUrl: "[LINK_GETYOURGUIDE_FLORENCA_UFFIZI]",
        hours: "Ter–Dom ~8:15–18:30",
        hoursNote: "FECHA À SEGUNDA",
        walkTo: "~15 min",
      },
      {
        time: "13:00",
        title: "Almoço na Piazza Santo Spirito (Oltrarno)",
        desc: "Atravessar a Ponte Vecchio. Almoçar uma schiacciata no Gustapanino, mesmo na praça.",
        link: "https://pt.wikipedia.org/wiki/Oltrarno",
        icon: Utensils,
        walkTo: "~5 min",
      },
      {
        time: "14:30",
        title: "Palazzo Pitti",
        desc: "O grande palácio dos Medici, com galerias de pintura e apartamentos reais.",
        link: "https://pt.wikipedia.org/wiki/Pal%C3%A1cio_Pitti",
        icon: Crown,
        bookingUrl: "[LINK_GETYOURGUIDE_FLORENCA_PALAZZO_PITTI]",
        hours: "Ter–Dom ~8:15–18:30",
        walkTo: "~2 min",
      },
      {
        time: "16:00",
        title: "Jardins de Boboli",
        desc: "Jardins à italiana atrás do Pitti, bom para abrandar.",
        link: "https://pt.wikipedia.org/wiki/Jardim_de_Boboli",
        icon: Sparkles,
        bookingUrl: "[LINK_GETYOURGUIDE_FLORENCA_BOBOLI]",
        hours: "Diário ~8:15 até ao pôr do sol",
        walkTo: "~25 min a subir, ou autocarro 12/13",
      },
      {
        time: "19:00",
        title: "Piazzale Michelangelo (pôr do sol)",
        desc: "O miradouro mais famoso, com a cidade e a cúpula aos pés. Subir a pé (~20 min) ou de autocarro (12 ou 13). Pôr do sol lindíssimo.",
        link: "https://pt.wikipedia.org/wiki/Piazzale_Michelangelo",
        icon: Sun,
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Florence_Duomo_from_Piazzale_Michelangelo_04_2024_6980.jpg?width=1600",
        imageAlt: "Vista de Florença e do Duomo a partir do Piazzale Michelangelo",
      },
    ],
  },
  {
    key: "d3",
    label: "Dia 3",
    date: "Duomo & Basílicas",
    title: "Duomo & Basílicas",
    vibe: "Por dentro da catedral, subida ao Campanário com a cúpula em frente, e os túmulos de Santa Croce e a capela dos Medici.",
    accent: "from-rose-500/20 to-amber-400/10",
    icon: Church,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Basilica_di_Santa_Croce_%2812437%29.jpg?width=1600",
    coverAlt: "Fachada da Basílica de Santa Croce em Florença",
    walkTotal: "A pé hoje: ~30 min no total.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Duomo+Florence&daddr=Campanile+di+Giotto+Florence+to:Battistero+di+San+Giovanni+Florence+to:Basilica+di+Santa+Croce+Florence+to:Cappelle+Medicee+Florence&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Duomo+Florence/Campanile+di+Giotto+Florence/Battistero+di+San+Giovanni+Florence/Basilica+di+Santa+Croce+Florence/Cappelle+Medicee+Florence/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:00",
        title: "Interior do Duomo (Santa Maria del Fiore)",
        desc: "Entrada na catedral. Nota honesta: baixar as expectativas, é muito mais bonito por fora do que por dentro. O interior é sóbrio, com destaque para os frescos do Juízo Final de Vasari na cúpula.",
        link: "https://pt.wikipedia.org/wiki/Catedral_de_Santa_Maria_del_Fiore",
        icon: Church,
        bookingUrl: "[LINK_GETYOURGUIDE_FLORENCA_DUOMO]",
        hours: "Seg–Sáb ~10:15–16:30",
        walkTo: "~1 min",
      },
      {
        time: "10:00",
        title: "Subida ao Campanário de Giotto",
        desc: "Em vez da subida à cúpula: são 414 degraus, e a grande vantagem é veres a própria cúpula de Brunelleschi à tua frente, a vista mais bonita da cidade. Ver a secção Duomo abaixo. Reservar com o Brunelleschi Pass.",
        link: "https://pt.wikipedia.org/wiki/Campan%C3%A1rio_de_Giotto",
        icon: Crown,
        bookingUrl: "[LINK_GETYOURGUIDE_FLORENCA_DUOMO]",
        hours: "Diário ~8:15–19:00",
        walkTo: "~2 min",
      },
      {
        time: "11:30",
        title: "Opcional (incluído no Brunelleschi Pass)",
        desc: "O Batistério por dentro (mosaicos dourados no teto) e o Museu dell'Opera del Duomo (a Pietà de Michelangelo e as portas originais de Ghiberti).",
        link: "https://pt.wikipedia.org/wiki/Bapt%C3%A9rio_de_S%C3%A3o_Jo%C3%A3o_(Floren%C3%A7a)",
        icon: Sparkles,
        bookingUrl: "[LINK_GETYOURGUIDE_FLORENCA_DUOMO]",
        walkTo: "~15 min",
      },
      {
        time: "14:00",
        title: "Basílica de Santa Croce",
        desc: "A igreja dos túmulos, com Michelangelo, Galileu e Maquiavel, e capelas com frescos de Giotto.",
        link: "https://pt.wikipedia.org/wiki/Bas%C3%ADlica_de_Santa_Cruz_(Floren%C3%A7a)",
        icon: Church,
        bookingUrl: "[LINK_GETYOURGUIDE_FLORENCA_SANTA_CROCE]",
        hours: "Seg–Sáb ~9:30–17:30",
        walkTo: "~15 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Firenze_-Basilica_di_Santa_Croce%2842013667144%29.jpg?width=1600",
        imageAlt: "Interior e fachada de Santa Croce em Florença",
      },
      {
        time: "16:00",
        title: "Capelas Medici (Cappelle Medicee, San Lorenzo)",
        desc: "Os túmulos da família Medici e a Sacristia Nova, esculpida por Michelangelo.",
        link: "https://pt.wikipedia.org/wiki/Capelas_M%C3%A9dici",
        icon: Crown,
        bookingUrl: "[LINK_GETYOURGUIDE_FLORENCA_CAPPELLE_MEDICEE]",
        hours: "Diário ~8:15–18:50",
        hoursNote: "VERIFICAR FECHO MENSAL",
      },
    ],
  },
];

// ----------------------- HERO -----------------------

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[680px] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div
          className="h-[120%] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://commons.wikimedia.org/wiki/Special:FilePath/FlorenceFromPiazzaleMichelangeloTwilight.jpg?width=2400')",
          }}
          role="img"
          aria-label="Florença ao crepúsculo vista do Piazzale Michelangelo"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/40 via-plum/60 to-twilight/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,oklch(0.78_0.13_75/0.30),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,oklch(0.58_0.15_40/0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-twilight/40 to-background" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6"
      >
        <div className="pointer-events-none absolute right-6 top-24 hidden md:right-12 md:top-28 md:block">
          <PostmarkCircle city="FLORENÇA" year="2025" rotate={-9} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="glass mx-auto w-full max-w-2xl rounded-3xl px-8 py-12 text-center shadow-2xl md:px-14 md:py-16"
        >
          <div className="mb-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold/70" />
            Guia · 3 dias
            <span className="h-px w-8 bg-gold/70" />
          </div>
          <h1 className="font-serif leading-[1.05]">
            <span className="block text-gradient-gold text-6xl md:text-8xl">Florença</span>
            <span className="mt-6 block font-serif text-xl italic text-cream/85 md:text-2xl">
              Guia de 3 dias ao teu ritmo
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Um guia público para descobrir Florença sem pressa: berço do Renascimento, museu a céu aberto, arte a cada esquina, para qualquer viajante.
          </p>
        </motion.div>
        <CustomItineraryHeroLink city="Florença" />
      </motion.div>
    </section>
  );
}

// ----------------------- OVERVIEW -----------------------

function Overview() {
  return (
    <Section
      id="overview"
      eyebrow="O Roteiro"
      title="O que visitar em Florença: três dias, três humores"
      intro="Cada dia tem o seu cenário e a sua cadência. Devagar de manhã, dourado ao fim da tarde."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {days.map((d, i) => {
          const Icon = d.icon;
          return (
            <motion.a
              key={d.key}
              href={`#${d.key}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-card backdrop-blur-md transition-shadow hover:shadow-[0_20px_60px_-20px_oklch(0.82_0.14_78/0.4)]"
            >
              <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-terracotta/30 via-gold/15 to-twilight">
                {d.cover ? (
                  <img
                    src={d.cover}
                    alt={d.coverAlt ?? d.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="h-14 w-14 text-gold/70" />
                  </div>
                )}
                <div className={`absolute inset-0 bg-gradient-to-t ${d.accent}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.25em] text-gold/80">
                  {d.label} · {d.date}
                </div>
                <h3 className="mt-2 font-serif text-2xl text-cream">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.vibe}</p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}

// ----------------------- TIMELINE -----------------------

function StopItem({ stop, idx }: { stop: Stop; idx: number }) {
  const [open, setOpen] = useState(false);
  const Icon = stop.icon;
  const hasExtra = !!stop.tip;

  return (
    <motion.div
      initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="relative pl-16 md:pl-20"
    >
      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-twilight shadow-[0_0_0_4px_oklch(0.16_0.035_290),0_0_30px_oklch(0.82_0.14_78/0.25)] md:left-5">
        <Icon className="h-4 w-4 text-gold" />
      </div>

      <div className="w-full rounded-2xl border border-gold/10 bg-card px-6 py-5 text-left transition-all duration-300 hover:border-gold/30 hover:bg-card/80">
        {stop.image && (
          <div className="mb-4 -mx-6 -mt-5 overflow-hidden">
            <img
              src={stop.image}
              alt={stop.imageAlt ?? stop.title}
              loading="lazy"
              className="h-56 w-full object-cover"
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => hasExtra && setOpen((o) => !o)}
          className={`w-full text-left ${hasExtra ? "cursor-pointer" : "cursor-default"}`}
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-serif text-xl text-gold">{stop.time}</span>
            <h4 className="font-serif text-xl text-cream md:text-2xl">
              {stop.link ? <GoldLink href={stop.link}>{stop.title}</GoldLink> : stop.title}
            </h4>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            {stop.desc}
          </p>
        </button>

        {(stop.hours || stop.bookingUrl) && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {stop.bookingUrl && <AffiliateLink href={stop.bookingUrl} />}
            {stop.hours && (
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 text-xs text-cream/80">
                  <Clock className="h-3.5 w-3.5 text-gold" />
                  <span className="uppercase tracking-[0.18em] text-gold/80">Horário (confirmar):</span>
                  <span>{stop.hours}</span>
                </div>
                {stop.hoursNote && (
                  <div className="ml-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta">
                    {stop.hoursNote}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {hasExtra && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold/70 hover:text-gold"
          >
            <span>{open ? "Fechar" : "Mais detalhes"}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        className="overflow-hidden"
      >
        <div className="mt-3 rounded-2xl border border-gold/15 bg-twilight/60 p-5">
          {stop.tip && (
            <div className="flex gap-3">
              <Lightbulb className="mt-1 h-4 w-4 flex-shrink-0 text-gold" />
              <p className="text-sm italic text-cream/90">{stop.tip}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function DayBlock({ day }: { day: Day }) {
  const Icon = day.icon;
  return (
    <div id={day.key} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-gold/20 pb-6"
      >
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            <Icon className="h-4 w-4" />
            {day.label} · {day.date}
          </div>
          <h3 className="mt-3 font-serif text-4xl text-cream md:text-5xl">
            <span className="text-gradient-gold">{day.title}</span>
          </h3>
        </div>
        <p className="max-w-md text-sm italic text-muted-foreground md:text-right">{day.vibe}</p>
      </motion.div>

      {(day.walkTotal || day.howToGet) && (
        <div className="mb-6 flex flex-wrap gap-3">
          {day.walkTotal && (
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-twilight/60 px-4 py-1.5 text-xs text-cream/90">
              <Footprints className="h-3.5 w-3.5 text-gold" />
              {day.walkTotal}
            </span>
          )}
          {day.howToGet && (
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-twilight/60 px-4 py-1.5 text-xs text-cream/90">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              {day.howToGet}
            </span>
          )}
        </div>
      )}

      {day.highlightTip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-start gap-3 rounded-2xl border border-gold/40 bg-gradient-to-r from-gold/15 via-terracotta/10 to-transparent p-5"
        >
          <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
          <p className="text-sm leading-relaxed text-cream md:text-base">{day.highlightTip}</p>
        </motion.div>
      )}

      <div className="relative space-y-6">
        <div className="pointer-events-none absolute bottom-4 left-7 top-4 w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent md:left-9" />
        {day.stops.map((s, i) => (
          <div key={i}>
            <StopItem stop={s} idx={i} />
            {s.walkTo && i < day.stops.length - 1 && (
              <div className="relative mt-4 pl-16 md:pl-20">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-twilight/70 px-3 py-1 text-[11px] text-gold/85">
                  <Footprints className="h-3.5 w-3.5" />
                  {s.walkTo}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {day.mapEmbedUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-twilight/60 shadow-[0_20px_60px_-30px_oklch(0.82_0.14_78/0.45)]">
            <iframe
              src={day.mapEmbedUrl}
              title={`Percurso a pé do ${day.label}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0"
              style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(.75) contrast(.95)" }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-twilight via-twilight/70 to-transparent" />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="font-serif text-sm italic text-gold/80">Percurso a pé do {day.label}</p>
            {day.mapLinkUrl && (
              <a
                href={day.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold/10"
              >
                <MapPin className="h-3.5 w-3.5" />
                Abrir percurso no mapa
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Itineraries() {
  return (
    <Section
      id="dias"
      eyebrow="Itinerário detalhado"
      title="Dia a dia, paragem a paragem"
      intro="Toca para abrir cada paragem, com dicas, mini-histórias e imagens. Horários sugeridos, adapta ao teu ritmo."
    >
      <div className="space-y-24">
        {days.map((d) => (
          <DayBlock key={d.key} day={d} />
        ))}
      </div>
    </Section>
  );
}

// ----------------------- DUOMO COMPARISON -----------------------

function Duomo() {
  const tiers = [
    {
      name: "Campanário de Giotto",
      tag: "414 degraus",
      bullets: [
        "Daqui vês a Cúpula de Brunelleschi mesmo à tua frente: a vista de postal, com o Duomo no enquadramento.",
        "Filas geralmente menores do que na subida à cúpula.",
        "Igualmente alto, com vista a 360º sobre os telhados de terracota.",
      ],
      footer: "Ficas com o Duomo na fotografia, e não em cima dele.",
      highlight: true,
      link: "https://pt.wikipedia.org/wiki/Campan%C3%A1rio_de_Giotto",
    },
    {
      name: "Cúpula de Brunelleschi",
      tag: "463 degraus",
      bullets: [
        "De perto, os frescos do Juízo Final de Vasari por dentro da cúpula.",
        "Vista a 360º sobre Florença e as colinas da Toscana.",
        "Mas estás em cima da cúpula, por isso não a vês no panorama.",
        "Esgota com semanas de antecedência e exige hora marcada.",
      ],
      footer: "A subida mais icónica, se reservares muito cedo.",
      highlight: false,
      link: "https://pt.wikipedia.org/wiki/C%C3%BApula_de_Brunelleschi",
    },
  ];

  return (
    <Section
      id="duomo"
      eyebrow="Subir ao Duomo"
      title="Cúpula ou Campanário?"
      intro="Há duas subidas no complexo do Duomo, e raramente compensa fazer as duas. A diferença está na vista."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-3xl border p-8 transition-all ${
              t.highlight
                ? "border-gold/60 bg-gradient-to-br from-gold/10 via-terracotta/10 to-transparent shadow-[0_30px_80px_-30px_oklch(0.82_0.14_78/0.5)]"
                : "border-gold/15 bg-card"
            }`}
          >
            {t.highlight && (
              <div className="absolute right-6 top-6 rounded-full border border-gold/50 bg-gold/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold">
                Recomendado
              </div>
            )}
            <div className="text-xs uppercase tracking-[0.3em] text-gold">{t.tag}</div>
            <h3 className="mt-3 font-serif text-3xl text-cream">
              <GoldLink href={t.link}>{t.name}</GoldLink>
            </h3>
            <ul className="mt-6 space-y-2.5">
              {t.bullets.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-cream/90">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-gold/15 pt-5 text-sm italic text-cream/80">{t.footer}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 flex items-start gap-3 rounded-2xl border border-gold/30 bg-twilight/60 p-5"
      >
        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
        <p className="text-sm leading-relaxed text-cream/90">
          Ambas exigem o Brunelleschi Pass, que cobre cúpula, campanário, batistério, cripta e Museu dell'Opera, válido 3 dias. Só a cúpula precisa de hora marcada.
        </p>
      </motion.div>
    </Section>
  );
}

// ----------------------- FOOD -----------------------

function Food() {
  const restaurants: Array<{ name: string; desc: string; link: string; image?: string; imageAlt?: string }> = [
    {
      name: "Gustapanino (Piazza Santo Spirito)",
      desc: "Schiacciata recheada e ótima relação qualidade-preço, mesmo na praça. Ideal para o almoço do Dia 2.",
      link: "https://www.google.com/search?q=Gustapanino+Florence",
    },
    {
      name: "All'Antico Vinaio (Via dei Neri)",
      desc: "As famosas schiacciate enormes, a dois passos da Piazza della Signoria. Best-seller 'La Favolosa'. A fila é grande mas anda depressa, e há várias lojas lado a lado.",
      link: "https://www.allanticovinaio.com/en/",
    },
    {
      name: "Mercato Centrale (San Lorenzo)",
      desc: "Food hall no 1.º piso, perfeito para um almoço variado e descontraído.",
      link: "https://www.mercatocentrale.com/florence/",
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Mercato_Centrale_%28Florence%29-Interior-Second_floor.jpg?width=1600",
      imageAlt: "Interior do food hall do Mercato Centrale em Florença",
    },
    {
      name: "La Carraia (Ponte alla Carraia)",
      desc: "Gelataria de preço imbatível e dos melhores da cidade. Pistácio, chocolate branco com pistácio, bacio. Segunda casa junto a Santa Croce. Outras gelatarias a provar: Vivoli, Perché No! e La Sorbettiera.",
      link: "https://www.lacarraiagroup.eu/",
    },
  ];

  const dishes: Array<{ name: string; desc: string; icon?: React.ComponentType<{ className?: string }>; image?: string; imageAlt?: string }> = [
    {
      name: "Bistecca alla Fiorentina",
      desc: "O enorme bife de vaca grelhado, mal passado. Vendido ao peso; confirmar o preço antes de pedir.",
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Bistecca_alla_Fiorentina.jpg?width=1600",
      imageAlt: "Bistecca alla Fiorentina grelhada no ponto",
    },
    {
      name: "Lampredotto",
      desc: "O street food clássico de Florença, uma sande de dobrada com salsa verde, nas bancas pela cidade.",
    },
    {
      name: "Schiacciata",
      desc: "O pão achatado toscano, base das melhores sandes.",
    },
    {
      name: "Ribollita & Pappa al pomodoro",
      desc: "Sopas toscanas rústicas, à base de pão.",
    },
    {
      name: "Cantucci com Vin Santo",
      desc: "Biscoitos de amêndoa para molhar no vinho doce.",
    },
    {
      name: "Chianti",
      desc: "O vinho tinto da região, companheiro natural da bistecca.",
      icon: Wine,
    },
  ];

  return (
    <Section
      id="comer"
      eyebrow="À mesa"
      title="Comer e beber em Florença"
      intro="Sítios testados, sabores para provar sem falta, e uma caixa de armadilhas à mesa."
    >
      <h3 className="mb-6 font-serif text-2xl text-cream">Restaurantes testados</h3>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {restaurants.map((r, i) => (
          <motion.a
            key={r.name}
            href={r.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gold/15 bg-card transition-all hover:border-gold/40 hover:shadow-[0_20px_50px_-20px_oklch(0.82_0.14_78/0.35)]"
          >
            {r.image && (
              <img
                src={r.image}
                alt={r.imageAlt ?? r.name}
                loading="lazy"
                className="h-40 w-full object-cover"
              />
            )}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2 text-gold">
                <Utensils className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.25em]">Sítio testado</span>
              </div>
              <h4 className="mt-2 font-serif text-xl text-cream group-hover:text-gold transition-colors">
                {r.name}
              </h4>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.desc}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <h3 className="mb-6 mt-16 font-serif text-2xl text-cream">Provar sem falta</h3>
      <div className="grid gap-5 md:grid-cols-3">
        {dishes.map((d, i) => {
          const Icon = d.icon ?? Utensils;
          return (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="overflow-hidden rounded-2xl border border-gold/15 bg-card"
            >
              {d.image && (
                <img
                  src={d.image}
                  alt={d.imageAlt ?? d.name}
                  loading="lazy"
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 text-gold">
                  <Icon className="h-4 w-4" />
                  <span className="text-[10px] uppercase tracking-[0.25em]">Sabor local</span>
                </div>
                <h4 className="mt-2 font-serif text-2xl text-cream">{d.name}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 flex items-start gap-4 rounded-2xl border border-terracotta/40 bg-terracotta/10 p-5"
      >
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-terracotta" />
        <div>
          <div className="font-serif text-lg text-cream">Atenção: armadilhas à mesa</div>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li>Fugir dos restaurantes da Piazza della Signoria e à volta do Duomo: turísticos e caros. Andar 5 minutos para fora.</li>
            <li>A bistecca é vendida ao peso (por hg ou kg): confirmar quanto vai pesar antes de pedir, porque a conta sobe depressa.</li>
            <li>O "coperto" (couvert por pessoa) é normal e legal em Itália, não é um erro na conta.</li>
          </ul>
        </div>
      </motion.div>
    </Section>
  );
}

// ----------------------- TIPS & TRAPS -----------------------

function Tips() {
  const doIt = [
    "Reservar Uffizi, Accademia (David) e a Cúpula com semanas de antecedência; esgotam.",
    "Tratar o complexo do Duomo com o Brunelleschi Pass.",
    "Ir cedo aos monumentos, antes dos autocarros de tour.",
    "Andar a pé: o centro é pequeno e plano, levar calçado confortável.",
    "Do aeroporto, usar o tram T2 até Santa Maria Novella.",
  ];
  const dont = [
    "Aparecer sem reserva nos grandes museus e na cúpula.",
    "Carteiristas na Ponte Vecchio, no Mercato e na estação.",
    "Conduzir no centro histórico: é ZTL (zona de trânsito limitado), com multas automáticas.",
    "Restaurantes colados aos monumentos.",
    "Esperar um interior deslumbrante na catedral; o espetáculo do Duomo é por fora.",
  ];

  return (
    <Section
      id="dicas"
      eyebrow="Saber andar"
      title="Dicas & armadilhas"
      intro="O básico que faz a viagem correr suave."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-7"
        >
          <h3 className="mb-5 flex items-center gap-3 font-serif text-2xl text-cream">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
              <Check className="h-5 w-5" />
            </span>
            Fazer
          </h3>
          <ul className="space-y-3">
            {doIt.map((t) => (
              <li key={t} className="flex gap-3 text-sm leading-relaxed text-cream/90">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-red-400/30 bg-red-400/5 p-7"
        >
          <h3 className="mb-5 flex items-center gap-3 font-serif text-2xl text-cream">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-400/20 text-red-300">
              <X className="h-5 w-5" />
            </span>
            Evitar
          </h3>
          <ul className="space-y-3">
            {dont.map((t) => (
              <li key={t} className="flex gap-3 text-sm leading-relaxed text-cream/90">
                <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-300" />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}

// ----------------------- CHECKLIST -----------------------

function Checklist() {
  const items = [
    "Galleria degli Uffizi (slot horário)",
    "Galleria dell'Accademia, o David (slot horário)",
    "Brunelleschi Pass e subida à Cúpula (hora marcada, esgota cedo)",
    "Palazzo Pitti e Jardins de Boboli",
    "Mesa num restaurante popular para a noite",
    "Opcional: tour de 1 dia à Toscana (Pisa, Siena, San Gimignano e Chianti) ou às Cinque Terre",
  ];

  return (
    <Section
      id="checklist"
      eyebrow="Antes de partir"
      title="O que reservar com antecedência"
      intro="Para evitar filas e ficar sem vaga, garante estes bilhetes e mesas antes de chegares."
    >
      <div className="rounded-2xl border border-gold/20 bg-card p-7">
        <ul className="grid gap-3 md:grid-cols-2">
          {items.map((b) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-cream/90"
            >
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-gold" />
              <span className="text-sm md:text-base">{b}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

// ----------------------- FOOTER -----------------------

function Footer() {
  return (
    <footer className="border-t border-gold/15 px-6 py-16 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="font-serif text-3xl text-gradient-gold md:text-4xl">Salute, à vossa.</p>
        <p className="mt-4 text-sm text-muted-foreground">
          O Postal. Guias editoriais de cidades europeias, feitos com calma e partilhados com gosto.
        </p>
        <p className="mt-3 text-xs text-muted-foreground/80">
          Fotos: Unsplash · Wikimedia Commons
        </p>
      </div>
    </footer>
  );
}

// ----------------------- INDEX -----------------------

function Index() {
  return (
    <main id="top" className="theme-firenze bg-twilight-radial min-h-screen overflow-x-hidden">
      <StickyNav />
      <Hero />
      <ConhecerFlorenca />
      <EssentialInfo />
      <Overview />
      <Itineraries />
      <GuideVideo />
      <Duomo />
      <Food />
      <Tips />
      <Checklist />
      <CustomItineraryCTA city="Florença" />
      <Footer />
    </main>
  );
}

// ----------------------- STICKY NAV -----------------------

const navLinks = [
  { id: "d1", label: "Dia 1" },
  { id: "d2", label: "Dia 2" },
  { id: "d3", label: "Dia 3" },
  { id: "video", label: "Vídeo" },
  { id: "duomo", label: "Duomo" },
  { id: "comer", label: "Comer" },
  { id: "dicas", label: "Dicas" },
  { id: "checklist", label: "Reservas" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function StickyNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(navLinks.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shadow = !scrolled ? "[text-shadow:0_1px_8px_rgba(0,0,0,0.65)]" : "";

  return (
    <nav
      aria-label="Secções da página"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out ${
        scrolled
          ? "border-b border-gold/15 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link
          to="/"
          aria-label="O Postal"
          className={`inline-flex items-center gap-2 text-sm tracking-wide text-gold md:text-base hover:text-cream transition-colors ${shadow}`}
        >
          <span aria-hidden>‹</span>
          <img
            src={opostalHorizontalTransparent.url}
            alt="O Postal"
            className="h-7 w-auto object-contain md:h-9"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative inline-block px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors ${shadow} ${
                    isActive
                      ? "text-gold"
                      : scrolled
                        ? "text-cream/70 hover:text-cream"
                        : "text-cream/90 hover:text-cream"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline-florenca"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gold"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label="Alternar menu"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-gold transition-colors ${
            scrolled ? "border border-gold/30" : "border border-gold/40 bg-black/20 backdrop-blur-sm"
          }`}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav-panel"
          className="md:hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {navLinks.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-sm uppercase tracking-[0.2em] ${
                      isActive ? "text-gold" : "text-cream/80"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}

// ----------------------- VÍDEO DO GUIA -----------------------

function GuideVideo() {
  return (
    <Section
      id="video"
      eyebrow="Vídeo do guia"
      title="Vídeo do guia"
      intro="Vídeo completo do guia."
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mx-auto max-w-4xl"
      >
        <div className="relative rounded-3xl bg-gradient-to-br from-gold/20 via-terracotta/10 to-transparent p-[1px] shadow-2xl shadow-black/50">
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-gold/20 bg-black">
            <iframe
              src="https://www.youtube.com/embed/QnzZF-FQ_qE"
              title="Vídeo do guia: Florença"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
        <p className="mt-5 text-center font-serif italic text-gold/90 flex items-center justify-center gap-2">
          <Play className="h-4 w-4" aria-hidden />
          Vídeo completo do guia.
        </p>
      </motion.div>
    </Section>
  );
}

// ----------------------- CONHECER FLORENÇA -----------------------

const climaMeses: Array<[string, string, string, string]> = [
  ["Jan", "10", "2", "média"],
  ["Fev", "12", "3", "média"],
  ["Mar", "16", "5", "média"],
  ["Abr", "20", "8", "média"],
  ["Mai", "24", "12", "baixa"],
  ["Jun", "29", "16", "baixa"],
  ["Jul", "32", "18", "baixa"],
  ["Ago", "32", "18", "baixa"],
  ["Set", "27", "15", "média"],
  ["Out", "21", "11", "alta"],
  ["Nov", "15", "6", "alta"],
  ["Dez", "11", "3", "média"],
];

const eventos: Array<{ nome: string; quando: string; desc: string }> = [
  {
    nome: "Scoppio del Carro",
    quando: "domingo de Páscoa",
    desc: "Tradição secular: uma carroça de fogo de artifício explode em frente ao Duomo.",
  },
  {
    nome: "Festa di San Giovanni",
    quando: "24 de junho",
    desc: "Padroeiro da cidade, com fogo de artifício sobre o Arno e o Calcio Storico em traje histórico.",
  },
  {
    nome: "Estate Fiorentina",
    quando: "verão (jun–set)",
    desc: "Programa de concertos, cinema ao ar livre e eventos pela cidade.",
  },
];

function ConhecerFlorenca() {
  const itemCls = "glass rounded-2xl border border-gold/15 px-5 sm:px-6 overflow-hidden";
  const triggerCls = "py-5 font-serif text-lg sm:text-xl text-cream hover:no-underline gap-3";
  const iconCls =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30 text-gold";

  return (
    <Section
      id="conhecer"
      eyebrow="Contexto"
      title="Conhecer Florença"
      intro="Contexto rápido antes de partir; abre só o que te interessar."
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-8 overflow-hidden rounded-2xl border border-gold/20 shadow-[0_30px_80px_-40px_oklch(0.83_0.16_78/0.5)]">
          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Florence_skyline_at_dusk_%283867485023%29.jpg?width=1600"
            alt="Skyline de Florença ao entardecer"
            loading="lazy"
            className="h-56 w-full object-cover md:h-72"
          />
        </div>
        <Accordion type="multiple" className="flex flex-col gap-4">
          <AccordionItem value="overview" className={itemCls}>
            <AccordionTrigger className={triggerCls}>
              <span className="flex items-center gap-3">
                <span className={iconCls}>
                  <Info className="h-4 w-4" />
                </span>
                Florença em 2 minutos
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-cream/90 space-y-3">
              <p>Berço do Renascimento e capital da Toscana.</p>
              <p>A cidade dos Medici, de Michelangelo, Brunelleschi e Botticelli.</p>
              <p>
                Centro histórico pequeno e compacto, todo a pé, classificado Património Mundial pela UNESCO.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quando" className={itemCls}>
            <AccordionTrigger className={triggerCls}>
              <span className="flex items-center gap-3">
                <span className={iconCls}>
                  <Calendar className="h-4 w-4" />
                </span>
                Quando ir
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-cream/90 space-y-3">
              <p>
                <span className="text-gold">Primavera (abr–mai) e outono (set–out):</span> a melhor altura, com clima ameno e menos multidões.
              </p>
              <p>
                <span className="text-gold">Evitar julho e agosto:</span> calor intenso e cidade muito cheia.
              </p>
              <p className="font-serif italic text-gold/90 pt-2">Equilíbrio ideal: maio ou setembro.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clima" className={itemCls}>
            <AccordionTrigger className={triggerCls}>
              <span className="flex items-center gap-3">
                <span className={iconCls}>
                  <CloudSun className="h-4 w-4" />
                </span>
                Clima mês a mês
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="overflow-x-auto rounded-xl border border-gold/15">
                <table className="w-full text-sm">
                  <thead className="bg-gold/10 text-gold">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">Mês</th>
                      <th className="px-3 py-2 text-right font-medium">Máx (°C)</th>
                      <th className="px-3 py-2 text-right font-medium">Mín (°C)</th>
                      <th className="px-3 py-2 text-left font-medium">Chuva</th>
                    </tr>
                  </thead>
                  <tbody>
                    {climaMeses.map(([mes, max, min, chuva]) => (
                      <tr key={mes} className="border-t border-gold/10 text-cream/90">
                        <td className="px-3 py-2 font-serif">{mes}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{max}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{min}</td>
                        <td className="px-3 py-2 text-muted-foreground">{chuva}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 font-serif italic text-gold/90 text-sm">
                Médias aproximadas (confirmar); verões quentes e secos, invernos suaves e húmidos.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="eventos" className={itemCls}>
            <AccordionTrigger className={triggerCls}>
              <span className="flex items-center gap-3">
                <span className={iconCls}>
                  <PartyPopper className="h-4 w-4" />
                </span>
                Festas & eventos
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <ul className="space-y-4">
                {eventos.map((e) => (
                  <li key={e.nome} className="text-sm leading-relaxed">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-serif text-base text-cream">{e.nome}</span>
                      <span className="text-xs text-gold/90">({e.quando})</span>
                    </div>
                    <p className="text-cream/80">{e.desc}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-serif italic text-gold/90 text-sm">
                Confirma as datas exatas de cada edição no site oficial.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </Section>
  );
}

// ----------------------- ESSENTIAL INFO -----------------------

const essentials = [
  {
    icon: Clock,
    title: "Fuso horário",
    body: "CET (UTC+1). Florença está 1 hora à frente de Lisboa.",
  },
  {
    icon: Coins,
    title: "Moeda",
    body: "Euro. A mesma de Portugal, sem conversões nem surpresas de câmbio.",
  },
  {
    icon: Plug,
    title: "Tomadas",
    body: "Tipo F e L, 230 V / 50 Hz. As fichas portuguesas encaixam na maioria das tomadas; levar um adaptador universal por garantia.",
  },
  {
    icon: Phone,
    title: "Emergência",
    body: "112 (geral europeu). Levar o Cartão Europeu de Seguro de Doença.",
  },
  {
    icon: TrainFront,
    title: "Transportes",
    body: "Faz-se quase tudo a pé. Do aeroporto Amerigo Vespucci, apanhar o tram T2 até Santa Maria Novella (~20 min). Intercidades chegam a Santa Maria Novella.",
  },
  {
    icon: HandCoins,
    title: "Gorjetas",
    body: "O 'coperto' (couvert por pessoa) é normal em Itália; arredondar a conta chega.",
  },
];

const phrases = [
  ["Olá", "Ciao / Buongiorno"],
  ["Obrigado", "Grazie"],
  ["Por favor", "Per favore"],
  ["Sim / Não", "Sì / No"],
  ["Quanto custa?", "Quanto costa?"],
  ["Saúde (brinde)", "Salute / Cin cin"],
];

function EssentialInfo() {
  return (
    <Section
      id="essencial"
      eyebrow="Antes de partir"
      title="Essencial para a viagem"
      intro="O básico para chegar leve: fuso, dinheiro, transporte e um punhado de palavras italianas para abrir portas (e sorrisos)."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {essentials.map((e, i) => {
          const Icon = e.icon;
          return (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl border border-gold/15 p-6 transition-shadow hover:shadow-[0_20px_60px_-30px_oklch(0.82_0.14_78/0.5)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-serif text-xl text-cream">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
              {e.title === "Transportes" && (
                <a
                  href="[LINK_OMIO_FLORENCA]"
                  target="_blank"
                  rel="sponsored noopener"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-gold/85 hover:text-gold"
                >
                  Procurar comboios e autocarros
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-8 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 via-transparent to-transparent p-7"
      >
        <div className="mb-5 flex items-center gap-3">
          <MapPin className="h-5 w-5 text-gold" />
          <h3 className="font-serif text-2xl text-cream">Onde ficar</h3>
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          Três zonas a considerar; qualquer uma funciona muito bem para um guia de 3 dias.
        </p>
        <ul className="grid gap-4 md:grid-cols-3">
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Centro Storico (Duomo)</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              A pé de tudo, ideal para a primeira visita.
            </p>
            <a
              href="[LINK_BOOKING_FLORENCA_CENTRO_STORICO]"
              target="_blank"
              rel="sponsored noopener"
              className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-gold/85 hover:text-gold"
            >
              Ver alojamentos em Centro Storico
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Santa Croce</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Histórico e animado, com boas trattorias e vida local.
            </p>
            <a
              href="[LINK_BOOKING_FLORENCA_SANTA_CROCE]"
              target="_blank"
              rel="sponsored noopener"
              className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-gold/85 hover:text-gold"
            >
              Ver alojamentos em Santa Croce
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Oltrarno / Santo Spirito</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Do outro lado do Arno, mais local e charmoso, cheio de artesãos e esplanadas.
            </p>
            <a
              href="[LINK_BOOKING_FLORENCA_OLTRARNO]"
              target="_blank"
              rel="sponsored noopener"
              className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-gold/85 hover:text-gold"
            >
              Ver alojamentos em Oltrarno / Santo Spirito
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-8 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 via-transparent to-transparent p-7"
      >
        <div className="mb-5 flex items-center gap-3">
          <Languages className="h-5 w-5 text-gold" />
          <h3 className="font-serif text-2xl text-cream">Palavras úteis</h3>
        </div>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {phrases.map(([pt, it]) => (
            <li
              key={pt}
              className="flex items-baseline justify-between gap-3 border-b border-gold/10 pb-2"
            >
              <span className="text-sm text-muted-foreground">{pt}</span>
              <span className="font-serif text-lg italic text-gold">{it}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}