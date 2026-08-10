"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Toolbox from "@/components/Toolbox";
import { staggerContainer, fadeIn, textVariant } from "@/utils/motion";

export default function AboutPage() {
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);

  const toggleToolbox = () => setIsToolboxOpen(!isToolboxOpen);

  interface Tools {
    category: string;
    items: string[];
  }

  const tools: Tools[] = [
    {
      category: "Programming",
      items: [
        "TypeScript",
        "JavaScript",
        "Solidity",
        "Move",
        "Rust",
        "Python",
      ],
    },
    {
      category: "Frameworks & AI",
      items: [
        "React",
        "Next.js",
        "TailwindCSS",
        "Node.js",
        "Express",
        "LangChain",
        "KeeperHub",
        "Claude API",
        "Framer Motion",
        "Zustand",
      ],
    },
    {
      category: "Web3 & DevOps",
      items: [
        "Hardhat",
        "Ethers.js",
        "PostgreSQL",
        "Supabase",
        "SQLite",
        "WebSockets",
        "Git & GitHub",
        "Solana / EVM",
      ],
    },
  ];

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="h-full w-full flex items-center justify-center overflow-hidden px-2 sm:px-4 relative"
    >
      {/* Toolbox Modal */}
      {isToolboxOpen && <Toolbox tools={tools} toggleToolbox={toggleToolbox} />}

      <div className="max-w-4xl w-full grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 items-center max-h-[85vh] p-2 sm:p-4 rounded-sm">
        {/* Left Column - Image (Preserved 2-column layout on all screens) */}
        <motion.div
          variants={fadeIn("right", "spring", 0.2, 1)}
          className="flex justify-center"
        >
          <div className="relative aspect-square w-full max-w-[130px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-[340px] overflow-hidden rounded-sm border border-white/20 shadow-md">
            <motion.img
              src="/image-1.jpeg"
              alt="Kenneth Kelechukwu Izuaba"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.03 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="flex flex-col justify-center gap-1.5 sm:gap-3"
        >
          <motion.div variants={textVariant(0.2)}>
            <h1 className="text-lg sm:text-3xl lg:text-5xl font-bold text-white tracking-wide">
              About Me
            </h1>
            <p className="text-[8px] sm:text-xs text-[#e85d04] uppercase tracking-widest mt-0.5 font-semibold">
              Full-Stack & Web3 Developer | CS, UNN
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("left", "spring", 0.4, 1)}
            className="space-y-1.5 sm:space-y-2.5"
          >
            <div className="text-[10px] sm:text-xs md:text-sm text-gray-300 space-y-1 sm:space-y-2 leading-tight sm:leading-relaxed">
              <p>
                I'm <span className="uppercase font-semibold text-white">Kenneth Kelechukwu Izuaba</span>, a Full-Stack & Web3 Developer studying Computer Science at UNN.
              </p>
              <p>
                I build search engine systems at <span className="text-white font-medium">NSKAI</span>, autonomous AI agents (<span className="text-white font-medium">Claude API</span> & <span className="text-white font-medium">KeeperHub</span>), and Web3 dapps with TypeScript, React, Next.js, & Solidity.
              </p>
              <p>
                From trustless escrow platforms (<span className="text-white font-medium">Chesster</span>) to active open-source contributions, I focus on clean code and performance.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeIn("up", "spring", 0.2, 1)} className="pt-0.5">
            <button
              onClick={toggleToolbox}
              className="px-2.5 py-1 sm:px-4 sm:py-2 bg-white/5 border border-white/20 rounded-sm text-white text-[9px] sm:text-xs md:text-sm cursor-pointer hover:bg-white/10 transition-all shadow-sm"
            >
              View My Tech Stack
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
