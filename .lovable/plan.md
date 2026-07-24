## Objetivo
Converter o bloco `OutrosPostais` de grelha 4-colunas para um carrossel horizontal com scroll-snap e swipe táctil, mobile-first, sem setas.

## Alterações

**`src/components/OutrosPostais.tsx`** (único ficheiro tocado)

- Substituir o `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4` por um container flex com scroll horizontal:
  - `overflow-x-auto snap-x snap-mandatory` no wrapper
  - `flex gap-5` na lista
  - Cada card: `snap-start shrink-0 basis-[78%] sm:basis-[46%] lg:basis-[24%]` — em desktop os 4 cabem sem scroll; em mobile mostram-se ~1,2 cards para sugerir arrasto
  - Padding lateral `px-4 md:px-0` + `scroll-px-4` para o snap alinhar com a margem
  - `-mx-4 md:mx-0` para permitir o "sangramento" nos limites em mobile
  - Esconder scrollbar visualmente (`[&::-webkit-scrollbar]:hidden [scrollbar-width:none]`)
- Manter tipografia, `SmartImage`, hover/scale e ordem dos cards inalterados.
- Sem setas, sem indicadores, sem JS extra — comportamento nativo.

## Fora de âmbito
Não altero cores, imagens, texto, nem outras secções. Não mexo nas páginas de cidade — o componente é partilhado.
