"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            You know how to find me
          </h2>

          <motion.a
            href="mailto:gabrielvenezia6@gmail.com"
            className="text-3xl md:text-4xl text-orange-500 hover:text-orange-400 font-bold inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            gabrielvenezia6@gmail.com
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

