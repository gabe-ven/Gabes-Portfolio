"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    image: string;
    tags: string[];
    description: string;
    github?: string;
    demo?: string;
  };
  index: number;
  onClick: () => void;
}

export default function ProjectCard({
  project,
  index,
  onClick,
}: ProjectCardProps) {
  const ACCENT = "#f59e0b";

  return (
    <motion.div
      className="group cursor-pointer will-change-transform"
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: false, amount: 0.15, margin: "0px 0px -50px 0px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-5 bg-gradient-to-br from-white/5 to-white/10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div
          className="absolute top-4 left-4 text-black text-sm font-bold px-3 py-1 rounded-md"
          style={{ backgroundColor: ACCENT }}
        >
          _{String(index + 1).padStart(2, "0")}.
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-3 transition-colors duration-100 group-hover:text-[#f59e0b]">
        {project.title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.slice(0, 3).map((tag, idx) => (
          <span
            key={idx}
            className="text-xs px-3 py-1 bg-white/5 text-gray-400 rounded-full border border-white/10 group-hover:border-white/20 transition-all duration-150"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
