import { createFileRoute, redirect } from "@tanstack/react-router";

// Atalho curto partilhado em redes: leva à página do roteiro personalizado.
export const Route = createFileRoute("/roteiro")({
  beforeLoad: () => {
    throw redirect({ to: "/roteiro-personalizado", statusCode: 301 });
  },
});
