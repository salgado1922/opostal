# Viagens do Carlos — hub multi-cidade

Transformar o site num hub editorial com rotas separadas, mantendo o guia de Praga 100% intacto. Stack já existente: **TanStack Router file-based** (não React Router DOM — uso o equivalente nativo do projeto, com `<Link to="/praga">` e URLs reais, back-button e deep-link a funcionar exatamente como pedido).

## Arquitetura de rotas

```text
src/routes/
  __root.tsx           já existe — atualizar <title>/meta para "Viagens do Carlos"
  index.tsx            NOVO homepage (hero + grelha de cidades + Sobre)
  praga.tsx            NOVO rota /praga (renderiza o guia atual, sem alterações de conteúdo)
```

Passos:
1. Renomear o `src/routes/index.tsx` atual para `src/routes/praga.tsx` e trocar `createFileRoute("/")` → `createFileRoute("/praga")`. Conteúdo, secções, dias, concertos, comida, dicas, checklist, conversor, mapas, vídeo — tudo igual.
2. Criar novo `src/routes/index.tsx` minimalista (homepage do hub).
3. Atualizar metadados no `__root.tsx` (título/descrição/OG genéricos do hub) — cada rota volta a sobrepor com `head()` próprio.

## CityGuide reutilizável

Extrair a casca partilhada para `src/components/city-guide/`:

```text
src/components/city-guide/
  CityGuideLayout.tsx   wrapper: SiteNav + <main>{children}</main> + back-link "‹ Viagens do Carlos"
  CityThemeProvider.tsx aplica tokens de acento por cidade via CSS vars inline
  types.ts              type CityMeta { slug, name, country, vibe, duration, status, accent, cover }
src/data/cities.ts      array CITIES — fonte única para homepage + futuros guias
```

`praga.tsx` passa a ser: `<CityGuideLayout city={cities.praga}> …conteúdo Praga existente… </CityGuideLayout>`. Adicionar nova cidade no futuro = novo objeto em `cities.ts` + novo `src/routes/<slug>.tsx` que reutiliza o mesmo layout. Sem reescrever sections.

## Tema por cidade (accent token)

No `src/styles.css` os tokens `--gold`, `--gold-soft`, `--terracotta` mantêm-se como **master theme** (homepage). `CityThemeProvider` aceita um objeto `accent` por cidade e injeta `style={{ ['--gold']: ..., ['--gold-soft']: ..., ['--terracotta']: ... }}` no wrapper — assim toda a tipografia, glass, links gold e botões existentes herdam automaticamente o acento de cada cidade. Praga mantém os valores atuais (zero diff visual).

## Homepage `/`

Secções, na ordem:

1. **SiteNav sticky** (componente partilhado) — "Viagens do Carlos" à esquerda como `<Link to="/">`, transparente sobre o hero, ganha glass ao fazer scroll. Mesma DNA do `StickyNav` atual.
2. **Hero** — fundo escuro com bg-twilight-radial + foto suave em overlay, título serif grande "Viagens do Carlos", tagline "Guias de viagem ao meu ritmo — testados por mim, cidade a cidade.", divisor gold fino.
3. **Grelha de cidades** — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`, cada card:
   - foto full-bleed (aspect 4/5), `loading="lazy"`, zoom no hover (`group-hover:scale-[1.04]` 700ms ease)
   - overlay gradiente bottom + bloco glass com nome serif, país, vibe, meta ("4 dias")
   - hover: soft lift (`-translate-y-1`), borda gold a aparecer, gold-link no nome
   - **Praga** → `<Link to="/praga">` ativo
   - **Roma / Lisboa / Viena** → `<div>` não-clicável, dessaturado (`grayscale opacity-60`), badge "Em breve" gold-soft no topo direito, `aria-disabled`
   - cards têm `focus-visible` ring gold para acessibilidade de teclado
4. **Sobre** — bloco glass curto, 2–3 linhas pt-PT: viajar devagar, sem turistadas, cada guia testado pessoalmente.
5. **Footer** simples — "Viagens do Carlos · feito com calma".

Imagens dos placeholders "Em breve": usar Unsplash source URLs editoriais (Roma/Lisboa/Viena ao entardecer) — leves, sem build extra.

## Página `/praga`

- Envolvida em `<CityGuideLayout city={cities.praga}>`.
- Pequeno back-link "‹ Viagens do Carlos" no topo (acima do hero atual), discreto, gold-link.
- O `StickyNav` interno do guia (índice de secções de Praga) mantém-se intacto por baixo do `SiteNav`.
- Atualizar `og:title`/`og:description` da rota para mencionar o hub.

## Qualidade

- Mobile-first; grelha colapsa para 1 coluna < sm.
- Contraste AA sobre cream/gold já validado pelo tema atual.
- `<Link>` em todo o lado (nada de `<a href>` interno) → preload + back-button nativos.
- `loading="lazy"` + `decoding="async"` em todas as fotos da grelha.
- `scroll-restoration` já está ligado no router; navegar para `/praga` começa no topo.

## Fora de scope (explícito)

- Conteúdo de Praga não muda nem uma palavra.
- Sem backend / sem CMS — `cities.ts` é estático.
- Não toco em `vite.config.ts`, fontes, paleta master, mapas, vídeo ou conversor.
