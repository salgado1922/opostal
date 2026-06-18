import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { AuthForm } from "@/components/AuthForm";
import opostalHorizontalTransparent from "@/assets/brand/opostal-horizontal-transparent.png.asset.json";

type Search = { redirect?: string };

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — O Postal" },
      { name: "description", content: "Inicie sessão para aceder aos seus guias premium da O Postal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): Search => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        if (redirect) window.location.href = redirect;
        else navigate({ to: "/" });
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        if (redirect) window.location.href = redirect;
        else navigate({ to: "/" });
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, redirect]);

  return (
    <main className="bg-twilight-radial min-h-screen px-6 py-16">
      <div className="mx-auto max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-cream">
          <img
            src={opostalHorizontalTransparent.url}
            alt="O Postal"
            className="h-8 w-auto object-contain"
          />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10"
        >
          <AuthForm redirectUrl={redirect} />
        </motion.div>
      </div>
    </main>
  );
}