"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeIn, textVariant } from "@/utils/motion";

export default function HomePage() {
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
          className="text-xl md:text-4xl lg:text-5xl font-bold tracking-wider mb-2"
        >
          <span>I</span>'m a Fullstack/Web3 Developer
        </motion.h1>

        <motion.p
          variants={fadeIn("up", "spring", 0.2, 1)}
          className="text-sm md:text-lg text-gray-200 mb-6"
        >
          Welcome to my creative space
        </motion.p>
      </div>
    </motion.div>
  );
}
