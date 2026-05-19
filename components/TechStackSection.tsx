"use client";

import { motion } from "framer-motion";
import * as Si from "react-icons/si";
import * as Fa from "react-icons/fa";
import skillsData from "@/app/data/skills.json";

type IconComponents = { [key: string]: React.ComponentType<{ style?: React.CSSProperties }> };

function SkillPill({ skill }: { skill: { name: string; icon: string; color: string } }) {
  const icons = { ...Si, ...Fa } as IconComponents;
  const Icon = icons[skill.icon];
  return (
    <motion.div
      className="flex items-center gap-2.5 group cursor-default"
      whileHover={{ x: 4, transition: { duration: 0.1 } }}
    >
      <span className="text-base shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" style={{ color: skill.color }}>
        {Icon ? <Icon style={{ display: "block" }} /> : null}
      </span>
      <span className="font-mono text-sm text-white/60 group-hover:text-white/90 transition-colors duration-100 tracking-wide">
        {skill.name}
      </span>
    </motion.div>
  );
}

const categoryAccent: Record<string, string> = {
  "Languages": "#22d3ee",
  "Frameworks & Libraries": "#34d399",
  "Tools & Others": "#818cf8",
};

export default function TechStackSection() {
  return (
    <section
      id="tech"
      className="snap-start overflow-hidden relative flex flex-col justify-center py-16 px-6"
      style={{ height: "100vh", scrollSnapStop: "always", background: "#00080d" }}
    >
      {/* Teal grid lines */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Top glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(34,211,238,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <motion.div
            className="text-3xl text-cyan-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ✦
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-white">
            My Stack
          </h2>
        </div>

        {/* 3-column skill grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {skillsData.categories.map((category) => {
            const accent = categoryAccent[category.name] ?? "#22d3ee";
            return (
              <div key={category.name}>
                <div
                  className="font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-4 pb-2"
                  style={{
                    color: accent,
                    borderBottom: `1px solid ${accent}30`,
                  }}
                >
                  {category.name}
                </div>
                <div className="flex flex-col gap-3">
                  {category.skills.map((skill) => (
                    <SkillPill key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
