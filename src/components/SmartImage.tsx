import { forwardRef, type ImgHTMLAttributes } from "react";

/**
 * SmartImage — visually lossless responsive <img> wrapper.
 *
 * Only rewrites the width parameter (`w=` on Unsplash, `width=` on Wikimedia
 * Special:FilePath). Every other query parameter (q, fit, crop, auto, fm, cs,
 * h, dpr, ...) is preserved verbatim. Never lowers quality. Never converts
 * formats. Never changes framing.
 */

const WIDTHS = [480, 768, 1200, 1600, 2400] as const;

type Host = "unsplash" | "wikimedia" | "other";

function classify(src: string): Host {
  if (src.includes("images.unsplash.com")) return "unsplash";
  if (src.includes("upload.wikimedia.org") || src.includes("commons.wikimedia.org")) return "wikimedia";
  return "other";
}

function currentRequestedWidth(src: string, host: Host): number | null {
  const key = host === "wikimedia" ? "width" : "w";
  const m = src.match(new RegExp(`[?&]${key}=(\\d+)`));
  return m ? parseInt(m[1], 10) : null;
}

function withWidth(src: string, host: Host, w: number): string {
  if (host === "unsplash") {
    let out = src.match(/[?&]w=\d+/)
      ? src.replace(/([?&])w=\d+/, `$1w=${w}`)
      : src + (src.includes("?") ? "&" : "?") + `w=${w}`;
    // Preserve existing q= (never lower). If no q= at all, add q=80.
    if (!/[?&]q=\d+/.test(out)) {
      out += `&q=80`;
    }
    return out;
  }
  if (host === "wikimedia") {
    if (/[?&]width=\d+/.test(src)) {
      return src.replace(/([?&])width=\d+/, `$1width=${w}`);
    }
    return src + (src.includes("?") ? "&" : "?") + `width=${w}`;
  }
  return src;
}

function buildSrcSet(src: string): { srcSet?: string; src: string } {
  const host = classify(src);
  if (host === "other") return { src };
  const current = currentRequestedWidth(src, host) ?? 1600;
  // Ensure the top of the ladder is at least as wide as what the URL already asks for.
  const ladder = Array.from(new Set([...WIDTHS, current].filter((w) => w > 0))).sort((a, b) => a - b);
  const srcSet = ladder.map((w) => `${withWidth(src, host, w)} ${w}w`).join(", ");
  // Use a mid-ladder entry as the fallback src (largest <= 1600 or the smallest available).
  const fallbackW = ladder.find((w) => w >= 1200) ?? ladder[ladder.length - 1];
  return { srcSet, src: withWidth(src, host, fallbackW) };
}

export type SmartImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "src"> & {
  src: string;
  alt: string;
  /** Intrinsic width, for CLS space reservation. Rendered size is still governed by CSS. */
  width?: number;
  /** Intrinsic height, for CLS space reservation. Rendered size is still governed by CSS. */
  height?: number;
  sizes?: string;
  priority?: boolean;
};

export const SmartImage = forwardRef<HTMLImageElement, SmartImageProps>(function SmartImage(
  { src, alt, sizes, priority, loading, decoding, fetchPriority, ...rest },
  ref,
) {
  const { srcSet, src: resolvedSrc } = buildSrcSet(src);
  const effectiveLoading = loading ?? (priority ? "eager" : "lazy");
  const effectiveDecoding = decoding ?? "async";
  const effectiveFetchPriority = fetchPriority ?? (priority ? "high" : undefined);
  const effectiveSizes = srcSet ? sizes ?? "(max-width: 768px) 100vw, 1200px" : undefined;
  return (
    <img
      ref={ref}
      src={resolvedSrc}
      srcSet={srcSet}
      sizes={effectiveSizes}
      alt={alt}
      loading={effectiveLoading}
      decoding={effectiveDecoding}
      fetchPriority={effectiveFetchPriority}
      {...rest}
    />
  );
});

export default SmartImage;