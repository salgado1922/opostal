## Goal
Replace the hand-drawn `EuropeMap` SVG in `src/routes/index.tsx` with a real geographic map of Europe using `react-simple-maps`, styled to the golden-hour theme, with pins placed by real lat/lon.

## Dependencies
- Add `react-simple-maps` and `d3-geo` (peer for projection helpers if needed).
- Add a TopoJSON source for countries. Use `world-atlas` package (`bun add world-atlas`) and import `world-atlas/countries-110m.json` locally so the map works offline / has no runtime CDN dependency.
- Types: `bun add -d @types/react-simple-maps`.

## Implementation (only `src/routes/index.tsx`)

Replace the existing `EuropeMap`, `MapPin`, `EUROPE_PATH`, `UK_PATH`, `IRELAND_PATH`, `ITALY_PATH`, `MAP_VIEW`, `MAP_BOUNDS`, and `projectCoord` block with a new `EuropeMap` built on `react-simple-maps`.

Structure:

```tsx
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { geoMercator } from "d3-geo";
import worldGeo from "world-atlas/countries-110m.json";
```

Key choices:
- `<ComposableMap projection="geoMercator" projectionConfig={{ center: [10, 52], scale: 700 }} width={1000} height={720}>` — centred on Europe, scale tuned so the frame is filled (Praga, Londres, Barcelona, Florença all comfortably inside with margin).
- `<Geographies geography={worldGeo}>` renders country borders. Each `<Geography>` styled:
  - `fill: "oklch(0.28 0.055 310)"` (plum/indigo land)
  - `stroke: "oklch(0.82 0.14 78 / 0.18)"` (faint gold borders)
  - `strokeWidth: 0.4`
  - default/hover/pressed identical (non-interactive feel)
  - `style={{ outline: "none" }}`
- Sea: `<rect>` background `oklch(0.16 0.035 290)` inside the map container, plus the existing radial golden glow div behind.
- No country labels (don't render any `<text>` for geographies).

City data — keep using existing `CITIES` entries which already include `coords: { lat, lng }`. Pins via `<Marker coordinates={[lng, lat]}>`:
- Active (Praga): outer soft glow circle (r=18, gold, opacity .25, blur filter), animated pulsing ring (`<animate>` r 8→22, opacity .7→0, 2.4s) gated by `useReducedMotion`, inner gold dot r=5 with cream center r=2, label to the right.
- Dimmed: small muted dot r=3.5, muted label.
- Wrap active marker in `<Link to="/praga">`; dimmed in a plain `<g aria-label="… — em breve">`.
- Labels use serif font, gold (active) / muted cream (dimmed). Slight x offset.

Connector lines: render `<Line from={[lng1,lat1]} to={[lng2,lat2]} stroke="oklch(0.82 0.14 78 / 0.3)" strokeWidth={0.8} strokeDasharray="2 5" />` between every pair of cities. `react-simple-maps` `<Line>` follows great-circle, which gives a natural subtle curve on Mercator at this scale.

Scroll reveal:
- Keep the existing `IntersectionObserver` pattern to flip a `visible` state at threshold 0.25.
- Wrap pins in `motion.g` with `initial={{ opacity:0, scale:0.4 }}`, `animate={visible ? {opacity:1, scale:1} : ...}`, staggered `delay` per index, `useReducedMotion` short-circuits to no animation.
- Connector `<Line>` elements wrapped likewise: fade opacity 0→1 once visible (no `pathLength` since `<Line>` from `react-simple-maps` renders a `<path>` we don't directly control; fade is sufficient and on-theme).

Responsiveness:
- `<ComposableMap>` gets `style={{ width: "100%", height: "auto" }}`, viewBox preserved via its internal SVG. Pins use geographic coordinates so they reposition correctly at every size — no manual projection math needed.

Keep unchanged:
- Section wrapper, title `O mapa das viagens`, eyebrow `Constelação`, container styling, gold glow overlay, and the gold italic caption `Uma cidade percorrida — e o mapa só vai crescer.`

## Out of scope
- No changes to `CITIES`, other sections, theme tokens, or `/praga`.
- No removal of `framer-motion` (still used for reveal).

## Verification
- Visual check at desktop + mobile widths via preview.
- Confirm Praga pin sits over Czechia, Londres over UK, Barcelona over NE Spain, Florença over central Italy.
- Confirm pulsing ring stops when `prefers-reduced-motion: reduce` is set.
- Build passes (TS + Vite).
