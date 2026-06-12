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
  Ticket,
  ExternalLink,
  Footprints,
  Ship,
  ArrowLeftRight,
  Menu,
  Play,
  Info,
  Calendar,
  CloudSun,
  PartyPopper,
  Bus,
  Coffee,
  Anchor,
  TreePine,
  ShoppingBag,
} from "lucide-react";
import type { Variants } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/istambul")({
  head: () => ({
    meta: [
      { title: "Istambul — Guia de 5 dias ao teu ritmo" },
      {
        name: "description",
        content:
          "Guia público de 5 dias em Istambul: Sultanahmet, Topkapi, Bósforo, Ilha dos Príncipes e Beyoğlu. Dicas, comida, cruzeiro no Bósforo e conversor de moeda.",
      },
      { property: "og:title", content: "Istambul — Guia de 5 dias ao teu ritmo" },
      {
        property: "og:description",
        content:
          "Guia público de 5 dias para descobrir Istambul sem pressa: duas margens, dois continentes, mil minaretes.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://compassoroutes.lovable.app/istambul" },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    links: [{ rel: "canonical", href: "https://compassoroutes.lovable.app/istambul" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Istambul — Guia de 5 dias ao teu ritmo",
          description:
            "Guia público de 5 dias em Istambul: Sultanahmet, Topkapi, Bósforo, Ilha dos Príncipes e Beyoğlu.",
          author: { "@type": "Person", name: "Compasso Routes" },
        }),
      },
    ],
  }),
  component: IstambulPage,
});

// ----------------------- helpers -----------------------

const FALLBACK_TRY_PER_EUR = 53.5;

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
              <EightPointStar className="h-3 w-3 text-gold" />
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

function IznikLink({ href, children }: { href: string; children: React.ReactNode }) {
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

// ----------------------- decorative motifs -----------------------

function EightPointStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 1l3 4.5 5-2-2 5 4.5 3-4.5 3 2 5-5-2-3 4.5-3-4.5-5 2 2-5L1 12l4.5-3-2-5 5 2L12 1z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArabesqueDivider({ className }: { className?: string }) {
  return (
    <div className={`mx-auto flex items-center justify-center gap-3 ${className ?? ""}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-gold/60" />
      <svg viewBox="0 0 40 16" className="h-3 w-10 text-gold" fill="none" aria-hidden>
        <path
          d="M2 8 C 8 0, 14 16, 20 8 C 26 0, 32 16, 38 8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <EightPointStar className="h-3 w-3 text-gold" />
      <svg viewBox="0 0 40 16" className="h-3 w-10 text-gold" fill="none" aria-hidden>
        <path
          d="M2 8 C 8 0, 14 16, 20 8 C 26 0, 32 16, 38 8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent via-gold/60 to-gold/60" />
    </div>
  );
}

function DomeSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 60"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      {/* minarets + domes */}
      <line x1="20" y1="60" x2="20" y2="10" />
      <circle cx="20" cy="8" r="2" />
      <path d="M30 60 Q 50 30 70 60 Z" />
      <line x1="80" y1="60" x2="80" y2="14" />
      <circle cx="80" cy="12" r="1.5" />
      <path d="M90 60 Q 120 20 150 60 Z" />
      <line x1="160" y1="60" x2="160" y2="8" />
      <circle cx="160" cy="6" r="2" />
      <line x1="170" y1="60" x2="170" y2="12" />
      <circle cx="170" cy="10" r="1.5" />
      <path d="M180 60 Q 210 25 240 60 Z" />
      <line x1="250" y1="60" x2="250" y2="10" />
      <circle cx="250" cy="8" r="2" />
      <path d="M260 60 Q 280 35 300 60 Z" />
      <line x1="310" y1="60" x2="310" y2="16" />
      <circle cx="310" cy="14" r="1.5" />
    </svg>
  );
}

// ----------------------- DATA -----------------------

type Stop = {
  time: string;
  title: string;
  desc: string;
  tip?: string;
  link?: string;
  img?: string;
  imgAlt?: string;
  icon: React.ComponentType<{ className?: string }>;
  bookingUrl?: string;
  hours?: string;
  hoursNote?: string;
  walkTo?: string;
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
  stops: Stop[];
  highlightTip?: string;
  walkTotal?: string;
  howToGet?: string;
  mapEmbedUrl?: string;
  mapLinkUrl?: string;
  dayNote?: { tone: "amber"; text: string };
  dayTag?: string;
};

const days: Day[] = [
  {
    key: "d1",
    label: "Dia 1",
    date: "Sultanahmet",
    title: "Chegada & cidade antiga",
    vibe:
      "Aterrar com calma entre Bizâncio e o Império Otomano: Hagia Sophia, Mesquita Azul e a cisterna subterrânea.",
    accent: "from-cyan-400/30 to-indigo-500/10",
    icon: Sun,
    cover:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80",
    walkTotal: "A pé hoje: ~20 min",
    dayNote: {
      tone: "amber",
      text: "Vai cedo aos monumentos — às 10h chegam os autocarros de tour.",
    },
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Hagia+Sophia,+Istanbul&daddr=Blue+Mosque,+Istanbul+to:Hippodrome+of+Constantinople+to:Basilica+Cistern,+Istanbul&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Hagia+Sophia,+Istanbul/Blue+Mosque,+Istanbul/Hippodrome+of+Constantinople/Basilica+Cistern,+Istanbul/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "13:00",
        title: "Check-in & primeiro chá",
        desc: "Deixar malas, um çay (chá turco) e respirar.",
        icon: MapPin,
        walkTo: "~10 min",
      },
      {
        time: "Início do dia",
        title: "Hagia Sophia",
        desc: "Logo à abertura (~9h) para evitar 1–2 h de fila. É mesquita: ombros e pernas cobertos, lenço na cabeça para mulheres. A galeria superior tem bilhete à parte.",
        tip: "Reservar acesso prioritário online — poupa horas em fila e garante a galeria superior.",
        link: "https://pt.wikipedia.org/wiki/Hagia_Sophia",
        img: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80",
        imgAlt: "Hagia Sophia em Istambul ao amanhecer",
        icon: Church,
        bookingUrl: "https://muze.gen.tr/muze-detay/ayasofya",
        hours: "~9:00 — fechada nas horas de oração",
        walkTo: "~3 min",
      },
      {
        time: "~3 min depois",
        title: "Mesquita Azul (Sultanahmet)",
        desc: "Mesmo em frente. Entrada gratuita; fecha aos visitantes nas 5 horas de oração — entra entre orações.",
        link: "https://pt.wikipedia.org/wiki/Mesquita_Azul",
        icon: Church,
        walkTo: "~2 min",
      },
      {
        time: "~2 min depois",
        title: "Hipódromo (Praça Sultanahmet)",
        desc: "Antigo hipódromo bizantino a céu aberto: Obelisco de Teodósio e Coluna Serpentina. Passagem rápida.",
        link: "https://pt.wikipedia.org/wiki/Hipódromo_de_Constantinopla",
        icon: Sparkles,
        walkTo: "~5 min",
      },
      {
        time: "Fim de tarde",
        title: "Cisterna da Basílica",
        desc: "336 colunas e as cabeças de Medusa invertidas. Cara mas única — bilhete online para saltar a fila.",
        link: "https://pt.wikipedia.org/wiki/Cisterna_da_Bas%C3%ADlica",
        icon: Castle,
        bookingUrl: "https://yerebatan.com/en/",
        hours: "~9:00–22:00",
      },
    ],
  },
  {
    key: "d2",
    label: "Dia 2",
    date: "Topkapi & bazares",
    title: "Sultões e mercados",
    vibe:
      "Manhã de palácio otomano, tarde de mesquita imperial e do maior bazar coberto do mundo.",
    accent: "from-teal-400/30 to-rose-500/10",
    icon: Crown,
    cover:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
    highlightTip:
      "Topkapi e Grande Bazar fecham em dias diferentes — Topkapi às terças, Grande Bazar aos domingos.",
    howToGet: "Como andar: a pé + elétrico T1.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Topkapi+Palace,+Istanbul&daddr=Gulhane+Park,+Istanbul+to:Suleymaniye+Mosque,+Istanbul+to:Grand+Bazaar,+Istanbul&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Topkapi+Palace,+Istanbul/Gulhane+Park,+Istanbul/Suleymaniye+Mosque,+Istanbul/Grand+Bazaar,+Istanbul/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:00",
        title: "Palácio Topkapi",
        desc: "Logo à abertura. Fechado às terças. Paga o extra do Harém (vale a pena) e vai ao 4.º pátio pelas vistas do Bósforo.",
        link: "https://pt.wikipedia.org/wiki/Pal%C3%A1cio_de_Topkap%C4%B1",
        icon: Crown,
        bookingUrl: "https://muze.gen.tr/muze-detay/topkapi",
        hours: "~9:00–18:00",
        hoursNote: "FECHADO ÀS TERÇAS",
        walkTo: "~5 min",
      },
      {
        time: "Almoço",
        title: "Parque Gülhane",
        desc: "Antigo jardim imperial à saída do palácio: sombra, gatos e vistas do Corno de Ouro. Bom para almoço/pausa. (Opcional ao lado: Museus Arqueológicos de Istambul.)",
        icon: TreePine,
        walkTo: "~15 min",
      },
      {
        time: "Início de tarde",
        title: "Mesquita Süleymaniye",
        desc: "Obra-prima de Sinan no topo da colina; menos turística que a Azul, entrada gratuita e das melhores vistas da cidade.",
        link: "https://pt.wikipedia.org/wiki/Mesquita_de_Solim%C3%A3o",
        icon: Church,
        walkTo: "~10 min",
      },
      {
        time: "Tarde",
        title: "Grande Bazar",
        desc: "Milhares de lojas. Regateia sempre e nunca aceites a 1.ª oferta. Fechado aos domingos. Cuidado com a carteira.",
        link: "https://pt.wikipedia.org/wiki/Grande_Bazar_de_Istambul",
        img: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
        imgAlt: "Interior do Grande Bazar de Istambul",
        icon: ShoppingBag,
        hoursNote: "FECHADO AOS DOMINGOS",
      },
    ],
  },
  {
    key: "d3",
    label: "Dia 3",
    date: "Bósforo & Ásia",
    title: "Entre dois continentes",
    vibe:
      "Palácio à beira-rio, mesquita fotogénica e travessia de ferry para o lado asiático. À noite, cruzeiro no Bósforo.",
    accent: "from-sky-400/30 to-violet-500/10",
    icon: Ship,
    cover:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    howToGet: "Como andar: elétrico/autocarro + ferry.",
    highlightTip:
      "Reserva o cruzeiro noturno do Bósforo para o fim do dia — esgota com antecedência.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Dolmabahce+Palace,+Istanbul&daddr=Ortakoy+Mosque,+Istanbul+to:Kadikoy,+Istanbul&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Dolmabahce+Palace,+Istanbul/Ortakoy+Mosque,+Istanbul/Kadikoy,+Istanbul",
    stops: [
      {
        time: "09:30",
        title: "Palácio Dolmabahçe",
        desc: "Luxo otomano-europeu à beira do Bósforo, candelabros gigantes. Fechado às segundas. Vai cedo; audioguia recomendado.",
        link: "https://pt.wikipedia.org/wiki/Pal%C3%A1cio_de_Dolmabah%C3%A7e",
        icon: Crown,
        bookingUrl: "https://www.millisaraylar.gov.tr/saraylar/dolmabahce-sarayi",
        hours: "~9:00–16:00",
        hoursNote: "FECHADO ÀS SEGUNDAS",
        walkTo: "curto trajeto",
      },
      {
        time: "Meio-dia",
        title: "Ortaköy (Mesquita Büyük Mecidiye)",
        desc: "Mesquita cor-de-rosa com a ponte do Bósforo atrás. Prova um kumpir (batata recheada) e um waffle na praça.",
        link: "https://pt.wikipedia.org/wiki/Mesquita_de_Ortak%C3%B6y",
        icon: Church,
        walkTo: "ferry (~20 min)",
      },
      {
        time: "Tarde",
        title: "Kadıköy & Moda (lado asiático)",
        desc: "A travessia mais bonita e barata da cidade. Bairro jovem, mercado de comida, esplanadas à beira-mar e pôr do sol sobre a silhueta da cidade velha.",
        icon: Coffee,
        img: "https://images.unsplash.com/photo-1604941237794-29afbdac3df5?auto=format&fit=crop&w=1200&q=80",
        imgAlt: "Ferry no Bósforo com a silhueta de Istambul ao fundo",
      },
      {
        time: "20:00",
        title: "Cruzeiro noturno no Bósforo",
        desc: "Ver Istambul iluminada a partir da água é mágico (ver secção «Bósforo» abaixo). Foge dos cruzeiros de menos de 2 h.",
        icon: Ship,
      },
    ],
  },
  {
    key: "d4",
    label: "Dia 4",
    date: "Ilha dos Príncipes",
    title: "Dia sem carros",
    vibe:
      "Fuga de ferry a Büyükada: bicicleta, pinhais, mansões de madeira e peixe à beira-mar.",
    accent: "from-emerald-400/30 to-cyan-400/10",
    icon: Anchor,
    cover:
      "https://images.unsplash.com/photo-1591801074660-15b75d2b1f64?auto=format&fit=crop&w=1200&q=80",
    howToGet: "Como chegar: ferry público de Eminönü/Kabataş (~1h–1h30).",
    dayTag: "Dia lento, longe do trânsito.",
    dayNote: {
      tone: "amber",
      text: "CONFIRMA o horário do último ferry de regresso — são poucos!",
    },
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&q=B%C3%BCy%C3%BCkada,+Istanbul",
    mapLinkUrl: "https://www.google.com/maps/place/B%C3%BCy%C3%BCkada,+Adalar/Istanbul",
    stops: [
      {
        time: "09:30",
        title: "Embarque dos ferries (Eminönü/Kabataş)",
        desc: "Vai cedo para apanhar barco com folga.",
        icon: Ship,
      },
      {
        time: "11:00",
        title: "Büyükada",
        desc: "A maior ilha, sem carros. Aluga bicicleta ou e-bike, passeia entre as mansões vitorianas de madeira e os pinhais, e almoça peixe à beira-mar.",
        link: "https://pt.wikipedia.org/wiki/B%C3%BCy%C3%BCkada",
        icon: TreePine,
        img: "https://images.unsplash.com/photo-1591801074660-15b75d2b1f64?auto=format&fit=crop&w=1200&q=80",
        imgAlt: "Mansão de madeira na Ilha dos Príncipes",
      },
      {
        time: "Tarde",
        title: "Banho, miradouro & café",
        desc: "Tempo tranquilo antes do regresso. (Alternativa mais calma: Heybeliada, com menos gente.)",
        icon: Coffee,
      },
      {
        time: "Fim de tarde",
        title: "Ferry de regresso",
        desc: "Confirma o horário com antecedência.",
        icon: Ship,
      },
    ],
  },
  {
    key: "d5",
    label: "Dia 5",
    date: "Corno de Ouro & Beyoğlu",
    title: "Istambul moderna & partida",
    vibe:
      "Bazar das especiarias, Ponte Gálata, Torre de Gálata e İstiklal antes de partir.",
    accent: "from-amber-400/20 to-cyan-500/10",
    icon: Moon,
    cover:
      "https://images.unsplash.com/photo-1545158539-78d24f8efea3?auto=format&fit=crop&w=1200&q=80",
    walkTotal: "A pé hoje: ~30 min, do bazar à Torre de Gálata.",
    howToGet: "Adapta consoante a hora do voo.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Spice+Bazaar,+Istanbul&daddr=Galata+Bridge,+Istanbul+to:Karakoy,+Istanbul+to:Galata+Tower,+Istanbul+to:Taksim+Square,+Istanbul&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Spice+Bazaar,+Istanbul/Galata+Bridge,+Istanbul/Karakoy,+Istanbul/Galata+Tower,+Istanbul/Taksim+Square,+Istanbul/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "10:00",
        title: "Bazar das Especiarias (Egípcio)",
        desc: "Especiarias, chás, doçaria e lokum. Espreita a Mesquita Rüstem Paşa ali ao lado (azulejos iznik, ignorada por quase todos).",
        link: "https://pt.wikipedia.org/wiki/Bazar_Eg%C3%ADpcio",
        icon: ShoppingBag,
        walkTo: "~5 min",
      },
      {
        time: "Almoço",
        title: "Ponte Gálata",
        desc: "Pescadores em cima, restaurantes de peixe por baixo. Prova um balık ekmek (sande de peixe) em Eminönü.",
        link: "https://pt.wikipedia.org/wiki/Ponte_de_G%C3%A1lata",
        icon: Utensils,
        walkTo: "~10 min",
      },
      {
        time: "Tarde",
        title: "Karaköy",
        desc: "Bairro de cafés e galerias; café turco e baklava antes da subida.",
        icon: Coffee,
        walkTo: "~10 min (subida íngreme)",
      },
      {
        time: "Fim de tarde",
        title: "Torre de Gálata",
        desc: "Vista 360º sobre a cidade antiga. Bilhete online; linda ao fim da tarde.",
        link: "https://pt.wikipedia.org/wiki/Torre_de_G%C3%A1lata",
        img: "https://images.unsplash.com/photo-1545158539-78d24f8efea3?auto=format&fit=crop&w=1200&q=80",
        imgAlt: "Torre de Gálata em Istambul",
        icon: Castle,
        bookingUrl: "https://galatakulesi.gov.tr/",
        hours: "~8:30–23:00",
        walkTo: "~15 min",
      },
      {
        time: "Noite",
        title: "Avenida İstiklal & Taksim",
        desc: "Artéria pedonal com o elétrico vermelho, vibrante até tarde. Última volta, compras e jantar com pôr do sol sobre os minaretes.",
        link: "https://pt.wikipedia.org/wiki/Avenida_%C4%B0stiklal",
        icon: Sparkles,
      },
      {
        time: "Depois",
        title: "Regresso / aeroporto",
        desc: "Recolher malas e transfer/Havaİst até ao aeroporto, sem corridas.",
        icon: Bus,
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
        <img
          src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=2400&q=80"
          alt="Istambul à hora azul — silhueta do Bósforo com mesquitas e ferries"
          className="h-[120%] w-full object-cover"
        />
        {/* indigo/petrol-blue overlay (replaces amber on Praga hero) */}
        <div className="absolute inset-0 bg-gradient-to-b from-twilight/50 via-twilight/65 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.13_0.05_265/0.75)_100%)]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="glass mx-auto w-full max-w-2xl rounded-3xl px-8 py-12 text-center shadow-2xl md:px-14 md:py-16"
        >
          <div className="mb-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold/70" />
            Guia · 5 dias
            <span className="h-px w-8 bg-gold/70" />
          </div>
          <h1 className="font-serif leading-[1.05]">
            <span className="block text-gradient-gold text-6xl md:text-8xl">Istambul</span>
            <span className="mt-6 block font-serif text-xl italic text-cream/85 md:text-2xl">
              Guia de 5 dias ao teu ritmo
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Um guia público para descobrir Istambul sem pressa: duas margens, dois continentes,
            mil minaretes — e o melhor entre a Europa e a Ásia, para qualquer viajante.
          </p>
          <div className="mt-7 flex justify-center">
            <EightPointStar className="h-4 w-4 text-gold/80" />
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
      title="Cinco dias, cinco humores"
      intro="Cada dia tem o seu cenário e a sua cadência. Devagar de manhã, à beira do Bósforo ao fim da tarde."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
              className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-card backdrop-blur-md transition-shadow hover:shadow-[0_20px_60px_-20px_oklch(0.78_0.14_200/0.4)]"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={d.cover}
                  alt={d.title}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${d.accent}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
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
  const hasExtra = !!(stop.tip || stop.img);

  return (
    <motion.div
      initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="relative pl-16 md:pl-20"
    >
      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-twilight shadow-[0_0_0_4px_oklch(0.13_0.05_265),0_0_30px_oklch(0.78_0.14_200/0.3)] md:left-5">
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
              {stop.link ? <IznikLink href={stop.link}>{stop.title}</IznikLink> : stop.title}
            </h4>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            {stop.desc}
          </p>
        </button>

        {(stop.hours || stop.bookingUrl) && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {stop.bookingUrl && (
              <a
                href={stop.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/25 hover:shadow-[0_10px_30px_-10px_oklch(0.78_0.14_200/0.6)]"
              >
                <Ticket className="h-3.5 w-3.5" />
                Reservar
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            )}
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
        <div className="mt-3 grid gap-4 rounded-2xl border border-gold/15 bg-twilight/60 p-5 md:grid-cols-[1fr_auto]">
          {stop.tip && (
            <div className="flex gap-3">
              <Lightbulb className="mt-1 h-4 w-4 flex-shrink-0 text-gold" />
              <p className="text-sm italic text-cream/90">{stop.tip}</p>
            </div>
          )}
          {stop.img && (
            <img
              src={stop.img}
              alt={stop.imgAlt ?? stop.title}
              className="h-40 w-full rounded-xl object-cover shadow-lg md:w-64"
              loading="lazy"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function DayBlock({ day }: { day: Day }) {
  const Icon = day.icon;
  const isIsland = day.key === "d4";
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

      {(day.walkTotal || day.howToGet || day.dayTag) && (
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
          {day.dayTag && (
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs italic text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              {day.dayTag}
            </span>
          )}
        </div>
      )}

      {day.dayNote && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-300" />
          <p className="text-sm leading-relaxed text-cream/90">{day.dayNote.text}</p>
        </motion.div>
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
          <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-twilight/60 shadow-[0_20px_60px_-30px_oklch(0.78_0.14_200/0.45)]">
            <iframe
              src={day.mapEmbedUrl}
              title={isIsland ? "Ilha de Büyükada no mapa" : `Percurso a pé do ${day.label}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0"
              style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(.75) contrast(.95)" }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-twilight via-twilight/70 to-transparent" />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="font-serif text-sm italic text-gold/80">
              {isIsland ? "Büyükada — Ilha dos Príncipes" : `Percurso a pé do ${day.label}`}
            </p>
            {day.mapLinkUrl && (
              <a
                href={day.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold/10"
              >
                <MapPin className="h-3.5 w-3.5" />
                {isIsland ? "Abrir ilha no mapa" : "Abrir percurso no mapa"}
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
      intro="Toca para abrir cada paragem — dicas, mini-histórias e imagens. Horários sugeridos, adapta ao teu ritmo."
    >
      <div className="space-y-24">
        {days.map((d) => (
          <DayBlock key={d.key} day={d} />
        ))}
      </div>
    </Section>
  );
}

// ----------------------- BÓSFORO (two-card comparison) -----------------------

function Bosforo() {
  const tiers = [
    {
      name: "Ferry & cruzeiro de dia",
      tag: "Acessível",
      where: "Ferry público (Şehir Hatları) ou cruzeiro curto pelo Bósforo / Corno de Ouro",
      price: "trocos – €€",
      pros: [
        "Vistas de palácios, fortalezas e das duas margens por muito pouco",
        "Sem horários rígidos nem reserva — apanhas e segues",
      ],
      cons: ["Sem jantar nem espetáculo"],
      cta: "A maneira mais barata e autêntica de cruzar continentes.",
      highlight: false,
      link: "https://en.sehirhatlari.istanbul/",
    },
    {
      name: "Cruzeiro noturno com jantar",
      tag: "Imperdível",
      where: "~3 h à noite, com jantar e espetáculo ao vivo",
      price: "€€€",
      pros: [
        "Istambul iluminada a partir da água — minaretes e pontes a brilhar",
        "Reservar com antecedência",
      ],
      cons: ["Evita os cruzeiros de menos de 2 h — mais baratos, mas desilusão"],
      cta: "A experiência que se conta no regresso.",
      highlight: true,
      link: "https://www.getyourguide.com/istanbul-l56/bosphorus-dinner-cruise-tc55/",
    },
  ];

  return (
    <Section
      id="bosforo"
      eyebrow="No Bósforo"
      title="Bósforo: de dia ou à noite?"
      intro="Istambul vê-se melhor a partir da água. Vale escolher bem — e, para o cruzeiro com jantar, reservar com tempo."
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
                ? "border-gold/60 bg-gradient-to-br from-gold/10 via-terracotta/10 to-transparent shadow-[0_30px_80px_-30px_oklch(0.78_0.14_200/0.5)]"
                : "border-gold/15 bg-card"
            }`}
          >
            {t.highlight && (
              <div className="absolute right-6 top-6 rounded-full border border-gold/50 bg-gold/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold">
                Recomendado
              </div>
            )}
            <div className="text-xs uppercase tracking-[0.3em] text-gold">{t.tag}</div>
            <h3 className="mt-3 font-serif text-3xl text-cream">{t.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              <IznikLink href={t.link}>{t.where}</IznikLink>
            </p>
            <div className="mt-5 font-serif text-4xl text-gradient-gold">{t.price}</div>

            <ul className="mt-6 space-y-2.5">
              {t.pros.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-cream/90">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                  {p}
                </li>
              ))}
              {t.cons.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-terracotta" />
                  {p}
                </li>
              ))}
            </ul>

            <p className="mt-6 border-t border-gold/15 pt-5 text-sm italic text-cream/80">{t.cta}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ----------------------- FOOD -----------------------

function Food() {
  const areas = [
    "Kahvaltı (pequeno-almoço turco) numa kahvaltı salonu — mais experiência do que refeição.",
    "Ocakbaşı (grelhador a carvão) para kebap e köfte — procura os cheios de locais.",
    "Balık ekmek (sande de peixe) em Eminönü, junto à Ponte Gálata.",
    "Meyhane (taberna de meze) em Beyoğlu/Karaköy para uma noite à turca, com rakı.",
    "Kadıköy (lado asiático): a melhor zona de comida de rua e mercados.",
    "(Confirma horários e reservas no local — Istambul muda depressa.)",
  ];

  const dishes = [
    {
      name: "Kahvaltı",
      desc: "O lendário pequeno-almoço turco — queijos, azeitonas, ovos, mel, pão quente e chá sem fim.",
      img: "https://images.unsplash.com/photo-1517315003714-a071486bd9ea?auto=format&fit=crop&w=1200&q=80",
      imgAlt: "Pequeno-almoço turco tradicional",
    },
    {
      name: "Balık ekmek",
      desc: "Peixe grelhado no pão, à beira do Bósforo.",
    },
    {
      name: "Kebap & köfte",
      desc: "Do döner ao Adana picante; köfte (almôndegas) grelhado.",
    },
    {
      name: "Baklava & lokum",
      desc: "Massa folhada com pistácio e mel; e as «delícias turcas» do bazar.",
      img: "https://images.unsplash.com/photo-1598110750624-207050c4f28c?auto=format&fit=crop&w=1200&q=80",
      imgAlt: "Baklava turco com pistácio",
    },
    {
      name: "Çay & kahve",
      desc: "Chá preto em copo tulipa (com 1–2 açúcares, sem pressas) e o café turco espesso.",
    },
    {
      name: "Kumpir",
      desc: "Batata gigante recheada, clássica de Ortaköy.",
    },
  ];

  return (
    <Section
      id="comer"
      eyebrow="À mesa"
      title="Comer e beber em Istambul"
      intro="Muito sabor, pouca cerimónia. E uma ou duas armadilhas turísticas para evitar."
    >
      <h3 className="mb-6 font-serif text-2xl text-cream">Por onde comer</h3>
      <ul className="grid gap-3 md:grid-cols-2">
        {areas.map((a, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="flex gap-3 rounded-2xl border border-gold/15 bg-card p-4 text-sm leading-relaxed text-cream/90"
          >
            <Utensils className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
            <span>{a}</span>
          </motion.li>
        ))}
      </ul>

      <h3 className="mb-6 mt-16 font-serif text-2xl text-cream">Provar sem falta</h3>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {dishes.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="overflow-hidden rounded-2xl border border-gold/15 bg-card"
          >
            {d.img && <img src={d.img} alt={d.imgAlt} className="h-44 w-full object-cover" loading="lazy" />}
            <div className="p-5">
              <div className="flex items-center gap-2 text-gold">
                <Utensils className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.25em]">Sabor local</span>
              </div>
              <h4 className="mt-2 font-serif text-2xl text-cream">{d.name}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
            </div>
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
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>• Evita os restaurantes da faixa turística de Sultanahmet (caros e fracos) — anda 5 min para fora.</li>
            <li>• Confirma o preço por peso/por porção antes de pedir peixe ou meze (a conta pode disparar).</li>
            <li>• Desconfia de quem te puxa para dentro com «chá grátis» ou te leva a um bar «de um amigo».</li>
          </ul>
        </div>
      </motion.div>
    </Section>
  );
}

// ----------------------- TIPS & TRAPS -----------------------

function Tips() {
  const doIt = [
    "Comprar o Istanbulkart logo no aeroporto e usá-lo em tudo (incl. ferries).",
    "Pagar sempre em liras e levantar em ATMs de bancos (não em casas de câmbio da rua).",
    "Usar os ferries — a forma mais bonita e barata de andar.",
    "Regatear nos bazares; nunca aceitar a primeira oferta.",
    "Vestir-se com respeito nas mesquitas (ombros/pernas cobertos; lenço para mulheres — costumam dar à porta).",
    "Ir cedo aos grandes monumentos (Topkapi, Hagia Sophia, Dolmabahçe).",
  ];
  const dont = [
    "Táxis em zonas turísticas (taxímetro «salta»). Usa BiTaksi ou Uber, ou o elétrico T1.",
    "O scam do engraxador que deixa cair a escova, e o do «amigo simpático» que te leva a um bar caro.",
    "ATMs Euronet — câmbio péssimo.",
    "Beber álcool na via pública em bairros conservadores (zona de Fatih/Sultanahmet).",
    "Comprar à primeira oferta no bazar.",
    "Confiar em «guias» não oficiais à porta dos monumentos.",
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
    "Hagia Sophia — acesso prioritário (e galeria superior)",
    "Cisterna da Basílica — bilhete sem fila",
    "Palácio Topkapi + Harém — entrada sem fila",
    "Palácio Dolmabahçe — entrada (fechado às segundas)",
    "Cruzeiro noturno no Bósforo (com jantar)",
    "Ferry para a Ilha dos Príncipes — confirmar horários e o ÚLTIMO ferry de regresso",
    "Hammam (banho turco), se quiseres a experiência",
    "Mesa em meyhane/restaurante popular para a noite de Beyoğlu",
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
        <ArabesqueDivider className="mb-8" />
        <p className="font-serif text-3xl text-gradient-gold md:text-4xl">Şerefe — à vossa.</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Istambul · Guia de 5 dias, entre o azul do Bósforo e o azulejo de İznik.
        </p>
        <DomeSilhouette className="mx-auto mt-10 h-10 w-72 text-gold/40 md:w-96" />
      </div>
    </footer>
  );
}

// ----------------------- PAGE -----------------------

function IstambulPage() {
  return (
    <main
      id="top"
      className="theme-iznik bg-twilight-radial min-h-screen overflow-x-hidden"
    >
      <StickyNav />
      <Hero />
      <VePrimeiro />
      <ConhecerIstambul />
      <EssentialInfo />
      <Overview />
      <Itineraries />
      <Bosforo />
      <Food />
      <Tips />
      <Checklist />
      <Footer />
    </main>
  );
}

// ----------------------- STICKY NAV -----------------------

const navLinks = [
  { id: "ve-primeiro", label: "Vê primeiro" },
  { id: "d1", label: "Dia 1" },
  { id: "d2", label: "Dia 2" },
  { id: "d3", label: "Dia 3" },
  { id: "d4", label: "Dia 4" },
  { id: "d5", label: "Dia 5" },
  { id: "bosforo", label: "Bósforo" },
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
          className={`font-serif text-sm tracking-wide text-gold md:text-base hover:text-cream transition-colors ${shadow}`}
        >
          ‹ Viagens do Carlos
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
                      layoutId="iznik-nav-underline"
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

// ----------------------- VÊ PRIMEIRO -----------------------

function VePrimeiro() {
  return (
    <Section
      id="ve-primeiro"
      eyebrow="Antes de partir"
      title="Vê primeiro"
      intro="Uns minutos de Istambul em movimento para entrar no espírito da viagem."
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
              src="https://www.youtube.com/embed/Tn1zT8RJ0kI"
              title="Vê primeiro — Istambul"
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
          Uma vista de olhos por Istambul antes de partir.
        </p>
      </motion.div>
    </Section>
  );
}

// ----------------------- CONHECER ISTAMBUL -----------------------

const climaMeses: Array<[string, number, number, string]> = [
  ["Jan", 9, 3, "alta"],
  ["Fev", 9, 3, "média"],
  ["Mar", 12, 4, "média"],
  ["Abr", 17, 8, "média"],
  ["Mai", 22, 13, "baixa"],
  ["Jun", 27, 17, "baixa"],
  ["Jul", 29, 20, "baixa"],
  ["Ago", 29, 20, "baixa"],
  ["Set", 25, 16, "baixa"],
  ["Out", 20, 13, "média"],
  ["Nov", 15, 9, "alta"],
  ["Dez", 11, 5, "alta"],
];

const eventos: Array<{ nome: string; quando: string; desc: string }> = [
  {
    nome: "Festival Internacional de Tulipas",
    quando: "abril",
    desc: "A cidade enche-se de cor (as tulipas são originárias daqui, não da Holanda).",
  },
  {
    nome: "Festival de Música de Istambul",
    quando: "junho",
    desc: "Música clássica; parte do festival decorre na igreja de Santa Irene.",
  },
  {
    nome: "Akbank Jazz Festival & Festival de Teatro",
    quando: "novembro",
    desc: "Dois grandes festivais em simultâneo, espalhados pela cidade.",
  },
  {
    nome: "Ramadão",
    quando: "datas variáveis",
    desc: "Muitos locais jejuam de dia; à noite a cidade ganha vida com o iftar. Sê discreto a comer/beber em público de dia em zonas conservadoras.",
  },
];

function ConhecerIstambul() {
  const itemCls = "glass rounded-2xl border border-gold/15 px-5 sm:px-6 overflow-hidden";
  const triggerCls = "py-5 font-serif text-lg sm:text-xl text-cream hover:no-underline gap-3";
  const iconCls =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30 text-gold";

  return (
    <Section
      id="conhecer"
      eyebrow="Contexto"
      title="Conhecer Istambul"
      intro="Contexto rápido antes de partir — abre só o que te interessar."
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
                Istambul em 2 minutos
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-cream/90 space-y-3">
              <p>
                Maior cidade da Turquia (~16 milhões de habitantes), a única no mundo a estender-se por
                dois continentes, atravessada pelo Bósforo.
              </p>
              <p>
                Foi Bizâncio e depois Constantinopla; capital dos impérios romano, bizantino e otomano.
              </p>
              <p>
                Ao contrário do que muitos pensam, <em>NÃO é a capital</em> da Turquia — essa é Ancara.
              </p>
              <p>
                A "cidade das mil mesquitas", de cúpulas e minaretes, bazares milenares e ferries que
                cruzam continentes por trocos.
              </p>
              <p>
                Compacta no centro histórico e fácil a pé, mas enorme no todo — melhor combinar
                caminhadas com elétrico e barco.
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
                <span className="text-gold">Primavera (abr–mai) e início de outono (set):</span> a
                melhor altura — clima ameno, menos calor, menos filas.
              </p>
              <p>
                <span className="text-gold">Verão (jun–ago):</span> a época mais cheia; quente e
                húmido, mas com dias longos e ferries deliciosos.
              </p>
              <p>
                <span className="text-gold">Outono tardio (out–nov):</span> ameno mas mais chuvoso;
                bons festivais.
              </p>
              <p>
                <span className="text-gold">Inverno (dez–fev):</span> fresco e chuvoso, raramente
                abaixo de 0 °C; hotéis bem mais baratos e cidade enevoada e romântica.
              </p>
              <p className="font-serif italic text-gold/90 pt-2">
                Equilíbrio ideal: maio ou setembro.
              </p>
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
                Médias aproximadas — o tempo varia de ano para ano.
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
    body: "GMT+3, sem mudança de hora. Istambul está 2 h à frente de Portugal no verão (3 h no inverno).",
  },
  {
    icon: Coins,
    title: "Moeda",
    body: "Lira turca (TRY). Muito volátil — confirma sempre a taxa do dia. Cartão aceite em quase todo o lado; leva dinheiro para bazares, ferries e gorjetas.",
  },
  {
    icon: Plug,
    title: "Tomadas",
    body: "Tipo C/F, 230 V / 50 Hz. As fichas portuguesas encaixam sem adaptador.",
  },
  {
    icon: Phone,
    title: "Emergência",
    body: "112 (geral).",
  },
  {
    icon: Bus,
    title: "Transportes",
    body: "Compra o Istanbulkart logo no aeroporto — serve para metro, elétrico (T1), autocarro, comboio (Marmaray) e ferry. Recarrega em quiosques e máquinas; pode ser partilhado.",
  },
  {
    icon: HandCoins,
    title: "Gorjetas",
    body: "~10 % em restaurantes se o serviço não estiver incluído; arredondar em cafés e táxis.",
  },
];

const phrases: Array<[string, string]> = [
  ["Olá", "Merhaba"],
  ["Obrigado", "Teşekkürler (Sağ ol)"],
  ["Por favor", "Lütfen"],
  ["Sim / Não", "Evet / Hayır"],
  ["Quanto custa?", "Ne kadar?"],
  ["Saúde (brinde)", "Şerefe"],
];

function EssentialInfo() {
  return (
    <Section
      id="essencial"
      eyebrow="Antes de partir"
      title="Essencial para a viagem"
      intro="O básico para chegar leve: fuso, dinheiro, transporte e um punhado de palavras turcas para abrir portas (e sorrisos)."
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
              className="glass rounded-2xl border border-gold/15 p-6 transition-shadow hover:shadow-[0_20px_60px_-30px_oklch(0.78_0.14_200/0.5)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30">
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
        <ul className="grid gap-4 md:grid-cols-3">
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Sultanahmet (cidade velha)</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Central e histórico, a pé dos grandes monumentos. Ideal para a 1.ª visita.
            </p>
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Beyoğlu / Galata</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Moderno e animado, cafés, rooftops e vida noturna. Bom para quem quer movimento.
            </p>
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Kadıköy (lado asiático)</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Jovem, local e descontraído, mercado de comida e esplanadas à beira-mar. Mais barato e
              autêntico, a um ferry do centro.
            </p>
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
          {phrases.map(([pt, tr]) => (
            <li
              key={pt}
              className="flex items-baseline justify-between gap-3 border-b border-gold/10 pb-2"
            >
              <span className="text-sm text-muted-foreground">{pt}</span>
              <span className="font-serif text-lg italic text-gold">{tr}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}

// ----------------------- CURRENCY CONVERTER (live rate) -----------------------

function CurrencyConverter() {
  const [rate, setRate] = useState<number>(FALLBACK_TRY_PER_EUR);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [eur, setEur] = useState<string>("10");
  const [tryAmt, setTryAmt] = useState<string>(String(Math.round(10 * FALLBACK_TRY_PER_EUR)));
  const eurId = useId();
  const tryId = useId();
  const eurRef = useRef<HTMLInputElement>(null);
  const tryRef = useRef<HTMLInputElement>(null);
  const [lastEdited, setLastEdited] = useState<"eur" | "try">("eur");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/EUR");
        if (!res.ok) throw new Error("rate fetch failed");
        const data = (await res.json()) as { rates?: Record<string, number> };
        const liveRate = data.rates?.TRY;
        if (!cancelled && typeof liveRate === "number" && liveRate > 0) {
          setRate(liveRate);
          setIsLive(true);
          // refresh dependent field
          setTryAmt((prev) => {
            const n = Number(eur);
            if (!isNaN(n) && eur !== "") return String(Math.round(n * liveRate));
            return prev;
          });
        }
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEurChange = (v: string) => {
    setEur(v);
    setLastEdited("eur");
    if (v === "" || isNaN(Number(v))) {
      setTryAmt("");
      return;
    }
    setTryAmt(String(Math.round(Number(v) * rate)));
  };

  const onTryChange = (v: string) => {
    setTryAmt(v);
    setLastEdited("try");
    if (v === "" || isNaN(Number(v))) {
      setEur("");
      return;
    }
    setEur((Number(v) / rate).toFixed(2));
  };

  const invert = () => {
    if (lastEdited === "eur") {
      tryRef.current?.focus();
      setLastEdited("try");
    } else {
      eurRef.current?.focus();
      setLastEdited("eur");
    }
  };

  const chipPreset = (tryVal: number) => {
    const eurValue = (tryVal / rate).toFixed(2);
    setTryAmt(String(tryVal));
    setEur(eurValue);
    setLastEdited("try");
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
        <h3 className="font-serif text-2xl text-cream">Conversor rápido</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_auto_1.1fr] lg:items-center">
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

        <div className="flex justify-center lg:px-2">
          <button
            type="button"
            onClick={invert}
            aria-label="Inverter"
            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-background/40 text-gold shadow-[0_10px_30px_-15px_oklch(0.78_0.14_200/0.6)] transition-all hover:bg-gold/10 hover:rotate-180"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </button>
        </div>

        <div>
          <label
            htmlFor={tryId}
            className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            Lira turca
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-serif text-xl text-gold/70">
              ₺
            </span>
            <input
              id={tryId}
              ref={tryRef}
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              value={tryAmt}
              onChange={(e) => onTryChange(e.target.value)}
              className="w-full rounded-xl border border-gold/20 bg-background/40 py-4 pl-10 pr-4 text-right font-serif text-3xl text-cream outline-none transition-colors focus:border-gold/50 focus:ring-2 focus:ring-gold/40"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Atalhos
        </span>
        {[100, 500, 1000].map((c) => {
          const eurValue = (c / rate).toFixed(2);
          return (
            <button
              key={c}
              type="button"
              onClick={() => chipPreset(c)}
              className="rounded-full border border-gold/20 bg-background/30 px-3.5 py-1.5 text-xs text-gold/90 transition-colors hover:border-gold/50 hover:bg-gold/10"
            >
              {c} TRY ≈ {eurValue} €
            </button>
          );
        })}
      </div>

      <p className="mt-5 font-serif text-xs italic text-gold/85">
        {isLive
          ? "Taxa atualizada automaticamente — a lira é volátil, confirma sempre antes de pagar."
          : "Taxa indisponível de momento — a usar valor aproximado."}
      </p>
    </motion.div>
  );
}