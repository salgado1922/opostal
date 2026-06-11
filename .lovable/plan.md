## 1. Secção de vídeo "Vê primeiro"

Adicionar nova secção logo a seguir ao `<Hero />` (antes de `<EssentialInfo />`) em `src/routes/index.tsx`.

- `id="ve-primeiro"`, usando o wrapper `<Section>` já existente (mesmo padding/tema).
- Título serif "Vê primeiro" com o mesmo `SectionHeading` dos restantes blocos.
- Wrapper responsivo 16:9 com `aspect-video`, `rounded-2xl`, `overflow-hidden`, `border border-gold/20`, `shadow-2xl shadow-black/40` e um leve gradiente dourado em volta para combinar com a hora dourada.
- `<iframe>` do YouTube (`https://www.youtube.com/embed/n_R22ZbTJhg`) com `title="Vê primeiro — Praga"`, `loading="lazy"`, `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"`, `allowFullScreen`, `referrerPolicy="strict-origin-when-cross-origin"`.
- Legenda por baixo em itálico dourado: *"Uma vista de olhos por Praga antes de partir."*

## 2. Navegação fixa com scroll suave

Manter a página como scroll contínuo único. Adicionar um componente `<StickyNav />` renderizado no topo do `<main>` (antes do `<Hero />`, com `position: sticky; top: 0; z-50`) com fundo glass dourado (`bg-background/70 backdrop-blur-xl border-b border-gold/15`).

Itens da nav (âncoras + IDs alvo):

| Label | Âncora |
|---|---|
| Vê primeiro | `#ve-primeiro` |
| Dia 1 | `#dia-1` |
| Dia 2 | `#dia-2` |
| Dia 3 | `#dia-3` |
| Dia 4 | `#dia-4` |
| Concertos | `#concertos` |
| Comer | `#comer` |
| Dicas | `#dicas` |
| Reservas | `#checklist` |

Para suportar Dia 1–4 individualmente, adicionar `id="dia-1"`…`id="dia-4"` aos cartões/blocos de cada dia dentro de `Itineraries` (secção `#dias` mantém-se como container).

### Comportamento

- Scroll suave nativo: adicionar `scroll-behavior: smooth` ao `html` (via `src/styles.css`) e `scroll-margin-top: 80px` às secções alvo para compensar a barra fixa.
- Realce da secção activa via `IntersectionObserver` num hook local (`useActiveSection(ids)`), aplicando classe `text-gold` + underline dourado animado no item activo; restantes em `text-cream/70`.
- Mobile (`< md`): botão hambúrguer (`Menu` / `X` da lucide) que abre um painel deslizante full-width por baixo da barra, com os mesmos links empilhados; fecha ao clicar num link.
- Desktop (`md+`): links inline horizontais com espaçamento generoso, scroll horizontal se necessário (`overflow-x-auto` + `scrollbar-none`).
- Logo/título curto à esquerda ("Praga · Jun 2026" ou similar, reutilizando o que já existe no Hero) — opcional, apenas se couber.

### Acessibilidade

- `<nav aria-label="Secções da página">`, links `<a href="#...">` (funcionam sem JS).
- Botão mobile com `aria-expanded` / `aria-controls`.

## 3. Ficheiros tocados

- `src/routes/index.tsx` — novo componente `StickyNav`, novo componente `VePrimeiro` (secção vídeo), IDs `dia-1..4` no `Itineraries`, montagem no `Index`.
- `src/styles.css` — `html { scroll-behavior: smooth }` e utilitário `.scroll-anchor { scroll-margin-top: 5rem }` (ou aplicar via Tailwind `scroll-mt-20` directamente nas secções).

Sem chamadas de rede, sem novas dependências (YouTube via iframe nativo, ícones já disponíveis em lucide-react).
