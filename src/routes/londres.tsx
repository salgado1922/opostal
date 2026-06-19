import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useId } from "react";
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
  Ticket,
  ExternalLink,
  Footprints,
  Menu,
  Play,
  Info,
  Calendar,
  CloudSun,
  PartyPopper,
  TrainFront,
  Wand2,
  Camera,
  Trees,
  ArrowLeftRight,
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
import londresFallback from "@/assets/city-londres.jpg";
import { AffiliateLink } from "@/components/AffiliateLink";
import {
  CustomItineraryCTA,
  CustomItineraryHeroLink,
} from "@/components/CustomItineraryCTA";

export const Route = createFileRoute("/londres")({
  head: () => ({
    meta: [
      { title: "O que visitar em Londres: roteiro de 3 dias a pé | O Postal" },
      {
        name: "description",
        content:
          "O que visitar em Londres em 3 dias sem pressa, quase tudo a pé, com um dia extra opcional para Madame Tussauds e os Warner Bros. Studios de Harry Potter.",
      },
      { property: "og:title", content: "O que visitar em Londres: roteiro de 3 dias a pé | O Postal" },
      {
        property: "og:description",
        content:
          "O que visitar em Londres em 3 dias sem pressa, quase tudo a pé, com um dia extra opcional para Madame Tussauds e os Warner Bros. Studios de Harry Potter.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://opostal.pt/londres" },
      { property: "og:image", content: `https://opostal.pt${opostalHorizontalTransparent.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "O que visitar em Londres: roteiro de 3 dias a pé | O Postal" },
      {
        name: "twitter:description",
        content:
          "Londres em 3 dias, ao teu ritmo: West End, Westminster, City e Borough Market, com um dia extra opcional para os Harry Potter Studios.",
      },
      { name: "twitter:image", content: `https://opostal.pt${opostalHorizontalTransparent.url}` },
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/londres" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          headline: "O que visitar em Londres: roteiro de 3 dias a pé",
          name: "O que visitar em Londres: roteiro de 3 dias a pé",
          url: "https://opostal.pt/londres",
          image: `https://opostal.pt${opostalHorizontalTransparent.url}`,
          description:
            "O que visitar em Londres em 3 dias sem pressa, quase tudo a pé, com um dia extra opcional para Madame Tussauds e os Warner Bros. Studios de Harry Potter.",
          author: { "@type": "Person", name: "O Postal" },
        }),
      },
    ],
  }),
  component: Index,
});

// ----------------------- helpers -----------------------

const FALLBACK_COVER = londresFallback;

// 1 € ≈ £0.85  (£1 ≈ €1.17)
const RATE_GBP_PER_EUR = 0.85;

const COMMONS = (file: string, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

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
    date: "West End & primeira South Bank",
    title: "West End & primeira South Bank",
    vibe: "Chegar a Londres pelas luzes do West End, ver o primeiro Trafalgar e acabar a tarde a passear à beira do Tamisa.",
    accent: "from-rose-500/25 to-amber-300/10",
    icon: Sun,
    cover: COMMONS("London, Piccadilly Circus -- 2016 -- 4866.jpg"),
    coverAlt: "Piccadilly Circus iluminada ao entardecer em Londres",
    walkTotal: "A pé hoje: bastante, é o dia de descobrir o centro.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Piccadilly+Circus+London&daddr=Leicester+Square+London+to:Trafalgar+Square+London+to:National+Gallery+London+to:Chinatown+London+to:South+Bank+London&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Piccadilly+Circus+London/Leicester+Square+London/Trafalgar+Square+London/National+Gallery+London/Chinatown+London/South+Bank+London/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "10:30",
        title: "Check-in e primeiro café",
        desc: "Deixar malas, um café, e arrancar com o dia. Sem pressa, Londres vai pedir muitos quilómetros.",
        icon: MapPin,
        walkTo: "~15 min de metro até Piccadilly",
      },
      {
        time: "11:30",
        title: "Piccadilly Circus",
        desc: "O cruzamento iluminado, com os ecrãs e a estátua de Eros. Aproveitar para entrar nas lojas-espetáculo da M&M's World e da LEGO Store, na Leicester Square mesmo ao lado.",
        link: "https://pt.wikipedia.org/wiki/Piccadilly_Circus",
        icon: Sparkles,
        walkTo: "~5 min",
      },
      {
        time: "12:15",
        title: "Leicester Square",
        desc: "A praça dos cinemas, das estreias e do TKTS para bilhetes de teatro a preço reduzido. Para o West End à noite.",
        link: "https://pt.wikipedia.org/wiki/Leicester_Square",
        icon: Ticket,
        walkTo: "~5 min",
        image: COMMONS("Odeon Leicester Square - Leicester Square, London (4039143897).jpg"),
        imageAlt: "Fachada do Odeon na Leicester Square em Londres",
      },
      {
        time: "12:45",
        title: "Trafalgar Square",
        desc: "A coluna de Nelson, os leões e a vista a abrir para Whitehall. Praça-charneira de Londres, sempre com gente, artistas de rua e a National Gallery ao fundo.",
        link: "https://pt.wikipedia.org/wiki/Trafalgar_Square",
        icon: Castle,
        walkTo: "~2 min",
        image: COMMONS("London, Trafalgar Square -- 2016 -- 4856.jpg"),
        imageAlt: "Trafalgar Square com a coluna de Nelson em Londres",
      },
      {
        time: "13:15",
        title: "National Gallery (visita breve)",
        desc: "Entrada gratuita. A ideia não é ver tudo, é escolher meia dúzia de salas: Van Gogh, Vermeer, Turner, Caravaggio. Uma hora chega e sai-se com a sensação de ter visto o essencial.",
        link: "https://www.nationalgallery.org.uk/",
        tip: "Verificar se há exposição temporária paga com bilhete separado; o resto continua gratuito.",
        icon: Crown,
        hours: "Diário ~10:00–18:00",
        hoursNote: "Sextas até ~21:00",
        walkTo: "~10 min",
        image: COMMONS("Galería Nacional, Londres, Inglaterra, 2014-08-07, DD 036.JPG"),
        imageAlt: "Interior da National Gallery em Londres",
      },
      {
        time: "14:30",
        title: "Almoço em Chinatown ou Soho",
        desc: "Atravessar para Chinatown para um dim sum, ou cair em qualquer das ruelas de Soho. Almoço sem pressa, é o início da viagem.",
        link: "https://pt.wikipedia.org/wiki/Soho_(Londres)",
        icon: Utensils,
        walkTo: "~20 min até à South Bank",
      },
      {
        time: "17:00",
        title: "South Bank ao fim da tarde",
        desc: "Atravessar o Tamisa e caminhar pela South Bank: a London Eye, o Royal Festival Hall, o National Theatre e o rio a fazer de fio condutor. Aqui o que interessa é a caminhada e o ambiente, não tentar entrar em tudo.",
        link: "https://pt.wikipedia.org/wiki/South_Bank",
        icon: Camera,
        walkTo: "~caminhada livre",
        image: COMMONS(
          "Sea Containers House, Oxo Tower, One Blackfriars, The Shard, South Bank Tower and 240 Blackfriars Road from The Thames.London.jpg",
        ),
        imageAlt: "Vista do Tamisa e da South Bank de Londres ao fim da tarde",
      },
      {
        time: "19:30",
        title: "Jantar e regresso",
        desc: "Jantar perto do Borough ou voltar à zona do alojamento. Cama cedo: o Dia 2 começa em Westminster.",
        icon: Wine,
      },
    ],
  },
  {
    key: "d2",
    label: "Dia 2",
    date: "Westminster, parques & Kensington",
    title: "Westminster, parques & Kensington",
    vibe: "Big Ben de manhã, Buckingham com os parques pelo meio, e a tarde em Hyde Park e South Kensington.",
    accent: "from-amber-300/30 to-rose-400/15",
    icon: Crown,
    cover: COMMONS("Big_Ben_and_Palace_of_Westminster_London_2016_03.jpg"),
    coverAlt: "Big Ben e o Palácio de Westminster vistos da Ponte de Westminster",
    walkTotal: "A pé hoje: muito, com os parques pelo meio a servir de pausa.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Westminster+Abbey+London&daddr=Big+Ben+London+to:St+James%27s+Park+London+to:Buckingham+Palace+London+to:Hyde+Park+London+to:Natural+History+Museum+London+to:Harrods+London&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Westminster+Abbey+London/Big+Ben+London/St+James%27s+Park+London/Buckingham+Palace+London/Hyde+Park+London/Natural+History+Museum+London/Harrods+London/data=!4m2!4m1!3e2",
    highlightTip:
      "Dica: o Changing of the Guard só faz sentido se couber bem no dia, com tempo para chegar cedo e aceitar a multidão. Não vale partir o dia ao meio só para o ver.",
    stops: [
      {
        time: "09:00",
        title: "Westminster e Big Ben",
        desc: "Começar com a fotografia inevitável: Big Ben, as Casas do Parlamento e a Ponte de Westminster sobre o Tamisa. A Abadia de Westminster fica mesmo ao lado, para quem quiser entrar.",
        link: "https://pt.wikipedia.org/wiki/Pal%C3%A1cio_de_Westminster",
        icon: Castle,
        walkTo: "~10 min por St James's Park",
        image: COMMONS("Westminster_Bridge_with_shadows_and_Big_Ben.jpg"),
        imageAlt: "Ponte de Westminster e Big Ben em Londres",
      },
      {
        time: "10:30",
        title: "St James's Park até Buckingham",
        desc: "Atravessar St James's Park, um dos parques mais bonitos da cidade, com o lago e a vista a abrir para o Palácio de Buckingham ao fundo.",
        link: "https://pt.wikipedia.org/wiki/St_James%27s_Park",
        icon: Trees,
        walkTo: "~5 min",
        image: COMMONS("St James's Park Lake – East from the Blue Bridge - 2012-10-06.jpg"),
        imageAlt: "Lago de St James's Park com Westminster ao fundo",
      },
      {
        time: "11:00",
        title: "Buckingham Palace e Changing of the Guard",
        desc: "O palácio por fora, com o portão e o The Mall a abrir-se em frente. Quem quiser ver o Changing of the Guard deve chegar bem cedo e aceitar a multidão. A cerimónia costuma decorrer em alguns dias da semana, com um horário aproximado de 10:45 a 11:30; o calendário muda muitas vezes.",
        link: "https://pt.wikipedia.org/wiki/Pal%C3%A1cio_de_Buckingham",
        tip: "Confirmar sempre o calendário oficial em householddivision.org.uk antes de organizar a manhã.",
        icon: Crown,
        bookingUrl: "[LINK_GETYOURGUIDE_LONDRES_CHANGING_OF_THE_GUARD]",
        hours: "Em dias selecionados ~10:45–11:30",
        hoursNote: "Horário sujeito a alterações; confirmar",
        walkTo: "~15 min até Hyde Park",
        image: COMMONS("Buckingham Palace, London - April 2009.jpg"),
        imageAlt: "Palácio de Buckingham visto do The Mall",
      },
      {
        time: "13:00",
        title: "Almoço a caminho de Hyde Park",
        desc: "Algo rápido pela zona de Victoria ou Knightsbridge; um pub clássico ou um pequeno café para guardar tempo para a tarde.",
        icon: Utensils,
        walkTo: "~10 min",
      },
      {
        time: "14:00",
        title: "Hyde Park",
        desc: "Pausa longa em Hyde Park, o pulmão do centro: o Serpentine, os jardins de Kensington, os esquilos a virem comer à mão. Mais do que um ponto a marcar, faz parte do roteiro como tempo lento.",
        link: "https://pt.wikipedia.org/wiki/Hyde_Park,_Londres",
        icon: Trees,
        walkTo: "~15 min",
        image: COMMONS("Hyde_Park_London_from_the_air.jpg"),
        imageAlt: "Vista aérea de Hyde Park, em Londres",
      },
      {
        time: "16:00",
        title: "Natural History Museum",
        desc: "Entrada gratuita. Um único museu forte, em vez de tentar três. O hall com o esqueleto da baleia, a galeria dos dinossauros, a sala dos minerais. Duas horas chegam e saem-se a ganhar.",
        link: "https://www.nhm.ac.uk/",
        icon: Sparkles,
        bookingUrl: "[LINK_GETYOURGUIDE_LONDRES_NATURAL_HISTORY]",
        hours: "Diário ~10:00–17:50",
        hoursNote: "Entrada gratuita, exposições temporárias pagam à parte",
        walkTo: "~10 min",
        image: COMMONS("Natural_History_Museum_London_Jan_2006.jpg"),
        imageAlt: "Fachada do Natural History Museum em Londres",
      },
      {
        time: "18:30",
        title: "Harrods, como teatro",
        desc: "Mesmo sem comprar nada, Harrods é um edifício para visitar: a Food Hall, o Hall Egípcio, as escadarias. Ver, não consumir.",
        link: "https://www.harrods.com/",
        icon: Crown,
        walkTo: "~5 min",
        image: COMMONS("London, Harrods -- 2016 -- 4605.jpg"),
        imageAlt: "Fachada iluminada de Harrods em Knightsbridge, Londres",
      },
    ],
  },
  {
    key: "d3",
    label: "Dia 3",
    date: "City, miradouro & Tower Bridge",
    title: "City, miradouro & Tower Bridge",
    vibe: "Manhã na City com St Paul's e um miradouro alto, meio-dia no Borough Market e tarde a seguir o Tamisa até Tower Bridge.",
    accent: "from-amber-400/30 to-rose-500/10",
    icon: Church,
    cover: COMMONS("Tower_Bridge_London_Feb_2006.jpg"),
    coverAlt: "Tower Bridge sobre o Tamisa em Londres",
    walkTotal: "A pé hoje: bastante, com o rio a organizar o trajeto.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=St+Paul%27s+Cathedral+London&daddr=Sky+Garden+London+to:Borough+Market+London+to:Tate+Modern+London+to:Millennium+Bridge+London+to:Tower+Bridge+London&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/St+Paul%27s+Cathedral+London/Sky+Garden+London/Borough+Market+London/Tate+Modern+London/Millennium+Bridge+London/Tower+Bridge+London/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:00",
        title: "St Paul's Cathedral",
        desc: "A cúpula de Wren a desenhar a City. Por dentro, vale para quem quer entrar; por fora e da praça, já cumpre. Os arredores são bons para fotografar a cúpula sem multidão.",
        link: "https://pt.wikipedia.org/wiki/Catedral_de_S%C3%A3o_Paulo_(Londres)",
        icon: Church,
        bookingUrl: "[LINK_GETYOURGUIDE_LONDRES_ST_PAULS]",
        hours: "Seg–Sáb ~8:30–16:30",
        hoursNote: "Não visitável aos domingos (culto)",
        walkTo: "~12 min",
        image: COMMONS("St Paul's Cathedral Dome from One New Change - Square Crop.jpg"),
        imageAlt: "Cúpula de St Paul's Cathedral vista de One New Change",
      },
      {
        time: "10:30",
        title: "Miradouro da City: Sky Garden ou Horizon 22",
        desc: "A lógica é simples: vistas fortes sobre Londres sem pagar o preço do Shard. Ambos são gratuitos e exigem reserva online com bastante antecedência. Sky Garden tem cafés e jardim interior; Horizon 22 é mais sóbrio, com a vista a 360º.",
        link: "https://skygarden.london/",
        tip: "Reservar online com 1 a 2 semanas de antecedência. Levar documento, há controlo de identidade à entrada.",
        icon: Sparkles,
        bookingUrl: "[LINK_GETYOURGUIDE_LONDRES_SKY_GARDEN]",
        hours: "Slots gratuitos, reserva obrigatória",
        walkTo: "~15 min até Borough Market",
        image: COMMONS("The Sky Garden.jpg"),
        imageAlt: "Interior do Sky Garden de Londres com vista sobre a City",
      },
      {
        time: "12:00",
        title: "Borough Market (cedo, antes do pico)",
        desc: "O mercado coberto mais conhecido de Londres, mesmo ao lado da London Bridge. Quanto mais cedo, melhor: as bancas mais famosas (paella, hambúrgueres, cheesecake, ostras) acumulam fila depressa.",
        link: "https://www.boroughmarket.org.uk/",
        tip: "Ir com fome mas com plano: dar uma volta primeiro, escolher 2 ou 3 paragens, evitar o ponto da fila enorme se houver alternativa ao lado.",
        icon: Utensils,
        hours: "Ter–Sáb ~10:00–17:00",
        hoursNote: "Fechado à segunda; verificar dias especiais",
        walkTo: "~10 min",
        image: COMMONS("Borough Market (4701274756).jpg"),
        imageAlt: "Bancas e arcadas do Borough Market em Londres",
      },
      {
        time: "14:30",
        title: "Tate Modern ou Millennium Bridge",
        desc: "Entrada gratuita na coleção permanente da Tate Modern, dentro da antiga central elétrica de Bankside. Para quem não está com paciência de museu, atravessar a Millennium Bridge a pé já compensa, com St Paul's em frente.",
        link: "https://www.tate.org.uk/visit/tate-modern",
        icon: Sparkles,
        bookingUrl: "[LINK_GETYOURGUIDE_LONDRES_TATE_MODERN]",
        hours: "Diário ~10:00–18:00",
        hoursNote: "Sextas e sábados até ~22:00",
        walkTo: "~5 min",
        image: COMMONS("Tate Modern, Londres, Inglaterra, 2014-08-11, DD 116-117 HDR.JPG"),
        imageAlt: "Edifício da Tate Modern visto do Tamisa em Londres",
      },
      {
        time: "16:30",
        title: "Caminhada à beira-rio até Tower Bridge",
        desc: "Seguir pela margem sul do Tamisa, com o Shard à direita, o HMS Belfast atracado, e a Tower Bridge a aparecer ao fundo. É a melhor maneira de fechar Londres a pé.",
        link: "https://pt.wikipedia.org/wiki/Tower_Bridge",
        icon: Footprints,
        walkTo: "~20 min",
        image: COMMONS("Millennium Bridge London.jpg"),
        imageAlt: "Millennium Bridge sobre o Tamisa, com vista para a City de Londres",
      },
      {
        time: "18:00",
        title: "Tower Bridge e Torre de Londres",
        desc: "A ponte vitoriana das duas torres, com a Torre de Londres do outro lado. Ao fim do dia, com a luz a cair, é uma das melhores fotografias da cidade.",
        link: "https://pt.wikipedia.org/wiki/Tower_Bridge",
        icon: Castle,
      },
    ],
  },
  {
    key: "d4",
    label: "Dia extra",
    date: "Madame Tussauds & Harry Potter Studios",
    title: "Madame Tussauds & Harry Potter Studios",
    vibe: "Um dia opcional, para quem ainda tem fôlego e era (ou continua a ser) fã: manhã em Marylebone, tarde nos estúdios em Leavesden.",
    accent: "from-rose-500/25 to-amber-400/15",
    icon: Wand2,
    cover: COMMONS("Lake, Regents Park, London - geograph.org.uk - 4102919.jpg"),
    coverAlt: "Lago de Regent's Park, em Londres",
    howToGet:
      "Como chegar: metro até Baker Street para Madame Tussauds; comboio + transfer ou autocarro turístico até Leavesden para os Warner Bros. Studios.",
    highlightTip:
      "Os Warner Bros. Studios reservam-se com muita antecedência. A visita autoguiada dura cerca de 3,5 a 4 horas, mas com a viagem desde Londres conta-se como um meio-dia longo.",
    stops: [
      {
        time: "10:00",
        title: "Madame Tussauds (Marylebone)",
        desc: "Assumidamente turístico e divertido, se for algo que a pessoa mesmo queira ver. As filas podem ser longas; bilhete com hora marcada poupa muito tempo. Cerca de 2 horas chegam.",
        link: "https://www.madametussauds.com/london/",
        tip: "Combinar com um café em Marylebone High Street ou um passeio rápido em Regent's Park, ali ao lado.",
        icon: Camera,
        bookingUrl: "[LINK_GETYOURGUIDE_LONDRES_MADAME_TUSSAUDS]",
        hours: "Diário ~10:00–17:00",
        hoursNote: "Horário varia conforme estação; confirmar online",
        walkTo: "~15 min até Regent's Park",
      },
      {
        time: "12:00",
        title: "Marylebone e Regent's Park",
        desc: "Pausa civilizada antes da viagem: as ruas calmas de Marylebone, os cafés, e uma volta curta por Regent's Park.",
        link: "https://pt.wikipedia.org/wiki/Regent%27s_Park",
        icon: Trees,
        walkTo: "~15 min até estação",
        image: COMMONS("Lake, Regents Park, London - geograph.org.uk - 4102919.jpg"),
        imageAlt: "Lago e arvoredo em Regent's Park, Londres",
      },
      {
        time: "13:00",
        title: "Almoço leve e viagem até Leavesden",
        desc: "Algo rápido antes de apanhar comboio para Watford Junction, com transfer dedicado (autocarro de duas faces) até aos estúdios. Em alternativa, há autocarros turísticos com transporte de ida e volta a partir do centro.",
        icon: TrainFront,
        walkTo: "~1h porta-a-porta",
      },
      {
        time: "14:30",
        title: "Warner Bros. Studio Tour London",
        desc: "Visita autoguiada de cerca de 3,5 a 4 horas ao backlot e às salas de produção: cenários originais, adereços, figurinos, efeitos práticos, e os bastidores das filmagens. A reserva é feita com antecedência, idealmente com transporte incluído. Profundamente emocionante para fãs; menos óbvio para quem não tem ligação à saga.",
        link: "https://www.wbstudiotour.co.uk/",
        tip: "Reservar com várias semanas (ou meses) de antecedência. Há pacotes com transporte de Londres incluído que poupam logística.",
        icon: Wand2,
        bookingUrl: "[LINK_GETYOURGUIDE_LONDRES_WB_STUDIO_TOUR]",
        hours: "Diário, slots horários, reserva obrigatória",
        hoursNote: "Esgota com muita antecedência",
        image: COMMONS("Entrance to the Making of Harry Potter studio tour.jpg"),
        imageAlt: "Entrada exterior dos Warner Bros. Studios em Leavesden, perto de Londres",
      },
      {
        time: "20:00",
        title: "Regresso a Londres",
        desc: "Voltar ao centro pelo mesmo caminho. Jantar perto do alojamento; o dia foi longo e vale a calma.",
        icon: Wine,
      },
    ],
  },
];

const altDay: Day = {
  key: "d4-alt",
  label: "Dia extra · alternativa",
  date: "Londres bónus, sem os estúdios",
  title: "Londres bónus, sem os estúdios",
  vibe: "Para quem não tem ligação a Harry Potter: troca-se a viagem a Leavesden por mais um dia a viver a cidade, com calma e num bairro menos óbvio.",
  accent: "from-rose-500/20 to-amber-300/10",
  icon: Trees,
  cover: COMMONS("Lake, Regents Park, London - geograph.org.uk - 4102919.jpg"),
  coverAlt: "Lago e arvoredo em Regent's Park, Londres",
  walkTotal: "A pé hoje: muito, é um dia de cidade ao ritmo lento.",
  highlightTip:
    "A ideia não é encaixar mais atrações, é viver Londres outra vez: bairros menos óbvios, miradouros sem fila e cafés sem pressa.",
  stops: [
    {
      time: "10:00",
      title: "Madame Tussauds (opcional)",
      desc: "Se ainda fizer sentido, manter a manhã em Marylebone com Madame Tussauds. Caso contrário, café demorado em Marylebone High Street e uma volta calma por Regent's Park.",
      link: "https://www.madametussauds.com/london/",
      icon: Camera,
      walkTo: "~20 min até St Paul's de metro",
    },
    {
      time: "12:00",
      title: "St Paul's por dentro e miradouro",
      desc: "Regresso longo à City: visitar St Paul's por dentro sem pressa, subir ao miradouro do Sky Garden ou Horizon 22 com tempo para ficar lá em cima. Vistas fortes, sem o preço do Shard.",
      link: "https://pt.wikipedia.org/wiki/Catedral_de_S%C3%A3o_Paulo_(Londres)",
      icon: Church,
      walkTo: "~10 min até South Bank",
    },
    {
      time: "14:30",
      title: "Mais uma volta pela South Bank",
      desc: "Almoço tranquilo perto do Tamisa e uma caminhada lenta pela South Bank, agora a reconhecer os sítios do Dia 1 e a perceber Londres a outra luz.",
      icon: Footprints,
    },
    {
      time: "16:30",
      title: "Escolher um bairro: Notting Hill, Shoreditch ou Greenwich",
      desc: "A escolha depende do mood: Notting Hill para casas pastel e Portobello, Shoreditch para arte urbana e cafés, Greenwich para mercado, observatório e vista da cidade do outro lado do rio.",
      tip: "Um bairro de cada vez. Tentar dois no mesmo dia tira o sossego que se está a procurar.",
      icon: MapPin,
    },
    {
      time: "20:00",
      title: "Jantar calmo no bairro escolhido",
      desc: "Ficar a jantar onde se passou a tarde, sem voltar ao centro só pelo centro. Fechar Londres a um ritmo lento.",
      icon: Wine,
    },
  ],
};

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
            backgroundImage: `url('${COMMONS("City_of_London_skyline_from_London_City_Hall_-_Oct_2008.jpg", 3200)}')`,
          }}
          role="img"
          aria-label="Skyline da City de Londres visto do outro lado do Tamisa, à hora dourada"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/35 via-plum/65 to-twilight/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,oklch(0.55_0.18_25/0.20),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,oklch(0.78_0.10_78/0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-twilight/40 to-background" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6"
      >
        <div className="pointer-events-none absolute left-6 top-24 hidden md:left-12 md:top-28 md:block">
          <PostmarkCircle city="LONDRES" year="2024" rotate={-14} />
        </div>
        <div className="pointer-events-none absolute right-6 top-24 hidden md:right-12 md:top-28 md:block">
          <PostmarkCircle city="LONDRES" year="2025" rotate={-6} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="glass mx-auto w-full max-w-2xl rounded-3xl px-8 py-12 text-center shadow-2xl md:px-14 md:py-16"
        >
          <div className="mb-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold/70" />
            Guia · 3 dias + extra
            <span className="h-px w-8 bg-gold/70" />
          </div>
          <h1 className="font-serif leading-[1.05]">
            <span className="block text-gradient-gold text-6xl md:text-8xl">Londres</span>
            <span className="mt-6 block font-serif text-xl italic text-cream/85 md:text-2xl">
              Guia de 3 dias a pé, com um dia extra
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Uma cidade para viver sem pressa, quase tudo a pé, com parques pelo meio, mercados, um pub honesto e um dia extra opcional para quem cresceu com Harry Potter.
          </p>
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
      title="O que visitar em Londres: três dias e um extra"
      intro="Cada dia tem uma zona, uma cadência e um motivo para acabar tarde. O dia extra é opcional, para fãs de Harry Potter ou para quem quer um quarto dia mais bónus."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
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
              className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-card backdrop-blur-md transition-shadow hover:shadow-[0_20px_60px_-20px_oklch(0.55_0.18_25/0.45)]"
            >
              <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-terracotta/30 via-gold/15 to-twilight">
                {d.cover ? (
                  <img
                    src={d.cover}
                    alt={d.coverAlt ?? d.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_COVER;
                    }}
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
      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-twilight shadow-[0_0_0_4px_var(--background),0_0_30px_oklch(0.78_0.10_78/0.25)] md:left-5">
        <Icon className="h-4 w-4 text-gold" />
      </div>

      <div className="w-full rounded-2xl border border-gold/10 bg-card px-6 py-5 text-left transition-all duration-300 hover:border-gold/30 hover:bg-card/80">
        {stop.image && (
          <div className="mb-4 -mx-6 -mt-5 overflow-hidden">
            <img
              src={stop.image}
              alt={stop.imageAlt ?? stop.title}
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_COVER;
              }}
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
          <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-twilight/60 shadow-[0_20px_60px_-30px_oklch(0.78_0.10_78/0.45)]">
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

// ----------------------- HARRY POTTER vs -----------------------

function HarryPotterVs() {
  const tiers = [
    {
      name: "Ir aos Harry Potter Studios",
      tag: "Para fãs",
      bullets: [
        "Cenários, adereços e figurinos originais das filmagens, com nível de detalhe que ultrapassa qualquer parque temático.",
        "Há quem descreva a visita como inesquecível, com momentos emocionantes mesmo para quem foi adulto a ver os filmes.",
        "Faz sentido para quem cresceu com a saga ou continua a relê-la: é uma viagem dentro da viagem.",
      ],
      footer: "Se Harry Potter foi parte da tua vida em algum momento, este é dos raros casos em que vale sacrificar meio dia de cidade.",
      highlight: true,
      link: "https://www.wbstudiotour.co.uk/",
    },
    {
      name: "Ficar por Londres",
      tag: "Para não-fãs",
      bullets: [
        "Os estúdios ficam em Leavesden, fora de Londres: a viagem ida e volta pesa muito no dia.",
        "O bilhete não é barato, e o transporte dedicado soma mais ao custo.",
        "Sem ligação à saga, a visita pode soltar-se como um parque temático qualquer, e a frustração é provável.",
      ],
      footer: "Se Harry Potter foi só mais um filme que viste, provavelmente não compensa: melhor um dia bónus em Londres.",
      highlight: false,
      link: "https://pt.wikipedia.org/wiki/Warner_Bros._Studio_Tour_London_-_The_Making_of_Harry_Potter",
    },
  ];

  return (
    <Section
      id="vs"
      eyebrow="Decisão honesta"
      title="Ir ou não aos Harry Potter Studios?"
      intro="A pergunta divide quase toda a gente que planeia Londres. A resposta depende muito menos do tempo livre e muito mais da relação com a saga."
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
                ? "border-gold/60 bg-gradient-to-br from-gold/10 via-terracotta/10 to-transparent shadow-[0_30px_80px_-30px_oklch(0.55_0.18_25/0.45)]"
                : "border-gold/15 bg-card"
            }`}
          >
            {t.highlight && (
              <div className="absolute right-6 top-6 rounded-full border border-gold/50 bg-gold/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold">
                Recomendado para fãs
              </div>
            )}
            <div className="text-xs uppercase tracking-[0.3em] text-gold">{t.tag}</div>
            <h3 className="mt-3 font-serif text-3xl text-cream">
              <GoldLink href={t.link}>{t.name}</GoldLink>
            </h3>
            <ul className="mt-6 space-y-2.5">
              {t.bullets.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-cream/90">
                  {t.highlight ? (
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                  ) : (
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-terracotta" />
                  )}
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
          A visita autoguiada aos estúdios dura cerca de 3,5 a 4 horas; com a viagem ida e volta a partir do centro de Londres conta-se como um meio-dia longo. Reservar com várias semanas (ou meses) de antecedência, idealmente com pacote de transporte incluído.
        </p>
      </motion.div>
    </Section>
  );
}

// ----------------------- FOOD -----------------------

function Food() {
  const restaurants: Array<{ name: string; desc: string; link: string; image?: string; imageAlt?: string }> = [
    {
      name: "Borough Market (London Bridge)",
      desc: "O mercado coberto mais conhecido da cidade: paella, hambúrgueres, ostras, cheesecake. Ir cedo e dar uma volta antes de escolher.",
      link: "https://www.boroughmarket.org.uk/",
      image: COMMONS("Borough Market (4701274756).jpg"),
      imageAlt: "Bancas e arcadas do Borough Market em Londres",
    },
    {
      name: "Pub clássico (Mayfair / Westminster)",
      desc: "Um almoço de fish & chips ou Sunday roast num pub antigo, com madeira escura e cerveja real. The Audley, The Red Lion ou outro do género.",
      link: "https://www.google.com/search?q=classic+pubs+London+Mayfair",
    },
    {
      name: "Dishoom (Covent Garden, Shoreditch)",
      desc: "Casa de pratos indianos de Bombaim, sempre com fila mas a andar depressa. Pequeno-almoço com bacon naan, ou jantar com galinha black daal.",
      link: "https://www.dishoom.com/",
    },
    {
      name: "Pequeno-almoço inglês",
      desc: "Pelo menos uma manhã: ovos, bacon, salsicha, feijão e tomate, café preto. Em cafés de bairro ou no Regency Cafe (Pimlico), clássico desde 1946.",
      link: "https://www.google.com/search?q=Regency+Cafe+London",
    },
  ];

  const dishes: Array<{ name: string; desc: string; icon?: React.ComponentType<{ className?: string }>; image?: string; imageAlt?: string }> = [
    {
      name: "Fish & chips",
      desc: "Peixe panado com batata frita grossa, ervilhas amassadas e vinagre de malte. O clássico inegociável.",
    },
    {
      name: "Sunday roast",
      desc: "Domingos à mesa do pub: carne assada, batatas, Yorkshire pudding e gravy. Reservar.",
    },
    {
      name: "Afternoon tea",
      desc: "O ritual das 16:00: chá, scones com clotted cream e jam, sanduíches finas. Versão luxo em hotéis históricos, versão honesta em pastelarias.",
    },
    {
      name: "Pie & mash",
      desc: "Tarte de carne com puré e gravy verde, comida de trabalho do East End.",
    },
    {
      name: "Indiano de Brick Lane",
      desc: "A herança da imigração: curry honesto e barato na Brick Lane, ou refinado no Dishoom.",
    },
    {
      name: "Pint num pub",
      desc: "Cerveja real (cask ale) servida à temperatura certa, ao balcão, sem cerimónia.",
      icon: Wine,
    },
  ];

  return (
    <Section
      id="comer"
      eyebrow="À mesa"
      title="Comer e beber em Londres"
      intro="Londres come bem, ao contrário do que dizem. A graça está em escolher bem onde, e em provar o que é genuinamente local."
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
            className="group flex flex-col overflow-hidden rounded-2xl border border-gold/15 bg-card transition-all hover:border-gold/40 hover:shadow-[0_20px_50px_-20px_oklch(0.55_0.18_25/0.35)]"
          >
            {r.image && (
              <img
                src={r.image}
                alt={r.imageAlt ?? r.name}
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_COVER;
                }}
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
            <li>Fugir dos restaurantes colados aos grandes monumentos (Westminster, Tower Bridge): turísticos, caros, fracos. Andar 5 a 10 minutos para fora.</li>
            <li>O "service charge" (taxa de serviço, normalmente 12,5%) costuma vir já na conta nos restaurantes; verificar antes de deixar gorjeta adicional.</li>
            <li>Em pubs, a comida pede-se ao balcão e pagam-se as bebidas na hora; raramente há serviço à mesa.</li>
          </ul>
        </div>
      </motion.div>
    </Section>
  );
}

// ----------------------- TIPS & TRAPS -----------------------

function Tips() {
  const doIt = [
    "Pagar transportes com cartão contactless ou Oyster; nunca comprar bilhete de papel avulso, é muito mais caro.",
    "Reservar London Eye, Madame Tussauds e Warner Bros. Studio Tour com hora marcada e bem antes da viagem.",
    "Reservar slot gratuito no Sky Garden ou Horizon 22 com 1 a 2 semanas de antecedência.",
    "Confirmar o calendário oficial do Changing of the Guard em householddivision.org.uk antes de organizar a manhã.",
    "Andar a pé sempre que possível: Londres descobre-se mais às esquinas do que dentro do metro.",
    "Levar guarda-chuva pequeno; chuva curta é parte do programa.",
  ];
  const dont = [
    "Aparecer em Borough Market à 13:00 a um sábado e esperar mesa: ir cedo ou fora do fim-de-semana.",
    "Esperar entrar no The Shard achando que é barato; há vistas equivalentes (Sky Garden, Horizon 22) gratuitas.",
    "Encavalitar os Warner Bros. Studios no Dia 1, logo a chegar: é melhor descansar antes da meia-jornada longa.",
    "Conduzir no centro: há Congestion Charge e ULEZ, com multas automáticas para carros não-conformes.",
    "Esquecer que o sentido de circulação é à esquerda: olhar duas vezes ao atravessar.",
  ];

  return (
    <Section
      id="dicas"
      eyebrow="Saber andar"
      title="Dicas & armadilhas"
      intro="O básico que faz Londres correr suave, sem perder tempo nem dinheiro à toa."
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
    "Oyster ou cartão contactless ativo para transportes",
    "London Eye (slot horário)",
    "Madame Tussauds (slot horário)",
    "Warner Bros. Studio Tour, Harry Potter (semanas antes, com transporte)",
    "Miradouro gratuito: Sky Garden ou Horizon 22 (reserva online)",
    "Calendário do Changing of the Guard confirmado",
    "Mesa para pelo menos um jantar mais popular (Dishoom, Sunday roast)",
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
        <p className="font-serif text-3xl text-gradient-gold md:text-4xl">Mind the gap, e boa viagem.</p>
        <p className="mt-4 text-sm text-muted-foreground">
          O Postal. Guias editoriais de cidades europeias, feitos com calma e partilhados com gosto.
        </p>
        <p className="mt-3 text-xs text-muted-foreground/80">
          Fotos: Wikimedia Commons
        </p>
      </div>
    </footer>
  );
}

// ----------------------- INDEX -----------------------

function AlternativaSemEstudios() {
  const Icon = altDay.icon;
  return (
    <Section
      id="alternativa"
      eyebrow="Opcional"
      title="Alternativa ao dia dos estúdios"
      intro="Para quem não vai aos Harry Potter Studios, este é o dia extra equivalente, com a mesma estrutura dos outros. Abre para ver o roteiro completo."
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="alt"
          className="overflow-hidden rounded-2xl border border-gold/20 bg-card !border-b"
        >
          <AccordionTrigger className="px-6 py-5 hover:no-underline">
            <div className="flex flex-1 flex-col items-start gap-2 text-left">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
                <Icon className="h-4 w-4" />
                {altDay.label} · {altDay.date}
              </div>
              <h3 className="font-serif text-2xl text-cream md:text-3xl">
                <span className="text-gradient-gold">{altDay.title}</span>
              </h3>
              <p className="max-w-2xl text-sm italic text-muted-foreground">{altDay.vibe}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-8 pt-2">
            <DayBlock day={altDay} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  );
}

function Index() {
  return (
    <main id="top" className="theme-londres bg-twilight-radial min-h-screen overflow-x-hidden">
      <StickyNav />
      <Hero />
      <ConhecerLondres />
      <EssentialInfo />
      <Overview />
      <Itineraries />
      <AlternativaSemEstudios />
      <GuideVideo />
      <HarryPotterVs />
      <Food />
      <Tips />
      <Checklist />
      <CustomItineraryCTA city="Londres" />
      <Footer />
    </main>
  );
}

// ----------------------- STICKY NAV -----------------------

const navLinks = [
  { id: "d1", label: "Dia 1" },
  { id: "d2", label: "Dia 2" },
  { id: "d3", label: "Dia 3" },
  { id: "d4", label: "Extra" },
  { id: "alternativa", label: "Alternativa" },
  { id: "video", label: "Vídeo" },
  { id: "vs", label: "HP Studios" },
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
                      layoutId="nav-underline-londres"
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

// ----------------------- VÍDEO DO GUIA (premium) -----------------------

function GuideVideo() {
  return (
    <Section
      id="video"
      eyebrow="Vídeo do guia"
      title="Vídeo do guia"
      intro="O vídeo completo deste guia, disponível com o seu acesso."
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mx-auto max-w-4xl"
      >
        <div className="relative rounded-3xl bg-gradient-to-br from-gold/20 via-terracotta/15 to-transparent p-[1px] shadow-2xl shadow-black/50">
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-gold/20 bg-black">
            {/* TODO: substituir pelo embed do vídeo definitivo */}
            <div className="absolute inset-0 flex items-center justify-center text-cream/60">
              <div className="flex flex-col items-center gap-3">
                <Play className="h-10 w-10 text-gold" aria-hidden />
                <p className="font-serif italic">Vídeo em produção</p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-center font-serif italic text-gold/90 flex items-center justify-center gap-2">
          <Play className="h-4 w-4" aria-hidden />
          O vídeo completo deste guia, disponível com o seu acesso.
        </p>
      </motion.div>
    </Section>
  );
}

// ----------------------- CONHECER LONDRES -----------------------

const climaMeses: Array<[string, string, string, string]> = [
  ["Jan", "8", "3", "alta"],
  ["Fev", "9", "3", "alta"],
  ["Mar", "12", "4", "média"],
  ["Abr", "15", "6", "média"],
  ["Mai", "18", "9", "média"],
  ["Jun", "21", "12", "média"],
  ["Jul", "24", "14", "média"],
  ["Ago", "23", "14", "média"],
  ["Set", "20", "12", "média"],
  ["Out", "16", "9", "alta"],
  ["Nov", "11", "6", "alta"],
  ["Dez", "9", "4", "alta"],
];

const eventos: Array<{ nome: string; quando: string; desc: string }> = [
  {
    nome: "Notting Hill Carnival",
    quando: "último fim-de-semana de agosto",
    desc: "Maior carnaval de rua da Europa, com herança caribenha; vibração imensa, multidões enormes.",
  },
  {
    nome: "Trooping the Colour",
    quando: "junho (sábado)",
    desc: "Parada militar para celebrar o aniversário oficial do soberano, com cavalaria e a família real na varanda de Buckingham.",
  },
  {
    nome: "Wimbledon",
    quando: "fim de junho a início de julho",
    desc: "O torneio de ténis sobre relva, com a tradição do morango com natas e a fila para bilhetes do dia.",
  },
  {
    nome: "Luzes de Natal em Oxford e Regent Street",
    quando: "novembro a janeiro",
    desc: "Iluminações grandes nas ruas comerciais e patinagem no gelo em Somerset House e na Tower of London.",
  },
];

function ConhecerLondres() {
  const itemCls = "glass rounded-2xl border border-gold/15 px-5 sm:px-6 overflow-hidden";
  const triggerCls = "py-5 font-serif text-lg sm:text-xl text-cream hover:no-underline gap-3";
  const iconCls =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/30 text-gold";

  return (
    <Section
      id="conhecer"
      eyebrow="Contexto"
      title="Conhecer Londres"
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
          <AccordionItem value="contexto" className={itemCls}>
            <AccordionTrigger className={triggerCls}>
              <span className="flex items-center gap-3">
                <span className={iconCls}>
                  <Info className="h-4 w-4" />
                </span>
                Londres em 2 minutos
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm leading-relaxed text-cream/90 space-y-3">
              <p>Capital do Reino Unido, com mais de dois mil anos de história sobre o Tamisa.</p>
              <p>Cidade-mundo, dividida por zonas com personalidade muito própria: Westminster, City, South Bank, West End, East End, Kensington.</p>
              <p>Funciona em camadas: monarquia e parlamento, finança, arte, mercados, parques e bairros de imigração. Tudo a coexistir no mesmo dia.</p>
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
                <span className="text-gold">Primavera (abr–mai) e início do verão (jun):</span> a melhor altura, parques verdes, dias longos, ainda sem o pico do turismo.
              </p>
              <p>
                <span className="text-gold">Setembro:</span> equilíbrio entre clima e multidões, com menos turistas que no verão.
              </p>
              <p>
                <span className="text-gold">Evitar:</span> períodos de feriado britânico se quiseres museus mais calmos.
              </p>
              <p className="font-serif italic text-gold/90 pt-2">Em qualquer altura: levar guarda-chuva e camadas; o tempo muda em horas.</p>
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
                Médias aproximadas (confirmar); invernos suaves e chuvosos, verões frescos com aguaceiros curtos.
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
    body: "GMT (UTC+0) no inverno, BST (UTC+1) no verão. Londres está, em geral, 0 horas em relação a Lisboa.",
  },
  {
    icon: Coins,
    title: "Moeda",
    body: "Libra esterlina (GBP, £). Câmbio aproximado: £1 vale, em regra, cerca de €1,15 a €1,20 (confirmar antes de partir).",
  },
  {
    icon: Plug,
    title: "Tomadas",
    body: "Tipo G (três pinos retangulares), 230 V / 50 Hz. As fichas portuguesas não encaixam; levar adaptador.",
  },
  {
    icon: Phone,
    title: "Emergência",
    body: "999 ou 112. Levar o Cartão Europeu de Seguro de Doença; o NHS atende em urgências.",
  },
  {
    icon: TrainFront,
    title: "Transportes",
    body: "Oyster ou cartão contactless (débito/crédito) em todos os transportes públicos. Bilhete de papel é muito mais caro. Do Heathrow ao centro: Elizabeth Line (~30 min, mais barata) ou Heathrow Express (15 min, mais cara).",
  },
  {
    icon: HandCoins,
    title: "Gorjetas",
    body: "Em restaurantes, a taxa de serviço (~12,5%) costuma já vir incluída na conta; verificar antes de deixar extra. Em pubs não se dá gorjeta; em táxis, arredondar chega.",
  },
];

const phrases = [
  ["Olá", "Hello / Hi"],
  ["Obrigado", "Thank you / Cheers"],
  ["Por favor", "Please"],
  ["Sim / Não", "Yes / No"],
  ["Quanto custa?", "How much is it?"],
  ["Saúde (brinde)", "Cheers"],
];

function EssentialInfo() {
  return (
    <Section
      id="essencial"
      eyebrow="Antes de partir"
      title="Essencial para a viagem"
      intro="O básico para chegar leve: fuso, moeda, tomadas, transporte e duas palavras inglesas para abrir portas."
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
              className="glass rounded-2xl border border-gold/15 p-6 transition-shadow hover:shadow-[0_20px_60px_-30px_oklch(0.55_0.18_25/0.45)]"
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
            <h4 className="font-serif text-lg text-gold">Covent Garden / Soho</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              A pé do West End, dos teatros e da South Bank; central, animado, mais caro.
            </p>
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">South Bank / London Bridge</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Junto ao rio e ao Borough Market, com fácil acesso à City e a Westminster pelo Tamisa.
            </p>
          </li>
          <li className="rounded-xl border border-gold/15 bg-background/30 p-5">
            <h4 className="font-serif text-lg text-gold">Kensington / South Kensington</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Calmo, residencial, com museus à porta e ligação direta de metro ao centro.
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
          {phrases.map(([pt, en]) => (
            <li
              key={pt}
              className="flex items-baseline justify-between gap-3 border-b border-gold/10 pb-2"
            >
              <span className="text-sm text-muted-foreground">{pt}</span>
              <span className="font-serif text-lg italic text-gold">{en}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <CurrencyConverter />
    </Section>
  );
}

// ----------------------- CURRENCY CONVERTER -----------------------

function CurrencyConverter() {
  const [eur, setEur] = useState<string>("10");
  const [gbp, setGbp] = useState<string>((10 * RATE_GBP_PER_EUR).toFixed(2));
  const eurId = useId();
  const gbpId = useId();
  const eurRef = useRef<HTMLInputElement>(null);
  const gbpRef = useRef<HTMLInputElement>(null);
  const [lastEdited, setLastEdited] = useState<"eur" | "gbp">("eur");

  const onEurChange = (v: string) => {
    setEur(v);
    setLastEdited("eur");
    if (v === "" || isNaN(Number(v))) {
      setGbp("");
      return;
    }
    setGbp((Number(v) * RATE_GBP_PER_EUR).toFixed(2));
  };

  const onGbpChange = (v: string) => {
    setGbp(v);
    setLastEdited("gbp");
    if (v === "" || isNaN(Number(v))) {
      setEur("");
      return;
    }
    setEur((Number(v) / RATE_GBP_PER_EUR).toFixed(2));
  };

  const invert = () => {
    if (lastEdited === "eur") {
      gbpRef.current?.focus();
      setLastEdited("gbp");
    } else {
      eurRef.current?.focus();
      setLastEdited("eur");
    }
  };

  const chipPreset = (gbpVal: number) => {
    const eurValue = (gbpVal / RATE_GBP_PER_EUR).toFixed(2);
    setGbp(String(gbpVal));
    setEur(eurValue);
    setLastEdited("gbp");
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
            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-background/40 text-gold shadow-[0_10px_30px_-15px_oklch(0.52_0.22_25/0.6)] transition-all hover:bg-gold/10 hover:rotate-180"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </button>
        </div>

        {/* GBP */}
        <div>
          <label
            htmlFor={gbpId}
            className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            Libra esterlina
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-serif text-2xl text-gold/70">
              £
            </span>
            <input
              id={gbpId}
              ref={gbpRef}
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={gbp}
              onChange={(e) => onGbpChange(e.target.value)}
              className="w-full rounded-xl border border-gold/20 bg-background/40 py-4 pl-10 pr-4 text-right font-serif text-3xl text-cream outline-none transition-colors focus:border-gold/50 focus:ring-2 focus:ring-gold/40"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Atalhos
        </span>
        {[5, 10, 20, 50].map((g) => {
          const eurValue = (g / RATE_GBP_PER_EUR).toFixed(2);
          return (
            <button
              key={g}
              type="button"
              onClick={() => chipPreset(g)}
              className="rounded-full border border-gold/20 bg-background/30 px-3.5 py-1.5 text-xs text-gold/90 transition-colors hover:border-gold/50 hover:bg-gold/10"
            >
              £{g} ≈ {eurValue} €
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-xs italic text-gold/80">
        Taxa fixa aproximada (1 € ≈ £{RATE_GBP_PER_EUR}); pode estar desatualizada. Confirmar a taxa de câmbio do dia antes de pagar.
      </p>
    </motion.div>
  );
}