import { z } from "zod";

/** Client-safe schema for guides written in the admin panel. */

const text = (max: number) => z.string().trim().max(max).optional().default("");

export const stopSchema = z.object({
  time: text(40),
  title: text(160),
  desc: text(2000),
  tip: text(600),
  cost: text(80),
  link: text(600),
  image: text(1000),
  imageAlt: text(200),
});

export const daySchema = z.object({
  label: text(40),
  title: text(160),
  vibe: text(600),
  cover: text(1000),
  coverAlt: text(200),
  stops: z.array(stopSchema).max(24).optional().default([]),
});

export const eatSchema = z.object({
  name: text(160),
  dish: text(160),
  price: text(80),
  note: text(600),
  link: text(600),
  image: text(1000),
});

export const staySchema = z.object({
  zone: text(160),
  desc: text(600),
  bookingUrl: text(1000),
});

export const noteSchema = z.object({
  title: text(160),
  desc: text(2000),
});

export const contentSchema = z.object({
  context: z.array(noteSchema).max(12).optional().default([]),
  days: z.array(daySchema).max(12).optional().default([]),
  eat: z.array(eatSchema).max(20).optional().default([]),
  stay: z.array(staySchema).max(12).optional().default([]),
  rainy: z.array(noteSchema).max(12).optional().default([]),
  secrets: z.array(noteSchema).max(12).optional().default([]),
  farewell: text(200),
});

export const guideInputSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Só letras minúsculas, números e hífenes"),
  title: text(160),
  city: text(80),
  country: text(80),
  duration: text(60),
  hero_url: text(1000),
  hero_alt: text(200),
  intro: text(3000),
  seo_title: text(160),
  seo_description: text(300),
  status: z.enum(["draft", "published"]).optional().default("draft"),
  content: contentSchema,
});

export type Stop = z.infer<typeof stopSchema>;
export type GuideDay = z.infer<typeof daySchema>;
export type GuideContent = z.infer<typeof contentSchema>;
export type GuideInput = z.infer<typeof guideInputSchema>;

export type GuideRow = GuideInput & {
  id: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export const emptyContent: GuideContent = {
  context: [],
  days: [],
  eat: [],
  stay: [],
  rainy: [],
  secrets: [],
  farewell: "",
};

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Fills in any missing arrays so the editor always has a complete shape. */
export function normalizeContent(raw: unknown): GuideContent {
  const parsed = contentSchema.safeParse(raw ?? {});
  return parsed.success ? parsed.data : { ...emptyContent };
}
