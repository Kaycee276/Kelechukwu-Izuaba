"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, Send, Sparkles } from "lucide-react";
import { staggerContainer, fadeIn, textVariant } from "@/utils/motion";

const roles = [
  "Fullstack Developer",
  "Web3 & Smart Contract Builder",
  "Autonomous AI Agents Architect",
  "Open-Source Contributor",
];

const CV_URL =
  "https://docs.google.com/document/d/1c0acDeoCnhHPdQUknvOdlBjG2Ka4uGTjT3YnJuJdGQg/edit?usp=sharing";

export default function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="h-full min-h-[520px] flex items-center justify-center px-4 sm:px-6 py-6"
    >
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
        {/* Live Availability Badge */}
        <motion.div
          variants={fadeIn("down", "spring", 0.1, 0.8)}
          className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[11px] sm:text-xs text-gray-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>available for high-impact contracts & roles</span>
        </motion.div>

        {/* Name / Main Intro */}
        <motion.div variants={textVariant(0.15)} className="mb-2">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#e85d04] font-medium mb-2">
            Kenneth Kelechukwu Izuaba
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Engineering Systems, AI & Web3
          </h1>
        </motion.div>

        {/* Cycling Specialty Role */}
        <div className="h-8 sm:h-10 my-3 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-sm sm:text-lg md:text-xl text-gray-300 font-mono flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e85d04]" />
              <span>{roles[roleIndex]}</span>
              <span className="animate-pulse text-[#e85d04]">_</span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Description */}
        <motion.p
          variants={fadeIn("up", "spring", 0.3, 1)}
          className="text-xs sm:text-sm md:text-base text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed font-light"
        >
          Building search engine platforms at NSKAI, autonomous agents with
          LangChain & KeeperHub, and trustless on-chain dapps with Next.js,
          TypeScript & Solidity.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          variants={fadeIn("up", "spring", 0.4, 1)}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8"
        >
          <Link
            href="/projects"
            className="group px-4 py-2 sm:px-5 sm:py-2.5 bg-[#e85d04] hover:bg-[#dc2f02] text-white text-xs sm:text-sm font-medium rounded-sm transition-all flex items-center gap-2 shadow-lg shadow-[#e85d04]/20"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-medium rounded-sm transition-all flex items-center gap-2 backdrop-blur-sm"
          >
            <Send className="w-3.5 h-3.5 text-gray-300" />
            <span>Get in Touch</span>
          </Link>

          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-medium rounded-sm transition-all flex items-center gap-2 backdrop-blur-sm"
          >
            <FileText className="w-3.5 h-3.5 text-gray-300" />
            <span>View CV</span>
          </a>
        </motion.div>

        {/* Highlights / Quick Stats */}
        <motion.div
          variants={fadeIn("up", "spring", 0.5, 1)}
          className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 border-t border-white/10 text-center max-w-md w-full"
        >
          <div>
            <div className="text-base sm:text-xl font-bold text-white font-mono">12+</div>
            <div className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wider">Shipped Projects</div>
          </div>
          <div>
            <div className="text-base sm:text-xl font-bold text-[#e85d04] font-mono">Web3 & AI</div>
            <div className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wider">Core Focus</div>
          </div>
          <div>
            <div className="text-base sm:text-xl font-bold text-white font-mono">UNN</div>
            <div className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wider">Comp Sci</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
