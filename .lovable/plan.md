## Melhorar layout mobile da secção "Como funciona"

### Problema observado
No viewport mobile (375px), a secção "Como funciona" apresenta:
1. Título "Do postal ao terreno, em três passos." com quebra de linha desajeitada ("três" isolado).
2. Cards com gap vertical de apenas 24px (`gap-6`), insufficiente para separar 3 passos densos.
3. Números "01"/"02"/"03" com fonte `text-5xl` mas sem peso visual forte — fundem-se com o fundo escuro.
4. O fio dourado do `RouteThread` atravessa visualmente os cards, competindo com o conteúdo.

### Alterações propostas

**1. Título responsivo**
- Reduzir `font-size` em mobile de `clamp` adequado para evitar orphan "três".
- Ajustar `line-height` e `max-width` para forçar quebra mais natural.

**2. Cards com mais respiro vertical**
- Aumentar gap entre cards em mobile: `gap-8` (32px) ou `gap-10` (40px), mantendo `md:gap-8` em desktop.
- Aumentar padding interno em mobile: `p-7` ou `p-8`, para não ficar tudo encostado às bordas.

**3. Hierarquia dos números de passo**
- Substituir número solto por um círculo sutil (border dourada) ou aumentar contraste — ex.: fundo `gold/10` com número `gold` em bold, ou apenas `font-bold` + `text-6xl` em mobile para ocupar melhor o espaço.

**4. Trust bar ("100% gratuito...")**
- Em mobile, a lista horizontal `flex-wrap` pode ficar confusa. Avaliar se precisa de mais `gap-y` ou se passa a coluna centrada em ecrãs < 400px.

**5. Interferência do fio dourado**
- O SVG `RouteThread` tem `z-[1]` e os cards têm `z-[2]`, mas o token pulsante do fio passa visualmente por cima do conteúdo. Verificar se é possível deslocar o path mais para a esquerda em viewports estreitas (`w < 640px`) ou reduzir `opacity` do token na zona da secção.

### Verificação
- Screenshot mobile do preview após alterações para confirmar legibilidade, espaçamento e que o fio não distrai.