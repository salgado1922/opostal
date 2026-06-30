## Objetivo

Substituir a homepage atual (`src/routes/index.tsx`) pela nova versão "WOW" do mockup enviado, mantendo a integração com o resto do site (SiteNav, SiteFooter, dados de `CITIES`, rotas TanStack, metadados SEO já existentes).

## O que muda visualmente

A nova homepage tem apenas três blocos, mais limpa que a atual:

1. **Hero** — slideshow de cidades em fundo (com Ken Burns), título "O Postal" em gradiente dourado, carimbo MMXXVI no canto, e uma nota manuscrita "vira cada postal ↓" ao lado do botão dourado "Explorar roteiros gratuitos".
2. **Catálogo de cidades** — grelha de **postais viráveis (flip 3D)**:
   - Frente: capa da cidade, selo serrilhado "O Postal / XXX / Visitado", chip "vira →", painel com nome, vibe e duração.
   - Verso: fundo de postal listrado com mensagem manuscrita (Caveat) escrita "na primeira pessoa" pelo Postal, mini-carimbo e botão "Abrir roteiro" que leva à rota da cidade.
   - Carimbo "VISITADO" / "EM BREVE" em tinta vermelha aparece ao virar.
3. **Sobre** — caixa final com a mesma cópia atual ("Viajar devagar, sem turistadas.").

Por cima de tudo, uma **rota tracejada dourada em SVG** desenha um caminho vertical sinuoso ao longo da página, com um "ponto-token" pulsante que avança conforme o scroll — o "fio" que liga os postais.

Detalhes adicionais:
- Nav fixo transparente que ganha blur/border ao passar do hero (igual ao mockup).
- Postmark do hero faz parallax suave no scroll.

## O que é removido

As secções **"Como fazemos os roteiros"**, **"Quando o roteiro precisa de ser teu"** (bloco do roteiro personalizado) e **FAQ** desaparecem da homepage para ficar tão minimal como o mockup. O CTA dourado "Roteiro personalizado" continua no `SiteNav`, por isso o serviço continua acessível em todo o site; a página `/roteiro-personalizado` mantém-se.

Se preferires manter alguma destas três secções (ex.: FAQ ou bloco do roteiro personalizado), diz-me antes de aprovar e ajusto.

## O que NÃO muda

- `src/components/SiteNav.tsx`, `src/components/SiteFooter.tsx`, `src/data/cities.ts`, rotas das cidades, `/abordagem`, `/roteiro-personalizado`, sitemap, estilos globais, fontes (Caveat e Cormorant já carregadas em `__root.tsx`).
- Metadados SEO e JSON-LD do `head()` da homepage — preservados tal e qual.
- Assets — uso os ficheiros já em `src/assets/` (`hub-hero.jpg`, `city-*.jpg`, `istambul/home-card.jpg`). Não importo as imagens do zip porque já existem no projeto.

## Detalhes técnicos

Tudo num único ficheiro: rescrita completa de `src/routes/index.tsx`. Mantém `createFileRoute("/")` e o `head()` atual.

- **Postcard flip**: cada card é um `<div>` com `perspective:1600px` + filho `transform-style:preserve-3d` que alterna entre `rotateY(0)` e `rotateY(180deg)` via state local (`useState<Record<string, boolean>>`). Frente e verso usam `backface-visibility:hidden`. Hover em desktop e clique em mobile (controlado por `useMediaQuery`/`matchMedia`).
- **Selo e carimbo**: já existem `PostalStamp` e `PostmarkCircle`, mas o mockup tem variantes específicas (selo na frente, carimbo "VISITADO" no canto do verso). Reutilizo `PostalStamp` e `PostmarkCircle` onde encaixam; o carimbo vermelho do verso é inline (caixa com borda dupla e rotação) para corresponder ao mockup.
- **Rota SVG**: componente `<RouteThread />` montado dentro do `<main>` com `position:absolute`, calcula o `path` em função de `clientWidth`/`scrollHeight` no `useEffect` + `ResizeObserver`. Atualiza `strokeDashoffset` e a posição do token num listener de `scroll` com `requestAnimationFrame`. `prefers-reduced-motion` desativa o token pulsante e o Ken Burns.
- **Mensagens dos postais**: copio as cinco mensagens do mockup (Praga, Istambul, Florença, Londres, Barcelona) para uma constante local — não toco em `src/data/cities.ts`. O slug e o link `to` continuam a vir de `CITIES`.
- **Acessibilidade**: cada card é um `<button>` com `aria-pressed` para o estado flipped; o link "Abrir roteiro" no verso é um `<Link>` real e usa `e.stopPropagation()` para não virar de volta ao clicar.
- **Performance**: hero slideshow continua com `fetchPriority="high"` apenas na primeira imagem; restantes `loading="lazy"`. SVG da rota só corre o `requestAnimationFrame` enquanto o utilizador faz scroll.

## Verificação após a implementação

Não há schema novo nem dependências novas. Confirmo build TS (`tsgo`), carrego `/` no preview e valido:
- Hero anima e troca de imagens.
- Cartões viram ao clicar; carimbo "VISITADO/EM BREVE" aparece.
- Botão "Abrir roteiro" navega para a rota da cidade.
- "Em breve" (Barcelona) fica grayscale e não navega.
- Rota dourada acompanha o scroll sem reflow visível.
