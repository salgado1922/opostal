# Plan: "A nossa abordagem" page + voice conversion

## 1. New route `/abordagem`

Create `src/routes/abordagem.tsx` (TanStack file route). Reuse the existing editorial primitives already used by `index.tsx` and the guide pages:

- `SiteNav` style header (extract or duplicate the small nav from `index.tsx` so the page sits inside the same shell, fixed top nav + footer area).
- Section/Card visuals from the homepage (`bg-background`, `border-gold/15`, `text-cream`, Cormorant headings, `text-[10px] uppercase tracking-[0.3em] text-gold` eyebrows) so it matches the "Golden Hour" look without inventing styles.
- Primary CTA button: reuse the same button class used by the homepage CTA (`PremiumPromo` / hero CTA) for "Ver os guias", linking to `/#cidades` (the existing guides listing anchor on the homepage).

Page structure (exact pt-PT copy, no em-dash):

1. Hero block
   - Eyebrow: `O Postal`
   - H1: `A nossa abordagem`
   - Subtitle: `Como fazemos os guias d'O Postal, e porque é que os fazemos assim.`
2. Intro paragraph: `O Postal nasceu de uma frustração simples: quase todos os guias de viagem dizem para ver tudo, e quase nenhum ajuda a ver bem. Os nossos roteiros existem para o contrário. Menos pontos, mais sentido. Tempo para parar num café sem culpa de estar a perder outra coisa qualquer.`
3. Three cards in a responsive grid (1 col mobile, 3 col desktop), each with small gold eyebrow number ("01/02/03"), heading, body:
   - `Testado no terreno` + body as given.
   - `Sem turistadas` + body as given.
   - `Pensado ao teu ritmo` + body as given.
4. Closing block: small line `Cada guia é percorrido e verificado antes de o publicarmos. É essa a promessa d'O Postal.` followed by the CTA button `Ver os guias` → `/#cidades`.

`head()` meta: page-specific title `A nossa abordagem - O Postal` and description matching the subtitle (these are new tags for a new page, not edits to existing SEO).

## 2. Nav link

Add a single link `A nossa abordagem` → `/abordagem` to the homepage `SiteNav` (`src/routes/index.tsx`, ~line 112), placed next to the existing `Cidades` link, using the same classes so the visual treatment is identical. The guide-page `StickyNav` is content-anchor based (per-day sections); it stays unchanged to preserve the in-article reading experience. The new page exposes the same top `SiteNav` so visitors can return home.

## 3. Voice conversion (eu → nós / O Postal)

Visible site changes only. SEO meta tags in `__root.tsx` and `index.tsx` `head()` blocks stay untouched per the boundary rule. "A minha conta" stays (it's the logged-in user's own account, not author voice).

Edits:

- `src/routes/index.tsx` line 210 (hero subtitle):
  - from: `Guias de viagem ao meu ritmo, testados por mim, cidade a cidade.`
  - to:   `Guias de viagem ao teu ritmo, testados no terreno, cidade a cidade.`
- `src/routes/index.tsx` line 782 (about paragraph):
  - from: `Estes guias são pessoais. Caminhei cada rua, comi em cada mesa, escutei cada concerto.`
  - to:   `Estes guias são feitos com cuidado. Percorremos cada rua a pé, provámos antes de recomendar, ouvimos cada concerto.`
  - The following sentence (`Aqui só fica o que valeu a pena...`) already uses `tu` and stays.

A repo-wide `rg` for `\b(eu|mim|meu|minha|testei|caminhei|provei|escutei|recomendo)\b` confirms no other author first-person strings exist in guide routes (`florenca.tsx`, `istambul.tsx`, `praga.tsx`), `premium.tsx` body copy, or shared components. Only matches are "A minha conta" (user account label, keep) and URLs/code, which are not copy.

## Out of scope (untouched)

Paywall, free-sample gate, pricing, theme tokens, fonts, guide content, SEO meta tags in `__root.tsx` and existing route `head()` blocks, testimonials/photos.

## Acceptance check

- New `/abordagem` route renders with the exact copy above, no em-dash, styled like the rest of the site, linked from the homepage nav.
- Visible homepage copy uses `nós` / brand voice; reader `tu` address preserved.
- No changes to `PremiumGate`, `StripeEmbeddedCheckout`, pricing, or guide bodies.
