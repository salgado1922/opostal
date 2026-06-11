## Goal
Add an offline currency converter inside the existing **"Moeda"** card in the "Essencial para a viagem" section. Match the golden-hour theme (dark glass, gold accents, serif heading, rounded corners), pt-PT copy, fully responsive.

## Where
`src/routes/index.tsx` — the `essentials` array currently feeds simple `{ icon, title, body }` cards rendered by `EssentialInfo`. The "Moeda" entry will be upgraded to render a richer body that includes the converter, while the other 5 cards stay unchanged.

## Approach
1. Add `ArrowLeftRight` to the existing `lucide-react` import block.
2. Add a constant at the top of the file (right after imports, before `fadeUp`):
   ```ts
   const RATE_CZK_PER_EUR = 25; // 1 € = 25 CZK
   ```
3. Create a new `CurrencyConverter` component (defined near `EssentialInfo`):
   - Local state `eur` and `czk` as strings (so the user can clear inputs / type freely).
   - Two `<input type="number">` fields, labelled "€ (Euro)" and "CZK (Coroa checa)".
   - `onChange` on each updates the other live: typing € → `czk = round(eur * RATE)`; typing CZK → `eur = (czk / RATE).toFixed(2)`. Empty input clears the other side.
   - "Inverter" button with `ArrowLeftRight` icon — swaps the two values and moves focus to the other input.
   - Quick-reference chips below: `100`, `500`, `1000 CZK` → "X CZK ≈ Y €" (computed from the same constant). Clicking a chip prefills the inputs.
   - Gold italic caption: *"Taxa aproximada (1 € ≈ 25 CZK) — confirmar no dia."*
   - Styling: inputs use `bg-background/40 border-gold/20 rounded-xl`, focus ring `ring-gold/40`; chips are pill-shaped `border-gold/20 text-gold/90 hover:bg-gold/10`.
4. Modify `EssentialInfo` rendering to special-case the "Moeda" entry:
   - Same outer glass card / icon / title as the other essentials.
   - Body keeps the current short note ("Cartão aceite…/ATMs de banco — evitar Euronet"), then renders `<CurrencyConverter />` underneath.
   - Card spans the full row on desktop (`sm:col-span-2 lg:col-span-2`) so the inputs and chips have breathing room without breaking the existing 3-col grid for the others.
5. No network calls, no new dependencies.

## Visual details
- Inputs: serif numbers on the right (`text-right font-serif`), small uppercase label above each.
- Inverter button: ghost-style, `border-gold/30 text-gold hover:bg-gold/10`, icon-only on mobile, "Inverter" text on `sm:` and up.
- Chips: horizontal flex-wrap, `gap-2`, small font, rounded-full.
- Caption: `text-xs italic text-gold/80 mt-3`.

## Out of scope
- No live FX API, no rate persistence, no analytics. Single constant for the rate.

## Acceptance
- Typing in either field updates the other instantly with correct rounding (CZK whole numbers, € 2 decimals).
- Inverter swaps the values.
- Chips display correct € equivalents derived from `RATE_CZK_PER_EUR`.
- Editing the constant at the top changes every computed value on the page.
- Card visually matches the rest of the section on mobile and desktop.
