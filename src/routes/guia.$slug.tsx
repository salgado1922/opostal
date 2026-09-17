import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { heroPreloadLink } from "@/components/SmartImage";
import { GuideArticle } from "@/components/guides/GuideArticle";
import { getPublishedGuide } from "@/lib/guides.functions";
import type { GuideRow } from "@/lib/guides-schema";

const BASE = "https://opostal.pt";

export const Route = createFileRoute("/guia/$slug")({
  loader: async ({ params }) => {
    const guide = await getPublishedGuide({ data: { slug: params.slug } });
    if (!guide) throw notFound();
    return guide as GuideRow;
  },
  head: ({ loaderData, params }) => {
    const g = loaderData as GuideRow | undefined;
    const url = `${BASE}/guia/${params.slug}`;
    const title = g?.seo_title || (g ? `${g.title} | O Postal` : "Guia | O Postal");
    const description =
      g?.seo_description || g?.intro?.slice(0, 200) || "Guia de viagem d'O Postal.";
    const image = g?.hero_url && /^https?:\/\//.test(g.hero_url) ? g.hero_url : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: [
        { rel: "canonical", href: url },
        ...(g?.hero_url ? [heroPreloadLink(g.hero_url)] : []),
      ],
    };
  },
  errorComponent: () => <Missing />,
  notFoundComponent: () => <Missing />,
  component: GuidePage,
});

function Missing() {
  return (
    <main className="bg-twilight-radial flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-serif text-3xl text-cream">Este postal ainda não foi enviado.</h1>
      <Link to="/" className="gold-link text-sm">
        ← Voltar à homepage
      </Link>
    </main>
  );
}

function GuidePage() {
  const guide = Route.useLoaderData() as GuideRow;
  return <GuideArticle guide={guide} />;
}
