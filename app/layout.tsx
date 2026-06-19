import type { Metadata } from "next";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daodu Destiny | Full-Stack Developer & Creative Engineer",
  description: "Minimalist dark-theme portfolio of Daodu Destiny, a full-stack developer crafting fast, accessible, and intentional software.",
  authors: [{ name: "Daodu Destiny" }],
  openGraph: {
    title: "Daodu Destiny | Full-Stack Developer",
    description: "Minimalist portfolio showcasing high-performance web engineering.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daodu Destiny | Full-Stack Developer",
    description: "Minimalist portfolio showcasing high-performance web engineering.",
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
