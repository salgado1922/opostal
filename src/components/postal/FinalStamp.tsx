import { DashedDivider } from "./DashedDivider";
import { PostalStamp } from "./PostalStamp";

type Props = {
  code: string;
  year?: string;
};

/**
 * Fecho editorial de página: separador tracejado + selo postal final.
 * Usado antes do CTA para replicar o "carimbo final" dos mockups.
 */
export function FinalStamp({ code, year = "MMXXVI" }: Props) {
  return (
    <section aria-hidden="true" className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 py-16">
      <DashedDivider withStamp className="w-full" />
      <PostalStamp code={code} label="O Postal" value={year} rotate={-8} />
    </section>
  );
}