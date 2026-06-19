## Âmbito

Apenas `src/routes/index.tsx` (homepage, header e footer estão lá dentro como `SiteNav` e `SiteFooterImpl`). Nenhuma página de cidade, nenhum guia, nenhuma nova rota nesta tarefa. Reutilizo fontes, cores (gold, cream, plum), espaçamento, glass cards, accordion e padrão de secções existentes. Sem traços longos, sem PT-BR, sem CTAs garridos.

## 1) Header (`SiteNav`)

Substituir os links atuais ("Cidades", "A nossa abordagem", ícone "Conta") por:

- `Roteiros gratuitos` → `#cidades`
- `Roteiro personalizado` → `#roteiro-personalizado`
- `Como funciona` → `#como-funciona`
- `Sobre` → `#sobre`

Mantenho o mesmo estilo de link (uppercase, tracking 0.2em, cor cream/70 com hover gold, com text-shadow no estado pré-scroll). Remove-se o `Link` para `/abordagem` e o ícone `User` para `/conta` do header da homepage. Esses ficheiros não são apagados nesta tarefa, apenas deixam de estar referenciados no menu.

CTA do header, discreto (outline, não preenchido), à direita:

- Label: `Roteiro personalizado`, `href="#roteiro-personalizado"`
- Estilo: `border border-gold/40 text-gold hover:bg-gold/[0.08]`, pill, mesmo tracking dos outros links. Sem sombra dourada nem fundo sólido.

Mobile: adicionar um botão hamburger (ícone `Menu` do `lucide-react` já usado no projeto) que abre um painel simples com os mesmos 4 links empilhados, no mesmo estilo glass/plum já presente noutras secções. Sem libs novas, apenas estado `useState`.

## 2) Homepage: nova ordem e composição de secções

A função `Home()` passa a renderizar, por esta ordem:

```
<SiteNav />
<Hero />                       // adaptado
<CityGrid />                   // #cidades — secção "Começa com um roteiro gratuito"
<MethodStrip />                // "Como fazemos os roteiros" (reescrita)
<TestedOnGround />             // nova: "Guias que conhecem o chão que pisas"
<EditorialNote />              // nova: "Tudo num só sítio" (sem cards, sem botões)
<CustomItinerary />            // nova: #roteiro-personalizado
<HowItWorks />                 // nova: #como-funciona
<Faq />                        // nova: accordion shadcn
<About id="sobre" />           // existente, recebe id="sobre"
<SiteFooter />                 // revisto
```

Removem-se da homepage: `FeaturedBand`, `EuropeMap`, `HomePremiumCTA`, `PostcardBlock`. Removem-se também imports não usados (`Lock`, `User`, `motion` de blocos eliminados — manter onde ainda for usado). O componente `PremiumCardTag` deixa de ser usado nos cards (ver ponto 3).

### Hero (adapta o atual, não redesenha)
- Eyebrow: `Diários de viagem · Europa`
- `<h1>`: `Roteiros de viagem gratuitos, feitos com tempo.` (mesmo `text-gradient-gold`, mesma serif, mesmo stroke já aplicado)
- Subhead (um único parágrafo, sem o segundo): `Guias em português, testados no terreno, cidade a cidade. Para viajar com calma, ver bem e fugir às turistadas.`
- CTA primário (gold pill atual): `Explorar roteiros gratuitos` → scroll para `#cidades`
- CTA secundário (link discreto atual): `Pedir roteiro personalizado` → `#roteiro-personalizado`
- Mantém slideshow, indicadores, scroll cue e carimbo `PostmarkCircle`.

### `CityGrid` (#cidades)
- Título: `Começa com um roteiro gratuito`
- Intro: `Cada cidade do catálogo tem um guia completo e aberto a toda a gente, com itinerário sugerido dia a dia. Lê, guarda e parte quando quiseres. Sem registo e sem pagar nada.`
- Em cada `CityCard` com `status === "ready"`, adicionar uma pequena label de baixo contraste `Guia gratuito` (pill discreto, border `gold/20`, texto `cream/60`, uppercase 10px) dentro do bloco glass, acima do título ou junto às metapills. Cidades "Em breve" ficam exatamente como estão.
- Label do link do card: trocar `Abrir guia` por `Abrir roteiro`.
- Remover `PremiumCardTag` do card (modelo de compra abandonado).

### `MethodStrip` reescrito → "Como fazemos os roteiros"
Em vez da grelha de 4 ícones com labels curtos, passa a ser uma secção com título e bullets em texto, no mesmo tom calmo:
- Título: `Como fazemos os roteiros`
- Linha: `Cada guia nasce no chão da cidade, não atrás de um ecrã.`
- 4 bullets com os textos VERBATIM fornecidos, listados com bullet dourado discreto, sem ícones grandes nem cards.

### `TestedOnGround` (nova)
- Título: `Guias que conhecem o chão que pisas`
- Parágrafo único: `As cidades do catálogo foram percorridas pessoalmente, rua a rua. Não copiamos listas nem repetimos o que toda a gente diz. O que está aqui foi visto, provado e escolhido com critério.`
- Layout: container `max-w-3xl`, texto centrado, mesmo estilo do `About`.

### `EditorialNote` (nova) — "Tudo num só sítio"
- Título: `Tudo num só sítio`
- Parágrafo único: `Dentro de cada guia encontras também o que precisas para tratar do resto da viagem: onde ficar, que experiências reservar e como circular entre cidades. Tudo no seu lugar, à medida que lês o roteiro.`
- Sem cards, sem botões, sem links, texto editorial calmo. `max-w-2xl`, alinhado à esquerda.

### `CustomItinerary` (nova, `id="roteiro-personalizado"`)
- Título: `Quando o roteiro precisa de ser teu`
- Intro: `Os guias gratuitos servem a maioria das viagens. Mas às vezes queres algo desenhado à tua medida: o teu ritmo, os teus interesses, as tuas datas. É aí que entra o roteiro personalizado.`
- Dois cards em grid 2 colunas (md+), no mesmo estilo glass dos cards existentes (border `gold/15`, bg `plum/40`, rounded-2xl):
  - **Card A**
    - Label pequena (pill discreto, border `gold/30`): `Testado no terreno`
    - Título serif: `Roteiro Personalizado O Postal`
    - Texto: `Para as cidades do catálogo, que percorri pessoalmente. Feito à medida, com base em experiência direta no destino.`
    - Linha de preço (gold, tracking wide): `A partir de 34,90 €`
  - **Card B**
    - Label: `Curadoria digital`
    - Título: `Roteiro Digital Curado`
    - Texto: `Para destinos fora do catálogo. Pesquisa cuidada em fontes atualizadas, sem experiência presencial, mas com o mesmo critério editorial.`
    - Preço: `A partir de 19,90 €`
- Abaixo dos cards, CTA discreto (link gold uppercase, estilo `gold-link`): `Ver os roteiros personalizados` → `#como-funciona`.

### `HowItWorks` (nova, `id="como-funciona"`)
- Título: `Como funciona`
- 4 passos em coluna (ou grid 2x2 em md), numerados `01 02 03 04` no estilo editorial existente:
  1. `Envias o pedido` / `Dizes-me o destino, as datas e o que mais gostas de fazer em viagem.`
  2. `Analiso o pedido` / `Confirmo qual o tipo de roteiro mais indicado para ti e para o destino.`
  3. `Recebes o teu roteiro` / `Um plano com mapa, sugestões, tempos e contexto, pronto a seguir.`
  4. `Ajusto se precisares` / `Uma revisão pontual antes da viagem, se alguma coisa mudar.`
- CTA outline gold: `Pedir roteiro personalizado` → `#roteiro-personalizado`.

### `Faq` (nova)
- Usa `Accordion` shadcn já existente em `src/components/ui/accordion.tsx`.
- Título: `Perguntas frequentes`
- 5 itens com perguntas e respostas VERBATIM (Q1–Q5).
- Container `max-w-3xl`, mesma estética calma (border `gold/10`, divisores subtis).

### `About` (existente, dar-lhe `id="sobre"`)
- Acrescentar `id="sobre"` na `<section>` para o anchor do menu. Conteúdo mantém-se.

## 3) Footer (`SiteFooterImpl`)

Reescrever mantendo o tom quieto (border-top `gold/10`, texto pequeno cream/55):

- Linha de links horizontais centrados/à esquerda em md:
  - `Roteiros gratuitos` → `#cidades`
  - `Roteiro personalizado` → `#roteiro-personalizado`
  - `Como funciona` → `#como-funciona`
  - `Sobre` → `#sobre`
  - `Contacto` → `mailto:contacto@opostal.pt`
- Linha de transparência de afiliados (pequena, cream/40, em itálico não, apenas tamanho 11px): `Alguns dos links de reserva são afiliados. Só recomendo o que faz sentido para a viagem.`
- Linha de créditos mantida: `Fotos: Unsplash · Wikimedia Commons`
- Remove-se o botão "Copiar link" (não pertence ao novo footer).

## 4) Garantias

- Sem traços longos em qualquer copy nova (uso vírgulas, dois pontos e pontos finais). Substituo o `—` existente em `PostcardBlock` deixa de ser usado, mas verifico que o restante texto novo na home não introduz nenhum.
- Sem cores novas, sem fontes novas, sem libs novas.
- Sem links de afiliados, sem cards de afiliados, sem secção "afiliados" na home.
- Não toco em `src/routes/abordagem.tsx`, `praga.tsx`, `istambul.tsx`, `florenca.tsx`, `londres.tsx`, `conta.tsx`, `premium.tsx`, nem em qualquer outro ficheiro fora de `src/routes/index.tsx`.

## Ficheiros alterados

- `src/routes/index.tsx` (único)
