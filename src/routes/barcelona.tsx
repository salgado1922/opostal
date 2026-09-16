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
  ExternalLink,
  Footprints,
  Info,
  Calendar,
  CloudSun,
  PartyPopper,
  TrainFront,
  Palette,
  Camera,
  Waves,
  TreePine,
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

const HERO_IMG =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Sagrada_Familia_01.jpg?width=2400";

const SHARE_IMG =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Sagrada_Familia_01.jpg?width=1200";

export const Route = createFileRoute("/barcelona")({
  head: () => ({
    meta: [
      { title: "O que visitar em Barcelona: roteiro de 3 dias | O Postal" },
      {
        name: "description",
        content:
          "O que visitar em Barcelona em 3 dias: Sagrada Família, Passeig de Gràcia, Park Güell, Barri Gòtic, La Boqueria, Montjuïc e Barceloneta. Dicas, comida e o que reservar.",
      },
      { property: "og:title", content: "O que visitar em Barcelona: roteiro de 3 dias | O Postal" },
      {
        property: "og:description",
        content:
          "O que visitar em Barcelona em 3 dias: Sagrada Família, Park Güell, Barri Gòtic, La Boqueria, Montjuïc e Barceloneta. Dicas, comida e o que reservar.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://opostal.pt/barcelona" },
      { property: "og:image", content: SHARE_IMG },
      { name: "twitter:title", content: "O que visitar em Barcelona: roteiro de 3 dias | O Postal" },
      {
        name: "twitter:description",
        content:
          "O que visitar em Barcelona em 3 dias: Sagrada Família, Park Güell, Barri Gòtic, La Boqueria, Montjuïc e Barceloneta.",
      },
      { name: "twitter:image", content: SHARE_IMG },
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/barcelona" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          headline: "O que visitar em Barcelona: roteiro de 3 dias",
          name: "O que visitar em Barcelona: roteiro de 3 dias",
          url: "https://opostal.pt/barcelona",
          image: SHARE_IMG,
          description:
            "O que visitar em Barcelona em 3 dias: Sagrada Família, Passeig de Gràcia, Park Güell, Barri Gòtic, La Boqueria, Montjuïc e Barceloneta.",
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
    <section id={id} className="relative scroll-mt-20 px-5 py-12 md:scroll-mt-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-8 max-w-3xl md:mb-14"
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
    date: "Modernisme & Passeig de Gràcia",
    title: "Sagrada Família & Passeig de Gràcia",
    vibe: "A obra-prima de Gaudí pela manhã, a avenida das casas modernistas à tarde e o pôr do sol no Park Güell.",
    accent: "from-amber-400/30 to-rose-400/10",
    icon: Sun,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sagrada_Familia_01.jpg?width=1400",
    coverAlt: "Torres da Sagrada Família em Barcelona",
    walkTotal: "A pé hoje: ~6 km, mais um trajeto de metro até ao Park Güell.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Sagrada+Familia+Barcelona&daddr=Passeig+de+Gracia+Barcelona+to:Casa+Batllo+Barcelona+to:La+Pedrera+Barcelona+to:Park+Guell+Barcelona&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Sagrada+Familia+Barcelona/Passeig+de+Gracia+Barcelona/Casa+Batllo+Barcelona/La+Pedrera+Barcelona/Park+Guell+Barcelona/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:00",
        title: "Sagrada Família",
        desc: "A obra-prima inacabada de Antoni Gaudí, em construção desde 1882. As fachadas do Nascimento e da Paixão contam a história de Cristo em pedra, e o interior é uma floresta de colunas com uma luz filtrada por vitrais que muda ao longo do dia.",
        link: "https://www.google.com/maps/search/?api=1&query=Sagrada+Familia+Barcelona",
        tip: "Reserva com semanas de antecedência e escolhe a hora da manhã: a luz entra pelos vitrais azuis e verdes do lado nascente.",
        icon: Church,
        bookingUrl: "",
        hours: "Diário, aprox. 9h–18h/20h consoante a época",
        walkTo: "~25 min a pé, ou metro L2/L3/L5 até Diagonal",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sagrada_Familia_01.jpg?width=1400",
        imageAlt: "Interior da Sagrada Família com as colunas em forma de árvore",
      },
      {
        time: "11:30",
        title: "Passeig de Gràcia",
        desc: "A grande avenida modernista de Barcelona, com as lojas de luxo e, sobretudo, as fachadas de Gaudí, Puig i Cadafalch e Domènech i Montaner lado a lado no chamado 'Quarteirão da Discórdia'.",
        link: "https://www.google.com/maps/search/?api=1&query=Passeig+de+Gracia+Barcelona",
        icon: Sparkles,
        walkTo: "~2 min",
      },
      {
        time: "11:45",
        title: "Casa Batlló",
        desc: "A fachada ondulante coberta de mosaicos de vidro, com a cobertura em forma de dragão. Uma das obras mais fotografadas de Gaudí, por fora já vale a paragem.",
        link: "https://www.google.com/maps/search/?api=1&query=Casa+Batllo+Barcelona",
        tip: "O bilhete é caro; se o orçamento for limitado, admira a fachada e guarda o interior para uma próxima viagem.",
        icon: Castle,
        bookingUrl: "",
        hours: "Diário, aprox. 9h–20h",
        walkTo: "~5 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Casa_Batll%C3%B3%2C_Barcelona_57.jpg?width=1400",
        imageAlt: "Fachada da Casa Batlló em Barcelona",
      },
      {
        time: "12:30",
        title: "La Pedrera (Casa Milà)",
        desc: "A fachada em pedra ondulada, sem uma única linha reta, e a cobertura com as chaminés-guerreiro que inspiraram Star Wars. Outra obra-prima de Gaudí, poucos metros acima na mesma avenida.",
        link: "https://www.google.com/maps/search/?api=1&query=La+Pedrera+Casa+Mila+Barcelona",
        icon: Castle,
        bookingUrl: "",
        hours: "Diário, aprox. 9h–20h30",
        walkTo: "~5 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Casa_Mil%C3%A0%2C_general_view.jpg?width=1400",
        imageAlt: "Fachada ondulada de La Pedrera (Casa Milà)",
      },
      {
        time: "13:30",
        title: "Almoço num bistrô perto do Passeig de Gràcia",
        desc: "Aproveitar o 'menú del día' (menu de almoço, valores aproximados de 2026 entre 15€ e 20€ com bebida) numa das ruas laterais, mais barato do que a avenida principal.",
        icon: Utensils,
        walkTo: "metro L3/L4 até Lesseps ou autocarro até ao Park Güell",
      },
      {
        time: "16:00",
        title: "Park Güell",
        desc: "O parque público desenhado por Gaudí, com o banco-mosaico ondulado, a sala hipóstila de colunas inclinadas e as vistas sobre toda a cidade até ao mar. A zona monumental tem entrada paga; o resto do parque é livre.",
        link: "https://www.google.com/maps/search/?api=1&query=Park+Guell+Barcelona",
        tip: "Reservar hora de entrada na zona monumentada com antecedência; é um dos bilhetes que mais esgota em Barcelona.",
        icon: TreePine,
        bookingUrl: "",
        hours: "Diário, aprox. 9h30–19h30",
        walkTo: "",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Park_G%C3%BCell_02.jpg?width=1400",
        imageAlt: "Banco de mosaico ondulado no Park Güell",
      },
    ],
  },
  {
    key: "d2",
    label: "Dia 2",
    date: "Barri Gòtic & Born",
    title: "Gòtic, Born e La Boqueria",
    vibe: "Ruas medievais estreitas, o mercado mais famoso da cidade e a arte de Picasso escondida no Born.",
    accent: "from-amber-300/30 to-violet-500/10",
    icon: Palette,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Main_facade_of_Barcelona_Cathedral_-_2013.JPG?width=1400",
    coverAlt: "Catedral de Barcelona no Barri Gòtic",
    howToGet: "Como andar: tudo a pé, o centro histórico é compacto.",
    highlightTip:
      "Dica: a Catedral tem uma janela gratuita ao final da tarde (verificar horário no local); o Museu Picasso costuma ter tarde gratuita ao domingo, mas confirma sempre antes.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=La+Rambla+Barcelona&daddr=Mercat+de+la+Boqueria+Barcelona+to:Barcelona+Cathedral+to:Museu+Picasso+Barcelona+to:Santa+Maria+del+Mar+Barcelona&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/La+Rambla+Barcelona/Mercat+de+la+Boqueria+Barcelona/Barcelona+Cathedral/Museu+Picasso+Barcelona/Santa+Maria+del+Mar+Barcelona/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:00",
        title: "La Rambla",
        desc: "A avenida arborizada mais famosa de Barcelona, entre a Plaça de Catalunya e o porto. Andar cedo, antes das multidões, para sentir o ambiente sem o aperto.",
        link: "https://www.google.com/maps/search/?api=1&query=La+Rambla+Barcelona",
        tip: "Atenção aos carteiristas, é a zona mais concorrida da cidade.",
        icon: Sparkles,
        walkTo: "~5 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/La_Boqueria%2C_Barcelona.jpg?width=1400",
        imageAlt: "La Rambla em Barcelona",
      },
      {
        time: "09:30",
        title: "Mercat de la Boqueria",
        desc: "O mercado municipal mais conhecido da cidade, com bancas de fruta cortada, presunto ibérico, marisco fresco e pequenos balcões de tapas. Ótimo para um pequeno-almoço tardio ou um copo de sumo natural.",
        link: "https://www.google.com/maps/search/?api=1&query=Mercat+de+la+Boqueria+Barcelona",
        tip: "As bancas mais perto da entrada da Rambla são mais caras; entra até ao fundo do mercado.",
        icon: Utensils,
        walkTo: "~10 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/La_Boqueria%2C_Barcelona.jpg?width=1400",
        imageAlt: "Bancas de fruta e produtos frescos no Mercat de la Boqueria",
      },
      {
        time: "11:00",
        title: "Catedral de Barcelona (Barri Gòtic)",
        desc: "A catedral gótica do bairro mais antigo da cidade, com um claustro tranquilo onde vivem treze gansos brancos, um por cada ano de vida de Santa Eulália. À volta, um labirinto de ruas medievais estreitas.",
        link: "https://www.google.com/maps/search/?api=1&query=Barcelona+Cathedral",
        icon: Church,
        bookingUrl: "",
        hours: "Diário, aprox. 9h30–18h30 (fora dos horários de missa)",
        walkTo: "~15 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Main_facade_of_Barcelona_Cathedral_-_2013.JPG?width=1400",
        imageAlt: "Fachada da Catedral de Barcelona",
      },
      {
        time: "13:00",
        title: "Almoço no Born",
        desc: "Descer até ao bairro do Born para um almoço de tapas ou de menú del día numa das ruelas à volta do mercat.",
        icon: Utensils,
        walkTo: "~10 min",
      },
      {
        time: "14:30",
        title: "Museu Picasso",
        desc: "Instalado em cinco palácios medievais, guarda a maior coleção do mundo dedicada aos primeiros anos de Picasso, incluindo a série completa de 'Las Meninas' que reinterpreta Velázquez.",
        link: "https://www.google.com/maps/search/?api=1&query=Museu+Picasso+Barcelona",
        tip: "Comprar bilhete online com hora marcada; a fila à porta pode ser longa.",
        icon: Palette,
        bookingUrl: "",
        hours: "Ter–Dom, aprox. 10h–19h (fecha à segunda)",
        hoursNote: "FECHA À SEGUNDA",
        walkTo: "~5 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Carrer_Montcada2-Barcelona(Catalonia).jpg?width=1400",
        imageAlt: "Pátio do Museu Picasso em Barcelona",
      },
      {
        time: "16:30",
        title: "Basílica de Santa Maria del Mar",
        desc: "A igreja gótica catalã mais pura da cidade, erguida pelo povo do bairro no século XIV, com um interior amplo e austero que impressiona pela verticalidade das colunas.",
        link: "https://www.google.com/maps/search/?api=1&query=Santa+Maria+del+Mar+Barcelona",
        icon: Church,
        walkTo: "~5 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Santa_Maria_del_Mar_Barcelona_September_2026-1.jpg?width=1400",
        imageAlt: "Interior gótico da Basílica de Santa Maria del Mar",
      },
      {
        time: "18:00",
        title: "Vermut na Barceloneta ou no Born",
        desc: "Fechar a tarde com a tradição catalã do vermut, servido com azeitonas e umas patatas bravas, numa esplanada do bairro.",
        icon: Wine,
      },
    ],
  },
  {
    key: "d3",
    label: "Dia 3",
    date: "Montjuïc & Mar",
    title: "Montjuïc, Barceloneta e Gràcia",
    vibe: "Vistas da colina de Montjuïc, praia e passeio pelo porto, e a noite tranquila do bairro de Gràcia.",
    accent: "from-rose-500/20 to-amber-400/10",
    icon: Waves,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Barcelona_-_Museu_Nacional_d%27Art_de_Catalunya_02_2017-12-27.jpg?width=1400",
    coverAlt: "Museu Nacional d'Art de Catalunya em Montjuïc",
    walkTotal: "A pé hoje: ~7 km, com um trajeto de metro ou autocarro até Montjuïc.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Placa+Espanya+Barcelona&daddr=MNAC+Barcelona+to:Font+Magica+Montjuic+to:Barceloneta+Beach+Barcelona+to:Parc+de+la+Ciutadella+Barcelona&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Placa+Espanya+Barcelona/MNAC+Barcelona/Font+Magica+Montjuic/Barceloneta+Beach+Barcelona/Parc+de+la+Ciutadella+Barcelona/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:30",
        title: "Museu Nacional d'Art de Catalunya (MNAC)",
        desc: "No alto de Montjuïc, num palácio monumental construído para a Exposição de 1929, guarda a maior coleção de arte românica do mundo e um terraço com uma das melhores vistas de Barcelona.",
        link: "https://www.google.com/maps/search/?api=1&query=MNAC+Barcelona",
        icon: Palette,
        bookingUrl: "",
        hours: "Ter–Sáb aprox. 10h–18h, Dom até às 15h (fecha à segunda)",
        walkTo: "~10 min a descer",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Barcelona_-_Museu_Nacional_d%27Art_de_Catalunya_02_2017-12-27.jpg?width=1400",
        imageAlt: "Fachada do MNAC em Montjuïc",
      },
      {
        time: "11:30",
        title: "Jardins e Font Màgica de Montjuïc",
        desc: "Os jardins da colina, com o Poble Espanyol e o Castell de Montjuïc como opções extra para quem tiver tempo. A Font Màgica, com o seu espetáculo de água, luz e música, funciona apenas ao final da tarde/noite.",
        link: "https://www.google.com/maps/search/?api=1&query=Font+Magica+Montjuic+Barcelona",
        tip: "Se quiseres ver o espetáculo da fonte, é preciso voltar aqui já de noite; confirma os dias e horas de funcionamento antes.",
        icon: Sparkles,
        walkTo: "metro ou autocarro até à Barceloneta",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Barcelona_133.JPG?width=1400",
        imageAlt: "Font Màgica de Montjuïc iluminada à noite",
      },
      {
        time: "13:30",
        title: "Almoço na Barceloneta",
        desc: "O antigo bairro de pescadores, hoje cheio de marisqueiras. Provar uma paella ou um arroz de marisco perto do porto, ou petiscar bombas (bolinhos de batata recheados) numa taverna local.",
        link: "https://www.google.com/maps/search/?api=1&query=Barceloneta+Barcelona",
        icon: Utensils,
        walkTo: "~5 min até à praia",
      },
      {
        time: "15:00",
        title: "Praia da Barceloneta",
        desc: "A praia urbana mais conhecida da cidade, com o passeio marítimo, os beach bars (xiringuitos) e vista sobre o W Barcelona (Hotel Vela).",
        link: "https://www.google.com/maps/search/?api=1&query=Barceloneta+Beach+Barcelona",
        icon: Waves,
        walkTo: "~20 min a pé pelo passeio marítimo",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_the_Promenade_and_Somorrostro_Beach_in_Barcelona_(51225533277).jpg?width=1400",
        imageAlt: "Praia da Barceloneta com o passeio marítimo",
      },
      {
        time: "16:30",
        title: "Parc de la Ciutadella",
        desc: "O grande parque verde da cidade, com a cascada monumental (com participação inicial de Gaudí), lagoa para passeios de barco e o edifício do Parlamento da Catalunha.",
        link: "https://www.google.com/maps/search/?api=1&query=Parc+de+la+Ciutadella+Barcelona",
        icon: TreePine,
        walkTo: "metro ou taxi até Gràcia",
      },
      {
        time: "19:00",
        title: "Bairro de Gràcia",
        desc: "Um antigo município independente incorporado por Barcelona, com praças pequenas e sombreadas, lojas independentes e um ambiente de bairro genuíno, longe do turismo do centro. Bom sítio para jantar tapas fora do circuito principal.",
        link: "https://www.google.com/maps/search/?api=1&query=Gracia+Barcelona",
        tip: "A Plaça del Sol e a Plaça de la Vila de Gràcia enchem-se de gente local ao fim da tarde; ótimo para sentir o ritmo real da cidade.",
        icon: Sparkles,
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
          src={HERO_IMG}
          alt="Torres da Sagrada Família ao entardecer, em Barcelona"
          priority
          className="absolute inset-0 h-full w-full object-cover"
          style={{ animation: "bcn-kenburns 20s linear infinite alternate" }}
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
          <PostmarkCircle city="BARCELONA" year="2025" rotate={-9} />
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
            Barcelona
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-serif text-lg italic text-cream/85 md:text-xl">
            Três dias entre Gaudí, o Barri Gòtic e o Mediterrâneo.
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
            <CustomItineraryHeroLink city="Barcelona" />
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
      title="O que visitar em Barcelona: três dias, três humores"
      intro="Cada dia tem o seu cenário e a sua cadência. Modernisme de manhã, ruas medievais ao meio-dia, mar ao fim da tarde."
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
      id="bcn-roteiro-grid"
      className="m-0 grid list-none gap-5 p-0"
      style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
    >
      {days.map((d) => {
        const isFlipped = !!flipped[d.key];
        return (
          <li key={d.key} className="bcn-flip-cell" style={{ perspective: 1500 }}>
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
      name: "La Boqueria (bancas de tapas)",
      desc: "El Quim de la Boqueria e Bar Pinotxo são referências dentro do mercado para um pequeno-almoço ou almoço rápido de tapas.",
      link: "https://www.google.com/maps/search/?api=1&query=Mercat+de+la+Boqueria+Barcelona",
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/La_Boqueria%2C_Barcelona.jpg?width=1400",
      imageAlt: "Bancas de tapas dentro do Mercat de la Boqueria",
    },
    {
      name: "Taverna do Born ou da Barceloneta",
      desc: "Qualquer taverna local com esplanada para o ritual do vermut com patatas bravas ao fim da tarde.",
      link: "https://www.google.com/maps/search/?api=1&query=vermuteria+Barcelona",
    },
    {
      name: "Marisqueira na Barceloneta",
      desc: "Paella ou fideuà (massa curta com marisco) junto ao porto, o clássico almoço de domingo dos barceloneses.",
      link: "https://www.google.com/maps/search/?api=1&query=paella+Barceloneta+Barcelona",
    },
    {
      name: "Xocolateria no centro",
      desc: "Xurros amb xocolata bem quentes, ideais para a manhã ou depois do jantar.",
      link: "https://www.google.com/maps/search/?api=1&query=xurros+Barcelona",
    },
  ];

  const dishes: Array<{ name: string; desc: string; icon?: React.ComponentType<{ className?: string }>; image?: string; imageAlt?: string }> = [
    {
      name: "Pa amb tomàquet",
      desc: "Pão torrado esfregado com tomate maduro, alho e azeite, a base de quase todas as refeições catalãs.",
    },
    {
      name: "Tapas variadas",
      desc: "Patatas bravas, croquetas, pimientos de padrón e pulpo a la gallega, para partilhar à mesa.",
      icon: Utensils,
    },
    {
      name: "Vermut",
      desc: "O aperitivo de fim de tarde por excelência em Barcelona, servido com gelo e uma azeitona.",
      icon: Wine,
    },
    {
      name: "Xurros amb xocolata",
      desc: "Churros crocantes para mergulhar em chocolate quente e espesso.",
    },
    {
      name: "Bombas de la Barceloneta",
      desc: "Bolinhos de puré de batata recheados de carne, panados e fritos, servidos com maionese e molho picante. Criados no bairro de pescadores.",
    },
    {
      name: "Paella / Fideuà",
      desc: "Arroz ou massa curta com marisco, mais um prato valenciano do que catalão, mas onipresente na costa junto ao mar.",
    },
  ];

  return (
    <Section
      id="comer"
      eyebrow="À mesa"
      title="Comer e beber em Barcelona"
      intro="Sabores para provar sem falta, sítios de referência, e uma nota sobre onde evitar armadilhas de turista."
    >
      <h3 className="mb-6 font-serif text-2xl text-cream">Sítios de referência</h3>
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
                <span className="text-[10px] uppercase tracking-[0.25em]">Sítio recomendado</span>
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
            <li>Fugir dos restaurantes com fotos e menus em várias línguas na própria La Rambla: caros e pouco autênticos.</li>
            <li>Confirmar sempre o preço da paella e do marisco antes de pedir; muitas vezes é cobrado ao peso ou por pessoa.</li>
            <li>O "pan" (pão) na mesa costuma ter custo à parte, ainda que pequeno; não é engano.</li>
          </ul>
        </div>
      </motion.div>
    </Section>
  );
}

// ----------------------- TIPS & TRAPS -----------------------

function Tips() {
  const doIt = [
    "Reservar Sagrada Família e Park Güell com semanas de antecedência; esgotam.",
    "Andar a pé pelo Barri Gòtic e pelo Born, são bairros feitos para se perder sem pressa.",
    "Ir cedo à Boqueria e à Rambla, antes dos grupos de turismo.",
    "Usar o metro para Montjuïc e para o Park Güell, poupa pernas.",
    "Vigiar a carteira em zonas concorridas: La Rambla, o metro e a praia.",
  ];
  const dont = [
    "Aparecer sem bilhete na Sagrada Família ou no Park Güell.",
    "Aceitar 'roses' ou pulseiras oferecidas na rua; costumam pedir dinheiro depois.",
    "Confiar em jogos de cartas ou apostas de rua perto de zonas turísticas: são burlas.",
    "Deixar telemóvel ou carteira visíveis em esplanadas na Barceloneta ou na Rambla.",
    "Nadar fora das zonas vigiadas da praia.",
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
    "Sagrada Família (hora marcada, esgota semanas antes)",
    "Zona monumental do Park Güell (hora marcada)",
    "Casa Batlló e/ou La Pedrera, se quiseres entrar",
    "Museu Picasso (bilhete online)",
    "Mesa de jantar num bairro fora do circuito turístico (Gràcia, Born)",
    "Opcional: excursão de 1 dia a Montserrat ou à Costa Brava",
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
      <p className="mb-3 font-serif text-lg italic text-gold/85">Adéu, Barcelona!</p>
      <p className="text-[11px] uppercase tracking-[0.3em] text-cream/60">
        O Postal · Barcelona · MMXXVI
      </p>
    </footer>
  );
}

// ----------------------- CONHECER BARCELONA -----------------------

const climaMeses: Array<[string, string, string, string]> = [
  ["Jan", "13", "5", "média"],
  ["Fev", "14", "6", "média"],
  ["Mar", "16", "8", "média"],
  ["Abr", "18", "10", "alta"],
  ["Mai", "21", "13", "média"],
  ["Jun", "25", "17", "baixa"],
  ["Jul", "28", "20", "baixa"],
  ["Ago", "29", "21", "baixa"],
  ["Set", "26", "18", "média"],
  ["Out", "22", "14", "alta"],
  ["Nov", "17", "9", "média"],
  ["Dez", "14", "6", "média"],
];

const eventos: Array<{ nome: string; quando: string; desc: string }> = [
  {
    nome: "Festes de Santa Eulàlia",
    quando: "fevereiro",
    desc: "Festa de inverno da padroeira da cidade, com gigantes, castells (torres humanas) e fogo-de-artifício.",
  },
  {
    nome: "Festes de Sant Jordi",
    quando: "23 de abril",
    desc: "O dia do livro e da rosa na Catalunha; as ruas enchem-se de bancas de livros e flores.",
  },
  {
    nome: "Festes de la Mercè",
    quando: "final de setembro",
    desc: "A maior festa da cidade, com correfocs (corridas de fogo), castells e concertos gratuitos por toda Barcelona.",
  },
];

function ConhecerBarcelona() {
  const itemCls = "glass rounded-2xl border border-gold/15 px-5 sm:px-6 overflow-hidden";
  const triggerCls = "py-5 font-serif text-lg sm:text-xl text-cream hover:no-underline gap-3";
  const iconCls =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30 text-gold";

  return (
    <Section
      id="conhecer"
      eyebrow="Contexto"
      title="Conhecer Barcelona"
      intro="Contexto rápido antes de partir; abre só o que te interessar."
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mx-auto max-w-3xl"
      >
        <Accordion type="multiple" className="flex flex-col gap-4">
          <AccordionItem value="overview" className={itemCls}>
            <AccordionTrigger className={triggerCls}>
              <span className="flex items-center gap-3">
                <span className={iconCls}>
                  <Info className="h-4 w-4" />
                </span>
                Barcelona em 2 minutos
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-cream/90 space-y-3">
              <p>Capital da Catalunha, entre a serra de Collserola e o Mediterrâneo.</p>
              <p>A cidade de Gaudí e do Modernisme, mas também de dois mil anos de história romana e medieval no Barri Gòtic.</p>
              <p>
                Compacta o suficiente para se explorar quase toda a pé, com um bom metro para os extremos como Montjuïc ou o Park Güell.
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
                <span className="text-gold">Primavera (abr–mai) e outono (set–out):</span> temperaturas agradáveis e menos calor húmido.
              </p>
              <p>
                <span className="text-gold">Evitar agosto:</span> muito calor e muita gente, embora seja quando o mar está mais quente.
              </p>
              <p className="font-serif italic text-gold/90 pt-2">Equilíbrio ideal: maio ou setembro/outubro.</p>
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
                Médias aproximadas (confirmar); verões quentes e secos, invernos suaves.
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
    body: "CET (UTC+1). Barcelona está 1 hora à frente de Lisboa.",
  },
  {
    icon: Coins,
    title: "Moeda",
    body: "Euro. A mesma de Portugal, sem conversões nem surpresas de câmbio.",
  },
  {
    icon: Plug,
    title: "Tomadas",
    body: "Tipo C e F, 230 V / 50 Hz. As fichas portuguesas encaixam sem adaptador.",
  },
  {
    icon: Phone,
    title: "Emergência",
    body: "112 (geral europeu). Levar o Cartão Europeu de Seguro de Doença.",
  },
  {
    icon: TrainFront,
    title: "Como chegar e circular",
    body: "Do Aeroporto El Prat, o Aerobús ou a linha de comboio R2 Nord chegam ao centro em ~35 min. Depois, o metro cobre quase toda a cidade.",
  },
  {
    icon: HandCoins,
    title: "Gorjetas",
    body: "Não é obrigatória; arredondar a conta ou deixar 5-10% em restaurantes chega perfeitamente bem.",
  },
];

function EssentialInfo() {
  return (
    <Section
      id="essencial"
      eyebrow="Antes de partir"
      title="Essencial para a viagem"
      intro="O básico para chegar leve: fuso, dinheiro, transporte e como circular na cidade."
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
          Três bairros a considerar; qualquer um funciona muito bem para um guia de 3 dias.
        </p>
        <ul className="grid gap-4 md:grid-cols-3">
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Eixample / Passeig de Gràcia</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Central, elegante e rodeado de modernismo. A pé ou de metro para quase tudo.
            </p>
            <AffiliateLink href="https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DEixample%252C%2BBarcelona%252C%2BEspanha%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=barcelona-eixample" label="Ver alojamentos no Eixample" />
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Barri Gòtic / Born</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              O coração histórico, ruas estreitas e vida noturna, a pé de tudo no centro.
            </p>
            <AffiliateLink href="https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DBarri%2BG%25C3%25B2tic%252C%2BBarcelona%252C%2BEspanha%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=barcelona-barri-gotic" label="Ver alojamentos no Gòtic/Born" />
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Barceloneta</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Junto à praia e ao mar, com ambiente descontraído de bairro de pescadores.
            </p>
            <AffiliateLink href="https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DBarceloneta%252C%2BBarcelona%252C%2BEspanha%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=barcelona-barceloneta" label="Ver alojamentos na Barceloneta" />
          </li>
        </ul>
      </motion.div>
    </Section>
  );
}

// ----------------------- INDEX -----------------------

function Index() {
  return (
    <main id="top" className="theme-barcelona bg-twilight-radial min-h-screen overflow-x-hidden">
      <ReadingProgressBar />
      <StickyNav />
      <BarcelonaHeroStyles />
      <Hero />
      <ConhecerBarcelona />
      <EssentialInfo />
      <Overview />
      <Itineraries />
      <Food />
      <Tips />
      <Checklist />
      <FinalStamp code="BCN" />
      <CustomItineraryCTA city="Barcelona" />
      <OutrosPostais currentSlug="barcelona" />
      <SiteFooter city="Barcelona" farewell="Adéu, Barcelona!" />
    </main>
  );
}

function BarcelonaHeroStyles() {
  return (
    <style>{`
      @keyframes bcn-kenburns { from { transform: scale(1.04); } to { transform: scale(1.14); } }
      @media (max-width: 900px) {
        #bcn-roteiro-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      }
      @media (max-width: 560px) {
        #bcn-roteiro-grid { grid-template-columns: 1fr !important; }
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
                      layoutId="nav-underline-barcelona"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gold"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

      </div>

      <div
        className={`md:hidden -mt-px overflow-x-auto border-t transition-opacity duration-300 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          scrolled
            ? "border-gold/10 bg-background/75 backdrop-blur-xl opacity-100"
            : "pointer-events-none border-transparent opacity-0"
        }`}
        aria-hidden={!scrolled}
      >
        <ul className="flex w-max items-center gap-1.5 px-4 py-2">
          {navLinks.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`inline-block rounded-full border px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] transition-colors ${
                    isActive
                      ? "border-gold/50 bg-gold/[0.10] text-gold"
                      : "border-gold/15 text-cream/70"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {open && (
        <div
          id="mobile-nav-panel-barcelona"
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
