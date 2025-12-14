"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scrollHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2">
      <div className="relative w-1 h-40 bg-white/20 rounded-full">
        <motion.div
          className="absolute top-0 left-0 w-full bg-orange-500 rounded-full"
          style={{
            height: scrollHeight,
          }}
        />
      </div>
    </div>
  );
}
