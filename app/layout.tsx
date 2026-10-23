import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import { portfolioData } from "@/lib/data";
import "./globals.css";

// The site's only typeface.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050606",
};

export const metadata: Metadata = {
  title: `${portfolioData.name} | Software Engineer`,
  description: portfolioData.role,
  authors: [{ name: portfolioData.name }],
  openGraph: {
    title: `${portfolioData.name} | Software Engineer`,
    description: portfolioData.role,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.name} | Software Engineer`,
    description: portfolioData.role,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body className="bg-page font-sans text-fg antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
