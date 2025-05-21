import { motion } from "framer-motion";
import { staggerContainer, fadeIn, textVariant } from "../utils/motion";

const projects = [
	{
		title: "Aboki.eth",
		description:
			"Aboki.eth is a decentralized Web3 protocol that allows users to stake digital assets, access fiat loans, and repay to reclaim assets with rewards—without the need for intermediaries.",
		tags: ["React", "JavaScript", "AppKit", "Framer", "Tailwind"],
		link: "https://abokieth.vercel.app",
		repo: "https://github.com/Kaycee276/Aboki",
	},
	{
		title: "Node-Reg-No",
		description:
			"Node-reg-no is a Node.js application that allows users to upload PDF files and extract registration numbers from them.",
		tags: ["Node.js", "Express", "REST", "pdf-parse", "postgresql", "postman"],
		repo: "https://github.com/Kaycee276/Node-reg-no/",
	},
	{
		title: "Sundao",
		description:
			"an opensource dapp to be used to co-ordinate user payment for energy",
		tags: ["React", "Framer", "JavaScript", "Tailwind"],
		link: "https://payer-dapp.vercel.app",
		repo: "https://github.com/IDEA-godwin/payer-dapp",
	},
	{
		title: "Super-Space",
		description:
			"Decentralized App to join audio conversations around Web3 topics with Solana-powered space",
		tags: ["React", "Appkit", "Javascript", "Tailwind"],
		repo: "https://github.com/vancube2/Super-Space/",
	},
];

const Projects = () => {
	return (
		<motion.div
			variants={staggerContainer()}
			initial="hidden"
			animate="show"
			className="h-full overflow-y-auto py-12"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
				{/* Header */}
				<motion.div variants={textVariant(0.2)} className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
						Projects
					</h1>
				</motion.div>
				<motion.p
					variants={fadeIn("up", "spring", 0.4, 1)}
					className="text-sm text-gray-300 max-w-2xl mx-auto text-center"
				>
					Browse through my latest creative works and projects
				</motion.p>

				{/* Projects Grid */}
				<motion.div
					variants={staggerContainer(0.1, 0.2)}
					className="grid grid-cols-1 md:grid-cols-2 gap-8"
				>
					{projects.map((project, index) => (
						<motion.div
							key={project.title}
							variants={fadeIn("up", "spring", index * 0.2, 0.75)}
							// whileHover={{ y: -8 }}
							className="rounded-xl overflow-hidden backdrop-blur-sm transition-all hover:bg-white/5  "
						>
							<div className="p-6">
								<h3 className="uppercase font-semibold text-white mb-2">
									{project.title}
								</h3>
								<p className="text-gray-300 mb-4">{project.description}</p>
								<div className="flex flex-wrap gap-2 mb-6">
									{project.tags.map((tag) => (
										<span key={tag} className="px-3 py-1 text-xs text-black">
											{tag}
										</span>
									))}
								</div>

								{/* buttons */}
								<div className="flex gap-3">
									{project.link && (
										<motion.a
											href={project.link}
											target="_blank"
											rel="noopener noreferrer"
											whileTap={{ scale: 0.95 }}
											className="group inline-flex items-center px-4 py-2 text-sm font-medium transition-all ease-in-out  hover:border-orange-400 text-white hover:text-orange-400 rounded-lg"
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
											className="group inline-flex items-center px-4 py-2 text-sm font-medium transition-all ease-in-out  hover:border-gray-400 text-white hover:text-gray-400 rounded-lg"
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
};

export default Projects;
