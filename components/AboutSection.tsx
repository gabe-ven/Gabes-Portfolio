"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax effect - moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.5, 1, 1, 0.5]
  );

  return (
    <section ref={ref} id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: false,
              amount: 0.2,
              margin: "0px 0px -100px 0px",
            }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <h3
              style={{ color: "#22c55e" }}
              className="font-semibold mb-4 text-6xl uppercase tracking-wider"
            >
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
            style={{
              y,
              opacity,
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            }}
            className="relative overflow-visible"
            initial={{ opacity: 0, scale: 0.94, rotateZ: -1.5 }}
            whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
            viewport={{
              once: false,
              amount: 0.2,
              margin: "0px 0px -100px 0px",
            }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Outer liquid ring hugging the blob shape */}
            <div
              className="liquid-outline pointer-events-none"
              style={{
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              }}
            />

            <motion.div
              className="relative aspect-square overflow-hidden select-none isolate"
              style={{
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                outline: "none",
                border: "none",
                boxShadow: "none",
                backgroundColor: "#000",
                transform: "translate3d(0, 0, 0)",
                WebkitTransform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src="/headshot.JPG"
                alt="Gabriel Venezia"
                fill
                className="object-cover select-none z-0"
                draggable={false}
                style={{
                  transform: "translate3d(0, 0, 0) scale(1.05)",
                  WebkitTransform: "translate3d(0, 0, 0) scale(1.05)",
                  borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  objectPosition: "50% 50%",
                  maskImage: "none",
                  WebkitMaskImage: "none",
                }}
              />

              {/* Edge vignette to hide source outline */}
              <div className="headshot-vignette" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
