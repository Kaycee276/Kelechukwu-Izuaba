"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import Socials from "./Socials";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
	{ path: "/contact", name: "/contact" },
	{ path: "/projects", name: "/projects" },
	{ path: "/about", name: "/about" },
	{ path: "/", name: "/home" },
];

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	// Close mobile menu automatically on route change
	useEffect(() => {
		setMobileMenuOpen(false);
	}, [pathname]);

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

			{/* Mobile Top Navigation Bar (Visible on mobile/tablet < md) */}
			<div className="relative z-40 md:hidden flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md">
				<div className="scale-75 origin-left">
					<Logo />
				</div>
				<button
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label="Toggle mobile menu"
					className="p-2 text-white hover:text-[#e85d04] bg-white/5 border border-white/15 rounded-sm transition-colors cursor-pointer"
				>
					{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</div>

			{/* Mobile Slide-over Drawer */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="fixed inset-0 z-30 pt-20 px-6 pb-8 bg-black/95 backdrop-blur-xl flex flex-col justify-between md:hidden"
					>
						<nav className="flex flex-col gap-6 py-6">
							{navItems.map((item) => (
								<Link
									key={item.path}
									href={item.path}
									className={`text-2xl font-bold transition-colors ${
										isActive(item.path) ? "text-[#e85d04]" : "text-white hover:text-[#e85d04]"
									}`}
								>
									{item.name}
								</Link>
							))}
						</nav>

						<div className="pt-6 border-t border-white/10 flex justify-around items-center">
							<Socials />
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main Layout Container */}
			<div className="relative z-20 flex-1 flex flex-col md:flex-row justify-between p-3 sm:p-6 lg:p-8 gap-4 lg:gap-6 overflow-hidden">
				{/* Desktop Navigation (Left Sidebar) */}
				<nav className="hidden md:flex items-center z-30 px-2 sm:px-4">
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

				{/* Main page content area (Full width on mobile, flexible on desktop) */}
				<motion.main
					className="flex-1 w-full overflow-y-auto px-2 sm:px-4 md:px-6 lg:px-8 pt-0 pb-6 custom-scroll z-20"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { delay: 0.2 } }}
				>
					{children}
				</motion.main>

				{/* Desktop Sidebar (Right Logo & Socials) */}
				<aside className="hidden md:flex flex-col justify-between z-30 p-2 sm:p-4">
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
