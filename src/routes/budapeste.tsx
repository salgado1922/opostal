import { SmartImage } from "@/components/SmartImage";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useId, useEffect } from "react";
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
  Moon,
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
  ArrowLeftRight,
  Landmark,
  Waves,
  Camera,
  ShoppingBag,
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
  "https://commons.wikimedia.org/wiki/Special:FilePath/Budapest_Evening_Panorama_from_Gellert_Hill.jpg?width=1200";

export const Route = createFileRoute("/budapeste")({
  head: () => ({
    meta: [
      { title: "O que visitar em Budapeste: roteiro de 3 dias | O Postal" },
      {
        name: "description",
        content:
          "O que visitar em Budapeste em 3 dias, ao teu ritmo: Parlamento, Castelo de Buda, Bastião dos Pescadores, termas Széchenyi e o bairro judaico. Dicas, comida e o que reservar.",
      },
      { property: "og:title", content: "O que visitar em Budapeste: roteiro de 3 dias | O Postal" },
      {
        property: "og:description",
        content:
          "O que visitar em Budapeste em 3 dias: Parlamento, Castelo de Buda, Bastião dos Pescadores, termas Széchenyi e o bairro judaico.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://opostal.pt/budapeste" },
      { property: "og:image", content: SHARE_IMG },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "O que visitar em Budapeste: roteiro de 3 dias | O Postal" },
      {
        name: "twitter:description",
        content:
          "O que visitar em Budapeste em 3 dias: Parlamento, Castelo de Buda, Bastião dos Pescadores e termas Széchenyi.",
      },
      { name: "twitter:image", content: SHARE_IMG },
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/budapeste" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          headline: "O que visitar em Budapeste: roteiro de 3 dias",
          name: "O que visitar em Budapeste: roteiro de 3 dias",
          url: "https://opostal.pt/budapeste",
          image: SHARE_IMG,
          description:
            "O que visitar em Budapeste em 3 dias, ao teu ritmo: Parlamento, Castelo de Buda, Bastião dos Pescadores, termas Széchenyi e o bairro judaico.",
          author: { "@type": "Person", name: "O Postal" },
        }),
      },
    ],
  }),
  component: Index,
});

// ----------------------- constants -----------------------

const RATE_HUF_PER_EUR = 395; // 1 € ≈ 395 Ft (aproximado, 2026)

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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="gold-link font-medium"
    >
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
  cover: string;
  coverAlt?: string;
  stops: Stop[];
  walkTotal?: string;
  howToGet?: string;
  mapEmbedUrl?: string;
  mapLinkUrl?: string;
  highlightTip?: string;
};

const days: Day[] = [
  {
    key: "d1",
    label: "Dia 1",
    date: "Pest",
    title: "Pest: Parlamento & Danúbio",
    vibe: "Chegar com calma, o Parlamento a espelhar-se no rio e o pôr do sol na Ponte das Correntes.",
    accent: "from-amber-400/30 to-rose-400/10",
    icon: Sun,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Hungarian_Parliament_Building_2023-9.jpg?width=1600",
    coverAlt: "Parlamento húngaro à beira do Danúbio",
    walkTotal: "A pé hoje: ~30 min no total.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Hungarian+Parliament+Building&daddr=Shoes+on+the+Danube+Bank+to:St.+Stephen%27s+Basilica+Budapest+to:Sz%C3%A9chenyi+Chain+Bridge&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Hungarian+Parliament+Building/Shoes+on+the+Danube+Bank/St.+Stephen%27s+Basilica+Budapest/Sz%C3%A9chenyi+Chain+Bridge/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "10:30",
        title: "Check-in & primeiro café",
        desc: "Deixar as malas, um café húngaro forte e arrancar com calma.",
        icon: MapPin,
        walkTo: "~10 min",
      },
      {
        time: "11:00",
        title: "Parlamento Húngaro (Országház)",
        desc: "O edifício mais fotografado da cidade, neogótico, à beira do Danúbio. Vale a pena entrar para ver a Sala da Cúpula e a Coroa de Santo Estêvão.",
        link: "https://pt.wikipedia.org/wiki/Parlamento_da_Hungria",
        tip: "Reservar bilhete com antecedência; os slots esgotam, sobretudo em inglês.",
        icon: Landmark,
        bookingUrl: "[LINK_GETYOURGUIDE_BUDAPESTE_PARLAMENTO]",
        hours: "Valores aproximados de 2026: diário ~8:00–16:00",
        hoursNote: "SLOTS LIMITADOS, RESERVAR ANTES",
        walkTo: "~10 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Hungarian_Parliament_Building_2023-9.jpg?width=1400",
        imageAlt: "Fachada neogótica do Parlamento Húngaro",
      },
      {
        time: "12:30",
        title: "Sapatos de Ferro à Beira do Danúbio",
        desc: "Memorial simples e comovente: sapatos de ferro na margem do rio, em memória das vítimas judias fuziladas ali em 1944-45.",
        link: "https://pt.wikipedia.org/wiki/Sapatos_de_Ferro_%C3%A0_Beira_do_Dan%C3%BAbio",
        tip: "Um momento de silêncio; não é um sítio para fotos apressadas.",
        icon: Waves,
        walkTo: "~15 min",
      },
      {
        time: "13:15",
        title: "Almoço perto da Basílica",
        desc: "Pratos húngaros tradicionais (goulash, lángos) num restaurante do centro de Pest.",
        icon: Utensils,
        walkTo: "~5 min",
      },
      {
        time: "15:00",
        title: "Basílica de Santo Estêvão",
        desc: "A maior igreja de Budapeste, com a mão mumificada de Santo Estêvão como relíquia e um miradouro na cúpula com vista a 360º.",
        link: "https://pt.wikipedia.org/wiki/Bas%C3%ADlica_de_Santo_Est%C3%AAv%C3%A3o",
        icon: Church,
        bookingUrl: "[LINK_GETYOURGUIDE_BUDAPESTE_BASILICA]",
        hours: "Valores aproximados de 2026: diário ~9:00–19:00",
        walkTo: "~20 min",
      },
      {
        time: "18:00",
        title: "Ponte das Correntes ao fim do dia",
        desc: "A primeira ponte permanente sobre o Danúbio, ligando Buda e Pest. Atravessar devagar ao entardecer, com as luzes a acender.",
        link: "https://pt.wikipedia.org/wiki/Ponte_das_Correntes_(Budapeste)",
        icon: Sun,
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg?width=1400",
        imageAlt: "Ponte das Correntes iluminada ao anoitecer sobre o Danúbio",
      },
    ],
  },
  {
    key: "d2",
    label: "Dia 2",
    date: "Buda",
    title: "Buda: Castelo & Colina",
    vibe: "Manhã no castelo e nas torres do bastião, tarde a subir ao Monte Gellért para o pôr do sol sobre as duas cidades.",
    accent: "from-amber-300/30 to-violet-500/10",
    icon: Castle,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Buda_castle.jpg?width=1600",
    coverAlt: "Castelo de Buda visto do outro lado do Danúbio",
    howToGet: "Como chegar: funicular Budavári Sikló ou autocarro 16 desde a Ponte das Correntes.",
    highlightTip: "Dica: ir cedo ao Bastião dos Pescadores, antes dos grupos de turismo chegarem.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Buda+Castle&daddr=Fisherman%27s+Bastion+to:Matthias+Church+Budapest+to:Gell%C3%A9rt+Hill&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Buda+Castle/Fisherman%27s+Bastion/Matthias+Church+Budapest/Gell%C3%A9rt+Hill/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:00",
        title: "Castelo de Buda",
        desc: "O antigo palácio real, hoje casa da Galeria Nacional Húngara e do Museu de História de Budapeste. As vistas sobre o Danúbio já valem a subida.",
        link: "https://pt.wikipedia.org/wiki/Castelo_de_Buda",
        icon: Castle,
        bookingUrl: "[LINK_GETYOURGUIDE_BUDAPESTE_CASTELO]",
        hours: "Valores aproximados de 2026: diário ~10:00–18:00",
        walkTo: "~10 min",
      },
      {
        time: "11:00",
        title: "Bastião dos Pescadores",
        desc: "Torres brancas em estilo neo-românico, construídas como miradouro. A vista clássica de postal sobre o Parlamento e o Danúbio.",
        link: "https://pt.wikipedia.org/wiki/Basti%C3%A3o_dos_Pescadores",
        tip: "O terraço superior tem entrada paga; o resto é gratuito e já tem vista excelente.",
        icon: Crown,
        hours: "Valores aproximados de 2026: terraço pago ~9:00–19:00 (abril–outubro)",
        walkTo: "~2 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Fisherman%27s_Bastion_2014.jpg?width=1400",
        imageAlt: "Torres brancas do Bastião dos Pescadores em Budapeste",
      },
      {
        time: "12:00",
        title: "Igreja de Matias",
        desc: "Igreja gótica com telhado de telhas coloridas em padrão geométrico, palco de coroações reais.",
        link: "https://pt.wikipedia.org/wiki/Igreja_de_Mat%C3%ADas",
        icon: Church,
        bookingUrl: "[LINK_GETYOURGUIDE_BUDAPESTE_IGREJA_MATIAS]",
        hours: "Valores aproximados de 2026: diário ~9:00–17:00",
        walkTo: "~15 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Budapest_Matthias_Kirche_Dach-20080321-RM-095629.jpg?width=1400",
        imageAlt: "Telhado colorido em padrão geométrico da Igreja de Matias",
      },
      {
        time: "13:30",
        title: "Almoço em Buda",
        desc: "Uma paragem tranquila numa das ruas do Bairro do Castelo antes da descida.",
        icon: Utensils,
        walkTo: "~30 min a pé, ou autocarro até ao Monte Gellért",
      },
      {
        time: "17:30",
        title: "Monte Gellért ao pôr do sol",
        desc: "Subida até à Cidadela e à Estátua da Liberdade, com a vista mais completa sobre Buda, Pest e o Danúbio ao meio.",
        link: "https://pt.wikipedia.org/wiki/Monte_Gell%C3%A9rt",
        icon: Sun,
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/View_from_the_Gellert_Hill_2014_01.jpg?width=1400",
        imageAlt: "Vista panorâmica de Budapeste a partir do Monte Gellért",
      },
    ],
  },
  {
    key: "d3",
    label: "Dia 3",
    date: "Andrássy & Termas",
    title: "Praça dos Heróis, Termas & Noite",
    vibe: "Manhã grandiosa na Avenida Andrássy, tarde a mergulhar nas termas Széchenyi, noite no bairro judaico e cruzeiro no Danúbio.",
    accent: "from-rose-500/20 to-amber-400/10",
    icon: Moon,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/HUN-2015-Budapest-Heroes%E2%80%99_Square.jpg?width=1600",
    coverAlt: "Praça dos Heróis em Budapeste",
    walkTotal: "A pé hoje: ~25 min, mais o metro na Avenida Andrássy.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Heroes%27+Square+Budapest&daddr=Andr%C3%A1ssy+Avenue+to:Hungarian+State+Opera+House+to:Great+Market+Hall+Budapest+to:Dohany+Street+Synagogue&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Heroes%27+Square+Budapest/Andr%C3%A1ssy+Avenue/Hungarian+State+Opera+House/Great+Market+Hall+Budapest/Dohany+Street+Synagogue/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:30",
        title: "Praça dos Heróis",
        desc: "A grande praça monumental, com a Coluna do Milénio e as estátuas dos sete chefes magiares fundadores.",
        link: "https://pt.wikipedia.org/wiki/Pra%C3%A7a_dos_Her%C3%B3is",
        icon: Landmark,
        walkTo: "~5 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/HUN-2015-Budapest-Heroes%E2%80%99_Square.jpg?width=1400",
        imageAlt: "Coluna do Milénio e estátuas na Praça dos Heróis",
      },
      {
        time: "10:15",
        title: "Avenida Andrássy",
        desc: "O boulevard elegante de Budapeste, Património Mundial da UNESCO, com palacetes, lojas de luxo e cafés históricos.",
        link: "https://pt.wikipedia.org/wiki/Avenida_Andr%C3%A1ssy",
        icon: Sparkles,
        walkTo: "~15 min",
      },
      {
        time: "11:00",
        title: "Ópera Estatal Húngara",
        desc: "Um dos teatros de ópera mais bonitos da Europa, com interiores dourados dignos de um palácio.",
        link: "https://pt.wikipedia.org/wiki/%C3%93pera_Estatal_H%C3%BAngara",
        icon: Crown,
        bookingUrl: "[LINK_GETYOURGUIDE_BUDAPESTE_OPERA]",
        hours: "Valores aproximados de 2026: visitas guiadas diárias, horários variáveis",
        walkTo: "~20 min de metro (linha 1) até Széchenyi",
      },
      {
        time: "13:00",
        title: "Termas Széchenyi",
        desc: "As maiores termas da Europa, piscinas exteriores de água termal a fumegar mesmo no inverno. Reservar algumas horas com calma.",
        link: "https://pt.wikipedia.org/wiki/Banhos_Sz%C3%A9chenyi",
        tip: "Levar fato de banho e chinelos; toalhas alugam-se no local.",
        icon: Waves,
        bookingUrl: "[LINK_GETYOURGUIDE_BUDAPESTE_TERMAS]",
        hours: "Valores aproximados de 2026: diário ~6:00–22:00",
        walkTo: "~30 min de metro até ao Grande Mercado",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sz%C3%A9chenyi_thermal_bath%2C_Budapest_2.jpg?width=1400",
        imageAlt: "Piscina exterior das termas Széchenyi com edifício amarelo ao fundo",
      },
      {
        time: "17:00",
        title: "Grande Mercado Central",
        desc: "Mercado coberto do séc. XIX, ótimo para comprar pálinka, paprica e provar lángos no piso de cima.",
        link: "https://pt.wikipedia.org/wiki/Grande_Mercado_Central",
        icon: ShoppingBag,
        hours: "Valores aproximados de 2026: Seg ~6:00–17:00, Ter–Sáb ~6:00–18:00",
        walkTo: "~15 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Budapest_-_Great_Market_Hall_%28Nagyv%C3%A1s%C3%A1rcsarnok%29.jpg?width=1400",
        imageAlt: "Interior do Grande Mercado Central de Budapeste",
      },
      {
        time: "18:30",
        title: "Bairro Judaico & Sinagoga da Rua Dohány",
        desc: "A maior sinagoga da Europa, com o Memorial da Árvore da Vida no jardim. O bairro à volta enche-se de ruin bars ao anoitecer.",
        link: "https://pt.wikipedia.org/wiki/Sinagoga_da_Rua_Doh%C3%A1ny",
        icon: Church,
        bookingUrl: "[LINK_GETYOURGUIDE_BUDAPESTE_SINAGOGA]",
        hours: "Valores aproximados de 2026: Dom–Sex ~10:00–17:00",
        hoursNote: "FECHA AO SÁBADO",
        walkTo: "~10 min",
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Dohany-Street-Synagogue-Budapest.jpg?width=1400",
        imageAlt: "Fachada da Sinagoga da Rua Dohány",
      },
      {
        time: "20:00",
        title: "Ruin bar: Szimpla Kert",
        desc: "O ruin bar original, num edifício em ruínas transformado em bar labiríntico, cheio de móveis reaproveitados e arte.",
        link: "https://pt.wikipedia.org/wiki/Szimpla_Kert",
        icon: Sparkles,
        walkTo: "~15 min até ao rio",
      },
      {
        time: "21:30",
        title: "Cruzeiro noturno no Danúbio",
        desc: "Fechar a viagem na água, a ver o Parlamento, a Ponte das Correntes e o Castelo de Buda todos iluminados.",
        icon: Waves,
        bookingUrl: "[LINK_GETYOURGUIDE_BUDAPESTE_CRUZEIRO]",
        hours: "Valores aproximados de 2026: várias saídas noturnas, ~1h de duração",
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
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Budapest_Evening_Panorama_from_Gellert_Hill.jpg?width=2400"
          alt="Panorama de Budapeste ao anoitecer, visto do Monte Gellért"
          priority
          className="absolute inset-0 h-full w-full object-cover"
          style={{ animation: "budapeste-kenburns 20s linear infinite alternate" }}
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
          <PostmarkCircle city="BUDAPESTE" year="2026" rotate={-9} />
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
            Budapeste
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-serif text-lg italic text-cream/85 md:text-xl">
            Três dias entre o Danúbio, o Castelo de Buda e as águas termais.
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
            <CustomItineraryHeroLink city="Budapeste" />
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
      title="O que visitar em Budapeste: três dias, três humores"
      intro="Um dia em Pest, um dia em Buda, e um último dia entre a grande avenida, as termas e a noite."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {days.map((d) => {
          const Icon = d.icon;
          return (
            <motion.a
              key={d.key}
              href={`#${d.key}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-gold/15 shadow-[0_12px_40px_-22px_rgba(0,0,0,.85)]"
              style={{ aspectRatio: "3 / 4" }}
            >
              <SmartImage
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 400px"
                src={d.cover}
                alt={d.coverAlt ?? d.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,.86), rgba(0,0,0,.2) 48%, transparent)" }}
              />
              <div className="absolute inset-x-3.5 bottom-3.5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cream/90">
                  <Icon className="h-3.5 w-3.5 text-gold" />
                  {d.label} · {d.date}
                </div>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-cream" style={{ lineHeight: 1.05 }}>
                  {d.title}
                </h3>
                <p className="mt-2 text-xs italic text-cream/80">{d.vibe}</p>
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
                  <span className="uppercase tracking-[0.18em] text-gold/80">Horário:</span>
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
  const dishes: Array<{ name: string; desc: string; icon?: React.ComponentType<{ className?: string }>; image?: string; imageAlt?: string }> = [
    {
      name: "Gulyás (goulash)",
      desc: "A sopa/guisado húngaro clássico, de vaca com paprica, cebola e batata. Muito mais líquido do que o goulash internacional.",
    },
    {
      name: "Halászlé",
      desc: "Sopa de peixe do Danúbio, picante com paprica, tradicional em dias festivos.",
    },
    {
      name: "Lángos",
      desc: "Pão frito achatado, coberto com natas azedas, queijo ralado e alho. Street food obrigatório, ótimo no Grande Mercado.",
    },
    {
      name: "Kürtőskalács",
      desc: "O 'bolo de chaminé', massa doce enrolada e assada em espeto, coberta de açúcar e canela ou chocolate.",
    },
    {
      name: "Pálinka",
      desc: "Aguardente de fruta tradicional (damasco, ameixa, pera), forte e servida bem gelada.",
      icon: Wine,
    },
    {
      name: "Tokaji",
      desc: "O vinho doce histórico da região de Tokaj, um dos mais famosos vinhos de sobremesa do mundo.",
      icon: Wine,
    },
  ];

  const bairros = [
    {
      name: "Bairro Judaico (Erzsébetváros)",
      desc: "Sinagogas, ruin bars e street art, tudo à volta da Rua Dohány. Anima-se sobretudo à noite.",
    },
    {
      name: "Bairro do Castelo (Várnegyed)",
      desc: "Ruas de pedra, palacetes barrocos e vistas do outro lado do rio, em Buda.",
    },
    {
      name: "Óbuda",
      desc: "A parte mais antiga da cidade, com ruínas romanas de Aquincum e um ambiente mais tranquilo e residencial.",
    },
  ];

  return (
    <Section
      id="comer"
      eyebrow="À mesa"
      title="Comer, beber e os bairros de Budapeste"
      intro="Sabores para provar sem falta, e os bairros que dão carácter à cidade."
    >
      <h3 className="mb-6 font-serif text-2xl text-cream">Provar sem falta</h3>
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

      <h3 className="mb-6 mt-16 font-serif text-2xl text-cream">Bairros com carácter</h3>
      <div className="grid gap-5 md:grid-cols-3">
        {bairros.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-2xl border border-gold/15 bg-card p-5"
          >
            <div className="flex items-center gap-2 text-gold">
              <MapPin className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-[0.25em]">Bairro</span>
            </div>
            <h4 className="mt-2 font-serif text-xl text-cream">{b.name}</h4>
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
            <li>Confirmar sempre o preço antes de pedir em restaurantes turísticos junto ao Danúbio: alguns cobram por peça, não por prato.</li>
            <li>Ver se a gorjeta/serviço já está incluída na conta antes de deixar mais.</li>
            <li>Evitar trocar dinheiro em casas de câmbio nas ruas mais turísticas; usar caixas multibanco ou bancos.</li>
          </ul>
        </div>
      </motion.div>
    </Section>
  );
}

// ----------------------- TIPS & TRAPS -----------------------

function Tips() {
  const doIt = [
    "Reservar o Parlamento e a Sinagoga da Rua Dohány com antecedência.",
    "Ir cedo ao Bastião dos Pescadores e à Igreja de Matias, antes dos grupos de turismo.",
    "Levar fato de banho na mochila; as termas Széchenyi surgem sempre como boa ideia de última hora.",
    "Andar a pé entre Pest e Buda pela Ponte das Correntes, é um dos melhores momentos da viagem.",
    "Comprar o bilhete de transportes públicos (BKK) para os dias com mais deslocações.",
  ];
  const dont = [
    "Trocar dinheiro em casas de câmbio de rua com taxas escondidas; usar sempre caixas multibanco.",
    "Cair em restaurantes junto ao Danúbio sem ver o menu de preços antes.",
    "Deixar a visita ao bairro judaico para sábado; muitos locais fecham nesse dia.",
    "Ignorar o calçado confortável: Buda tem ladeiras e escadas constantes.",
    "Esquecer o passaporte/documento nas termas; é pedido para o cacifo em alguns balneários.",
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
    "Bilhete para o Parlamento (slot horário)",
    "Sinagoga da Rua Dohány",
    "Termas Széchenyi (bilhete de entrada)",
    "Cruzeiro noturno no Danúbio",
    "Mesa num restaurante popular para a noite",
    "Cartão BKK de transportes públicos, se fores usar metro/autocarro várias vezes",
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
        O Postal · Budapeste · MMXXVI
      </p>
      <p className="mt-3 font-serif italic text-sm text-cream/70">Viszlát, Budapest!</p>
    </footer>
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
              title="Vídeo do guia: Budapeste"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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

// ----------------------- CONHECER BUDAPESTE -----------------------

const climaMeses: Array<[string, string, string, string]> = [
  ["Jan", "2", "-3", "média"],
  ["Fev", "5", "-2", "média"],
  ["Mar", "11", "2", "média"],
  ["Abr", "17", "6", "média"],
  ["Mai", "22", "11", "alta"],
  ["Jun", "26", "15", "alta"],
  ["Jul", "28", "17", "baixa"],
  ["Ago", "28", "16", "baixa"],
  ["Set", "23", "12", "média"],
  ["Out", "16", "7", "média"],
  ["Nov", "9", "3", "alta"],
  ["Dez", "4", "-1", "média"],
];

const eventos: Array<{ nome: string; quando: string; desc: string }> = [
  {
    nome: "Dia de Santo Estêvão",
    quando: "20 de agosto",
    desc: "Feriado nacional húngaro, com fogo de artifício sobre o Danúbio, um dos maiores espetáculos do ano.",
  },
  {
    nome: "Festival Sziget",
    quando: "agosto",
    desc: "Um dos maiores festivais de música da Europa, numa ilha do Danúbio, com uma semana de concertos.",
  },
  {
    nome: "Mercados de Natal",
    quando: "novembro–dezembro",
    desc: "Mercados na Praça Vörösmarty e junto à Basílica de Santo Estêvão, com luzes, vinho quente e artesanato.",
  },
];

function ConhecerBudapeste() {
  const itemCls = "glass rounded-2xl border border-gold/15 px-5 sm:px-6 overflow-hidden";
  const triggerCls = "py-5 font-serif text-lg sm:text-xl text-cream hover:no-underline gap-3";
  const iconCls =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30 text-gold";

  return (
    <Section
      id="conhecer"
      eyebrow="Contexto"
      title="Conhecer Budapeste"
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
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Danube_and_Hungarian_Parliament_Building_by_night.jpg?width=1600"
            alt="Danúbio e Parlamento Húngaro à noite"
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
                Budapeste em 2 minutos
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-cream/90 space-y-3">
              <p>Duas cidades unidas em 1873: Buda, colinosa e imperial, e Pest, plana e cosmopolita, separadas pelo Danúbio.</p>
              <p>Capital da Hungria, conhecida como "Pérola do Danúbio", famosa pelas termas, pela arquitetura Art Nouveau e pelos ruin bars.</p>
              <p>
                Centro compacto e bem servido de transportes; dá para conhecer o essencial a pé e de metro/elétrico.
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
                <span className="text-gold">Primavera (abr–mai) e outono (set–out):</span> temperaturas amenas e menos multidões.
              </p>
              <p>
                <span className="text-gold">Verão (jun–ago):</span> quente e animado, ótimo para as termas exteriores, mas mais cheio.
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
                Médias aproximadas (confirmar); invernos frios e por vezes com neve, verões quentes.
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
    body: "CET (UTC+1). Budapeste está 1 hora à frente de Lisboa.",
  },
  {
    icon: Coins,
    title: "Moeda",
    body: "Forint húngaro (HUF/Ft). Não é o euro, apesar de a Hungria ser membro da UE; convém trazer/levantar forints.",
  },
  {
    icon: Plug,
    title: "Tomadas",
    body: "Tipo C e F, 230 V / 50 Hz. As fichas portuguesas encaixam sem problema.",
  },
  {
    icon: Phone,
    title: "Emergência",
    body: "112 (geral europeu). Levar o Cartão Europeu de Seguro de Doença.",
  },
  {
    icon: TrainFront,
    title: "Como chegar",
    body: "Aeroporto de Budapeste-Ferenc Liszt (BUD). Autocarro 100E direto ao centro (~30 min) ou metro/autocarro combinados; táxis oficiais têm balcão à saída.",
  },
  {
    icon: HandCoins,
    title: "Gorjetas",
    body: "Normal deixar ~10%, sobretudo em restaurantes; confirmar se o 'serviço' já vem incluído na conta.",
  },
];

const phrases = [
  ["Olá", "Szia / Jó napot"],
  ["Obrigado", "Köszönöm"],
  ["Por favor", "Kérem"],
  ["Sim / Não", "Igen / Nem"],
  ["Quanto custa?", "Mennyibe kerül?"],
  ["Saúde (brinde)", "Egészségedre"],
];

function EssentialInfo() {
  return (
    <Section
      id="essencial"
      eyebrow="Antes de partir"
      title="Essencial para a viagem"
      intro="O básico para chegar leve: fuso, dinheiro, transporte e um punhado de palavras húngaras para abrir portas (e sorrisos)."
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

      <CurrencyConverter />

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
            <h4 className="font-serif text-lg text-gold">Bairro Judaico (Erzsébetváros)</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Central e animado, com os melhores ruin bars a poucos passos.
            </p>
            <AffiliateLink href="" />
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Centro de Pest (V. Kerület)</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              A pé de tudo: Basílica, Danúbio, Parlamento e as principais praças.
            </p>
            <AffiliateLink href="" />
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Buda (Várnegyed / Víziváros)</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Mais tranquilo e verde, com vistas espetaculares, aos pés do castelo.
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
          {phrases.map(([pt, hu]) => (
            <li
              key={pt}
              className="flex items-baseline justify-between gap-3 border-b border-gold/10 pb-2"
            >
              <span className="text-sm text-muted-foreground">{pt}</span>
              <span className="font-serif text-lg italic text-gold">{hu}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}

// ----------------------- CURRENCY CONVERTER -----------------------

function CurrencyConverter() {
  const [eur, setEur] = useState<string>("10");
  const [huf, setHuf] = useState<string>(String(10 * RATE_HUF_PER_EUR));
  const eurId = useId();
  const hufId = useId();
  const eurRef = useRef<HTMLInputElement>(null);
  const hufRef = useRef<HTMLInputElement>(null);
  const [lastEdited, setLastEdited] = useState<"eur" | "huf">("eur");

  const onEurChange = (v: string) => {
    setEur(v);
    setLastEdited("eur");
    if (v === "" || isNaN(Number(v))) {
      setHuf("");
      return;
    }
    setHuf(String(Math.round(Number(v) * RATE_HUF_PER_EUR)));
  };

  const onHufChange = (v: string) => {
    setHuf(v);
    setLastEdited("huf");
    if (v === "" || isNaN(Number(v))) {
      setEur("");
      return;
    }
    setEur((Number(v) / RATE_HUF_PER_EUR).toFixed(2));
  };

  const invert = () => {
    if (lastEdited === "eur") {
      hufRef.current?.focus();
      setLastEdited("huf");
    } else {
      eurRef.current?.focus();
      setLastEdited("eur");
    }
  };

  const chipPreset = (hufVal: number) => {
    const eurValue = (hufVal / RATE_HUF_PER_EUR).toFixed(2);
    setHuf(String(hufVal));
    setEur(eurValue);
    setLastEdited("huf");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mt-8 overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 via-transparent to-transparent p-7"
    >
      <div className="mb-6 flex items-center gap-3">
        <Coins className="h-5 w-5 text-gold" />
        <h3 className="font-serif text-2xl text-cream">Conversor de forints</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_auto_1.1fr] lg:items-center">
        {/* EUR */}
        <div>
          <label
            htmlFor={eurId}
            className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            Euro
          </label>
          <div className="group relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-serif text-2xl text-gold/70">
              €
            </span>
            <input
              id={eurId}
              ref={eurRef}
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={eur}
              onChange={(e) => onEurChange(e.target.value)}
              className="w-full rounded-xl border border-gold/20 bg-background/40 py-4 pl-10 pr-4 text-right font-serif text-3xl text-cream outline-none transition-colors focus:border-gold/50 focus:ring-2 focus:ring-gold/40"
            />
          </div>
        </div>

        {/* Inverter */}
        <div className="flex justify-center lg:px-2">
          <button
            type="button"
            onClick={invert}
            aria-label="Inverter"
            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-background/40 text-gold shadow-[0_10px_30px_-15px_oklch(0.82_0.14_78/0.6)] transition-all hover:bg-gold/10 hover:rotate-180"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </button>
        </div>

        {/* HUF */}
        <div>
          <label
            htmlFor={hufId}
            className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            Forint húngaro
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-serif text-xl text-gold/70">
              Ft
            </span>
            <input
              id={hufId}
              ref={hufRef}
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              value={huf}
              onChange={(e) => onHufChange(e.target.value)}
              className="w-full rounded-xl border border-gold/20 bg-background/40 py-4 pl-12 pr-4 text-right font-serif text-3xl text-cream outline-none transition-colors focus:border-gold/50 focus:ring-2 focus:ring-gold/40"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Atalhos
        </span>
        {[5000, 10000, 50000].map((c) => {
          const eurValue = (c / RATE_HUF_PER_EUR).toFixed(2);
          return (
            <button
              key={c}
              type="button"
              onClick={() => chipPreset(c)}
              className="rounded-full border border-gold/20 bg-background/30 px-3.5 py-1.5 text-xs text-gold/90 transition-colors hover:border-gold/50 hover:bg-gold/10"
            >
              {c} Ft ≈ {eurValue} €
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-xs italic text-gold/80">
        Taxa aproximada (1 € ≈ {RATE_HUF_PER_EUR} Ft em 2026); pode estar desatualizada. Confirmar a taxa de câmbio do dia antes de pagar.
      </p>
    </motion.div>
  );
}

// ----------------------- INDEX -----------------------

function Index() {
  return (
    <main id="top" className="theme-budapeste bg-twilight-radial min-h-screen overflow-x-hidden">
      <ReadingProgressBar />
      <StickyNav />
      <BudapesteHeroStyles />
      <Hero />
      <ConhecerBudapeste />
      <EssentialInfo />
      <Overview />
      <Itineraries />
      <GuideVideo />
      <Food />
      <Tips />
      <Checklist />
      <FinalStamp code="BUD" year="2026" />
      <CustomItineraryCTA city="Budapeste" />
      <OutrosPostais currentSlug="budapeste" />
      <SiteFooter city="Budapeste" farewell="Viszlát, Budapest!" />
    </main>
  );
}

function BudapesteHeroStyles() {
  return (
    <style>{`
      @keyframes budapeste-kenburns { from { transform: scale(1.04); } to { transform: scale(1.14); } }
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
  { id: "video", label: "Vídeo" },
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
                      layoutId="nav-underline-budapeste"
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
