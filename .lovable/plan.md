# Plan: New `/istambul` page — "İznik & Bósforo" theme

Build a new route that mirrors `/praga` 1:1 in structure, components and interactions, but with a distinct Istanbul-inspired visual theme and the full pt-PT copy provided. No changes to `/praga` or the homepage.

## 1. Theme tokens (scoped, not global)

To avoid disturbing the homepage/Praga "Golden Hour" palette, the Istanbul theme will be applied via a scoped wrapper class `theme-iznik` on the page root, with CSS variable overrides defined in `src/styles.css`:

- `--bosphorus`: deep midnight indigo (background base)
- `--iznik-turquoise`: primary accent (links, italic captions, dividers)
- `--cobalt`: secondary primary
- `--tomato-red`: İznik coral-red (tags, badges, highlights — used sparingly)
- `--brass`: warm copper for fine lines/icon strokes
- `--ivory`: cream body text
- Override `--background`, `--foreground`, `--primary`, `--accent`, `--ring`, `--border`, gradients, and add new utilities `gold-link` equivalent → `iznik-link`, `text-gradient-iznik`, `bg-bosphorus-radial`.

Page wrapped in `<div className="theme-iznik">…</div>` so tokens only apply here.

## 2. Typography

- Headings: Cormorant Garamond (already loaded) — calm Ottoman serif feel; keep current sans for body.
- Italic accent lines use `font-serif italic text-[var(--iznik-turquoise)]` (mirrors gold italic in Praga).

## 3. Decorative motifs

Lightweight inline SVG components in `src/components/iznik/`:
- `ArabesqueDivider` — thin brass arabesque line between sections
- `EightPointStar` — small ornament used in section title eyebrows
- `TulipMark` — accent on hero & footer
- `DomeSilhouette` — subtle footer skyline

Used sparingly; never busy.

## 4. Route file

Create `src/routes/istambul.tsx` modelled on `src/routes/praga.tsx`. Same:

- `head()` with title, description, canonical, og tags (`og:type=article`, `og:url=https://compassoroutes.lovable.app/istambul`, og:image = Istanbul hero), JSON-LD `Article`.
- Top nav: back link "‹ Viagens do Carlos" → `/`, anchored section menu with labels: Vê primeiro · Dia 1 · Dia 2 · Dia 3 · Dia 4 · Dia 5 · Bósforo · Comer · Dicas · Reservas.
- Hero with same overlay treatment (gradient pulled toward indigo/petrol-blue instead of amber), tag chip, big serif title, subtitle.
- All sections in the order specified.

## 5. Sections (1:1 with Praga components)

1. Hero
2. **Vê primeiro** — YouTube embed slot (placeholder iframe), caption
3. **Conhecer Istambul** — 4 accordions (Info / Calendar / CloudSun / PartyPopper icons), including the 12-row climate table
4. **Essencial para a viagem** — small cards grid (fuso, moeda, tomadas, emergência, transportes, gorjetas)
5. **Conversor EUR ↔ TRY** — same component as Praga's converter, BUT:
   - On mount, `fetch("https://open.er-api.com/v6/latest/EUR")`, read `rates.TRY`.
   - Fallback to `53.5` on error, show "Taxa indisponível de momento — a usar valor aproximado."
   - Shortcuts: 100/500/1000 TRY → EUR.
6. **Onde ficar** — 3 neighbourhood cards
7. **Palavras úteis** — chip list
8. **Cinco dias, cinco humores** — 5 day cards (was 4 in Praga; reuse same card component, grid wraps)
9. **Dia a dia, paragem a paragem** — 5 day accordion blocks with stops, "A pé hoje" header note, per-day Google Maps embed iframe + "Abrir percurso no mapa" link. Day 4 uses a Büyükada map + "Abrir ilha no mapa" link instead of a walking route.
10. **Bósforo: de dia ou à noite?** — two-card comparison (same layout as Praga's "Concertos" section), with "Recomendado" badge on card 2
11. **Comer e beber em Istambul** — areas/tips row + dish cards grid + warning callout
12. **Dicas & armadilhas** — Fazer / Evitar two-column lists
13. **O que reservar com antecedência** — checklist
14. Footer — serif closing line in turquoise/coral + tagline

All copy lifted verbatim from the brief (pt-PT).

## 6. Images

Add Unsplash Istanbul photos (blue-hour skyline hero, Bosphorus ferries, Galata, İznik-tiled interior, Princes' Islands, Grand Bazaar). Saved to `src/assets/` and imported. Apply the same dark→transparent overlay used on Praga's hero but with indigo/petrol tint.

If image generation is needed because suitable Unsplash matches aren't pre-available locally, we'll generate hero + supporting photos via the image tool with realistic photography prompts.

## 7. Routing & SEO

- TanStack Router auto-picks up `src/routes/istambul.tsx` (no manual edits to `routeTree.gen.ts`).
- Update `src/routes/sitemap[.]xml.ts` to add `/istambul` (monthly, priority 0.9).
- Update `public/llms.txt` to list `/istambul`.
- No changes to homepage nav (user didn't ask) — leave navigation as-is.

## 8. Animations & a11y

- Same Framer Motion fade/scale-on-scroll patterns as Praga. Respect `prefers-reduced-motion`.
- Mobile-first; same anchored menu collapses on small screens with `aria-label="Alternar menu"`.
- Alt text on every image; sufficient contrast on indigo background with ivory text.

## Technical notes

- Live FX fetch runs client-side in a `useEffect` inside the converter component to avoid SSR network calls and keep the page prerenderable.
- Theme tokens added to `src/styles.css` under a `.theme-iznik` selector that re-declares the relevant `--background`, `--foreground`, `--primary`, `--accent`, `--ring`, `--border`, plus new İznik vars. Utilities (`iznik-link`, `text-gradient-iznik`, `bg-bosphorus-radial`) follow the same `@utility` pattern already used for gold equivalents.
- No changes to `/praga`, `/`, or shared components — Istanbul-specific decorative SVGs live in their own folder.

## Files to create / edit

Create:
- `src/routes/istambul.tsx`
- `src/components/iznik/ArabesqueDivider.tsx`
- `src/components/iznik/EightPointStar.tsx`
- `src/components/iznik/TulipMark.tsx`
- `src/components/iznik/DomeSilhouette.tsx`
- `src/assets/istambul-hero.jpg` (+ a few supporting images)

Edit:
- `src/styles.css` (add `.theme-iznik` token overrides + İznik utilities)
- `src/routes/sitemap[.]xml.ts` (add /istambul entry)
- `public/llms.txt` (add /istambul line)
