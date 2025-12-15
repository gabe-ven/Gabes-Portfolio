"use client";

import { motion } from "framer-motion";
import skillsData from "@/app/data/skills.json";
import SkillCard from "./SkillCard";

export default function TechStackSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.div
            style={{ color: "#E63946" }}
            className="text-4xl spin-slow"
            whileInView={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ✦
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
            My Stack
          </h2>
        </motion.div>

        <div className="space-y-20">
          {skillsData.categories.map((category) => (
            <div key={category.name}>
              <motion.h3
                className="text-3xl md:text-4xl text-white font-bold mb-10 uppercase tracking-wider"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {category.name}
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.skills.map((skill, idx) => (
                  <SkillCard key={skill.name} skill={skill} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





