import type { Metadata } from "next";
import LegacyClientsPage, {
  generateMetadata as generateLegacyMetadata,
  generateStaticParams,
} from "../../../[lang]/clients/page";

export { generateStaticParams };
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  return generateLegacyMetadata({ params });
}

export default LegacyClientsPage;
