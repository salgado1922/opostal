## Alterações ao campo "Datas da viagem" em `/roteiro-personalizado`

Ficheiro único: `src/routes/roteiro-personalizado.tsx` (componente `RequestForm`).

### 1. Seletor do tipo de datas
Acima do controlo atual, adicionar um `<select>` "Tipo de datas" com duas opções:
- **Datas exatas** (default) → mostra o date range picker já existente.
- **Datas flexíveis (mês)** → mostra um `<select>` de mês, com as opções dos próximos 18 meses no formato `"Setembro 2025"` (gerados a partir de `new Date()` com `date-fns/format(d, "LLLL yyyy", { locale: pt })`, primeira letra em maiúscula).

Apenas um dos dois controlos fica visível de cada vez; o estado do outro é limpo ao trocar.

### 2. Checkbox "Apenas fins de semana"
Por baixo do controlo de datas (visível em ambos os modos), uma checkbox: *"Apenas viagens ao fim de semana"*. Usa `@/components/ui/checkbox` + `<label>` no estilo dos restantes campos.

### 3. Estado e payload
- Novo state local: `dateMode: "exact" | "month"`, `monthValue: string`, `weekendsOnly: boolean`.
- A string final em `form.datas` (que continua a ser o que se envia) passa a ser composta:
  - modo exato: `"DD/MM/AAAA – DD/MM/AAAA"` (igual a hoje).
  - modo mês: `"Mês flexível: Setembro 2025"`.
  - se `weekendsOnly` for true, anexa `" · Apenas fins de semana"`.
- A validação atual de `form.datas` não-vazio mantém-se. No modo "mês", `form.datas` só é preenchido depois de o utilizador escolher um mês.
- O payload Formspree mantém a chave `"Datas da viagem"` com a string composta; não se acrescentam novas chaves para não alterar o template do email.

### Notas técnicas
- Reutiliza `Calendar`/`Popover` já importados; o checkbox importa-se de `@/components/ui/checkbox`.
- Sem alterações ao endpoint Formspree, ao layout do resto do formulário, nem a outros campos.
