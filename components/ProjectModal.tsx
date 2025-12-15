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
        initial={{ scale: 0.8, y: 50, rotateX: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, rotateX: 20, opacity: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        onClick={(e) => e.stopPropagation()}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all z-10"
          whileHover={{
            backgroundColor: "rgba(230, 57, 70, 0.2)",
            borderColor: "rgba(230, 57, 70, 1)",
            scale: 1.1,
            rotate: 90,
          }}
        >
          <span className="text-xl text-white">×</span>
        </motion.button>

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
          <h3
            className="text-lg font-bold mb-3 uppercase tracking-wider"
            style={{ color: "#E63946" }}
          >
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1 bg-white/5 text-white rounded-md border border-white/10 transition-colors text-xs font-medium"
                whileHover={{
                  borderColor: "rgba(230, 57, 70, 0.5)",
                  backgroundColor: "rgba(230, 57, 70, 0.1)",
                  scale: 1.05,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg font-semibold text-sm"
              whileHover={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(230, 57, 70, 1)",
                scale: 1.05,
              }}
            >
              <Fa.FaGithub className="w-4 h-4" />
              View Code
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-white rounded-lg font-semibold text-sm"
              style={{ backgroundColor: "#E63946" }}
              whileHover={{
                backgroundColor: "#D32F3C",
                scale: 1.05,
                boxShadow: "0 0 20px rgba(230, 57, 70, 0.6)",
              }}
            >
              <Fa.FaExternalLinkAlt className="w-3.5 h-3.5" />
              Live Demo
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}




