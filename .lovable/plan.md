## Objetivo

Tornar a página `/conta` (que já existe e já lista guias desbloqueados, créditos, outros guias e histórico) acessível a partir do menu principal e mostrar o login inline para quem ainda não entrou, sem mexer em auth, paywall, tema ou conteúdo. Tirar todos os travessões "—" da página e do link.

## Alterações

### 1. Link no menu principal (`src/routes/index.tsx`)

No `<nav>` (a seguir a "Cidades" e "A nossa abordagem"), acrescentar:

```tsx
<Link to="/conta" className="...mesmo estilo dos outros links">
  A minha conta
</Link>
```

Reaproveita exatamente as classes dos links existentes. Nenhum controlo de login/logout existe hoje no nav, por isso não há duplicação a evitar.

### 2. Estado logged-out em `/conta` (`src/routes/conta.tsx`)

Hoje, se a sessão não existir, a página faz `navigate({ to: "/auth", ... })`. Substituir esse redirect por um bloco inline:

- Cabeçalho: `Entra na tua conta`
- Linha: `Inicia sessão para veres os guias que compraste.`
- Por baixo, renderizar o componente de login que já vive em `src/routes/auth.tsx`. Para reutilizar sem duplicar lógica, extrair o formulário atual de `auth.tsx` para um componente `AuthForm` (mesmo ficheiro ou `src/components/AuthForm.tsx`), e usá-lo tanto em `/auth` como em `/conta`. Comportamento, providers e estilo ficam iguais.

Manter o mesmo invólucro visual (`bg-twilight-radial`, container, tipografia "Golden Hour") do resto da página.

### 3. Estado logged-in: manter tudo como está

Por decisão do utilizador, as secções já existentes (`Créditos por usar`, `Guias desbloqueados`, `Outros guias disponíveis`, `Histórico de compras`, `Terminar sessão`) ficam intactas. Não acrescentar `Perguntas ao guia` nem `O teu passe` porque esses dados não existem no sistema.

### 4. Remoção de travessões "—"

Substituir todos os `—` por vírgula, dois pontos ou hífen curto, em:

- `src/routes/conta.tsx`: `title` da meta (`A minha conta — O Postal` → `A minha conta, O Postal`) e qualquer outro travessão visível.
- Texto novo do link no nav e do estado logged-out: usar só vírgulas/pontos.

Não tocar noutras páginas nem no SEO global.

## Fora do âmbito

Auth, paywall, free-sample gate, conteúdo dos guias, preços, tema, tipografia, SEO de outras rotas, sitemap.

## Critérios de aceitação

- "A minha conta" aparece no menu principal e leva a `/conta`.
- Sem sessão: `/conta` mostra o cabeçalho pedido e o formulário de login existente inline, sem redirect e sem novo sistema de auth.
- Com sessão: a página continua a listar os guias comprados, créditos e histórico reais, e o `Terminar sessão` continua a funcionar.
- Nenhum "—" em texto visível da página `/conta` nem no novo link do menu.
