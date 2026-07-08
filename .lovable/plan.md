## Micro-interações na secção "Como funciona"

Adicionar animações subtis de entrada em viewport e feedback tátil/hover aos 3 passos, mantendo o tom cinemático e sem ruído visual.

### 1. Entrada em viewport (scroll-reveal)
- Usar `IntersectionObserver` num pequeno hook local (`useInView`) em `src/routes/index.tsx`, ou aproveitar a animação CSS `fade-in` já disponível.
- Cada card de passo (01/02/03) recebe:
  - Estado inicial: `opacity-0 translate-y-4`.
  - Ao entrar em viewport (threshold ~0.25): transição para `opacity-100 translate-y-0`.
  - **Stagger**: delay de 0ms / 120ms / 240ms para os 3 cards aparecerem em cascata.
  - Duração ~500ms, `ease-out`.
- O círculo dourado do número faz um "pop" leve: `scale-90 → scale-100` com pequeno atraso extra (+80ms após o card correspondente).
- Respeitar `prefers-reduced-motion`: quando ativo, ignorar transform/opacity e mostrar tudo estável.

### 2. Feedback ao passar o dedo / cursor
Feedback consistente em desktop (hover) e mobile (touch: `active:`):
- **Card**:
  - `hover:-translate-y-1` + `hover:border-gold/40` + subtil `hover:shadow-[0_10px_40px_-12px_rgba(...)]` com tom gold.
  - `active:scale-[0.99]` para toque no mobile.
  - `transition-all duration-300 ease-out`.
- **Círculo do número**:
  - `group-hover:bg-gold/20` e `group-hover:border-gold/50`.
  - Micro-rotação de brilho: pseudo-elemento com gradiente radial que faz `opacity 0→1` no hover.
- **Título do passo**:
  - `group-hover:text-cream` (do estado atual mais suave para o cream cheio).

Cada card passa a ser `group` para propagar `group-hover`/`group-active` aos filhos.

### 3. Ligação com o `RouteThread`
- O token pulsante dourado do fio ganha um pequeno realce quando o utilizador faz hover num card: opcionalmente, aumentar `opacity` do path na zona vertical do card via classe (nice-to-have, só se não complicar). Se ficar frágil, salta-se.

### 4. Verificação
- Preview em mobile (375px) e desktop:
  - Confirmar cascata de entrada ao dar scroll até à secção.
  - Confirmar hover em desktop e `:active` no mobile (Playwright com `page.tap`).
  - Screenshot antes/depois.
- Console limpa; sem CLS adicional (transform/opacity não causam layout shift).
- `prefers-reduced-motion: reduce` desativa transforms.

### Ficheiros afetados
- `src/routes/index.tsx` — só a secção "Como funciona" (marcada por `id="como-funciona"` / equivalente). Sem alterações a componentes partilhados nem a outras secções.
- Nenhum novo package.

### Fora de âmbito
- Redesign da secção, novos ícones, alterações ao `RouteThread` global, ou animações noutras secções.
