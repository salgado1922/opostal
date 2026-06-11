## Goal
Reverter o conversor de moeda do cartão "Moeda" e colocá-lo como um **bloco autónomo, elegante e centrado**, com mais respiração visual e que se integre melhor no tema golden-hour.

## Onde colocar
Dentro da secção "Essencial para a viagem", **a seguir à grelha dos 6 cartões** e **antes do bloco "Palavras úteis"**. Esse intervalo já tem ritmo editorial natural (cartões → bloco destacado → bloco destacado), então o conversor encaixa como um segundo cartão de destaque, simétrico ao de "Palavras úteis".

## Mudanças em `src/routes/index.tsx`

1. **Reverter o cartão "Moeda"** ao estado original:
   - Remover o `isMoeda` special-case dentro do `map`.
   - Remover o `sm:col-span-2 lg:col-span-2` e o `<CurrencyConverter />` inline.
   - O cartão "Moeda" volta a ser igual aos outros 5.

2. **Reestilizar o `CurrencyConverter`** para funcionar como bloco destacado (não como conteúdo dentro de um cartão):
   - Wrapper igual ao de "Palavras úteis": `rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 via-transparent to-transparent p-7`.
   - Cabeçalho com ícone `Coins` + título serif "Conversor rápido" (espelha o padrão `Languages` + "Palavras úteis").
   - Layout interno em 2 colunas no desktop: à esquerda os inputs empilhados verticalmente com o botão "Inverter" entre eles (em vez de horizontal apertado); à direita uma coluna com as chips e a legenda.
   - No mobile: tudo empilhado (inputs → inverter → chips → legenda).
   - Inputs maiores (`text-2xl font-serif`), com o símbolo (€ / Kč) à esquerda dentro do campo e o valor alinhado à direita.
   - Botão "Inverter" centrado entre os dois inputs, circular (`h-10 w-10 rounded-full border border-gold/30`), com `ArrowLeftRight` rodado 90° (vertical) no desktop e horizontal no mobile via `sm:rotate-90` — opcional, mas dá clareza ao layout vertical.
   - Chips mantêm-se como estão, mas com `text-sm` e mais respiração.
   - Legenda gold itálico inalterada.

3. **Renderizar o `<CurrencyConverter />` no `EssentialInfo`** entre a grelha e o `motion.div` de "Palavras úteis", envolto na mesma animação `motion.div` `fadeUp` para coerência.

## Detalhes visuais
- Mesmo `glass`/`gradient` que "Palavras úteis", para o utilizador ler os dois blocos como um par.
- Largura total da `max-w-6xl` da secção; sem `col-span` (não vive dentro da grelha).
- Espaçamento `mt-8` da grelha e `mb-8` antes de "Palavras úteis".

## Fora de scope
- Não mexer na taxa, na lógica de conversão, nas chips, nem na constante `RATE_CZK_PER_EUR`.
- Não tocar noutras secções.

## Aceitação
- O cartão "Moeda" volta a ser visualmente idêntico aos restantes 5 cartões.
- O conversor aparece como um bloco destacado e equilibrado, a par de "Palavras úteis".
- Funciona em mobile (390px) e desktop sem quebrar.
