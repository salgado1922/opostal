## Melhorias ao formulário de roteiro personalizado

Ficheiro único: `src/routes/roteiro-personalizado.tsx`. Sem novas dependências (já usa `zod`).

### 1. Validação de email mais rigorosa

- Acrescentar um schema `zod` com `z.string().trim().email().max(255)` aplicado só ao campo `email`.
- No `handleSubmit`, depois de verificar campos em falta, validar o email com o schema:
  - Se falhar (formato inválido), marcar `email` num novo estado `invalidFields` e mostrar mensagem específica: **"Email inválido. Verifica o formato (exemplo: nome@dominio.pt)."**
- `input type="email"` mantém-se; o `errCls` aplica-se também quando o email está em `invalidFields`.
- Ao editar o campo, limpar de `invalidFields` (mesma lógica do `missingFields`).

### 2. Scroll automático e foco no 1º campo em falta

- Mapa `FIELD_IDS: Record<RequiredKey, string>` com os ids existentes (`f-destino`, `f-dias`, etc.). Para `datas`, usar o id do botão do popover do calendário (vou adicionar `id="f-datas"` ao trigger).
- No `handleSubmit`, depois de calcular `missingNow` (ou `invalidFields`), pegar no primeiro, fazer `document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" })` e `focus()`.

### 3. Limites de caracteres e sanitização

- Definir constantes de limite por campo:
  - `destino` 120, `dias` 3, `pessoas` 3, `interesses` 500, `restricoes` 300, `partida` 120, `observacoes` 1000, `email` 255.
- Aplicar `maxLength` aos inputs/textareas correspondentes.
- Para `observacoes` (e `interesses`, `restricoes`), mostrar contador discreto por baixo: `{value.length}/{max}`, em `text-cream/50`.
- No envio (`handleSubmit`) aplicar `.trim()` a todos os campos antes de montar o `body` do `fetch`, garantindo que espaços iniciais/finais não passam.
- Validar comprimentos com zod num schema completo do formulário; se algum exceder, marcar em `invalidFields` com mensagem clara ("Destino: máximo 120 caracteres").

### 4. Mensagem de confirmação melhorada

Substituir o bloco actual `status === "success"` por uma caixa com:

- Título: "Pedido recebido."
- Parágrafo: confirmação de envio para o email indicado (mostrar o email submetido).
- Lista de próximos passos:
  1. Respondo em até 2 dias úteis com a confirmação do tipo de roteiro e orçamento exacto.
  2. Verifica também a pasta de spam.
  3. Se precisares de ajustar algo, responde a esse email.
- Dois botões:
  - "Voltar ao início" → `Link` para `/`.
  - "Explorar roteiros gratuitos" → `Link` para `/#cidades`.

### Mensagens de erro (resumo do que aparece acima do botão Submit)

- `missingFields.length > 0`: caixa vermelha — "Faltam campos obrigatórios: …" (já existe).
- `invalidFields.length > 0`: caixa vermelha separada — lista as razões específicas (ex.: "Email inválido", "Observações: máximo 1000 caracteres").
- `status === "error"`: caixa dourada — falha no envio, tenta novamente (existente).

### Notas técnicas

- Toda a lógica fica em estado React local; payload Formspree mantém o mesmo formato (com valores já `trim`ados).
- Sem alterações fora do componente `RequestForm` (excepto adicionar `id="f-datas"` ao `PopoverTrigger`/botão de datas e os ids necessários para foco).
- Sem novas dependências.
