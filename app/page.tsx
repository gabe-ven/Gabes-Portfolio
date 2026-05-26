"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Nav           from "@/components/Nav";
import EditorialHero from "@/components/EditorialHero";
import About         from "@/components/About";
import Experience    from "@/components/Experience";
import Projects      from "@/components/Projects";
import GlobeSection  from "@/components/GlobeSection";
import Contact       from "@/components/Contact";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function snapToPhotos(onDone: () => void) {
  const attempt = () => {
    const el = document.getElementById("photos");
    if (!el) { requestAnimationFrame(attempt); return; }
    const html = document.documentElement;
    const saved = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, el.getBoundingClientRect().top + window.pageYOffset);
    requestAnimationFrame(() => {
      html.style.scrollBehavior = saved;
      onDone();
    });
  };
  requestAnimationFrame(attempt);
}

export default function Home() {
  const [phase, setPhase]       = useState<"typing" | "transition">("typing");
  const [showGlobe, setShowGlobe] = useState(false);
  const [showCover, setShowCover] = useState(false);
  const skipSpring = useRef(false);
  const needScroll = useRef(false);

  // Stop the browser from restoring scroll position on every navigation
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  // Detect return from photos — runs synchronously before first paint
  useIsomorphicLayoutEffect(() => {
    if (!sessionStorage.getItem("justReturnedFromPhotos")) return;
    sessionStorage.removeItem("justReturnedFromPhotos");
    skipSpring.current = true;
    needScroll.current = true;
    setShowCover(true);
    setPhase("transition");
    setShowGlobe(true);
  }, []);

  // Once the globe section is mounted, snap scroll to #photos and lift the cover
  useEffect(() => {
    if (!needScroll.current) return;
    needScroll.current = false;
    window.dispatchEvent(new Event("layout-settled"));
    snapToPhotos(() => setShowCover(false));
  }, [showGlobe]);

  return (
    <div className="bg-[#D97D5B]">
      {/* Black cover hides the layout jump while we reposition */}
      {showCover && (
        <div className="fixed inset-0 bg-[#09090f] z-[9999] pointer-events-none" />
      )}

      {phase !== "typing" && <Nav />}

      <EditorialHero phase={phase} setPhase={setPhase} />

      <AnimatePresence>
        {phase !== "typing" && (
          <motion.div
            className="relative z-20 bg-transparent"
            // Skip the slide-up animation when returning from photos so layout
            // is stable before we attempt to scroll to #photos
            initial={skipSpring.current ? false : { y: 60 }}
            animate={{ y: 0 }}
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

            <div className="relative z-40 -mt-12 rounded-t-[3rem] overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.18)]">
              {showGlobe && <GlobeSection />}
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
