## Goal
Serve right-sized images on mobile/desktop with zero visual change. No quality drop, no framing changes, no layout shifts.

## 1. New component — `src/components/SmartImage.tsx`

Thin wrapper over `<img>`:

- Props: `src: string`, `alt: string` (required), `width: number`, `height: number`, `sizes?: string`, `priority?: boolean`, plus passthrough (`className`, `style`, `onClick`, `aria-*`, `loading` override, etc.).
- Default `sizes`: `(max-width: 768px) 100vw, 1200px` (overridable per call site for hero/full-bleed).
- Default: `loading="lazy"`, `decoding="async"`.
- `priority=true` → `loading="eager"`, `fetchpriority="high"`.
- `width`/`height` rendered as attributes only (aspect reservation). Existing Tailwind classes (`w-full`, `h-full`, `object-cover`, aspect-ratio utilities) continue to govern layout — the intrinsic attrs never override CSS sizing.
- `srcset` builder rewrites ONLY the width parameter:
  - Unsplash (`images.unsplash.com`): replace `w=NNN` value; if absent, append `&w=NNN`.
  - Wikimedia (`upload.wikimedia.org` / `Special:FilePath?...width=`): replace `width=NNN`.
  - Any other host (imported local asset URLs, `.asset.json` refs): render `<img>` with just `src`, no srcset.
- Widths: `[480, 768, 1200, 1600, 2400]`. Largest entry ≥ the URL's current `w=`/`width=`; if the source width exceeds 2400, extend the top of the ladder to that value so hi-DPI never downgrades.
- Every OTHER query param (`q`, `fit`, `crop`, `auto`, `fm`, `cs`, etc.) preserved verbatim. If URL has no `q=`, append `q=80`. Never lower an existing `q`.

## 2. Migration pass — replace every `<img>` with `<SmartImage>`

Routes touched:

- `src/routes/index.tsx` (homepage: hero slideshow + 5 city cards + any inline imgs)
- `src/routes/praga.tsx`
- `src/routes/istambul.tsx`
- `src/routes/florenca.tsx`
- `src/routes/londres.tsx`
- `src/routes/paris.tsx`
- `src/routes/roteiro-personalizado.tsx` (images only — do NOT touch the form)
- `src/routes/abordagem.tsx` (also has `<img>`s — included for consistency)

Rules per route:
- Exactly one `priority` image = the hero background/foreground `<img>`. Every other `<img>` (including the 5 homepage city-card covers) stays lazy.
- Fill empty `alt=""` on homepage city cards with the city name (e.g. `alt="Praga"`).
- Preserve all classNames, wrappers, motion elements, and hrefs. Placeholders like `[LINK_BOOKING_PRAGA_STARE_MESTO]` untouched.

### Intrinsic width/height

For attribute values, derive from the URL's current requested width and a measured aspect ratio:

- Unsplash URLs already include the source aspect via `w=` + `fit=crop&h=...` OR are unconstrained — for our set the rendered container drives the shape, so I'll use the requested `w` for `width` and compute `height` from the URL's `h=` when present, else from Unsplash photo API metadata via `?w=1&fm=json` lookup **during the pass** (one-off, at edit time, not runtime).
- Wikimedia `Special:FilePath?width=...`: HEAD the URL once to read `Content-Length`? No — HEAD `?width=1` on Wikimedia returns image dims via response headers; simpler: fetch the tiny 32px thumb and read PNG/JPEG dims with a small script.

**Stop condition trigger:** if for any specific image intrinsic aspect cannot be resolved from URL/API, pause and ask before assigning fake dims.

Since attrs never override the Tailwind sizing on any current call site (all city imgs live inside `object-cover` containers), placement will not shift layout. I'll verify by spot-checking hero and a stop-image accordion after the pass.

## 3. `index.html`

Add inside `<head>`:

```html
<link rel="preconnect" href="https://images.unsplash.com" crossorigin>
<link rel="preconnect" href="https://upload.wikimedia.org" crossorigin>
```

## 4. Verification checkpoints

After each route: `✅ [route] — N images migrated, 1 priority`.

Final report:
- Table: files changed + image count per file.
- Count of remaining raw `<img>` occurrences across `src/` (target: 0, excluding SmartImage.tsx itself).
- Confirmation grep: no `q=` value in any migrated URL differs from the original; no `fit=`/`crop=` param was added, removed, or reordered.

## Out of scope
Copy, colors, fonts, Tailwind classes, routes, hrefs, form logic, format conversion, dependency changes, deletions.
