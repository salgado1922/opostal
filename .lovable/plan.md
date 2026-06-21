## Resumo de datas antes de enviar

Ficheiro: `src/routes/roteiro-personalizado.tsx`.

### 1. Onde colocar
Acima do bloco do botão "Enviar pedido" e por baixo dos campos do formulário, adicionar uma caixa de resumo (estilo "glass"/card) que mostre as datas como vão ser enviadas.

### 2. Conteúdo do resumo
- **Modo de datas**: etiqueta clara — "Datas exatas" ou "Mês flexível".
- **Valor das datas**:
  - Modo exato: intervalo selecionado (ex: "15/08/2025 – 22/08/2025"), ou só a data de início se ainda não houver "to", ou um aviso "Seleciona uma data de início".
  - Modo mês: mês selecionado (ex: "Setembro 2025") ou aviso "Seleciona um mês".
- **Fins de semana**: indicador visível (badge/texto) quando `weekendsOnly` estiver ativo — por exemplo "Apenas fins de semana".

### 3. Comportamento
- O resumo só aparece quando há algo para mostrar (modo exato com `from` selecionado, ou modo mês com mês escolhido).
- Se `weekendsOnly` estiver desligado e ainda não houver datas/mês, a caixa fica escondida.
- Não altera o payload enviado ao Formspree nem a validação existente — é apenas apresentação.

### 4. Estilo
Usar classes consistentes com o resto da página: fundo `bg-plum/40`, borda `border-gold/15`, texto `text-cream/85`, e o indicador de fim de semana com destaque dourado suave (`text-gold`).

### Notas técnicas
- Nova função/constante local para gerar o texto do resumo a partir de `dateMode`, `dateRange`, `monthValue` e `weekendsOnly`.
- Sem alterações ao `form.datas`, validação, endpoint ou estrutura do formulário.
