## Scope

Add 5 new "Em breve" cities to the home page (`/`) of the Compasso Routes site. Only `src/data/cities.ts` and `src/routes/index.tsx` are touched. City pages (`/praga`, `/istambul`) are untouched.

## 1. Data — `src/data/cities.ts`

Append 4 new `CityMeta` entries to the `CITIES` array with `status: "coming-soon"`:


| slug      | name      | country  | vibe                               | duration | bestSeason        | price  | idealFor         | coords       | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| --------- | --------- | -------- | ---------------------------------- | -------- | ----------------- | ------ | ---------------- | ------------ | ------ | ------ | ------ | ------ | ------ |
| paris     | Paris     | França   | Bairros, museus e cafés sem fim.   | Em breve | Abr–Jun / Set–Out | €€€    | Clássico eterno  | 2.35, 48.85  | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| viena     | Viena     | Áustria  | Palácios imperiais, café e valsa.  | Em breve | Abr–Jun / Set     | €€€    | Arte e elegância | 16.37, 48.21 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| lisboa    | Lisboa    | Portugal | Luz, miradouros e fado à esquina.  | Em breve | Mar–Jun / Set–Out | €€     | Cidade e mar     | -9.14, 38.72 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| budapeste | Budapeste | Hungria  | Termas, Danúbio e ruínas com vida. | Em breve | Abr–Jun / Set     | €€     | Banhos e boémia  | 19.04, 47.50 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp;    | &nbsp;    | &nbsp;   | &nbsp;                             | &nbsp;   | &nbsp;            | &nbsp; | &nbsp;           | &nbsp;       | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |


Cover images: reliable Unsplash URLs, unique across the entire site (verified against all existing URLs in `index.tsx`, `praga.tsx`, and `istambul.tsx`):

- Paris — `photo-1502602898657-3e91760cbb34`
- Viena — `photo-1516550893923-42d28e5677af`
- Lisboa — `photo-1555881400-74d7acaacd81`
- Budapeste — `photo-1489924679458-f2cf780fc4b4`

## 2. Home page — `src/routes/index.tsx`

- Update `head()` meta description to:  
"Guias de viagem editoriais, testados por mim, cidade a cidade. Praga e Istambul já disponíveis; Paris, Viena, Lisboa, Budapeste, Florença, Barcelona e Londres em breve."
- No structural/component changes required. The existing `CityGrid` and `EuropeMap` already iterate over `CITIES`, so new entries automatically render as muted coming-soon cards and inactive constellation nodes.

## 3. Consistency checks

- Confirm every image URL on the page remains unique (hero slides, featured band, city cards).
- Confirm "Compasso Routes" branding is untouched.
- Confirm no light/dark toggle is introduced.

## Files touched

- `src/data/cities.ts`
- `src/routes/index.tsx` (meta description only)