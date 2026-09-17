import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Loader2, Save, Send } from "lucide-react";
import {
  AddButton,
  Area,
  ImageField,
  Panel,
  RepeatBlock,
  Text,
} from "@/components/admin/GuideFields";
import { getGuideAdmin, saveGuide } from "@/lib/guides.functions";
import {
  emptyContent,
  slugify,
  type GuideContent,
  type GuideInput,
  type GuideRow,
} from "@/lib/guides-schema";

export const Route = createFileRoute("/_authenticated/guias/$id")({
  head: () => ({
    meta: [
      { title: "Escrever guia | O Postal" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: GuideEditor,
});

type Draft = Omit<GuideInput, "content"> & { content: GuideContent };

const blankDraft: Draft = {
  slug: "",
  title: "",
  city: "",
  country: "",
  duration: "",
  hero_url: "",
  hero_alt: "",
  intro: "",
  seo_title: "",
  seo_description: "",
  status: "draft",
  content: { ...emptyContent },
};

function GuideEditor() {
  const { id } = Route.useParams();
  const isNew = id === "novo";
  const navigate = useNavigate();
  const fetchGuide = useServerFn(getGuideAdmin);
  const persist = useServerFn(saveGuide);

  const [draft, setDraft] = useState<Draft>(blankDraft);
  const [savedId, setSavedId] = useState<string | undefined>(isNew ? undefined : id);
  const [busy, setBusy] = useState<null | "draft" | "published">(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["guide-admin", id],
    queryFn: async () => (await fetchGuide({ data: { id } })) as GuideRow,
    enabled: !isNew,
  });

  useEffect(() => {
    if (data) {
      setDraft({ ...blankDraft, ...data, content: { ...emptyContent, ...data.content } });
      setSavedId(data.id);
    }
  }, [data]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const setContent = <K extends keyof GuideContent>(key: K, value: GuideContent[K]) =>
    setDraft((d) => ({ ...d, content: { ...d.content, [key]: value } }));

  const submit = async (status: "draft" | "published") => {
    setError(null);
    setMessage(null);
    const slug = draft.slug.trim() || slugify(draft.city || draft.title);
    if (!slug) {
      setError("Escreve o nome da cidade ou o endereço do guia.");
      return;
    }
    if (status === "published" && (!draft.title.trim() || !draft.hero_url.trim())) {
      setError("Para publicar precisas de título e foto de capa.");
      return;
    }
    setBusy(status);
    try {
      const result = (await persist({
        data: { ...draft, slug, status, ...(savedId ? { id: savedId } : {}) },
      })) as GuideRow;
      setSavedId(result.id);
      setDraft((d) => ({ ...d, slug, status }));
      setMessage(
        status === "published"
          ? "Publicado. Já está no site."
          : "Rascunho guardado. Ninguém o vê ainda.",
      );
      if (isNew) navigate({ to: "/guias/$id", params: { id: result.id }, replace: true });
    } catch (e) {
      setError(
        e instanceof Error && /duplicate|unique/i.test(e.message)
          ? "Já existe um guia com esse endereço. Escolhe outro."
          : "Não foi possível guardar. Tenta outra vez.",
      );
    } finally {
      setBusy(null);
    }
  };

  if (!isNew && isLoading) {
    return (
      <main className="bg-twilight-radial min-h-screen px-6 py-16 text-cream/60">A carregar…</main>
    );
  }

  const c = draft.content;

  return (
    <main className="bg-twilight-radial min-h-screen px-5 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-gold/80">
              {draft.status === "published" ? "Publicado" : "Rascunho"}
            </p>
            <h1 className="font-serif text-3xl text-cream md:text-4xl">
              {isNew ? "Novo guia" : draft.title || draft.city || "Guia"}
            </h1>
            {draft.slug && (
              <p className="mt-2 text-sm text-cream/55">opostal.pt/guia/{draft.slug}</p>
            )}
          </div>
          <Link
            to="/guias"
            className="text-xs text-cream/50 underline-offset-4 hover:text-cream/80 hover:underline"
          >
            ← Todos os guias
          </Link>
        </div>

        <div className="mt-8 grid gap-6">
          <Panel title="Essencial">
            <Text
              label="Cidade"
              value={draft.city}
              onChange={(v) =>
                setDraft((d) => ({ ...d, city: v, slug: d.slug || slugify(v) }))
              }
              placeholder="Copenhaga"
            />
            <Text label="País" value={draft.country} onChange={(v) => set("country", v)} placeholder="Dinamarca" />
            <Text
              label="Título do guia"
              value={draft.title}
              onChange={(v) => set("title", v)}
              placeholder="O que visitar em Copenhaga: roteiro de 3 dias"
            />
            <Text label="Duração" value={draft.duration} onChange={(v) => set("duration", v)} placeholder="3 dias" />
            <Text
              label="Endereço no site"
              value={draft.slug}
              onChange={(v) => set("slug", slugify(v))}
              hint="Só letras minúsculas e hífenes. Fica em opostal.pt/guia/…"
            />
            <ImageField label="Foto de capa" value={draft.hero_url} onChange={(v) => set("hero_url", v)} />
            <Text
              label="Descrição da foto de capa"
              value={draft.hero_alt}
              onChange={(v) => set("hero_alt", v)}
              placeholder="Canais de Nyhavn ao fim da tarde"
            />
            <Area
              label="Introdução"
              value={draft.intro}
              onChange={(v) => set("intro", v)}
              rows={5}
              placeholder="Duas ou três frases sobre a cidade e o que o roteiro faz."
            />
          </Panel>

          <Panel title="Google" description="O que aparece nos resultados de pesquisa e nas partilhas.">
            <Text label="Título para o Google" value={draft.seo_title} onChange={(v) => set("seo_title", v)} />
            <Area
              label="Descrição para o Google"
              value={draft.seo_description}
              onChange={(v) => set("seo_description", v)}
              rows={3}
            />
          </Panel>

          <Panel title="Contexto" description="Blocos que abrem e fecham: quando ir, clima, como chegar…">
            {c.context.map((n, i) => (
              <RepeatBlock
                key={i}
                title={n.title || `Bloco ${i + 1}`}
                onRemove={() => setContent("context", c.context.filter((_, x) => x !== i))}
              >
                <Text
                  label="Título"
                  value={n.title}
                  onChange={(v) =>
                    setContent("context", c.context.map((o, x) => (x === i ? { ...o, title: v } : o)))
                  }
                />
                <Area
                  label="Texto"
                  value={n.desc}
                  onChange={(v) =>
                    setContent("context", c.context.map((o, x) => (x === i ? { ...o, desc: v } : o)))
                  }
                />
              </RepeatBlock>
            ))}
            <AddButton
              label="Bloco de contexto"
              onClick={() => setContent("context", [...c.context, { title: "", desc: "" }])}
            />
          </Panel>

          <Panel title="Dias e paragens">
            {c.days.map((day, di) => (
              <RepeatBlock
                key={di}
                title={day.label || `Dia ${di + 1}`}
                onRemove={() => setContent("days", c.days.filter((_, x) => x !== di))}
              >
                <Text
                  label="Etiqueta"
                  value={day.label}
                  onChange={(v) =>
                    setContent("days", c.days.map((o, x) => (x === di ? { ...o, label: v } : o)))
                  }
                  placeholder={`Dia ${di + 1}`}
                />
                <Text
                  label="Título do dia"
                  value={day.title}
                  onChange={(v) =>
                    setContent("days", c.days.map((o, x) => (x === di ? { ...o, title: v } : o)))
                  }
                />
                <Area
                  label="Resumo do dia"
                  value={day.vibe}
                  rows={3}
                  onChange={(v) =>
                    setContent("days", c.days.map((o, x) => (x === di ? { ...o, vibe: v } : o)))
                  }
                />
                <ImageField
                  label="Foto do dia"
                  value={day.cover}
                  onChange={(v) =>
                    setContent("days", c.days.map((o, x) => (x === di ? { ...o, cover: v } : o)))
                  }
                />
                <div className="grid gap-3 border-t border-gold/10 pt-3">
                  {day.stops.map((s, si) => {
                    const patch = (field: string, v: string) =>
                      setContent(
                        "days",
                        c.days.map((o, x) =>
                          x === di
                            ? {
                                ...o,
                                stops: o.stops.map((st, y) =>
                                  y === si ? { ...st, [field]: v } : st,
                                ),
                              }
                            : o,
                        ),
                      );
                    return (
                      <RepeatBlock
                        key={si}
                        title={s.title || `Paragem ${si + 1}`}
                        onRemove={() =>
                          setContent(
                            "days",
                            c.days.map((o, x) =>
                              x === di
                                ? { ...o, stops: o.stops.filter((_, y) => y !== si) }
                                : o,
                            ),
                          )
                        }
                      >
                        <Text label="Hora" value={s.time} onChange={(v) => patch("time", v)} placeholder="09:30" />
                        <Text label="Nome" value={s.title} onChange={(v) => patch("title", v)} />
                        <Area label="Descrição" value={s.desc} onChange={(v) => patch("desc", v)} />
                        <Text label="Custo" value={s.cost} onChange={(v) => patch("cost", v)} placeholder="≈ 12 €" />
                        <Area label="Dica" value={s.tip} rows={2} onChange={(v) => patch("tip", v)} />
                        <Text label="Link" value={s.link} onChange={(v) => patch("link", v)} />
                        <ImageField label="Foto" value={s.image} onChange={(v) => patch("image", v)} />
                      </RepeatBlock>
                    );
                  })}
                  <AddButton
                    label="Paragem"
                    onClick={() =>
                      setContent(
                        "days",
                        c.days.map((o, x) =>
                          x === di
                            ? {
                                ...o,
                                stops: [
                                  ...o.stops,
                                  {
                                    time: "",
                                    title: "",
                                    desc: "",
                                    tip: "",
                                    cost: "",
                                    link: "",
                                    image: "",
                                    imageAlt: "",
                                  },
                                ],
                              }
                            : o,
                        ),
                      )
                    }
                  />
                </div>
              </RepeatBlock>
            ))}
            <AddButton
              label="Dia"
              onClick={() =>
                setContent("days", [
                  ...c.days,
                  {
                    label: `Dia ${c.days.length + 1}`,
                    title: "",
                    vibe: "",
                    cover: "",
                    coverAlt: "",
                    stops: [],
                  },
                ])
              }
            />
          </Panel>

          <Panel title="Comer">
            {c.eat.map((e, i) => {
              const patch = (field: string, v: string) =>
                setContent("eat", c.eat.map((o, x) => (x === i ? { ...o, [field]: v } : o)));
              return (
                <RepeatBlock
                  key={i}
                  title={e.name || `Sítio ${i + 1}`}
                  onRemove={() => setContent("eat", c.eat.filter((_, x) => x !== i))}
                >
                  <Text label="Nome" value={e.name} onChange={(v) => patch("name", v)} />
                  <Text label="Prato" value={e.dish} onChange={(v) => patch("dish", v)} />
                  <Text label="Preço" value={e.price} onChange={(v) => patch("price", v)} />
                  <Area label="Nota" value={e.note} rows={2} onChange={(v) => patch("note", v)} />
                  <Text label="Link" value={e.link} onChange={(v) => patch("link", v)} />
                  <ImageField label="Foto" value={e.image} onChange={(v) => patch("image", v)} />
                </RepeatBlock>
              );
            })}
            <AddButton
              label="Sítio para comer"
              onClick={() =>
                setContent("eat", [
                  ...c.eat,
                  { name: "", dish: "", price: "", note: "", link: "", image: "" },
                ])
              }
            />
          </Panel>

          <Panel title="Onde ficar" description="Zonas da cidade, com o teu link do Booking.">
            {c.stay.map((s, i) => {
              const patch = (field: string, v: string) =>
                setContent("stay", c.stay.map((o, x) => (x === i ? { ...o, [field]: v } : o)));
              return (
                <RepeatBlock
                  key={i}
                  title={s.zone || `Zona ${i + 1}`}
                  onRemove={() => setContent("stay", c.stay.filter((_, x) => x !== i))}
                >
                  <Text label="Zona" value={s.zone} onChange={(v) => patch("zone", v)} />
                  <Area label="Descrição" value={s.desc} rows={2} onChange={(v) => patch("desc", v)} />
                  <Text
                    label="Link do Booking"
                    value={s.bookingUrl}
                    onChange={(v) => patch("bookingUrl", v)}
                  />
                </RepeatBlock>
              );
            })}
            <AddButton
              label="Zona"
              onClick={() => setContent("stay", [...c.stay, { zone: "", desc: "", bookingUrl: "" }])}
            />
          </Panel>

          <Panel title="Extras">
            <p className="text-[11px] uppercase tracking-[0.2em] text-cream/50">Se chover</p>
            {c.rainy.map((n, i) => (
              <RepeatBlock
                key={i}
                title={n.title || `Ideia ${i + 1}`}
                onRemove={() => setContent("rainy", c.rainy.filter((_, x) => x !== i))}
              >
                <Text
                  label="Título"
                  value={n.title}
                  onChange={(v) =>
                    setContent("rainy", c.rainy.map((o, x) => (x === i ? { ...o, title: v } : o)))
                  }
                />
                <Area
                  label="Texto"
                  value={n.desc}
                  rows={2}
                  onChange={(v) =>
                    setContent("rainy", c.rainy.map((o, x) => (x === i ? { ...o, desc: v } : o)))
                  }
                />
              </RepeatBlock>
            ))}
            <AddButton
              label="Ideia para dia de chuva"
              onClick={() => setContent("rainy", [...c.rainy, { title: "", desc: "" }])}
            />

            <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-cream/50">
              Segredos locais
            </p>
            {c.secrets.map((n, i) => (
              <RepeatBlock
                key={i}
                title={n.title || `Segredo ${i + 1}`}
                onRemove={() => setContent("secrets", c.secrets.filter((_, x) => x !== i))}
              >
                <Text
                  label="Título"
                  value={n.title}
                  onChange={(v) =>
                    setContent("secrets", c.secrets.map((o, x) => (x === i ? { ...o, title: v } : o)))
                  }
                />
                <Area
                  label="Texto"
                  value={n.desc}
                  rows={2}
                  onChange={(v) =>
                    setContent("secrets", c.secrets.map((o, x) => (x === i ? { ...o, desc: v } : o)))
                  }
                />
              </RepeatBlock>
            ))}
            <AddButton
              label="Segredo"
              onClick={() => setContent("secrets", [...c.secrets, { title: "", desc: "" }])}
            />

            <Text
              label="Frase de despedida"
              value={c.farewell}
              onChange={(v) => setContent("farewell", v)}
              hint="Fica no fim do guia, na língua da cidade."
            />
          </Panel>
        </div>

        {error && <p className="mt-6 text-sm text-red-400">{error}</p>}
        {message && <p className="mt-6 text-sm text-gold">{message}</p>}

        <div className="sticky bottom-4 mt-8 flex flex-wrap gap-3 rounded-2xl border border-gold/20 bg-background/85 p-4 backdrop-blur">
          <button
            type="button"
            onClick={() => void submit("draft")}
            disabled={busy !== null}
            className="inline-flex items-center gap-2 rounded-md border border-cream/25 px-4 py-2.5 text-sm text-cream/85 transition-colors hover:bg-cream/5 disabled:opacity-60"
          >
            {busy === "draft" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Guardar rascunho
          </button>
          <button
            type="button"
            onClick={() => void submit("published")}
            disabled={busy !== null}
            className="inline-flex items-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm text-cream transition-colors hover:bg-gold/20 disabled:opacity-60"
          >
            {busy === "published" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Publicar
          </button>
          {savedId && draft.status === "published" && (
            <a
              href={`/guia/${draft.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-2 py-2.5 text-sm text-cream/60 hover:text-gold"
            >
              Ver no site
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
