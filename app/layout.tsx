import type { Metadata, Viewport } from "next";
import LayoutWrapper from "@/components/LayoutWrapper";
import { portfolioData } from "@/lib/data";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  title: `${portfolioData.name} | Frontend Developer`,
  description: portfolioData.role,
  authors: [{ name: portfolioData.name }],
  openGraph: {
    title: `${portfolioData.name} | Frontend Developer`,
    description: portfolioData.role,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.name} | Frontend Developer`,
    description: portfolioData.role,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body className="bg-background text-primaryText antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
