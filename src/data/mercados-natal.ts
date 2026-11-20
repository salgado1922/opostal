// Mercados de Natal 2026 — dados confirmados em fontes oficiais/locais a 20/11/2026.
// Fontes listadas em SOURCES. Não acrescentar nada sem fonte.
import natalVienaRathaus from "@/assets/natal/natal-viena-rathaus.jpg.asset.json";
import natalVienaCoracoes from "@/assets/natal/natal-viena-coracoes.jpg.asset.json";
import natalPragaArvore from "@/assets/natal/natal-praga-arvore.jpg.asset.json";
import natalPragaTyn from "@/assets/natal/natal-praga-tyn.jpg.asset.json";
import natalBudapesteBasilica from "@/assets/natal/natal-budapeste-basilica.jpg.asset.json";
import natalBudapesteVorosmarty from "@/assets/natal/natal-budapeste-vorosmarty.jpg.asset.json";

export type XmasPhoto = { src: string; alt: string; width: number; height: number; legenda: string };
const cj = (q: string, sid: string) =>
  `https://www.kqzyfj.com/click-101800647-15734352?sid=${sid}&url=${encodeURIComponent(`https://www.booking.com/searchresults.pt-pt.html?ss=${encodeURIComponent(q)}&lang=pt-pt&selected_currency=EUR&group_adults=2&no_rooms=1&group_children=0`)}`;

export type Market = { name: string; local: string; quando: string; horario?: string; nota: string };
export type XmasCity = {
  slug: "viena" | "praga" | "budapeste";
  city: string;
  guide: "/viena" | "/praga" | "/budapeste";
  kicker: string;
  intro: string;
  markets: Market[];
  precos: { item: string; valor: string }[];
  precosFonte: string;
  dicas: string[];
  stay: { label: string; href: string };
  fotos: XmasPhoto[];
};

export const XMAS_CITIES: XmasCity[] = [
  {
    slug: "viena", city: "Viena", guide: "/viena", kicker: "Áustria · Punsch e valsa",
    intro: "Viena tem mais de 20 mercados de Advento oficiais e a tradição remonta a 1296, quando Alberto I concedeu aos vienenses o privilégio de um mercado de dezembro.",
    markets: [
      { name: "Wiener Christkindlmarkt", local: "Rathausplatz, em frente à Câmara", quando: "13 nov – 26 dez 2026", horario: "Todos os dias 10h–22h · 24 dez até às 18h30", nota: "O maior e mais famoso. Pista de gelo entre a Câmara e o Burgtheater." },
      { name: "Schloss Schönbrunn", local: "Pátio de honra do palácio", quando: "6 nov 2026 – 6 jan 2027", nota: "Entrada gratuita, com o palácio amarelo como cenário." },
      { name: "Spittelberg", local: "Ruelas barrocas do 7.º bairro", quando: "13 nov – 23 dez 2026", horario: "Seg–sex 14h–21h30 · sáb–dom 11h–21h30", nota: "Artesanato, Baumkuchen e o Punsch mais em conta entre os grandes." },
      { name: "Belvedere (K&K)", local: "Palácio Belvedere, Prinz-Eugen-Straße", quando: "20 nov – 31 dez 2026", horario: "Seg–sex 11h–22h · fins de semana 10h–22h", nota: "Tema imperial, artesanato de qualidade e restauração biológica." },
    ],
    precos: [
      { item: "Punsch / vinho quente, Spittelberg", valor: "desde 4,80 €" },
      { item: "Punsch / vinho quente, Schönbrunn", valor: "5,00–6,50 €" },
      { item: "Caução da caneca (Häferl)", valor: "3–5 €" },
    ],
    precosFonte: "Valores de 2026 confirmados pelos organizadores (MeinBezirk, 10/11/2026).",
    dicas: [
      "A caneca paga caução: devolves e recebes o dinheiro, ou ficas com ela como recordação. Só a podes devolver no mercado onde a compraste.",
      "Um Punsch com caução chega facilmente a 10–12 €. Conta com isso no orçamento.",
      "Spittelberg é a escolha dos locais para um ambiente mais artesanal e preços mais baixos.",
      "Há Kinderpunsch sem álcool para quem não bebe ou para crianças.",
    ],
    stay: { label: "Ver alojamentos perto do Rathausplatz", href: cj("Innere Stadt, Wien", "natal-viena") },
    fotos: [
      { src: natalVienaRathaus.url, alt: "Christkindlmarkt da Rathausplatz à noite, com a Câmara de Viena iluminada", width: 1280, height: 960, legenda: "O Christkindlmarkt com a Câmara iluminada por trás" },
      { src: natalVienaCoracoes.url, alt: "Árvore do parque do Rathaus coberta de corações luminosos", width: 1280, height: 1707, legenda: "A árvore dos corações, no parque junto ao mercado" },
    ],
  },
  {
    slug: "praga", city: "Praga", guide: "/praga", kicker: "Chéquia · Árvore e torres góticas",
    intro: "Os dois grandes mercados — Praça da Cidade Velha e Praça Venceslau — são geridos em conjunto e são os mais bonitos, mas também os mais caros. Os de bairro são mais calmos.",
    markets: [
      { name: "Praça da Cidade Velha", local: "Staroměstské náměstí", quando: "28 nov 2026 – 6 jan 2027", horario: "Todos os dias 10h–22h", nota: "A árvore gigante entre a Igreja de Týn e o Relógio Astronómico." },
      { name: "Praça Venceslau", local: "Václavské náměstí", quando: "28 nov 2026 – 6 jan 2027", horario: "Todos os dias 10h–22h", nota: "Mais comprido e comercial, ótimo para comer." },
      { name: "Náměstí Míru", local: "Vinohrady, frente à Igreja de Santa Ludmila", quando: "20 nov – 24 dez 2026", horario: "10h–20h", nota: "O preferido de muitos locais. Abre antes dos grandes." },
      { name: "Náměstí Republiky", local: "Nové Město", quando: "25 nov – 24 dez 2026", horario: "10h–19h", nota: "Pequeno e prático, junto à Casa Municipal." },
    ],
    precos: [
      { item: "Vinho quente (svařák), Cidade Velha", valor: "80–120 Kč" },
      { item: "Caução da caneca", valor: "50 Kč" },
      { item: "Vinho quente, Náměstí Míru", valor: "60–80 Kč" },
      { item: "Trdelník, Cidade Velha", valor: "80–120 Kč" },
    ],
    precosFonte: "Prague City Breaks, guia de 2026.",
    dicas: [
      "O presunto de Praga (Pražská šunka) é vendido ao peso, por 100 g. Diz quanto queres antes de cortarem — uma fatia grossa pode passar facilmente dos 200–300 g.",
      "O trdelník não é um doce tradicional checo; é sobretudo uma moda turística. Prova se quiseres, mas não por ser típico.",
      "Vai durante a semana ou logo às 10h: ao fim de semana a Cidade Velha fica muito cheia.",
      "Em 2026 os grandes abrem a 28 de novembro, para haver quatro domingos de Advento antes do Natal.",
    ],
    stay: { label: "Ver alojamentos perto da Cidade Velha", href: cj("Staré Město, Praha", "natal-praga") },
    fotos: [
      { src: natalPragaArvore.url, alt: "Árvore de Natal gigante da Praça da Cidade Velha de Praga acesa à noite", width: 1280, height: 1280, legenda: "A árvore da Cidade Velha, acesa ao cair da tarde" },
      { src: natalPragaTyn.url, alt: "Bancas do mercado de Natal de Praga com as torres da Igreja de Týn ao fundo", width: 1280, height: 1705, legenda: "As bancas aos pés das torres de Týn" },
    ],
  },
  {
    slug: "budapeste", city: "Budapeste", guide: "/budapeste", kicker: "Hungria · Luzes no Danúbio",
    intro: "Dois mercados centrais a dez minutos a pé um do outro, ambos com entrada gratuita. Em 2026 o Advent Bazilika foi eleito melhor mercado de Natal da Europa (European Best Destinations).",
    markets: [
      { name: "Advent Bazilika", local: "Szent István tér, frente à Basílica", quando: "13 nov 2026 – 1 jan 2027", horario: "Dom–qui 11h–22h · sex–sáb 11h–23h · 24 dez 11h–15h", nota: "Espetáculo de luz 3D na fachada a cada 30 min desde as 17h30. Novo túnel de luz." },
      { name: "Vörösmarty tér", local: "Praça Vörösmarty, junto ao Danúbio", quando: "13 nov – 28 dez 2026", horario: "Dom–qui 11h–21h · sex–sáb 11h–22h · 24 dez 10h–14h", nota: "Mais animado e rápido. Comboio gratuito para crianças." },
      { name: "Advent Óbudán", local: "Fő tér, 3.º bairro", quando: "27 nov – 23 dez 2026", nota: "Mais pequeno, com pista de gelo gratuita." },
    ],
    precos: [
      { item: "Vinho quente (forralt bor)", valor: "1500 Ft (~4,10 €)" },
      { item: "Lángos com queijo e natas", valor: "2900 Ft (~8 €)" },
      { item: "Kürtőskalács", valor: "3300 Ft (~9 €)" },
      { item: "Prato a preço fixo, Bazilika", valor: "1600 Ft (~4,40 €)" },
    ],
    precosFonte: "Preços de 2025 (Pénzcentrum, via How to Hungary). Os de 2026 ainda não foram publicados; conta com uma ligeira subida.",
    dicas: [
      "Cada cozinha grande do Advent Bazilika tem um prato a preço fixo de 1600 Ft, pouco anunciado. Pede-o pelo nome.",
      "Leva cartão ou telemóvel: muitas bancas já só aceitam pagamento sem contacto.",
      "Algumas bancas cobram por 100 g. Lê bem o quadro antes de pedir.",
      "Chega por volta das 17h15 para ver bem o espetáculo de luz, e prefere uma noite de semana ao sábado.",
      "As praças são muito ventosas: luvas, cachecol e botas fazem diferença.",
    ],
    stay: { label: "Ver alojamentos perto da Basílica", href: cj("Lipótváros, Budapest", "natal-budapeste") },
    fotos: [
      { src: natalBudapesteBasilica.url, alt: "Árvore de Natal em cone com laço dourado em frente à Basílica de Santo Estêvão, Budapeste", width: 1280, height: 1707, legenda: "A árvore do Advent Bazilika, em frente à Basílica" },
      { src: natalBudapesteVorosmarty.url, alt: "Bancas de madeira do mercado da Praça Vörösmarty à noite, com cortinas de luzes", width: 1280, height: 960, legenda: "As bancas de Vörösmarty sob as cortinas de luz" },
    ],
  },
];

export const SOURCES = [
  { label: "christkindlmarkt.at (Rathausplatz)", url: "https://www.christkindlmarkt.at/en/" },
  { label: "Stadt Wien — Spittelberg", url: "https://www.wien.gv.at/veranstaltungen/weihnachtsmarkt-spittelberg" },
  { label: "Stadt Wien — Schönbrunn", url: "https://www.wien.gv.at/veranstaltungen/weihnachtsmarkt-schoenbrunn" },
  { label: "Austria.info — mercados de Viena", url: "https://www.austria.info/en-gb/highlights/christmas-markets-in-vienna/" },
  { label: "bestinvienna.at — preços do Punsch 2026", url: "https://bestinvienna.at/en/news/punch-prices-2026/" },
  { label: "trhypraha.cz (organizador, Praga)", url: "https://trhypraha.cz/en/markets/list-of-markets/christmas-markets-2026" },
  { label: "VisitCzechia — mercados de Praga", url: "https://www.visitczechia.com/de-de/things-to-do/events/2026/11/e-christmas-markets-prague" },
  { label: "Prague City Breaks — preços 2026", url: "https://www.praguecitybreaks.com/city/prague/articles/prague-christmas-markets-2026-dates-prices-and-a-day-by-day-plan" },
  { label: "Prague Behind The Scenes — dicas", url: "https://www.praguebehindthescenes.com/prague-christmas-markets/" },
  { label: "How to Hungary — Budapeste 2026", url: "https://howtohungary.com/2026/11/02/budapest-christmas-markets-2026/" },
  { label: "r/wien, r/Prague, r/budapest — experiências de viajantes", url: "https://www.reddit.com/r/Prague/" },
];
