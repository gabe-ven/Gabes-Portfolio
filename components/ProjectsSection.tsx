"use client";

import { useRef } from "react";
import * as Fa from "react-icons/fa";
import projectsData from "@/app/data/projects.json";
import DecryptedText from "./DecryptedText";
import { CometCard } from "@/components/ui/comet-card";
import { ScrollAnimatedCard } from "@/components/ui/container-scroll-animation";

const { projects } = projectsData;

type Project = (typeof projects)[number] & { imageBg?: string };

function ProjectCardActions({ project }: { project: Project }) {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-target cursor-target-tight box-border inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-2 text-[10px] font-semibold tracking-wide text-white transition-colors hover:border-white/45 hover:bg-white/10 sm:h-9 sm:text-[11px]"
      >
        <Fa.FaGithub className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="truncate">GitHub</span>
      </a>
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-target cursor-target-tight box-border inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-white bg-white px-2 text-[10px] font-semibold tracking-wide text-black transition-colors hover:bg-white/90 sm:h-9 sm:text-[11px]"
        >
          <Fa.FaExternalLinkAlt className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">Live Demo</span>
        </a>
      ) : (
        <span className="h-8 sm:h-9" aria-hidden />
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const imageBg = project.imageBg;

  return (
    <CometCard className="h-full w-full" footer={<ProjectCardActions project={project} />}>
      <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-2.5 sm:pb-0">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-black">
          <img
            loading="lazy"
            className={`absolute inset-0 h-full w-full ${
              imageBg ? "object-contain p-2" : "object-cover"
            }`}
            style={{ backgroundColor: imageBg ?? "#000000" }}
            alt={project.title}
            src={project.image}
          />
        </div>

        <div
          className="flex min-h-0 flex-1 flex-col gap-2 pt-2.5 pb-2 text-white"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold leading-tight tracking-tight line-clamp-2 sm:text-[15px]">
              {project.title}
            </h3>
            <span className="shrink-0 pt-0.5 text-[10px] font-medium tabular-nums text-white/35">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="text-[11px] leading-relaxed text-white/55 line-clamp-2 sm:text-xs">
            {project.description}
          </p>

          <div className="flex min-h-0 flex-col gap-1">
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Stack
            </span>
            <div className="flex max-h-11 flex-wrap content-start gap-1 overflow-y-auto overscroll-contain sm:max-h-12 [scrollbar-width:thin]">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-white/15 bg-white/8 px-1.5 py-0.5 text-[9px] leading-tight text-white/75"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CometCard>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="snap-start relative overflow-hidden"
    >

      <div className="relative z-10 flex flex-col items-center px-4 pb-24 pt-14 md:px-8 md:pt-20 md:pb-32">
        <h2
          className="text-4xl md:text-5xl font-semibold tracking-[0.18em] uppercase mb-10 md:mb-14 shrink-0 text-center"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <DecryptedText
            text="PROJECTS"
            animateOn="view"
            sequential={true}
            revealDirection="center"
            speed={80}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            className="text-white/90"
            encryptedClassName="text-white/25"
          />
        </h2>

        <div
          className="grid w-full max-w-6xl auto-rows-fr grid-cols-3 items-stretch gap-4 sm:gap-6 lg:gap-8"
          style={{ perspective: "1200px" }}
        >
          {projects.map((project, index) => (
            <ScrollAnimatedCard key={project.id} delay={(index % 3) * 0.07 + Math.floor(index / 3) * 0.05}>
              <ProjectCard project={project as Project} index={index} />
            </ScrollAnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
