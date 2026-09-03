# Carrossel TikTok — Istambul (7 slides)

Sim, faço mais do que mexer no site: gero também material visual para redes sociais. Este trabalho é 100% fora do site — não altero nenhuma página.

## O que vou entregar

7 imagens verticais 1080x1920 (formato TikTok/Reels), prontas a carregar como carrossel, usando as fotos reais do guia de Istambul que já existem no projeto.

Cada slide: foto a full-bleed, escurecimento suave em baixo para leitura, título curto grande + uma linha de apoio, número do slide, e a marca "O Postal" discreta no canto — no mesmo registo visual do site (dourado discreto, serif nos títulos).

## Sequência dos slides

1. Capa — "Istambul em 5 dias" + gancho ("o roteiro que eu faria outra vez")
2. Dia 1 — Sultanahmet: Santa Sofia + Mesquita Azul
3. Dia 2 — Topkapi e a Cisterna da Basílica
4. Dia 3 — Bazar das Especiarias e Grande Bazar
5. Dia 4 — travessia do Bósforo / lado asiático
6. Dia 5 — Balat, Gálata e o pôr do sol
7. CTA — "Guia completo grátis em opostal.pt"

Os textos exatos saem do conteúdo real do guia de Istambul (paragens e dicas já escritas), para não inventar informação.

## Notas técnicas

- Script Python (Pillow) em `/tmp`, a compor as imagens a partir de `src/assets/istambul/*.jpg` (crop inteligente para 9:16, sem esticar).
- Tipografia: serif para títulos + sans para apoio, coerente com o site.
- Saída: `/mnt/documents/tiktok-istambul/slide-1.png` … `slide-7.png`, mais um ZIP para descarregar de uma vez.
- Nenhum ficheiro do site (`src/`, rotas, estilos) é alterado.
- Entrego também a legenda sugerida + hashtags em PT para o post.

Se depois quiseres, faço o mesmo molde para Paris, Londres, Praga e Florença — o script fica reutilizável.
