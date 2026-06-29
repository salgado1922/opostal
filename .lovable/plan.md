# Limpeza: remover páginas e sistema obsoletos

O modelo atual é: **roteiros gratuitos das cidades + roteiro personalizado pago (one-off por email)**. Tudo o que existe para vender "acesso premium" aos guias, login de utilizador e área de conta deixa de fazer sentido.

## Páginas a apagar

- `src/routes/premium.tsx` — venda de pacotes premium
- `src/routes/auth.tsx` — login/registo
- `src/routes/reset-password.tsx` — reposição de password (só serve o login)
- `src/routes/conta.tsx` — área de conta do utilizador
- `src/routes/checkout.return.tsx` — retorno do checkout Stripe dos pacotes premium

## Componentes e lógica a apagar

- `src/components/PremiumGate.tsx`
- `src/components/PremiumPromo.tsx`
- `src/components/GuidePreviewGate.tsx`
- `src/components/AuthForm.tsx`
- `src/components/StripeEmbeddedCheckout.tsx`
- `src/components/PaymentTestModeBanner.tsx` (banner de modo de teste do Stripe)
- `src/hooks/use-auth.tsx` (useMyAccess, useHasGuideAccess, useSignOut)
- `src/lib/entitlements.functions.ts`
- `src/lib/stripe.ts` e `src/lib/stripe.server.ts`
- `src/routes/api/public/payments/webhook.ts` (webhook Stripe)

Também removo o registo do middleware Stripe/auth em `src/start.ts` caso esteja ligado a estes módulos.

## Limpeza de referências

- `src/routes/conta.tsx` link para `/premium` → desaparece com a página
- Comentários `// VÍDEO DO GUIA (premium)` nas páginas de cidade (`praga.tsx`, `londres.tsx`, `florenca.tsx`, `istambul.tsx`) — verificar se a secção em si depende de premium; se for só comentário, atualizar o texto

## O que NÃO toco

- Páginas de cidade (`/praga`, `/istambul`, `/florenca`, `/londres`) — continuam como roteiros gratuitos
- `/roteiro-personalizado` — o produto pago atual
- `/abordagem` — página editorial, faz sentido manter
- `/sitemap.xml`
- Navegação (`SiteNav`) — já não tem links para premium/conta/login, fica intacta
- Tabelas de base de dados — só removo do frontend; se quiseres limpar `subscriptions`/entitlements/`user_roles` posso fazer numa migração separada depois

## Detalhes técnicos

Ficheiros auto-gerados (`routeTree.gen.ts`) regeneram-se sozinhos quando apago os routes. Após apagar, valido que o build passa sem imports partidos e que nenhum componente das cidades depende dos gates removidos (já confirmei que não dependem).
