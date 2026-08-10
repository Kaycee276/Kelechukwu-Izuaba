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
			category: "Frontend",
			items: [
				"React",
				"TypeScript",
				"Tailwind CSS",
				"Javascript",
				"Next.js",
				"AppKit",
				"Zustand",
				"React Query",
				"Recharts",
				"Vite",
				"Webpack",
			],
		},
		{
			category: "Backend",
			items: [
				"Node.js",
				"Express",
				"PostgreSQL",
				"SQLite",
				"REST APIs",
				"GraphQL",
				"Prisma",
				"Drizzle ORM",
				"Supabase",
				"Socket.io",
				"Redis",
				"JWT",
				"OAuth",
				"Microservices",
				"Docker",
				"CI/CD",
			],
		},
		{
			category: "Web3",
			items: [
				"Solidity",
				"Ethers.js",
				"Smart Contracts",
				"Foundry",
				"Web3.js",
				"IPFS",
				"Metamask",
				"OpenZeppelin",
				"Gas Optimization",
				"Tokenomics",
				"Smart Contract Security",
			],
		},
	];

	return (
		<motion.div
			variants={staggerContainer()}
			initial="hidden"
			animate="show"
			className="h-full flex items-center justify-center px-6 py-12 relative"
		>
			{/* Toolbox Modal */}
			{isToolboxOpen && <Toolbox tools={tools} toggleToolbox={toggleToolbox} />}

			<div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center p-6 md:p-10 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl">
				{/* Left Column - Image */}
				<motion.div
					variants={fadeIn("right", "spring", 0.2, 1)}
					className="hidden md:block"
				>
					<div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/20 shadow-lg">
						<motion.img
							src="/image-1.jpeg"
							alt="Profile"
							className="w-full h-full object-cover"
							whileHover={{ scale: 1.03 }}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
					</div>
				</motion.div>

				{/* Right Column - Content */}
				<motion.div
					variants={staggerContainer(0.1, 0.2)}
					className="flex flex-col gap-6"
				>
					<motion.div variants={textVariant(0.2)}>
						<h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
							About Me
						</h1>
					</motion.div>

					<motion.div
						variants={fadeIn("left", "spring", 0.4, 1)}
						className="space-y-4"
					>
						<div className="text-xs sm:text-sm text-gray-300 space-y-4 leading-relaxed">
							<p>
								I'm <span className="uppercase font-semibold text-white">Izuaba Kenneth Kelechukwu</span>.
								I design interfaces that move with purpose, React ecosystems built in TypeScript where every animation serves a function and every component balances beauty with performance.
							</p>
							<p>
								The backend architecture is lean yet powerful: Node.js and Next.js services with clean APIs, SQLite & Drizzle ORM queries, and secure authentication flows. When working with Web3, I focus on making blockchain interactions feel inevitable rather than intimidating.
							</p>
							<p>
								Lately my work has involved bringing real-time media experiences closer to the blockchain layer. Across the stack, I prioritize solutions that are maintainable first, then magical.
							</p>
						</div>
					</motion.div>
					<motion.button
						onClick={toggleToolbox}
						variants={fadeIn("up", "spring", 0.2, 1)}
						whileTap={{ scale: 0.95 }}
						className="mt-2 px-6 py-3 bg-white/5 border border-white/20 rounded-xl text-white text-sm cursor-pointer hover:bg-white/10 transition-all self-start shadow-md"
					>
						View My Toolbox
					</motion.button>
				</motion.div>
			</div>
		</motion.div>
	);
}
