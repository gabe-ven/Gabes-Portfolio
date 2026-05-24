"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { motion } from "motion/react";
import { IconArrowLeft } from "@tabler/icons-react";
import Masonry from "@/components/Masonry";

const GALLERIES: Record<
  string,
  { label: string; items: { id: string; img: string; height: number }[] }
> = {
  sf: {
    label: "USA",
    items: [
      { id: "sf-1", img: "https://picsum.photos/seed/sf1/600/900",  height: 560 },
      { id: "sf-2", img: "https://picsum.photos/seed/sf2/600/700",  height: 440 },
      { id: "sf-3", img: "https://picsum.photos/seed/sf3/600/800",  height: 500 },
      { id: "sf-4", img: "https://picsum.photos/seed/sf4/600/600",  height: 380 },
      { id: "sf-5", img: "https://picsum.photos/seed/sf5/600/1000", height: 620 },
      { id: "sf-6", img: "https://picsum.photos/seed/sf6/600/750",  height: 460 },
      { id: "sf-7", img: "https://picsum.photos/seed/sf7/600/850",  height: 530 },
      { id: "sf-8", img: "https://picsum.photos/seed/sf8/600/650",  height: 410 },
    ],
  },
  japan: {
    label: "Japan",
    items: [
      { id: "jp-1", img: "https://picsum.photos/seed/jp1/600/900",  height: 560 },
      { id: "jp-2", img: "https://picsum.photos/seed/jp2/600/650",  height: 410 },
      { id: "jp-3", img: "https://picsum.photos/seed/jp3/600/800",  height: 500 },
      { id: "jp-4", img: "https://picsum.photos/seed/jp4/600/1000", height: 620 },
      { id: "jp-5", img: "https://picsum.photos/seed/jp5/600/700",  height: 440 },
      { id: "jp-6", img: "https://picsum.photos/seed/jp6/600/850",  height: 530 },
      { id: "jp-7", img: "https://picsum.photos/seed/jp7/600/600",  height: 380 },
      { id: "jp-8", img: "https://picsum.photos/seed/jp8/600/750",  height: 460 },
    ],
  },
};

export default function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const gallery = GALLERIES[id];

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
          onClick={() => router.back()}
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
        <Masonry
          items={gallery.items}
          animateFrom="bottom"
          stagger={0.04}
          blurToFocus
          scaleOnHover
          hoverScale={0.97}
        />
      </motion.div>
    </div>
  );
}
