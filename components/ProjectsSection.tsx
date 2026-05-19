"use client";

import React from "react";
import { motion } from "framer-motion";
import projectsData from "@/app/data/projects.json";

const { projects } = projectsData;

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo?: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className="shrink-0 rounded-xl overflow-hidden border border-white/[0.08] flex flex-col"
      style={{ width: 300, background: "rgba(12,8,2,0.9)", backdropFilter: "blur(16px)" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ borderColor: "rgba(251,146,60,0.35)", transition: { duration: 0.15 } }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 160 }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.85)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(12,8,2,0.9) 100%)" }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="text-base font-bold text-white tracking-tight">{project.title}</h3>
        <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-auto">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[0.5rem] tracking-wider uppercase px-1.5 py-0.5 rounded-full"
              style={{
                background: "rgba(251,146,60,0.08)",
                border: "1px solid rgba(251,146,60,0.18)",
                color: "rgba(251,146,60,0.6)",
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[0.5rem] text-white/20 px-1">+{project.tags.length - 3}</span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 pt-1">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target text-[0.65rem] text-amber-400/70 hover:text-amber-400 transition-colors"
            >
              Live demo →
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target ml-auto flex items-center gap-1 text-[0.65rem] font-semibold text-white/60 hover:text-white transition-colors"
            >
              <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="snap-start overflow-hidden relative flex flex-col justify-center py-16 px-6"
      style={{ height: "100vh", scrollSnapStop: "always", background: "#080400" }}
    >
      {/* Warm amber blobs */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 72% 50%, rgba(251,146,60,0.13) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 18% 75%, rgba(245,158,11,0.07) 0%, transparent 48%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-[0.58rem] tracking-[0.32em] uppercase text-white/30 mb-2">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90">
            Projects
          </h2>
        </div>

        {/* Horizontal scroll row */}
        <div
          className="flex gap-4 overflow-x-auto pb-4"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Scroll hint */}
        <p className="font-mono text-[0.52rem] tracking-widest uppercase text-white/20 mt-3">
          scroll to explore →
        </p>
      </div>
    </section>
  );
}
