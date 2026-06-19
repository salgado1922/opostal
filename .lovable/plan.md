# Ajustar selos nas cards e datar carimbos por cidade

## Mudanças

### 1. Selos das cards da homepage
Em `src/routes/index.tsx`, linhas 507-512, alterar o `PostalStamp`:
- `label="O Postal"` → `label="Postal"` (fica mais clean, sem "O" solto)
- `value={isReady ? "Visitado" : "Em breve"}` → `value={isReady ? "VISITADO" : "EM BREVE"}` (mais uniforme com o selo)

### 2. Carimbos circulares dos heros das cidades
Substituir `year="MMXXVI"` pelo ano real em que o guia foi publicado:
- `src/routes/istambul.tsx` → `year="2025"`
- `src/routes/praga.tsx` → `year="2026"`
- `src/routes/florenca.tsx` → `year="2025"`

### 3. Londres — dois carimbos
Em `src/routes/londres.tsx`, no hero, colocar dois `PostmarkCircle` sobrepostos:
- Carimbo de 2024: atrás, ligeiramente deslocado para a esquerda, rotação `-14`
- Carimbo de 2025: à frente, ligeiramente deslocado para a direita, rotação `-6`
- Fica bem porque dá ideia de cidade revisitada — coerente com a abordagem d'O Postal.

## Fora de âmbito
- Carimbo da homepage (`O POSTAL · MMXXVI`) mantém-se — é assinatura geral da marca.
- Selo "O Postal" no hero da página A nossa abordagem mantém-se.
