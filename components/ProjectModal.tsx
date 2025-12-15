"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import * as Fa from "react-icons/fa";

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    image: string;
    tags: string[];
    description: string;
    github?: string;
    demo?: string;
  };
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-xl p-6 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500 transition-all z-10"
        >
          <span className="text-xl text-white">×</span>
        </button>

        {/* Project Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4 bg-gradient-to-br from-white/5 to-white/10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Project Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white pr-8">
          {project.title}
        </h2>

        {/* Project Description */}
        <p className="text-sm md:text-base text-gray-300 mb-5 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-5">
          <h3 className="text-lg font-bold mb-3 text-orange-500 uppercase tracking-wider">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/5 text-white rounded-md border border-white/10 hover:border-orange-500/50 transition-colors text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500 rounded-lg transition-all font-semibold text-sm"
            >
              <Fa.FaGithub className="w-4 h-4" />
              View Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all font-semibold text-sm"
            >
              <Fa.FaExternalLinkAlt className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}


