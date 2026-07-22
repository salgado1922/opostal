# Reconstruir as 4 páginas de cidade a partir dos mockups WOW

## O problema
Os `.dc.html` no zip são mockups de design com placeholders (`{{ e.title }}`, `{{ d.title }}`, `{{ day.title }}`) — não contêm os dados reais. Substituir "à letra" apagaria todo o conteúdo útil (itinerários, restaurantes, dicas, links de afiliado, conversor, mapa) que hoje vive nas rotas React.

## Interpretação
Reescrever a **camada visual** de cada rota (Hero, estrutura de secções, tipografia, paleta, micro-elementos) para bater certo com o mockup correspondente, **mantendo intactos os dados** já existentes (arrays `days`, `restaurants`, `essentials`, `tips`, `phrases`, links Booking/GetYourGuide/Omio, componentes `PostmarkCircle`, `PostalStamp`, `CurrencyConverter`, `CustomItineraryCTA`, mapas embed, vídeos YouTube).

## Âmbito
- `src/routes/praga.tsx`
- `src/routes/istambul.tsx`
- `src/routes/florenca.tsx`
- `src/routes/londres.tsx`

Não toco em: homepage, `/abordagem`, `/roteiro-personalizado`, `SiteNav`, `SiteFooter`, componentes partilhados, `data/cities.ts`, dados de itinerário.

## O que muda por página

### Paleta por cidade (nos `<h1>` do hero, nos títulos de dia e nos overlays)
Extraída dos mockups:
- **Praga** — creme + âmbar quente: `oklch(0.96 0.02 75)` / `oklch(0.82 0.14 78)` / `oklch(0.62 0.14 38)`
- **Istambul** — off-white azulado + turquesa + ouro: `oklch(0.96 0.015 215)` / `oklch(0.77 0.12 205)` / `oklch(0.66 0.13 58)`
- **Florença** — creme + terracota + oliva (paleta renascentista já parcialmente presente)
- **Londres** — creme + vermelho britânico + latão (já parcialmente aplicado; reforçar no hero)

### Hero
- H1 escala mais dramática: `clamp(3.4rem, 8vw, 6.5rem)` com gradient da cidade.
- Manter parallax, `PostmarkCircle` e `PostalStamp` como estão hoje.
- Imagem de fundo: manter as novas capas CDN já registadas neste turno.

### Secção "Essencial"
- Cada item ganha uma bolinha luminescente antes do título, na cor primária da cidade: `<span style={{ boxShadow: '0 0 8px <cor>/0.7' }} />`.

### CTA final
- Praga e Londres: manter `"Carimbaste a viagem toda. Agora garante o essencial."`
- Istambul e Florença: alterar para `"O que reservar com antecedência"` (como no mockup).

### Micro-elementos comuns aos mockups
- Selos `📍`/`🗣`/`💱` antes dos títulos "Onde ficar", "Palavras úteis", "Conversor …" (Praga e Istambul já pediram esta troca).
- Divisórias tracejadas (`DashedDivider`) já existem — verificar que aparecem entre secções principais.

## O que fica igual (dados/lógica)
- Arrays de `days`, `stops`, `restaurants`, `tips`, `phrases`, `essentials` — inalterados.
- Todos os links Booking / GetYourGuide / Omio / mapas — inalterados.
- Componentes: `CurrencyConverter`, `PremiumGate` (se existir), `CustomItineraryCTA`, `PostmarkCircle`, `PostalStamp`, `StickyNav`, `DashedDivider`.
- Fontes, `styles.css`, temas globais — inalterados (as cores por cidade entram como Tailwind arbitrary values inline nos componentes de cidade).

## Verificação
- Build passa.
- Playwright screenshots das 4 rotas em desktop 1280 e mobile 390 → comparar lado-a-lado com os mockups WOW.

## Fora do âmbito
- Qualquer secção que os mockups mostrem mas cujos dados hoje não existam no repo (não invento paragens, restaurantes ou preços).
- Reescrita de itinerários.
- Homepage e outras rotas.

Aprova para eu passar a build e aplicar cidade a cidade.
