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
import { Project } from "@/lib/data";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <main className="relative flex w-full flex-col">
      <Navbar />
      <Hero />
      <Work onSelectProject={setSelectedProject} />
      <TechStack />
      <Principles />
      <About />
      <Footer />
      <ProjectModal project={selectedProject} onClose={closeModal} />
    </main>
  );
}
