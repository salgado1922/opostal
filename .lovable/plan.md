
## Goal

Replace the current pre-itinerary gate in `src/components/PremiumGate.tsx` with a quieter, editorial inline conversion block that matches the supplied PT-PT copy and structure exactly. It already renders inline (no popup) right before the locked itinerary on `/florenca`, `/praga`, `/istambul`, so no route or gating logic changes.

## Scope

- Edit only `src/components/PremiumGate.tsx`.
- No changes to routes, free sections, header, footer, checkout dialog logic, or other pages.
- Behaviour preserved: block renders only for users without access; users with access see the real premium content; the checkout itself stays in its existing Dialog (the spec forbids popups for the *block*, not for the checkout flow triggered by the CTA).

## Block structure (top to bottom)

1. Eyebrow: `Conteúdo premium` (small, uppercase, tracked, gold, with thin rules — keep existing style).
2. Title: `Desbloqueie o itinerário completo deste guia` (serif, large, calm).
3. Body paragraph (verbatim): `A partir daqui começa a parte prática do guia: o itinerário detalhado, organizado dia a dia, com os percursos, os horários e as escolhas já feitas por si. Acesso único, sem subscrições — compra-se uma vez e fica seu.`
4. "O que está incluído" bullet list (text-only, no icons, hairline bullets):
   - Itinerário detalhado, dia a dia
   - Vídeo do guia
   - Recursos práticos de planeamento
   - Acesso permanente, sem subscrição
5. Pricing selector — three understated radio rows with quiet selected state (thin gold border + subtle tint). Default selected: **2 guias**.
   - `1 guia — 7,90 €`
   - `2 guias — 14,90 €`
   - `3 guias — 18,90 €`
6. Primary CTA button below selector: `Comprar acesso` (existing gold button style).
7. Secondary quiet link below CTA: `Já comprou? Inicie sessão para desbloquear.` (always shown when signed-out; replaced by `Ver a minha conta` when signed-in, same quiet style).

## Removed from current implementation

- Faded itinerary teaser paragraphs (masked text).
- Italic "A partir daqui começa o itinerário detalhado…" preamble (replaced by the new body copy inside the block).
- The Lock icon row above the title (eyebrow alone is enough; keeps it less UI-like).

## Kept

- The credits panel ("Tem N créditos…" + redeem button) when signed-in user has remaining credits — appears between the bullets and the pricing selector as a subtle bordered note.
- Checkout Dialog triggered by `Comprar acesso` (unchanged).
- Sign-in redirect for guests when they click `Comprar acesso` (redirects to `/auth` with return to `#dias`).
- `id="dias"` and `scroll-mt-24` on the section so anchor links keep working.
- `PremiumGate` API (`slug`, `children`); the `teaserLines` prop becomes unused and is removed from the type.

## Visual tone

- Reuse current tokens: cream text, gold accents, `bg-background/40` with `border-gold/20`, serif headings, generous padding (`p-8 md:p-10`), max-width matches existing (`max-w-3xl`).
- No badges, no "popular" tag, no urgency copy, no emojis.
- Bullets rendered as a plain `<ul>` with `·` or thin gold dot markers and tight serif-adjacent line-height.

## Out of scope

- Stripe price ids, checkout server fn, auth flow, access hooks — all unchanged.
- No edits to the three guide route files; the gate is already inserted there.
