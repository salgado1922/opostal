## Scope
Single file: `src/routes/praga.tsx`. Only edit the Day 3 object inside the `days` array. Nothing else in the file or site is touched.

## Changes

### 1. Day-level fields
- `howToGet`: change to `"comboio de Praha hl. n. → Kutná Hora hl. n. (~1h)"`.
- Add `highlightTip`: `"Fazer Sedlec primeiro — fica a ~1 km da estação principal — e só depois o centro. Assim andas sempre num sentido e não atravessas a cidade duas vezes."`.
- Add `mapEmbedUrl` and `mapLinkUrl` with destinations in this order:
  - Sedlec Ossuary → Kutná Hora city centre → St. Barbara's Church Kutna Hora.

### 2. Replace the `stops` array
New sequence (7 stops), reusing the existing `Stop` shape, component classes, and wiki links that already exist:

1. **08:40 — Comboio para Kutná Hora**
   - `desc`: "Saída da Hlavní Nádraží. ~1h de viagem confortável, lugares marcados."
   - `icon`: Train
   - `bookingUrl`: `[LINK_OMIO_PRAGA]`
   - `walkTo`: "~5 min de autocarro (Kutná Hora hl. n. → Sedlec)"

2. **10:00 — Ossário de Sedlec: reservar slot!**
   - Keep existing `link` to pt.wikipedia.org/wiki/Ossário_de_Sedlec
   - `desc`: "Capela revestida com ossos de 40 mil pessoas. Único, sombrio, inesquecível. ~30 min de visita + ~30 min para a Catedral de Sedlec ao lado (UNESCO) ou compras."
   - `icon`: AlertTriangle
   - `hours`: "~9:00–18:00"
   - `hoursNote`: "ENTRADA POR HORÁRIO MARCADO"
   - `bookingUrl`: `[LINK_GETYOURGUIDE_PRAGA_OSSARIO]`
   - `tip` (renders inside the expandable "Mais detalhes" block): "Compra aqui o bilhete combinado (Ossário + Catedral de Sedlec + Santa Bárbara, ~360 CZK) e evita fila depois em Santa Bárbara."
   - `walkTo`: "~10 min de autocarro até ao centro histórico"

3. **12:00 — Almoço no centro**
   - `desc`: "Cozinha checa tradicional. Sugestões: Restaurace V Ruthardce ou Dačický, a poucos passos de Santa Bárbara."
   - `icon`: Utensils
   - No booking link

4. **13:30 — Catedral de Santa Bárbara**
   - Keep existing `link` to pt.wikipedia.org/wiki/Catedral_de_Santa_Bárbara
   - `desc`: "Joia gótica patrocinada pelos mineiros de prata. Tetos abobadados de cortar a respiração. ~1h de visita + ~30 min para compras nas redondezas."
   - `icon`: Church
   - `hours`: "~9:00–18:00"
   - `bookingUrl`: `[LINK_GETYOURGUIDE_PRAGA_KUTNA_HORA]`

5. **14:45 — Explorar o centro histórico**
   - `desc`: "Rua Barborská com vista, Corte Italiana, fonte gótica e ruelas medievais — sem objetivos, até à hora do comboio."
   - `icon`: Sparkles
   - No booking link

6. **17:00 — Comboio de regresso a Praga**
   - `desc`: "~1h. Confirmar o horário do comboio antes de sair do centro."
   - `icon`: Train
   - No booking link

7. **20:00 — Concerto & Jantar (opcional)**
   - `title`: "Concerto & Jantar (opcional)"
   - `desc`: "Jantar leve em Praga e concerto clássico para fechar a noite — ver secção de concertos abaixo."
   - `icon`: Music

### 3. Transport box note
In `day.transport.note`, replace the current sentence with:
`"Dentro de Kutná Hora: da estação hl. n. ao Ossário de Sedlec ~1 km (autocarro ~5 min); de Sedlec ao centro histórico ~2,5 km (autocarro ~10 min)."`

### 4. Map link
Add `mapEmbedUrl` and `mapLinkUrl` to Day 3 with the ordered destinations:
- Sedlec Ossuary → Kutná Hora city centre → St. Barbara's Church Kutna Hora.

### What is NOT changed
- Day 1, Day 2, Day 4 stops and data.
- Concertos, Comer, Dicas, Reservas sections.
- Header, footer, global styles, hero, overview, or any other component.
- Placeholder affiliate links (`[LINK_OMIO_PRAGA]`, `[LINK_GETYOURGUIDE_PRAGA_OSSARIO]`, etc.) stay exactly as-is.