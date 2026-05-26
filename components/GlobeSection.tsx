"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useInView } from "motion/react";
import { IconArrowLeft } from "@tabler/icons-react";
import DecryptedText from "./DecryptedText";
import Masonry from "./Masonry";
import galleriesData from "@/data/galleries.json";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

// ─── Globe config ─────────────────────────────────────────────────────────────

const globeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 37.7749, lng: -122.4194 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const MARKERS = [
  { id: "sf",    lat: 37.7749, lng: -122.4194, color: "#06b6d4" },
  { id: "japan", lat: 35.6762, lng:  139.6503, color: "#a855f7" },
];

type GalleryItem = { id: string; img: string; height?: number; naturalWidth?: number; naturalHeight?: number };
type Gallery = { label: string; comingSoon?: boolean; items: GalleryItem[] };
const GALLERIES = galleriesData as Record<string, Gallery>;

// ─── Section ─────────────────────────────────────────────────────────────────

interface GlobeSectionProps {
  onOverlayChange?: (open: boolean) => void;
}

export default function GlobeSection({ onOverlayChange }: GlobeSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const gallery = selectedId ? GALLERIES[selectedId] : null;

  const openGallery = (id: string) => { setSelectedId(id); onOverlayChange?.(true); };
  const closeGallery = () => { setSelectedId(null); onOverlayChange?.(false); };

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-15%" });
  const [entryKey, setEntryKey] = useState(0);
  const prevInView = useRef(false);

  useEffect(() => {
    if (isInView && !prevInView.current) setEntryKey((k) => k + 1);
    prevInView.current = isInView;
  }, [isInView]);

  return (
    <>
      <section
        ref={sectionRef}
        id="photos"
        className="relative overflow-hidden bg-white dark:bg-black"
        style={{ minHeight: "100svh" }}
      >
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 px-6 md:px-16 py-24 md:py-0 overflow-hidden relative z-10">
          {/* Left: text */}
          <motion.div
            className="flex flex-col gap-3 md:gap-4 items-center md:items-start md:w-2/5 shrink-0 z-10"
            animate={{
              opacity: isInView ? 1 : 0,
              x: isInView ? 0 : -48,
              filter: isInView ? "blur(0px)" : "blur(6px)",
            }}
            transition={{ duration: 0.85, delay: isInView ? 0.18 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-bold leading-none tracking-tighter text-center md:text-left"
              style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
            >
              <DecryptedText
                key={entryKey}
                text="Photos."
                animateOn="view"
                sequential
                revealDirection="start"
                speed={60}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                className="text-neutral-900 dark:text-white/90"
                encryptedClassName="text-neutral-900/20 dark:text-white/20"
              />
            </h2>
            <p
              className="text-sm text-neutral-500 dark:text-white/40 max-w-xs mx-auto md:mx-0 text-center md:text-left leading-relaxed"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D97D5B] mr-2 mb-0.5 align-middle" />
              Every pin is a place I&apos;ve been. Tap one to see it through my lens.
            </p>
          </motion.div>

          {/* Right: Globe */}
          <motion.div
            className="relative w-full md:w-3/5 max-w-[min(82vw,42vh)] md:max-w-[min(90vw,85vh)]"
            style={{ aspectRatio: "1/1" }}
            animate={{
              opacity: isInView ? 1 : 0,
              scale: isInView ? 1 : 0.18,
              y: isInView ? 0 : 90,
              rotate: isInView ? 0 : -8,
            }}
            transition={{
              type: "spring",
              stiffness: 105,
              damping: 13,
              opacity: { duration: 0.6, ease: "easeOut" },
              rotate: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <World
              data={[]}
              globeConfig={globeConfig}
              markers={MARKERS}
              onMarkerClick={openGallery}
            />
          </motion.div>
        </div>
      </section>

      {/* Full-screen photo overlay — fixed so it sits above the page without unmounting anything */}
      <AnimatePresence>
        {gallery && selectedId && (
          <motion.div
            key={selectedId}
            className="fixed inset-0 z-[200] overflow-y-auto bg-[#09090f]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center px-6 md:px-12 py-5 bg-[#09090f]/80 backdrop-blur-md border-b border-white/[0.06]">
              <button
                onClick={closeGallery}
                className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm"
              >
                <IconArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>

            {/* Title */}
            <div className="px-6 md:px-12 pt-12 pb-8">
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white/90">
                {gallery.label}
              </h1>
            </div>

            {/* Content */}
            <div className="px-4 md:px-8 pb-16">
              {gallery.comingSoon ? (
                <p className="text-white/35 text-sm tracking-widest uppercase">
                  Coming soon
                </p>
              ) : (
                <Masonry
                  items={gallery.items}
                  animateFrom="bottom"
                  stagger={0.04}
                  blurToFocus
                  scaleOnHover
                  hoverScale={0.97}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
