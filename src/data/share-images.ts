/** 1200x630 share photos per city (same photo each guide uses for og:image). */
export const DEFAULT_SHARE_IMG = "https://opostal.pt/og-default.jpg";

export const CITY_SHARE_IMG: Record<string, string> = {
  praga: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&h=630&q=80",
  istambul: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&h=630&q=80",
  florenca: "https://commons.wikimedia.org/wiki/Special:FilePath/Florence_skyline_at_dusk_%283867485023%29.jpg?width=1200",
  londres: "https://commons.wikimedia.org/wiki/Special:FilePath/Westminster_Bridge_with_shadows_and_Big_Ben.jpg?width=1200",
  paris: "https://commons.wikimedia.org/wiki/Special:FilePath/Tour_Eiffel_Wikimedia_Commons.jpg?width=1200",
  barcelona: "https://commons.wikimedia.org/wiki/Special:FilePath/Sagrada_Familia_01.jpg?width=1200",
  viena: "https://commons.wikimedia.org/wiki/Special:FilePath/20180109%20Vienna%20State%20Opera%20at%20blue%20hour%20850%209387.jpg?width=1200",
  lisboa: "https://commons.wikimedia.org/wiki/Special:FilePath/Lisboa%2C_Miradouro_das_Portas_do_Sol%2C_vista.jpg?width=1200",
  budapeste: "https://commons.wikimedia.org/wiki/Special:FilePath/20190502_Widok_na_Budapeszt_z_G%C3%B3ry_Gellerta_1651_2150_DxO.jpg?width=1200",
};

export const shareImgFor = (slug?: string) => (slug && CITY_SHARE_IMG[slug]) || DEFAULT_SHARE_IMG;
