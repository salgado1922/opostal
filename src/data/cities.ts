import pragaImg from "@/assets/city-praga.jpg";
import istambulImg from "@/assets/istambul/home-card.jpg";
import florencaImg from "@/assets/city-florenca.jpg";
import barcelonaImg from "@/assets/city-barcelona.jpg";
import londresImg from "@/assets/city-londres.jpg";

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
  /** Approximate lng/lat for the Europe map pins */
  coords: { lng: number; lat: number };
};

export const CITIES: CityMeta[] = [
  {
    slug: "praga",
    name: "Praga",
    country: "Chéquia",
    vibe: "Hora dourada sobre o Vltava, sem turistadas.",
    duration: "4 dias",
    status: "ready",
    cover: pragaImg,
    to: "/praga",
    bestSeason: "Mai–Set",
    price: "€€",
    idealFor: "Ritmo tranquilo",
    coords: { lng: 14.42, lat: 50.08 },
  },
  {
    slug: "istambul",
    name: "Istambul",
    country: "Turquia",
    vibe: "Entre dois continentes, do azul do Bósforo ao azulejo de İznik.",
    duration: "5 dias",
    status: "ready",
    cover: istambulImg,
    to: "/istambul",
    bestSeason: "Abr–Jun / Set",
    price: "€€",
    idealFor: "Ritmo tranquilo",
    coords: { lng: 28.98, lat: 41.01 },
  },
  {
    slug: "florenca",
    name: "Florença",
    country: "Itália",
    vibe: "Renascimento a cada esquina, luz toscana.",
    duration: "Em breve",
    status: "coming-soon",
    cover: florencaImg,
    bestSeason: "Abr–Jun / Set",
    price: "€€€",
    idealFor: "Arte e calma",
    coords: { lng: 11.26, lat: 43.77 },
  },
  {
    slug: "barcelona",
    name: "Barcelona",
    country: "Espanha",
    vibe: "Gaudí, mar e tapas até tarde.",
    duration: "Em breve",
    status: "coming-soon",
    cover: barcelonaImg,
    bestSeason: "Mai–Jun / Set",
    price: "€€",
    idealFor: "Cidade e praia",
    coords: { lng: 2.17, lat: 41.39 },
  },
  {
    slug: "londres",
    name: "Londres",
    country: "Reino Unido",
    vibe: "Museus, parques e mil bairros.",
    duration: "Em breve",
    status: "coming-soon",
    cover: londresImg,
    bestSeason: "Mai–Set",
    price: "€€€",
    idealFor: "Primeira vez",
    coords: { lng: -0.13, lat: 51.51 },
  },
];