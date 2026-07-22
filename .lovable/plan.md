# Sincronizar 4 páginas de cidade com os mockups WOW

## Âmbito (confirmado)
- Só as 4 rotas: `src/routes/praga.tsx`, `istambul.tsx`, `florenca.tsx`, `londres.tsx`.
- Substituir imagens de capa pelas novas do zip.
- Homepage, `/abordagem`, `/roteiro-personalizado` e componentes partilhados **não são tocados**.

## O que o zip traz (relevante)
- 4 mockups HTML "WOW" (um por cidade) — mesma arquitetura das páginas atuais (Hero → Conhecer → Essencial → "N dias, N humores" → Dia a dia → Vídeo/movimento → Comer & beber → Dicas & armadilhas → Reservar).
- Novas imagens: `city-praga.jpg`, `city-florenca.jpg`, `city-londres.jpg`, `city-barcelona.jpg`, `hub-hero.jpg`, `istambul/home-card.jpg`.
- `praga.tsx` do zip é idêntico ao atual (só reintroduz `web-share` que já corrigimos) → **ignorar**.

## Plano

### 1. Assets (Lovable Assets CDN)
Registar via `lovable-assets create` a partir de `/mnt/user-uploads/`:
- `src/assets/cities/praga-cover.jpg.asset.json`
- `src/assets/cities/florenca-cover.jpg.asset.json`
- `src/assets/cities/londres-cover.jpg.asset.json`
- `src/assets/cities/istambul-cover.jpg.asset.json` (a partir de `istambul/home-card.jpg`)

Trocar a imagem do `<Hero>` (background) em cada uma das 4 rotas para o novo asset. Manter dimensões, overlays, carimbos (`PostmarkCircle`) e selos (`PostalStamp`) intactos.

### 2. Sincronização de copy/estrutura com os mockups
Para cada cidade, comparo o mockup com a rota atual e aplico **apenas as diferenças textuais e de secção** que vejo no HTML:

- Títulos de secção (ex.: "Conhecer …", "Essencial para a viagem", "N dias, N humores", "Dia a dia, paragem a paragem", "Vê … em movimento", "Comer e beber em …", "Dicas & armadilhas", "Carimbaste a viagem toda. Agora garante o essencial.") — alinhar exatamente com o mockup.
- Subtítulos e microcopy dentro dessas secções (labels de ícones 📍/🗣, intro "Cada dia é um postal. **Vira** para o resumo…", etc.).
- Blocos comparativos com nomes específicos por cidade:
  - Praga: "Concertos: básico ou de luxo?"
  - Istambul: "Bósforo: de dia ou à noite?"
  - Florença: "Cúpula ou Campanário?"
  - Londres: "Ir ou não aos Harry Potter Studios?"
- Rodapé de página: harmonizar o CTA final ("Carimbaste a viagem toda…").

**Não** vou reescrever dados factuais (itinerários, preços, links de afiliados, coordenadas de mapas, horários) — mantenho o que já existe. Se um mockup traz uma paragem/tip que não existe hoje, listo-o para tu confirmares em vez de assumir.

### 3. Verificação
- Build passa.
- Screenshot Playwright de cada rota (`/praga`, `/istambul`, `/florenca`, `/londres`) em desktop 1280 e mobile 390.
- Confirmar que capas mudaram e que headings batem certo com os mockups.

## Fora do âmbito
- Homepage, `/abordagem`, `/roteiro-personalizado`.
- Componentes partilhados (`SiteNav`, `SiteFooter`, `postal/*`, `AffiliateLink`, `CustomItineraryCTA`).
- Lógica de dados, itinerários, preços, links de afiliado.

Aprova para eu passar a build mode e aplicar.
