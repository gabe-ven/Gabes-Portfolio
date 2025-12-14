"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    id: string;
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
  return (
    <motion.div
      className="group cursor-pointer will-change-transform"
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.25,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-5 bg-gradient-to-br from-white/5 to-white/10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4 bg-orange-500 text-black text-sm font-bold px-3 py-1 rounded-md transition-transform duration-250 group-hover:scale-105">
          _{String(index + 1).padStart(2, "0")}.
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors duration-250">
        {project.title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.slice(0, 3).map((tag, idx) => (
          <span
            key={idx}
            className="text-xs px-3 py-1 bg-white/5 text-gray-400 rounded-full border border-white/10 group-hover:border-orange-500/30 transition-colors duration-250"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

