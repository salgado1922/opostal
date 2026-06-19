## Âmbito

Aplicar a alteração ao template partilhado das páginas de cidade, tocando apenas em `src/routes/praga.tsx`, `src/routes/istambul.tsx`, `src/routes/florenca.tsx`, `src/routes/londres.tsx`, e em `src/components/AffiliateLink.tsx` (ajuste mínimo do `rel`). Homepage, cidades "Em breve" e componentes premium permanecem intactos. Sem alterações visuais à identidade, sem traços longos, sem PT-BR.

## 1) Remover restos do modelo antigo (mesmas alterações nas 4 páginas)

Em cada uma das 4 páginas de cidade:

- Remover imports de `PremiumGate`, `GuidePreviewGate`, `EndOfArticleCTA`.
- Substituir o bloco `<GuidePreviewGate slug=… days=… sampleDays={1} renderDay={(d) => <DayBlock day={d} />} />` por simples `{days.map((d) => <DayBlock key={d.key} day={d} />)}`. Resultado: todos os dias visíveis a toda a gente, sem badge "Amostra grátis" e sem cards "Continua no guia completo".
- Remover o `<PremiumGate slug="…">…</PremiumGate>` à volta de `<GuideVideo/>`, `<Concerts/>` (quando aplicável), `<Food/>`, `<Tips/>`, `<Checklist/>`. Estes componentes ficam renderizados ao mesmo nível, pela mesma ordem (vídeo continua exatamente no mesmo sítio).
- Remover `<EndOfArticleCTA slug="…" />` (será substituído pelo novo bloco de CTA no fim).
- Em `GuideVideo`: remover apenas as menções a "acesso"/"desbloquear" da `Section` `intro` e da legenda interna (para não restar nenhum vestígio de paywall). Sem nova copy editorial; usar texto neutro `Vídeo completo do guia.` (ajuste mínimo, sem marketing).
- Conferir que nada mais referencia `PremiumGate`/`GuidePreviewGate`/`EndOfArticleCTA` nessas páginas (já só são usadas nelas).

Não modificar nem apagar os componentes `PremiumGate`, `GuidePreviewGate`, `PremiumPromo`, `AffiliateLink` (à exceção do ponto 2 abaixo), `/conta`, `/premium`, `use-auth`. Ficam disponíveis no projeto sem efeito visível nas páginas de cidade.

## 2) `AffiliateLink` (ajuste mínimo)

Em `src/components/AffiliateLink.tsx`, alterar `rel="sponsored nofollow noopener"` → `rel="sponsored noopener"` para cumprir a regra do brief. O label por omissão continua `Reservar`, o estilo (pill gold, ícone Ticket + ExternalLink) mantém-se: este é o "estilo existente do botão Reservar" que o brief pede para reutilizar.

## 3) Afiliados Booking em "Onde ficar"

Por baixo do texto de cada zona já listada na secção `Onde ficar` (3 cards por cidade), adicionar um link de texto discreto, dentro do mesmo `<li>`, com estilo:

```tsx
<a
  href="[LINK_BOOKING_{CIDADE}_{ZONA}]"
  target="_blank"
  rel="sponsored noopener"
  className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-gold/85 hover:text-gold"
>
  Ver alojamentos em {zona}
  <ExternalLink className="h-3 w-3 opacity-70" />
</a>
```

Sem caixa, sem fundo, sem badge "afiliado". Apenas link de texto.

URLs placeholder por cidade/zona (uppercase, underscore, ASCII, sem acentos nem diacríticos):

- **Praga**:
  - "Cidade Velha (Staré Město)" → `[LINK_BOOKING_PRAGA_STARE_MESTO]`, label `Ver alojamentos em Cidade Velha`
  - "Malá Strana" → `[LINK_BOOKING_PRAGA_MALA_STRANA]`, label `Ver alojamentos em Malá Strana`
  - "Nové Město" → `[LINK_BOOKING_PRAGA_NOVE_MESTO]`, label `Ver alojamentos em Nové Město`
- **Istambul**:
  - "Sultanahmet (cidade velha)" → `[LINK_BOOKING_ISTAMBUL_SULTANAHMET]`, label `Ver alojamentos em Sultanahmet`
  - "Beyoğlu / Galata" → `[LINK_BOOKING_ISTAMBUL_BEYOGLU_GALATA]`, label `Ver alojamentos em Beyoğlu / Galata`
  - "Kadıköy (lado asiático)" → `[LINK_BOOKING_ISTAMBUL_KADIKOY]`, label `Ver alojamentos em Kadıköy`
- **Florença**:
  - "Centro Storico (Duomo)" → `[LINK_BOOKING_FLORENCA_CENTRO_STORICO]`, label `Ver alojamentos em Centro Storico`
  - "Santa Croce" → `[LINK_BOOKING_FLORENCA_SANTA_CROCE]`, label `Ver alojamentos em Santa Croce`
  - "Oltrarno / Santo Spirito" → `[LINK_BOOKING_FLORENCA_OLTRARNO]`, label `Ver alojamentos em Oltrarno / Santo Spirito`
- **Londres**:
  - "Covent Garden / Soho" → `[LINK_BOOKING_LONDRES_COVENT_GARDEN_SOHO]`, label `Ver alojamentos em Covent Garden / Soho`
  - "South Bank / London Bridge" → `[LINK_BOOKING_LONDRES_SOUTH_BANK]`, label `Ver alojamentos em South Bank / London Bridge`
  - "Kensington / South Kensington" → `[LINK_BOOKING_LONDRES_KENSINGTON]`, label `Ver alojamentos em Kensington / South Kensington`

## 4) Botões "Reservar" do itinerário → GetYourGuide

No `StopItem` de cada cidade, sempre que `stop.bookingUrl` existir, renderizar com o componente `AffiliateLink` (mesmo botão "Reservar" pill gold já em uso na Praga). Em Istambul/Florença/Londres isto substitui o `<a … className="…">Reservar</a>` inline atual por `<AffiliateLink href={stop.bookingUrl} />`. Removo a ramificação `affiliate ? AffiliateLink : <a/>` na Praga: passa a ser sempre `AffiliateLink` quando há `bookingUrl` e a transformação acontece nos dados.

Substituir os valores de `bookingUrl` por placeholders GYG nas paragens bookáveis (atrações, museus, experiências). O label continua "Reservar" via valor default do `AffiliateLink`.

- **Praga** (em `days[…].stops`):
  - "Sinagogas, antigo cemitério" → `[LINK_GETYOURGUIDE_PRAGA_BAIRRO_JUDAICO]`
  - "Castelo de Praga: S. Vito & Beco de Ouro" → `[LINK_GETYOURGUIDE_PRAGA_CASTELO]` (e remover o flag `affiliate` agora redundante)
  - "Ossário de Sedlec: reservar slot!" → `[LINK_GETYOURGUIDE_PRAGA_OSSARIO]`
  - "Igreja S. Bartolomeu (concertos)" → manter o link oficial atual (não é bilhete de atração, é programação da igreja; o brief permite manter o oficial quando não há equivalente sensato em GYG)
- **Istambul** (`stops[…].bookingUrl`):
  - Ayasofya → `[LINK_GETYOURGUIDE_ISTAMBUL_HAGIA_SOFIA]`
  - Cisterna da Basílica (Yerebatan) → `[LINK_GETYOURGUIDE_ISTAMBUL_CISTERNA_BASILICA]`
  - Palácio Topkapı → `[LINK_GETYOURGUIDE_ISTAMBUL_TOPKAPI]`
  - Palácio Dolmabahçe → `[LINK_GETYOURGUIDE_ISTAMBUL_DOLMABAHCE]`
  - Torre de Gálata → `[LINK_GETYOURGUIDE_ISTAMBUL_TORRE_GALATA]`
- **Florença**:
  - Galleria dell'Accademia → `[LINK_GETYOURGUIDE_FLORENCA_ACCADEMIA]`
  - Uffizi → `[LINK_GETYOURGUIDE_FLORENCA_UFFIZI]`
  - Palazzo Pitti → `[LINK_GETYOURGUIDE_FLORENCA_PALAZZO_PITTI]`
  - Boboli → `[LINK_GETYOURGUIDE_FLORENCA_BOBOLI]`
  - Duomo, Battistero, Campanile, Cupola (três entradas com bookingUrl `duomo.firenze.it`) → todos para `[LINK_GETYOURGUIDE_FLORENCA_DUOMO]`
  - Santa Croce → `[LINK_GETYOURGUIDE_FLORENCA_SANTA_CROCE]`
  - Cappelle Medicee → `[LINK_GETYOURGUIDE_FLORENCA_CAPPELLE_MEDICEE]`
- **Londres**:
  - Changing of the Guard → `[LINK_GETYOURGUIDE_LONDRES_CHANGING_OF_THE_GUARD]`
  - Natural History Museum → `[LINK_GETYOURGUIDE_LONDRES_NATURAL_HISTORY]`
  - St Paul's → `[LINK_GETYOURGUIDE_LONDRES_ST_PAULS]`
  - Sky Garden → `[LINK_GETYOURGUIDE_LONDRES_SKY_GARDEN]`
  - Tate Modern → `[LINK_GETYOURGUIDE_LONDRES_TATE_MODERN]`
  - Madame Tussauds → `[LINK_GETYOURGUIDE_LONDRES_MADAME_TUSSAUDS]`
  - Warner Bros Studio Tour → `[LINK_GETYOURGUIDE_LONDRES_WB_STUDIO_TOUR]`

Concertos em Praga (`Concerts()`): os três botões existentes ("Reservar Rudolfinum", "Reservar Casa Municipal", e o `AffiliateLink` "Reservar concerto") passam a usar `AffiliateLink` apontando para `[LINK_GETYOURGUIDE_PRAGA_CONCERTO]` com labels mantidos exatamente como estão (`Reservar Rudolfinum`, `Reservar Casa Municipal`, `Reservar concerto`).

## 5) Transportes → Omio

Para cada cidade, dentro do card do essencial cuja `title === "Transportes"`, anexar abaixo do texto um link de texto discreto (mesmo padrão visual do link Booking acima):

```tsx
<a
  href="[LINK_OMIO_{CIDADE}]"
  target="_blank"
  rel="sponsored noopener"
  className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-gold/85 hover:text-gold"
>
  Procurar comboios e autocarros
  <ExternalLink className="h-3 w-3 opacity-70" />
</a>
```

Placeholders: `[LINK_OMIO_PRAGA]`, `[LINK_OMIO_ISTAMBUL]`, `[LINK_OMIO_FLORENCA]`, `[LINK_OMIO_LONDRES]`.

Implementação: adicionar campo opcional `extra?: React.ReactNode` a cada item `essentials` (ou um shortcut: detetar pelo título `"Transportes"` no `EssentialInfo` e renderizar o link condicionalmente). Vou pelo segundo: no `.map(...)` do `EssentialInfo`, depois do parágrafo, se `e.title === "Transportes"` renderizo o link Omio. Mantém o ficheiro mínimo.

Adicionalmente, no `day.transport.primaryUrl` quando se refere a comboio:
- Praga dia 3 "Comboio para Kutná Hora" `primaryUrl: https://www.cd.cz/en/` → `[LINK_OMIO_PRAGA]`, label do botão mantém-se `Reservar bilhetes de comboio`. Adicionar `rel="sponsored noopener"` ao `<a>` desse bloco e `target="_blank"` (já existe).

Outras cidades não têm `day.transport` com bookings de comboio relevantes (verificado: Istambul/Florença/Londres não usam `day.transport.primaryUrl` para comboios; nada a alterar nesses ficheiros para este ponto, apenas o link Omio dentro do card Transportes do `EssentialInfo`).

## 6) CTA de roteiro personalizado (dois pontos por página)

### (A) Subtil, dentro do Hero
Por baixo do bloco `glass` do hero, ainda dentro da `<section>` do Hero, adicionar um link único, secundário, neutro:

```tsx
<div className="relative z-10 mt-6 flex justify-center">
  <a
    href="/#roteiro-personalizado"
    className="text-[11px] uppercase tracking-[0.3em] text-cream/75 gold-link"
  >
    Pedir roteiro personalizado
  </a>
</div>
```

Igual em todas as cidades. Sem botão preenchido, sem cor garrida.

### (B) Fim de página, antes do `<Footer/>`
Novo componente local `CustomItineraryCTA({ city }: { city: string })`, importado uma vez em cada página e renderizado entre o último conteúdo e `<Footer/>` (no lugar onde estava `EndOfArticleCTA`). Estética calma, alinhada ao resto do guia (card glass, border gold/20, sem cores fluorescentes):

```tsx
<section className="px-6 pb-20 md:pb-28">
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7 }}
    className="glass mx-auto max-w-3xl rounded-2xl border border-gold/20 px-8 py-10 text-center"
  >
    <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold/80">À tua medida</p>
    <h2 className="font-serif text-2xl text-cream md:text-3xl">
      Queres um roteiro só para ti?
    </h2>
    <p className="mt-4 text-cream/75 leading-relaxed">
      Este guia é o mesmo para toda a gente, e serve muita viagem. Mas às vezes queres algo desenhado ao teu ritmo, com as tuas datas e o que mais gostas de fazer. Se for o teu caso, posso preparar um roteiro só teu.
    </p>
    <a
      href="/#roteiro-personalizado"
      className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:border-gold/70 hover:bg-gold/[0.08]"
    >
      Pedir roteiro personalizado para {city}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  </motion.div>
</section>
```

`{city}` é preenchido por página: `Praga`, `Istambul`, `Florença`, `Londres`.

## 7) Garantias

- 1 `<h1>` por página (intacto).
- Conteúdo continua server-rendered, sem tabs ou iframes a esconder texto.
- Todos os links de afiliados: `target="_blank"`, `rel="sponsored noopener"`.
- Sem traços longos em copy nova.
- Não toco em homepage, cidades "Em breve", `/conta`, `/premium`, nem componentes premium.
- Sem nova lib, sem nova cor, sem nova fonte.

## Ficheiros alterados

- `src/routes/praga.tsx`
- `src/routes/istambul.tsx`
- `src/routes/florenca.tsx`
- `src/routes/londres.tsx`
- `src/components/AffiliateLink.tsx` (apenas `rel`)
