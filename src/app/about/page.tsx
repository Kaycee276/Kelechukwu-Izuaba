"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Toolbox from "@/components/Toolbox";
import { staggerContainer, fadeIn, textVariant } from "@/utils/motion";
import { Briefcase, Sparkles, Code2, Calendar } from "lucide-react";

interface Milestone {
  role: string;
  company: string;
  period: string;
  type: "Work" | "Education" | "Web3 / AI";
  description: string;
  highlights: string[];
  skills: string[];
}

const milestones: Milestone[] = [
  {
    role: "Full-Stack Systems Engineer",
    company: "NSKAI",
    period: "2025 - Present",
    type: "Work",
    description:
      "Architecting high-performance search engine systems, indexing pipelines, and AI-assisted data retrieval interfaces.",
    highlights: [
      "Engineered resilient search services and responsive UI with Next.js & TypeScript.",
      "Optimized query indexing throughput and reduced latency across search microservices.",
    ],
    skills: ["Next.js", "TypeScript", "Node.js", "Search Engines", "PostgreSQL"],
  },
  {
    role: "Autonomous AI Agents Developer",
    company: "KeeperHub & Claude API",
    period: "2025",
    type: "Web3 / AI",
    description:
      "Designed autonomous agents executing natural language read/write actions across Web, Terminal CLI, and Telegram surfaces.",
    highlights: [
      "Built KP: multi-surface AI assistant executing onchain transactions via plain English.",
      "Architected rate-limit resilient orchestrations with LangChain and Anthropic Claude APIs.",
    ],
    skills: ["LangChain", "Claude API", "KeeperHub", "Autonomous Agents", "TypeScript"],
  },
  {
    role: "Web3 Protocol & Dapp Builder",
    company: "Chesster, Rhitta & Somnia",
    period: "2024 - Present",
    type: "Web3 / AI",
    description:
      "Built decentralized applications, trustless escrow smart contracts, and real-time reactive blockchain experiences.",
    highlights: [
      "Created Chesster: online 2-player chess dapp with live move verification & database persistence.",
      "Leveraged Somnia Data Streams (SDS) and Reown AppKit for reactive onchain music streaming (Rhitta).",
    ],
    skills: ["Solidity", "Foundry", "AppKit", "ethers.js", "Somnia SDS", "WebSockets"],
  },
  {
    role: "B.Sc. in Computer Science",
    company: "University of Nigeria, Nsukka (UNN)",
    period: "Undergraduate",
    type: "Education",
    description:
      "Studying core foundations in algorithms, data structures, distributed systems, and modern software architecture.",
    highlights: [
      "Active open-source developer leading student hackathon teams and open-source contributions.",
    ],
    skills: ["Data Structures", "Algorithms", "Distributed Systems", "Software Architecture"],
  },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "timeline">("overview");
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);

  const toggleToolbox = () => setIsToolboxOpen(!isToolboxOpen);

  interface Tools {
    category: string;
    items: string[];
  }

  const tools: Tools[] = [
    {
      category: "Programming",
      items: ["TypeScript", "JavaScript", "Solidity", "Move", "Rust", "Python"],
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
      className="h-full w-full flex flex-col items-center justify-start overflow-y-auto px-4 sm:px-6 py-4 relative custom-scroll"
    >
      {/* Toolbox Modal */}
      {isToolboxOpen && <Toolbox tools={tools} toggleToolbox={toggleToolbox} />}

      <div className="max-w-4xl w-full flex flex-col gap-5 pt-2 pb-12">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-1.5 rounded-sm text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-[#e85d04] text-white shadow-md shadow-[#e85d04]/20 border border-[#e85d04]"
                : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bio & Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-4 py-1.5 rounded-sm text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "timeline"
                ? "bg-[#e85d04] text-white shadow-md shadow-[#e85d04]/20 border border-[#e85d04]"
                : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience & Milestones</span>
          </button>
          <button
            onClick={toggleToolbox}
            className="px-4 py-1.5 rounded-sm text-xs sm:text-sm font-medium bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex items-center gap-2"
          >
            <Code2 className="w-3.5 h-3.5 text-[#e85d04]" />
            <span className="hidden sm:inline">View Tech Stack</span>
            <span className="sm:hidden">Stack</span>
          </button>
        </div>

        {/* Tab 1: Bio & Overview */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center p-2 sm:p-4 rounded-sm"
          >
            {/* Left Column - Image */}
            <motion.div
              variants={fadeIn("right", "spring", 0.2, 1)}
              className="hidden md:flex justify-center"
            >
              <div className="relative aspect-square w-full max-w-[280px] lg:max-w-[340px] overflow-hidden rounded-sm border border-white/20 shadow-md">
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
              className="flex flex-col justify-center gap-3"
            >
              <motion.div variants={textVariant(0.2)}>
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white tracking-wide">
                  About Me
                </h1>
              </motion.div>

              <motion.div
                variants={fadeIn("left", "spring", 0.4, 1)}
                className="space-y-3"
              >
                <div className="text-xs sm:text-sm text-gray-300 space-y-2 leading-relaxed font-light">
                  <p>
                    I'm{" "}
                    <span className="uppercase font-semibold text-white">
                      Kenneth Kelechukwu Izuaba
                    </span>
                    , a Full-Stack & Web3 Developer studying Computer Science at
                    UNN.
                  </p>
                  <p>
                    I build search engine systems at{" "}
                    <span className="text-white font-medium">NSKAI</span>,
                    autonomous AI agents (
                    <span className="text-white font-medium">Claude API</span> &{" "}
                    <span className="text-white font-medium">KeeperHub</span>), and
                    Web3 dapps with TypeScript, React, Next.js, & Solidity.
                  </p>
                  <p>
                    From trustless escrow platforms (
                    <span className="text-white font-medium">Chesster</span>) to
                    active open-source contributions, I focus on clean code,
                    distributed systems, and relentless execution.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn("up", "spring", 0.2, 1)}
                className="pt-2 flex flex-wrap gap-2.5"
              >
                <button
                  onClick={() => setActiveTab("timeline")}
                  className="px-4 py-2 bg-[#e85d04] hover:bg-[#dc2f02] text-white text-xs sm:text-sm rounded-sm transition-all shadow-md font-medium flex items-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Explore Timeline</span>
                </button>
                <button
                  onClick={toggleToolbox}
                  className="px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white text-xs sm:text-sm cursor-pointer hover:bg-white/10 transition-all shadow-sm font-medium flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5 text-[#e85d04]" />
                  <span>View Full Tech Stack</span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Tab 2: Experience & Milestones Timeline */}
        {activeTab === "timeline" && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4 py-2"
          >
            <div className="text-center sm:text-left mb-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                Experience & Milestones
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Roles, engineering initiatives, and research milestones
              </p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l border-white/15 space-y-6">
              {milestones.map((item, index) => (
                <motion.div
                  key={item.role + item.company}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-[#e85d04] group-hover:bg-[#e85d04] transition-colors" />

                  <div className="p-4 sm:p-5 rounded-sm border border-white/15 bg-black/60 backdrop-blur-md space-y-2 hover:border-white/25 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {item.role}
                        </h3>
                        <div className="text-xs sm:text-sm text-[#e85d04] font-medium">
                          {item.company}
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-[10px] sm:text-xs bg-white/5 border border-white/10 text-gray-300 font-mono">
                        <Calendar className="w-3 h-3 text-[#e85d04]" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                      {item.description}
                    </p>

                    <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside pt-1 font-light">
                      {item.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                      {item.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 text-[10px] bg-white/5 text-orange-200 border border-white/5 rounded-xs font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
