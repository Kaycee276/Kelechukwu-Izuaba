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
		<section className="relative h-screen w-full overflow-hidden bg-black text-white flex flex-col">
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

			{/* 3-Column Layout Preserved across ALL screens */}
			<div className="relative z-20 flex-1 flex flex-row justify-between p-2 sm:p-4 md:p-6 lg:p-8 gap-1 sm:gap-3 md:gap-6 overflow-hidden">
				{/* Left Navigation (Scaled on small screens) */}
				<nav className="flex items-center z-30 px-1 sm:px-2 md:px-4">
					<ul className="flex flex-col h-full justify-around py-2 sm:py-4">
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
								} font-semibold my-1 text-[10px] sm:text-xs md:text-sm tracking-wide`}
							>
								<Link href={item.path} className="hover:text-[#e85d04] transition-colors py-1 px-0.5 sm:py-2 sm:px-1 block">
									{item.name}
								</Link>
							</motion.li>
						))}
					</ul>
				</nav>

				{/* Main page content area */}
				<motion.main
					className="flex-1 w-full overflow-y-auto px-2 sm:px-4 md:px-6 pt-0 pb-4 sm:pb-6 custom-scroll z-20"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { delay: 0.2 } }}
				>
					{children}
				</motion.main>

				{/* Right Sidebar (Logo & Socials scaled on small screens) */}
				<aside className="flex flex-col justify-between z-30 p-1 sm:p-2 md:p-4">
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
