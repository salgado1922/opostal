## Mensagens de erro claras para campos obrigatórios

Ficheiro: `src/routes/roteiro-personalizado.tsx`.

### Problema atual
Quando faltam campos (incluindo orçamento ou alojamento), o `handleSubmit` põe `status = "error"` e mostra só uma mensagem genérica de falha de envio (linha 572-576). O utilizador não sabe **qual** campo falta.

### O que muda

1. **Distinguir erro de validação de erro de envio.** Acrescentar um novo estado `missingFields: string[]` (ou similar). No `handleSubmit`:
   - Calcular a lista dos campos obrigatórios que estão vazios (destino, datas, dias, pessoas, ritmo, orçamento, alojamento, email).
   - Se houver algum, guardar essa lista em `missingFields`, não chamar `setStatus("error")`, e abortar.
   - Se a validação passa, limpar `missingFields` e continuar com o fetch normal.

2. **Mensagem clara no topo do botão.** Quando `missingFields.length > 0`, mostrar um aviso (mesma caixa visual do erro atual, mas tom de alerta) com texto tipo:
   > Faltam campos obrigatórios: **Orçamento aproximado**, **Tipo de alojamento preferido**.
   
   Os nomes apresentados correspondem aos labels visíveis (ex.: "Destino", "Datas da viagem", "Número de dias", "Número de pessoas", "Ritmo de viagem", "Orçamento aproximado", "Tipo de alojamento preferido", "Email").

3. **Destaque visual nos selects/inputs em falta.** Quando um campo aparece em `missingFields`, adicionar uma classe de borda dourada/avermelhada (ex.: `border-gold` em vez de `border-gold/15`) ao respetivo `<select>` / `<input>`. Foco especial em `f-orcamento` e `f-alojamento`, mas aplicar a todos os obrigatórios para consistência.

4. **Limpar ao corrigir.** Quando o utilizador altera um campo que estava em falta (`set(key, value)`), remover esse campo de `missingFields` para o aviso atualizar em tempo real.

5. **Manter o erro de envio existente.** A mensagem "Não consegui enviar o pedido..." continua a aparecer apenas quando o fetch falha (`status === "error"` após submit), separada da nova mensagem de validação.

### Notas técnicas
- Sem novas dependências, sem alterações ao payload Formspree nem à UI fora do bloco do formulário.
- Apenas estado React local + classes condicionais.
