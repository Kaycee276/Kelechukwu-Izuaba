"use client";

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

export default function ProjectsClient({ projects }: { projects: ProjectItem[] }) {
	return (
		<motion.div
			variants={staggerContainer()}
			initial="hidden"
			animate="show"
			className="h-full overflow-y-auto py-12 custom-scroll"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
				{/* Header */}
				<header className="sticky top-0 z-50 backdrop-blur-sm flex flex-col gap-6 items-center">
					<motion.div
						variants={textVariant(0.2)}
						className="text-center mb-8"
					>
						<h1 className="text-4xl md:text-5xl capitalize font-bold text-white mb-4">
							Projects
						</h1>
					</motion.div>
					<motion.p
						variants={fadeIn("up", "spring", 0.4, 1)}
						className="text-sm text-gray-300 max-w-2xl mx-auto text-center"
					>
						Browse through my latest creative works and projects (powered by SQLite)
					</motion.p>
				</header>

				{/* Projects Grid */}
				<motion.div
					variants={staggerContainer(0.1, 0.2)}
					className="grid grid-cols-1 md:grid-cols-2 gap-8"
				>
					{projects.map((project, index) => (
						<motion.div
							key={project.id || project.title}
							variants={fadeIn("up", "spring", index * 0.1, 0.75)}
							className="rounded-xl overflow-hidden backdrop-blur-md bg-black/40 border border-white/10 transition-all hover:bg-white/5 hover:border-orange-500/50"
						>
							<div className="p-6">
								<h3 className="uppercase font-semibold text-[#e85d04] text-xl mb-2">
									{project.title}
								</h3>
								<p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
								<div className="flex flex-wrap gap-2 mb-6">
									{project.tags.map((tag) => (
										<span key={tag} className="px-2.5 py-1 text-xs bg-white/10 text-orange-300 rounded border border-white/10">
											{tag}
										</span>
									))}
								</div>

								{/* Buttons */}
								<div className="flex gap-3">
									{project.link && (
										<motion.a
											href={project.link}
											target="_blank"
											rel="noopener noreferrer"
											whileTap={{ scale: 0.95 }}
											className="group inline-flex items-center px-4 py-2 text-sm font-medium transition-all ease-in-out border border-white/20 hover:border-orange-500 text-white hover:text-orange-400 rounded-lg bg-black/30"
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
											className="group inline-flex items-center px-4 py-2 text-sm font-medium transition-all ease-in-out border border-white/20 hover:border-gray-400 text-white hover:text-gray-300 rounded-lg bg-black/30"
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
