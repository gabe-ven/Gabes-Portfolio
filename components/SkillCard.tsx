"use client";

import { motion } from "framer-motion";
import * as Si from "react-icons/si";
import * as Fa from "react-icons/fa";

interface SkillCardProps {
  skill: {
    name: string;
    icon: string;
    color: string;
  };
  index: number;
}

const getIcon = (iconName: string) => {
  const iconComponents: {
    [key: string]: React.ComponentType<{ className?: string }>;
  } = { ...Si, ...Fa };
  const Icon = iconComponents[iconName];
  return Icon ? <Icon className="w-full h-full" /> : null;
};

export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      className="group flex items-center gap-4 cursor-pointer will-change-transform"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.02,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        x: 6,
        transition: {
          duration: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
    >
      <div
        className="w-12 h-12 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{
          color: skill.color,
          background: "transparent",
          backgroundColor: "transparent",
        }}
      >
        {getIcon(skill.icon)}
      </div>
      <span className="text-xl font-medium text-white group-hover:text-orange-500 transition-colors duration-200">
        {skill.name}
      </span>
    </motion.div>
  );
}



