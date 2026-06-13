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
  {
    slug: "paris",
    name: "Paris",
    country: "França",
    vibe: "Bairros, museus e cafés sem fim.",
    duration: "Em breve",
    status: "coming-soon",
    cover:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80",
    bestSeason: "Abr–Jun / Set–Out",
    price: "€€€",
    idealFor: "Clássico eterno",
    coords: { lng: 2.35, lat: 48.85 },
  },
  {
    slug: "viena",
    name: "Viena",
    country: "Áustria",
    vibe: "Palácios imperiais, café e valsa.",
    duration: "Em breve",
    status: "coming-soon",
    cover:
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1400&q=80",
    bestSeason: "Abr–Jun / Set",
    price: "€€€",
    idealFor: "Arte e elegância",
    coords: { lng: 16.37, lat: 48.21 },
  },
  {
    slug: "lisboa",
    name: "Lisboa",
    country: "Portugal",
    vibe: "Luz, miradouros e fado à esquina.",
    duration: "Em breve",
    status: "coming-soon",
    cover:
      "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1400&q=80",
    bestSeason: "Mar–Jun / Set–Out",
    price: "€€",
    idealFor: "Cidade e mar",
    coords: { lng: -9.14, lat: 38.72 },
  },
  {
    slug: "budapeste",
    name: "Budapeste",
    country: "Hungria",
    vibe: "Termas, Danúbio e ruínas com vida.",
    duration: "Em breve",
    status: "coming-soon",
    cover:
      "https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=1400&q=80",
    bestSeason: "Abr–Jun / Set",
    price: "€€",
    idealFor: "Banhos e boémia",
    coords: { lng: 19.04, lat: 47.50 },
  },
];