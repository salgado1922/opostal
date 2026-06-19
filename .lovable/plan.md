## Problema
O formulário de "Pedir o meu roteiro" na página `/roteiro-personalizado` está a enviar para um endpoint do Formspree com um placeholder (`[FORMSPREE_FORM_ID]`). Isso faz com que o pedido falhe sempre e apareça a mensagem de erro ao utilizador.

## Solução
Substituir o placeholder pelo ID real do Formspree fornecido pelo utilizador: `xzdqnrlg`.

## Ficheiro a alterar
- `src/routes/roteiro-personalizado.tsx` — linha 17

## Mudança
```diff
- const FORMSPREE_ENDPOINT = "https://formspree.io/f/[FORMSPREE_FORM_ID]";
+ const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdqnrlg";
```

Nenhum outro código precisa de ser alterado. O formulário já está a usar `fetch` corretamente contra esta constante.
