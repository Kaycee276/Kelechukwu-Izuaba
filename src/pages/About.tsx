import { useState } from "react";
import { motion } from "framer-motion";
import Toolbox from "../components/Toolbox";
import { staggerContainer, fadeIn, textVariant } from "../utils/motion";

const About = () => {
	const [isToolboxOpen, setIsToolboxOpen] = useState(false);

	const toggleToolbox = () => setIsToolboxOpen(!isToolboxOpen);

	interface Tools {
		category: string;
		items: string[];
	}

	const tools: Tools[] = [
		{
			category: "Frontend",
			items: ["React", "TypeScript", "Tailwind CSS", "Javascript"],
		},
		{
			category: "Backend",
			items: ["Node.js", "Express", "PostgreSQL"],
		},
		{
			category: "Web3",
			items: ["Solidity", "Ethers.js", "Wallet Integration", "Smart Contracts"],
		},
		{
			category: "Design",
			items: ["UI/UX Principles", "Prototyping", "Micro-interactions"],
		},
	];

	return (
		<motion.div
			variants={staggerContainer()}
			initial="hidden"
			animate="show"
			className="h-full flex items-center justify-center px-4 relative"
		>
			{/* Toolbox Modal */}
			{isToolboxOpen && <Toolbox tools={tools} toggleToolbox={toggleToolbox} />}

			<div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
				{/* Left Column - Image */}
				<motion.div
					variants={fadeIn("right", "spring", 0.2, 1)}
					className="hidden md:block"
				>
					<div className="relative aspect-square w-full overflow-hidden rounded-sm border border-white/20">
						<motion.img
							src="/image-1.jpeg"
							alt="Profile"
							className="w-full h-full object-cover"
							whileHover={{ scale: 1.03 }}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
					</div>
				</motion.div>

				{/* Right Column - Content */}
				<motion.div
					variants={staggerContainer(0.1, 0.2)}
					className="flex flex-col gap-2"
				>
					<motion.div variants={textVariant(0.2)}>
						<h1 className="text-4xl md:text-5xl font-bold text-white">
							About Me
						</h1>
					</motion.div>

					<motion.div
						variants={fadeIn("left", "spring", 0.4, 1)}
						className="space-y-6"
					>
						<p className="text-xs sm:text-sm">
							Im <h1 className="uppercase"> Izuaba Kenneth Kelechukwu</h1>"
							&nbsp; &nbsp; <span>I</span> design interfaces that move with
							purpose - React ecosystems built in TypeScript, where every
							animation serves a function and every component balances beauty
							with performance. <br />
							<br />
							&nbsp; &nbsp; <span>The</span> backend architecture is lean yet
							powerful: Node.js services with clean APIs, optimized queries, and
							secure authentication flows. When working with Web3, I focus on
							making blockchain interactions feel inevitable rather than
							intimidating - wallet connections that flow naturally, transaction
							visualizations that tell stories, and smart contracts that extend
							the UI's logic. Across the stack, I prioritize solutions that are
							maintainable first, then magical.
							<br />
							<br />
							&nbsp; &nbsp; <span>The</span> result is technology that feels
							personal yet professional, whether you're scrolling through a feed
							or signing a blockchain transaction."
						</p>
					</motion.div>
					<motion.button
						onClick={toggleToolbox}
						variants={fadeIn("up", "spring", 0.2, 1)}
						whileTap={{ scale: 0.95 }}
						className="mt-6 px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white text-sm cursor-pointer hover:bg-white/10 transition-colors"
					>
						View My Toolbox
					</motion.button>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default About;
