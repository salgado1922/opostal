import { useRef, useState } from "react";
import { Loader2, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SmartImage } from "@/components/SmartImage";

export const inputCls =
  "w-full rounded-md border border-gold/25 bg-background/60 px-3 py-2 text-sm text-cream placeholder:text-cream/35 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.2em] text-cream/55">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-cream/40">{hint}</span>}
    </label>
  );
}

export function Text({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        className={inputCls}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function Area({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <textarea
        className={inputCls}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

/** URL field with optional upload from the computer (private bucket + proxy URL). */
export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const upload = async (file: File) => {
    setBusy(true);
    setErr(null);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage
      .from("guide-images")
      .upload(path, file, { contentType: file.type, upsert: false });
    setBusy(false);
    if (error) {
      setErr("Não foi possível carregar a foto. Tenta outra vez.");
      return;
    }
    onChange(`/api/public/guide-image/${path}`);
  };

  return (
    <div>
      <Field label={label}>
        <div className="flex gap-2">
          <input
            className={inputCls}
            value={value}
            placeholder="Cola aqui o link da foto"
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-gold/30 px-3 py-2 text-xs text-cream/80 transition-colors hover:bg-gold/10 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            Carregar
          </button>
        </div>
      </Field>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void upload(f);
          e.target.value = "";
        }}
      />
      {err && <p className="mt-1 text-xs text-red-400">{err}</p>}
      {value && (
        <div className="mt-2 overflow-hidden rounded-md border border-gold/15">
          <SmartImage src={value} alt="Pré-visualização" className="h-28 w-full object-cover" />
        </div>
      )}
    </div>
  );
}

export function RepeatBlock({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gold/15 bg-background/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold/80">{title}</p>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remover ${title}`}
          className="rounded-md p-1.5 text-cream/45 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-dashed border-gold/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream/70 transition-colors hover:bg-gold/10"
    >
      + {label}
    </button>
  );
}

export function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass rounded-2xl border border-gold/20 p-5 md:p-6">
      <h2 className="font-serif text-2xl text-cream">{title}</h2>
      {description && <p className="mt-1 text-sm text-cream/55">{description}</p>}
      <div className="mt-5 grid gap-4">{children}</div>
    </section>
  );
}
