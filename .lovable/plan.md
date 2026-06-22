## Validar orçamento e alojamento antes do envio

Ficheiro: `src/routes/roteiro-personalizado.tsx`.

### O que muda
Adicionar `form.orcamento` e `form.alojamento` à validação atual no `handleSubmit` (linhas 362-372), juntando-se aos campos já obrigatórios (destino, datas, dias, pessoas, ritmo, email).

Se algum destes não estiver selecionado, o envio é bloqueado e o estado passa a `"error"` (mesma mensagem de erro genérica já existente abaixo do botão "Enviar pedido").

### Comportamento
- O utilizador é avisado pelo bloco de erro já existente que aparece quando `status === "error"`.
- Sem alterações de UI, sem mensagens novas por campo, sem mexer no payload do Formspree nem nos selects em si.
