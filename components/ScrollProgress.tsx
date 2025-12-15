"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
      style={{
        scaleX: scrollYProgress,
        backgroundColor: "#E63946",
        boxShadow: "0 0 10px rgba(230, 57, 70, 0.6)",
      }}
    />
  );
}





