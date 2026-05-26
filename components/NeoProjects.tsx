"use client";

import { motion } from "motion/react";
import projectsData from "@/app/data/projects.json";

const SPRING = { type: "spring" as const, stiffness: 360, damping: 28 };

// Featured order: twiice(9), LabLink(0), Vymix(1), Yesterday Vintage(10), GraphCalc(2), AniLog(4)
const FEATURED = [9, 0, 1, 10, 2, 4];

// twiice and Yesterday Vintage span 2 columns
const WIDE_IDS = new Set([9, 10]);

function RegMarks() {
  return (
    <>
      {(["top-1.5 left-1.5","top-1.5 right-1.5","bottom-1.5 left-1.5","bottom-1.5 right-1.5"] as const).map((c) => (
        <span
          key={c}
          className={`absolute ${c} font-mono text-[0.38rem] text-black/13 leading-none pointer-events-none`}
        >
          ×
        </span>
      ))}
    </>
  );
}

function CardInner({ project, index }: { project: (typeof projectsData.projects)[number]; index: number }) {
  const isYellow = index % 2 === 0;
  return (
    <div className="flex flex-col gap-3.5 p-5 sm:p-6 h-full">
      <span className="font-mono text-[0.44rem] tracking-widest text-black/20">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex items-start justify-between gap-3">
        <h3
          className="font-black uppercase tracking-tight leading-tight text-sm"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {project.title}
        </h3>
        <div className="flex gap-1 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="border border-black px-2 py-0.5 font-mono text-[0.44rem] tracking-widest
                         hover:bg-[#fee21e] hover:border-black transition-colors duration-75"
            >
              GH ↗
            </a>
          )}
          {"demo" in project && project.demo && (
            <a
              href={project.demo as string}
              target="_blank"
              rel="noreferrer"
              className={`border border-black px-2 py-0.5 font-mono text-[0.44rem] tracking-widest
                          transition-colors duration-75
                          ${isYellow
                            ? "hover:bg-[#fee21e]"
                            : "hover:bg-[#ff2d87] hover:text-white hover:border-[#ff2d87]"}`}
            >
              LIVE ↗
            </a>
          )}
        </div>
      </div>

      <p className="font-mono text-[0.64rem] leading-relaxed flex-1 text-black/52">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1 border-t border-black/10 pt-3">
        {project.tags.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="font-mono text-[0.44rem] border border-black/22 px-1.5 py-0.5 tracking-wide
                       hover:bg-[#fee21e] hover:border-black cursor-default transition-colors duration-75"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 5 && (
          <span className="font-mono text-[0.44rem] text-black/20 self-center">
            +{project.tags.length - 5}
          </span>
        )}
      </div>
    </div>
  );
}

export default function NeoProjects() {
  const projects = FEATURED
    .map((id) => projectsData.projects.find((p) => p.id === id))
    .filter(Boolean) as (typeof projectsData.projects)[number][];

  return (
    <section id="projects" className="border-b-2 border-black">

      {/* Title block */}
      <div className="grid grid-cols-[1fr_auto] border-b border-black">
        <div className="flex items-center gap-3 px-6 sm:px-10 py-3 border-r border-black">
          <span className="font-mono text-[0.48rem] text-black/22">§</span>
          <span className="font-mono text-[0.6rem] tracking-widest">PROJECTS</span>
          <span className="font-mono text-[0.48rem] text-black/22 ml-2">/ SELECTED WORK</span>
        </div>
        <div className="flex items-center px-4 sm:px-6 py-3 gap-4">
          <span className="font-mono text-[0.48rem] tracking-widest text-black/22">{projects.length} ENTRIES</span>
          <span className="font-mono text-[0.48rem] tracking-widest text-black/16 hidden sm:block">REV.01</span>
        </div>
      </div>

      {/* Vertical label + card grid */}
      <div className="flex">

        {/* Rotated side label */}
        <div
          className="hidden sm:flex shrink-0 w-10 border-r border-black items-center justify-center"
          style={{ writingMode: "vertical-rl" }}
        >
          <span
            className="font-mono text-[0.4rem] tracking-widest text-black/20 py-6 select-none"
            style={{ transform: "rotate(180deg)" }}
          >
            02 / SELECTED PROJECTS · // CODE / DESIGN / INTERACTION
          </span>
        </div>

        {/* Asymmetric 3-col grid — wide cards span 2 */}
        <div className="flex-1 p-5 sm:p-7 lg:p-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => {
            const isWide = WIDE_IDS.has(project.id);

            return (
              <motion.div
                key={project.id}
                className={isWide ? "lg:col-span-2" : ""}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...SPRING, delay: i * 0.07 }}
              >
                {/* Press-down on hover: translate + black shadow snaps under */}
                <article
                  className="relative border-2 border-black bg-[#F5F5F3] h-full
                             shadow-[4px_4px_0_0_#000000]
                             hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:border-[#fee21e]
                             transition-[transform,box-shadow,border-color] duration-75"
                >
                  <RegMarks />
                  <CardInner project={project} index={i} />
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom annotation */}
      <div className="border-t border-black/10 flex items-center px-6 sm:px-10 py-2 gap-3">
        <span className="font-mono text-[0.4rem] text-black/13">|←</span>
        <div className="flex-1 border-t border-dashed border-black/08" />
        <span className="font-mono text-[0.4rem] text-black/18 tracking-widest">
          REACT · NEXT.JS · REACT NATIVE · C++ · PYTHON
        </span>
        <div className="flex-1 border-t border-dashed border-black/08" />
        <span className="font-mono text-[0.4rem] text-black/13">→|</span>
      </div>
    </section>
  );
}
