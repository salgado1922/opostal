## Scope

Rename the site to **O Postal** and replace the text wordmark with the new stamp-style logo across the home page, `/praga`, `/istambul`, head metadata, favicon, OG image, and footer. No structural changes — just brand, images and copy.

## 1. Assets

From the 5 uploaded images, prepare 6 CDN assets via `lovable-assets` (split combined images, crop the stamp):

- `opostal-horizontal-dark.png` — split top half of the combined horizontal image (cream text + colour stamp on dark)
- `opostal-horizontal-light.png` — split bottom half (charcoal text + colour stamp on light)
- `opostal-vertical-dark.png` — uploaded as-is (cream text on dark)
- `opostal-vertical-light.png` — uploaded as-is (black/charcoal text on light)
- `opostal-stamp-icon.png` — crop the stamp emblem out of the vertical-light image (no text), trimmed square with a small margin
- `opostal-outline.png` — uploaded outline version as-is

Each asset committed as a `.asset.json` pointer under `src/assets/brand/`. Originals not stored in repo.

## 2. Global text rename — "Compasso Routes" → "O Postal"

Search the entire project (excluding `.lovable/`, generated route tree, lockfiles) for `Compasso Routes` and `Viagens do Carlos` and replace every text occurrence. Touches at minimum:

- `src/routes/__root.tsx` — page title, og:title, twitter:title, og:site_name, description copy
- `src/routes/index.tsx` — meta title/description, og tags, footer line, any body mentions
- `src/routes/praga.tsx` — title `"Praga — O Postal"`, og tags, header back-link, footer
- `src/routes/istambul.tsx` — title `"Istambul — O Postal"`, og tags, header back-link, footer
- `src/routes/sitemap[.]xml.ts` — any branded copy
- `public/llms.txt`, `public/robots.txt` if branded
- Any aria-labels / alt text mentioning the old brand

New footer line (replaces existing):
> O Postal — Guias editoriais de cidades europeias — feitos com calma, partilhados com gosto.

Keep `Fotos: Unsplash · Wikimedia Commons` unchanged.

Verify with a final `rg "Compasso Routes|Viagens do Carlos"` — must return zero matches.

## 3. Header / top nav

Wherever the current text wordmark "Compasso Routes" appears as the top brand on `/`, `/praga`, `/istambul`:

- Replace with `<img src={opostalHorizontalDark.url} alt="O Postal" />`.
- Height: `h-9 md:h-10` (~36–40px desktop, ~28–32px mobile via `h-7 md:h-9` if needed).
- Wrap in `<Link to="/">` with hover opacity transition (`hover:opacity-80 transition-opacity`).
- Keep existing spacing; add small left padding so the perforated edge of the stamp doesn't crowd the viewport edge.
- Object-contain to preserve aspect ratio.

## 4. City pages back-link (`/praga`, `/istambul`)

Current back-link reads `‹ Compasso Routes`. Replace with:

```
‹  [stamp-icon 26–30px]  O Postal
```

- `‹` chevron + `<img src={opostalStampIcon.url} alt="" className="h-7" />` + the text "O Postal" in cream (`text-cream` / existing token).
- Links to `/`, subtle hover opacity. Aligned with existing top-left placement; no other changes to these pages.
- The `/istambul` page uses the İznik theme — the stamp icon is colour, so it sits naturally on both dark themes; the wordmark text stays cream so it reads on both palettes.

## 5. Favicon & social

In `src/routes/__root.tsx`:

- Replace existing favicon `links` with `{ rel: "icon", href: opostalStampIcon.url }` and `{ rel: "apple-touch-icon", href: opostalStampIcon.url }`. The cropped stamp emblem has a cream background which reads fine as a favicon on any browser chrome.
- Add `{ property: "og:image", content: opostalVerticalDark.url }` and `{ name: "twitter:image", content: opostalVerticalDark.url }` at root.
- Update `og:title` to `"O Postal"`, `og:description` to the home meta description, `og:site_name` to `"O Postal"`.

## 6. Footer brand sign-off

In the shared footer block on `/`, `/praga`, `/istambul`:

- Above the existing footer text, insert a centered `<img src={opostalVerticalDark.url} alt="O Postal" className="mx-auto h-24 md:h-28 mb-6" />`.
- Generous top/bottom spacing so it reads as a "postcard signature".
- Below it: renamed footer line from §2, then the existing `Fotos: Unsplash · Wikimedia Commons` line untouched.

## 7. Light surfaces

A quick scan of `src/routes/index.tsx`, `praga.tsx`, `istambul.tsx` to confirm: site is fully dark, no light-background sections currently use the wordmark. If any light card surfaces the brand, use `opostal-horizontal-light` / `opostal-vertical-light` there. Otherwise skip.

## 8. Verification

- `rg -n "Compasso Routes|Viagens do Carlos"` → 0 hits.
- Visual check on `/`, `/praga`, `/istambul` (desktop + mobile widths) for header, back-link, footer logo rendering crisp and not stretched.
- Favicon visible in browser tab; OG preview renders the vertical-dark card.

## Files touched

- `src/assets/brand/*.asset.json` (6 new pointer files)
- `src/routes/__root.tsx`
- `src/routes/index.tsx`
- `src/routes/praga.tsx`
- `src/routes/istambul.tsx`
- `public/llms.txt`, `public/robots.txt` (only if branded text present)
- `.lovable/plan.md` (this plan)
