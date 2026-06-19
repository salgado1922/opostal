## Alterações propostas

### 1. Carimbos de Londres — um de cada lado no hero
Atualmente os dois carimbos (2024 e 2025) estão sobrepostos no canto superior direito do hero de Londres. Vou separá-los para ficarem um à esquerda e outro à direita do centro do hero, mantendo a estética de postal e a sugestão de revisitas.

- **Ficheiro**: `src/routes/londres.tsx`
- **Mudança**: Substituir o container absoluto com os dois carimbos sobrepostos por dois containers absolutos separados — um `left-6 top-24` (2024) e outro `right-6 top-24` (2025), com rotações ligeiramente diferentes.

### 2. Contorno suave a preto nas letras douradas da homepage
As letras douradas do título "O Postal" no hero da homepage perdem legibilidade em algumas fotos do slideshow. Vou adicionar um contorno suave a preto.

- **Ficheiro**: `src/routes/index.tsx`
- **Mudança**: No `<h1>` do hero (linha ~248), adicionar `[-webkit-text-stroke:1.2px_rgba(0,0,0,0.55)]` junto ao `text-shadow` existente. O `-webkit-text-stroke` funciona com `background-clip: text` e cria um contorno preciso sem afetar o gradiente dourado.

---

**Ficheiros a alterar**: `src/routes/londres.tsx`, `src/routes/index.tsx`