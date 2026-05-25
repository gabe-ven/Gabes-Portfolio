"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useSpring } from "motion/react";
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
  flipped: boolean;
  onFlip?: () => void;
  className?: string;
};

export default function ProjectFlipCard({
  project,
  isActive,
  flipped,
  onFlip,
  className,
}: ProjectFlipCardProps) {
  const imageBg = project.imageBg;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const tiltX = useSpring(0, { stiffness: 180, damping: 28 });
  const tiltY = useSpring(0, { stiffness: 180, damping: 28 });

  useEffect(() => {
    if (flipped) {
      tiltX.set(0);
      tiltY.set(0);
      setIsHovered(false);
    }
  }, [flipped, tiltX, tiltY]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped || !isActive) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    tiltX.set((0.5 - y) * 12);
    tiltY.set((x - 0.5) * 12);
    setMousePos({ x, y });
  }, [flipped, isActive, tiltX, tiltY]);

  const handleMouseEnter = useCallback(() => {
    if (!flipped && isActive) setIsHovered(true);
  }, [flipped, isActive]);

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
    setIsHovered(false);
  }, [tiltX, tiltY]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      onFlip?.();
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={isActive ? 0 : -1}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-pressed={flipped}
      aria-label={
        flipped
          ? `Show preview for ${project.title}`
          : `Flip ${project.title} for details`
      }
      className={cn(
        "group relative h-full w-full cursor-pointer text-left [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1F2F] rounded-[1%] bg-[#09090f]",
        !isActive && "pointer-events-none",
        className,
      )}
      onClick={(e) => {
        if (isActive) {
          e.stopPropagation();
          onFlip?.();
        }
      }}
    >
      {/* Tilt layer — driven by mouse position springs */}
      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        {/* Flip layer */}
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 overflow-hidden rounded-[1%] bg-[#1D1F2F] [backface-visibility:hidden]"
            style={{ transform: "translateZ(1px)" }}
          >
            <Image
              width={832}
              height={576}
              className={cn(
                "absolute inset-0 h-full w-full transition-all duration-500",
                imageBg ? "object-contain p-4" : "object-cover",
                isActive ? "opacity-100" : "opacity-50",
                isHovered && !imageBg ? "scale-105" : "scale-100",
              )}
              style={{ backgroundColor: imageBg ?? "#1D1F2F" }}
              alt={project.title}
              src={project.image}
              sizes="26rem"
              priority={false}
            />

            {/* Specular highlight that follows cursor */}
            <div
              className="pointer-events-none absolute inset-0 z-10 rounded-[1%] transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.10) 0%, transparent 55%)`,
                opacity: isHovered ? 1 : 0,
              }}
            />

            {/* Title overlay */}
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

            {/* Border glow on hover */}
            <div
              className="pointer-events-none absolute inset-0 z-20 rounded-[1%] transition-opacity duration-300"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
                opacity: isHovered ? 1 : 0,
              }}
            />
          </div>

          {/* Back face */}
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
      </motion.div>
    </div>
  );
}
