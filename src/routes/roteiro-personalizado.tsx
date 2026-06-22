import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdqnrlg";

const searchSchema = z.object({
  destino: z.string().optional(),
});

export const Route = createFileRoute("/roteiro-personalizado")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Roteiro personalizado | O Postal" },
      {
        name: "description",
        content:
          "Um roteiro de viagem desenhado ao teu ritmo, com as tuas datas e os teus interesses. Para cidades testadas no terreno ou destinos por curadoria digital.",
      },
      { property: "og:title", content: "Roteiro personalizado | O Postal" },
      {
        property: "og:description",
        content:
          "Um roteiro de viagem desenhado ao teu ritmo, com as tuas datas e os teus interesses. Para cidades testadas no terreno ou destinos por curadoria digital.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://opostal.pt/roteiro-personalizado" },
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/roteiro-personalizado" }],
  }),
  component: RoteiroPersonalizadoPage,
});

function scrollToForm() {
  document.getElementById("pedir")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function RoteiroPersonalizadoPage() {
  return (
    <main className="bg-twilight-radial min-h-screen overflow-x-hidden">
      <SiteNav />
      <Hero />
      <WhatIs />
      <Comparison />
      <DifferenceNote />
      <HowItWorks />
      <RequestForm />
      <Faq />
      <ClosingCTA />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative px-6 pt-40 pb-20 md:pt-48 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-gold">
          Roteiro personalizado
        </p>
        <h1
          className="text-gradient-gold font-serif leading-[1.05]"
          style={{ fontSize: "clamp(2.2rem, 4.6vw, 4rem)" }}
        >
          Um roteiro só teu, ao teu ritmo.
        </h1>
        <div className="my-7 mx-auto h-px w-28 bg-gold/70" />
        <p className="mx-auto max-w-2xl text-base text-cream/85 md:text-lg leading-relaxed">
          Os guias gratuitos servem muita viagem. Quando quiseres algo desenhado à tua medida, com as tuas datas, o teu ritmo e o que mais gostas de fazer, preparo um roteiro só para ti.
        </p>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={scrollToForm}
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[12px] uppercase tracking-[0.25em] text-[oklch(0.18_0.04_285)] shadow-[0_18px_40px_-18px_rgba(200,119,46,0.7)] transition-all hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Preencher pedido
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}

function WhatIs() {
  return (
    <section className="relative px-6 py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl"
      >
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">À tua medida</p>
        <h2 className="font-serif text-3xl text-cream md:text-4xl">
          O que é um roteiro personalizado?
        </h2>
        <p className="mt-5 text-cream/80 leading-relaxed">
          Há dois caminhos, conforme o destino. Para as cidades que já percorri pessoalmente, faço um roteiro com base em experiência direta no terreno. Para destinos que ainda não visitei, faço uma curadoria cuidada a partir de fontes atualizadas. Digo-te sempre, com clareza, qual é o caso.
        </p>
      </motion.div>
    </section>
  );
}

function Comparison() {
  const cards = [
    {
      tag: "Testado no terreno",
      title: "Roteiro Personalizado O Postal",
      rows: [
        ["Destinos", "Cidades do catálogo, percorridas a pé por mim."],
        ["Base de trabalho", "Experiência presencial e notas tiradas no terreno."],
        ["Detalhe local", "Muito elevado, do que se vê e do que se evita."],
        ["Preço", "A partir de 34,90 €"],
        ["Para quem é", "Para quem quer a confiança de um roteiro já vivido."],
      ],
    },
    {
      tag: "Curadoria digital",
      title: "Roteiro Digital Curado",
      rows: [
        ["Destinos", "Destinos fora do catálogo, que ainda não visitei."],
        ["Base de trabalho", "Pesquisa cuidada em fontes atualizadas: mapas, fóruns, guias e sites oficiais."],
        ["Detalhe local", "Elevado, com o mesmo critério editorial, mas sem validação presencial."],
        ["Preço", "A partir de 19,90 €"],
        ["Para quem é", "Para quem quer um plano bem pensado para um destino novo."],
      ],
    },
  ];
  return (
    <section className="relative px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-gold/15 bg-plum/40 p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)] transition-colors hover:border-gold/30"
            >
              <span className="mb-4 inline-flex w-fit items-center rounded-full border border-gold/30 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.22em] text-gold/85">
                {c.tag}
              </span>
              <h3 className="font-serif text-2xl text-cream md:text-3xl">{c.title}</h3>
              <dl className="mt-6 space-y-4">
                {c.rows.map(([k, v]) => (
                  <div key={k} className="border-t border-gold/10 pt-3">
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-gold/80">{k}</dt>
                    <dd className="mt-1 text-cream/80 leading-relaxed">{v}</dd>
                  </div>
                ))}
              </dl>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferenceNote() {
  return (
    <section className="relative px-6 py-10 md:py-14">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-2xl text-center font-serif italic text-cream/75 leading-relaxed"
      >
        A diferença é simples e digo-a sem rodeios: um nasce de eu ter estado lá, o outro de pesquisa séria sobre um sítio onde ainda não estive. Os dois são feitos com cuidado. Só não te quero vender um pelo outro.
      </motion.p>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Envias o pedido", d: "Dizes-me o destino, as datas e o que mais gostas de fazer em viagem." },
    { n: "02", t: "Analiso o pedido", d: "Confirmo qual o tipo de roteiro mais indicado e falo contigo se precisar de algum detalhe." },
    { n: "03", t: "Recebes o teu roteiro", d: "Um plano com mapa, sugestões, tempos e contexto, pronto a seguir." },
    { n: "04", t: "Ajusto se precisares", d: "Uma revisão pontual antes da viagem, se alguma coisa mudar." },
  ];
  return (
    <section className="relative px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 max-w-2xl"
        >
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">Processo</p>
          <h2 className="font-serif text-3xl text-cream md:text-4xl">Como funciona</h2>
        </motion.div>
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-2xl border border-gold/10 bg-plum/25 p-6 transition-colors hover:border-gold/25"
            >
              <p className="font-serif text-3xl text-gold/80">{s.n}</p>
              <h3 className="mt-3 font-serif text-xl text-cream">{s.t}</h3>
              <p className="mt-2 text-cream/75 leading-relaxed">{s.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

type FormState = {
  destino: string;
  datas: string;
  dias: string;
  pessoas: string;
  orcamento: string;
  ritmo: string;
  interesses: string;
  restricoes: string;
  alojamento: string;
  partida: string;
  observacoes: string;
  email: string;
};

const EMPTY_FORM: FormState = {
  destino: "",
  datas: "",
  dias: "",
  pessoas: "",
  orcamento: "",
  ritmo: "",
  interesses: "",
  restricoes: "",
  alojamento: "",
  partida: "",
  observacoes: "",
  email: "",
};

const inputCls =
  "w-full rounded-md border border-gold/20 bg-plum/30 px-3 py-2.5 text-cream placeholder:text-cream/35 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40";
const labelCls = "block text-[11px] uppercase tracking-[0.2em] text-cream/70";
const helpCls = "mt-1 text-[11px] text-cream/50";
const errCls = "border-red-400/70 focus:border-red-400 focus:ring-red-400/40";

type RequiredKey =
  | "destino"
  | "datas"
  | "dias"
  | "pessoas"
  | "orcamento"
  | "ritmo"
  | "alojamento"
  | "email";

const REQUIRED_LABELS: Record<RequiredKey, string> = {
  destino: "Destino",
  datas: "Datas da viagem",
  dias: "Número de dias",
  pessoas: "Número de pessoas",
  orcamento: "Orçamento aproximado",
  ritmo: "Ritmo de viagem",
  alojamento: "Tipo de alojamento preferido",
  email: "Email",
};

function RequestForm() {
  const search = Route.useSearch();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [missingFields, setMissingFields] = useState<RequiredKey[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [dateMode, setDateMode] = useState<"exact" | "month">("exact");
  const [monthValue, setMonthValue] = useState<string>("");
  const [weekendsOnly, setWeekendsOnly] = useState<boolean>(false);

  const monthOptions = (() => {
    const opts: string[] = [];
    const now = new Date();
    for (let i = 0; i < 18; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const label = format(d, "LLLL yyyy", { locale: pt });
      opts.push(label.charAt(0).toUpperCase() + label.slice(1));
    }
    return opts;
  })();

  useEffect(() => {
    if (search.destino) {
      setForm((f) => ({ ...f, destino: search.destino }));
    }
  }, [search.destino]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (typeof v === "string" && v.trim()) {
      setMissingFields((prev) => prev.filter((key) => key !== (k as unknown as RequiredKey)));
    }
  };

  const missing = (k: RequiredKey) => missingFields.includes(k);
  const fieldCls = (k: RequiredKey) => (missing(k) ? errCls : "");

  const formatRange = (r: DateRange | undefined) => {
    if (!r?.from) return "";
    const f = format(r.from, "dd/MM/yyyy", { locale: pt });
    if (!r.to) return f;
    return `${f} – ${format(r.to, "dd/MM/yyyy", { locale: pt })}`;
  };

  const composeDatas = (
    mode: "exact" | "month",
    range: DateRange | undefined,
    month: string,
    weekends: boolean,
  ) => {
    let base = "";
    if (mode === "exact") {
      base = formatRange(range);
    } else if (mode === "month" && month) {
      base = `Mês flexível: ${month}`;
    }
    if (!base) return "";
    return weekends ? `${base} · Apenas fins de semana` : base;
  };

  const handleDateSelect = (r: DateRange | undefined) => {
    setDateRange(r);
    set("datas", composeDatas("exact", r, monthValue, weekendsOnly));
  };

  const handleModeChange = (m: "exact" | "month") => {
    setDateMode(m);
    if (m === "exact") {
      setMonthValue("");
      set("datas", composeDatas("exact", dateRange, "", weekendsOnly));
    } else {
      setDateRange(undefined);
      set("datas", composeDatas("month", undefined, monthValue, weekendsOnly));
    }
  };

  const handleMonthChange = (m: string) => {
    setMonthValue(m);
    set("datas", composeDatas("month", undefined, m, weekendsOnly));
  };

  const handleWeekendsChange = (v: boolean) => {
    setWeekendsOnly(v);
    set("datas", composeDatas(dateMode, dateRange, monthValue, v));
  };

  const handleSubmit = async () => {
    const required: RequiredKey[] = [
      "destino",
      "datas",
      "dias",
      "pessoas",
      "orcamento",
      "ritmo",
      "alojamento",
      "email",
    ];
    const missingNow = required.filter((k) => !form[k].trim());
    if (missingNow.length > 0) {
      setMissingFields(missingNow);
      setStatus("idle");
      return;
    }
    setMissingFields([]);
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Destino: form.destino,
          "Datas da viagem": form.datas,
          "Número de dias": form.dias,
          "Número de pessoas": form.pessoas,
          "Orçamento aproximado": form.orcamento,
          "Ritmo de viagem": form.ritmo,
          Interesses: form.interesses,
          "Restrições alimentares": form.restricoes,
          "Tipo de alojamento preferido": form.alojamento,
          "Ponto de partida": form.partida,
          "Observações adicionais": form.observacoes,
          Email: form.email,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="pedir" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">Pedido</p>
          <h2 className="font-serif text-3xl text-cream md:text-4xl">Pedir o meu roteiro</h2>
          <p className="mt-4 text-cream/75 leading-relaxed">
            Conta-me o essencial. Respondo a cada pedido pessoalmente.
          </p>
        </motion.div>

        {status === "success" ? (
          <div className="glass rounded-2xl border border-gold/20 px-8 py-10 text-center">
            <h3 className="font-serif text-2xl text-cream md:text-3xl">Pedido recebido.</h3>
            <p className="mt-4 text-cream/80 leading-relaxed">
              Obrigado. Vou analisar o teu pedido e respondo pessoalmente para o email que indicaste. Até já.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-gold/15 bg-plum/30 p-6 md:p-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="f-destino" className={labelCls}>Destino</label>
                <input id="f-destino" required className={`${inputCls} mt-2`} value={form.destino} onChange={(e) => set("destino", e.target.value)} />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="f-datemode" className={labelCls}>Tipo de datas</label>
                  <select
                    id="f-datemode"
                    className={`${inputCls} mt-2`}
                    value={dateMode}
                    onChange={(e) => handleModeChange(e.target.value as "exact" | "month")}
                  >
                    <option value="exact">Datas exatas</option>
                    <option value="month">Datas flexíveis (mês)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="f-datas" className={labelCls}>
                    {dateMode === "exact" ? "Datas da viagem" : "Mês da viagem"}
                  </label>
                  {dateMode === "exact" ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          id="f-datas"
                          className={cn(
                            `${inputCls} mt-2 flex items-center justify-between text-left`,
                            !dateRange?.from && "text-cream/35",
                          )}
                        >
                          <span>{formatRange(dateRange) || "Selecionar datas"}</span>
                          <CalendarIcon className="h-4 w-4 text-cream/60" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={handleDateSelect}
                          numberOfMonths={2}
                          locale={pt}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <select
                      id="f-datas"
                      className={`${inputCls} mt-2`}
                      value={monthValue}
                      onChange={(e) => handleMonthChange(e.target.value)}
                    >
                      <option value="">Selecionar mês</option>
                      {monthOptions.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <Checkbox
                    id="f-weekends"
                    checked={weekendsOnly}
                    onCheckedChange={(v) => handleWeekendsChange(v === true)}
                  />
                  <label htmlFor="f-weekends" className="text-sm text-cream/80 cursor-pointer">
                    Apenas viagens ao fim de semana
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="f-dias" className={labelCls}>Número de dias</label>
                <input id="f-dias" type="number" min={1} required className={`${inputCls} mt-2`} value={form.dias} onChange={(e) => set("dias", e.target.value)} />
              </div>
              <div>
                <label htmlFor="f-pessoas" className={labelCls}>Número de pessoas</label>
                <input id="f-pessoas" type="number" min={1} required className={`${inputCls} mt-2`} value={form.pessoas} onChange={(e) => set("pessoas", e.target.value)} />
              </div>
              <div>
                <label htmlFor="f-orcamento" className={labelCls}>Orçamento aproximado</label>
                <select id="f-orcamento" className={`${inputCls} mt-2`} value={form.orcamento} onChange={(e) => set("orcamento", e.target.value)}>
                  <option value=""></option>
                  <option value="Até 250 €">Até 250 €</option>
                  <option value="250 € – 500 €">250 € – 500 €</option>
                  <option value="500 € – 750 €">500 € – 750 €</option>
                  <option value="750 € – 1000 €">750 € – 1000 €</option>
                  <option value="1000 € – 1500 €">1000 € – 1500 €</option>
                  <option value="1500 € – 2500 €">1500 € – 2500 €</option>
                  <option value="Mais de 2500 €">Mais de 2500 €</option>
                  <option value="Sem orçamento definido">Sem orçamento definido</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="f-ritmo" className={labelCls}>Ritmo de viagem</label>
                <select id="f-ritmo" required className={`${inputCls} mt-2`} value={form.ritmo} onChange={(e) => set("ritmo", e.target.value)}>
                  <option value="" disabled></option>
                  <option value="Lento">Lento</option>
                  <option value="Intermédio">Intermédio</option>
                  <option value="Intenso">Intenso</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="f-interesses" className={labelCls}>Interesses</label>
                <textarea id="f-interesses" rows={3} className={`${inputCls} mt-2`} value={form.interesses} onChange={(e) => set("interesses", e.target.value)} />
                <p className={helpCls}>Por exemplo: comida, museus, música, natureza, miradouros.</p>
              </div>
              <div>
                <label htmlFor="f-restricoes" className={labelCls}>Restrições alimentares</label>
                <input id="f-restricoes" className={`${inputCls} mt-2`} value={form.restricoes} onChange={(e) => set("restricoes", e.target.value)} />
              </div>
              <div>
                <label htmlFor="f-alojamento" className={labelCls}>Tipo de alojamento preferido</label>
                <select id="f-alojamento" className={`${inputCls} mt-2`} value={form.alojamento} onChange={(e) => set("alojamento", e.target.value)}>
                  <option value=""></option>
                  <option value="Hotel">Hotel</option>
                  <option value="Apartamento / Airbnb">Apartamento / Airbnb</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Boutique / Charme">Boutique / Charme</option>
                  <option value="Resort">Resort</option>
                  <option value="Sem preferência">Sem preferência</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="f-partida" className={labelCls}>Ponto de partida</label>
                <input id="f-partida" className={`${inputCls} mt-2`} value={form.partida} onChange={(e) => set("partida", e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="f-obs" className={labelCls}>Observações adicionais</label>
                <textarea id="f-obs" rows={3} className={`${inputCls} mt-2`} value={form.observacoes} onChange={(e) => set("observacoes", e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="f-email" className={labelCls}>O teu email</label>
                <input id="f-email" type="email" required className={`${inputCls} mt-2`} value={form.email} onChange={(e) => set("email", e.target.value)} />
                <p className={helpCls}>É para aqui que respondo ao teu pedido.</p>
              </div>
            </div>

            {status === "error" && (
              <p className="mt-6 rounded-md border border-gold/30 bg-gold/[0.06] px-4 py-3 text-sm text-cream/85">
                Não consegui enviar o pedido. Verifica os dados e tenta novamente, ou escreve diretamente para contacto@opostal.pt.
              </p>
            )}

            {(() => {
              const hasExact = dateMode === "exact" && dateRange?.from;
              const hasMonth = dateMode === "month" && monthValue;
              const hasOrcamento = !!form.orcamento;
              const hasAlojamento = !!form.alojamento;
              if (!hasExact && !hasMonth && !hasOrcamento && !hasAlojamento) return null;
              const modeLabel = dateMode === "exact" ? "Datas exatas" : "Mês flexível";
              let value = "";
              if (dateMode === "exact") {
                value = formatRange(dateRange) || "Seleciona uma data de início";
              } else {
                value = monthValue || "Seleciona um mês";
              }
              return (
                <div className="mt-6 rounded-xl border border-gold/15 bg-plum/40 px-5 py-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80">Resumo do pedido</p>
                  <div className="mt-3 space-y-1.5 text-cream/85">
                    {(hasExact || hasMonth) && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-sm text-cream/65">{modeLabel}:</span>
                        <span className="font-serif text-base text-cream">{value}</span>
                        {weekendsOnly && (
                          <span className="inline-flex items-center rounded-full border border-gold/30 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.22em] text-gold">
                            Apenas fins de semana
                          </span>
                        )}
                      </div>
                    )}
                    {hasOrcamento && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-sm text-cream/65">Orçamento:</span>
                        <span className="font-serif text-base text-cream">{form.orcamento}</span>
                      </div>
                    )}
                    {hasAlojamento && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-sm text-cream/65">Alojamento:</span>
                        <span className="font-serif text-base text-cream">{form.alojamento}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "submitting"}
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[12px] uppercase tracking-[0.25em] text-[oklch(0.18_0.04_285)] shadow-[0_18px_40px_-18px_rgba(200,119,46,0.7)] transition-all hover:bg-gold-soft disabled:opacity-60"
              >
                Enviar pedido
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const FAQS: { q: string; a: string }[] = [
  {
    q: "Quanto tempo demora a receber o roteiro?",
    a: "Depende do destino e da época, mas respondo a cada pedido pessoalmente e combino contigo um prazo logo no início.",
  },
  {
    q: "O que está incluído no roteiro?",
    a: "Um plano organizado com sugestões, tempos, percursos e contexto, pensado para as tuas datas e o teu ritmo. Mapa incluído.",
  },
  {
    q: "Qual é a diferença entre os dois tipos de roteiro?",
    a: "O Roteiro Personalizado O Postal é para cidades que percorri a pé. O Roteiro Digital Curado é para destinos que ainda não visitei, feito com pesquisa cuidada. Digo-te sempre qual é o caso.",
  },
  {
    q: "E se precisar de mudar alguma coisa depois?",
    a: "Está prevista uma revisão pontual antes da viagem, caso as tuas datas ou planos mudem.",
  },
  {
    q: "Como faço o pagamento?",
    a: "Depois de receber o teu pedido, confirmo o tipo de roteiro e explico o passo seguinte por email.",
  },
];

function Faq() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">FAQ</p>
          <h2 className="font-serif text-3xl text-cream md:text-4xl">Perguntas frequentes</h2>
        </motion.div>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`} className="border-b border-gold/10">
              <AccordionTrigger className="text-left font-serif text-lg text-cream hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-cream/75 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative px-6 pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="glass mx-auto max-w-3xl rounded-2xl border border-gold/20 px-8 py-10 text-center"
      >
        <h2 className="font-serif text-2xl text-cream md:text-3xl">
          Pronto para um roteiro só teu?
        </h2>
        <button
          type="button"
          onClick={scrollToForm}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:border-gold/70 hover:bg-gold/[0.08]"
        >
          Preencher pedido
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    </section>
  );
}