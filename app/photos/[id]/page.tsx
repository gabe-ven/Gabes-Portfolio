"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { motion } from "motion/react";
import { IconArrowLeft } from "@tabler/icons-react";
import Masonry from "@/components/Masonry";

import galleriesData from "@/data/galleries.json";

type GalleryItem = { id: string; img: string; height?: number; naturalWidth?: number; naturalHeight?: number };
type Gallery     = { label: string; comingSoon?: boolean; items: GalleryItem[] };
const GALLERIES  = galleriesData as Record<string, Gallery>;

export default function PhotoPage({ params }: { params: any }) {
  // Safe unwrap supporting both Next.js 14 (object) and Next.js 15 (Promise)
  const resolvedParams = params && (typeof params.then === "function" || params instanceof Promise)
    ? use(params)
    : params;
  const id = resolvedParams?.id;
  const router = useRouter();
  const gallery = id ? GALLERIES[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!gallery) notFound();

  return (
    <div
      className="min-h-screen bg-[#09090f] text-white"
      style={{ fontFamily: "var(--font-space-grotesk)" }}
    >
      {/* Header — back button only */}
      <motion.header
        className="sticky top-0 z-10 flex items-center px-6 md:px-12 py-5 bg-[#09090f]/80 backdrop-blur-md border-b border-white/[0.06]"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={() => {
            sessionStorage.setItem("justReturnedFromPhotos", "true");
            router.push("/#photos", { scroll: false });
          }}
          className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm"
        >
          <IconArrowLeft className="w-4 h-4" />
          Back
        </button>
      </motion.header>

      {/* Title */}
      <motion.div
        className="px-6 md:px-12 pt-12 pb-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white/90">
          {gallery.label}
        </h1>
      </motion.div>

      {/* Masonry grid */}
      <motion.div
        className="px-4 md:px-8 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        {gallery.comingSoon ? (
          <p className="text-white/35 text-sm tracking-widest uppercase">Coming soon</p>
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
      </motion.div>
    </div>
  );
}
