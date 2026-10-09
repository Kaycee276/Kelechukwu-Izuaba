"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn, textVariant } from "@/utils/motion";
import { ExternalLink, Github } from "lucide-react";

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  repo: string | null;
}

export default function ProjectsClient({
  projects,
}: {
  projects: ProjectItem[];
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const mainElement = containerRef.current?.closest("main");
      const mainScroll = mainElement?.scrollTop || 0;
      const containerScroll = containerRef.current?.scrollTop || 0;

      if (mainScroll > 15 || containerScroll > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const mainEl = containerRef.current?.closest("main");
    const containerEl = containerRef.current;

    mainEl?.addEventListener("scroll", handleScroll);
    containerEl?.addEventListener("scroll", handleScroll);

    return () => {
      mainEl?.removeEventListener("scroll", handleScroll);
      containerEl?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="w-full min-h-full px-4 sm:px-6 lg:px-8 space-y-6 pt-0"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header - Touches top of screen with dynamic blur on scroll */}
        <header
          className={`sticky top-0 z-50 w-full pt-6 pb-4 px-6 sm:px-8 flex flex-col gap-2 items-center transition-all duration-300 rounded-none ${
            isScrolled
              ? "backdrop-blur-md bg-black/85 border-b border-white/10 shadow-xl"
              : "bg-transparent border-b border-transparent shadow-none"
          }`}
        >
          <motion.div variants={textVariant(0.2)} className="text-center">
            <h1 className="text-4xl md:text-5xl capitalize font-bold text-white mb-1 tracking-wide">
              Projects
            </h1>
          </motion.div>
          <motion.p
            variants={fadeIn("up", "spring", 0.4, 1)}
            className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto text-center leading-relaxed"
          >
            Browse through my latest creative works and projects
          </motion.p>
        </header>

        {/* Projects List - Admin Dashboard Layout */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="flex flex-col gap-5 pb-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id || project.title}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              className="p-5 sm:p-6 rounded-sm border border-white/15 bg-black/50 backdrop-blur-md flex flex-col justify-between gap-4 hover:border-white/25 transition-all shadow-md"
            >
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#e85d04] uppercase tracking-wide">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bottom bar with tags on left and action links on right */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-[10px] sm:text-xs bg-white/10 text-orange-300 rounded-sm border border-white/5 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs font-medium">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#e85d04] flex items-center gap-1.5 transition-colors px-1.5 py-0.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Demo
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#e85d04] flex items-center gap-1.5 transition-colors px-1.5 py-0.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Repo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
