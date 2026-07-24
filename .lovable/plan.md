## Objetivo
Transformar o bloco "Outros postais" num carrossel coverflow: 1 card central grande e nítido, 2 cards laterais mais pequenos e esbatidos. Setas + swipe, sem auto-play.

## Alterações

Ficheiro único: `src/components/OutrosPostais.tsx`

1. **State**: `activeIndex` (0..n-1) para o card no centro.
2. **Layout** (visíveis apenas 3 slots: `prev`, `center`, `next`, com wrap-around):
   - Container `relative` com altura fixa (~340px mobile, ~420px desktop) e `overflow-hidden`.
   - Cada card posicionado em `absolute` com `transition-all duration-500 ease-out`:
     - **Centro**: `translate-x-0 scale-100 opacity-100 z-20`, largura ~320px (mobile) / 420px (desktop).
     - **Esquerdo**: `-translate-x-[70%] scale-[0.78] opacity-45 blur-[1px] z-10`.
     - **Direito**: `translate-x-[70%] scale-[0.78] opacity-45 blur-[1px] z-10`.
     - Outros: `opacity-0 pointer-events-none`.
3. **Setas**: dois botões redondos (`ChevronLeft`/`ChevronRight` do lucide) sobrepostos nas laterais, estilo discreto (fundo `bg-background/70 backdrop-blur border`), `aria-label` "Anterior"/"Próximo". Ocultos em `sm:` só se necessário — manter em todos os breakpoints.
4. **Swipe**: handlers `onTouchStart`/`onTouchEnd` (ou `onPointerDown`/`Up`) medem `deltaX`; threshold 40px avança/recua `activeIndex`.
5. **Clique nos laterais**: clicar num card lateral chama `setActive(index)` (traz para o centro). O card central mantém `Link` para navegar.
6. **Wrap-around**: `(activeIndex + n) % n` para prev/next.
7. **Acessibilidade**: `role="region"` + `aria-roledescription="carousel"`; setas com `aria-label`; cards não-centrais com `aria-hidden` e `tabIndex={-1}` para não competirem no tab order.
8. **Reduce motion**: `motion-reduce:transition-none`.

## Fora de âmbito
- Sem auto-play, sem indicadores/dots (podem ser adicionados depois se pedires).
- Sem alterações nas páginas de cidade — só o componente muda.

## Detalhes técnicos
- Continuar a usar `SmartImage` com `sizes="(min-width: 768px) 420px, 320px"` para os cards.
- Nenhuma dependência nova; usar apenas Tailwind + lucide-react já instalados.
