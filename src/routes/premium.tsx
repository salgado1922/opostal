import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StripeEmbeddedCheckoutBundle } from "@/components/StripeEmbeddedCheckout";
import { useMyAccess } from "@/hooks/use-auth";
import { CITIES } from "@/data/cities";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: "Desbloquear roteiros | O Postal" },
      {
        name: "description",
        content:
          "Como funciona o acesso aos roteiros premium do O Postal: compra única, sem subscrições. Saiba o que é gratuito, o que desbloqueia e as opções de pacote.",
      },
      { property: "og:title", content: "Desbloquear roteiros | O Postal" },
      {
        property: "og:description",
        content:
          "Como funciona o acesso aos roteiros premium do O Postal: compra única, sem subscrições.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://opostal.pt/premium" },
      { property: "og:image", content: `https://opostal.pt${opostalHorizontalTransparent.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Desbloquear roteiros | O Postal" },
      {
        name: "twitter:description",
        content:
          "Como funciona o acesso aos roteiros premium do O Postal: compra única, sem subscrições.",
      },
      { name: "twitter:image", content: `https://opostal.pt${opostalHorizontalTransparent.url}` },
    ],
    links: [{ rel: "canonical", href: "https://opostal.pt/premium" }],
  }),
  component: PremiumPage,
});

type Bundle = 1 | 2 | 3;

const BUNDLES: { value: Bundle; name: string; price: string; note: string }[] = [
  { value: 1, name: "1 guia", price: "7,90 €", note: "Acesso completo a um guia à sua escolha." },
  { value: 2, name: "2 guias", price: "14,90 €", note: "Acesso completo a dois guias, quando quiser." },
  { value: 3, name: "3 guias", price: "18,90 €", note: "Acesso completo a três guias, quando quiser." },
];

function PremiumPage() {
  return (
    <main id="top" className="bg-twilight-radial min-h-screen overflow-x-hidden">
      <SimpleNav />
      <Hero />
      <FreeSection />
      <UnlocksSection />
      <HowItWorks />
      <Bundles />
      <WhyWorthIt />
      <Faq />
      <ClosingCta />
      <SimpleFooter />
    </main>
  );
}

function SimpleNav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/" aria-label="O Postal" className="inline-flex items-center">
          <img
            src={opostalHorizontalTransparent.url}
            alt="O Postal"
            className="h-8 w-auto object-contain md:h-10"
          />
        </Link>
        <Link
          to="/conta"
          aria-label="A minha conta"
          className="inline-flex items-center text-cream/70 transition-colors hover:text-cream"
        >
          <User className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="px-6 pt-40 pb-20 md:px-12 md:pt-48 md:pb-28">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-8 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold/80">
          <span className="h-px w-10 bg-gold/30" />
          <span>O Postal · Premium</span>
          <span className="h-px w-10 bg-gold/30" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-5xl leading-tight md:text-6xl"
        >
          Desbloquear roteiros
        </motion.h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
          Os nossos guias são gratuitos para explorar e inspirar. Quando quiser passar à parte
          prática, desbloqueia o itinerário completo com uma compra única — sem subscrições, sem
          mensalidades.
        </p>
      </div>
    </header>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        {eyebrow && (
          <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold/80">{eyebrow}</div>
        )}
        <h2 className="font-serif text-3xl leading-tight md:text-4xl">{title}</h2>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-cream/80 md:text-lg">
          {children}
        </div>
      </div>
    </section>
  );
}

function FreeSection() {
  return (
    <Section eyebrow="Sempre aberto" title="O que é gratuito">
      <p>
        Tudo o que ajuda a decidir para onde ir continua aberto e sempre disponível: a introdução
        ao destino, porquê visitar, quando ir, os bairros e zonas, as dicas essenciais e todo o
        conteúdo editorial de inspiração. Pode ler, voltar quantas vezes quiser e partilhar, sem
        criar conta e sem pagar nada.
      </p>
      <p>
        Esta parte existe para o ajudar a descobrir uma cidade com calma, antes de decidir se
        quer ou não avançar para o roteiro detalhado.
      </p>
    </Section>
  );
}

function UnlocksSection() {
  return (
    <Section eyebrow="Conteúdo premium" title="O que desbloqueia">
      <p>
        Com a compra, abre-se a parte prática do guia: o itinerário detalhado dia a dia, com os
        percursos, os horários, as reservas a fazer e as escolhas já tomadas por si. Inclui
        também o vídeo do guia e os recursos práticos de planeamento.
      </p>
      <ul className="space-y-2.5 pt-2">
        {[
          "Itinerário detalhado, dia a dia",
          "Vídeo do guia, com a cidade vista por dentro",
          "Recursos práticos: mapas, listas, reservas",
          "Acesso permanente, sem subscrição",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-[0.65em] inline-block h-[3px] w-[3px] rounded-full bg-gold/70"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Escolhe o pacote",
      body: "Um, dois ou três guias. Paga uma única vez, no momento, com cartão.",
    },
    {
      title: "Desbloqueia o primeiro guia",
      body: "Assim que a compra é confirmada, o itinerário completo abre-se logo nesse guia.",
    },
    {
      title: "Usa os créditos quando quiser",
      body: "Se escolheu mais do que um guia, os restantes ficam disponíveis na sua conta, prontos a usar em qualquer altura.",
    },
  ];
  return (
    <section className="px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold/80">Sem subscrição</div>
        <h2 className="font-serif text-3xl leading-tight md:text-4xl">Como funciona</h2>
        <ol className="mt-10 space-y-8">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-5">
              <span className="font-serif text-2xl text-gold/80 tabular-nums md:text-3xl">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-serif text-xl leading-snug md:text-2xl">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-cream/75 md:text-lg">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Bundles() {
  const { data } = useMyAccess();
  const signedIn = !!(data && data.signedIn);
  const navigate = useNavigate();
  const [bundle, setBundle] = useState<Bundle>(2);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const readyCities = CITIES.filter((c) => c.status === "ready");
  const [slug, setSlug] = useState<string>(readyCities[0]?.slug ?? "florenca");
  const [error, setError] = useState<string | null>(null);

  const onBuy = () => {
    if (!slug) {
      setError("Escolha o primeiro guia a desbloquear.");
      return;
    }
    setError(null);
    if (!signedIn) {
      navigate({ to: "/auth", search: { redirect: "/premium" } });
      return;
    }
    setCheckoutOpen(true);
  };

  return (
    <section className="px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold/80">Compra única</div>
        <h2 className="font-serif text-3xl leading-tight md:text-4xl">Opções de acesso</h2>
        <p className="mt-5 text-base leading-relaxed text-cream/80 md:text-lg">
          Três opções simples, sem mensalidades. Pode começar por um guia e voltar depois, ou
          escolher um pacote para guardar guias para futuras viagens.
        </p>

        <fieldset className="mt-10 space-y-3">
          <legend className="sr-only">Escolha um pacote</legend>
          {BUNDLES.map((b) => {
            const selected = bundle === b.value;
            const emphasised = b.value === 2;
            return (
              <label
                key={b.value}
                className={`flex cursor-pointer items-start gap-4 rounded-lg border px-5 py-4 transition-colors ${
                  selected
                    ? "border-gold/60 bg-gold/[0.06]"
                    : emphasised
                      ? "border-gold/30 hover:border-gold/50"
                      : "border-gold/15 hover:border-gold/30"
                }`}
              >
                <input
                  type="radio"
                  name="premium-bundle"
                  value={b.value}
                  checked={selected}
                  onChange={() => setBundle(b.value)}
                  className="mt-1.5 h-4 w-4 accent-[color:var(--color-gold,#c8a85a)]"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="font-serif text-lg text-cream md:text-xl">{b.name}</span>
                    <span className="text-sm tabular-nums text-cream/85 md:text-base">{b.price}</span>
                  </div>
                  <p className="mt-1 text-sm text-cream/65">{b.note}</p>
                </div>
              </label>
            );
          })}
        </fieldset>

        <div className="mt-8">
          <label htmlFor="initial-guide" className="block text-[10px] uppercase tracking-[0.3em] text-gold/80">
            Primeiro guia a desbloquear
          </label>
          <select
            id="initial-guide"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-3 w-full rounded-md border border-gold/20 bg-background/60 px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/50"
          >
            {readyCities.map((c) => (
              <option key={c.slug} value={c.slug} className="bg-background text-cream">
                {c.name} — {c.country}
              </option>
            ))}
          </select>
          {bundle > 1 && (
            <p className="mt-2 text-xs text-cream/55">
              Os restantes {bundle - 1} {bundle - 1 === 1 ? "guia fica como crédito" : "guias ficam como créditos"} na sua conta, para escolher quando quiser.
            </p>
          )}
          {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <button
            type="button"
            onClick={onBuy}
            className="inline-flex w-full items-center justify-center rounded-md bg-gold px-6 py-3.5 text-sm font-medium tracking-wide text-background transition-opacity hover:opacity-90 sm:w-auto sm:self-start"
          >
            Comprar acesso
          </button>
          {!signedIn ? (
            <Link
              to="/auth"
              search={{ redirect: "/premium" }}
              className="text-sm text-cream/60 underline-offset-4 hover:text-cream/90 hover:underline"
            >
              Já comprou? Inicie sessão para desbloquear.
            </Link>
          ) : (
            <Link
              to="/conta"
              className="text-sm text-cream/60 underline-offset-4 hover:text-cream/90 hover:underline"
            >
              Ver a minha conta
            </Link>
          )}
        </div>
      </div>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col overflow-hidden p-0">
          <DialogHeader className="shrink-0 border-b border-gold/15 px-6 py-4">
            <DialogTitle className="font-serif text-2xl">Finalizar compra</DialogTitle>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2 sm:px-4">
            {checkoutOpen && <StripeEmbeddedCheckoutBundle bundle={bundle} slug={slug} />}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function WhyWorthIt() {
  return (
    <Section eyebrow="Honestamente" title="Porque vale a pena">
      <p>
        Planear uma cidade nova leva tempo: horários, bilhetes, distâncias, ordem das visitas,
        onde comer sem desilusões. Estes roteiros poupam-lhe essa parte. São o resultado de
        muitas horas no terreno, com as escolhas feitas, testadas e organizadas para seguir.
      </p>
      <ul className="space-y-2.5 pt-2">
        {[
          "Poupa o tempo de pesquisa, dispersão e dúvidas.",
          "Itinerário curado, com ritmo realista e pausas pensadas.",
          "Pronto a seguir, dia a dia, do voo de chegada ao último jantar.",
          "Fica seu para sempre, sem subscrições nem renovações.",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-[0.65em] inline-block h-[3px] w-[3px] rounded-full bg-gold/70"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Faq() {
  const items = [
    {
      q: "Isto é uma subscrição?",
      a: "Não. É uma compra única. Paga uma vez e o acesso ao(s) guia(s) escolhido(s) fica seu, sem renovações nem mensalidades.",
    },
    {
      q: "Tenho de escolher os guias todos no momento da compra?",
      a: "Não. Se comprar um pacote de 2 ou 3 guias, desbloqueia logo o primeiro e os restantes ficam como créditos na sua conta, para usar quando quiser, em qualquer cidade disponível.",
    },
    {
      q: "Posso usar os guias no telemóvel durante a viagem?",
      a: "Sim. Os guias funcionam em qualquer dispositivo com browser e ligação à internet. Basta iniciar sessão na sua conta.",
    },
    {
      q: "Os guias são atualizados?",
      a: "Sim. Revemos os roteiros sempre que algo muda no terreno e a versão mais recente fica disponível para quem já comprou.",
    },
    {
      q: "E se ainda não souber para onde quero ir?",
      a: "Pode esperar. A parte gratuita continua aberta sempre que precisar. Só compra quando tiver decidido a cidade.",
    },
    {
      q: "Como funciona o pagamento?",
      a: "Com cartão, através de um processador seguro. Não guardamos dados de pagamento.",
    },
  ];

  return (
    <section className="px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold/80">Perguntas frequentes</div>
        <h2 className="font-serif text-3xl leading-tight md:text-4xl">Antes de comprar</h2>
        <Accordion type="single" collapsible className="mt-8">
          {items.map((it, i) => (
            <AccordionItem
              key={it.q}
              value={`faq-${i}`}
              className="border-gold/15"
            >
              <AccordionTrigger className="text-left font-serif text-lg text-cream hover:text-cream md:text-xl">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-cream/75 md:text-lg">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="px-6 py-20 text-center md:px-12 md:py-28">
      <div className="mx-auto max-w-2xl">
        <p className="font-serif text-2xl leading-snug text-cream md:text-3xl">
          Quando estiver pronto para passar da inspiração ao itinerário, é por aqui.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3.5 text-sm font-medium tracking-wide text-background transition-opacity hover:opacity-90"
          >
            Ver as cidades
          </Link>
        </div>
      </div>
    </section>
  );
}

function SimpleFooter() {
  return (
    <footer className="border-t border-gold/10 px-6 py-12 text-center">
      <p className="text-xs text-cream/55">
        O Postal. Guias editoriais de cidades europeias, feitos com calma e partilhados com gosto.
      </p>
    </footer>
  );
}