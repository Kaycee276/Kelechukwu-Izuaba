"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import Socials from "./Socials";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
	{ path: "/contact", name: "/contact" },
	{ path: "/projects", name: "/projects" },
	{ path: "/about", name: "/about" },
	{ path: "/", name: "/home" },
];

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const pathname = usePathname();

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const isActive = (path: string) => {
		if (path === "/" && pathname === "/") return true;
		if (path !== "/" && pathname?.startsWith(path)) return true;
		return false;
	};

	return (
		<section className="relative h-screen w-full overflow-hidden bg-black text-white">
			{/* Background Image */}
			<img
				src="/image-1.jpeg"
				alt="kaycee background"
				className="absolute top-0 left-0 w-full h-full object-cover object-center grayscale opacity-80"
			/>

			{/* Blurred spotlight overlay */}
			<div
				className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
				style={{
					maskImage: `radial-gradient(circle 90px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`,
					WebkitMaskImage: `radial-gradient(circle 90px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`,
				}}
			>
				<div className="w-full h-full backdrop-blur-md bg-black/75" />
			</div>

			{/* Foreground content with enhanced padding */}
			<div className="relative z-20 h-full flex justify-between p-6 sm:p-8 lg:p-10 gap-6">
				{/* Navigation */}
				<nav className="flex items-center z-30 px-2 sm:px-4">
					<ul className="flex flex-col h-full justify-around py-4">
						{navItems.map((item, index) => (
							<motion.li
								key={item.path}
								initial={{
									opacity: 0,
									y: 20,
									rotate: 300,
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
								className={`${
									isActive(item.path) ? "text-[#e85d04]" : "text-white"
								} font-semibold my-2`}
							>
								<Link href={item.path} className="hover:text-[#e85d04] transition-colors py-2 px-1 block">
									{item.name}
								</Link>
							</motion.li>
						))}
					</ul>
				</nav>

				{/* Main page content area with generous padding */}
				<motion.main
					className="flex-1 overflow-y-auto px-6 py-4 md:px-10 md:py-6 custom-scroll z-20"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { delay: 0.2 } }}
				>
					{children}
				</motion.main>

				{/* Sidebar Logo & Socials */}
				<aside className="flex flex-col justify-between z-30 p-2 sm:p-4">
					<motion.div
						className="self-end"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
					>
						<Logo />
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
					>
						<Socials />
					</motion.div>
				</aside>
			</div>
		</section>
	);
}
