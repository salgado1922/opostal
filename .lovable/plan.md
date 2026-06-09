## Alterações ao roteiro de Praga

### 1. Renomear "Praga com os Pais" → "Praga"
- `src/routes/index.tsx` (hero `text-gradient-gold`, título da página, og:title, twitter title)
- `src/routes/__root.tsx` (title, og:title)

### 2. Corrigir foto do Castelo de Praga
A imagem atual (`photo-1567696911980-2eed69a46042`) está a devolver uma foto de cerveja. Substituir por uma imagem fiável da Catedral de São Vito / Castelo de Praga e adicionar `onError` fallback para qualquer `<img>` do roteiro, mostrando um placeholder dourado discreto se a imagem falhar.

### 3. Nova secção "Essencial para a viagem"
Inserida logo a seguir ao Hero, antes da timeline. Cartão em vidro (glass) com grelha responsiva de 4 blocos + faixa de frases úteis:

- **Fuso horário** — CET (UTC+1), mesma hora que Lisboa +1h
- **Moeda** — Coroa Checa (CZK). ~25 CZK ≈ 1 €. Pagamentos com cartão aceites em quase todo o lado; levantar em ATMs de banco (evitar Euronet)
- **Tomadas & Voltagem** — Tipo E, 230V (ficha portuguesa encaixa)
- **Emergência & Saúde** — 112 (geral), Cartão Europeu de Saúde válido
- **Transporte** — Bilhete 24h ~120 CZK, metro+tram+autocarro; do aeroporto: autocarro 119 + metro A
- **Gorjetas** — 10% em restaurantes se serviço não incluído
- **Frases úteis** — Olá: *Dobrý den* · Obrigado: *Děkuji* · Por favor: *Prosím* · Sim/Não: *Ano / Ne* · Saúde (brinde): *Na zdraví* · Quanto custa?: *Kolik to stojí?*

Cada bloco com ícone Lucide (Clock, Coins, Plug, Phone, Train, HandCoins, Languages), animação de entrada `whileInView` consistente com o resto da página, e tipografia em harmonia com o design system (serif para títulos, dourado para destaques).

### Ficheiros tocados
- `src/routes/index.tsx` — título, nova secção `<EssentialInfo />`, URL da foto do Castelo, helper `onImgError`
- `src/routes/__root.tsx` — metadados

Sem alterações de backend nem de dependências.