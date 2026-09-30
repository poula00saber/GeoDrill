import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.geodrillksa.com"),
};

export default function LocalizedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
