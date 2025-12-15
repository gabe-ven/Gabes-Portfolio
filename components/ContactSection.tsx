"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            You know how to find me
          </motion.h2>

          <motion.a
            href="mailto:gabrielvenezia6@gmail.com"
            className="text-3xl md:text-4xl font-bold inline-block"
            style={{ color: "#E63946" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{
              scale: 1.1,
              rotateZ: [0, -2, 2, -2, 0],
              color: "#FF1B2D",
              textShadow: "0 0 20px rgba(230, 57, 70, 0.8)",
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 300,
              },
            }}
          >
            gabrielvenezia6@gmail.com
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}





