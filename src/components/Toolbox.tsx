import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "../utils/motion";

interface Tool {
	category: string;
	items: string[];
}

interface ToolboxProps {
	tools: Tool[];
	toggleToolbox: () => void;
}

const Toolbox = ({ tools, toggleToolbox }: ToolboxProps) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
			onClick={toggleToolbox}
		>
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 20, opacity: 0 }}
				className="rounded-lg p-6 max-w-lg w-full mx-4"
				onClick={(e) => e.stopPropagation()}
			>
				<motion.div
					variants={staggerContainer(0.1, 0.1)}
					initial="hidden"
					animate="show"
					className="grid grid-cols-3 gap-8 "
				>
					{tools.map((tool, categoryIndex) => (
						<motion.div
							key={tool.category}
							variants={fadeIn("right", "", categoryIndex * 0.1, 0.5)}
							className="space-y-2"
						>
							<h4 className="text-gray-400 text-xs uppercase tracking-wider">
								{tool.category}
							</h4>
							<ul className="space-y-1.5 list-disc">
								{tool.items.map((item, itemIndex) => (
									<motion.li
										key={item}
										variants={fadeIn(
											"right",
											"",
											(categoryIndex + itemIndex) * 0.1 + 0.2,
											0.5
										)}
										whileHover={{ x: 4 }}
										className="text-white text-sm font-light transition-all "
									>
										{item}
									</motion.li>
								))}
							</ul>
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default Toolbox;
