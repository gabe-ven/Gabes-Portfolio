"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useSectionBackgroundFade } from "@/hooks/useSectionBackgroundFade";
import * as Fa from "react-icons/fa";
import SectionTransitionOverlays from "./SectionTransitionOverlays";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { opacity: bgOpacity } = useSectionBackgroundFade(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="overflow-hidden relative flex flex-col justify-center px-6"
      style={{ height: "100svh" }}
    >
      <SectionTransitionOverlays
        sectionRef={sectionRef}
        fromSection="projects"
        section="contact"
        showTop
        showBottom={false}
      />

      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: bgOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute left-0 right-0"
          style={{
            top: "50%",
            height: 1,
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 65%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        <motion.p
          className="font-mono text-[0.58rem] tracking-[0.35em] uppercase text-white/30 mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get in touch
        </motion.p>

        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          You know how to find me
        </motion.h2>

        <motion.a
          href="mailto:gabrielvenezia6@gmail.com"
          className="cursor-target text-2xl md:text-3xl font-bold inline-block text-[#1d4ed8] transition-colors duration-50"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{
            scale: 1.03,
            color: "#3b82f6",
            textShadow: "0 0 20px rgba(59,130,246,0.4)",
            transition: { duration: 0.05, ease: "linear" },
          }}
        >
          gabrielvenezia6@gmail.com
        </motion.a>

        {/* Footer content */}
        <motion.div
          className="mt-20 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="https://github.com/gabe-ven"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 transition-all duration-75"
            whileHover={{
              borderColor: "rgba(59,130,246,0.8)",
              backgroundColor: "rgba(59,130,246,0.1)",
              scale: 1.1,
              transition: { duration: 0.05 },
            }}
          >
            <Fa.FaGithub className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/gabriel-venezia/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 transition-all duration-75"
            whileHover={{
              borderColor: "rgba(59,130,246,0.8)",
              backgroundColor: "rgba(59,130,246,0.1)",
              scale: 1.1,
              transition: { duration: 0.05 },
            }}
          >
            <Fa.FaLinkedin className="w-5 h-5" />
          </motion.a>
        </motion.div>

        <motion.p
          className="mt-6 font-mono text-[0.52rem] tracking-widest uppercase text-white/15"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Gabriel Venezia · {new Date().getFullYear()}
        </motion.p>
      </div>
    </section>
  );
}
