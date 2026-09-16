import { SmartImage } from "@/components/SmartImage";
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
  Info,
  Calendar,
  CloudSun,
  PartyPopper,
  TrainFront,
  Palette,
  Camera,
  Coffee,
  Music,
  FerrisWheel,
} from "lucide-react";
import { PostmarkCircle } from "@/components/postal/PostmarkCircle";
import { FinalStamp } from "@/components/postal/FinalStamp";
import { SiteFooter } from "@/components/SiteFooter";
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
import { OutrosPostais } from "@/components/OutrosPostais";

const SHARE_IMG =
  "https://commons.wikimedia.org/wiki/Special:FilePath/20180109%20Vienna%20State%20Opera%20at%20blue%20hour%20850%209387.jpg?width=1200";

export const Route = createFileRoute("/viena")({
  head: () => ({
    meta: [
      { title: "O que visitar em Viena: roteiro de 3 dias | O Postal" },
      {
        name: "description",
        content:
          "O que visitar em Viena em 3 dias, ao teu ritmo: Stephansdom, Hofburg, Belvedere, Schönbrunn, Prater e os cafés históricos. Dicas, comida e o que reservar.",
      },
      { property: "og:title", content: "O que visitar em Viena: roteiro de 3 dias | O Postal" },
      {
        property: "og:description",
        content:
          "O que visitar em Viena em 3 dias, ao teu ritmo: Stephansdom, Hofburg, Belvedere, Schönbrunn, Prater e os cafés históricos. Dicas, comida e o que reservar.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://opostal.pt/viena" },
      { property: "og:image", content: SHARE_IMG },
      { name: "twitter:title", content: "O que visitar em Viena: roteiro de 3 dias | O Postal" },
      {
        name: "twitter:description",
        content:
          "O que visitar em Viena em 3 dias: Stephansdom, Hofburg, Belvedere, Schönbrunn e Prater.",
      },
      { name: "twitter:image", content: SHARE_IMG },
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/viena" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          headline: "O que visitar em Viena: roteiro de 3 dias",
          name: "O que visitar em Viena: roteiro de 3 dias",
          url: "https://opostal.pt/viena",
          image: SHARE_IMG,
          description:
            "O que visitar em Viena em 3 dias, ao teu ritmo: Stephansdom, Hofburg, Belvedere, Schönbrunn e Prater.",
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
    date: "Centro Imperial",
    title: "Centro Imperial",
    vibe: "Do Stephansdom às ruas elegantes do Graben, a Hofburg, os Habsburgo e um café histórico ao fim da tarde.",
    accent: "from-amber-400/30 to-rose-400/10",
    icon: Church,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Wien%20-%20Stephansdom%20(1).JPG?width=1600",
    coverAlt: "A Catedral de Santo Estêvão em Viena",
    walkTotal: "A pé hoje: pouco, o centro histórico é compacto.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Stephansdom+Vienna&daddr=Graben+Vienna+to:Kohlmarkt+Vienna+to:Hofburg+Vienna+to:Albertina+Vienna+to:Vienna+State+Opera&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Stephansdom+Vienna/Graben+Vienna/Kohlmarkt+Vienna/Hofburg+Vienna/Albertina+Vienna/Vienna+State+Opera/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "10:00",
        title: "Check-in & primeiro café",
        desc: "Deixar malas e arrancar devagar, com uma Melange na primeira esquina.",
        icon: Coffee,
        walkTo: "~10 min",
      },
      {
        time: "10:30",
        title: "Stephansdom (Catedral de Santo Estêvão)",
        desc: "O coração de Viena, com o telhado de telhas coloridas e a torre sul (Steffl). Subir os 343 degraus para uma vista sobre a cidade.",
        link: "https://pt.wikipedia.org/wiki/Catedral_de_Santo_Estev%C3%A3o_(Viena)",
        tip: "Valores aproximados de 2026: entrada na nave é gratuita, subida à torre e catacumbas pagas em separado.",
        icon: Church,
        bookingUrl: "[LINK_GETYOURGUIDE_VIENA_STEPHANSDOM]",
        hours: "Diário ~9:00–22:30 (nave)",
        walkTo: "~2 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Wien%20-%20Stephansdom%20(1).JPG?width=1600",
        imageAlt: "Fachada e torre da Catedral de Santo Estêvão em Viena",
      },
      {
        time: "12:00",
        title: "Graben & Kohlmarkt",
        desc: "As duas ruas mais elegantes do centro, com a Coluna da Peste (Pestsäule), montras de luxo e a padaria imperial Demel ao fundo, junto à Hofburg.",
        link: "https://pt.wikipedia.org/wiki/Graben_(Viena)",
        icon: Sparkles,
        walkTo: "~6 min",
      },
      {
        time: "13:00",
        title: "Almoço perto da Hofburg",
        desc: "Um Wiener Schnitzel ou uma sopa Tafelspitz num Gasthaus tradicional das redondezas.",
        icon: Utensils,
        walkTo: "~5 min",
      },
      {
        time: "14:30",
        title: "Hofburg & Museu Sisi",
        desc: "O antigo palácio de inverno dos Habsburgo. O Museu Sisi conta a vida da imperatriz Isabel da Áustria; os Apartamentos Imperiais e a coleção de Pratas completam o bilhete combinado.",
        link: "https://pt.wikipedia.org/wiki/Hofburg",
        tip: "Reservar o bilhete combinado Sisi Ticket online para evitar filas.",
        icon: Crown,
        bookingUrl: "[LINK_GETYOURGUIDE_VIENA_HOFBURG_SISI]",
        hours: "Diário ~9:00–17:30 (valores aprox. 2026)",
        walkTo: "~10 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Wien%2C%20Hofburg%20--%202018%20--%203187.jpg?width=1600",
        imageAlt: "Fachada da Hofburg em Viena",
      },
      {
        time: "17:00",
        title: "Albertina",
        desc: "Museu com uma das maiores coleções de gravuras e desenhos do mundo, incluindo Dürer, e obras impressionistas e modernas.",
        link: "https://pt.wikipedia.org/wiki/Albertina",
        icon: Palette,
        bookingUrl: "[LINK_GETYOURGUIDE_VIENA_ALBERTINA]",
        hours: "Diário ~10:00–18:00 (valores aprox. 2026)",
        walkTo: "~5 min",
      },
      {
        time: "18:30",
        title: "Ópera Estatal (Wiener Staatsoper)",
        desc: "Ver a fachada neorrenascentista, sobretudo à hora azul, com as luzes já acesas. Vale a pena um tour guiado ao interior, ou um bilhete de última hora em pé, se houver espetáculo.",
        link: "https://pt.wikipedia.org/wiki/%C3%93pera_Estatal_de_Viena",
        icon: Music,
        bookingUrl: "[LINK_GETYOURGUIDE_VIENA_STAATSOPER]",
        walkTo: "~3 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/20180109%20Vienna%20State%20Opera%20at%20blue%20hour%20850%209387.jpg?width=1600",
        imageAlt: "Ópera Estatal de Viena à hora azul",
      },
      {
        time: "19:30",
        title: "Café histórico",
        desc: "Fechar o dia num Kaffeehaus centenário: Café Central (o mais fotogénico), Hawelka (boémio) ou Sperl (o mais autêntico). Uma Sachertorte é obrigatória.",
        icon: Coffee,
      },
    ],
  },
  {
    key: "d2",
    label: "Dia 2",
    date: "Naschmarkt & Belvedere",
    title: "Naschmarkt & Belvedere",
    vibe: "Manhã de mercado, tarde de Klimt no Belvedere e final no bairro dos museus.",
    accent: "from-amber-300/30 to-violet-500/10",
    icon: Palette,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Wien%2C%20Naschmarkt%20--%202018%20--%203109.jpg?width=1600",
    coverAlt: "Bancas do Naschmarkt em Viena",
    howToGet: "Como andar: metro/tram para o Belvedere, resto a pé.",
    highlightTip:
      "Dica: reservar o Belvedere Superior com hora marcada; é onde está O Beijo de Klimt.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Naschmarkt+Vienna&daddr=Karlskirche+Vienna+to:Belvedere+Palace+Vienna+to:MuseumsQuartier+Vienna+to:Kunsthistorisches+Museum+Vienna&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Naschmarkt+Vienna/Karlskirche+Vienna/Belvedere+Palace+Vienna/MuseumsQuartier+Vienna/Kunsthistorisches+Museum+Vienna/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:30",
        title: "Naschmarkt",
        desc: "O mercado mais famoso de Viena, com bancas de especiarias, queijos, azeitonas, e o mercado de pulgas aos sábados.",
        link: "https://pt.wikipedia.org/wiki/Naschmarkt",
        icon: Utensils,
        walkTo: "~10 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Wien%2C%20Naschmarkt%20--%202018%20--%203109.jpg?width=1600",
        imageAlt: "Bancas do Naschmarkt em Viena",
      },
      {
        time: "11:00",
        title: "Karlskirche",
        desc: "Uma das igrejas barrocas mais bonitas da Europa, com uma cúpula verde e colunas inspiradas na Coluna de Trajano. Subir de elevador junto à cúpula, muito perto do teto pintado.",
        link: "https://pt.wikipedia.org/wiki/Karlskirche",
        icon: Church,
        bookingUrl: "[LINK_GETYOURGUIDE_VIENA_KARLSKIRCHE]",
        hours: "Diário ~9:00–18:00 (valores aprox. 2026)",
        walkTo: "~15 min",
      },
      {
        time: "13:00",
        title: "Almoço perto do Belvedere",
        desc: "Um Würstelstand ou um café tranquilo antes do museu.",
        icon: Utensils,
        walkTo: "~10 min",
      },
      {
        time: "14:30",
        title: "Palácio Belvedere (Superior)",
        desc: "O palácio barroco do Príncipe Eugénio, hoje museu com a maior coleção de obras de Gustav Klimt, incluindo 'O Beijo'. Os jardins entre o Belvedere Superior e Inferior são deslumbrantes.",
        link: "https://pt.wikipedia.org/wiki/Pal%C3%A1cio_Belvedere",
        tip: "Reservar hora marcada online; a fila para ver 'O Beijo' pode ser longa.",
        icon: Crown,
        bookingUrl: "[LINK_GETYOURGUIDE_VIENA_BELVEDERE]",
        hours: "Diário ~9:00–18:00 (valores aprox. 2026)",
        walkTo: "~25 min ou tram",
      },
      {
        time: "17:00",
        title: "MuseumsQuartier",
        desc: "Um dos maiores complexos de arte do mundo, com o Leopold Museum (Schiele) e o mumok, além de pátios cheios de vida e esplanadas.",
        link: "https://pt.wikipedia.org/wiki/MuseumsQuartier",
        icon: Sparkles,
        walkTo: "~15 min ou metro",
      },
      {
        time: "18:30",
        title: "Kunsthistorisches Museum (a cúpula)",
        desc: "Mesmo sem entrar, vale a pena ver o átrio e a cúpula pintada pelo exterior à hora de fecho, ou reservar para o dia seguinte.",
        link: "https://pt.wikipedia.org/wiki/Kunsthistorisches_Museum",
        icon: Palette,
        bookingUrl: "[LINK_GETYOURGUIDE_VIENA_KUNSTHISTORISCHES]",
        hours: "Ter–Dom ~10:00–18:00 (valores aprox. 2026)",
        hoursNote: "FECHA À SEGUNDA",
        walkTo: "~5 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Kunsthistorisches%20Museum%2C%20Wien-2397.jpg?width=1600",
        imageAlt: "Átrio e cúpula do Kunsthistorisches Museum em Viena",
      },
    ],
  },
  {
    key: "d3",
    label: "Dia 3",
    date: "Schönbrunn & Prater",
    title: "Schönbrunn & Prater",
    vibe: "O palácio de verão dos Habsburgo de manhã, a roda gigante do Prater à tarde e um Heuriger em Grinzing ao fim do dia.",
    accent: "from-rose-500/20 to-amber-400/10",
    icon: FerrisWheel,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Schoenbrunn%20Palace%20as%20seen%20from%20Neptune%20Fountain%2C%20September%202016.jpg?width=1600",
    coverAlt: "Palácio de Schönbrunn visto da Fonte de Neptuno",
    walkTotal: "A pé hoje: ~25 min no total, mais transporte público.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Schloss+Schoenbrunn+Vienna&daddr=Gloriette+Schoenbrunn+Vienna+to:Prater+Vienna+to:Riesenrad+Vienna+to:Donaukanal+Vienna+to:Grinzing+Vienna&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Schloss+Schoenbrunn+Vienna/Gloriette+Schoenbrunn+Vienna/Prater+Vienna/Riesenrad+Vienna/Donaukanal+Vienna/Grinzing+Vienna/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:00",
        title: "Palácio de Schönbrunn",
        desc: "O palácio de verão dos Habsburgo, com 1441 divisões. O bilhete 'Grand Tour' inclui os aposentos de Maria Teresa e de Francisco José e Sisi.",
        link: "https://pt.wikipedia.org/wiki/Pal%C3%A1cio_de_Sch%C3%B6nbrunn",
        tip: "Reservar hora marcada com antecedência; é a atração mais visitada da Áustria.",
        icon: Crown,
        bookingUrl: "[LINK_GETYOURGUIDE_VIENA_SCHONBRUNN]",
        hours: "Diário ~8:00–17:30 (valores aprox. 2026)",
        walkTo: "~5 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Schoenbrunn%20Palace%20as%20seen%20from%20Neptune%20Fountain%2C%20September%202016.jpg?width=1600",
        imageAlt: "Palácio de Schönbrunn visto da Fonte de Neptuno",
      },
      {
        time: "11:00",
        title: "Jardins & Gloriette",
        desc: "Subir pelos jardins até à Gloriette, o pavilhão no alto da colina, com a melhor vista sobre o palácio e Viena ao fundo.",
        link: "https://pt.wikipedia.org/wiki/Gloriette_(Sch%C3%B6nbrunn)",
        icon: Sun,
        walkTo: "~15 min a subir",
      },
      {
        time: "13:00",
        title: "Almoço rápido",
        desc: "Um Würstelstand ou café perto do palácio antes de seguir para o Prater.",
        icon: Utensils,
        walkTo: "metro/tram",
      },
      {
        time: "14:30",
        title: "Prater & Riesenrad",
        desc: "O grande parque da cidade e a icónica roda gigante Riesenrad, de 1897, com cabines de madeira e vista sobre Viena.",
        link: "https://pt.wikipedia.org/wiki/Prater",
        icon: FerrisWheel,
        bookingUrl: "[LINK_GETYOURGUIDE_VIENA_RIESENRAD]",
        hours: "Diário, horário sazonal (valores aprox. 2026)",
        walkTo: "~10 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Wien%2C%20Prater%2C%20Riesenrad%20--%202018%20--%203165.jpg?width=1600",
        imageAlt: "Roda gigante Riesenrad no Prater, em Viena",
      },
      {
        time: "16:30",
        title: "Donaukanal",
        desc: "Um passeio junto ao canal do Danúbio, com arte urbana, esplanadas e um ambiente bem mais descontraído do que o centro histórico.",
        link: "https://pt.wikipedia.org/wiki/Canal_do_Dan%C3%BAbio",
        icon: Sparkles,
        walkTo: "~10 min",
      },
      {
        time: "19:00",
        title: "Heuriger em Grinzing",
        desc: "Fechar a viagem numa taberna de vinho tradicional nos arredores verdes de Grinzing, com vinho novo da casa e pratos frios ao buffet.",
        link: "https://pt.wikipedia.org/wiki/Heuriger",
        icon: Wine,
        walkTo: "tram/táxi",
      },
    ],
  },
];

// ----------------------- HERO -----------------------

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative z-[2] flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <SmartImage
          sizes="100vw"
          src="https://commons.wikimedia.org/wiki/Special:FilePath/20180109%20Vienna%20State%20Opera%20at%20blue%20hour%20850%209387.jpg?width=2400"
          alt="Ópera Estatal de Viena à hora azul"
          priority
          className="absolute inset-0 h-full w-full object-cover"
          style={{ animation: "wien-kenburns 20s linear infinite alternate" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--city-deep) 62%, transparent), transparent 30%, color-mix(in oklab, var(--city-deep) 68%, transparent) 70%, var(--background) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 32%, color-mix(in oklab, var(--city-deep) 80%, transparent) 100%)",
          }}
        />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 w-full">
        <div className="pointer-events-none absolute right-6 top-24 hidden md:right-12 md:top-28 md:block">
          <PostmarkCircle city="VIENA" year="2026" rotate={-9} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto w-full max-w-6xl px-6 pb-16 pt-36 text-center md:pt-40"
        >
          <div className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold/70" />
            Guia · 3 dias
            <span className="h-px w-8 bg-gold/70" />
          </div>
          <h1
            className="mx-auto font-serif font-semibold"
            style={{
              margin: 0,
              lineHeight: 1.02,
              fontSize: "clamp(3.4rem, 8vw, 6.5rem)",
              backgroundImage:
                "linear-gradient(120deg, var(--city-title-a), var(--city-title-b) 52%, var(--city-title-c))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextStroke: "1px rgba(0,0,0,0.35)",
            }}
          >
            Viena
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-serif text-lg italic text-cream/85 md:text-xl">
            Três dias entre a Hofburg, o Belvedere e a Roda Gigante do Prater.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#overview"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] uppercase tracking-[0.22em] text-cream transition-transform active:scale-95"
              style={{ background: "var(--city-action)", boxShadow: "var(--city-soft-shadow)" }}
            >
              Ver o itinerário <span aria-hidden>↓</span>
            </a>
            <span className="font-hand text-lg text-cream/80">
              toca em cada paragem para ver os detalhes
            </span>
          </div>
          <div className="mt-6">
            <CustomItineraryHeroLink city="Viena" />
          </div>
        </motion.div>
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
      title="O que visitar em Viena: três dias, três humores"
      intro="Cada dia tem o seu cenário e a sua cadência. Imperial de manhã, artístico à tarde, dourado ao fim do dia."
    >
      <FlipDaysGrid />
    </Section>
  );
}

function FlipDaysGrid() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setFlipped((s) => ({ ...s, [k]: !s[k] }));

  return (
    <ul
      id="wien-roteiro-grid"
      className="m-0 grid list-none gap-5 p-0"
      style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
    >
      {days.map((d) => {
        const isFlipped = !!flipped[d.key];
        return (
          <li key={d.key} className="wien-flip-cell" style={{ perspective: 1500 }}>
            <div
              role="button"
              tabIndex={0}
              aria-label={d.title}
              onClick={() => toggle(d.key)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(d.key)}
              className="relative w-full cursor-pointer"
              style={{
                aspectRatio: "3 / 4",
                transformStyle: "preserve-3d",
                transition: "transform .8s cubic-bezier(.2,.8,.2,1)",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* FRONT */}
              <article
                className="absolute inset-0 overflow-hidden rounded-2xl border shadow-[0_12px_40px_-22px_rgba(0,0,0,.85)]"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  borderColor: "color-mix(in oklab, var(--city-action) 25%, transparent)",
                }}
              >
                {d.cover ? (
                  <SmartImage
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 620px"
                    src={d.cover}
                    alt={d.coverAlt ?? d.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-terracotta/30 via-gold/15 to-twilight" />
                )}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,.86), rgba(0,0,0,.2) 48%, transparent)" }} />
                <span
                  className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9.5px] uppercase tracking-[0.18em] backdrop-blur"
                  style={{
                    borderColor: "color-mix(in oklab, var(--city-highlight) 45%, transparent)",
                    background: "color-mix(in oklab, var(--city-deep) 62%, transparent)",
                    color: "var(--city-light)",
                  }}
                >
                  vira →
                </span>
                <div className="absolute inset-x-3.5 bottom-3.5">
                  <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "color-mix(in oklab, var(--city-light) 90%, transparent)" }}>
                    {d.label} · {d.date}
                  </div>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-cream" style={{ lineHeight: 1.05 }}>
                    {d.title}
                  </h3>
                </div>
              </article>
              {/* BACK */}
              <article
                className="absolute inset-0 overflow-hidden rounded-2xl border shadow-[0_12px_40px_-22px_rgba(0,0,0,.85)]"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  borderColor: "color-mix(in oklab, var(--city-action) 35%, transparent)",
                  background:
                    "var(--city-card-back) repeating-linear-gradient(135deg, color-mix(in oklab, var(--city-highlight) 7%, transparent) 0 2px, transparent 2px 13px)",
                }}
              >
                <div
                  className="absolute inset-2.5 flex flex-col rounded-xl border border-dashed p-3.5"
                  style={{ borderColor: "color-mix(in oklab, var(--city-highlight) 45%, transparent)" }}
                >
                  <div className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "var(--city-action)" }}>
                    {d.label} · resumo
                  </div>
                  <h3 className="mt-1.5 font-serif text-xl font-semibold text-cream" style={{ lineHeight: 1.05 }}>
                    {d.title}
                  </h3>
                  <p className="mt-2 font-serif text-[0.92rem] italic text-cream/80" style={{ lineHeight: 1.4 }}>
                    {d.vibe}
                  </p>
                  <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-1.5 text-[11.5px]">
                    <dt className="uppercase tracking-[0.12em]" style={{ color: "color-mix(in oklab, var(--city-highlight) 90%, transparent)" }}>Paragens</dt>
                    <dd className="m-0 text-cream/90">{d.stops.length}</dd>
                    {d.walkTotal && (<>
                      <dt className="uppercase tracking-[0.12em]" style={{ color: "color-mix(in oklab, var(--city-highlight) 90%, transparent)" }}>A pé</dt>
                      <dd className="m-0 text-cream/90">{d.walkTotal.replace(/^A pé hoje:\s*/, "")}</dd>
                    </>)}
                  </dl>
                  <a
                    href={`#${d.key}`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.18em] hover:bg-accent/15"
                    style={{ borderColor: "color-mix(in oklab, var(--city-action) 50%, transparent)", color: "var(--city-light)" }}
                  >
                    Abrir o dia →
                  </a>
                </div>
              </article>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// ----------------------- TIMELINE -----------------------

function StopItem({ stop, idx }: { stop: Stop; idx: number }) {
  const [open, setOpen] = useState(false);
  const Icon = stop.icon;
  const hasExtra = !!(stop.tip || stop.image);

  return (
    <motion.div
      initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="relative pl-16 md:pl-20"
    >
      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-twilight shadow-[var(--city-marker-shadow)] md:left-5">
        <Icon className="h-4 w-4 text-gold" />
      </div>

      <div className="w-full rounded-2xl border border-gold/10 bg-card px-6 py-5 text-left transition-all duration-300 hover:border-gold/30 hover:bg-card/80">
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
        <div
          className={`mt-3 grid gap-4 rounded-2xl border border-gold/15 bg-twilight/60 p-5 ${
            stop.tip && stop.image ? "md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {stop.tip && (
            <div className="flex gap-3">
              <Lightbulb className="mt-1 h-4 w-4 flex-shrink-0 text-gold" />
              <p className="text-sm italic text-cream/90">{stop.tip}</p>
            </div>
          )}
          {stop.image && (
            <SmartImage
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 620px"
              src={stop.image}
              alt={stop.imageAlt ?? stop.title}
              loading="lazy"
              className="h-40 w-full rounded-xl object-cover shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)]"
            />
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

// ----------------------- FOOD -----------------------

function Food() {
  const restaurants: Array<{ name: string; desc: string; link: string; image?: string; imageAlt?: string }> = [
    {
      name: "Figlmüller (Wollzeile / Bäckerstraße)",
      desc: "A casa mais famosa do Wiener Schnitzel em Viena, maior do que o prato. Há sempre fila, mas anda depressa.",
      link: "https://www.figlmueller.at/",
    },
    {
      name: "Café Central",
      desc: "O café mais fotogénico de Viena, com tetos abobadados e uma história ligada a Freud e Trotsky. Ideal para uma Sachertorte à tarde.",
      link: "https://www.cafecentral.wien/",
    },
    {
      name: "Café Hawelka",
      desc: "Kaffeehaus boémio e pequeno, quase inalterado desde os anos 1930s, frequentado por artistas.",
      link: "https://www.google.com/search?q=Cafe+Hawelka+Vienna",
    },
    {
      name: "Naschmarkt (bancas variadas)",
      desc: "Perfeito para um almoço informal, entre queijos, azeitonas, kebabs e pastelaria turca.",
      link: "https://pt.wikipedia.org/wiki/Naschmarkt",
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Wien%2C%20Naschmarkt%20--%202018%20--%203109.jpg?width=1600",
      imageAlt: "Bancas do Naschmarkt em Viena",
    },
  ];

  const dishes: Array<{ name: string; desc: string; icon?: React.ComponentType<{ className?: string }>; image?: string; imageAlt?: string }> = [
    {
      name: "Wiener Schnitzel",
      desc: "O escalope panado de vitela, frito em manteiga clarificada, servido com batata e limão. O prato símbolo de Viena.",
      icon: Utensils,
    },
    {
      name: "Sachertorte",
      desc: "O bolo de chocolate com compota de damasco, criado em 1832. Provar no Hotel Sacher ou num café histórico.",
    },
    {
      name: "Apfelstrudel",
      desc: "O strudel de maçã em massa finíssima, geralmente servido morno com natas ou baunilha.",
    },
    {
      name: "Würstelstand",
      desc: "As bancas de rua com salsichas austríacas (Käsekrainer, Bratwurst), clássico do fast food vienense.",
    },
    {
      name: "Kaffeehäuser",
      desc: "A cultura de café centenária de Viena, Património Cultural Imaterial da UNESCO: Central, Hawelka, Sperl.",
      icon: Coffee,
    },
    {
      name: "Heuriger",
      desc: "As tabernas de vinho novo nos arredores verdes (Grinzing, Nussdorf), com buffet frio e ambiente de aldeia.",
      icon: Wine,
    },
  ];

  return (
    <Section
      id="comer"
      eyebrow="À mesa"
      title="Comer e beber em Viena"
      intro="Sítios testados, sabores para provar sem falta, e uma caixa de armadilhas à mesa."
    >
      <h3 className="mb-6 font-serif text-2xl text-cream">Restaurantes e cafés testados</h3>
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
              <SmartImage
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 620px"
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
                <SmartImage
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 620px"
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
            <li>Fugir dos restaurantes mesmo junto ao Stephansdom: turísticos e caros. Andar poucos minutos para fora.</li>
            <li>A "Sachertorte original" só existe no Hotel Sacher; nos cafés é uma versão à moda da casa, igualmente boa.</li>
            <li>O serviço de mesa (Trinkgeld) não está incluído; deixar cerca de 10% é habitual, entregue diretamente ao pagar.</li>
          </ul>
        </div>
      </motion.div>
    </Section>
  );
}

// ----------------------- BAIRROS -----------------------

function Bairros() {
  const bairros = [
    {
      name: "Innere Stadt (Centro Histórico)",
      desc: "O coração imperial, Património Mundial da UNESCO: Stephansdom, Hofburg, Graben. Caro mas central.",
    },
    {
      name: "Naschmarkt / Mariahilf",
      desc: "Zona vibrante e jovem, boas compras na Mariahilfer Straße e o mercado mais famoso da cidade.",
    },
    {
      name: "Landstraße (Belvedere)",
      desc: "Bairro elegante junto ao Belvedere, mais calmo, bom para alojamento.",
    },
    {
      name: "Grinzing & Döbling",
      desc: "Nos arredores verdes das colinas de vinha, o coração da tradição dos Heuriger.",
    },
  ];
  return (
    <Section
      id="bairros"
      eyebrow="Onde andar"
      title="Bairros de Viena"
      intro="Uma cidade grande mas organizada em anéis: quanto mais perto do centro, mais imperial; quanto mais longe, mais verde."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {bairros.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-2xl border border-gold/15 bg-card p-6"
          >
            <h4 className="font-serif text-xl text-cream">{b.name}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ----------------------- TIPS & TRAPS -----------------------

function Tips() {
  const doIt = [
    "Reservar Schönbrunn, Belvedere e o Sisi Ticket com semanas de antecedência.",
    "Usar os transportes públicos (metro, tram): eficientes, limpos e pontuais.",
    "Provar um café histórico com calma, sem pressa: faz parte da experiência.",
    "Andar a pé pelo centro histórico: é pequeno e todo pedonal.",
    "Verificar concertos e óperas de última hora (bilhetes em pé baratos na Staatsoper).",
  ];
  const dont = [
    "Aparecer sem reserva em Schönbrunn e no Belvedere; esgotam em época alta.",
    "Confundir o Café Sacher (com a torta original) com as imitações que servem 'Sachertorte'.",
    "Ignorar o passe de transportes se ficares mais de 2-3 dias; compensa.",
    "Restaurantes mesmo colados ao Stephansdom.",
    "Esquecer um casaco quente fora do verão; o vento do Danúbio é frio.",
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
    "Sisi Ticket (Hofburg + Schönbrunn + Museu de Mobiliário)",
    "Schönbrunn com hora marcada (Grand Tour)",
    "Belvedere Superior, para ver 'O Beijo' de Klimt",
    "Bilhete de última hora ou tour da Staatsoper",
    "Mesa no Figlmüller ou noutro Gasthaus popular",
    "Opcional: passe de transportes públicos para 2-3 dias",
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
    <footer className="border-t border-gold/10 px-6 py-10 text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-cream/60">
        O Postal · Viena · MMXXVI
      </p>
      <p className="mt-3 font-serif italic text-cream/70">
        Auf Wiedersehen, Wien — bis zum nächsten Walzer.
      </p>
    </footer>
  );
}

// ----------------------- INDEX -----------------------

function Index() {
  return (
    <main id="top" className="theme-viena bg-twilight-radial min-h-screen overflow-x-hidden">
      <ReadingProgressBar />
      <StickyNav />
      <WienHeroStyles />
      <Hero />
      <ConhecerViena />
      <EssentialInfo />
      <Overview />
      <Itineraries />
      <Food />
      <Bairros />
      <Tips />
      <Checklist />
      <FinalStamp code="VIE" />
      <CustomItineraryCTA city="Viena" />
      <OutrosPostais currentSlug="viena" />
      <SiteFooter city="Viena" farewell="Auf Wiedersehen, Wien — bis zum nächsten Walzer." />
    </main>
  );
}

function WienHeroStyles() {
  return (
    <style>{`
      @keyframes wien-kenburns { from { transform: scale(1.04); } to { transform: scale(1.14); } }
      @media (max-width: 900px) {
        #wien-roteiro-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      }
      @media (max-width: 560px) {
        #wien-roteiro-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}

function ReadingProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setPct(height > 0 ? (scrolled / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full transition-[width] duration-100"
        style={{
          width: `${pct}%`,
          background:
            "linear-gradient(90deg, var(--city-action), oklch(0.83 0.16 78), var(--city-light))",
          boxShadow: "0 0 10px color-mix(in oklab, var(--city-action) 55%, transparent)",
        }}
      />
    </div>
  );
}

// ----------------------- STICKY NAV -----------------------

const navLinks = [
  { id: "d1", label: "Dia 1" },
  { id: "d2", label: "Dia 2" },
  { id: "d3", label: "Dia 3" },
  { id: "comer", label: "Comer" },
  { id: "bairros", label: "Bairros" },
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
          <SmartImage
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
                      layoutId="nav-underline-viena"
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

// ----------------------- CONHECER VIENA -----------------------

const climaMeses: Array<[string, string, string, string]> = [
  ["Jan", "3", "-2", "baixa"],
  ["Fev", "5", "-1", "baixa"],
  ["Mar", "10", "2", "média"],
  ["Abr", "16", "6", "média"],
  ["Mai", "21", "11", "alta"],
  ["Jun", "24", "14", "alta"],
  ["Jul", "26", "16", "alta"],
  ["Ago", "26", "16", "alta"],
  ["Set", "21", "12", "média"],
  ["Out", "14", "7", "média"],
  ["Nov", "8", "3", "média"],
  ["Dez", "4", "-1", "baixa"],
];

const eventos: Array<{ nome: string; quando: string; desc: string }> = [
  {
    nome: "Mercados de Natal (Christkindlmarkt)",
    quando: "final de novembro a dezembro",
    desc: "Mercados de Natal por toda a cidade, com destaque para o da Rathausplatz, com vinho quente e artesanato.",
  },
  {
    nome: "Baile da Ópera (Wiener Opernball)",
    quando: "fevereiro",
    desc: "O mais famoso baile de Viena, na Staatsoper, símbolo da tradição valsante da cidade.",
  },
  {
    nome: "Donauinselfest",
    quando: "verão (jun)",
    desc: "Um dos maiores festivais gratuitos da Europa, na Ilha do Danúbio, com concertos ao ar livre.",
  },
];

function ConhecerViena() {
  const itemCls = "glass rounded-2xl border border-gold/15 px-5 sm:px-6 overflow-hidden";
  const triggerCls = "py-5 font-serif text-lg sm:text-xl text-cream hover:no-underline gap-3";
  const iconCls =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30 text-gold";

  return (
    <Section
      id="conhecer"
      eyebrow="Contexto"
      title="Conhecer Viena"
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
          <SmartImage
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Wien%2C%20Hofburg%20--%202018%20--%203187.jpg?width=1600"
            alt="Fachada da Hofburg em Viena"
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
                Viena em 2 minutos
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-cream/90 space-y-3">
              <p>Capital da Áustria e antiga sede do Império Austro-Húngaro dos Habsburgo.</p>
              <p>
                Cidade da música clássica (Mozart, Beethoven, Strauss), do café e da arte de Klimt e Schiele.
              </p>
              <p>
                Centro histórico compacto e pedonal, classificado Património Mundial pela UNESCO.
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
                <span className="text-gold">Primavera (abr–mai) e outono (set–out):</span> clima ameno e menos multidões.
              </p>
              <p>
                <span className="text-gold">Dezembro:</span> mágico pelos mercados de Natal, mas frio.
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
                Médias aproximadas (confirmar); invernos frios e por vezes com neve, verões amenos.
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
    body: "CET (UTC+1). Viena está 1 hora à frente de Lisboa.",
  },
  {
    icon: Coins,
    title: "Moeda",
    body: "Euro (EUR). A mesma de Portugal, sem conversões nem surpresas de câmbio: a Áustria é membro da Eurozona.",
  },
  {
    icon: Plug,
    title: "Tomadas",
    body: "Tipo F, 230 V / 50 Hz. As fichas portuguesas encaixam sem adaptador.",
  },
  {
    icon: Phone,
    title: "Emergência",
    body: "112 (geral europeu). Levar o Cartão Europeu de Seguro de Doença.",
  },
  {
    icon: TrainFront,
    title: "Como chegar",
    body: "Do Aeroporto de Viena-Schwechat, o comboio City Airport Train (CAT) ou o S-Bahn (S7) chegam ao centro em cerca de 20-25 minutos. Comboios internacionais chegam à Wien Hauptbahnhof.",
  },
  {
    icon: HandCoins,
    title: "Gorjetas",
    body: "Não é obrigatória, mas é habitual arredondar ou deixar cerca de 10% ao pagar diretamente ao empregado.",
  },
];

const phrases = [
  ["Olá", "Grüß Gott / Hallo"],
  ["Obrigado", "Danke (schön)"],
  ["Por favor", "Bitte"],
  ["Sim / Não", "Ja / Nein"],
  ["Quanto custa?", "Wie viel kostet das?"],
  ["Saúde (brinde)", "Prost / Zum Wohl"],
];

function EssentialInfo() {
  return (
    <Section
      id="essencial"
      eyebrow="Antes de partir"
      title="Essencial para a viagem"
      intro="O básico para chegar leve: fuso, dinheiro, transporte e um punhado de palavras em alemão para abrir portas (e sorrisos)."
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
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30"
                style={{ boxShadow: "0 0 12px color-mix(in oklab, var(--city-action) 45%, transparent)" }}
              >
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-serif text-xl text-cream">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
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
            <h4 className="font-serif text-lg text-gold">Innere Stadt (Centro)</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              A pé de tudo, ideal para a primeira visita.
            </p>
            <AffiliateLink href="" />
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Naschmarkt / Mariahilf</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Animado, bom para compras e vida noturna, perto do centro.
            </p>
            <AffiliateLink href="" />
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Landstraße (Belvedere)</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Mais calmo e elegante, junto ao Belvedere.
            </p>
            <AffiliateLink href="" />
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
          {phrases.map(([pt, de]) => (
            <li
              key={pt}
              className="flex items-baseline justify-between gap-3 border-b border-gold/10 pb-2"
            >
              <span className="text-sm text-muted-foreground">{pt}</span>
              <span className="font-serif text-lg italic text-gold">{de}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}
