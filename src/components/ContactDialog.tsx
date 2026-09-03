import { useState } from "react";
import { Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdqnrlg";

export function ContactDialog() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("_subject", "Nova mensagem — O Postal");
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Contactar O Postal"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cream/55 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-sm"
        >
          <Mail className="h-4 w-4" />
          <span className="hidden sm:inline">Contacto</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Enviar uma mensagem</DialogTitle>
          <DialogDescription>
            Dúvidas sobre um roteiro ou uma sugestão? Escreve — respondo sempre.
          </DialogDescription>
        </DialogHeader>

        {status === "sent" ? (
          <div className="space-y-4 py-2">
            <p className="text-sm text-cream/80">
              Mensagem enviada. Obrigado! Respondo o mais rápido possível.
            </p>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Nome</Label>
              <Input id="contact-name" name="nome" required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Mensagem</Label>
              <Textarea id="contact-message" name="mensagem" rows={5} required />
            </div>
            {status === "error" && (
              <p className="text-sm text-destructive">
                Não foi possível enviar. Escreve diretamente para{" "}
                <a className="underline" href="mailto:contacto@opostal.pt">
                  contacto@opostal.pt
                </a>
                .
              </p>
            )}
            <div className="flex items-center justify-between gap-4">
              <a
                href="mailto:contacto@opostal.pt"
                className="text-[11px] uppercase tracking-[0.18em] text-cream/50 hover:text-gold"
              >
                Ou envia email
              </a>
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "A enviar…" : "Enviar"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
