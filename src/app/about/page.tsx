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
      className="w-full min-h-full md:h-full flex items-center justify-center px-4 sm:px-6 relative py-6 md:py-0 md:overflow-hidden"
    >
      {/* Toolbox Modal */}
      {isToolboxOpen && <Toolbox tools={tools} toggleToolbox={toggleToolbox} />}

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center md:max-h-[85vh] p-4 sm:p-6 rounded-sm">
        {/* Profile Image (Visible on mobile as compact avatar, full on desktop) */}
        <motion.div
          variants={fadeIn("right", "spring", 0.2, 1)}
          className="flex justify-center"
        >
          <div className="relative aspect-square w-full max-w-[200px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px] overflow-hidden rounded-sm border border-white/20 shadow-md">
            <motion.img
              src="/image-1.jpeg"
              alt="Kenneth Kelechukwu Izuaba"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.03 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </motion.div>

        {/* Content derived directly from CV */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="flex flex-col justify-center gap-3"
        >
          <motion.div variants={textVariant(0.2)}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
              About Me
            </h1>
            <p className="text-xs text-[#e85d04] uppercase tracking-widest mt-1 font-semibold">
              Full-Stack & Web3 Developer | Computer Science, UNN
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("left", "spring", 0.4, 1)}
            className="space-y-2.5"
          >
            <div className="text-xs sm:text-sm text-gray-300 space-y-2 leading-relaxed">
              <p>
                I'm <span className="uppercase font-semibold text-white">Kenneth Kelechukwu Izuaba</span>, a Full-Stack & Web3 Developer pursuing a B.Sc. in Computer Science at the University of Nigeria, Nsukka.
              </p>
              <p>
                I engineer end-to-end applications spanning full-stack search engines at <span className="text-white font-medium">NSKAI</span>, autonomous AI agents leveraging <span className="text-white font-medium">Claude API</span> & <span className="text-white font-medium">KeeperHub</span>, and high-performance Web3 dapps built with TypeScript, React, Next.js, and Solidity.
              </p>
              <p>
                From building trustless escrow chess platforms (<span className="text-white font-medium">Chesster</span>) to active open-source contributions across EVM & Solana ecosystems, I focus on clean architecture, type safety, and seamless user experiences.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeIn("up", "spring", 0.2, 1)} className="pt-1">
            <button
              onClick={toggleToolbox}
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white text-xs sm:text-sm cursor-pointer hover:bg-white/10 transition-all shadow-sm"
            >
              View My Tech Stack & Skills
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
