import { SmartImage } from "@/components/SmartImage";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ChevronDown,
  MapPin,
  Clock,
  Sparkles,
  Train,
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
  Ticket,
  ExternalLink,
  Footprints,
  Menu,
  Info,
  Calendar,
  CloudSun,
  PartyPopper,
  Palette,
  Landmark,
  BookOpen,
  Umbrella,
} from "lucide-react";
import { PostmarkCircle } from "@/components/postal/PostmarkCircle";
import { FinalStamp } from "@/components/postal/FinalStamp";
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

const HERO_IMG =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Tour_Eiffel_Wikimedia_Commons.jpg?width=2000";

export const Route = createFileRoute("/paris")({
  head: () => ({
    meta: [
      { title: "Guia de Paris, 3 dias + Versalhes · O Postal" },
      {
        name: "description",
        content:
          "Roteiro de 3 dias em Paris com dia extra em Versalhes: Torre Eiffel, Louvre, Notre-Dame, Montmartre, joias escondidas e onde comer na Cidade Luz.",
      },
      { property: "og:title", content: "Guia de Paris, 3 dias + Versalhes · O Postal" },
      {
        property: "og:description",
        content:
          "Roteiro de 3 dias em Paris com dia extra em Versalhes: Torre Eiffel, Louvre, Notre-Dame, Montmartre e joias escondidas.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://opostal.pt/paris" },
      { property: "og:image", content: HERO_IMG },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Guia de Paris, 3 dias + Versalhes · O Postal" },
      {
        name: "twitter:description",
        content:
          "Roteiro de 3 dias em Paris com dia extra em Versalhes: Torre Eiffel, Louvre, Notre-Dame e Montmartre.",
      },
      { name: "twitter:image", content: HERO_IMG },
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/paris" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          headline: "Guia de Paris, 3 dias + Versalhes",
          name: "Guia de Paris, 3 dias + Versalhes",
          url: "https://opostal.pt/paris",
          image: HERO_IMG,
          description:
            "Roteiro de 3 dias em Paris com dia extra em Versalhes: Torre Eiffel, Louvre, Notre-Dame, Montmartre, joias escondidas e onde comer.",
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
  img?: string;
  imgAlt?: string;
  img2?: string;
  img2Alt?: string;
  icon: React.ComponentType<{ className?: string }>;
  bookingUrl?: string;
  optional?: boolean;
  walkTo?: string;
};

type Day = {
  key: string;
  label: string;
  date: string;
  title: string;
  vibe: string;
  icon: React.ComponentType<{ className?: string }>;
  cover: string;
  stops: Stop[];
  highlightTip?: string;
  walkTotal?: string;
  howToGet?: string;
  dayNote?: { tone: "amber"; text: string };
};

const days: Day[] = [
  {
    key: "d1",
    label: "Dia 1",
    date: "Paris monumental",
    title: "Rive Droite e Orsay",
    vibe: "Os grandes ícones, da Torre Eiffel ao Musée d'Orsay.",
    icon: Sun,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Arc_de_Triomphe,_Paris_21_October_2010.jpg?width=1200",
    walkTotal: "A pé hoje: ~7 km",
    stops: [
      {
        time: "09:00",
        title: "Torre Eiffel",
        desc: "O monumento mais visitado do mundo e o melhor arranque para a viagem. Sobe ao segundo piso ou ao topo para as vistas panorâmicas, ou fica-te pelo Champ de Mars para as fotos clássicas. Compra a subida com antecedência para garantir hora.",
        link: "https://www.google.com/maps/search/?api=1&query=Tour+Eiffel+Paris",
        tip: "Para a foto perfeita, atravessa a Pont d'Iéna até aos Jardins do Trocadéro. É o enquadramento mais icónico da 'dama de ferro'.",
        img: "https://commons.wikimedia.org/wiki/Special:FilePath/Paris_-_Eiffelturm_und_Marsfeld2.jpg?width=1200",
        imgAlt: "Torre Eiffel vista do Champ de Mars",
        icon: Landmark,
        bookingUrl: "https://www.getyourguide.com/paris-l16/eiffel-tower-tc379/",
        walkTo: "~25 min a pé, ou 2 paragens de metro até Charles de Gaulle-Étoile",
      },
      {
        time: "11:00",
        title: "Arco do Triunfo",
        desc: "Erguido para celebrar as vitórias de Napoleão, guarda por baixo o Túmulo do Soldado Desconhecido. Vale subir ao terraço para uma das melhores vistas de Paris, com as doze avenidas a abrir em estrela.",
        link: "https://www.google.com/maps/search/?api=1&query=Arc+de+Triomphe+Paris",
        tip: "Não atravesses a rotunda pela superfície. Há uma passagem subterrânea segura a partir da Champs-Élysées.",
        icon: Crown,
        walkTo: "início da caminhada pela Champs-Élysées",
      },
      {
        time: "12:00",
        title: "Avenue des Champs-Élysées",
        desc: "A avenida mais famosa do mundo, dois quilómetros de montras, esplanadas e vida parisiense. Ideal para almoçar numa esplanada e descer com calma em direção aos Palais.",
        link: "https://www.google.com/maps/search/?api=1&query=Avenue+des+Champs-Elysees+Paris",
        tip: "As esplanadas da avenida são caras. Para comer bem e pagar menos, entra numa rua lateral.",
        icon: Utensils,
        walkTo: "~10 min a pé até ao Grand Palais",
      },
      {
        time: "14:00",
        title: "Grand Palais e Petit Palais",
        desc: "Duas obras-primas construídas para a Exposição Universal de 1900. O Grand Palais impressiona pela enorme cúpula de vidro e aço. Mesmo em frente, o Petit Palais é hoje o Museu das Belas Artes da cidade, com entrada gratuita na coleção permanente.",
        link: "https://www.google.com/maps/search/?api=1&query=Grand+Palais+Paris",
        tip: "Se o dia estiver a ficar cheio, esta é a primeira paragem a cortar. Fica boa para a tarde de Versalhes.",
        icon: Palette,
        optional: true,
        walkTo: "~5 min a pé até à ponte",
      },
      {
        time: "15:00",
        title: "Ponte Alexandre III",
        desc: "A ponte mais bonita de Paris, com os cavalos alados dourados e candeeiros art nouveau. Une os Invalides à zona dos Palais e oferece vistas soberbas sobre o Sena.",
        link: "https://www.google.com/maps/search/?api=1&query=Pont+Alexandre+III+Paris",
        tip: "É um dos melhores sítios da cidade para fotografar ao pôr do sol.",
        img: "https://commons.wikimedia.org/wiki/Special:FilePath/Paris_Pont_Alexandre_III.jpg?width=1200",
        imgAlt: "Ponte Alexandre III ao anoitecer",
        icon: Sparkles,
        walkTo: "~8 min a pé",
      },
      {
        time: "15:45",
        title: "Les Invalides",
        desc: "Sob a cúpula dourada repousa o túmulo de Napoleão Bonaparte. O conjunto, mandado erguer por Luís XIV para cuidar dos soldados feridos, reúne museus militares e a grande esplanada ajardinada à frente do Sena.",
        link: "https://www.google.com/maps/search/?api=1&query=Les+Invalides+Paris",
        tip: "Mesmo sem entrar nos museus, a esplanada vale a passagem pela monumentalidade.",
        icon: Church,
        walkTo: "~12 min a pé até ao Museu d'Orsay",
      },
      {
        time: "16:45",
        title: "Musée d'Orsay",
        desc: "Numa antiga estação de comboios da Belle Époque vive a maior coleção de Impressionismo e Pós-Impressionismo do mundo. Monet, Renoir, Degas, Cézanne, Gauguin, Van Gogh e Toulouse-Lautrec, tudo num espaço muito mais navegável do que o Louvre.",
        link: "https://www.google.com/maps/search/?api=1&query=Musee+d%27Orsay+Paris",
        tip: "À quinta-feira fica aberto até tarde (cerca das 21h45), óptimo para uma visita sem multidões. Sobe ao relógio gigante do quinto piso para a foto com a cidade ao fundo.",
        img: "https://commons.wikimedia.org/wiki/Special:FilePath/Interieur_du_musee_d'Orsay.jpg?width=1200",
        imgAlt: "Interior do Musée d'Orsay com o relógio e a escultura",
        icon: Palette,
        bookingUrl: "https://www.getyourguide.com/paris-l16/musee-d-orsay-tc463/",
      },
    ],
  },
  {
    key: "d2",
    label: "Dia 2",
    date: "Arte e Rive Gauche",
    title: "Do Louvre à Île de la Cité",
    vibe: "Do Louvre à Île de la Cité e ao Quartier Latin.",
    icon: BookOpen,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Louvre_Museum_Wikimedia_Commons.jpg?width=1200",
    walkTotal: "A pé hoje: ~5,5 km",
    dayNote: {
      tone: "amber",
      text: "Este é o dia mais preenchido. Se sentires que é demasiado, corta Saint-Sulpice e o Pont des Arts (ficam guardados para a tarde de Versalhes).",
    },
    stops: [
      {
        time: "09:00",
        title: "Place de la Concorde",
        desc: "A maior praça de Paris, palco sangrento da Revolução Francesa, onde caíram Luís XVI e Maria Antonieta. Ao centro ergue-se o Obelisco de Luxor, com mais de 3000 anos, ladeado por duas fontes monumentais.",
        link: "https://www.google.com/maps/search/?api=1&query=Place+de+la+Concorde+Paris",
        tip: "Espreita a norte a Église de la Madeleine, é só um pulinho.",
        icon: Landmark,
        walkTo: "entra logo ali no Jardim das Tulherias",
      },
      {
        time: "09:30",
        title: "Jardim das Tulherias e Musée de l'Orangerie",
        desc: "O jardim mais elegante da cidade, pontuado por esculturas de Rodin e Giacometti, lagos e esplanadas. Num dos extremos, o Musée de l'Orangerie guarda as Nenúfares de Monet em salas ovais feitas à medida.",
        link: "https://www.google.com/maps/search/?api=1&query=Jardin+des+Tuileries+Paris",
        tip: "Se gostas de Impressionismo, a Orangerie é rápida de visitar e vale muito a pena.",
        icon: Palette,
        walkTo: "~10 min a pé pelo jardim até à pirâmide",
      },
      {
        time: "10:45",
        title: "Museu do Louvre",
        desc: "O maior museu de arte do mundo, num palácio real com 800 anos de história. Da Mona Lisa à Vénus de Milo, da Vitória de Samotrácia à Liberdade Guiando o Povo, é impossível ver tudo, por isso escolhe duas ou três alas.",
        link: "https://www.google.com/maps/search/?api=1&query=Musee+du+Louvre+Paris",
        tip: "Compra bilhete com hora marcada e entra pela porta do Carrousel (subterrânea) ou Porte des Lions para fugires à fila da pirâmide.",
        img: "https://commons.wikimedia.org/wiki/Special:FilePath/Louvre_Museum_Wikimedia_Commons.jpg?width=1200",
        imgAlt: "Pirâmide do Louvre ao anoitecer",
        icon: Palette,
        bookingUrl: "https://www.getyourguide.com/paris-l16/louvre-tc379/",
        walkTo: "~8 min a pé até ao Sena",
      },
      {
        time: "13:30",
        title: "Pont des Arts",
        desc: "A primeira ponte de ferro de Paris, pedonal e favorita de artistas e casais. A vista sobre a Île de la Cité continua imbatível. É uma paragem rápida a caminho da ilha.",
        link: "https://www.google.com/maps/search/?api=1&query=Pont+des+Arts+Paris",
        tip: "Fácil de cortar num dia apertado. Guarda-a para a tarde de Versalhes se preferires.",
        icon: Sparkles,
        optional: true,
        walkTo: "almoço rápido a caminho da Île de la Cité (~10 min a pé)",
      },
      {
        time: "14:30",
        title: "Île de la Cité: Pont Neuf, Sainte-Chapelle e Notre-Dame",
        desc: "O berço de Paris. Atravessa a Pont Neuf, a ponte de pedra mais antiga da cidade, entra na Sainte-Chapelle para ver os vitrais gigantes do século XIII a arder de cor, e segue para a Notre-Dame, reaberta em dezembro de 2024 depois do incêndio de 2019.",
        link: "https://www.google.com/maps/search/?api=1&query=Cathedrale+Notre-Dame+de+Paris",
        tip: "Notre-Dame com entrada gratuita mas com reserva de horário no site oficial. A Sainte-Chapelle brilha mais em dia de sol.",
        img: "https://commons.wikimedia.org/wiki/Special:FilePath/Notre-Dame_de_Paris,_4_October_2017.jpg?width=1200",
        imgAlt: "Fachada ocidental da Notre-Dame de Paris",
        img2: "https://commons.wikimedia.org/wiki/Special:FilePath/Sainte_Chapelle_Interior_Stained_Glass.jpg?width=1200",
        img2Alt: "Vitrais da Sainte-Chapelle em Paris",
        icon: Church,
        walkTo: "~12 min a pé para o Quartier Latin",
      },
      {
        time: "16:30",
        title: "Quartier Latin e Jardins de Luxemburgo",
        desc: "O bairro dos estudantes, cheio de cafés, livrarias e bistrôs, com o Panteão e a Sorbonne. Termina nos Jardins de Luxemburgo, inspirados nos Boboli de Florença, com cadeiras verdes à volta do lago, estátuas e o palácio que hoje acolhe o Senado.",
        link: "https://www.google.com/maps/search/?api=1&query=Jardin+du+Luxembourg+Paris",
        tip: "A Rue Mouffetard ganha vida a partir do meio-dia. De manhã cedo está tudo ainda a preparar-se.",
        icon: BookOpen,
        walkTo: "~10 min a pé (se ainda tiveres pernas para Saint-Germain)",
      },
      {
        time: "18:00",
        title: "Saint-Sulpice e Saint-Germain-des-Prés",
        desc: "A igreja de Saint-Sulpice guarda o gnómon astronómico que ficou famoso com 'O Código Da Vinci'. A poucos passos, o bairro boémio de Saint-Germain-des-Prés viveu os anos de Hemingway e Sartre, entre cafés lendários como os Deux Magots e o Café de Flore.",
        link: "https://www.google.com/maps/search/?api=1&query=Saint-Germain-des-Pres+Paris",
        tip: "Paragem fácil de adiar. Fica perfeita para a tarde de Versalhes, que também é na Rive Gauche.",
        icon: Wine,
        optional: true,
      },
    ],
  },
  {
    key: "d3",
    label: "Dia 3",
    date: "Boémia e trendy",
    title: "Montmartre, Pigalle e Le Marais",
    vibe: "A Paris boémia e a Paris trendy.",
    icon: Moon,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sacre-coeur-paris.jpg?width=1200",
    walkTotal: "A pé hoje: ~6 km (com um trajeto de metro entre Pigalle e o Marais)",
    stops: [
      {
        time: "09:00",
        title: "Montmartre e Place du Tertre",
        desc: "A colina mais alta de Paris, com ruas em declive, vinha, moinhos e o espírito artístico que seduziu Picasso e Modigliani. Na Place du Tertre, os pintores fazem retratos em minutos.",
        link: "https://www.google.com/maps/search/?api=1&query=Place+du+Tertre+Paris",
        tip: "Chega cedo. A partir do meio da manhã enche-se de gente e perde o encanto.",
        icon: Palette,
        walkTo: "~5 min a pé",
      },
      {
        time: "10:30",
        title: "Basílica do Sacré-Coeur",
        desc: "De um branco quase ofuscante, a basílica romano-bizantina é o segundo ponto mais alto da cidade e oferece uma das melhores vistas de Paris a partir da escadaria. Podes subir a pé ou apanhar o funicular.",
        link: "https://www.google.com/maps/search/?api=1&query=Basilique+du+Sacre-Coeur+Paris",
        tip: "A subida à cúpula dá vistas ainda melhores e costuma ter pouca fila.",
        img: "https://commons.wikimedia.org/wiki/Special:FilePath/Sacre-coeur-paris.jpg?width=1200",
        imgAlt: "Basílica do Sacré-Coeur em Montmartre",
        icon: Church,
        walkTo: "~12 min a pé em descida até Pigalle",
      },
      {
        time: "11:45",
        title: "Pigalle e Moulin Rouge",
        desc: "O antigo bairro boémio e irreverente da Belle Époque, onde nasceu o can-can. Vale a passagem para a foto ao pé do icónico Moulin Rouge, o cabaré mais conhecido do mundo.",
        link: "https://www.google.com/maps/search/?api=1&query=Moulin+Rouge+Paris",
        tip: "De dia é uma simples paragem para foto. O espetáculo em si é à noite e exige reserva.",
        icon: Sparkles,
        walkTo: "metro (~20 min) até Rambuteau, no Marais; almoço a caminho",
      },
      {
        time: "14:00",
        title: "Centro Georges Pompidou",
        desc: "O edifício de tubos coloridos, escadas e elevadores à vista de Renzo Piano e Richard Rogers é um marco do século XX. Lá dentro está um dos maiores museus de arte moderna do mundo. Mesmo por fora, a arquitetura já vale a visita.",
        link: "https://www.google.com/maps/search/?api=1&query=Centre+Pompidou+Paris",
        tip: "Verifica antes de ires: o Pompidou tem obras de renovação previstas, por isso confirma o que está aberto no site oficial.",
        icon: Palette,
        walkTo: "~8 min a pé",
      },
      {
        time: "15:30",
        title: "Le Marais (Place des Vosges e Marché des Enfants Rouges)",
        desc: "O bairro mais charmoso e trendy de Paris, com mansões aristocráticas, galerias, boutiques e street art. Passa pela Place des Vosges, a praça mais antiga da cidade, e pelo Marché des Enfants Rouges, o mercado coberto mais antigo, óptimo para petiscar.",
        link: "https://www.google.com/maps/search/?api=1&query=Place+des+Vosges+Paris",
        tip: "É o sítio ideal para terminar o dia com um jantar bem regado a vinho francês, ou com o famoso falafel da Rue des Rosiers.",
        img: "https://commons.wikimedia.org/wiki/Special:FilePath/Place_des_Vosges_Paris.jpg?width=1200",
        imgAlt: "Place des Vosges, a praça mais antiga de Paris",
        icon: Utensils,
      },
    ],
  },
  {
    key: "d4",
    label: "Dia 4",
    date: "Extra · Versalhes",
    title: "Versalhes de manhã, joias à tarde",
    vibe: "Um dia de realeza e um regresso tranquilo à cidade.",
    icon: Castle,
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Versailles_Palace.jpg?width=1200",
    walkTotal: "A pé hoje: 5–8 km em Versalhes + 2–3 km à tarde em Paris",
    howToGet: "RER C até Versailles Château Rive Gauche (~10 min do palácio). Precisas de bilhete origem-destino ou Navigo que cubra zonas 1 a 4.",
    dayNote: {
      tone: "amber",
      text: "Melhor dia: quarta ou quinta. Evita terça (muitos museus de Paris fecham e a multidão desvia-se para cá). Palácio fechado à segunda; jardins e parque costumam estar abertos.",
    },
    stops: [
      {
        time: "09:00",
        title: "Palácio de Versalhes (Grandes Aposentos e Galeria dos Espelhos)",
        desc: "Residência dos reis de França de 1682 até à Revolução, Património Mundial da UNESCO e um dos palácios mais imponentes do planeta. Segue direto aos Grandes Aposentos e à deslumbrante Galeria dos Espelhos, com os seus 357 espelhos e vistas para os jardins.",
        link: "https://www.google.com/maps/search/?api=1&query=Chateau+de+Versailles",
        tip: "Compra bilhete com hora marcada e chega logo à abertura (à porta pelas 08:30 para o controlo de segurança). A partir das 09:30 a fila dispara.",
        img: "https://commons.wikimedia.org/wiki/Special:FilePath/Chateau_Versailles_Galerie_des_Glaces.jpg?width=1200",
        imgAlt: "Galeria dos Espelhos no Palácio de Versalhes",
        icon: Castle,
        bookingUrl: "https://www.getyourguide.com/versailles-l732/",
      },
      {
        time: "10:45",
        title: "Jardins de Versalhes",
        desc: "Mais de 800 hectares desenhados por André Le Nôtre, com avenidas simétricas, fontes, estátuas e o Grande Canal. De abril a outubro há, em dias marcados, os espetáculos das Fontes Musicais (Grandes Eaux Musicales), com música barroca e água a dançar.",
        link: "https://www.google.com/maps/search/?api=1&query=Jardins+du+Chateau+de+Versailles",
        tip: "Nos dias de Fontes Musicais os jardins são pagos e enchem mais. Consulta o calendário oficial. Se preferires, salta a propriedade de Trianon para ter tarde livre em Paris.",
        img: "https://commons.wikimedia.org/wiki/Special:FilePath/Versailles_Garden.jpg?width=1200",
        imgAlt: "Jardins formais do Palácio de Versalhes",
        icon: Sparkles,
        walkTo: "RER C de regresso a Paris, saída em Saint-Michel Notre-Dame (~40 min)",
      },
      {
        time: "15:00",
        title: "Shakespeare and Company",
        desc: "A livraria de língua inglesa mais famosa de Paris, mesmo em frente à Notre-Dame. Refúgio de escritores como Hemingway e Fitzgerald, tem um cantinho de leitura no primeiro andar e um café ao lado.",
        link: "https://www.google.com/maps/search/?api=1&query=Shakespeare+and+Company+Paris",
        tip: "É pequena e enche depressa. Entra cedo na tarde e evita as horas de ponta.",
        icon: BookOpen,
        walkTo: "~12 min a pé para sul",
      },
      {
        time: "15:45",
        title: "Arènes de Lutèce (joia escondida)",
        desc: "Um anfiteatro romano do século I escondido no meio do 5.º bairro, um dos vestígios mais antigos de Paris. Entrada gratuita, quase sempre calmo, com miúdos a jogar à bola onde antes havia gladiadores.",
        link: "https://www.google.com/maps/search/?api=1&query=Arenes+de+Lutece+Paris",
        tip: "Poucos turistas sabem que existe. Entra pela discreta Rue de Navarre.",
        icon: Landmark,
        walkTo: "~8 min a pé",
      },
      {
        time: "16:30",
        title: "Grande Mosquée de Paris (salão de chá) — joia escondida",
        desc: "Uma mesquita dos anos 1920 em estilo hispano-mourisco, com pátios de azulejo, fontes e um salão de chá aberto a todos. Fecha o dia com um chá de menta doce e pastelaria árabe num dos recantos mais serenos da cidade.",
        link: "https://www.google.com/maps/search/?api=1&query=Grande+Mosquee+de+Paris",
        tip: "O salão de chá e o pátio não precisam de bilhete. É uma pausa perfeita depois de um dia longo.",
        icon: Wine,
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
          src={HERO_IMG}
          alt="Torre Eiffel vista do Trocadéro à luz dourada"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ animation: "paris-kenburns 22s linear infinite alternate" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.10 0.03 260/0.5), transparent 30%, oklch(0.12 0.03 260/0.55) 70%, oklch(0.14 0.035 260) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 32%, oklch(0.14 0.035 260 / .72) 100%)",
          }}
        />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 w-full">
        <div className="pointer-events-none absolute right-8 top-24 hidden md:right-32 md:top-28 md:block">
          <PostmarkCircle city="PARIS" year="2025" rotate={-9} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto w-full max-w-6xl px-6 pb-16 pt-36 text-center md:pt-40"
        >
          <div className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold/70" />
            Guia · 3 dias + Versalhes
            <span className="h-px w-8 bg-gold/70" />
          </div>
          <h1
            className="mx-auto font-serif font-semibold"
            style={{
              margin: 0,
              lineHeight: 1.02,
              fontSize: "clamp(3.4rem, 8vw, 6.5rem)",
              backgroundImage:
                "linear-gradient(120deg, oklch(0.96 0.02 85), oklch(0.80 0.13 82) 45%, oklch(0.34 0.030 250))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextStroke: "1px rgba(0,0,0,0.35)",
            }}
          >
            Paris
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-serif text-lg italic text-cream/85 md:text-xl">
            A Cidade Luz em três dias, mais uma tarde de realeza em Versalhes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#dias"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] uppercase tracking-[0.22em] text-twilight shadow-[0_18px_40px_-18px_rgba(200,160,60,.7)] transition-transform active:scale-95"
              style={{ background: "oklch(0.80 0.13 82)" }}
            >
              Ver o itinerário <span aria-hidden>↓</span>
            </a>
            <span className="font-hand text-lg text-cream/80">
              toca em cada paragem para ver os detalhes
            </span>
          </div>
          <div className="mt-6">
            <CustomItineraryHeroLink city="Paris" />
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
      title="O que visitar em Paris: quatro dias, quatro humores"
      intro="Três dias de cidade e um dia extra em Versalhes. Cada um tem o seu cenário e a sua cadência."
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
      id="paris-roteiro-grid"
      className="m-0 grid list-none gap-5 p-0"
      style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
    >
      {days.map((d) => {
        const isFlipped = !!flipped[d.key];
        return (
          <li key={d.key} className="paris-flip-cell" style={{ perspective: 1500 }}>
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
              <article
                className="absolute inset-0 overflow-hidden rounded-2xl border shadow-[0_12px_40px_-22px_rgba(0,0,0,.85)]"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  borderColor: "oklch(0.80 0.13 82 / .15)",
                }}
              >
                <SmartImage src={d.cover} alt={d.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,.86), rgba(0,0,0,.2) 48%, transparent)" }} />
                <span
                  className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9.5px] uppercase tracking-[0.18em] backdrop-blur"
                  style={{
                    borderColor: "oklch(0.80 0.13 82 / .35)",
                    background: "oklch(0.14 0.035 260 / .5)",
                    color: "oklch(0.80 0.13 82)",
                  }}
                >
                  vira →
                </span>
                <div className="absolute inset-x-3.5 bottom-3.5">
                  <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "oklch(0.80 0.13 82 / .9)" }}>
                    {d.label} · {d.date}
                  </div>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-cream" style={{ lineHeight: 1.05 }}>
                    {d.title}
                  </h3>
                </div>
              </article>
              <article
                className="absolute inset-0 overflow-hidden rounded-2xl border shadow-[0_12px_40px_-22px_rgba(0,0,0,.85)]"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  borderColor: "oklch(0.80 0.13 82 / .25)",
                  background:
                    "oklch(0.20 0.045 258) repeating-linear-gradient(135deg, oklch(0.80 0.13 82 / .045) 0 2px, transparent 2px 13px)",
                }}
              >
                <div
                  className="absolute inset-2.5 flex flex-col rounded-xl border border-dashed p-3.5"
                  style={{ borderColor: "oklch(0.80 0.13 82 / .35)" }}
                >
                  <div className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "oklch(0.80 0.13 82)" }}>
                    {d.label} · resumo
                  </div>
                  <h3 className="mt-1.5 font-serif text-xl font-semibold text-cream" style={{ lineHeight: 1.05 }}>
                    {d.title}
                  </h3>
                  <p className="mt-2 font-serif text-[0.92rem] italic text-cream/80" style={{ lineHeight: 1.4 }}>
                    {d.vibe}
                  </p>
                  <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-1.5 text-[11.5px]">
                    <dt className="uppercase tracking-[0.12em]" style={{ color: "oklch(0.80 0.13 82 / .8)" }}>Paragens</dt>
                    <dd className="m-0 text-cream/90">{d.stops.length}</dd>
                    {d.walkTotal && (<>
                      <dt className="uppercase tracking-[0.12em]" style={{ color: "oklch(0.80 0.13 82 / .8)" }}>A pé</dt>
                      <dd className="m-0 text-cream/90">{d.walkTotal.replace(/^A pé hoje:\s*/, "")}</dd>
                    </>)}
                    {d.howToGet && (<>
                      <dt className="uppercase tracking-[0.12em]" style={{ color: "oklch(0.80 0.13 82 / .8)" }}>Ir</dt>
                      <dd className="m-0 text-cream/90">{d.howToGet}</dd>
                    </>)}
                  </dl>
                  <a
                    href={`#${d.key}`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.18em] hover:bg-[oklch(0.80_0.13_82_/_.1)]"
                    style={{ borderColor: "oklch(0.80 0.13 82 / .45)", color: "oklch(0.80 0.13 82)" }}
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
  const hasExtra = !!(stop.tip || stop.img);

  return (
    <motion.div
      initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="relative pl-16 md:pl-20"
    >
      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-twilight shadow-[0_0_0_4px_oklch(0.14_0.035_260),0_0_30px_oklch(0.80_0.13_82/0.25)] md:left-5">
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
            {stop.optional && (
              <span className="rounded-full border border-gold/30 px-2 py-0.5 text-[9.5px] uppercase tracking-[0.2em] text-gold/80">
                opcional
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            {stop.desc}
          </p>
        </button>

        {stop.bookingUrl && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <AffiliateLink href={stop.bookingUrl} />
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
          {(stop.img || stop.img2) && (
            <div className="grid gap-3 md:w-64">
              {stop.img && (
                <SmartImage
                  src={stop.img}
                  alt={stop.imgAlt ?? stop.title}
                  className="h-40 w-full rounded-xl object-cover shadow-lg"
                  loading="lazy"
                />
              )}
              {stop.img2 && (
                <SmartImage
                  src={stop.img2}
                  alt={stop.img2Alt ?? `${stop.title} — 2`}
                  className="h-40 w-full rounded-xl object-cover shadow-lg"
                  loading="lazy"
                />
              )}
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
        <p className="max-w-md text-sm italic text-muted-foreground md:text-right">
          {day.vibe}
        </p>
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
              <Train className="h-3.5 w-3.5 text-gold" />
              {day.howToGet}
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
          <p className="text-sm leading-relaxed text-cream md:text-base">
            {day.highlightTip}
          </p>
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
    </div>
  );
}

function Itineraries() {
  return (
    <Section
      id="dias"
      eyebrow="Itinerário detalhado"
      title="Dia a dia, paragem a paragem"
      intro="Toca para abrir cada paragem, com dicas e imagens. Horários sugeridos, adapta ao teu ritmo."
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
  const restaurants = [
    {
      name: "Bistrô de bairro",
      desc: "Esplanada de madeira, menu escrito a giz e uma crème brûlée à moda da casa. O bistrô de bairro é a Paris mais autêntica.",
      link: "https://www.google.com/maps/search/?api=1&query=bistrot+de+quartier+Paris",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Cr%C3%A8me_br%C3%BBl%C3%A9e.jpg?width=1200",
      imgAlt: "Crème brûlée num bistrô parisiense",
    },
    {
      name: "Boulangerie ao balcão",
      desc: "Croissant ainda quente, comido de pé ao balcão, com um café expresso. O ritual matinal de Paris.",
      link: "https://www.google.com/maps/search/?api=1&query=boulangerie+Paris",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Croissant,_cross_section.jpg?width=1200",
      imgAlt: "Croissant em corte transversal",
    },
    {
      name: "Mercado / Rue Montorgueil",
      desc: "Rua de mercado no 2.º, floristas, peixeiras, queijarias e esplanadas. Perfeita para almoçar ou petiscar entre paragens.",
      link: "https://www.google.com/maps/search/?api=1&query=Rue+Montorgueil+Paris",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Rue_Montorgueil.jpg?width=1200",
      imgAlt: "Rua Montorgueil em Paris",
    },
    {
      name: "Crêperie (Montparnasse)",
      desc: "Uma crêpe suzette flamejada ou uma galette salada de trigo sarraceno. Montparnasse guarda algumas das mais tradicionais.",
      link: "https://www.google.com/maps/search/?api=1&query=creperie+Montparnasse+Paris",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Crepe_suzette.jpg?width=1200",
      imgAlt: "Crêpe suzette flamejada",
    },
  ];

  const dishes = [
    {
      name: "Croissant & pain au chocolat",
      desc: "De uma boulangerie de bairro, ao balcão, ainda quente.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Croissant,_cross_section.jpg?width=1200",
      imgAlt: "Croissant acabado de fazer",
    },
    {
      name: "Jambon-beurre",
      desc: "O almoço rápido dos parisienses: presunto, manteiga e baguete crocante.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Jambon-beurre.jpg?width=1200",
      imgAlt: "Sanduíche jambon-beurre",
    },
    {
      name: "Steak-frites / entrecôte",
      desc: "O clássico do bistrô: bife, batatas caseiras e um copo de tinto.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Steak_frites.jpg?width=1200",
      imgAlt: "Steak-frites num prato",
    },
    {
      name: "Crêpe & galette",
      desc: "Doce com manteiga e açúcar, ou salada com ovo, queijo e presunto.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Crepe_suzette.jpg?width=1200",
      imgAlt: "Crêpe suzette",
    },
    {
      name: "Macarons & pâtisserie",
      desc: "Uma caixa de macarons ou um éclair de uma pâtisserie de bairro.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Macaron_2.jpg?width=1200",
      imgAlt: "Macarons coloridos",
    },
    {
      name: "Vinho & queijo",
      desc: "Termina o dia com uma tábua de queijos e um copo de Bordeaux ou Loire.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Cheese_platter.jpg?width=1200",
      imgAlt: "Tábua de queijos franceses",
    },
  ];

  return (
    <Section
      id="comer"
      eyebrow="À mesa"
      title="Comer e beber em Paris"
      intro="Bistrôs de bairro, boulangeries de esquina, mercados e crêperias. O que não pode falta na Cidade Luz."
    >
      <h3 className="mb-6 font-serif text-2xl text-cream">Sítios testados</h3>
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
            className="group flex flex-col overflow-hidden rounded-2xl border border-gold/15 bg-card transition-all hover:border-gold/40 hover:shadow-[0_20px_50px_-20px_oklch(0.80_0.13_82/0.35)]"
          >
            <div className="relative h-44 overflow-hidden">
              <SmartImage
                src={r.img}
                alt={r.imgAlt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
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
            <div className="relative h-40 overflow-hidden">
              <SmartImage
                src={d.img}
                alt={d.imgAlt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
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
    </Section>
  );
}

// ----------------------- HIDDEN GEMS -----------------------

const gems = [
  {
    name: "Galerie Vivienne (2.º)",
    desc: "Uma das mais bonitas passagens cobertas do século XIX, com chão de mosaico, livrarias e cafés. Boa para o Dia 2, perto do Louvre.",
  },
  {
    name: "Rue Crémieux (12.º)",
    desc: "Rua empedrada de casas em tons pastel, das mais fotogénicas da cidade. Vive gente ali, por isso passa em silêncio.",
  },
  {
    name: "Coulée verte René-Dumont (12.º)",
    desc: "Jardim suspenso sobre um antigo viaduto ferroviário que inspirou a High Line de Nova Iorque.",
  },
  {
    name: "Butte-aux-Cailles (13.º)",
    desc: "Bairro de ruas baixas com ar de aldeia, street art e bistrôs, longe das multidões.",
  },
  {
    name: "Musée de la Vie Romantique (9.º)",
    desc: "Casa-museu com um jardim e um café escondidos, aos pés de Montmartre. Coleção com entrada gratuita.",
  },
  {
    name: "Square du Vert-Galant (1.º)",
    desc: "A ponta ajardinada da Île de la Cité, ao nível do rio, perfeita ao pôr do sol.",
  },
];

function HiddenGems() {
  return (
    <Section
      id="joias"
      eyebrow="Fora do circuito"
      title="Joias escondidas"
      intro="Umas paragens fora do óbvio, para semear pelos dias ou juntar à tarde de Versalhes."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {gems.map((g, i) => (
          <motion.div
            key={g.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="rounded-2xl border border-gold/15 bg-card p-6 transition-all hover:border-gold/40"
          >
            <div className="flex items-center gap-2 text-gold">
              <Sparkles className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-[0.25em]">Joia escondida</span>
            </div>
            <h4 className="mt-2 font-serif text-xl text-cream">{g.name}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{g.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ----------------------- ALT PLAN B (rain) -----------------------

function RainyPlan() {
  return (
    <Section
      id="alternativa"
      eyebrow="Plano B"
      title="Paris à prova de chuva"
      intro="Se apanhares um dia de chuva (muito frequente) ou quiseres trocar Versalhes por mais cidade."
    >
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="flex flex-col gap-4">
          <AccordionItem
            value="rain"
            className="glass rounded-2xl border border-gold/15 px-5 sm:px-6 overflow-hidden"
          >
            <AccordionTrigger className="py-5 font-serif text-lg sm:text-xl text-cream hover:no-underline gap-3">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30 text-gold">
                  <Umbrella className="h-4 w-4" />
                </span>
                Paragens ao abrigo do tempo
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-cream/90 space-y-3">
              <ul className="space-y-3">
                <li>
                  <span className="text-gold">Louvre, Musée d'Orsay e Orangerie:</span>{" "}
                  dias inteiros de arte ao abrigo do tempo.
                </li>
                <li>
                  <span className="text-gold">Passagens cobertas do século XIX</span>{" "}
                  (Galerie Vivienne, Passage des Panoramas): galerias com tetos de vidro,
                  cafés e livrarias.
                </li>
                <li>
                  <span className="text-gold">Terraço das Galeries Lafayette:</span>{" "}
                  vista sobre os telhados de Paris, com entrada gratuita.
                </li>
                <li>
                  <span className="text-gold">Catacumbas de Paris:</span> os túneis com
                  ossários, uma visita diferente (reserva obrigatória).
                </li>
                <li>
                  <span className="text-gold">Cruzeiro coberto no Sena:</span> ver a cidade
                  do rio, quentinho, mesmo com chuva.
                </li>
              </ul>
              <p className="font-serif italic text-gold/90 pt-2">
                Com crianças, a Disneyland Paris é a alternativa natural a Versalhes
                (RER A até Marne-la-Vallée Chessy, cerca de 40 min).
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Section>
  );
}

// ----------------------- TIPS -----------------------

function Tips() {
  const doIt = [
    "Diz sempre 'Bonjour' ao entrar em lojas e cafés, e 'merci, au revoir' ao sair.",
    "Pede 'une carafe d'eau' nos restaurantes — vem gratuita à mesa.",
    "Compra bilhetes online com hora marcada para Eiffel, Louvre, Orsay e Versalhes.",
    "Reserva horário no site oficial para entrar gratuitamente na Notre-Dame.",
    "Usa o Navigo Easy ou bilhetes t+; para Versalhes precisas de bilhete que cubra zonas 1–4.",
  ];
  const dont = [
    "Não uses o bilhete simples do metro para ir a Versalhes: não é válido.",
    "Evita as esplanadas da Champs-Élysées para almoçar — caras e turísticas.",
    "Cuidado com carteiristas nas linhas de metro 1 e 4 e nas escadas rolantes.",
    "Não chegues a Montmartre depois das 10h30 — enche e perde o encanto.",
    "Não confundas Trocadéro com a base da torre: o melhor enquadramento é do Trocadéro.",
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
    "Torre Eiffel (subida ao topo ou 2.º andar)",
    "Museu do Louvre (bilhete sem fila com hora marcada)",
    "Musée d'Orsay",
    "Notre-Dame (reserva de horário gratuita)",
    "Palácio de Versalhes (bilhete com hora marcada)",
    "Cruzeiro de 1h no Sena",
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
        <div className="mt-6 flex flex-wrap gap-3">
          <AffiliateLink
            href="https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fcity%2Ffr%2Fparis.pt-pt.html&sid=paris-cidade"
            label="Ver hotéis em Paris"
          />
          <AffiliateLink
            href="https://www.getyourguide.com/paris-l16/"
            label="Ver experiências em Paris"
          />
        </div>
      </div>
    </Section>
  );
}

// ----------------------- CONHECER PARIS -----------------------

const climaMeses: Array<[string, number, number, string]> = [
  ["Jan", 7, 3, "média"],
  ["Fev", 8, 3, "média"],
  ["Mar", 12, 5, "média"],
  ["Abr", 16, 7, "média"],
  ["Mai", 20, 11, "média"],
  ["Jun", 23, 14, "média"],
  ["Jul", 25, 16, "baixa"],
  ["Ago", 25, 16, "baixa"],
  ["Set", 21, 13, "média"],
  ["Out", 16, 10, "média"],
  ["Nov", 11, 6, "alta"],
  ["Dez", 8, 4, "alta"],
];

const eventos = [
  { nome: "Nuit des Musées", quando: "meados de maio", desc: "Museus abertos à noite, muitos gratuitos." },
  { nome: "Fête de la Musique", quando: "21 de junho", desc: "Concertos gratuitos pela cidade toda." },
  { nome: "14 de julho", quando: "14 jul", desc: "Desfile na Champs-Élysées e fogo de artifício na Eiffel." },
  { nome: "Paris Plages", quando: "jul–ago", desc: "As margens do Sena viram praia urbana." },
  { nome: "Nuit Blanche", quando: "início de outubro", desc: "Arte contemporânea pela cidade fora, noite adentro." },
  { nome: "Mercados de Natal", quando: "fim de novembro a início de janeiro", desc: "Champs-Élysées, Tuileries e Notre-Dame." },
];

function ConhecerParis() {
  const itemCls =
    "glass rounded-2xl border border-gold/15 px-5 sm:px-6 overflow-hidden";
  const triggerCls =
    "py-5 font-serif text-lg sm:text-xl text-cream hover:no-underline gap-3";
  const iconCls =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30 text-gold";

  return (
    <Section
      id="conhecer"
      eyebrow="Contexto"
      title="Conhecer Paris"
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
                <span className={iconCls}><Info className="h-4 w-4" /></span>
                Paris em 2 minutos
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-cream/90 space-y-3">
              <p>Capital de França e uma das cidades mais visitadas do mundo, com cerca de 2,1 milhões de habitantes na cidade e mais de 12 milhões na área metropolitana.</p>
              <p>Atravessada pelo Sena e organizada em 20 <em>arrondissements</em> em espiral a partir do centro (Louvre e Île de la Cité).</p>
              <p>Cidade Luz de arte, moda, gastronomia e literatura, palco da Revolução Francesa e da Belle Époque.</p>
              <p>A Notre-Dame reabriu em dezembro de 2024, seis anos depois do incêndio.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quando" className={itemCls}>
            <AccordionTrigger className={triggerCls}>
              <span className="flex items-center gap-3">
                <span className={iconCls}><Calendar className="h-4 w-4" /></span>
                Quando ir
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-cream/90 space-y-3">
              <p><span className="text-gold">Abril–Junho e Setembro–Outubro:</span> o equilíbrio ideal — clima ameno, jardins bonitos e menos multidões.</p>
              <p><span className="text-gold">Verão (jul–ago):</span> dias longos, muitos parisienses de férias, cidade mais calma mas quente e cheia de turistas.</p>
              <p><span className="text-gold">Inverno (dez–fev):</span> frio e cinzento, mas mercados de Natal e museus praticamente sem fila.</p>
              <p className="font-serif italic text-gold/90 pt-2">Melhor: maio/junho ou setembro/outubro.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clima" className={itemCls}>
            <AccordionTrigger className={triggerCls}>
              <span className="flex items-center gap-3">
                <span className={iconCls}><CloudSun className="h-4 w-4" /></span>
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
              <p className="mt-3 font-serif italic text-gold/90 text-sm">Médias aproximadas; conta sempre com um guarda-chuva à mão.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="eventos" className={itemCls}>
            <AccordionTrigger className={triggerCls}>
              <span className="flex items-center gap-3">
                <span className={iconCls}><PartyPopper className="h-4 w-4" /></span>
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
              <p className="mt-5 font-serif italic text-gold/90 text-sm">Confirma as datas exatas de cada edição no site oficial.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </Section>
  );
}

// ----------------------- ESSENTIAL INFO -----------------------

const essentials = [
  { icon: Clock, title: "Fuso horário", body: "CET (UTC+1). Paris está 1 hora à frente de Lisboa." },
  { icon: Coins, title: "Moeda", body: "Euro (EUR), sem câmbio para portugueses. Cartão aceite quase em todo o lado." },
  { icon: Plug, title: "Tomadas", body: "Tipo C e E, 230 V / 50 Hz. As fichas portuguesas encaixam sem adaptador." },
  { icon: Phone, title: "Emergência", body: "112 (geral europeu). Levar Cartão Europeu de Seguro de Doença." },
  { icon: Train, title: "Transportes", body: "Navigo Easy ou bilhetes t+ para metro/RER/bus. Do aeroporto CDG: RER B (~35 min) ou Roissybus." },
  { icon: HandCoins, title: "Gorjetas", body: "Serviço já incluído por lei; arredondar ou deixar 5–10 % em restaurantes se gostares muito." },
];

const phrases = [
  ["Olá / Bom dia", "Bonjour"],
  ["Obrigado(a)", "Merci"],
  ["Por favor", "S'il vous plaît"],
  ["Sim / Não", "Oui / Non"],
  ["Desculpe", "Pardon / Excusez-moi"],
  ["Quanto custa?", "C'est combien?"],
];

function EssentialInfo() {
  return (
    <Section
      id="essencial"
      eyebrow="Antes de partir"
      title="Essencial para a viagem"
      intro="O básico para chegar leve: fuso, dinheiro, transporte e um punhado de palavras francesas para abrir portas (e sorrisos)."
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
              className="glass rounded-2xl border border-gold/15 p-6 transition-shadow hover:shadow-[0_20px_60px_-30px_oklch(0.80_0.13_82/0.5)]"
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30"
                style={{ boxShadow: "0 0 12px oklch(0.80 0.13 82 / 0.45)" }}
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
            <h4 className="font-serif text-lg text-gold">Le Marais (3.º / 4.º)</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Central, charmoso, cheio de restaurantes e vida de bairro. A pé de tudo.
            </p>
            <a
              href="https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DLe%2BMarais%252C%2BParis%252C%2BFran%25C3%25A7a%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=paris-le-marais"
              target="_blank"
              rel="sponsored noopener"
              className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-gold/85 hover:text-gold"
            >
              Ver alojamentos no Marais
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Saint-Germain / Quartier Latin</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Rive Gauche clássica, cafés históricos, junto a Notre-Dame e ao Luxemburgo.
            </p>
            <a
              href="https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DSaint-Germain-des-Pr%25C3%25A9s%252C%2BParis%252C%2BFran%25C3%25A7a%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=paris-saint-germain"
              target="_blank"
              rel="sponsored noopener"
              className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-gold/85 hover:text-gold"
            >
              Ver alojamentos em Saint-Germain
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Montmartre (18.º)</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Bairro boémio, vistas soberbas, ruelas em declive. Um pouco fora do centro.
            </p>
            <a
              href="https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DMontmartre%252C%2BParis%252C%2BFran%25C3%25A7a%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=paris-montmartre"
              target="_blank"
              rel="sponsored noopener"
              className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-gold/85 hover:text-gold"
            >
              Ver alojamentos em Montmartre
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
          {phrases.map(([pt, fr]) => (
            <li key={pt} className="flex items-baseline justify-between gap-3 border-b border-gold/10 pb-2">
              <span className="text-sm text-muted-foreground">{pt}</span>
              <span className="font-serif text-lg italic text-gold">{fr}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}

// ----------------------- STICKY NAV -----------------------

const navLinks = [
  { id: "d1", label: "Dia 1" },
  { id: "d2", label: "Dia 2" },
  { id: "d3", label: "Dia 3" },
  { id: "d4", label: "Versalhes" },
  { id: "joias", label: "Joias" },
  { id: "comer", label: "Comer" },
  { id: "alternativa", label: "Chuva" },
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
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
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
          <SmartImage src={opostalHorizontalTransparent.url} alt="O Postal" className="h-7 w-auto object-contain md:h-9" />
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
                      layoutId="nav-underline-paris"
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
          aria-controls="mobile-nav-panel-paris"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-gold transition-colors ${
            scrolled ? "border border-gold/30" : "border border-gold/40 bg-black/20 backdrop-blur-sm"
          }`}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav-panel-paris" className="md:hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl">
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
            "linear-gradient(90deg, oklch(0.34 0.030 250), oklch(0.80 0.13 82), oklch(0.94 0.02 85))",
          boxShadow: "0 0 10px oklch(0.80 0.13 82 / .6)",
        }}
      />
    </div>
  );
}

function ParisHeroStyles() {
  return (
    <style>{`
      @keyframes paris-kenburns { from { transform: scale(1.04); } to { transform: scale(1.14); } }
      @media (max-width: 900px) {
        #paris-roteiro-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      }
      @media (max-width: 560px) {
        #paris-roteiro-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}

// ----------------------- FOOTER -----------------------

function Footer() {
  return (
    <footer className="border-t border-gold/15 px-6 py-12 text-center">
      <p className="font-serif text-sm italic text-cream/70">
        À bientôt, Paris. · O Postal · Paris · MMXXV
      </p>
    </footer>
  );
}

// ----------------------- INDEX -----------------------

function Index() {
  return (
    <main id="top" className="theme-paris bg-twilight-radial min-h-screen overflow-x-hidden">
      <ReadingProgressBar />
      <StickyNav />
      <ParisHeroStyles />
      <Hero />
      <ConhecerParis />
      <EssentialInfo />
      <Overview />
      <Itineraries />
      <HiddenGems />
      <Food />
      <RainyPlan />
      <Tips />
      <Checklist />
      <FinalStamp code="PAR" year="MMXXV" />
      <CustomItineraryCTA city="Paris" />
      <Footer />
    </main>
  );
}