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

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
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

      {/* 3-Column Layout - Slimmer left and right sidebars for maximum main content space */}
      <div className="relative z-20 flex-1 flex flex-row justify-between pl-0 pr-1 sm:pr-2 md:px-4 py-1 sm:py-2 md:py-4 gap-1 sm:gap-2 md:gap-4 overflow-hidden">
        {/* Left Navigation (Slimmer & starts directly from left end of screen) */}
        <nav className="flex items-center z-30 pl-0 pr-0.5 sm:px-1">
          <ul className="flex flex-col h-full justify-around py-1 sm:py-2">
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
                } font-semibold my-0.5 text-[9px] sm:text-[10px] md:text-xs tracking-wider`}
              >
                <Link
                  href={item.path}
                  className="hover:text-[#e85d04] transition-colors py-0.5 px-0.5 block"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Main page content area */}
        <motion.main
          className="flex-1 w-full overflow-y-auto pt-0 pb-2 sm:pb-4 custom-scroll z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
        >
          {children}
        </motion.main>

        {/* Right Sidebar (Slimmer Logo & Socials) */}
        <aside className="flex flex-col justify-between z-30 p-0.5 sm:p-1 md:p-2">
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
