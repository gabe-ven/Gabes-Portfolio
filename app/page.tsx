"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Nav           from "@/components/Nav";
import EditorialHero from "@/components/EditorialHero";
import About         from "@/components/About";
import Experience    from "@/components/Experience";
import Projects      from "@/components/Projects";
import GlobeSection  from "@/components/GlobeSection";
import Contact       from "@/components/Contact";

export default function Home() {
  const [phase, setPhase] = useState<"typing" | "transition">("typing");
  const [showGlobe, setShowGlobe] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <div className="bg-[#D97D5B]">
      {phase !== "typing" && !galleryOpen && <Nav />}

      <EditorialHero phase={phase} setPhase={setPhase} />

      <AnimatePresence>
        {phase !== "typing" && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
              mass: 0.8,
              delay: 0.15,
            }}
            onAnimationComplete={() => {
              window.dispatchEvent(new Event("layout-settled"));
              setShowGlobe(true);
            }}
          >
            <div className="relative z-10 -mt-12 rounded-t-[3rem] overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.12)]">
              <About />
            </div>

            <div className="relative z-20 -mt-12 rounded-t-[3rem] overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.14)]">
              <Experience />
            </div>

            <div className="relative z-30 -mt-12 rounded-t-[3rem] overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.16)]">
              <Projects />
            </div>

            {/* GlobeSection mounts after animation completes to avoid competing with transition */}
            <div className="relative z-40 -mt-12 rounded-t-[3rem] overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.18)]">
              {showGlobe && <GlobeSection onOverlayChange={setGalleryOpen} />}
            </div>

            <div className="relative z-50 -mt-12 rounded-t-[3rem] overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.20)]">
              <Contact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
