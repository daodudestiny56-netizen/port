"use client";

import { useRef, useState } from "react";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";
import DragCarousel, { DragCarouselRef } from "@/components/ui/DragCarousel";
import ClipText from "@/components/ui/ClipText";
import { portfolioData, Project } from "@/lib/data";
import { usePreloader } from "@/context/PreloaderContext";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { isLoaded } = usePreloader();
  const carouselRef = useRef<DragCarouselRef>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="relative min-h-screen w-full bg-transparent select-none flex flex-col">
      <Hero />
      <BentoGrid onSelectProject={(p) => setSelectedProject(p)} />
      
      {/* Drag Carousel Section */}
      <section className="w-full px-4 sm:px-6 md:px-12 py-[clamp(2.5rem,5vw,4.5rem)] bg-transparent select-none">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          
          {/* Section Title & Navigation */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-2 w-full">
            <div className="flex flex-col gap-1">
              {isLoaded && (
                <>
                  <ClipText
                    text="CASE STUDIES & SANDBOX"
                    lineClassName="font-mono text-xs font-[300] tracking-widest text-[#3FE8F5] uppercase"
                  />
                  <ClipText
                    text="FEATURED PROJECTS."
                    lineClassName="font-display font-[300] text-[clamp(1.5rem,4vw+0.5rem,2.5rem)] text-primaryText tracking-tight"
                    delay={0.08}
                  />
                </>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
              <button
                onClick={() => carouselRef.current?.scrollLeft()}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border bg-[#111111]/80 hover:border-[#00F0FF] flex items-center justify-center text-primaryText transition-colors duration-300 hover:bg-neutral-900"
                data-cursor="hover"
                aria-label="Scroll left"
              >
                &larr;
              </button>
              <button
                onClick={() => carouselRef.current?.scrollRight()}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border bg-[#111111]/80 hover:border-[#00F0FF] flex items-center justify-center text-primaryText transition-colors duration-300 hover:bg-neutral-900"
                data-cursor="hover"
                aria-label="Scroll right"
              >
                &rarr;
              </button>
            </div>
          </div>

          {/* Horizontal Drag Carousel */}
          <DragCarousel ref={carouselRef} className="py-2">
            {portfolioData.projects.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 0.98 }}
                onClick={() => setSelectedProject(project)}
                className="flex flex-col justify-between w-[calc(100vw-2.5rem)] max-w-[340px] sm:w-[300px] md:w-[320px] min-h-[350px] h-auto bg-surface border border-border rounded-[12px] p-5 md:p-6 select-none shrink-0 group relative overflow-hidden card-hover-shadow snap-start cursor-pointer"
                data-cursor="hover"
              >
                {/* Background image overlay */}
                <div className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 overflow-hidden pointer-events-none z-0">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>

                {/* Top category badge & case study indicator */}
                <div className="relative z-10 flex justify-between items-start">
                  <span className="px-2.5 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-[#1A1A1A] border border-border rounded-full text-[#3FE8F5]">
                    {project.category}
                  </span>
                  <span className="text-[9px] font-mono text-[#00F0FF] tracking-wider uppercase flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> CASE STUDY
                  </span>
                </div>

                {/* Bottom title, description and arrow */}
                <div className="relative z-10 flex flex-row justify-between items-end mt-auto gap-4 pt-6">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <h3 className="font-display font-[300] text-base md:text-lg text-primaryText tracking-tight group-hover:text-[#00F0FF] transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-xs text-secondaryText font-[300] leading-relaxed normal-case line-clamp-2">
                      {project.description}
                    </p>
                    <span className="text-[10px] font-mono text-[#3FE8F5] uppercase tracking-wide mt-1">
                      Read Technical Case Study &rarr;
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-border bg-[#1A1A1A]/80 flex items-center justify-center text-primaryText group-hover:border-[#00F0FF] transition-colors duration-300 shrink-0 self-end">
                    <ArrowUpRight className="w-4 h-4 text-[#00F0FF]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </DragCarousel>
        </div>
      </section>

      <About />
      <Footer />

      {/* Interactive Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
