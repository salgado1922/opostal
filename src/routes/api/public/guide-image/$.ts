import { createFileRoute } from "@tanstack/react-router";

/**
 * Public, read-only image proxy for guide photos uploaded in the admin panel.
 * The storage bucket is private; only this route exposes the bytes, and only
 * for paths under it. No writes, no listing.
 */
export const Route = createFileRoute("/api/public/guide-image/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const raw = (params as Record<string, string>)["_splat"] ?? "";
        const path = decodeURIComponent(raw).replace(/^\/+/, "");
        if (!path || path.includes("..")) {
          return new Response("Not found", { status: 404 });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("guide-images").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(await data.arrayBuffer(), {
          headers: {
            "Content-Type": data.type || "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
