"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Highlighter } from "@/components/ui/highlighter";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="overflow-hidden relative min-h-[60vh] flex items-center justify-center"
      style={{ background: "var(--color-surface)", transition: "background 0.3s ease" }}
      suppressHydrationWarning
    >
      <div
        ref={containerRef}
        className="px-6 sm:px-10 lg:px-16 py-24 max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center justify-center space-y-10"
      >
        {/* Massive H2 narrative statement */}
        <motion.h2
          className="font-bold leading-[1.12] max-w-3xl tracking-tighter"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", color: "var(--color-text)" }}
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          I build <span style={{ color: "#D97D5B" }}>clean, fast</span> software.
        </motion.h2>

        {/* Supporting paragraph with Magic UI sketchy highlights */}
        <motion.p
          className="text-lg sm:text-xl leading-relaxed font-normal max-w-3xl"
          style={{ color: "var(--color-text-muted)" }}
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          I&apos;m a{" "}
          <Highlighter action="highlight" color="#87CEFA50" delay={0}>
            Computer Science
          </Highlighter>{" "}
          student at{" "}
          <Highlighter action="bracket" color="#D97D5B" strokeWidth={2} padding={4} delay={160}>
            UC Davis
          </Highlighter>{" "}
          focusing on{" "}
          <Highlighter action="underline" color="#D97D5B" strokeWidth={2} delay={320}>
            frontend
          </Highlighter>{" "}
          and full-stack development. Lately, I&apos;ve been building{" "}
          <Highlighter action="highlight" color="#87CEFA50" delay={480}>
            web apps
          </Highlighter>{" "}
          and integrating{" "}
          <Highlighter action="highlight" color="#87CEFA50" delay={640}>
            AI tools
          </Highlighter>{" "}
          like{" "}
          <Highlighter action="highlight" color="#87CEFA50" delay={800}>
            RAG chatbots
          </Highlighter>
          . When I&apos;m away from my keyboard, I&apos;m usually working out,{" "}
          <Highlighter action="circle" color="#D97D5B" strokeWidth={2} padding={4} delay={960}>
            watching anime
          </Highlighter>
          , or taking photos with my{" "}
          <Highlighter action="underline" color="#D97D5B" strokeWidth={2} delay={1120}>
            Fujifilm X-T30 III
          </Highlighter>
          .
        </motion.p>
      </div>
    </section>
  );
}
