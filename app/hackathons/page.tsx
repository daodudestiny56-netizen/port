import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hackathons from "@/components/Hackathons";
import { portfolioData } from "@/lib/data";

export const metadata: Metadata = {
  title: `Hackathons | ${portfolioData.name}`,
  description: `Hackathon builds by ${portfolioData.name} — ${portfolioData.hackathons
    .map((h) => h.event)
    .join(", ")}.`,
};

export default function HackathonsPage() {
  return (
    <main className="relative flex w-full flex-col">
      <Navbar />
      <Hackathons />
    </main>
  );
}
