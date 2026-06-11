## Causa

No `StickyNav` (`src/routes/index.tsx`), o `<ul>` dos links desktop tem `overflow-x-auto`, o que faz o browser desenhar uma scrollbar (com setas ▲▼) dentro da própria barra de navegação. A nav não precisa de scroll — os 9 links cabem sem problemas.

## Alteração

Uma só edição em `src/routes/index.tsx` (linha 1307):

- Substituir `className="hidden md:flex items-center gap-1 overflow-x-auto"`
- por `className="hidden md:flex items-center gap-1"`

Resultado: desaparece a scrollbar e as setas ▲▼ da barra superior. Tema, transparência sobre o hero, fade-in ao fazer scroll, âncoras pt-PT e menu mobile mantêm-se iguais.
