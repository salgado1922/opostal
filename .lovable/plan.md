# Mais "postal" em O Postal

A marca chama-se O Postal mas, fora o carimbo redondo no hero da Abordagem e a linha tracejada ocasional, pouca coisa no site evoca de facto um postal. A ideia é introduzir um vocabulário visual coerente, inspirado em postais reais (frente ilustrada + verso com linhas, carimbo, selo, morada, escrita à mão), aplicado com contenção para não cair no kitsch.

## Vocabulário visual a introduzir

1. **Selo (stamp)** — pequeno retângulo serrilhado no canto das fotos de capa de cidade, com a bandeira/ilustração mínima do destino e o valor (ex.: "€0,85 · LDN").
2. **Carimbo postal circular** — duplo círculo tracejado com nome da cidade + data ("LONDRES · MMXXVI"), em dourado discreto, rodado ligeiramente. Já existe na Abordagem; replicar (em variantes) nos heros de cidade e no hero da home.
3. **Verso de postal** — secção/cartão com linha vertical central a dividir "mensagem" (texto manuscrito) e "morada" (linhas horizontais + selo + carimbo). Usar em pontos-chave: intro de cada guia ("Postal de boas-vindas") e bloco de fecho da home.
4. **Borda serrilhada / scalloped** — usar como moldura opcional em imagens-chave (cover de cidade nas cards da home).
5. **Linha tracejada dourada** — já usada; sistematizar como divisor recorrente entre secções (substituir alguns `<hr>` lisos).
6. **Tipografia manuscrita** — adicionar uma 2ª serif/handwritten discreta (ex.: Caveat ou Homemade Apple via Google Fonts) só para citações curtas tipo "saudações de…", legendas de fotos e o "verso do postal". Manter Cormorant Garamond como display principal.
7. **Par "Wish you were here"** — micro-legenda em itálico manuscrito recorrente em fechos de secção.

## Onde aplicar

- **`src/routes/index.tsx`**
  - Hero: adicionar carimbo circular sobreposto ao slideshow (canto sup. dir.), com data MMXXVI.
  - Cards de cidades (`CityCard`): moldura serrilhada subtil + mini-selo no canto da imagem com código de cidade (PRG, IST, FLR, LDN…). Carimbo "VISITADO" para guias `ready`; carimbo "EM BREVE" para `planned`.
  - Bloco novo antes do footer: "Verso do postal" com mensagem manuscrita curta + assinatura O Postal.

- **`src/routes/abordagem.tsx`**
  - Já tem carimbo; adicionar selo decorativo no hero e usar a linha tracejada como divisor entre os blocos do método (em vez de só whitespace).
  - Fecho: substituir o atual call-to-action por um "verso de postal" com a frase "Menos pontos, mais sentido" como mensagem manuscrita.

- **Páginas de cidade (`londres.tsx`, `praga.tsx`, `istambul.tsx`, `florenca.tsx`)**
  - Hero: carimbo circular com nome da cidade + ano, sobreposto à foto.
  - Logo a seguir ao hero: introduzir um bloco "Postal de boas-vindas" — verso de postal com 2-3 linhas manuscritas a apresentar o guia, selo do destino e morada estilizada ("Para: viajante curioso / De: O Postal").
  - Divisores entre dias: linha tracejada com selo redondo central (em vez de divisor liso).

## Implementação técnica

- Criar componentes reutilizáveis em `src/components/postal/`:
  - `PostalStamp.tsx` — selo retangular serrilhado (props: code, label, color).
  - `PostmarkCircle.tsx` — carimbo circular tracejado (props: city, year, rotate).
  - `PostcardBack.tsx` — layout verso-de-postal (props: message, signature, stampSlot, addressLines).
  - `DashedDivider.tsx` — divisor tracejado opcionalmente com selo central.
- Tokens em `src/styles.css`: variáveis `--postmark-gold`, `--stamp-edge`, e classe utilitária `.scalloped-border` (via `mask-image` com `radial-gradient` repetido) para a borda serrilhada.
- Tipografia manuscrita: adicionar `Caveat` ao `<link>` Google Fonts em `__root.tsx` e expor como `font-hand` em CSS.
- Aplicar com contenção: cada página recebe **1 carimbo + 1 selo + 1 verso de postal** no máximo, para o efeito ler como editorial e não como scrapbook.

## Fora de âmbito

- Sem alterações de copy substanciais nem reorganização de secções.
- Sem mexer em backend, dados ou auth.
- Tema de Londres e ordenação de cidades ficam como estão.

## Questão antes de implementar

Confirmas o conjunto acima, ou preferes que comece só pelo **kit base (selo + carimbo + verso de postal)** aplicado primeiro na home e numa página de cidade (Londres) para validares o estilo antes de o propagar a tudo?
