Substituir 5 imagens com problemas no roteiro de Praga por URLs verificadas e mais adequadas.

## Imagens a substituir

1. **Dia 3 — Cover Kutná Hora** (não carregou)
   - Atual: `photo-1568797629192-789acf8e4df3`
   - Nova: `photo-1724426560921-c364a86aa0e9` (castelo com torre sobre colina — resultado de pesquisa Kutná Hora)

2. **Dia 4 — Cover Vyšehrad** (utilizador não gosta da foto)
   - Atual: `photo-1607435097405-db48f377bff6`
   - Nova: `photo-1779213206645-e06f91667848` (edifício branco com telhado vermelho sobre rio e cidade — vista panorâmica calma)

3. **Detalhes — Ossário de Sedlec** (não carregou)
   - Atual: `photo-1601999624908-a08fdfa3e1b9`
   - Nova: Wikimedia Commons — imagem verificada do interior do ossário com lustre de ossos (`File:Sedlec_Ossuary_chandelier.jpg`)

4. **Dia 4 — Stop Vyšehrad** (utilizador quer "vistas panorâmicas, sem multidões")
   - Atual: `photo-1591375275624-c2dafd71a4d2`
   - Nova: `photo-1587539308989-afe8119c4e46` (vista aérea calma de edifícios junto ao rio)

5. **Svíčková** (não carregou)
   - Atual: `photo-1597610690571-50f4c0ddec57`
   - Nova: Wikimedia Commons — imagem verificada de Svíčková na smetaně (`File:Svíčková_na_smetaně.JPG`)

## Ficheiro a editar
- `src/routes/index.tsx` — atualizar as 5 strings `img:`/`cover:` no array `days` e na secção `Food`.

## Nota técnica
- As imagens Wikimedia Commons são gratuitas e estáveis (não expiram como algumas do Unsplash).
- Será adicionado `onError` handler genérico a todas as `<img>` do itinerário para evitar broken images no futuro.

## O que não muda
- Sem alterações de layout, componentes, dependências ou lógica.
- Apenas troca de URLs de imagem.