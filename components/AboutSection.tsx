"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <h3 className="text-orange-500 font-semibold mb-4 text-sm uppercase tracking-wider">
              This is me.
            </h3>
            <h4 className="text-3xl font-bold mb-6">Hi, I&apos;m Gabriel.</h4>
            <p className="text-gray-400 leading-relaxed mb-6">
              I enjoy turning ideas into well-crafted software through hands-on
              projects. I focus on creating clean, intuitive user experiences
              that feel simple and intentional.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My approach emphasizes thoughtful design, performance awareness,
              accessibility, and responsiveness. I care about building software
              that works well across devices and feels reliable to use.
            </p>
          </motion.div>
          <motion.div
            className="relative aspect-square overflow-hidden"
            style={{
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Animated gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-orange-500/40 via-red-500/30 to-purple-600/40 z-10 mix-blend-hard-light animate-pulse"
              style={{ animationDuration: "3s" }}
            />

            {/* Additional gradient layer */}
            <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/20 via-transparent to-yellow-500/20 z-10 mix-blend-overlay" />

            <Image
              src="/headshot.JPG"
              alt="Gabriel Venezia"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


