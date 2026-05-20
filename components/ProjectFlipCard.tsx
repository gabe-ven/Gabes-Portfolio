"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Fa from "react-icons/fa";
import { cn } from "@/lib/utils";

export type FlipProject = {
  title: string;
  description: string;
  image: string;
  imageBg?: string;
  tags: string[];
  github: string;
  demo?: string;
};

type ProjectFlipCardProps = {
  project: FlipProject;
  isActive: boolean;
  className?: string;
  onFlipChange?: (flipped: boolean) => void;
};

export default function ProjectFlipCard({
  project,
  isActive,
  className,
  onFlipChange,
}: ProjectFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const imageBg = project.imageBg;

  useEffect(() => {
    if (!isActive) {
      setFlipped(false);
      onFlipChange?.(false);
    }
  }, [isActive, onFlipChange]);

  const toggleFlip = () => {
    if (!isActive) return;
    const next = !flipped;
    setFlipped(next);
    onFlipChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <div
      role="button"
      tabIndex={isActive ? 0 : -1}
      onClick={toggleFlip}
      onKeyDown={handleKeyDown}
      aria-pressed={flipped}
      aria-label={
        flipped
          ? `Show preview for ${project.title}`
          : `Flip ${project.title} for details`
      }
      className={cn(
        "group relative h-full w-full cursor-pointer text-left [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1F2F] rounded-[1%]",
        !isActive && "pointer-events-none",
        className,
      )}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-[1%] bg-[#1D1F2F] [backface-visibility:hidden]"
          style={{ transform: "translateZ(1px)" }}
        >
          <img
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-500",
              imageBg ? "object-contain p-4" : "object-cover",
              isActive ? "opacity-100" : "opacity-50",
            )}
            style={{ backgroundColor: imageBg ?? "#1D1F2F" }}
            alt={project.title}
            src={project.image}
            loading="eager"
            decoding="sync"
          />
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-6 pb-6 pt-20 transition-opacity duration-500",
              isActive ? "opacity-100" : "opacity-0",
            )}
          >
            <h2
              className="text-xl font-semibold text-white md:text-2xl lg:text-3xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {project.title}
            </h2>
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-[1%] bg-[#1F2121] p-5 [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <h2 className="mb-3 text-lg font-bold leading-tight text-white md:text-xl">
            {project.title}
          </h2>

          <p className="mb-4 flex-1 overflow-y-auto text-sm leading-relaxed text-white/65 [scrollbar-width:thin]">
            {project.description}
          </p>

          <div className="mb-4 shrink-0">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Tools used
            </span>
            <div className="flex max-h-24 flex-wrap gap-1.5 overflow-y-auto [scrollbar-width:thin]">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-white/15 bg-white/8 px-2 py-0.5 text-[10px] text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="grid shrink-0 grid-cols-2 gap-2"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-2 text-[11px] font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/10"
            >
              <Fa.FaGithub className="h-3.5 w-3.5 shrink-0" aria-hidden />
              GitHub
            </a>
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white bg-white px-2 text-[11px] font-semibold text-black transition-colors hover:bg-white/90"
              >
                <Fa.FaExternalLinkAlt className="h-3 w-3 shrink-0" aria-hidden />
                Live Demo
              </a>
            ) : (
              <span className="h-9" aria-hidden />
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
