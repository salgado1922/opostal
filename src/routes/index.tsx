import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
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
  Circle,
  Music,
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
  TrainFront,
} from "lucide-react";
import type { Variants } from "framer-motion";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Praga — 4 dias de hora dourada" },
      {
        name: "description",
        content:
          "Roteiro editorial de 4 dias em Praga: Cidade Velha, Castelo, Kutná Hora e Vyšehrad. Dicas, restaurantes e concertos.",
      },
      { property: "og:title", content: "Praga — 4 dias de hora dourada" },
      { property: "og:description", content: "Roteiro editorial de 4 dias em Praga." },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1600&q=80",
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
    <section id={id} className="relative px-6 py-24 md:px-12 md:py-32">
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
};

const days: Day[] = [
  {
    key: "d1",
    label: "Dia 1",
    date: "Quarta, 24",
    title: "Chegada & Cidade Velha",
    vibe: "Aterrar com calma, encantar com pedras antigas e luz de fim de tarde na Ponte Carlos.",
    accent: "from-amber-400/30 to-rose-400/10",
    icon: Sun,
    cover:
      "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=80",
    walkTotal: "A pé hoje: ~25 min",
    dayNote: {
      tone: "amber",
      text: "Vê hoje (quarta): o bairro judeu fecha ao sábado.",
    },
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Hotel+Garden+Court+Prague&daddr=Josefov+Prague+to:Old+Town+Square+Prague+to:Charles+Bridge+Prague&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Hotel+Garden+Court+Prague/Josefov+Prague/Old+Town+Square+Prague/Charles+Bridge+Prague/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "13:00",
        title: "Check-in no Hotel Garden Court",
        desc: "Aterrar, deixar as malas e respirar. Café rápido no lobby antes de sair.",
        icon: MapPin,
        walkTo: "~12 min",
      },
      {
        time: "14:00",
        title: "Josefov — Bairro Judeu",
        desc: "Passeio tranquilo pelas sinagogas e pelo Cemitério Judaico, um dos mais antigos da Europa.",
        link: "https://pt.wikipedia.org/wiki/Josefov",
        tip: "Bilhete combinado para várias sinagogas — vale a pena se as pernas aguentarem.",
        icon: Church,
        bookingUrl: "https://www.jewishmuseum.cz/en/",
        hours: "Dom–Sex ~9:00–18:00",
        hoursNote: "FECHA AOS SÁBADOS",
        walkTo: "~4 min",
      },
      {
        time: "16:45",
        title: "Praça da Cidade Velha & Relógio Astronómico",
        desc: "Chegar antes da hora certa para ver o desfile dos apóstolos no Orloj. Café na praça depois.",
        link: "https://pt.wikipedia.org/wiki/Rel%C3%B3gio_Astron%C3%B3mico_de_Praga",
        icon: Clock,
        walkTo: "~6 min",
      },
      {
        time: "18:30",
        title: "Ponte Carlos ao pôr do sol",
        desc: "Atravessar devagar, parar nas estátuas, ver o céu virar âmbar sobre o Vltava.",
        link: "https://pt.wikipedia.org/wiki/Ponte_Carlos",
        img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=80",
        imgAlt: "Ponte Carlos em Praga ao pôr do sol",
        icon: Sun,
      },
    ],
  },
  {
    key: "d2",
    label: "Dia 2",
    date: "Quinta, 25",
    title: "Castelo & Malá Strana",
    vibe: "Manhã imperial no Castelo, tarde boémia em Malá Strana com vistas a perder de vista.",
    accent: "from-amber-300/30 to-violet-500/10",
    icon: Castle,
    cover:
      "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&w=1200&q=80",
    highlightTip: "Dica: Apanhar o elétrico 22 até ao castelo para poupar a subida!",
    howToGet: "Como chegar: elétrico 22 até Pražský hrad (~20 min)",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Prague+Castle&daddr=St.+Nicholas+Church+Mala+Strana+to:Lennon+Wall+Prague+to:Petrin+Tower&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Prague+Castle/St.+Nicholas+Church+Mala+Strana/Lennon+Wall+Prague/Petrin+Tower/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:00",
        title: "Castelo de Praga — S. Vito & Beco de Ouro",
        desc: "Catedral primeiro (filas), depois Antigo Palácio Real e a ruela colorida do Beco de Ouro.",
        link: "https://pt.wikipedia.org/wiki/Castelo_de_Praga",
        img: "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&w=1200&q=80",
        imgAlt: "Vitrais interiores da Catedral de São Vito",
        icon: Castle,
        bookingUrl: "https://www.hrad.cz/en",
        hours: "~9:00–17:00",
        walkTo: "~12 min",
      },
      {
        time: "13:00",
        title: "Igreja de São Nicolau (Malá Strana)",
        desc: "Obra-prima barroca. Almoço leve por perto, sem pressas.",
        link: "https://pt.wikipedia.org/wiki/Igreja_de_S%C3%A3o_Nicolau_(Mal%C3%A1_Strana)",
        icon: Church,
        walkTo: "~5 min",
      },
      {
        time: "14:30",
        title: "Muro do Lennon",
        desc: "Parede de mensagens, cores e memória da liberdade. Boa fotografia com os pais.",
        link: "https://pt.wikipedia.org/wiki/Muro_de_Lennon",
        icon: Sparkles,
        walkTo: "~10 min (+ subida ~25–30 min)",
      },
      {
        time: "16:00",
        title: "Torre de Petřín",
        desc: "Subir de elétrico 22 até Pohořelec + caminhada suave pelo parque, ou pelo elevador dentro da torre. (Funicular fechado para obras até ao fim do verão de 2026.)",
        link: "https://pt.wikipedia.org/wiki/Torre_de_Petr%C5%99%C3%ADn",
        icon: Crown,
        hours: "~10:00–22:00",
      },
    ],
  },
  {
    key: "d3",
    label: "Dia 3",
    date: "Sexta, 26",
    title: "Kutná Hora & Noite",
    vibe: "Fuga de comboio à cidade da prata e ossário. À noite, música clássica num verdadeiro templo.",
    accent: "from-rose-500/20 to-amber-400/10",
    icon: Train,
    cover:
      "https://images.unsplash.com/photo-1724426560921-c364a86aa0e9?auto=format&fit=crop&w=1200&q=80",
    howToGet: "Como chegar: comboio de Praha hl.n. (~55 min)",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=St.+Barbara+Cathedral+Kutna+Hora&daddr=Sedlec+Ossuary&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/St.+Barbara+Cathedral+Kutna+Hora/Sedlec+Ossuary/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "08:40",
        title: "Comboio para Kutná Hora",
        desc: "Saída da Hlavní Nádraží. ~1h de viagem confortável, lugares marcados.",
        icon: Train,
        bookingUrl: "https://www.cd.cz/en/",
      },
      {
        time: "10:00",
        title: "Catedral de Santa Bárbara",
        desc: "Joia gótica patrocinada pelos mineiros de prata. Tetos abobadados de cortar a respiração.",
        link: "https://pt.wikipedia.org/wiki/Catedral_de_Santa_B%C3%A1rbara",
        icon: Church,
        bookingUrl: "https://khfarnost.cz/en/",
        hours: "~9:00–18:00",
        walkTo: "Sedlec ↔ centro ~2,5 km — usar autocarro/táxi local",
      },
      {
        time: "12:30",
        title: "Ossário de Sedlec — reservar slot!",
        desc: "Capela revestida com ossos de 40 mil pessoas. Único, sombrio, inesquecível.",
        link: "https://pt.wikipedia.org/wiki/Oss%C3%A1rio_de_Sedlec",
        tip: "Entrada por horários — comprar online com antecedência para evitar fila e ficar sem vaga.",
        img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ossuary_in_Sedlec.JPG?width=1200",
        imgAlt: "Lustre feito de ossos humanos no Ossário de Sedlec",
        icon: AlertTriangle,
        bookingUrl: "https://www.sedlec.info/en/",
        hours: "~9:00–18:00",
        hoursNote: "ENTRADA POR HORÁRIO MARCADO",
      },
      {
        time: "20:00",
        title: "Concerto & Jantar",
        desc: "Voltar a Praga, jantar leve e concerto clássico — ver secção de concertos abaixo.",
        icon: Music,
      },
    ],
  },
  {
    key: "d4",
    label: "Dia 4",
    date: "Sábado, 27",
    title: "Vyšehrad & Partida",
    vibe: "Manhã calma no berço da cidade, almoço sem relógio e saída suave para o aeroporto.",
    accent: "from-emerald-400/20 to-amber-400/10",
    icon: Moon,
    cover:
      "https://images.unsplash.com/photo-1779213206645-e06f91667848?auto=format&fit=crop&w=1200&q=80",
    howToGet: "Como chegar: metro C até Vyšehrad. Vyšehrad plano; regresso de Bolt/Uber.",
    mapEmbedUrl:
      "https://www.google.com/maps?output=embed&saddr=Vysehrad+Prague&daddr=Hotel+Garden+Court+Prague&dirflg=w",
    mapLinkUrl:
      "https://www.google.com/maps/dir/Vysehrad+Prague/Hotel+Garden+Court+Prague/data=!4m2!4m1!3e2",
    stops: [
      {
        time: "09:30",
        title: "Vyšehrad — vistas panorâmicas, sem multidões",
        desc: "Fortaleza, basílica e cemitério dos artistas. Vista do Vltava como num quadro romântico.",
        link: "https://pt.wikipedia.org/wiki/Vy%C5%A1ehrad",
        img: "https://images.unsplash.com/photo-1587539308989-afe8119c4e46?auto=format&fit=crop&w=1200&q=80",
        imgAlt: "Vista panorâmica de Vyšehrad sobre o rio Vltava",
        icon: Crown,
        hours: "Recinto grátis, sempre aberto",
      },
      {
        time: "12:00",
        title: "Almoço com calma",
        desc: "Reservar perto do hotel. Pratos clássicos checos, sem stress de horário.",
        icon: Utensils,
      },
      {
        time: "13:30",
        title: "Passeio leve no centro",
        desc: "Última volta sem objetivos, compras de prendinhas e café numa esplanada.",
        icon: Sparkles,
      },
      {
        time: "16:00",
        title: "Recolher malas e partir para o aeroporto",
        desc: "Bolt/Uber até ao Václav Havel. Sair a tempo, sem corridas.",
        icon: MapPin,
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
          src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=2400&q=80"
          alt="Vista de Praga ao pôr do sol — Ponte Carlos e Castelo"
          className="h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-twilight/40 via-twilight/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.16_0.035_290/0.7)_100%)]" />
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
            24 — 27 · Praga
            <span className="h-px w-8 bg-gold/70" />
          </div>
          <h1 className="font-serif text-6xl leading-[1.05] md:text-8xl">
            <span className="text-gradient-gold">Praga</span>
          </h1>
          <p className="mt-6 font-serif text-xl italic text-cream/85 md:text-2xl">
            4 dias de hora dourada
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Um roteiro pensado em ritmo de conversa: cafés sem pressa, caminhos curtos,
            vistas longas — e o melhor da Boémia.
          </p>
        </motion.div>
      </motion.div>

      <motion.a
        href="#overview"
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-gold"
        aria-label="Descer"
      >
        <div className="flex flex-col items-center gap-2 animate-bounce-soft">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold/80">scroll</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </motion.a>
    </section>
  );
}

// ----------------------- OVERVIEW -----------------------

function Overview() {
  return (
    <Section
      id="overview"
      eyebrow="O Roteiro"
      title="Quatro dias, quatro humores"
      intro="Cada dia tem o seu cenário e a sua cadência. Devagar de manhã, dourado ao fim da tarde."
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
              className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-card backdrop-blur-md transition-shadow hover:shadow-[0_20px_60px_-20px_oklch(0.82_0.14_78/0.4)]"
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
      {/* node */}
      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-twilight shadow-[0_0_0_4px_oklch(0.16_0.035_290),0_0_30px_oklch(0.82_0.14_78/0.25)] md:left-5">
        <Icon className="h-4 w-4 text-gold" />
      </div>

      <div
        className={`w-full rounded-2xl border border-gold/10 bg-card px-6 py-5 text-left transition-all duration-300 hover:border-gold/30 hover:bg-card/80`}
      >
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
            {stop.bookingUrl && (
              <a
                href={stop.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/25 hover:shadow-[0_10px_30px_-10px_oklch(0.82_0.14_78/0.6)]"
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
              <MapPin className="h-3.5 w-3.5 text-gold" />
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

      {day.mapEmbedUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <div className="overflow-hidden rounded-2xl border border-gold/20 shadow-[0_20px_60px_-30px_oklch(0.82_0.14_78/0.5)]">
            <iframe
              src={day.mapEmbedUrl}
              title={`Percurso a pé do ${day.label}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0 md:h-96"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="font-serif text-sm italic text-gold/80">
              Percurso a pé do {day.label}
            </p>
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
      intro="Toca para abrir cada paragem — dicas, mini-histórias e imagens à medida."
    >
      <div className="space-y-24">
        {days.map((d) => (
          <DayBlock key={d.key} day={d} />
        ))}
      </div>
    </Section>
  );
}

// ----------------------- CONCERTS -----------------------

function Concerts() {
  const tiers = [
    {
      name: "Concertos de Turista",
      tag: "Acessível",
      where: "Capela dos Espelhos (Klementinum), igrejas barrocas",
      price: "€ 25 – 35",
      pros: [
        "Edifícios lindíssimos, atmosfera íntima",
        "Programas curtos (~1h), perfeitos para os pais",
        "Bilhetes à porta, sem stress",
      ],
      cons: ["Quartetos pequenos, repertório repetido", "Acústica básica, instrumentos comuns"],
      cta: "Bom para uma noite mágica sem compromissos",
      highlight: false,
      link: "https://pt.wikipedia.org/wiki/Klementinum",
    },
    {
      name: "A Coisa a Sério",
      tag: "Imperdível",
      where: "Rudolfinum · Casa Municipal (Obecní dům)",
      price: "€ 40 – 90",
      pros: [
        "Orquestras nacionais e maestros de topo",
        "Salas históricas com acústica de referência",
        "Programas de Smetana, Dvořák — a alma checa",
      ],
      cons: ["Reservar com semanas de antecedência", "Dress code mais cuidado"],
      cta: "A experiência que se conta no regresso",
      highlight: true,
      link: "https://pt.wikipedia.org/wiki/Rudolfinum",
    },
  ];

  return (
    <Section
      id="concertos"
      eyebrow="Música clássica"
      title="Concertos: básico ou de luxo?"
      intro="Praga vive de música. Vale escolher bem — e reservar com tempo."
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
            <h3 className="mt-3 font-serif text-3xl text-cream">{t.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              <GoldLink href={t.link}>{t.where}</GoldLink>
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

            {t.highlight && (
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.rudolfinum.cz/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/25 hover:shadow-[0_10px_30px_-10px_oklch(0.82_0.14_78/0.6)]"
                >
                  <Ticket className="h-3.5 w-3.5" />
                  Reservar Rudolfinum
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
                <a
                  href="https://www.obecnidum.cz/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/25 hover:shadow-[0_10px_30px_-10px_oklch(0.82_0.14_78/0.6)]"
                >
                  <Ticket className="h-3.5 w-3.5" />
                  Reservar Casa Municipal
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </div>
            )}

            <p className="mt-6 border-t border-gold/15 pt-5 text-sm italic text-cream/80">
              {t.cta}
            </p>

          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ----------------------- FOOD -----------------------

function Food() {
  const restaurants = [
    {
      name: "Lokál (Dlouhá)",
      desc: "Cervejaria checa autêntica, cheia de locais. Pivo de tanque servido à perfeição.",
      link: "https://lokal-dlouha.ambi.cz/en/",
    },
    {
      name: "Naše Maso",
      desc: "Talho-restaurante. Hambúrguer e tártaro de outro mundo. Ao balcão, sem reserva.",
      link: "https://www.nasemaso.cz/en/",
    },
    {
      name: "U Modré Kachničky",
      desc: "Caça e clássicos checos num ambiente decadente-chique. Perfeito para os pais.",
      link: "https://www.umodrekachnicky.cz/en/",
    },
    {
      name: "Café Louvre",
      desc: "Café histórico de 1902 (Kafka passou por cá). Almoços bons, pastelaria melhor.",
      link: "https://cafelouvre.cz/en/",
      img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
      imgAlt: "Interior do Café Louvre em Praga",
    },
  ];

  const dishes = [
    {
      name: "Svíčková",
      desc: "Vitela em molho de raízes, natas e arando. O abraço da cozinha checa.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Sv%C3%AD%C4%8Dkov%C3%A1%20na%20smetan%C4%9B.JPG?width=1200",
      imgAlt: "Svíčková — prato tradicional checo",
    },
    {
      name: "Guláš + knedlíky",
      desc: "Goulash de carne com 'pão cozido a vapor' para mergulhar no molho.",
    },
    {
      name: "Tankové pivo",
      desc: "Cerveja não pasteurizada, servida do tanque. Procurar o autocolante 'Tank'.",
      icon: Wine,
    },
  ];

  return (
    <Section
      id="comer"
      eyebrow="À mesa"
      title="Comer e beber em Praga"
      intro="Pouca novidade, muita autenticidade. E uma armadilha turística para fugir."
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
            {r.img && (
              <div className="relative h-40 overflow-hidden">
                <img
                  src={r.img}
                  alt={r.imgAlt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2 text-gold">
                <Utensils className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.25em]">Restaurante</span>
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
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="overflow-hidden rounded-2xl border border-gold/15 bg-card"
            >
              {d.img && (
                <img src={d.img} alt={d.imgAlt} className="h-44 w-full object-cover" />
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
          <div className="font-serif text-lg text-cream">
            Atenção: o "Trdelník" não é checo
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            O famoso bolo em forma de chaminé é uma invenção recente para turistas — bonito de
            fotografar, mas nada tradicional. Se quiser doce, prefira{" "}
            <span className="text-cream">koláč</span> ou{" "}
            <span className="text-cream">medovník</span>.
          </p>
        </div>
      </motion.div>
    </Section>
  );
}

// ----------------------- TIPS & TRAPS -----------------------

function Tips() {
  const doIt = [
    "Pagar sempre em CZK (coroas) — recusar 'pagar em euros'.",
    "Levantar dinheiro em ATMs de bancos (ČSOB, KB, Air Bank).",
    "Validar bilhetes do elétrico/metro logo à entrada.",
    "Reservar Castelo, Ossário e concertos online.",
    "Caminhar devagar — a calçada de Praga é traiçoeira.",
  ];
  const dont = [
    "Evitar caixas multibanco Euronet — câmbio péssimo.",
    "Não comprar 'Old Prague Ham' ao peso (preço por 100g, choque na conta).",
    "Não trocar dinheiro na rua nem em casas com 'No Commission'.",
    "Evitar restaurantes na Praça da Cidade Velha — turísticos e caros.",
    "Não fotografar Trdelník como se fosse típico 😉",
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
  const booked = ["Voos (ida e volta)", "Hotel Garden Court — 4 noites", "Castelo de Praga", "Bairro Judeu (Josefov)"];
  const todo = ["Ossário de Sedlec — slot horário", "Concerto no Rudolfinum / Casa Municipal", "Comboio Praga ↔ Kutná Hora", "Mesa em U Modré Kachničky"];

  return (
    <Section
      id="checklist"
      eyebrow="Antes de partir"
      title="Checklist prático"
      intro="O que já está tratado — e o que ainda pede atenção."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gold/20 bg-card p-7">
          <h3 className="mb-5 font-serif text-2xl text-cream">Já reservado</h3>
          <ul className="space-y-3">
            {booked.map((b) => (
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

        <div className="rounded-2xl border border-terracotta/40 bg-gradient-to-br from-terracotta/10 to-transparent p-7">
          <h3 className="mb-5 font-serif text-2xl text-cream">Por reservar</h3>
          <ul className="space-y-3">
            {todo.map((b) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-cream/90"
              >
                <Circle className="h-5 w-5 flex-shrink-0 text-terracotta" />
                <span className="text-sm md:text-base">{b}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

// ----------------------- FOOTER -----------------------

function Footer() {
  return (
    <footer className="border-t border-gold/15 px-6 py-16 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="font-serif text-3xl text-gradient-gold md:text-4xl">
          Na zdraví — à vossa.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Praga, 24–27. Roteiro com pais, à medida da hora dourada.
        </p>
      </div>
    </footer>
  );
}

// ----------------------- INDEX -----------------------

function Index() {
  return (
    <main className="bg-twilight-radial min-h-screen overflow-x-hidden">
      <Hero />
      <EssentialInfo />
      <Overview />
      <Itineraries />
      <Concerts />
      <Food />
      <Tips />
      <Checklist />
      <Footer />
    </main>
  );
}

// ----------------------- ESSENTIAL INFO -----------------------

const essentials = [
  {
    icon: Clock,
    title: "Fuso horário",
    body: "CET (UTC+1). Praga está 1 hora à frente de Lisboa.",
  },
  {
    icon: Coins,
    title: "Moeda",
    body: "Coroa checa (CZK). ~25 CZK ≈ 1 €. Cartão aceite quase em todo o lado — para levantar, preferir ATMs de banco (evitar Euronet).",
  },
  {
    icon: Plug,
    title: "Tomadas",
    body: "Tipo E, 230 V / 50 Hz. As fichas portuguesas encaixam sem adaptador.",
  },
  {
    icon: Phone,
    title: "Emergência",
    body: "112 (geral europeu). Levar Cartão Europeu de Seguro de Doença.",
  },
  {
    icon: Train,
    title: "Transportes",
    body: "Bilhete 24 h ~120 CZK cobre metro, eléctrico e autocarro. Do aeroporto: bus 119 + metro A (verde).",
  },
  {
    icon: HandCoins,
    title: "Gorjetas",
    body: "10 % em restaurantes se o serviço não estiver incluído. Arredondar em táxis e cafés.",
  },
];

const phrases = [
  ["Olá", "Dobrý den"],
  ["Obrigado", "Děkuji"],
  ["Por favor", "Prosím"],
  ["Sim / Não", "Ano / Ne"],
  ["Saúde (brinde)", "Na zdraví"],
  ["Quanto custa?", "Kolik to stojí?"],
];

function EssentialInfo() {
  return (
    <Section
      id="essencial"
      eyebrow="Antes de partir"
      title="Essencial para a viagem"
      intro="O básico para chegar leve: fuso, dinheiro, transporte e um punhado de palavras checas para abrir portas (e sorrisos)."
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
          <Languages className="h-5 w-5 text-gold" />
          <h3 className="font-serif text-2xl text-cream">Palavras úteis</h3>
        </div>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {phrases.map(([pt, cz]) => (
            <li key={pt} className="flex items-baseline justify-between gap-3 border-b border-gold/10 pb-2">
              <span className="text-sm text-muted-foreground">{pt}</span>
              <span className="font-serif text-lg italic text-gold">{cz}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}

