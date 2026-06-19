## Objetivo

Criar a página dedicada ao serviço pago de roteiro personalizado em `/roteiro-personalizado`, com toda a copy PT-PT verbatim fornecida, formulário a submeter via Formspree, e atualizar os destinos dos CTAs existentes (sem mexer no resto do design).

## 1. Nova rota: `src/routes/roteiro-personalizado.tsx`

- `createFileRoute("/roteiro-personalizado")` com `head()` a definir:
  - title: `Roteiro personalizado | O Postal`
  - meta description verbatim
  - canonical e og:url `https://opostal.pt/roteiro-personalizado`
- `validateSearch` (zod) para aceitar `?destino=` opcional, lido via `Route.useSearch()` para pré-preencher o campo Destino.
- Reutiliza o shell editorial (mesmo `SiteNav` + footer da homepage). Para evitar duplicação, vou extrair `SiteNav` e `SiteFooter` do `src/routes/index.tsx` para `src/components/SiteNav.tsx` e `src/components/SiteFooter.tsx`, e importá-los na homepage e na nova página. Sem alteração visual.
- Estilo, tipografia, cores e spacing iguais aos das outras secções (font-serif para títulos, cream/gold, mesmos paddings das secções da homepage).

### Secções (na ordem pedida, copy verbatim)

1. **Hero** com eyebrow, h1 "Um roteiro só teu, ao teu ritmo.", subheadline e CTA primário "Preencher pedido" que faz scroll para `#pedir` (a secção do formulário).
2. **"O que é um roteiro personalizado?"** parágrafo único.
3. **Comparação dos dois produtos** em dois cartões lado a lado (grid md:grid-cols-2), com o estilo `glass` + `border border-gold/20` já usado, label pequena em uppercase tracking, nome em font-serif, e linhas Label/Valor para Destinos, Base de trabalho, Detalhe local, Preço, Para quem é.
4. **Nota honesta de diferença**, parágrafo discreto centrado abaixo da comparação.
5. **"Como funciona"** com 4 passos numerados (1-4), título h3 + texto.
6. **Formulário** `#pedir` (ver detalhe abaixo).
7. **FAQ** com o componente `Accordion` (shadcn) já usado na homepage, 5 perguntas verbatim.
8. **Closing CTA** com a linha "Pronto para um roteiro só teu?" e botão "Preencher pedido" que faz scroll para `#pedir`.

## 2. Formulário (chave funcional)

- Componente cliente com `useState` para cada campo + `submitting`, `status` (`idle | success | error`).
- Pré-preenchimento: `useEffect` inicial copia `search.destino` para o state `destino` se presente.
- Sem `<form>` nativo: `<div>` com inputs controlados e `<button type="button" onClick={handleSubmit}>Enviar pedido</button>`.
- `handleSubmit`: valida campos obrigatórios (Destino, Datas, Número de dias, Número de pessoas, Ritmo, Email), depois:
  ```ts
  fetch("https://formspree.io/f/[FORMSPREE_FORM_ID]", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  })
  ```
  - `[FORMSPREE_FORM_ID]` fica em constante no topo do ficheiro com comentário a indicar que deve ser substituído pelo ID real do Formspree.
- Sucesso (`res.ok`): esconde formulário e mostra bloco de confirmação verbatim ("Pedido recebido." + texto).
- Erro: mostra mensagem de erro verbatim acima do botão, mantém os valores.
- Campos com labels verbatim PT-PT, helpers verbatim, select "Ritmo de viagem" com "Lento", "Intermédio", "Intenso". Validação HTML básica (`required`, `type="email"`, `type="number"`).
- Estilo dos inputs/labels alinhado com o resto do site (bordas suaves, fundo `glass` ou input transparente com border gold/20, focus ring gold).

## 3. Repointing dos CTAs existentes (apenas `href`, sem mais nada)

`src/routes/index.tsx`:
- Header nav item "Roteiro personalizado" (linha 83) e respetivo render (linhas 135, 167): `href` passa de `#roteiro-personalizado` para `/roteiro-personalizado`.
- Hero secondary CTA "Pedir roteiro personalizado" (linha 297): `/roteiro-personalizado`.
- Secção CTA "Ver os roteiros personalizados" (linha 606): `/roteiro-personalizado`.
- Closing CTA "Pedir roteiro personalizado" (linha 655): `/roteiro-personalizado`.
- Footer item "Roteiro personalizado" (linha 750): `/roteiro-personalizado`.
- A secção interna com `id="roteiro-personalizado"` (linha 561) mantém-se; serve agora apenas como conteúdo informativo da homepage.

`src/components/CustomItineraryCTA.tsx`:
- `CustomItineraryCTA({ city })`: `href` do botão final passa para `/roteiro-personalizado?destino={encodeURIComponent(city)}`.
- `CustomItineraryHeroLink`: aceita prop opcional `city`; quando passada, `href = /roteiro-personalizado?destino={encodeURIComponent(city)}`, senão `/roteiro-personalizado`.
- Atualizar as 4 páginas de cidade (`praga.tsx`, `istambul.tsx`, `florenca.tsx`, `londres.tsx`) para passar `city` ao `CustomItineraryHeroLink` (o `CustomItineraryCTA` já recebe `city`).

## 4. Restrições respeitadas

- Copy 100% verbatim PT-PT, sem em-dash, sem PT-BR, sem placeholder.
- Sem login/pagamento/backend próprio.
- Sem mudanças visuais fora do necessário para a nova página.
- Página server-rendered e indexável (rota normal TanStack Start, sem `ssr: false`).
- Único `<h1>` é o título do hero; `<h2>` por secção; `<h3>` em passos/comparação.

## Ficheiros

- Criar: `src/routes/roteiro-personalizado.tsx`, `src/components/SiteNav.tsx`, `src/components/SiteFooter.tsx`.
- Editar: `src/routes/index.tsx` (extrair nav/footer + repointing), `src/components/CustomItineraryCTA.tsx`, `src/routes/praga.tsx`, `src/routes/istambul.tsx`, `src/routes/florenca.tsx`, `src/routes/londres.tsx`.
