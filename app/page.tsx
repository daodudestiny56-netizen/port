"use client";

import { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import TechStack from "@/components/TechStack";
import Principles from "@/components/Principles";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";
import ZoomPortal from "@/components/ui/ZoomPortal";
import { CircuitDivider, EdgeDivider, TapeDivider } from "@/components/ui/Dividers";
import { portfolioData, Project } from "@/lib/data";

const TAPE_ITEMS = [
  "SOFTWARE ENGINEER",
  "SYSTEM DESIGN",
  "REAL-TIME APPS",
  "TYPESCRIPT",
  "OFFLINE-FIRST",
  "PERFORMANCE",
  "ACCESSIBILITY",
  "APIS",
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeModal = useCallback(() => setSelectedProject(null), []);
  const projectCount = portfolioData.projects.length + 1;

  return (
    <main className="relative w-full max-w-full overflow-x-clip flex flex-col">
      <Navbar />

      <Hero />
      <TapeDivider items={TAPE_ITEMS} background="bone" />
      <ZoomPortal title="SELECTED WORK" subtitle={`${String(projectCount).padStart(2, "0")} CASE STUDIES · PROBLEM → APPROACH → CODE`} />
      <Work onSelectProject={setSelectedProject} />
      <EdgeDivider from="ink" to="bone" shape="zigzag" />
      <TechStack />
      <CircuitDivider background="bone" label="DD.CORE" />
      <EdgeDivider from="bone" to="ink" shape="steps" teeth={24} />
      <Principles />
      <EdgeDivider from="ink" to="bone" shape="zigzag" teeth={40} />
      <About />
      <TapeDivider items={TAPE_ITEMS.slice().reverse()} background="bone" />
      <Footer />

      <ProjectModal project={selectedProject} onClose={closeModal} />
    </main>
  );
}
