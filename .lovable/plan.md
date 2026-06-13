
# Cinematic dark redesign — Home (/)

Scope: only `src/routes/index.tsx` (with small additions to `src/styles.css` for grain/vignette tokens and brass accent tuning). City pages and data files are untouched.

## 1. Art direction (kept dark)

- Keep current dark palette; enrich with a warm vignette + faint film-grain overlay (CSS, no asset).
- Single warm accent: brass/amber (≈ `#C8772E` → `#D8A24A`) reused for logo mark, CTA, links, chips, hairlines. Map to existing `--gold` token range (slight warm-shift) so existing utilities (`text-gold`, `border-gold/…`) stay in sync.
- Type: keep current serif for headings, sans for body, but bump hero scale (H1 ~`clamp(3.5rem, 7vw, 6.5rem)`), increase line-height and tracking on the eyebrow.
- Motion: keep Framer Motion, slow easings (0.9–1.4s), `prefers-reduced-motion` respected.

## 2. New cinematic Hero (full-viewport)

Replaces current `<Hero />` in `src/routes/index.tsx`.

- Full-bleed `min-h-screen` section.
- Background: cross-fade slideshow of 2–3 photos (Praga golden hour, Istambul Bósforo blue hour, optional Sultanahmet skyline) — each image gets a slow Ken Burns scale (1.0 → 1.08 over ~14s). Implemented with stacked `<img>` layers + Framer Motion `animate` opacity loop, 6s per slide, 1.2s crossfade. Reduced motion → static first frame.
- Sourcing: reuse already-imported `hubHero`, plus 2 NEW reliable Unsplash URLs (Praga + Istambul) referenced as remote URLs (no Wikimedia). Picked so they don't repeat any photo used in the featured band or grid below.
- Overlay: bottom-up dark scrim `linear-gradient(180deg, transparent 35%, background/65% 75%, background 100%)` + soft radial vignette.
- Content block, left-aligned, max-w-2xl, bottom-left padded:
  - Eyebrow (brass, tracking-[0.35em]): `Diários de viagem · Europa`
  - H1 serif: `Compasso Routes`
  - Sub: `Guias de viagem ao meu ritmo — testados por mim, cidade a cidade.`
  - Secondary line (cream/70): `Roteiros de ritmo tranquilo, sem turistadas — para quem quer ver bem, em vez de ver tudo.`
  - Primary CTA: solid brass button `Ver cidades` → smooth-scrolls to `#destaque`.
- Animated scroll cue at bottom-center: thin brass vertical line with a dot that loops downward.
- Top nav stays minimal, sits over hero transparently, becomes glass on scroll (existing behavior preserved).
- Hero → next section transition: trailing gradient fade from hero bottom into page background so there's no hard edge.

## 3. New "Em destaque" band (`#destaque`)

Inserted between Hero and the existing `CityGrid`.

- Small section label `Em destaque` (brass eyebrow).
- Two large image-led cards, side-by-side on `md:grid-cols-2`, stacked on mobile, `aspect-[4/3]` on desktop, generous gap.
- ISTAMBUL card: full-bleed Istanbul photo (different from hero + grid), `Novo` brass pill badge, title `Istambul, Turquia`, tagline `Entre dois continentes, do azul do Bósforo ao azulejo de İznik.`, chip row `Abr–Jun / Set · €€ · Ritmo tranquilo · 5 dias`, brass button `Abrir guia` → `/istambul`.
- PRAGA card: same shape, `Praga, Chéquia`, tagline `Hora dourada sobre o Vltava, sem turistadas.`, chips `Mai–Set · €€ · Ritmo tranquilo · 4 dias`, button → `/praga`.
- Hover: image scale 1.04, card lift `-translate-y-1`, brass underline on title. Whole card is a `<Link>`; visible button is decorative.
- Staggered fade-up on scroll.

## 4. Light polish on the rest (no structural change)

- `CityGrid`: keep markup; only tighten top spacing so it follows the featured band rhythm. Audit images — every image on the page (hero slides, featured band, grid) must be unique; swap any duplicate Unsplash URL.
- `MethodStrip`: keep; ensure icon color uses brass token and chips share the same border style as featured chips.
- `EuropeMap` constellation: unchanged; Praga + Istambul already active via `CITIES`.
- `About` block + `SiteFooter`: copy unchanged.

## 5. Meta + brand

- Update meta description in route `head()` to: `Guias de viagem editoriais, testados por mim, cidade a cidade. Praga e Istambul já disponíveis; Florença, Barcelona e Londres em breve.`
- Verify `Compasso Routes` everywhere; `Viagens do Carlos` already absent — no further action.
- No light/dark toggle. No changes to `/praga` or `/istambul`.

## Files touched

- `src/routes/index.tsx` — rewrite `Hero`, add `FeaturedBand`, insert in `Home`, update head meta, add scroll-cue + crossfade logic.
- `src/styles.css` — add `.bg-grain` (SVG-noise data URI) and `.bg-vignette` utility classes via `@utility`; optional minor tuning of `--gold` ramp.

## Technical notes

- Crossfade: `useEffect` interval advancing index 0→N; each layer is an absolutely-positioned `<img>` with `motion.img` `animate={{ opacity: active ? 1 : 0, scale: active ? 1.08 : 1 }}` and long transition. Preload all hero images via `<link rel="preload" as="image">` in `head().links` (keep `fetchpriority="high"` on the first frame only for LCP).
- Smooth scroll: CTA uses `onClick` with `document.getElementById('destaque')?.scrollIntoView({ behavior: 'smooth' })`.
- Grain overlay: `::after` pseudo on hero section, `mix-blend-overlay`, `opacity: 0.06`, pointer-events none.
- All new Unsplash URLs use `images.unsplash.com/photo-…?auto=format&fit=crop&w=2000&q=80`, chosen for reliability (no hotlink-restricted hosts).
