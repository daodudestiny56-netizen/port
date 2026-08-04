"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";
import CustomCursor from "@/components/CustomCursor";
import { Project } from "@/lib/data";

type Zone = "hero" | "work" | "toolkit" | "about" | "contact";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeZone, setActiveZone] = useState<Zone>("hero");

  useEffect(() => {
    const sectionIds: Zone[] = ["hero", "work", "toolkit", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveZone(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const isInkZone = activeZone === "work" || activeZone === "about";

  return (
    <main
      className={`relative min-h-screen w-full max-w-full overflow-x-hidden flex flex-col select-none transition-none ${
        isInkZone ? "zone-ink" : "zone-bone"
      }`}
      style={{ transition: "background-color 0ms, color 0ms" }}
    >
      <CustomCursor />

      {/* Hero Zone (Bone Background) */}
      <div id="hero" className="w-full zone-bone">
        <Hero currentTheme="bone" />
      </div>

      {/* Work Zone (Ink Background Hard Cut) */}
      <div id="work" className="w-full zone-ink">
        <BentoGrid onSelectProject={(p) => setSelectedProject(p)} />
      </div>

      {/* Toolkit Zone (Bone Background Hard Cut) */}
      <div id="toolkit" className="w-full zone-bone">
        <TechStack />
      </div>

      {/* About Zone (Ink Background Hard Cut) */}
      <div id="about" className="w-full zone-ink">
        <About />
      </div>

      {/* Contact Zone (Bone Background Hard Cut) */}
      <div id="contact" className="w-full zone-bone">
        <Footer />
      </div>

      {/* Technical Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
