import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const messages = [
	"Get in touch for collaborations and inquiries.",
	"Let's build something amazing together ",
	"Open for freelance projects and partnerships ",
	"Always happy to talk about web3, design, or React ",
	"Drop a hi 👋 — I reply fast!",
];

const socials = [
	{
		name: "Whatsapp",
		url: "https://wa.me/2349127178874",
		icon: <FaWhatsapp className="text-lg sm:text-xl md:text-2xl" />,
	},
	{
		name: "Email",
		url: "mailto:kizuaba@gmail.com",
		icon: <MdEmail className="text-lg sm:text-xl md:text-2xl" />,
	},
];

const StackedMessages = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % messages.length);
		}, 3500);

		return () => clearInterval(interval);
	}, []);

	// Get the stack of 3 visible cards
	const getVisibleCards = () => {
		const cards = [];
		for (let i = 0; i < 3; i++) {
			const index = (currentIndex + i) % messages.length;
			cards.push({
				id: index,
				message: messages[index],
				position: i,
			});
		}
		return cards;
	};

	const visibleCards = getVisibleCards();

	return (
		<div className="relative h-64 w-full max-w-md mx-auto mb-8 flex items-center justify-center">
			<AnimatePresence initial={false} mode="popLayout">
				{visibleCards.map(({ id, message, position }) => (
					<motion.div
						key={id}
						initial={{
							scale: 0.85 - position * 0.05,
							opacity: 0,
							y: 50 + position * 15,
							rotateX: 5,
						}}
						animate={{
							scale: 1 - position * 0.08,
							opacity: 1 - position * 0.25,
							y: position * 12,
							rotateX: 0,
							zIndex: 10 - position,
							transition: {
								duration: 0.5,
								ease: [0.25, 0.46, 0.45, 0.94],
							},
						}}
						exit={{
							scale: 1.05,
							opacity: 0,
							y: -100,
							rotateX: -10,
							transition: {
								duration: 0.4,
								ease: [0.55, 0.085, 0.68, 0.53],
							},
						}}
						className={`absolute w-full p-6 rounded backdrop-blur-sm shadow-2xl ${
							position === 0
								? "bg-primary/10 border-primary/30"
								: "bg-muted/5 border-border/10"
						}`}
						style={{
							transformPerspective: 1000,
						}}
					>
						<p
							className={`text-lg font-medium leading-relaxed transition-all duration-500 ${
								position === 0 ? "text-foreground" : "text-muted-foreground"
							}`}
							style={{
								filter: position > 0 ? `blur(${position * 2}px)` : "blur(0px)",
							}}
						>
							{message}
						</p>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
};

const Contact = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background px-4">
			<div className="text-center max-w-2xl w-full flex flex-col gap-8">
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-4xl md:text-5xl font-bold mb-6"
				>
					Let's Connect
				</motion.h1>

				{/* Stacked Messages Animation */}
				<div className="flex justify-center">
					<StackedMessages />
				</div>

				{/* Social Icons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="flex justify-center gap-8"
				>
					{socials.map((social) => (
						<motion.a
							href={social.url}
							key={social.name}
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground hover:text-primary transition-colors duration-300 transform hover:scale-110 animate-bounce"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							{social.icon}
						</motion.a>
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default Contact;
