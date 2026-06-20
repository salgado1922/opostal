## Alterações ao formulário em `/roteiro-personalizado`

Ficheiro: `src/routes/roteiro-personalizado.tsx` (apenas o componente `RequestForm`).

### 1. Datas da viagem — seletor de datas (range)
Substituir o `<input>` de texto por um date range picker usando o componente Shadcn `Calendar` dentro de um `Popover`, em modo `range` (data início + data fim). O valor gravado em `form.datas` passa a ser a string formatada `"DD/MM/AAAA – DD/MM/AAAA"` (continua a ser enviado ao Formspree como antes, sem alterar o payload). O utilizador pode na mesma não ter datas exatas — fica opcional escolher só uma data ou deixar em branco se não souber (mantém-se obrigatório como já é hoje: tem de escolher pelo menos a data de início).

### 2. Orçamento aproximado — seletor com escalões
Substituir o `<input>` por um `<select>` com as opções:
- Até 250 €
- 250 € – 500 €
- 500 € – 750 €
- 750 € – 1000 €
- 1000 € – 1500 €
- 1500 € – 2500 €
- Mais de 2500 €
- Sem orçamento definido

### 3. Tipo de alojamento preferido — seletor
Substituir o `<input>` por um `<select>` com:
- Hotel
- Apartamento / Airbnb
- Hostel
- Boutique / Charme
- Resort
- Sem preferência

### 4. Renomear "Aeroporto ou estação de chegada" → "Ponto de partida"
- Label passa a "Ponto de partida".
- `id` do input passa a `f-partida` e a chave do estado passa de `chegada` para `partida` (constante `EMPTY_FORM`, tipo `FormState`, JSX e payload do Formspree — onde a chave enviada será `"Ponto de partida"`).

### Notas técnicas
- Para o date range usa-se `Calendar mode="range"` com `className="p-3 pointer-events-auto"` dentro de `PopoverContent`, conforme o padrão Shadcn do projeto. `date-fns` já é dependência transitiva via `react-day-picker`; caso o import falhe, instala-se com `bun add date-fns`.
- Estilo dos novos controlos mantém as classes existentes (`inputCls`) para coerência visual com o resto do formulário.
- Nenhuma alteração ao endpoint Formspree nem à lógica de submissão.
