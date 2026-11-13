import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type CaptionResult = { caption: string; elements: string[]; error?: string };

const Input = z.object({
  image: z.string().startsWith("data:image/").max(3_000_000),
  place: z.string().max(120),
  city: z.string().max(60),
});

// Analisa a fotografia da viagem e sugere uma legenda curta para a memória do passaporte.
export const suggestCaption = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }): Promise<CaptionResult> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { caption: "", elements: [], error: "Serviço indisponível." };
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText, Output, jsonSchema } = await import("ai");
    const openai = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    try {
      const result = streamText({
        model: openai.responses("openai/gpt-6-astra"),
        maxRetries: 0,
        system:
          "És o editor da revista de viagens O Postal. Escreves sempre em português de Portugal (PT-PT), nunca em português do Brasil. Olha para a fotografia de um viajante e identifica os elementos visíveis (monumentos, luz, pessoas, comida, tempo). Depois escreve uma legenda de memória para o passaporte: uma frase, no máximo 14 palavras, íntima e poética mas concreta, sem emojis, sem hashtags, sem aspas.",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: `Local do carimbo: ${data.place}, ${data.city}.` },
              { type: "file", mediaType: data.image.slice(5, data.image.indexOf(";")), data: data.image.slice(data.image.indexOf(",") + 1) },
            ],
          },
        ],
        output: Output.object({
          schema: jsonSchema<{ elements: string[]; caption: string }>({
            type: "object",
            additionalProperties: false,
            required: ["elements", "caption"],
            properties: {
              elements: { type: "array", items: { type: "string" } },
              caption: { type: "string" },
            },
          }),
        }),
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });
      const out = await result.output;
      return { caption: out.caption.trim(), elements: out.elements.slice(0, 6) };
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode;
      console.error("suggestCaption", status, e);
      const error =
        status === 429 ? "Muitos pedidos — tenta daqui a um minuto."
        : status === 402 || status === 403 ? "As sugestões estão em pausa de momento."
        : "Não foi possível sugerir uma legenda.";
      return { caption: "", elements: [], error };
    }
  });
