## Plan: Hero Headline & Legibility Update

### Goal
Change the homepage hero headline to **"O Postal"** and add a subtle, targeted gradient scrim + soft text-shadows so the text remains clearly readable over both bright and dark slideshow backgrounds. No other section, text, button, or layout changes.

### File to edit
- `src/routes/index.tsx` (Hero component only)

### Changes

1. **Headline text**
   - Replace the `<h1>` inner text with exactly: `O Postal`
   - Keep it as the page `<h1>`, keep existing `text-gradient-gold` class, font size, font family, weight, and `[-webkit-text-stroke]`.

2. **Add a targeted dark gradient overlay**
   - Inside the hero’s background container (`-z-10`), add a new absolute div with a directional linear-gradient that is darkest where the text sits (bottom-left) and fades to transparent toward the top-right.
   - Gradient: `linear-gradient(to top right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 60%)`.
   - This sits above the images and below the text layer (inside the `-z-10` wrapper), so it only darkens the hero background without affecting page content below.
   - The existing bottom fade-to-background gradient is kept unchanged so the hero still blends into the page.

3. **Refine text-shadows**
   - Headline (`<h1>`): change from `0 2px 24px rgba(0,0,0,0.45)` to `0 1px 12px rgba(0,0,0,0.45)` (subtler, tighter).
   - Subheadline (`<p>` below divider): change from `0 1px 12px rgba(0,0,0,0.55)` to `0 1px 12px rgba(0,0,0,0.45)` to match.
   - Eyebrow text shadow is left as-is.

4. **No other changes**
   - Eyebrow text, subheadline text, both CTA buttons, slideshow images/timing, and all other page sections remain untouched.

### Acceptance criteria
- Hero displays "O Postal" as the h1 with unchanged gold gradient styling.
- Text remains clearly legible on bright slideshow slides (e.g., the Prague sunset image).
- Text does not look crushed or muddy on dark slides.
- No boxes, banners, or solid color blocks behind the text.
- No em-dash character used anywhere.