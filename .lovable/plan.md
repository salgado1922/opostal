All edits live in `src/routes/index.tsx`. Theme, fonts and accordion behavior stay untouched. All text in pt-PT. No prices invented.

## 1. Extend the `Stop` / `Day` types

Add optional fields to drive the new UI without breaking existing stops:

```ts
type Stop = {
  // …existing
  bookingUrl?: string;     // shows gold "Reservar" button
  hours?: string;          // shows "Horário (confirmar)" line with Clock
  hoursNote?: string;      // extra red/amber emphasis line (e.g. "FECHA AOS SÁBADOS")
  walkTo?: string;         // walking chip shown BETWEEN this stop and the next ("~12 min")
};

type Day = {
  // …existing
  walkTotal?: string;       // "A pé hoje: ~25 min"
  howToGet?: string;        // "Como chegar: elétrico 22 até Pražský hrad (~20 min)"
  mapEmbedUrl?: string;     // Google Maps `?output=embed` iframe src
  mapLinkUrl?: string;      // fallback "Abrir percurso no mapa"
  dayNote?: { tone: "amber"; text: string }; // Day 1 Josefov warning
};
```

Also import new icons: `Ticket`, `ExternalLink`, `Footprints` from `lucide-react`.

## 2. Day 2 — Petřín wording

Replace the description of the "Torre de Petřín" stop (line 224):

> Subir de elétrico 22 até Pohořelec + caminhada suave pelo parque, ou pelo elevador dentro da torre. (Funicular fechado para obras até ao fim do verão de 2026.)

Also add `hours: "~10:00–22:00"`.

## 3. Booking buttons + hours per stop

Populate the new fields on the existing stops (and add an explicit Josefov hours block):

| Day | Stop | bookingUrl | hours | hoursNote |
|---|---|---|---|---|
| d1 | Josefov | https://www.jewishmuseum.cz/en/ | Dom–Sex ~9:00–18:00 | FECHA AOS SÁBADOS |
| d2 | Castelo | https://www.hrad.cz/en | ~9:00–17:00 | — |
| d2 | Petřín | — | ~10:00–22:00 | — |
| d3 | Comboio | https://www.cd.cz/en/ | — | — |
| d3 | Sta Bárbara | https://khfarnost.cz/en/ | ~9:00–18:00 | — |
| d3 | Ossário | https://www.sedlec.info/en/ | ~9:00–18:00 | ENTRADA POR HORÁRIO MARCADO |
| d4 | Vyšehrad | — | Recinto grátis, sempre aberto | — |

Render inside `StopItem` header area:
- Gold "Reservar" pill: `border-gold/40 bg-gold/15 text-gold hover:bg-gold/25` with `<Ticket>` + `<ExternalLink>` icons, `target="_blank" rel="noopener noreferrer"`.
- "Horário (confirmar)" line: `<Clock>` icon + small text; when `hoursNote` set, second line in amber/terracotta (`text-terracotta`).

Buttons go in their own flex row under the title to avoid breaking the existing accordion toggle area.

## 4. Day 1 amber note (Josefov on Saturday)

Add to Day 1 `dayNote: { tone: "amber", text: "Vê hoje (quarta): o bairro judeu fecha ao sábado." }`. Render above the timeline as a small amber card (reuses the `highlightTip` styling but with the `dayNote.text`). Day 1 already has no `highlightTip`, so no conflict.

## 5. Walking chips + "A pé hoje" header

Per-day values:

- d1: stops walkTo → Hotel→Josefov `~12 min`, Josefov→Praça `~4 min`, Praça→Ponte Carlos `~6 min`. `walkTotal: "A pé hoje: ~25 min"`. No `howToGet`.
- d2: `howToGet: "Como chegar: elétrico 22 até Pražský hrad (~20 min)"`. Stops walkTo → Castelo→S. Nicolau `~12 min`, S. Nicolau→Muro do Lennon `~5 min`, Muro→Petřín `~10 min` + subida `~25–30 min`.
- d3: `howToGet: "Como chegar: comboio de Praha hl.n. (~55 min)"`. Walking chip between Sta Bárbara and Ossário is the special line: "Sedlec ↔ centro ~2,5 km — usar autocarro/táxi local."
- d4: `howToGet: "Como chegar: metro C até Vyšehrad"`. Vyšehrad plano. Final stop note: "regresso de Bolt/Uber" (already covered by existing 16:00 stop, just keep).

Render:
- Below the day header, a small horizontal flex row with two pills: `walkTotal` (Footprints icon) and `howToGet` (MapPin icon).
- Inside `day.stops.map`, after each stop with `walkTo`, render a centered chip `<Footprints>` + text between cards (small rounded-full border-gold/20 bg-twilight pill, `text-xs text-gold/80`).

## 6. Google Maps embeds per day

Add `mapEmbedUrl` to each Day using `google.com/maps?output=embed&q=...` directions URLs (no API key required). Examples:

- d1: `https://www.google.com/maps?output=embed&saddr=Hotel+Garden+Court+Prague&daddr=Josefov+Prague+to:Old+Town+Square+Prague+to:Charles+Bridge+Prague&dirflg=w`
- d2: `…&saddr=Prague+Castle&daddr=St.+Nicholas+Church+Mala+Strana+to:Lennon+Wall+Prague+to:Petrin+Tower&dirflg=w`
- d3: `…&saddr=St.+Barbara+Cathedral+Kutna+Hora&daddr=Sedlec+Ossuary&dirflg=w`
- d4: `…&saddr=Vysehrad+Prague&daddr=Hotel+Garden+Court+Prague&dirflg=w`

Render at the bottom of each `DayBlock`:

```tsx
<div className="mt-10 overflow-hidden rounded-2xl border border-gold/20 shadow-[0_20px_60px_-30px_oklch(0.82_0.14_78/0.4)]">
  <iframe src={day.mapEmbedUrl} loading="lazy" className="h-72 w-full" />
</div>
<p className="mt-3 text-center font-serif text-sm italic text-gold/80">
  Percurso a pé do {day.label}
</p>
```

Also include a gold ghost button "Abrir percurso no mapa" linking to the same URL without `&output=embed` (new tab).

## 7. Concertos — booking buttons side by side

In the "A Coisa a Sério" tier (`t.highlight === true`), add a flex row above the CTA with two gold "Reservar" buttons side by side: Rudolfinum (`https://www.rudolfinum.cz/en/`) and Casa Municipal (`https://www.obecnidum.cz/en/`). Same `Ticket + ExternalLink` styling.

## Out of scope

- No price changes anywhere.
- No image swaps.
- No layout/theme/font changes.
- Existing accordion behavior on `StopItem` is preserved — new booking/hours UI is rendered inside the card but outside the toggle button so it doesn't trigger open/close.
