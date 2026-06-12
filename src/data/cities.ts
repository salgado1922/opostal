import pragaImg from "@/assets/city-praga.jpg";
import romaImg from "@/assets/city-roma.jpg";
import lisboaImg from "@/assets/city-lisboa.jpg";
import vienaImg from "@/assets/city-viena.jpg";

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
  },
  {
    slug: "roma",
    name: "Roma",
    country: "Itália",
    vibe: "Pedras antigas e jantares longos.",
    duration: "Em breve",
    status: "coming-soon",
    cover: romaImg,
  },
  {
    slug: "lisboa",
    name: "Lisboa",
    country: "Portugal",
    vibe: "Casa, contada como se fosse a primeira vez.",
    duration: "Em breve",
    status: "coming-soon",
    cover: lisboaImg,
  },
  {
    slug: "viena",
    name: "Viena",
    country: "Áustria",
    vibe: "Cafés imperiais e música a sério.",
    duration: "Em breve",
    status: "coming-soon",
    cover: vienaImg,
  },
];