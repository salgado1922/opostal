## Problema
Na homepage, o hero repete a mensagem de roteiro personalizado: ao lado do botão dourado 'Explorar roteiros gratuitos' existe um link de texto simples 'Pedir roteiro personalizado'. Mais abaixo na página, a secção `CustomItinerary` já tem um botão com borda dourado a apontar para o mesmo destino.

## Alteração
Remover o `<a>` de texto simples 'Pedir roteiro personalizado' do hero da homepage (`src/routes/index.tsx`, linhas ~197-202), mantendo:
- O botão dourado principal 'Explorar roteiros gratuitos' no hero.
- A secção `CustomItinerary` mais abaixo com o botão/borda dourado 'Ver roteiro personalizado'.
- O botão/borda dourado 'Roteiro personalizado' na navegação (`SiteNav`).

## Ficheiro a editar
- `src/routes/index.tsx` apenas.