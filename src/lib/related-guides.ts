import { listPublishedGuides } from "@/lib/guides.functions";
import { slugify } from "@/lib/guides-schema";

export type RelatedGuide = {
  slug: string;
  title: string;
  city: string;
  country: string;
  duration: string;
  hero_url: string;
  hero_alt: string;
  intro: string;
  published_at: string | null;
};

/** "Florença" and "florenga" are the same place for matching purposes. */
const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/** All published articles, newest first. */
export async function allGuides(): Promise<RelatedGuide[]> {
  const rows = (await listPublishedGuides()) as RelatedGuide[] | null;
  return Array.isArray(rows) ? rows : [];
}

/**
 * Published articles written for one city in the admin panel.
 * Matches on the city name, ignoring accents and case.
 */
export async function guidesForCity(
  city: string,
  slug = "",
): Promise<RelatedGuide[]> {
  const want = norm(city);
  const wantSlug = norm(slug);
  return (await allGuides()).filter((g) => {
    const n = norm(g.city ?? "");
    if (n && n === want) return true;
    if (wantSlug && norm(slugify(g.city ?? "")) === wantSlug) return true;
    return false;
  });
}
