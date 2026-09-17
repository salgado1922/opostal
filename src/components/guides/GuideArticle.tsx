import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CloudSun, Coins, ExternalLink, Lightbulb, MapPin, Utensils } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { SiteFooter } from "@/components/SiteFooter";
import { FinalStamp } from "@/components/postal/FinalStamp";
import { AffiliateLink } from "@/components/AffiliateLink";
import { CustomItineraryCTA } from "@/components/CustomItineraryCTA";
import type { GuideContent } from "@/lib/guides-schema";
import { cn } from "@/lib/utils";

export type GuidePreviewGuide = {
  title: string;
  city: string;
  country: string;
  duration: string;
  hero_url: string;
  hero_alt: string;
  intro: string;
  content: GuideContent;
};

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-20 px-5 py-10 md:px-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        {eyebrow && (
          <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold/60" />
            {eyebrow}
          </div>
        )}
        <h2 className="mb-7 font-serif text-3xl leading-tight md:mb-12 md:text-5xl">
          <span className="text-gradient-gold">{title}</span>
        </h2>
        {children}
      </div>
    </section>
  );
}

export function GuideArticle({ guide, preview = false }: { guide: GuidePreviewGuide; preview?: boolean }) {
  const c = guide.content;
  const placeName = guide.city || guide.title || "Novo guia";

  return (
    <main className={cn("bg-twilight-radial min-h-screen", preview && "text-left")}>
      <header className="relative flex min-h-[62vh] items-end overflow-hidden md:min-h-[78vh]">
        {guide.hero_url && (
          <SmartImage
            src={guide.hero_url}
            alt={guide.hero_alt || `${placeName} — foto de capa`}
            priority={!preview}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/25" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-12 md:px-12 md:pb-20">
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/85">
            {[guide.country, guide.duration].filter(Boolean).join(" · ")}
          </p>
          <h1 className="font-serif text-4xl leading-tight md:text-6xl">
            <span className="text-gradient-gold">{guide.title || placeName}</span>
          </h1>
          {guide.intro && (
            <p className="mt-5 max-w-2xl whitespace-pre-wrap text-base text-cream/80 md:text-lg">
              {guide.intro}
            </p>
          )}
        </div>
      </header>

      {c.context.length > 0 && (
        <Section id="contexto" eyebrow="Antes de partir" title="Contexto">
          <Accordion type="single" collapsible className="w-full">
            {c.context.map((n, i) => (
              <AccordionItem key={i} value={`ctx-${i}`}>
                <AccordionTrigger className="text-left font-serif text-lg text-cream">
                  {n.title}
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-wrap text-sm leading-relaxed text-cream/75">
                  {n.desc}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      )}

      {c.days.map((day, di) => (
        <Section
          key={di}
          id={`dia-${di + 1}`}
          eyebrow={day.label || `Dia ${di + 1}`}
          title={day.title || `Dia ${di + 1}`}
        >
          {day.vibe && (
            <p className="-mt-4 mb-8 max-w-3xl whitespace-pre-wrap text-base text-cream/75 md:text-lg">
              {day.vibe}
            </p>
          )}
          {day.cover && (
            <div className="mb-8 overflow-hidden rounded-2xl border border-gold/20">
              <SmartImage
                src={day.cover}
                alt={day.coverAlt || day.title || `Dia ${di + 1}`}
                sizes="(max-width: 768px) 100vw, 900px"
                className="h-56 w-full object-cover md:h-80"
              />
            </div>
          )}
          <ol className="space-y-5">
            {day.stops.map((s, si) => (
              <li key={si} className="glass rounded-2xl border border-gold/20 p-5 md:p-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  {s.time && (
                    <span className="text-xs uppercase tracking-[0.25em] text-gold/85">
                      {s.time}
                    </span>
                  )}
                  <h3 className="font-serif text-xl text-cream md:text-2xl">{s.title}</h3>
                  {s.cost && (
                    <span className="inline-flex items-center gap-1 text-xs text-cream/60">
                      <Coins className="h-3.5 w-3.5" />
                      {s.cost}
                    </span>
                  )}
                </div>
                {s.desc && (
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-cream/80">
                    {s.desc}
                  </p>
                )}
                {s.image && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-gold/15">
                    <SmartImage
                      src={s.image}
                      alt={s.imageAlt || s.title}
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="h-48 w-full object-cover md:h-64"
                    />
                  </div>
                )}
                {s.tip && (
                  <p className="mt-4 flex gap-2 rounded-xl border border-gold/20 bg-gold/5 p-3 text-sm text-cream/80">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span className="whitespace-pre-wrap">{s.tip}</span>
                  </p>
                )}
                {s.link && /^https?:\/\//.test(s.link) && (
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold lg:min-h-0"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Ver mais
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </Section>
      ))}

      {c.eat.length > 0 && (
        <Section id="comer" eyebrow="À mesa" title="Comer">
          <div className="grid gap-5 md:grid-cols-2">
            {c.eat.map((e, i) => (
              <div key={i} className="glass overflow-hidden rounded-2xl border border-gold/20">
                {e.image && (
                  <SmartImage
                    src={e.image}
                    alt={e.name}
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="h-44 w-full object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="flex items-center gap-2 font-serif text-xl text-cream">
                    <Utensils className="h-4 w-4 text-gold" />
                    {e.name}
                  </h3>
                  {(e.dish || e.price) && (
                    <p className="mt-2 text-sm text-gold/85">
                      {[e.dish, e.price].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {e.note && (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-cream/75">{e.note}</p>
                  )}
                  {e.link && <AffiliateLink href={e.link} label="Ver" className="mt-4" />}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {c.stay.length > 0 && (
        <Section id="onde-ficar" eyebrow="Dormir bem" title="Onde ficar">
          <div className="grid gap-5 md:grid-cols-3">
            {c.stay.map((s, i) => (
              <div key={i} className="glass rounded-2xl border border-gold/20 p-5">
                <h3 className="font-serif text-lg text-cream">{s.zone}</h3>
                {s.desc && (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-cream/75">{s.desc}</p>
                )}
                <AffiliateLink href={s.bookingUrl} label="Ver hotéis" className="mt-4" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {(c.rainy.length > 0 || c.secrets.length > 0) && (
        <Section eyebrow="Extras" title="Se chover e outros segredos">
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ...c.rainy.map((n) => ({ ...n, rainy: true })),
              ...c.secrets.map((n) => ({ ...n, rainy: false })),
            ].map((n, i) => (
              <div key={i} className="glass rounded-2xl border border-gold/20 p-5">
                <h3 className="flex items-center gap-2 font-serif text-lg text-cream">
                  {n.rainy ? (
                    <CloudSun className="h-4 w-4 text-gold" />
                  ) : (
                    <Lightbulb className="h-4 w-4 text-gold" />
                  )}
                  {n.title}
                </h3>
                {n.desc && (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-cream/75">{n.desc}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      <div className="px-5 pb-4 md:px-12">
        <div className="mx-auto max-w-5xl">
          <CustomItineraryCTA city={placeName} />
        </div>
      </div>

      <div className="flex justify-center pb-10">
        <FinalStamp code={placeName.slice(0, 3).toUpperCase()} />
      </div>

      <SiteFooter city={placeName} farewell={c.farewell || undefined} />
    </main>
  );
}
