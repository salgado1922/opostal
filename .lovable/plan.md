## Plano

### 1) MapCard consistente (Dias 1, 2, 4)

No `DayBlock` (src/routes/index.tsx, ~ linhas 683–718), reescrever o bloco do mapa como um componente `MapCard` reutilizável com tratamento uniforme:

- Wrapper: `rounded-2xl border border-gold/30 bg-twilight/60 shadow-[0_20px_60px_-30px_oklch(0.82_0.14_78/0.45)]`
- Altura fixa **h-64** (igual em todos os dias — remover o `md:h-96` atual)
- `<iframe>` recebe `style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(.75) contrast(.95)" }}` para se integrar no tema dark/golden
- Overlay inferior: `<div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-twilight via-twilight/70 to-transparent" />` dentro do wrapper (que passa a `relative`)
- Legenda dourada em itálico por baixo: *"Percurso a pé do Dia X"* + botão ghost "Abrir percurso no mapa" (mantido)

Aplicar a Dia 1, Dia 2 e Dia 4 (que mantêm `mapEmbedUrl`).

### 2) Dia 3 — sem mapa de caminhada

Em `days[2]` (Kutná Hora):

- **Remover** `mapEmbedUrl` e `mapLinkUrl` (linhas 279–282) — Kutná Hora fica a ~80 km, mapa a pé não faz sentido.
- No `DayBlock`, quando `mapEmbedUrl` não existir mas `day.id === "d3"` (ou via nova flag `transportCard`), renderizar um **"Como chegar" card** em vez do MapCard:

  - Mesmo enclosure visual (rounded-2xl, border gold/30, bg twilight, shadow) — coerente com os MapCards mas **sem iframe**.
  - Ícone `TrainFront` (lucide) + título "Como chegar a Kutná Hora".
  - Texto: "Comboio de Praha hl.n. → Kutná Hora (~55 min)".
  - Botão dourado primário "Ver horários (ČD)" → `https://www.cd.cz/en/` (Ticket + ExternalLink icons).
  - Nota secundária em itálico/serif: "Dentro de Kutná Hora, do Ossário de Sedlec ao centro são ~2,5 km — usar autocarro/táxi local."
  - Botão ghost dourado "Abrir Sedlec → centro no Google Maps" → `https://www.google.com/maps/dir/Sedlec+Ossuary/Kutn%C3%A1+Hora+city+centre/data=!4m2!4m1!3e0`

### 3) Detalhes técnicos

- Extrair `MapCard({ embedUrl, linkUrl, caption })` e `TransportCard({...})` como pequenos componentes locais no mesmo ficheiro, acima de `DayBlock`.
- Importar `TrainFront` de `lucide-react` (já usamos `Ticket`, `ExternalLink`, `Footprints`, `MapPin`).
- Sem mudanças noutras secções, sem alterações de cópia fora do que está acima, sem novos preços.

### Ficheiros tocados

- `src/routes/index.tsx` (único).
