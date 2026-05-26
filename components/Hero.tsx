"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col justify-between px-6 pt-20 pb-10"
      style={{ background: "#e07b54" }}
    >
      {/* Top row: name left, photo right */}
      <div className="flex items-start justify-between gap-8">
        <motion.h1
          className="text-white font-bold leading-[0.92] flex-1"
          style={{ fontSize: "clamp(3.5rem, 9vw, 10rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Gabriel
          <br />
          Venezia.
        </motion.h1>

        <motion.div
          className="relative shrink-0 rounded-2xl overflow-hidden"
          style={{ width: "clamp(140px, 22vw, 300px)", aspectRatio: "3/4" }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/DSCF0232.jpg"
            alt="Gabriel Venezia"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </div>

      {/* Statement */}
      <motion.p
        className="text-white font-bold leading-[1.1] max-w-2xl"
        style={{ fontSize: "clamp(1.4rem, 3vw, 2.8rem)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        I build fast, clean things for the web — from AI tools to mobile apps.
        CS at UC Davis,{" "}
        <em className="not-italic" style={{ color: "rgba(255,255,255,0.5)" }}>
          interned at NASA JPL.
        </em>
      </motion.p>

      <motion.p
        className="font-mono text-xs"
        style={{ color: "rgba(255,255,255,0.4)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        scroll ↓
      </motion.p>
    </section>
  );
}
