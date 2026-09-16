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
  Menu,
  Info,
  Calendar,
  CloudSun,
  PartyPopper,
  TrainFront,
  Camera,
  Waves,
  TramFront,
  Landmark,
  Fish,
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
  "https://commons.wikimedia.org/wiki/Special:FilePath/Lisboa%2C_Miradouro_das_Portas_do_Sol%2C_vista.jpg?width=2400";

const SHARE_IMG =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Lisboa%2C_Miradouro_das_Portas_do_Sol%2C_vista.jpg?width=1200";

export const Route = createFileRoute("/lisboa")({
  head: () => ({
    meta: [
      { title: "O que visitar em Lisboa: roteiro de 3 dias | O Postal" },
      {
        name: "description",
        content:
          "O que visitar em Lisboa em 3 dias, ao teu ritmo: Baixa, Alfama e o Tram 28, Belém e um extra opcional a Sintra ou Cascais. Dicas, comida e o que reservar.",
      },
      { property: "og:title", content: "O que visitar em Lisboa: roteiro de 3 dias | O Postal" },
      {
        property: "og:description",
        content:
          "O que visitar em Lisboa em 3 dias, ao teu ritmo: Baixa, Alfama e o Tram 28, Belém e um extra opcional a Sintra ou Cascais.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://opostal.pt/lisboa" },
      { property: "og:image", content: SHARE_IMG },
      { name: "twitter:title", content: "O que visitar em Lisboa: roteiro de 3 dias | O Postal" },
      {
        name: "twitter:description",
        content:
          "O que visitar em Lisboa em 3 dias: Baixa, Alfama, Castelo de São Jorge e Belém.",
      },
      { name: "twitter:image", content: SHARE_IMG },
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/lisboa" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          headline: "O que visitar em Lisboa: roteiro de 3 dias",
          name: "O que visitar em Lisboa: roteiro de 3 dias",
          url: "https://opostal.pt/lisboa",
          image: SHARE_IMG,
          description:
            "O que visitar em Lisboa em 3 dias, ao teu ritmo: Baixa, Alfama e o Tram 28, Castelo de São Jorge, Belém e um extra opcional a Sintra ou Cascais.",
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

function mapsSearch(q: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
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
  mapLinkUrl?: string;
  highlightTip?: string;
  cover?: string;
  coverAlt?: string;
};

const days: Day[] = [
  {
    key: "d1",
    label: "Dia 1",
    date: "Baixa & Chiado",
    title: "Baixa, Chiado & Bairro Alto",
    vibe: "A Lisboa pombalina, os elevadores, os miradouros e a noite animada do Bairro Alto.",
    accent: "from-amber-400/30 to-rose-400/10",
    icon: Sun,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Arco_Triunfal_da_Rua_Augusta%2C_Plaza_del_Comercio%2C_Lisboa%2C_Portugal%2C_2012-05-12%2C_DD_02.JPG?width=1600",
    coverAlt: "Arco da Rua Augusta na Praça do Comércio, em Lisboa",
    walkTotal: "A pé hoje: ~5 km, com subidas — leva calçado confortável.",
    mapLinkUrl: mapsSearch("Praça do Comércio, Lisboa"),
    stops: [
      {
        time: "09:30",
        title: "Praça do Comércio & Cais das Colunas",
        desc: "A grande praça ribeirinha, aberta ao Tejo, reconstruída depois do terramoto de 1755. O Cais das Colunas, mesmo à beira-rio, é o postal clássico de Lisboa.",
        link: mapsSearch("Cais das Colunas, Lisboa"),
        tip: "Vai cedo: a luz da manhã sobre o rio é linda e ainda não há multidões.",
        icon: Waves,
        walkTo: "~4 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Cais_das_Colunas._Pra%C3%A7a_do_Com%C3%A9rcio%2C_Lisbon%2C_Portugal.jpg?width=1400",
        imageAlt: "Cais das Colunas na Praça do Comércio, em Lisboa",
      },
      {
        time: "10:00",
        title: "Arco da Rua Augusta",
        desc: "O arco triunfal que liga a praça à Rua Augusta. Subir ao terraço para uma vista privilegiada sobre a Baixa e o rio.",
        link: mapsSearch("Arco da Rua Augusta, Lisboa"),
        tip: "Bilhete de subida ao terraço, valores aproximados de 2026.",
        icon: Landmark,
        hours: "Diário, aprox. 9:00–19:00 (2026)",
        walkTo: "~10 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Arco_Triunfal_da_Rua_Augusta%2C_Plaza_del_Comercio%2C_Lisboa%2C_Portugal%2C_2012-05-12%2C_DD_02.JPG?width=1400",
        imageAlt: "Arco da Rua Augusta em Lisboa",
      },
      {
        time: "11:00",
        title: "Elevador de Santa Justa",
        desc: "O elevador neogótico de ferro que liga a Baixa ao Largo do Carmo, com um miradouro no topo. A fila é longa; alternativa é subir pelas escadinhas ao lado e ver o elevador só por fora.",
        link: mapsSearch("Elevador de Santa Justa, Lisboa"),
        tip: "Fila longa e cara para o que é; se tiveres pressa, sobe a pé ao Largo do Carmo e aprecia o elevador de fora.",
        icon: TramFront,
        hours: "Diário, aprox. 7:30–23:00 (2026)",
        walkTo: "~8 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Elevador_de_Santa_Justa%2C_Lisboa%2C_Portugal%2C_2022-07-24%2C_DD_09.jpg?width=1400",
        imageAlt: "Elevador de Santa Justa em Lisboa",
      },
      {
        time: "12:30",
        title: "Chiado",
        desc: "O bairro elegante das livrarias históricas, esplanadas e a estátua de Fernando Pessoa à porta do Café A Brasileira. Bom sítio para almoçar.",
        link: mapsSearch("Chiado, Lisboa"),
        icon: Sparkles,
        walkTo: "~10 min",
      },
      {
        time: "15:30",
        title: "Miradouro de São Pedro de Alcântara",
        desc: "Um dos miradouros mais bonitos da cidade, jardim com vista sobre o castelo e a Baixa. Chega-se de elétrico 28 ou pelo Elevador da Glória.",
        link: mapsSearch("Miradouro de São Pedro de Alcântara, Lisboa"),
        tip: "O Elevador da Glória sobe a Calçada da Glória, mas o passeio a pé também compensa.",
        icon: MapPin,
        walkTo: "~12 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Lisbonne_-_Miradouro_de_S%C3%A3o_Pedro_de_Alc%C3%A2ntara.jpg?width=1400",
        imageAlt: "Miradouro de São Pedro de Alcântara em Lisboa",
      },
      {
        time: "21:00",
        title: "Bairro Alto à noite",
        desc: "O bairro boémio ganha vida ao anoitecer: bares pequenos, gente na rua com copo na mão, música a sair pelas janelas. Fado em algumas casas típicas.",
        link: mapsSearch("Bairro Alto, Lisboa"),
        tip: "Ambiente informal e de rua; não é preciso reservar, basta ir andando de bar em bar.",
        icon: PartyPopper,
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Lisboa_-_Bairro_Alto_%2853860263796%29.jpg?width=1400",
        imageAlt: "Ruas do Bairro Alto à noite, em Lisboa",
      },
    ],
  },
  {
    key: "d2",
    label: "Dia 2",
    date: "Alfama & Castelo",
    title: "Sé, Alfama & Castelo de São Jorge",
    vibe: "O bairro mais antigo da cidade, becos estreitos, o Tram 28 e miradouros sobre os telhados.",
    accent: "from-amber-300/30 to-violet-500/10",
    icon: Church,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Castelo_de_S%C3%A3o_Jorge%2C_Lisboa_%2827876548967%29.jpg?width=1600",
    coverAlt: "Castelo de São Jorge em Lisboa",
    howToGet: "Como andar: sobretudo a pé, com o Tram 28 a ajudar nas subidas.",
    highlightTip:
      "Dica honesta: o Tram 28 é um íman de carteiristas, sobretudo em horas de ponta. Mochila à frente e atenção aos bolsos.",
    mapLinkUrl: mapsSearch("Sé de Lisboa"),
    stops: [
      {
        time: "09:00",
        title: "Sé de Lisboa",
        desc: "A catedral fortificada mais antiga da cidade, românica, sobrevivente a vários terramotos. Fachada com duas torres em forma de castelo.",
        link: mapsSearch("Sé de Lisboa"),
        icon: Church,
        hours: "Seg–Sáb, aprox. 9:00–19:00 (2026)",
        walkTo: "~5 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/S%C3%A9_de_Lisboa_%E2%80%A2_Santa_Maria_Maior_de_Lisboa_%E2%80%A2_Lisbon_Cathedral_%2850661841878%29.jpg?width=1400",
        imageAlt: "Sé de Lisboa, fachada românica",
      },
      {
        time: "10:00",
        title: "Alfama e o Tram 28",
        desc: "Perder-te de propósito nos becos de Alfama, o bairro que sobreviveu ao terramoto de 1755. O elétrico 28 sobe e desce as ruazinhas estreitas, um passeio icónico por si só.",
        link: mapsSearch("Alfama, Lisboa"),
        tip: "Cuidado com os carteiristas no 28, é dos sítios mais visados de Lisboa. Considera andar só um troço curto.",
        icon: TramFront,
        walkTo: "~10 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Lisboa_Tram_line_28_%2852712608636%29.jpg?width=1400",
        imageAlt: "Elétrico 28 a subir uma rua estreita de Alfama",
      },
      {
        time: "11:30",
        title: "Miradouro das Portas do Sol",
        desc: "Um dos miradouros mais fotografados de Lisboa, vista aberta sobre os telhados de Alfama, o rio Tejo e a Igreja de São Vicente de Fora ao fundo.",
        link: mapsSearch("Miradouro das Portas do Sol, Lisboa"),
        icon: Camera,
        walkTo: "~3 min",
      },
      {
        time: "12:30",
        title: "Castelo de São Jorge",
        desc: "O castelo mourisco no ponto mais alto da colina, com muralhas para caminhar e a melhor vista panorâmica da cidade.",
        link: mapsSearch("Castelo de São Jorge, Lisboa"),
        tip: "Filas longas ao meio-dia no verão; comprar bilhete online evita a espera.",
        icon: Castle,
        bookingUrl: "",
        hours: "Diário, aprox. 9:00–21:00 no verão (2026)",
        walkTo: "~8 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Castelo_de_S%C3%A3o_Jorge%2C_Lisboa_%2827876548967%29.jpg?width=1400",
        imageAlt: "Muralhas do Castelo de São Jorge em Lisboa",
      },
      {
        time: "15:30",
        title: "Panteão Nacional & Feira da Ladra",
        desc: "A cúpula branca do Panteão domina Alfama; por perto, a Feira da Ladra é o mercado de velharias mais antigo da cidade (terças e sábados).",
        link: mapsSearch("Panteão Nacional, Lisboa"),
        tip: "A Feira da Ladra só funciona terças e sábados; confirma o dia antes de ir.",
        icon: Landmark,
        hours: "Ter–Dom, aprox. 10:00–17:00 (2026)",
        walkTo: "~10 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Pante%C3%A3o_Nacional_-_Lisboa_-_4.jpg?width=1400",
        imageAlt: "Cúpula do Panteão Nacional em Lisboa",
      },
      {
        time: "19:30",
        title: "Miradouro da Senhora do Monte (pôr do sol)",
        desc: "O miradouro mais alto de Lisboa, quase sempre mais calmo do que as Portas do Sol, com vista total sobre a cidade e o castelo.",
        link: mapsSearch("Miradouro da Senhora do Monte, Lisboa"),
        icon: Sun,
        walkTo: "~15 min a subir",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Miradouro_da_Senhora_do_Monte_%2838530147244%29.jpg?width=1400",
        imageAlt: "Pôr do sol visto do Miradouro da Senhora do Monte, em Lisboa",
      },
    ],
  },
  {
    key: "d3",
    label: "Dia 3",
    date: "Belém & LX Factory",
    title: "Belém, LX Factory & Time Out Market",
    vibe: "Os monumentos dos Descobrimentos junto ao rio, os pastéis de nata originais e a Lisboa criativa e moderna.",
    accent: "from-rose-500/20 to-amber-400/10",
    icon: Waves,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Torre_de_Bel%C3%A9m_por_Rodrigo_Tetsuo_Argenton_%282%29.jpg?width=1600",
    coverAlt: "Torre de Belém, em Lisboa",
    walkTotal: "A pé hoje: ~4 km em Belém, mais deslocação de elétrico/Uber até LX Factory.",
    mapLinkUrl: mapsSearch("Mosteiro dos Jerónimos, Lisboa"),
    stops: [
      {
        time: "09:00",
        title: "Mosteiro dos Jerónimos",
        desc: "Obra-prima do manuelino, mandada erguer por D. Manuel I para celebrar os Descobrimentos. Claustro monumental e túmulo de Vasco da Gama.",
        link: mapsSearch("Mosteiro dos Jerónimos, Lisboa"),
        tip: "Reserva bilhete com hora marcada online; a fila presencial pode demorar mais de uma hora.",
        icon: Church,
        bookingUrl: "",
        hours: "Ter–Dom, aprox. 9:30–17:30 (2026)",
        hoursNote: "FECHA À SEGUNDA",
        walkTo: "~12 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Mosteiro_dos_Jeronimos_-_Left_Wing.jpg?width=1400",
        imageAlt: "Claustro manuelino do Mosteiro dos Jerónimos",
      },
      {
        time: "11:00",
        title: "Pastéis de Belém",
        desc: "A pastelaria original, a receita secreta desde 1837. O pastel de nata quente, polvilhado com canela e açúcar, é obrigatório.",
        link: mapsSearch("Pastéis de Belém, Lisboa"),
        tip: "Fila enorme à porta para levar; entra pela loja e senta-te, o interior tem muitas salas e costuma ter mesa livre.",
        icon: Utensils,
        walkTo: "~15 min",
      },
      {
        time: "12:30",
        title: "Padrão dos Descobrimentos",
        desc: "O monumento em forma de caravela junto ao rio, homenagem aos navegadores portugueses. Subir ao topo para uma vista sobre o Tejo.",
        link: mapsSearch("Padrão dos Descobrimentos, Lisboa"),
        icon: Landmark,
        hours: "Ter–Dom, aprox. 10:00–18:00 (2026)",
        walkTo: "~15 min à beira-rio",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Padr%C3%A3o_dos_Descobrimentos_por_Rodrigo_Tetsuo_Argenton.jpg?width=1400",
        imageAlt: "Padrão dos Descobrimentos junto ao rio Tejo",
      },
      {
        time: "14:00",
        title: "Torre de Belém",
        desc: "A torre-fortaleza manuelina que guardava a entrada do porto de Lisboa, Património Mundial da UNESCO e um dos símbolos máximos da cidade.",
        link: mapsSearch("Torre de Belém, Lisboa"),
        tip: "Filas de calor no verão; vai cedo ou já perto do fim da tarde. O interior é pequeno, o exterior é o espetáculo.",
        icon: Castle,
        bookingUrl: "",
        hours: "Ter–Dom, aprox. 9:30–18:00 (2026)",
        hoursNote: "FECHA À SEGUNDA",
        walkTo: "~20 min de volta",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Torre_de_Bel%C3%A9m_por_Rodrigo_Tetsuo_Argenton_%282%29.jpg?width=1400",
        imageAlt: "Torre de Belém junto ao rio Tejo",
      },
      {
        time: "17:00",
        title: "LX Factory",
        desc: "Antiga fábrica têxtil reconvertida num polo criativo debaixo da Ponte 25 de Abril: lojas, ateliers, a famosa livraria Ler Devagar e street art por todo o lado.",
        link: mapsSearch("LX Factory, Lisboa"),
        icon: Sparkles,
        walkTo: "~15 min de elétrico/Uber",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Lisboa_LX_Factory_1.jpg?width=1400",
        imageAlt: "Rua interior da LX Factory em Lisboa",
      },
      {
        time: "20:00",
        title: "Time Out Market",
        desc: "O mercado da Ribeira reconvertido em food hall, com bancas dos melhores chefs e restaurantes de Lisboa num só espaço. Ótimo para fechar o dia com várias opções.",
        link: mapsSearch("Time Out Market Lisboa"),
        icon: Utensils,
      },
    ],
  },
];

const extraStops: Stop[] = [
  {
    time: "manhã",
    title: "Sintra",
    desc: "Serra encantada com o colorido Palácio da Pena, o Palácio Nacional de Sintra e a Quinta da Regaleira. Comboio direto de Lisboa (Rossio), aprox. 40 minutos.",
    link: mapsSearch("Sintra, Portugal"),
    tip: "Sintra costuma ficar cheia; se só tens meio-dia, escolhe um único palácio e não tentes ver tudo.",
    icon: Castle,
  },
  {
    time: "tarde",
    title: "Cascais",
    desc: "Vila costeira elegante, com praias, marina e a Boca do Inferno. Comboio direto de Lisboa (Cais do Sodré), aprox. 40 minutos.",
    link: mapsSearch("Cascais, Portugal"),
    tip: "Alternativa mais leve a Sintra: menos filas, mais praia e passeio à beira-mar.",
    icon: Waves,
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
          alt="Vista do Miradouro das Portas do Sol sobre Alfama e o rio Tejo, em Lisboa"
          priority
          className="absolute inset-0 h-full w-full object-cover"
          style={{ animation: "lisboa-kenburns 20s linear infinite alternate" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.12 0.022 45/0.55), transparent 30%, oklch(0.12 0.022 45/0.6) 70%, var(--background) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 32%, oklch(0.12 0.022 45 / .75) 100%)",
          }}
        />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 w-full">
        <div className="pointer-events-none absolute right-6 top-24 hidden md:right-12 md:top-28 md:block">
          <PostmarkCircle city="LISBOA" year="2026" rotate={-9} />
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
                "linear-gradient(120deg, oklch(0.94 0.03 82), oklch(0.66 0.145 47) 50%, oklch(0.55 0.17 34))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextStroke: "1px rgba(0,0,0,0.35)",
            }}
          >
            Lisboa
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-serif text-lg italic text-cream/85 md:text-xl">
            Três dias entre a Baixa, Alfama e a beira-rio de Belém.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#overview"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] uppercase tracking-[0.22em] text-cream shadow-[0_18px_40px_-18px_oklch(0.62_0.17_38/.7)] transition-transform active:scale-95"
              style={{ background: "oklch(0.62 0.17 38)" }}
            >
              Ver o itinerário <span aria-hidden>↓</span>
            </a>
            <span className="font-hand text-lg text-cream/80">
              toca em cada paragem para ver os detalhes
            </span>
          </div>
          <div className="mt-6">
            <CustomItineraryHeroLink city="Lisboa" />
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
      title="O que visitar em Lisboa: três dias, três bairros"
      intro="Cada dia tem o seu ritmo e a sua colina. Sobes, desces, e a vista compensa sempre."
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
      id="lisboa-roteiro-grid"
      className="m-0 grid list-none gap-5 p-0"
      style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
    >
      {days.map((d) => {
        const isFlipped = !!flipped[d.key];
        return (
          <li key={d.key} className="lisboa-flip-cell" style={{ perspective: 1500 }}>
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
                  borderColor: "oklch(0.62 0.17 38 / .25)",
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
                    borderColor: "oklch(0.83 0.16 78 / .45)",
                    background: "oklch(0.12 0.022 45 / .55)",
                    color: "oklch(0.96 0.02 85)",
                  }}
                >
                  vira →
                </span>
                <div className="absolute inset-x-3.5 bottom-3.5">
                  <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "oklch(0.96 0.02 85 / .9)" }}>
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
                  borderColor: "oklch(0.62 0.17 38 / .35)",
                  background:
                    "oklch(0.20 0.03 45) repeating-linear-gradient(135deg, oklch(0.62 0.17 38 / .05) 0 2px, transparent 2px 13px)",
                }}
              >
                <div
                  className="absolute inset-2.5 flex flex-col rounded-xl border border-dashed p-3.5"
                  style={{ borderColor: "oklch(0.83 0.16 78 / .45)" }}
                >
                  <div className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "oklch(0.62 0.17 38)" }}>
                    {d.label} · resumo
                  </div>
                  <h3 className="mt-1.5 font-serif text-xl font-semibold text-cream" style={{ lineHeight: 1.05 }}>
                    {d.title}
                  </h3>
                  <p className="mt-2 font-serif text-[0.92rem] italic text-cream/80" style={{ lineHeight: 1.4 }}>
                    {d.vibe}
                  </p>
                  <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-1.5 text-[11.5px]">
                    <dt className="uppercase tracking-[0.12em]" style={{ color: "oklch(0.83 0.16 78 / .9)" }}>Paragens</dt>
                    <dd className="m-0 text-cream/90">{d.stops.length}</dd>
                    {d.walkTotal && (<>
                      <dt className="uppercase tracking-[0.12em]" style={{ color: "oklch(0.83 0.16 78 / .9)" }}>A pé</dt>
                      <dd className="m-0 text-cream/90">{d.walkTotal.replace(/^A pé hoje:\s*/, "")}</dd>
                    </>)}
                  </dl>
                  <a
                    href={`#${d.key}`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.18em] hover:bg-[oklch(0.62_0.17_38_/_.12)]"
                    style={{ borderColor: "oklch(0.62 0.17 38 / .5)", color: "oklch(0.96 0.02 85)" }}
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
      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-twilight shadow-[0_0_0_4px_oklch(0.16_0.035_290),0_0_30px_oklch(0.82_0.14_78/0.25)] md:left-5">
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
                  <span className="uppercase tracking-[0.18em] text-gold/80">Horário (2026, confirmar):</span>
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

      {day.mapLinkUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/30 bg-twilight/60 p-5"
        >
          <p className="font-serif text-sm italic text-gold/80">Localizar o primeiro ponto do {day.label} no mapa</p>
          <a
            href={day.mapLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold/10"
          >
            <MapPin className="h-3.5 w-3.5" />
            Abrir no Google Maps
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
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

// ----------------------- EXTRA DAY -----------------------

function ExtraDay() {
  return (
    <Section
      id="extra"
      eyebrow="Se tiveres mais tempo"
      title="Extra opcional: meio-dia em Sintra ou Cascais"
      intro="Se ficares mais uns dias, os dois clássicos junto a Lisboa são acessíveis de comboio, sem precisares de carro."
    >
      <div className="relative space-y-6">
        <div className="pointer-events-none absolute bottom-4 left-7 top-4 w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent md:left-9" />
        {extraStops.map((s, i) => (
          <StopItem key={s.title} stop={s} idx={i} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 flex items-start gap-3 rounded-2xl border border-gold/30 bg-twilight/60 p-5"
      >
        <TrainFront className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
        <p className="text-sm leading-relaxed text-cream/90">
          Ambos ficam a cerca de 40 minutos de comboio de Lisboa, com partidas frequentes. Não vale a pena tentar os dois no mesmo meio-dia; escolhe um.
        </p>
      </motion.div>
    </Section>
  );
}

// ----------------------- FOOD -----------------------

function Food() {
  const dishes: Array<{ name: string; desc: string; icon?: React.ComponentType<{ className?: string }> }> = [
    {
      name: "Pastel de nata",
      desc: "O doce mais famoso de Portugal, massa folhada e creme queimado no topo. Prova o original em Belém e compara com outras pastelarias da cidade.",
    },
    {
      name: "Bifana",
      desc: "Sandwich de febras de porco temperadas, simples e viciante, típica dos cafés e tasquinhas de Lisboa.",
    },
    {
      name: "Ginjinha",
      desc: "Licor de ginja, tradicionalmente bebido num copinho pequeno ao balcão, com ou sem a fruta dentro (a famosa Ginjinha do Rossio).",
    },
    {
      name: "Sardinha assada",
      desc: "Grelhada na brasa, sobretudo em junho durante os Santos Populares, mas disponível o ano todo em muitas tascas.",
    },
    {
      name: "Peixe grelhado & bacalhau",
      desc: "Peixe fresco do dia grelhado com batata e legumes, e o bacalhau em dezenas de receitas diferentes, o prato nacional por excelência.",
    },
    {
      name: "Vinho verde",
      desc: "Vinho jovem e fresco do norte de Portugal, ótimo acompanhamento para o peixe grelhado num dia quente.",
      icon: Wine,
    },
  ];

  return (
    <Section
      id="comer"
      eyebrow="À mesa"
      title="Comer e beber em Lisboa"
      intro="Sabores para provar sem falta, e uma caixa de dicas honestas para não cair em armadilhas turísticas."
    >
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
              className="overflow-hidden rounded-2xl border border-gold/15 bg-card p-5"
            >
              <div className="flex items-center gap-2 text-gold">
                <Icon className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.25em]">Sabor local</span>
              </div>
              <h4 className="mt-2 font-serif text-2xl text-cream">{d.name}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <h3 className="mb-6 mt-16 font-serif text-2xl text-cream">Bairros para descobrir</h3>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { name: "Alfama", desc: "O bairro mais antigo, becos labirínticos, fado e vista sobre o rio." },
          { name: "Bairro Alto", desc: "Boémio de dia, animado de noite, com bares pequenos e street art." },
          { name: "Chiado", desc: "Elegante, cultural, com livrarias históricas e boas esplanadas." },
        ].map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-2xl border border-gold/15 bg-card p-5"
          >
            <h4 className="font-serif text-xl text-cream">{b.name}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
          </motion.div>
        ))}
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
            <li>Menus turísticos junto aos miradouros e à Baixa costumam ser caros; anda um pouco mais para dentro dos bairros.</li>
            <li>Couvert (pão, azeitonas, manteiga) não é grátis; podes recusar sem problema.</li>
            <li>Confirma sempre o preço do peixe grelhado, é normalmente cobrado ao peso.</li>
          </ul>
        </div>
      </motion.div>
    </Section>
  );
}

// ----------------------- TIPS & TRAPS -----------------------

function Tips() {
  const doIt = [
    "Comprar o cartão Navegante ou usar o Navegante Ocasional (Viva Viagem) para metro, elétricos e autocarros.",
    "Reservar Mosteiro dos Jerónimos e Torre de Belém com hora marcada para evitar filas.",
    "Levar calçado com boa aderência: a calçada portuguesa fica escorregadia quando chove.",
    "Ir cedo aos miradouros e ao Castelo de São Jorge, antes dos grupos de turismo.",
    "Levar água e protetor solar no verão; as subidas ao sol pesam.",
  ];
  const dont = [
    "Descuidar a mochila ou bolsos no elétrico 28, é dos locais mais visados por carteiristas.",
    "Subestimar as colinas de Lisboa: há muitas escadas e ladeiras íngremes.",
    "Confiar em táxis ou 'guias' que abordam na rua perto dos monumentos.",
    "Esperar apanhar o 28 vazio em hora de ponta; é sempre cheio.",
    "Andar de saltos ou sapatos lisos na calçada portuguesa molhada.",
  ];

  return (
    <Section
      id="dicas"
      eyebrow="Saber andar"
      title="Dicas & armadilhas"
      intro="O básico que faz a viagem correr suave, sem sustos com carteiristas ou calor."
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
    "Mosteiro dos Jerónimos (bilhete com hora marcada)",
    "Torre de Belém (bilhete com hora marcada)",
    "Castelo de São Jorge (bilhete online)",
    "Cartão Navegante / Viva Viagem carregado",
    "Mesa reservada no Time Out Market ou numa casa de fado, para a noite",
    "Opcional: bilhete de comboio para Sintra ou Cascais",
  ];

  return (
    <Section
      id="checklist"
      eyebrow="Antes de partir"
      title="O que reservar com antecedência"
      intro="Para evitar filas e ficar sem vaga, garante estes bilhetes antes de chegares."
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

// ----------------------- FAREWELL -----------------------

function Farewell() {
  return (
    <Section
      id="despedida"
      title="Até já, Lisboa"
      intro=""
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="font-serif text-lg italic text-cream/85 md:text-xl">
          Lisboa não se despacha em três dias, mas fica sempre um bocadinho no bolso do casaco, como um bilhete de elétrico amarrotado. Volta para os miradouros que não deu tempo de ver, e para mais um pastel de nata quente.
        </p>
        <p className="mt-4 font-hand text-2xl text-gold/90">Boa viagem, e até à próxima carta.</p>
      </motion.div>
    </Section>
  );
}

// ----------------------- FOOTER -----------------------

function Footer() {
  return (
    <footer className="border-t border-gold/10 px-6 py-10 text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-cream/60">
        O Postal · Lisboa · MMXXVI
      </p>
    </footer>
  );
}

// ----------------------- CONHECER LISBOA -----------------------

const climaMeses: Array<[string, string, string, string]> = [
  ["Jan", "15", "8", "alta"],
  ["Fev", "16", "8", "alta"],
  ["Mar", "18", "10", "média"],
  ["Abr", "20", "11", "média"],
  ["Mai", "22", "13", "baixa"],
  ["Jun", "26", "16", "baixa"],
  ["Jul", "28", "17", "muito baixa"],
  ["Ago", "29", "18", "muito baixa"],
  ["Set", "27", "17", "baixa"],
  ["Out", "23", "14", "média"],
  ["Nov", "18", "11", "alta"],
  ["Dez", "15", "9", "alta"],
];

const eventos: Array<{ nome: string; quando: string; desc: string }> = [
  {
    nome: "Santos Populares",
    quando: "junho, com pico a 12/13 de junho (Santo António)",
    desc: "Arraiais de rua em Alfama e por toda a cidade, sardinha assada, manjericos e muita música.",
  },
  {
    nome: "Festa de São Vicente e São João",
    quando: "verão",
    desc: "Procissões e festejos populares que animam os bairros históricos.",
  },
  {
    nome: "NOS Alive",
    quando: "julho",
    desc: "Um dos maiores festivais de música da Europa, junto ao rio em Algés.",
  },
];

function ConhecerLisboa() {
  const itemCls = "glass rounded-2xl border border-gold/15 px-5 sm:px-6 overflow-hidden";
  const triggerCls = "py-5 font-serif text-lg sm:text-xl text-cream hover:no-underline gap-3";
  const iconCls =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30 text-gold";

  return (
    <Section
      id="conhecer"
      eyebrow="Contexto"
      title="Conhecer Lisboa"
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
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Lisboa%2C_Miradouro_das_Portas_do_Sol%2C_vista.jpg?width=1600"
            alt="Vista sobre Alfama e o rio Tejo, a partir do Miradouro das Portas do Sol"
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
                Lisboa em 2 minutos
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-cream/90 space-y-3">
              <p>Capital de Portugal, construída sobre sete colinas junto à foz do rio Tejo.</p>
              <p>Cidade de luz, azulejo e calçada portuguesa, reconstruída em grande parte depois do terramoto de 1755.</p>
              <p>Compacta e caminhável, com elétricos históricos a ajudar nas subidas mais duras.</p>
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
                <span className="text-gold">Primavera (mar–mai) e outono (set–out):</span> temperaturas amenas e menos multidões.
              </p>
              <p>
                <span className="text-gold">Julho e agosto:</span> muito quentes e cheios de turistas, mas com os Santos Populares em junho.
              </p>
              <p className="font-serif italic text-gold/90 pt-2">Equilíbrio ideal: abril, maio ou setembro.</p>
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
                Médias aproximadas (confirmar); verões quentes e secos, invernos suaves e chuvosos.
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
    body: "WET (UTC+0), o mesmo fuso de Lisboa continental. Sem diferença horária vindo do resto de Portugal.",
  },
  {
    icon: Coins,
    title: "Moeda",
    body: "Euro. A mesma moeda de Portugal, sem conversões nem surpresas de câmbio.",
  },
  {
    icon: Plug,
    title: "Tomadas",
    body: "Tipo F, 230 V / 50 Hz, a mesma tomada de todo o território português.",
  },
  {
    icon: Phone,
    title: "Emergência",
    body: "112 (número de emergência nacional).",
  },
  {
    icon: TrainFront,
    title: "Metro, Carris & cartão Navegante",
    body: "O metro tem quatro linhas e cobre bem o centro; os elétricos históricos da Carris (como o 28) sobem as colinas. Compra um cartão Navegante (ou usa o Navegante Ocasional/Viva Viagem) para carregar viagens em metro, elétrico, autocarro e comboios urbanos.",
  },
  {
    icon: TramFront,
    title: "Aeroporto",
    body: "O Aeroporto Humberto Delgado fica dentro da cidade; o metro (linha vermelha) liga-o ao centro em cerca de 20–25 minutos, valores aproximados de 2026.",
  },
];

function EssentialInfo() {
  return (
    <Section
      id="essencial"
      eyebrow="Antes de partir"
      title="Essencial para a viagem"
      intro="O básico para chegar leve: fuso, dinheiro, transporte e como te moveres pela cidade."
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
                style={{ boxShadow: "0 0 12px oklch(0.62 0.16 40 / 0.45)" }}
              >
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-serif text-xl text-cream">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ----------------------- READING PROGRESS -----------------------

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
            "linear-gradient(90deg, oklch(0.62 0.17 38), oklch(0.83 0.16 78), oklch(0.96 0.02 85))",
          boxShadow: "0 0 10px oklch(0.62 0.17 38 / .55)",
        }}
      />
    </div>
  );
}

// ----------------------- STICKY NAV -----------------------

const navLinks = [
  { id: "conhecer", label: "Lisboa" },
  { id: "d1", label: "Dia 1" },
  { id: "d2", label: "Dia 2" },
  { id: "d3", label: "Dia 3" },
  { id: "extra", label: "Extra" },
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
                      layoutId="nav-underline-lisboa"
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

function LisboaHeroStyles() {
  return (
    <style>{`
      @keyframes lisboa-kenburns { from { transform: scale(1.04); } to { transform: scale(1.14); } }
      @media (max-width: 900px) {
        #lisboa-roteiro-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      }
      @media (max-width: 560px) {
        #lisboa-roteiro-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}

// ----------------------- INDEX -----------------------

function Index() {
  return (
    <main id="top" className="theme-lisboa bg-twilight-radial min-h-screen overflow-x-hidden">
      <ReadingProgressBar />
      <StickyNav />
      <LisboaHeroStyles />
      <Hero />
      <ConhecerLisboa />
      <EssentialInfo />
      <Overview />
      <Itineraries />
      <ExtraDay />
      <Food />
      <Tips />
      <Checklist />
      <FinalStamp code="LIS" />
      <Farewell />
      <CustomItineraryCTA city="Lisboa" />
      <OutrosPostais currentSlug="lisboa" />
      <Footer />
      <SiteFooter />
    </main>
  );
}
