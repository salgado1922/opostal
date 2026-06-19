## Goal
Lighten the opostal.pt homepage into a calmer, more editorial single-message page (free guides first, discreet pointer to paid service). Only `src/routes/index.tsx` is touched.

## Changes

### 1. Merge "Como fazemos os roteiros" + "Testado no terreno" into one section
- Replace the existing `MethodSection` component with a single merged section placed in its current position.
- Remove the `TestedOnGround` component entirely.
- New content (verbatim PT-PT):
  - Eyebrow: "Método"
  - Title: "Como fazemos os roteiros"
  - Intro: "Cada guia nasce no chão da cidade, não atrás de um ecrã."
  - Bullets:
    - "Percorremos cada cidade a pé, com tempo, sem pressa de cumprir lista."
    - "Testamos os sítios antes de os recomendar: as mesas, os miradouros, os cafés."
    - "Ficamos só com o que vale mesmo a pena, e dizemos do que vale a pena fugir."
    - "Só recomendamos cidades que percorremos pessoalmente, rua a rua."
  - Closing paragraph: "Não copiamos listas nem repetimos o que toda a gente diz. O que está aqui foi visto, provado e escolhido com critério."
- Preserve existing motion wrapper, max-width, padding, and bullet styling.

### 2. Remove "Tudo num só sítio" section
- Delete the `EditorialNote` component entirely.
- Remove it from the `Home` component render order.

### 3. Shrink custom-itinerary section into a single invitation
- Replace the `CustomItinerary` component (currently two price cards + grid) with a simple calm block.
- Content (verbatim PT-PT):
  - Eyebrow: "À tua medida"
  - Title: "Quando o roteiro precisa de ser teu"
  - Text: "Os guias gratuitos servem a maioria das viagens. Mas às vezes queres algo desenhado à tua medida: o teu ritmo, os teus interesses, as tuas datas. Para isso, preparamos roteiros personalizados."
  - CTA button: "Ver roteiro personalizado" -> links to `/roteiro-personalizado`
- Do not show prices, product cards, or comparison on the homepage.
- Keep existing motion wrapper and max-width styling.

### 4. Remove 4-step "Como funciona" section
- Delete the `HowItWorks` component entirely.
- Remove it from the `Home` component render order.
- The `#como-funciona` anchor in the header/footer is left untouched per instructions; it will simply not scroll to a matching element.

### 5. Trim FAQ to three questions
- Keep only these three entries (verbatim):
  1. Q: "Os roteiros são mesmo gratuitos?"
     A: "São. Os guias base de cada cidade do catálogo estão abertos a toda a gente, sem registo e sem pagamento."
  2. Q: "Como é que O Postal ganha dinheiro?"
     A: "Com os roteiros personalizados e com ligações úteis a parceiros de reserva. Alguns desses links são afiliados, o que significa que podemos receber uma pequena comissão, sem qualquer custo adicional para ti."
  3. Q: "O que é um roteiro testado no terreno?"
     A: "É um guia de uma cidade que percorremos pessoalmente, a pé, antes de a recomendar. Tudo o que está no guia foi visto e provado."
- Remove all other FAQ entries.
- Preserve Accordion markup and styling.

### 6. Update `Home` render order
After all changes, the `Home` component should render:
`Hero -> CityGrid -> MethodSection (merged) -> CustomItinerary (invitation) -> Faq (3 items) -> About -> SiteFooter`

## Visual guardrails
- Reuse existing Tailwind classes, fonts, spacing, motion wrappers, and component imports.
- Do not change hero, city grid, header, or footer styling.
- Do not use em-dash, placeholder copy, or Brazilian Portuguese.
- Maintain "nós" voice throughout.

## Files touched
- `src/routes/index.tsx` only.