# 4 ajustes visuais

## 1. Hero da página `/londres` mais nítido
`src/routes/londres.tsx`, função `Hero` (linha ~596): a imagem atual (`London_skyline_at_night_facing_tower_bridge.jpg`, width=2400) tem um original Commons relativamente pequeno e fica esticada num ecrã 1338+ px.

- Trocar por um ficheiro Commons de alta resolução já verificado, por exemplo `Tower_Bridge_at_night_London_2017.jpg` ou `Palace_of_Westminster,_Westminster_Bridge_and_Big_Ben_-_September_2006.jpg`.
- Subir o `width` para `3200` no `COMMONS(...)` para evitar upscaling.
- Atualizar `aria-label` para descrever a nova foto, em PT-PT.

## 2. Slides do hero da homepage com os novos destinos
`src/routes/index.tsx`, `HERO_SLIDES` (linha ~143): tem 3 slides (hub, Praga, Istambul). Acrescentar 2 novos para **Florença** e **Londres**, em alta qualidade e à mesma escala (`w=2000&q=80`), mantendo a mesma estrutura `{ src, alt }`:

- Florença: foto do Duomo / Ponte Vecchio ao entardecer.
- Londres: foto do skyline / Tower Bridge à hora azul.

Usar Unsplash URLs ao mesmo formato dos atuais (consistência), com alt PT-PT. Sem alterações ao ciclo nem ao componente Hero.

## 3. `/abordagem` com imagens de destinos do site
`src/routes/abordagem.tsx`, objeto `IMAGES` (linhas 31-59): substituir os 4 placeholders Unsplash genéricos por fotos de destinos que **já têm guia (Praga, Istambul, Florença, Londres)** ou que **estão planeados** (Barcelona, Paris, Viena, Lisboa, Budapeste). Manter URLs Unsplash em alta resolução (mesmo formato), só mudando o conteúdo:

- `hero` → vista de Londres ou Florença, calma, ao fim de tarde.
- `block1` "Testado no terreno" → rua de calçada em Praga ao amanhecer.
- `block2` "Sem turistadas" → ruela / café local de Istambul.
- `block3` "Pensado ao teu ritmo" → alguém a caminhar devagar em Florença.

Atualizar os `*Alt` correspondentes em PT-PT. Sem outras mudanças na página.

## 4. Ordem dos cards de cidade
`src/data/cities.ts`, array `CITIES`: mover a entrada **Londres** para **antes** de Barcelona. Ordem final passa a:

1. Praga (ready)
2. Istambul (ready)
3. Florença (ready)
4. Londres (ready)
5. Barcelona (coming-soon)
6. Paris (coming-soon)
7. Viena (coming-soon)
8. Lisboa (coming-soon)
9. Budapeste (coming-soon)

Sem alterações de campos, só a ordem do array.

## Restrições
- Só edito `src/routes/londres.tsx`, `src/routes/index.tsx`, `src/routes/abordagem.tsx`, `src/data/cities.ts`.
- Sem travessão longo em texto visível.
- Verifico que cada URL de imagem nova devolve 200 antes de fechar.
