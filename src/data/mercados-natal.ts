// Mercados de Natal 2026 — dados confirmados em fontes oficiais/locais a 20/11/2026.
// Fontes listadas em SOURCES. Não acrescentar nada sem fonte.
import natalVienaRathaus from "@/assets/natal/natal-viena-rathaus.jpg.asset.json";
import natalVienaCoracoes from "@/assets/natal/natal-viena-coracoes.jpg.asset.json";
import natalPragaArvore from "@/assets/natal/natal-praga-arvore.jpg.asset.json";
import natalPragaTyn from "@/assets/natal/natal-praga-tyn.jpg.asset.json";
import natalBudapesteBasilica from "@/assets/natal/natal-budapeste-basilica.jpg.asset.json";
import natalBudapesteVorosmarty from "@/assets/natal/natal-budapeste-vorosmarty.jpg.asset.json";
import provarVienaPunsch from "@/assets/natal/provar-viena-punsch.jpg.asset.json";
import provarVienaMaroni from "@/assets/natal/provar-viena-maroni.jpg.asset.json";
import provarVienaKrainer from "@/assets/natal/provar-viena-kaesekrainer.jpg.asset.json";
import provarPragaSvarak from "@/assets/natal/provar-praga-svarak.jpg.asset.json";
import provarPragaKlobasa from "@/assets/natal/provar-praga-klobasa.jpg.asset.json";
import provarPragaSunka from "@/assets/natal/provar-praga-sunka.jpg.asset.json";
import provarBudapesteForralt from "@/assets/natal/provar-budapeste-forralt.jpg.asset.json";
import provarBudapesteLangos from "@/assets/natal/provar-budapeste-langos.jpg.asset.json";
import provarBudapesteKurtos from "@/assets/natal/provar-budapeste-kurtos.jpg.asset.json";

import type { GlowArea } from "@/components/natal/PhotoLights";
export type XmasPhoto = { src: string; alt: string; width: number; height: number; legenda: string; brilho?: GlowArea[] };
const cj = (q: string, sid: string) =>
  `https://www.kqzyfj.com/click-101800647-15734352?sid=${sid}&url=${encodeURIComponent(`https://www.booking.com/searchresults.pt-pt.html?ss=${encodeURIComponent(q)}&lang=pt-pt&selected_currency=EUR&group_adults=2&no_rooms=1&group_children=0`)}`;

export type Provar = { nome: string; desc: string; preco?: string; src: string; alt: string };
export type Noite = { linhas: { item: string; valor: string }[]; total: string; extra?: string; nota?: string };
export type Market = { name: string; local: string; quando: string; horario?: string; nota: string };
export type XmasCity = {
  slug: "viena" | "praga" | "budapeste";
  city: string;
  guide: "/viena" | "/praga" | "/budapeste";
  kicker: string;
  intro: string;
  markets: Market[];
  provar: Provar[];
  noite: Noite;
  melhorHora: string[];
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
    provar: [
      { nome: "Punsch", desc: "O clássico vienense: bebida quente com especiarias, servida na caneca do mercado. Há também Glühwein e Kinderpunsch sem álcool.", preco: "4,80–6,50 €", src: provarVienaPunsch.url, alt: "Vinho quente com rodelas de laranja e especiarias a aquecer num tacho" },
      { nome: "Maroni", desc: "Castanhas assadas na hora, vendidas em cartucho de papel. Aquecem as mãos enquanto passeias.", preco: "4–6 €", src: provarVienaMaroni.url, alt: "Castanhas a assar numa grande frigideira de ferro" },
      { nome: "Käsekrainer", desc: "Salsicha austríaca com pedacinhos de queijo lá dentro, servida com pão e mostarda.", src: provarVienaKrainer.url, alt: "Käsekrainer cortada num prato com mostarda e um pão" },
    ],
    noite: {
      linhas: [
        { item: "2 × Punsch", valor: "9,60–13 €" },
        { item: "Maroni", valor: "4–6 €" },
        { item: "Caução da caneca (devolvida)", valor: "3–5 €" },
      ],
      total: "≈ 14–19 € por pessoa + caução",
      extra: "Com um lángos (6–8 €) em vez das castanhas, conta com mais 2 €.",
    },
    melhorHora: [
      "Ao anoitecer, num dia de semana: as luzes já estão acesas e há menos gente.",
      "Em Schönbrunn, chega por volta das 16h–17h, quando o palácio se ilumina.",
      "Em Spittelberg, de segunda a quinta entre as 14h e as 17h é quando está mais calmo.",
      "Evita sexta e sábado à noite e o feriado de 8 de dezembro.",
    ],
    dicas: [
      "A caneca paga caução: devolves e recebes o dinheiro, ou ficas com ela como recordação. Só a podes devolver no mercado onde a compraste.",
      "Um Punsch com caução chega facilmente a 10–12 €. Conta com isso no orçamento.",
      "Spittelberg é a escolha dos locais para um ambiente mais artesanal e preços mais baixos.",
      "Há Kinderpunsch sem álcool para quem não bebe ou para crianças.",
    ],
    stay: { label: "Ver alojamentos perto do Rathausplatz", href: cj("Innere Stadt, Wien", "natal-viena") },
    fotos: [
      { src: natalVienaRathaus.url, alt: "Christkindlmarkt da Rathausplatz à noite, com a Câmara de Viena iluminada", width: 1280, height: 960, legenda: "O Christkindlmarkt com a Câmara iluminada por trás", brilho: [{ tipo: "arvore", x: 38, topo: 63, base: 92, meia: 5 }, { tipo: "caixa", x: 0, y: 78, w: 100, h: 22 }] },
      { src: natalVienaCoracoes.url, alt: "Árvore do parque do Rathaus coberta de corações luminosos", width: 1280, height: 1707, legenda: "A árvore dos corações, no parque junto ao mercado", brilho: [{ tipo: "caixa", x: 0, y: 0, w: 100, h: 90 }] },
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
    provar: [
      { nome: "Svařák", desc: "Vinho quente com canela, cravinho e laranja. Em Náměstí Míru custa menos: 60–80 Kč.", preco: "80–120 Kč", src: provarPragaSvarak.url, alt: "Copo de vinho quente com uma rodela de laranja" },
      { nome: "Klobása", desc: "Salsicha grelhada com pão escuro e mostarda. Um clássico checo e uma refeição rápida.", preco: "150–250 Kč", src: provarPragaKlobasa.url, alt: "Salsicha grelhada num prato de papel com pão e mostarda" },
      { nome: "Pražská šunka", desc: "Presunto de Praga assado no espeto sobre lenha. Vende-se ao peso: diz quanto queres antes de cortarem.", preco: "preço por 100 g", src: provarPragaSunka.url, alt: "Presuntos a assar no espeto sobre lume numa banca" },
    ],
    noite: {
      linhas: [
        { item: "2 × svařák, Cidade Velha", valor: "160–240 Kč" },
        { item: "Klobása", valor: "150–250 Kč" },
        { item: "Caução da caneca (devolvida)", valor: "50 Kč" },
      ],
      total: "≈ 310–490 Kč (13–20 €) por pessoa + caução",
      extra: "Trdelník na Cidade Velha: mais 80–120 Kč.",
    },
    melhorHora: [
      "Chega por volta das 15h30–16h: vês a praça com luz do dia e ficas para quando acendem as luzes.",
      "As noites de semana das duas primeiras semanas de dezembro são as mais tranquilas. De manhã, logo às 10h, também se passeia com calma.",
      "No dia da abertura, 28 de novembro, a árvore acende-se ao fim da tarde e a praça enche por completo.",
      "Evita sexta e sábado à noite na Cidade Velha. Para um ambiente mais local, vai a Náměstí Míru.",
    ],
    dicas: [
      "O presunto de Praga (Pražská šunka) é vendido ao peso, por 100 g. Diz quanto queres antes de cortarem — uma fatia grossa pode passar facilmente dos 200–300 g.",
      "O trdelník não é um doce tradicional checo; é sobretudo uma moda turística. Prova se quiseres, mas não por ser típico.",
      "Em 2026 os grandes abrem a 28 de novembro, para haver quatro domingos de Advento antes do Natal.",
    ],
    stay: { label: "Ver alojamentos perto da Cidade Velha", href: cj("Staré Město, Praha", "natal-praga") },
    fotos: [
      { src: natalPragaArvore.url, alt: "Árvore de Natal gigante da Praça da Cidade Velha de Praga acesa à noite", width: 1280, height: 1280, legenda: "A árvore da Cidade Velha, acesa ao cair da tarde", brilho: [{ tipo: "arvore", x: 56, topo: 26, base: 100, meia: 16, fio: [0.22, 0.42, 0.62, 0.8] }] },
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
    provar: [
      { nome: "Forralt bor", desc: "O vinho quente húngaro, com especiarias, para ir bebendo entre as bancas.", preco: "1500 Ft (~4,10 €)", src: provarBudapesteForralt.url, alt: "Potes de barro verdes e caldeiras numa banca do mercado de Natal de Budapeste" },
      { nome: "Lángos", desc: "Massa frita estaladiça, coberta com natas ácidas e queijo ralado.", preco: "2900 Ft (~8 €)", src: provarBudapesteLangos.url, alt: "Dois lángos com cobertura numa banca de Budapeste" },
      { nome: "Kürtőskalács", desc: "Massa enrolada num rolo de madeira e assada nas brasas até caramelizar.", preco: "3300 Ft (~9 €)", src: provarBudapesteKurtos.url, alt: "Rolos de kürtőskalács a assar sobre brasas" },
    ],
    noite: {
      linhas: [
        { item: "2 × forralt bor", valor: "3000 Ft" },
        { item: "Lángos com queijo e natas", valor: "2900 Ft" },
      ],
      total: "≈ 5900 Ft · 16 € por pessoa",
      extra: "Mais barato: o prato a preço fixo do Advent Bazilika custa 1600 Ft (~4,40 €).",
      nota: "Preços de 2025; os de 2026 ainda não foram publicados. Conta com uma ligeira subida.",
    },
    melhorHora: [
      "Uma noite de semana, depois das 18h: filas mais curtas e as luzes no auge.",
      "O espetáculo de luz na fachada da Basílica repete a cada 30 minutos desde as 17h30. Chega por volta das 17h15.",
      "Evita o meio do dia ao fim de semana, quando há mais filas.",
    ],
    dicas: [
      "Cada cozinha grande do Advent Bazilika tem um prato a preço fixo de 1600 Ft, pouco anunciado. Pede-o pelo nome.",
      "Leva cartão ou telemóvel: muitas bancas já só aceitam pagamento sem contacto.",
      "Algumas bancas cobram por 100 g. Lê bem o quadro antes de pedir.",
      "As praças são muito ventosas: luvas, cachecol e botas fazem diferença.",
    ],
    stay: { label: "Ver alojamentos perto da Basílica", href: cj("Lipótváros, Budapest", "natal-budapeste") },
    fotos: [
      { src: natalBudapesteBasilica.url, alt: "Árvore de Natal em cone com laço dourado em frente à Basílica de Santo Estêvão, Budapeste", width: 1280, height: 1707, legenda: "A árvore do Advent Bazilika, em frente à Basílica", brilho: [{ tipo: "arvore", x: 47.5, topo: 1, base: 100, meia: 21, fio: [0.2, 0.34, 0.48, 0.6] }] },
      { src: natalBudapesteVorosmarty.url, alt: "Bancas de madeira do mercado da Praça Vörösmarty à noite, com cortinas de luzes", width: 1280, height: 960, legenda: "As bancas de Vörösmarty sob as cortinas de luz", brilho: [{ tipo: "arvore", x: 27, topo: 3, base: 62, meia: 14, fio: [0.3, 0.55, 0.8] }, { tipo: "caixa", x: 84, y: 0, w: 16, h: 22 }] },
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
