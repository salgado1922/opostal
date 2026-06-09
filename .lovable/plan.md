## Objetivo
Gerar uma versão estática da app "Praga" que possas abrir em qualquer browser, sem servidor, e partilhar por email/WhatsApp/USB.

## Abordagem
A app é uma SPA React (TanStack Start). Vou gerar um build estático apenas do cliente (SPA mode) e empacotar tudo num ZIP.

### Passos
1. **Build estático SPA**
   - Correr o build de produção do Vite em modo cliente (sem SSR), produzindo `dist/` com `index.html` + assets (JS/CSS/imagens).
   - Garantir que as rotas funcionam offline: como só existe `/` (uma página), abre direto no `index.html` sem precisar de servidor.

2. **Empacotar para download**
   - Criar `/mnt/documents/praga-itinerario.zip` com o conteúdo de `dist/`.
   - Disponibilizar via `<presentation-artifact>` para download imediato.

3. **Instruções de uso**
   - Descompactar o ZIP → duplo clique em `index.html` → abre no browser.
   - As imagens do Unsplash continuam a carregar da internet (são URLs externos), portanto é preciso ligação para as ver. Texto, layout e ícones funcionam offline.

### Notas técnicas
- Não vou alterar nenhum ficheiro fonte da app — apenas executar o build e zipar o resultado.
- Se preferires um **único ficheiro `.html`** auto-contido (com JS/CSS inline), posso instalar o `vite-plugin-singlefile` e gerar essa variante — diz-me se queres essa versão em vez do ZIP (fica num só ficheiro, mais fácil de partilhar, mas mais pesado).
