import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotFoundPage } from "@/components/NotFoundPage";

// Catch-all: unknown URLs render the 404 page with its own title (and a 404 status).
export const Route = createFileRoute("/$")({
  loader: () => {
    throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Página não encontrada | O Postal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFoundPage,
  notFoundComponent: NotFoundPage,
});
