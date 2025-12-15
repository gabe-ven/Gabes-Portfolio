"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <motion.div className="max-w-6xl w-full" style={{ y, opacity }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.h1
            className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8"
            initial={{ opacity: 0, y: 100, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <span style={{ color: "#E63946" }}>SOFTWARE</span>
            <br />
            DEVELOPER
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Hi! I&apos;m Gabriel. I&apos;m a{" "}
            <span style={{ color: "#E63946" }} className="font-semibold">
              passionate Computer Science student at UC Davis
            </span>
            , minoring in Technology Management, with{" "}
            <span style={{ color: "#E63946" }} className="font-semibold">
              hands-on experience
            </span>{" "}
            building thoughtful,{" "}
            <span style={{ color: "#E63946" }} className="font-semibold">
              responsive software
            </span>
            .
          </motion.p>

          <motion.a
            href="https://drive.google.com/file/d/1M2f4Jtjt3ClnlvAFg-0S6XKrEl72Tk_H/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 text-white font-semibold rounded-lg relative overflow-hidden group hover:scale-105 active:scale-98 transition-all duration-100 shadow-none hover:shadow-[0_0_30px_rgba(230,57,70,0.7)]"
            style={{ backgroundColor: "#E63946" }}
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.7,
              type: "spring",
              stiffness: 100,
            }}
          >
            {/* Animated shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

            {/* Button text */}
            <span className="relative z-10">RESUME</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
