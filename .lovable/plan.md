# Mudança em `src/routes/londres.tsx`

## 1. Remover o callout antigo
Em `Itineraries()` (linhas ~898-912), apagar a `motion.div` "Alternativa sem os estúdios". A função fica apenas com a `<Section>` que envolve o `GuidePreviewGate`.

## 2. Criar um novo `Day` para a alternativa
A seguir ao array `days` (depois da linha 540), declarar:

```ts
const altDay: Day = {
  key: "d4-alt",
  label: "Dia extra · alternativa",
  date: "Londres bónus, sem os estúdios",
  title: "Londres bónus, sem os estúdios",
  vibe: "Para quem não tem ligação a Harry Potter: troca-se a viagem a Leavesden por mais um dia a viver a cidade, num bairro menos óbvio.",
  accent: "from-rose-500/20 to-amber-300/10",
  icon: Trees, // ícone existente
  cover: COMMONS("<imagem já usada noutro dia, ex. Regent's Park ou South Bank>"),
  coverAlt: "...",
  stops: [
    // 4 a 5 paragens curtas reaproveitando o tom do parágrafo atual:
    // Madame Tussauds opcional (manhã, Marylebone)
    // Regresso longo à City + St Paul's por dentro, miradouro com tempo
    // Mais uma volta pela South Bank
    // Escolher um bairro: Notting Hill / Shoreditch / Greenwich
    // Jantar calmo
  ],
};
```

Reusar campos e ícones já importados (`Camera`, `Trees`, `Castle`, `Wine`, `MapPin`). Sem `mapEmbedUrl` (não é um roteiro fixo).

## 3. Renderizar como acordeão dentro do `PremiumGate`
No JSX da página (linhas ~1304-1311), entre `<Itineraries />` e o conteúdo já existente do `PremiumGate`, adicionar uma nova função `AlternativaSemEstudios()` chamada **dentro** de `<PremiumGate slug="londres">`, antes de `<HarryPotterVs />`:

```tsx
<PremiumGate slug="londres">
  <AlternativaSemEstudios />
  <GuideVideo />
  <HarryPotterVs />
  ...
</PremiumGate>
```

A função usa o `Accordion` de `@/components/ui/accordion` (collapsible, `type="single"`, `defaultValue` indefinido para começar fechado) envolvido numa `<Section id="alternativa" eyebrow="Opcional" title="Alternativa ao dia dos estúdios" intro="Para quem não vai aos Harry Potter Studios, este é o dia extra equivalente, com a mesma estrutura dos outros." >`.

Dentro:
- 1 `AccordionItem` com `AccordionTrigger` que mostra cabeçalho ao estilo dos dias (label + data + vibe curta) com o ícone à esquerda.
- `AccordionContent` renderiza `<DayBlock day={altDay} />` (mesmo componente que os outros dias).

Estilos: aplicar `border border-gold/20 rounded-2xl bg-card` no `AccordionItem` para encaixar visualmente, remover a `border-b` default do componente via `className`.

## 4. Adicionar âncora no `StickyNav`
Acrescentar a entrada `{ id: "alternativa", label: "Alternativa" }` (em PT-PT, sem travessão) na lista de âncoras do `StickyNav`, posicionada entre `itinerario` e `video`. Só fica visível na prática para utilizadores premium; isso é aceitável e consistente com as outras âncoras premium (`vs`, `comida`, etc.).

## Restrições
- Sem mudanças fora de `src/routes/londres.tsx`.
- Sem travessão longo em texto visível.
- Imagem do `cover` reaproveita um Commons já verificado (Regent's Park ou similar) para não introduzir 404.
- O conteúdo permanece estritamente premium (renderizado por baixo do `PremiumGate`, portanto invisível para visitantes sem acesso).
