"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeIn, textVariant } from "@/utils/motion";
import { ExternalLink, Github, Search, X, Sparkles } from "lucide-react";

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  repo: string | null;
}

type CategoryType = "All" | "Web3 & On-Chain" | "AI & Agents" | "Full-Stack";

const categories: CategoryType[] = [
  "All",
  "Web3 & On-Chain",
  "AI & Agents",
  "Full-Stack",
];

const matchesCategory = (project: ProjectItem, category: CategoryType): boolean => {
  if (category === "All") return true;

  const textToScan = `${project.title} ${project.description} ${project.tags.join(" ")}`.toLowerCase();

  if (category === "Web3 & On-Chain") {
    const web3Keywords = [
      "solidity",
      "foundry",
      "ethers",
      "appkit",
      "reown",
      "somnia",
      "solana",
      "rainbow",
      "onchain",
      "blockchain",
      "dapp",
      "decentralized",
      "web3",
    ];
    return web3Keywords.some((kw) => textToScan.includes(kw));
  }

  if (category === "AI & Agents") {
    const aiKeywords = [
      "langchain",
      "keeperhub",
      "ai",
      "agent",
      "assistant",
      "grammar",
    ];
    return aiKeywords.some((kw) => textToScan.includes(kw));
  }

  if (category === "Full-Stack") {
    const fullstackKeywords = [
      "next.js",
      "react",
      "node",
      "express",
      "supabase",
      "postgresql",
      "sqlite",
      "rest",
      "socket.io",
    ];
    return fullstackKeywords.some((kw) => textToScan.includes(kw));
  }

  return true;
};

export default function ProjectsClient({
  projects,
}: {
  projects: ProjectItem[];
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const inCategory = matchesCategory(project, selectedCategory);
      if (!inCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = project.title.toLowerCase().includes(q);
      const descMatch = project.description.toLowerCase().includes(q);
      const tagMatch = project.tags.some((tag) => tag.toLowerCase().includes(q));

      return titleMatch || descMatch || tagMatch;
    });
  }, [projects, selectedCategory, searchQuery]);

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
          className={`sticky top-0 z-50 w-full pt-6 pb-4 px-4 sm:px-8 flex flex-col gap-3 items-center transition-all duration-300 rounded-none ${
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
            variants={fadeIn("up", "spring", 0.3, 1)}
            className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto text-center leading-relaxed"
          >
            Explore 12+ production systems, smart contracts, AI assistants, and open-source dapps
          </motion.p>

          {/* Search bar & Category filter pills */}
          <div className="w-full max-w-2xl flex flex-col gap-3 pt-2">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, technology (e.g. Solidity, Next.js, AI)..."
                className="w-full pl-10 pr-9 py-2 bg-white/5 border border-white/15 focus:border-[#e85d04] focus:outline-none rounded-sm text-xs sm:text-sm text-white placeholder-gray-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {categories.map((cat) => {
                const count = projects.filter((p) => matchesCategory(p, cat)).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-sm text-[11px] sm:text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#e85d04] text-white shadow-md shadow-[#e85d04]/20 border border-[#e85d04]"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? "bg-black/30 text-white" : "bg-white/10 text-gray-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Results Count bar */}
        <div className="flex items-center justify-between text-xs text-gray-400 px-1 border-b border-white/10 pb-2">
          <span>
            Showing <strong className="text-white">{filteredProjects.length}</strong> of {projects.length} projects
          </span>
          {(searchQuery || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-[#e85d04] hover:underline flex items-center gap-1"
            >
              <span>Reset filter</span>
            </button>
          )}
        </div>

        {/* Projects List */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 border border-dashed border-white/15 rounded-sm bg-black/40">
            <p className="text-gray-300 text-sm mb-3">No projects found matching your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs rounded-sm transition-all border border-white/20"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            variants={staggerContainer(0.05, 0.1)}
            className="flex flex-col gap-5 pb-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id || project.title}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="p-5 sm:p-6 rounded-sm border border-white/15 bg-black/50 backdrop-blur-md flex flex-col justify-between gap-4 hover:border-white/25 transition-all shadow-md group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-[#e85d04] uppercase tracking-wide group-hover:text-orange-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.id === 12 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] bg-[#e85d04]/20 text-orange-300 border border-[#e85d04]/40 font-mono">
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom bar with tags on left and action links on right */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          title={`Filter by ${tag}`}
                          className="px-2.5 py-0.5 text-[10px] sm:text-xs bg-white/10 text-orange-300 rounded-sm border border-white/5 font-mono hover:bg-[#e85d04]/20 hover:border-[#e85d04]/40 transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
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
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
