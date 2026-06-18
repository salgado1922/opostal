# Plano: Guia de Londres em opostal.pt

Adicionar uma nova página `/londres` que se integra perfeitamente com os guias existentes (Praga, Istambul, Florença), sem tocar em auth, billing ou no router gerado.

## 1. Novo ficheiro: `src/routes/londres.tsx`

Espelhar a estrutura de `florenca.tsx` (a referência mais recente e completa) secção a secção, em PT-PT, sem travessões longos:

1. `head()` completo: title, description, og:*, twitter:*, canonical para `https://opostal.pt/londres`, JSON-LD `TravelGuide`.
2. `<main className="theme-londres bg-twilight-radial min-h-screen overflow-x-hidden">`.
3. Componentes locais reaproveitados (mesmas assinaturas das outras cidades):
   - `StickyNav` com âncoras: contexto, antes, roteiro, itinerario, video, vs, comida, dicas, checklist.
   - `Hero` com imagem verificada do Commons.
   - `ConhecerLondres` (contexto editorial; integra "para quem é" e "como usar 3 dias + extra" em prosa, não em bullets).
   - `EssentialInfo` (transportes Oyster/contactless, bilhetes timed-entry London Eye / Madame Tussauds / WB Studio Tour, Changing of the Guard com padrão `hours` + `hoursNote` "Horário (confirmar):" janela ~10:45–11:30, Borough Market cedo, mini conversor GBP opcional).
   - `Overview` com os 4 dias.
   - `Itineraries` → `GuidePreviewGate slug="londres" sampleDays={1}` envolvendo `DayBlock` × 4.
   - `PremiumGate slug="londres"` envolve: `GuideVideo`, secção "vs" (Ir ou não aos Harry Potter Studios?), `Food`, `Tips`, `Checklist`.
   - `EndOfArticleCTA slug="londres"`, `Footer`.
4. Tipos `Day` / `Stop` e helpers (`Section`, `StopItem`, `DayBlock`) copiados da referência, com ícones `lucide-react`.

### Conteúdo dos dias (PT-PT, prosa editorial)

- **Dia 1 — West End e primeira South Bank:** Piccadilly Circus, Leicester Square, lojas M&M's/LEGO, Trafalgar Square, National Gallery (visita breve), almoço sem pressa em Chinatown/Soho, fim de tarde a caminhar na South Bank.
- **Dia 2 — Westminster, parques e South Kensington:** manhã Westminster/Big Ben/Parliament, St James's Park até Buckingham (Changing of the Guard opcional), tarde Hyde Park como pausa longa, Natural History Museum, Harrods como experiência.
- **Dia 3 — City, miradouro, Borough, Tate, Tower Bridge:** manhã St Paul's e miradouro (Sky Garden/Horizon 22, lógica "vistas fortes sem o preço do Shard"), meio-dia Borough Market (cedo), tarde Tate Modern / Millennium Bridge, caminhada à beira-rio até Tower Bridge.
- **Dia extra — Madame Tussauds e Harry Potter Studios:** manhã Madame Tussauds (combinar com Marylebone/Regent's Park), tarde Warner Bros. Studio Tour em Leavesden (~3,5–4 h de visita, meio-dia longo com transporte, reserva antecipada com transfer). Bloco textual "Alternativa sem os estúdios" como dia "Londres bónus".

### Secção "vs" (dentro de `PremiumGate`)

"Ir ou não aos Harry Potter Studios?" — duas cartas pró/contra (ícones `Check`/`X`) seguindo o padrão das comparações de Praga e Florença, com conclusão clara para fãs vs não fãs.

## 2. Editar `src/styles.css`

Acrescentar (a seguir ao bloco `.theme-firenze`) `.theme-londres` e `.theme-londres.bg-twilight-radial`, mesma estrutura do Firenze mas com paleta Londres:

- Base: cinzas "fog" e azuis petróleo/marinho esbatidos para background, card, popover, muted.
- `--terracotta` / `--secondary`: vermelho britânico profundo (autocarros, cabines).
- `--gold` / `--primary`: dourado discreto para detalhes finos.
- Re-rotear todos os tokens partilhados (`--twilight`, `--plum`, `--gold`, `--gold-soft`, `--terracotta`, `--cream`, `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--accent`, `--muted`, `--border`, `--input`, `--ring`).
- Override radial com tonalidades das fog/red/blue.

Sem alterações fora deste bloco. Na página só se usam classes/tokens existentes (sem `bg-[oklch(...)]` à mão).

## 3. Editar `src/data/cities.ts`

Na entrada Londres já existente: `status: "ready"`, acrescentar `to: "/londres"`, `duration: "3 dias + extra"`, rever `vibe` e `idealFor` em PT-PT no tom do site. Sem entrada duplicada. Outras cidades intactas.

## 4. Editar `src/routes/index.tsx`

Ajustar a frase no hero que lista Londres entre as cidades "a caminho": mover Londres para o conjunto disponível, mantendo a frase natural em PT-PT. Sem outras alterações estruturais.

## Imagens

Fonte primária: Wikimedia Commons via `Special:FilePath/<ficheiro>?width=1600` (cover) ou `?width=1200` (stops). Verificar cada URL antes de fixar.

Sementes confirmadas a usar já:
- Hero: `London_skyline_at_night_facing_tower_bridge.jpg`
- Dia 2 / Westminster: `Big_Ben_and_Palace_of_Westminster_London_2016_03.jpg`, `Palace_of_Westminster_night.JPG`, `Westminster_Bridge_with_shadows_and_Big_Ben.jpg`
- Dia 3 / Tower Bridge: `Tower_Bridge_London_Feb_2006.jpg`

Restantes (uma por paragem) extraídas e verificadas a partir das categorias Commons listadas: National Gallery, Trafalgar Square, Piccadilly Circus, South Bank, St James's Park, Buckingham Palace, Hyde Park, Natural History Museum, Harrods, St Paul's, Sky Garden, Borough Market, Tate Modern, Millennium Bridge, Regent's Park, Marylebone.

Regras:
- Constante `FALLBACK_COVER` apontando para o `city-londres.jpg` local (mesmo import que `cities.ts`); usar em qualquer caso onde a verificação falhar.
- Dia extra Harry Potter / Madame Tussauds: SEM imagens de filmes, sets, props, personagens ou figuras de cera de pessoas reais. Apenas Marylebone, Regent's Park, viagem ou sinalética exterior dos estúdios.
- Todas as `<img>` com `loading="lazy"` e `alt` em PT-PT.

## Links de afiliado

Reutilizar `AffiliateLink` (Booking/GetYourGuide) apenas onde houver URL real. Onde não houver, comentário `// TODO: affiliate link`. Links informativos apontam para sites oficiais.

## Restrições

- Não tocar em `src/routeTree.gen.ts`, auth, Supabase, Stripe, entitlements, `.env`, design system, outras rotas, dependências.
- Sem travessão longo `—` no copy do utilizador (vírgulas, dois pontos, parênteses; `–` só em intervalos numéricos).
- Sem `bg-[oklch(...)]` hardcoded na página.

## Verificação

- Build de produção passa, `routeTree.gen.ts` regenera com `/londres`.
- Página renderiza com a paleta `.theme-londres`.
- Cartão Londres aparece na homepage como guia disponível, pino do mapa ativo.
- Cada `<img>` da página devolve 200 (verificado antes de submeter).
