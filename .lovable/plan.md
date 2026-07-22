# Receita para novos guias de destino

Objetivo: sempre que quiseres criar um guia novo, respondes a um formulário estruturado e eu gero a página nova mantendo o estilo WOW (Praga/Londres/Istambul/Florença).

## 1. Documento-receita (Markdown)

Criar `docs/nova-cidade-brief.md` — um formulário em Markdown com todas as perguntas necessárias, organizadas por secção. Preenches, colas no chat, e eu gero a página.

Secções do brief:

**Identidade**
- Nome da cidade (PT + slug para URL, ex.: `roma`)
- País e código de 3 letras para o carimbo (ex.: ROM)
- Anos dos carimbos (1–2 anos, ex.: 2024, 2025)
- Tagline curta (1 linha, aparece no hero)
- Parágrafo introdutório (2–3 frases, "Conhecer …")

**Tema visual**
- Paleta base (2–3 cores dominantes, ex.: "travertino + ocre + terracota")
- Tom do gradiente do H1 (claro → escuro)
- Imagem hero (URL Wikimedia/Unsplash 3200px, paisagem icónica)
- Imagens de capa por dia (1 URL por dia)

**Prático**
- Moeda local + taxa aproximada vs EUR (para o conversor)
- Fuso horário / diferença para Lisboa
- Ligação aérea sugerida (Ryanair/TAP/etc.)
- 3–5 dicas rápidas (tomadas, transporte, gorjetas, etc.)

**Itinerário** (repetir por dia)
- Título do dia + subtítulo
- Distância a pé aproximada
- Lista de paragens, cada uma com:
  - Nome, hora sugerida, duração
  - Descrição (2–3 frases)
  - Dica opcional (💡)
  - Imagem opcional (URL)
  - Link Google Maps
  - Transporte até à próxima (opcional)

**Comida & extras**
- 3–6 pratos/sítios obrigatórios
- Bairros a explorar
- Alternativa/plano B (opcional, vai para acordeão como em Londres)

**Afiliados**
- Link Booking.com da cidade
- 2–3 experiências GetYourGuide sugeridas
- Link Omio (comboio/bus) se aplicável

## 2. Fluxo de geração

Quando colares o brief preenchido, eu:
1. Crio `src/routes/<slug>.tsx` clonando a estrutura de `praga.tsx` (a mais completa e limpa)
2. Adiciono a cidade a `src/data/cities.ts` na ordem correta
3. Adiciono slide ao hero da homepage (`HERO_SLIDES` em `index.tsx`)
4. Adiciono keyframes `<slug>-kenburns` a `src/styles.css` se necessário
5. Adiciono tema `.theme-<slug>` se paleta for distinta
6. Meta tags SEO (title, description, OG, canonical `https://opostal.pt/<slug>`)
7. `PostmarkCircle` + `PostalStamp` no hero, `FinalStamp` no fim

## 3. Entregável desta tarefa

Apenas criar `docs/nova-cidade-brief.md` com o formulário pronto a preencher. Não gera nenhuma cidade nova ainda — isso acontece quando devolveres o brief preenchido.

## Detalhes técnicos

- Template-base: `src/routes/praga.tsx` (estrutura de referência: hero Ken Burns, FlipDaysGrid, dias com stops expansíveis, conversor, FinalStamp).
- Componentes reutilizados sem alteração: `ReadingProgressBar`, `FlipDaysGrid`, `StickyNav`, `CurrencyConverter`, `PostmarkCircle`, `PostalStamp`, `FinalStamp`, `DashedDivider`, `CustomItineraryCTA`.
- Nenhuma alteração a componentes partilhados nesta tarefa.
