
export type CityStatus = "ready" | "coming-soon";

export type CityMeta = {
  slug: string;
  name: string;
  country: string;
  vibe: string;
  duration: string;
  status: CityStatus;
  cover: string;
  to?: string;
  bestSeason: string;
  price: "€" | "€€" | "€€€";
  idealFor: string;
  /** Mês/ano em que visitámos a cidade (ex.: "Mai 2024"). Vazio = não mostra. */
  dataVisita?: string;
  /** Approximate lng/lat for the Europe map pins */
  coords: { lng: number; lat: number };
};

export const CITIES: CityMeta[] = [
  {
    slug: "praga",
    dataVisita: "Jul 2026",
    name: "Praga",
    country: "Chéquia",
    vibe: "Hora dourada sobre o Vltava, sem turistadas.",
    duration: "4 dias",
    status: "ready",
    cover: "/img/cities/praga-card-1024.jpg",
    to: "/praga",
    bestSeason: "Mai–Set",
    price: "€€",
    idealFor: "Ritmo tranquilo",
    coords: { lng: 14.42, lat: 50.08 },
  },
  {
    slug: "istambul",
    dataVisita: "Jan 2025",
    name: "Istambul",
    country: "Turquia",
    vibe: "Entre dois continentes, do azul do Bósforo ao azulejo de İznik.",
    duration: "5 dias",
    status: "ready",
    cover: "/img/cities/istambul-card-1024.jpg",
    to: "/istambul",
    bestSeason: "Abr–Jun / Set",
    price: "€€",
    idealFor: "Ritmo tranquilo",
    coords: { lng: 28.98, lat: 41.01 },
  },
  {
    slug: "florenca",
    dataVisita: "Dez 2025",
    name: "Florença",
    country: "Itália",
    vibe: "Berço do Renascimento, museu a céu aberto.",
    duration: "3 dias",
    status: "ready",
    cover: "/img/cities/florenca-card-1024.jpg",
    to: "/florenca",
    bestSeason: "Abr–Jun / Set",
    price: "€€€",
    idealFor: "Arte e calma",
    coords: { lng: 11.26, lat: 43.77 },
  },
  {
    slug: "londres",
    dataVisita: "Fev 2024 · Nov 2025",
    name: "Londres",
    country: "Reino Unido",
    vibe: "Museus, parques e mercados, a pé e sem pressa.",
    duration: "3 dias + extra",
    status: "ready",
    cover: "/img/cities/londres-card-1024.jpg",
    to: "/londres",
    bestSeason: "Mai–Set",
    price: "€€€",
    idealFor: "Primeira vez, a pé",
    coords: { lng: -0.13, lat: 51.51 },
  },
  {
    slug: "paris",
    dataVisita: "Jan 2023 · Mai 2024",
    name: "Paris",
    country: "França",
    vibe: "A Cidade Luz em 3 dias, mais uma tarde de realeza em Versalhes.",
    duration: "3 dias + extra",
    status: "ready",
    cover: "/img/cities/paris-card-1024.jpg",
    to: "/paris",
    bestSeason: "Abr–Jun / Set–Out",
    price: "€€€",
    idealFor: "Clássico eterno",
    coords: { lng: 2.35, lat: 48.85 },
  },
  {
    slug: "barcelona",
    dataVisita: "Jul 2024",
    name: "Barcelona",
    country: "Espanha",
    vibe: "Gaudí, mar e tapas até tarde.",
    duration: "3 dias",
    status: "ready",
    cover: "/img/cities/barcelona-card-1024.jpg",
    to: "/barcelona",
    bestSeason: "Mai–Jun / Set",
    price: "€€",
    idealFor: "Cidade e praia",
    coords: { lng: 2.17, lat: 41.39 },
  },
  {
    slug: "viena",
    dataVisita: "Jul 2021",
    name: "Viena",
    country: "Áustria",
    vibe: "Palácios imperiais, café e valsa.",
    duration: "3 dias",
    status: "ready",
    cover: "/img/cities/viena-card-1024.jpg",
    to: "/viena",
    bestSeason: "Abr–Jun / Set",
    price: "€€€",
    idealFor: "Arte e elegância",
    coords: { lng: 16.37, lat: 48.21 },
  },
  {
    slug: "lisboa",
    dataVisita: "Várias vezes",
    name: "Lisboa",
    country: "Portugal",
    vibe: "Luz, miradouros e fado à esquina.",
    duration: "3 dias",
    status: "ready",
    cover: "/img/cities/lisboa-card-1024.jpg",
    to: "/lisboa",
    bestSeason: "Mar–Jun / Set–Out",
    price: "€€",
    idealFor: "Cidade e mar",
    coords: { lng: -9.14, lat: 38.72 },
  },
  {
    slug: "budapeste",
    dataVisita: "Jul 2022",
    name: "Budapeste",
    country: "Hungria",
    vibe: "Termas, Danúbio e ruínas com vida.",
    duration: "3 dias",
    status: "ready",
    cover: "/img/cities/budapeste-card-1024.jpg",
    to: "/budapeste",
    bestSeason: "Abr–Jun / Set",
    price: "€€",
    idealFor: "Banhos e boémia",
    coords: { lng: 19.04, lat: 47.50 },
  },
];