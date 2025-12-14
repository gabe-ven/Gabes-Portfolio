"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.h1
            className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="text-orange-500">SOFTWARE</span>
            <br />
            DEVELOPER
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Hi! I'm Gabriel. I'm a{" "}
            <span className="text-orange-500 font-semibold">
              passionate Computer Science student at UC Davis
            </span>
            , minoring in Technology Management, with{" "}
            <span className="text-orange-500 font-semibold">
              hands-on experience
            </span>{" "}
            building thoughtful,{" "}
            <span className="text-orange-500 font-semibold">
              responsive software
            </span>
            .
          </motion.p>

          <motion.a
            href="https://drive.google.com/file/d/1M2f4Jtjt3ClnlvAFg-0S6XKrEl72Tk_H/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-orange-500 text-white font-semibold rounded-lg relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            {/* Button text */}
            <span className="relative z-10">RESUME</span>

            {/* Animated glow */}
            <span
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: "0 0 30px rgba(249, 115, 22, 0.6)" }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

