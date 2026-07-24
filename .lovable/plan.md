## O que remover

Existem 6 referências ao Omio (placeholders `[LINK_OMIO_*]`) em 4 guias:

1. **`src/routes/londres.tsx`** (linha 1969-1979) — botão "Procurar comboios e autocarros" no bloco "Transportes". Remover o `<a>` inteiro (incluindo o `{e.title === "Transportes" && …}`).
2. **`src/routes/florenca.tsx`** (linha 1759-1769) — idem, remover o bloco.
3. **`src/routes/istambul.tsx`** (linha 1957-1967) — idem, remover o bloco.
4. **`src/routes/praga.tsx`**:
   - linha 1907-1917 — mesmo botão "Transportes", remover.
   - linha 353-355 — no dia de Kutná Hora, remover `primaryLabel` e `primaryUrl` (o par que renderiza o botão Omio no cabeçalho do dia). `secondaryLabel`/`secondaryUrl` do Google Maps ficam.
   - linha 367 — remover o campo `bookingUrl: "[LINK_OMIO_PRAGA]"` do stop "Comboio para Kutná Hora" (fica sem CTA de reserva).

## Verificações

- Após as remoções, confirmar com `rg -i 'omio' src/` que não sobra nenhuma referência.
- Nenhum outro import ou componente precisa de mudar (o `ExternalLink` continua usado noutros sítios).
