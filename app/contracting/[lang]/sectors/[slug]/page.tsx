import type { Metadata } from "next";
import LegacySectorPage, {
  generateMetadata as generateLegacyMetadata,
  generateStaticParams,
} from "../../../../[lang]/sectors/[slug]/page";

export { generateStaticParams };
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  return generateLegacyMetadata({ params });
}

export default LegacySectorPage;
