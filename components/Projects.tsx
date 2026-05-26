"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { TextReveal } from "@/components/ui/text-reveal";
import { PROJECTS, type Project } from "@/lib/data";

function ArrowUpRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M4 14L14 4M14 4H6M14 4V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const FALLBACK_BG: Record<number, string> = {
  0: "linear-gradient(145deg,#0f1923 0%,#1a2d3a 100%)",
  1: "linear-gradient(145deg,#0d1a12 0%,#1a3325 100%)",
  2: "linear-gradient(145deg,#1a0e0a 0%,#2d1f18 100%)",
  3: "linear-gradient(145deg,#120a1e 0%,#261640 100%)",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const demoHref = project.demo ?? null;
  const githubHref = project.github ?? null;
  const primaryHref = demoHref ?? githubHref ?? "#";

  const bg = project.color !== "#1a1a1a" && project.color !== "#1e2027" && project.color !== "#111" && project.color !== "#0d0d0d"
    ? project.color
    : FALLBACK_BG[index % 4];

  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const rawRotate = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const rawScale  = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const rotateX = useSpring(rawRotate,  { stiffness: 60, damping: 20 });
  const scale   = useSpring(rawScale,   { stiffness: 60, damping: 20 });

  return (
    <div ref={cardRef} style={{ perspective: "1000px" }}>
    <motion.div
      className="relative w-full overflow-hidden rounded-3xl"
      style={{ rotateX, scale, opacity: rawOpacity, transformOrigin: "50% 0%" }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Card image / background */}
      <div
        className="relative w-full overflow-hidden"
        style={{ background: bg, aspectRatio: project.width && project.height ? `${project.width} / ${project.height}` : "3 / 4" }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : project.logo ? (
          <Image
            src={project.logo}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-white/[0.04] font-black uppercase select-none"
              style={{
                fontSize: "clamp(5rem, 12vw, 9rem)",
                fontFamily: "var(--font-space-grotesk)",
                letterSpacing: "-0.04em",
              }}
            >
              {project.title.split(" ").map(w => w[0]).join("")}
            </span>
          </div>
        )}
        {/* Bottom gradient for pill legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
      </div>

      {/* Action buttons + name pill — floats over bottom of card */}
      <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-2">
        {/* Icon circles */}
        <div className="flex gap-3">
          {demoHref && (
            <a
              href={demoHref}
              target="_blank"
              rel="noreferrer"
              className="w-20 h-20 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black hover:bg-[#D97D5B] hover:text-white dark:hover:bg-[#D97D5B] dark:hover:text-white hover:scale-95 transition-all duration-200 flex-shrink-0"
              aria-label={`${project.title} live demo`}
            >
              <svg width="28" height="28" viewBox="0 0 18 18" fill="none">
                <path d="M4 14L14 4M14 4H6M14 4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
          {githubHref && (
            <a
              href={githubHref}
              target="_blank"
              rel="noreferrer"
              className="w-20 h-20 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black hover:bg-[#D97D5B] hover:text-white dark:hover:bg-[#D97D5B] dark:hover:text-white hover:scale-95 transition-all duration-200 flex-shrink-0"
              aria-label={`${project.title} GitHub`}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
        </div>

        {/* Name pill */}
        <a
          href={primaryHref}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center bg-black dark:bg-white rounded-full px-8 py-5 hover:scale-[0.98] transition-transform duration-200"
        >
          <span
            className="text-white dark:text-black font-bold leading-none"
            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
          >
            {project.title.toLowerCase()}
          </span>
        </a>
      </div>
    </motion.div>
    </div>
  );
}

export default function Projects() {
  const leftCol = PROJECTS.filter((_, i) => i % 2 === 0);
  const rightCol = PROJECTS.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="projects"
      className="projects-section relative py-28 z-30 overflow-hidden"
    >
      <div className="px-6 sm:px-12 lg:px-20">

        {/* Header */}
        <div className="select-none mb-20">
          <TextReveal
            splitBy="char"
            className="font-bold tracking-tighter leading-none"
            style={{
              fontSize: "clamp(4.5rem, 15vw, 12rem)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            Projects.
          </TextReveal>

          <TextReveal
            className="mt-6"
            style={{
              fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)",
              color: "var(--projects-muted)",
              lineHeight: "1.6",
              fontWeight: 400,
              maxWidth: "42rem",
            }}
          >
            Things I&apos;ve built — AI-powered apps, systems programming, interactive web experiences.
          </TextReveal>
        </div>

        {/* Staggered 2-column grid — full width, generous spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
          {/* Left column */}
          <div className="flex flex-col gap-10">
            {leftCol.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i * 2} />
            ))}
          </div>
          {/* Right column — offset down for stagger effect */}
          <div className="flex flex-col gap-10 sm:mt-40">
            {rightCol.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i * 2 + 1} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
