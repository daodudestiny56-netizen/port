import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import LayoutWrapper from "@/components/LayoutWrapper";
import { portfolioData } from "@/lib/data";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D1110",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-page font-sans text-fg antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
