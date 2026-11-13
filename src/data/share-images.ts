/** 1200x630 share photos per city (same photo each guide uses for og:image). */
export const DEFAULT_SHARE_IMG = "https://opostal.pt/og-default.jpg";

export const CITY_SHARE_IMG: Record<string, string> = {
  praga: "https://opostal.pt/img/og/praga.jpg",
  istambul: "https://opostal.pt/img/og/istambul.jpg",
  florenca: "https://opostal.pt/img/og/florenca.jpg",
  londres: "https://opostal.pt/img/og/londres.jpg",
  paris: "https://opostal.pt/img/og/paris.jpg",
  barcelona: "https://opostal.pt/img/og/barcelona.jpg",
  viena: "https://opostal.pt/img/og/viena.jpg",
  lisboa: "https://opostal.pt/img/og/lisboa.jpg",
  budapeste: "https://opostal.pt/img/og/budapeste.jpg",
};

export const shareImgFor = (slug?: string) => (slug && CITY_SHARE_IMG[slug]) || DEFAULT_SHARE_IMG;
