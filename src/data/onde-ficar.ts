export type Zone = { name: string; for: string; body: string; pros: string[]; cons: string[]; href: string };
export type StayArticle = {
  slug: string; city: string; guide: "/praga" | "/lisboa"; days: number;
  title: string; description: string; intro: string; verdict: string; zones: Zone[];
};
const cj = (q: string, sid: string) =>
  `https://www.kqzyfj.com/click-101800647-15734352?sid=${sid}&url=${encodeURIComponent(`https://www.booking.com/searchresults.pt-pt.html?ss=${encodeURIComponent(q)}&lang=pt-pt&selected_currency=EUR&group_adults=2&no_rooms=1&group_children=0`)}`;

export const STAY_ARTICLES: Record<string, StayArticle> = {
  praga: {
    slug: "praga", city: "Praga", guide: "/praga", days: 4,
    title: "Onde ficar em Praga: os 3 melhores bairros",
    description: "Onde ficar em Praga na primeira visita: Cidade Velha, Malá Strana ou Nové Město. Prós, contras e para quem é cada bairro.",
    intro: "Praga vê-se quase toda a pé, por isso a escolha do bairro decide quanto tempo passas a caminhar e quanto pagas por noite. Estes são os três que usamos no nosso roteiro de 4 dias.",
    verdict: "Primeira visita e pouco tempo: Cidade Velha. Viagem a dois e noites calmas: Malá Strana. Orçamento mais curto: Nové Město.",
    zones: [
      { name: "Cidade Velha (Staré Město)", for: "Primeira visita", body: "Central, a pé de tudo. Sais do hotel e estás logo no meio da ação: Praça da Cidade Velha, Relógio Astronómico e Ponte Carlos.", pros: ["Quase tudo a pé", "Ideal para estadias curtas"], cons: ["Mais turístico", "Preços mais altos"], href: cj("Staré Město, Praga, República Checa", "praga-stare-mesto-artigo") },
      { name: "Malá Strana", for: "Casais e noites tranquilas", body: "Charmosa, junto ao castelo. Ruas tranquilas à noite e vistas de postal, do outro lado da Ponte Carlos.", pros: ["Ambiente calmo à noite", "Perto do Castelo"], cons: ["Ruas a subir", "Menos opções baratas"], href: cj("Malá Strana, Praga, República Checa", "praga-mala-strana-artigo") },
      { name: "Nové Město", for: "Melhor preço", body: "Mais barato e bem servido de metro. Boa relação qualidade-preço sem perder ligação ao centro.", pros: ["Mais barato", "Metro à porta"], cons: ["Menos charme", "Algumas zonas movimentadas à noite"], href: cj("Nové Město, Praga, República Checa", "praga-nove-mesto-artigo") },
    ],
  },
  lisboa: {
    slug: "lisboa", city: "Lisboa", guide: "/lisboa", days: 3,
    title: "Onde ficar em Lisboa: Baixa, Alfama ou Bairro Alto?",
    description: "Onde ficar em Lisboa na primeira visita: Baixa/Chiado, Alfama ou Bairro Alto/Príncipe Real. Prós, contras e para quem é cada zona.",
    intro: "Lisboa é feita de colinas, e a zona onde dormes muda o teu dia: mais subidas, mais barulho à noite ou mais tudo a pé. Estas são as três zonas do nosso roteiro de 3 dias.",
    verdict: "Primeira visita: Baixa/Chiado. Ambiente de bairro e fado: Alfama. Jantares e vida noturna: Bairro Alto/Príncipe Real.",
    zones: [
      { name: "Baixa / Chiado", for: "Primeira visita", body: "O centro pombalino, plano e a pé de quase tudo. Bem ligado por metro e elétrico.", pros: ["Plano e central", "Bons transportes"], cons: ["Mais turístico", "Menos ambiente de bairro"], href: cj("Baixa, Lisboa, Portugal", "lisboa-baixa-artigo") },
      { name: "Alfama", for: "Quem quer a Lisboa antiga", body: "O bairro mais antigo e carismático, entre miradouros, becos e fado à noite.", pros: ["Muito carácter", "Miradouros à porta"], cons: ["Ruas íngremes", "Difícil com malas"], href: cj("Alfama, Lisboa, Portugal", "lisboa-alfama-artigo") },
      { name: "Bairro Alto / Príncipe Real", for: "Jantares e noite", body: "Vida noturna, lojas e restaurantes, a dois passos do Chiado e dos miradouros.", pros: ["Restaurantes e bares", "Perto do Chiado"], cons: ["Barulho até tarde no Bairro Alto"], href: cj("Bairro Alto, Lisboa, Portugal", "lisboa-bairro-alto-artigo") },
    ],
  },
};
