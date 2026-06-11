## Alterações ao `src/routes/index.tsx`

### 1) Remover o indicador "scroll" do Hero
Eliminar o bloco `<motion.a href="#overview">…ChevronDown…</motion.a>` (linhas ~441-451) e remover o import `ChevronDown` se deixar de ser usado. Também remover `opacity`/`scrollYProgress` se ficarem órfãos.

### 2) Nav transparente sobre o Hero, com fundo ao fazer scroll

**Posicionamento**: mudar `<StickyNav />` para ficar sobreposto ao Hero. Envolver `Hero` + nav numa `div className="relative"`, com a nav em `fixed top-0 inset-x-0 z-50` (mantém-se "sticky-like" em todo o scroll). Adicionar `id="top"` ao topo da página.

**Estado de scroll**: novo hook dentro de `StickyNav`:
```ts
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

**Classes condicionais na `<nav>`**:
- Topo (sobre hero): `bg-transparent border-transparent`
- Após scroll: `bg-background/70 backdrop-blur-xl border-b border-gold/15`
- Transição: `transition-[background-color,backdrop-filter,border-color] duration-500 ease-out`

**Legibilidade sobre a foto**: aplicar `[text-shadow:0_1px_8px_rgba(0,0,0,0.55)]` aos links/brand enquanto `!scrolled`; remover quando `scrolled`.

**Mobile**: o botão hamburger ganha `border-gold/40` + mesmo text-shadow no estado transparente; o painel mobile aberto mantém sempre `bg-background/95 backdrop-blur-xl` (independente de `scrolled`) para os links serem legíveis.

**Hero**: adicionar `pt-20` (ou `pt-24`) ao conteúdo do Hero caso fique tapado pela nav fixa — verificar visualmente; provavelmente desnecessário porque o título já está centrado verticalmente.

### Detalhes técnicos
- Threshold de 60% da viewport garante que o fade-in acontece já fora do hero.
- `passive: true` no listener para performance.
- Tema dourado preservado: cor do texto activo mantém-se `text-gold`; inactivos passam de `text-cream/90` (sobre foto) para `text-cream/70` (sobre fundo escuro).
- pt-PT em todo o texto visível (sem alterações de copy).
