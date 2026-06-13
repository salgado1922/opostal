## Scope

Replace the header and city back-link logo with the newly uploaded transparent PNG, and strip the logo image out of all footers (text only).

## 1. Asset

Upload `user-uploads://8c5d475a-1979-4462-b05d-7dd62d461d24_1.jpg` (the new transparent stamp + outlined "O Postal" lockup — file is named `.jpg` on upload but is the transparent PNG the user described) via `lovable-assets` with filename `opostal-horizontal-transparent.png` → write pointer to `src/assets/brand/opostal-horizontal-transparent.png.asset.json`.

## 2. Header (`src/routes/index.tsx`)

Replace the import `opostalHorizontalDark` → `opostalHorizontalTransparent`. Update the header `<img>` (line ~103):

- `src` = new asset url, `alt="O Postal"`
- classes: `h-8 w-auto object-contain md:h-10` (≈32→40px desktop, 32 mobile — within the requested 28–32 / 34–40 range)
- ensure the wrapping `<Link to="/">` has no background / border / shadow / rounded utility — keep it a bare link; add `px-2 md:px-3` for breathing room
- verify the parent fixed top bar container has no chip/card behind the logo (transparent)

## 3. City back-links (`src/routes/praga.tsx`, `src/routes/istambul.tsx`)

Currently render `‹ [stampIcon] O Postal`. Replace with a single `<img src={opostalHorizontalTransparent.url} alt="O Postal" className="h-7 w-auto object-contain md:h-9" />` preceded by the `‹` chevron, wrapped in `<Link to="/">` with no background/border/shadow, `px-2` for spacing. Drop the now-unused `opostalStampIcon` import and the cream "O Postal" text node.

## 4. Footers — remove logo images

- `src/routes/index.tsx` line ~794: delete the `<img src={opostalVerticalDark.url} ... />` line; keep the existing footer text untouched.
- `src/routes/praga.tsx` line ~1217: delete the equivalent footer `<img>`.
- `src/routes/istambul.tsx` line ~1311: delete the equivalent footer `<img>`.
- Drop the `opostalVerticalDark` import from those three files (still used for og:image in `__root.tsx` — keep it there).

## 5. Cleanup / verification

- `rg "Compasso Routes|Viagens do Carlos"` → expect 0 hits (already verified previously).
- `rg "opostalHorizontalDark|opostalStampIcon"` in routes → expect 0 hits after refactor (the old dark/stamp asset JSONs stay on disk; they're still referenced by `__root.tsx` for favicon + og:image, so leave them).
- Visual: header transparent, logo crisp, back-links show new lockup, footers are text-only.

## Files touched

- `src/assets/brand/opostal-horizontal-transparent.png.asset.json` (new)
- `src/routes/index.tsx`
- `src/routes/praga.tsx`
- `src/routes/istambul.tsx`
