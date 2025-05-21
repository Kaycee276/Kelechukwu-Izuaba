import { motion } from "framer-motion";
import { staggerContainer, fadeIn, textVariant } from "../utils/motion";

const Home = () => {
	return (
		<motion.div
			variants={staggerContainer()}
			initial="hidden"
			animate="show"
			className="h-full flex items-center justify-center"
		>
			<div className="text-center max-w-2xl px-4 lowercase">
				<motion.h1
					variants={textVariant(0.1)}
					className="text-xl md:text-4xl lg:text-5xl font-bold tracking-wider "
				>
					Fullstack/Web3 Developer
				</motion.h1>

				<motion.p
					variants={fadeIn("up", "spring", 0.2, 1)}
					className="text-sm md:text-lg text-gray-200 mb-6"
				>
					Welcome to my creative space
				</motion.p>

				<motion.div variants={fadeIn("up", "spring", 0.4, 1)} className="p-4">
					<p className="text-sm md:text-lg text-black/90 mb-4 tracking-tighter">
						I build beautiful, functional digital experiences with modern web
						technologies and blockchain integration.
					</p>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Home;
