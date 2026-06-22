## Acrescentar orçamento e alojamento ao resumo

Ficheiro: `src/routes/roteiro-personalizado.tsx`.

### O que muda
Na caixa de "Resumo das datas" (acima do botão "Enviar pedido"), passa a mostrar também:
- **Orçamento**: valor selecionado em `form.orcamento` (ex.: "Sem orçamento definido"). Se ainda não houver seleção, não aparece a linha.
- **Tipo de alojamento**: valor selecionado em `form.alojamento` (ex.: "Apartamento / Airbnb"). Se ainda não houver seleção, não aparece a linha.

### Comportamento
- Renomear a caixa para algo mais geral, ex.: "Resumo do pedido", mantendo a etiqueta dourada em maiúsculas.
- A caixa passa a aparecer se houver datas **ou** orçamento **ou** alojamento selecionados (atualmente só aparece com datas).
- Cada linha tem um pequeno rótulo ("Orçamento", "Alojamento") e o valor à direita, no mesmo estilo das datas.

### Estilo
Reutilizar as classes já existentes da caixa (`bg-plum/40`, `border-gold/15`, `text-cream/85`), sem novos componentes nem alterações de layout do formulário.

### Notas técnicas
- Sem mudanças em validação, payload do Formspree, ou estrutura do formulário.
- Apenas apresentação dentro do bloco do resumo (linha ~589).
