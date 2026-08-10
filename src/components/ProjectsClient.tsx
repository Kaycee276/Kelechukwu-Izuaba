"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn, textVariant } from "@/utils/motion";

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

      if (mainScroll > 20 || containerScroll > 20) {
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
      className="w-full min-h-full py-8 px-4 sm:px-6 lg:px-8 space-y-10"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Header - Blur background only displays when scrolled */}
        <header
          className={`sticky top-0 z-50 py-6 px-6 sm:px-8 rounded-2xl flex flex-col gap-4 items-center transition-all duration-300 ${
            isScrolled
              ? "backdrop-blur-md bg-black/70 border border-white/15 shadow-2xl"
              : "bg-transparent border border-transparent shadow-none"
          }`}
        >
          <motion.div variants={textVariant(0.2)} className="text-center">
            <h1 className="text-4xl md:text-5xl capitalize font-bold text-white mb-2 tracking-wide">
              Projects
            </h1>
          </motion.div>
          <motion.p
            variants={fadeIn("up", "spring", 0.4, 1)}
            className="text-sm text-gray-300 max-w-2xl mx-auto text-center leading-relaxed"
          >
            Browse through my latest creative works and projects
          </motion.p>
        </header>

        {/* Projects Grid with ample card padding */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id || project.title}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              className="rounded-2xl overflow-hidden backdrop-blur-md bg-black/50 border border-white/15 transition-all hover:bg-white/10 hover:border-orange-500/50 shadow-xl"
            >
              <div className="p-8 md:p-10 space-y-6">
                <div>
                  <h3 className="uppercase font-bold text-[#e85d04] text-xl mb-3 tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 text-xs bg-white/10 text-orange-300 rounded-lg border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center px-5 py-3 text-sm font-medium transition-all ease-in-out border border-white/20 hover:border-orange-500 text-white hover:text-orange-400 rounded-xl bg-black/40 shadow-md"
                    >
                      View Project
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 ml-2 group-hover:rotate-45 transition-transform"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    </motion.a>
                  )}

                  {project.repo && (
                    <motion.a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center px-5 py-3 text-sm font-medium transition-all ease-in-out border border-white/20 hover:border-gray-400 text-white hover:text-gray-300 rounded-xl bg-black/40 shadow-md"
                    >
                      View Repo
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 ml-2 group-hover:-rotate-45 transition-transform"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    </motion.a>
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
