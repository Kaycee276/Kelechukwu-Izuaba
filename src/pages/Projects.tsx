import { motion } from "framer-motion";
import { staggerContainer, fadeIn, textVariant } from "../utils/motion";

const projects = [
	{
		title: "Rhitta",
		description:
			"Rhitta is a next-generation decentralized music streaming platform that leverages Somnia Data Streams (SDS) to deliver real-time, reactive music experiences on the blockchain.",
		tags: [
			"React",
			"TypeScript",
			"Tailwind",
			"zustand",
			"Buffer",
			"NodeJS",
			"Express",
			"multer",
			"music-metadata",
			"Supabase",
			"WebAudioPlayer",
			'Rainbow-kit"',
			"Somnia Data Streams",
		],
		link: "https://rhitta.vercel.app",
		repo: "https://github.com/Kaycee276/Rhitta",
	},

	{
		title: "Escaza",
		description:
			"Escaza is a web-based application built to digitize the logbook experience for IT (Industrial Training) students. It helps students avoid errors while filling their physical logbooks and provides smart features like grammar checking, reminders, and even AI-generated entries based on existing writing.",
		tags: [
			"React",
			"JavaScript",
			"TypeScript",
			"Framer",
			"Tailwind",
			"NodeJS",
			"Express",
			"Supabase",
			"Google Auth",
			"Chart.js",
		],
		link: "https://escaza.vercel.app",
		repo: "https://github.com/Kaycee276/Escaza",
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
		title: "Mini Geo Guesser",
		description:
			"Test Your Geography Knowledge, Challenge yourself to identify locations around the world. Make your guess, answer questions, and see how well you know our planet!",
		tags: ["Solidity", "foundry", "ethers.js"],
		// link: "https://",
		repo: "https://github.com/solomonadzape95/mini-geo-guesser",
	},
	{
		title: "Aboki.eth",
		description:
			"Aboki.eth is a decentralized Web3 protocol that allows users to stake digital assets, access fiat loans, and repay to reclaim assets with rewards—without the need for intermediaries.",
		tags: ["React", "JavaScript", "AppKit", "Framer", "Tailwind"],
		link: "https://abokieth.vercel.app",
		repo: "https://github.com/Kaycee276/Aboki",
	},
	{
		title: "Switch Dashboard",
		description:
			"The official explorer for the m3tering protocol, providing real-time insights into energy consumption and device performance.",
		tags: ["React", "Typescript", "Tailwind", "chart.js", "Next.js"],
		link: "https://m3terscan-monorepo.vercel.app/",
		repo: "https://github.com/Kaycee276/m3terscan-monorepo",
	},
	{
		title: "Twitpay",
		description:
			" Twitpay is a decentralized social payment platform that enables users to create and claim cryptocurrency giveaways through Twitter integration and blockchain technology.",
		tags: [
			"React",
			"JavaScript",
			"TypeScript",
			"Framer",
			"Tailwind",
			"NodeJS",
			"Express",
			"Supabase",
			"social auth",
			"Appkit",
			"Foundry",
		],
		link: "https://twitpay.vercel.app",
		repo: "https://github.com/Kaycee276/Twitpay",
	},
	{
		title: "Node-Reg-No",
		description:
			"Node-reg-no is a Node.js application that allows users to upload PDF files and extract registration numbers from them.",
		tags: ["Node.js", "Express", "REST", "pdf-parse", "postgresql", "postman"],
		repo: "https://github.com/Kaycee276/Node-reg-no/",
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
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8  ">
				{/* Header */}
				<header className="sticky top-0 z-50 backdrop-blur-sm flex flex-col gap-6 items-center ">
					<motion.div
						variants={textVariant(0.2)}
						className="text-center mb-16 "
					>
						<h1 className="text-4xl md:text-5xl capitalize font-bold text-white mb-4">
							Projects
						</h1>
					</motion.div>
					<motion.p
						variants={fadeIn("up", "spring", 0.4, 1)}
						className="text-sm text-gray-300 max-w-2xl mx-auto text-center "
					>
						Browse through my latest creative works and projects
					</motion.p>
				</header>

				{/* Projects Grid */}
				<motion.div
					variants={staggerContainer(0.1, 0.2)}
					className="grid grid-cols-1 md:grid-cols-2 gap-8 "
				>
					{projects.map((project, index) => (
						<motion.div
							key={project.title}
							variants={fadeIn("up", "spring", index * 0.2, 0.75)}
							// whileHover={{ y: -8 }}
							className="rounded-xl overflow-hidden backdrop-blur-sm transition-all hover:bg-white/5 "
						>
							<div className="p-6">
								<h3 className="uppercase font-semibold text-white mb-2">
									{project.title}
								</h3>
								<p className="text-gray-300 mb-4">{project.description}</p>
								<div className="flex flex-wrap gap-2 mb-6">
									{project.tags.map((tag) => (
										<h5 key={tag} className="px-3 py-1 text-xs text-black">
											{tag}
										</h5>
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
