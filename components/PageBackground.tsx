"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

// Breakpoints: Hero=0, About=0.25, Experience=0.5, Projects=0.75, Contact=1.0
const BP = [0, 0.25, 0.5, 0.75, 1.0];

export default function PageBackground() {
  const { scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 28,
    mass: 0.75,
    restDelta: 0.001,
  });

  // Base background color per section phase
  const bg = useTransform(smooth, BP, [
    "#000000", // Hero: pure black
    "#030018", // About: deep indigo-black
    "#040100", // Experience: near-black with ember undertone
    "#0a0400", // Projects: dark amber-black
    "#000618", // Contact: deep blue-black
  ]);

  // Blob 1 – primary atmospheric glow (position + color morphs per section)
  const b1r = useTransform(smooth, BP, [55, 68, 150, 145, 8]);
  const b1g = useTransform(smooth, BP, [12, 22, 58, 62, 70]);
  const b1b = useTransform(smooth, BP, [130, 165, 10, 6, 180]);
  const b1a = useTransform(smooth, BP, [0.30, 0.48, 0.34, 0.44, 0.36]);
  const b1x = useTransform(smooth, BP, [72, 50, 25, 65, 72]);
  const b1y = useTransform(smooth, BP, [82, 58, 68, 50, 78]);

  // Blob 2 – secondary atmospheric glow
  const b2r = useTransform(smooth, BP, [25, 35, 110, 92, 0]);
  const b2g = useTransform(smooth, BP, [10, 14, 40, 42, 58]);
  const b2b = useTransform(smooth, BP, [100, 135, 0, 0, 155]);
  const b2a = useTransform(smooth, BP, [0.22, 0.34, 0.28, 0.34, 0.26]);
  const b2x = useTransform(smooth, BP, [18, 78, 70, 28, 28]);
  const b2y = useTransform(smooth, BP, [18, 28, 32, 70, 28]);

  const blob1Color = useMotionTemplate`rgba(${b1r},${b1g},${b1b},${b1a})`;
  const blob2Color = useMotionTemplate`rgba(${b2r},${b2g},${b2b},${b2a})`;
  const blob1Bg = useMotionTemplate`radial-gradient(ellipse 90% 70% at ${b1x}% ${b1y}%, ${blob1Color}, transparent)`;
  const blob2Bg = useMotionTemplate`radial-gradient(ellipse 80% 65% at ${b2x}% ${b2y}%, ${blob2Color}, transparent)`;

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: bg,
      }}
    >
      <motion.div style={{ position: "absolute", inset: 0, background: blob1Bg }} />
      <motion.div style={{ position: "absolute", inset: 0, background: blob2Bg }} />
    </motion.div>
  );
}
