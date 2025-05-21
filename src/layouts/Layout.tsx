import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import Socials from "../components/Socials";
import { Link, useLocation } from "react-router-dom";

const navItems = [
	{ path: "/contact", name: "/contact" },
	{ path: "/projects", name: "/projects" },
	{ path: "/about", name: "/about" },
	{ path: "/", name: "/home" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const location = useLocation();

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const isActive = (path: string) => location.pathname === path;

	return (
		<section className="relative h-screen w-full overflow-hidden">
			<img
				src="/image-1.jpeg"
				alt="kaycee"
				loading="lazy"
				className="absolute top-0 left-0 w-full h-full object-cover object-center grayscale-100"
			/>

			{/* Blurred spotlight overlay - behind */}
			<div
				className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none backdrop-blur-sm"
				style={{
					maskImage: `radial-gradient(circle 70px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`,
					WebkitMaskImage: `radial-gradient(circle 70px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`,
				}}
			>
				<div className="w-full h-full backdrop-blur-sm bg-black/50" />
			</div>

			{/* Foreground content */}
			<div className="relative z-20 h-full flex justify-between p-4">
				<nav className="flex items-center">
					<ul className="flex flex-col h-full justify-around">
						{navItems.map((item, index) => (
							<motion.li
								key={item.path}
								initial={{
									opacity: 0,
									y: 20,
									rotate: 300, // Start slightly more rotated
								}}
								animate={{
									opacity: 1,
									y: 0,
									rotate: 270,
									transition: {
										delay: index * 0.1,
										type: "spring",
										stiffness: 100,
										damping: 10,
									},
								}}
							>
								<Link
									to={item.path}
									className={`whitespace-nowrap block ${
										isActive(item.path) ? "text-[#e85d04]" : "text-white"
									}`}
								>
									{item.name}
								</Link>
							</motion.li>
						))}
					</ul>
				</nav>

				<motion.main
					className="flex-1 overflow-y-auto px-4 custom-scroll"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { delay: 0.4 } }}
				>
					{children}
				</motion.main>

				<aside className="flex flex-col justify-between">
					<motion.div
						className="self-end"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
					>
						<Logo />
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
					>
						<Socials />
					</motion.div>
				</aside>
			</div>
		</section>
	);
};

export default Layout;
