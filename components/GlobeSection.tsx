"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "motion/react";
import { IconArrowLeft } from "@tabler/icons-react";
import createGlobe, { type COBEOptions } from "cobe";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import DecryptedText from "./DecryptedText";

const LOCATIONS = [
  { id: "sf",    lat: 37.7749, lng: -122.4194 },
  { id: "japan", lat: 35.6762, lng:  139.6503 },
];

// ─── Globe config ─────────────────────────────────────────────────────────────

const BASE: Partial<COBEOptions> = {
  devicePixelRatio: 2,
  phi: 3.0,
  theta: 0.25,
  diffuse: 1.4,
  mapSamples: 16000,
  mapBrightness: 6,
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  markers: [
    { location: [37.7749, -122.4194], size: 0.07 },
    { location: [35.6762,  139.6503], size: 0.07 },
  ],
  onRender: () => {},
};

const LIGHT_CONFIG: COBEOptions = {
  ...(BASE as COBEOptions),
  dark: 0,
  baseColor:  [1, 1, 1],
  glowColor:  [0.9, 0.9, 0.9],
  width: 800, height: 800,
};

const DARK_CONFIG: COBEOptions = {
  ...(BASE as COBEOptions),
  dark: 1,
  baseColor:  [0.08, 0.08, 0.12],
  glowColor:  [0.15, 0.15, 0.25],
  width: 800, height: 800,
};

// ─── Globe with marker-click support ─────────────────────────────────────────

interface MarkerDef { id: string; lat: number; lng: number }

function GlobeClickable({
  className,
  config,
  markers,
  onMarkerClick,
}: {
  className?: string;
  config: COBEOptions;
  markers: MarkerDef[];
  onMarkerClick: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const phiRef       = useRef(config.phi ?? 0);
  const widthRef     = useRef(0);
  const pointerDown  = useRef<number | null>(null);
  const dragTotal    = useRef(0);

  const r  = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  const projectMarker = (marker: MarkerDef, phi: number, W: number) => {
    const theta = config.theta ?? 0.3;
    const latR  = marker.lat * Math.PI / 180;
    const lngR  = marker.lng * Math.PI / 180;
    // Cobe projects lat/lng to 3D via:
    const x  =  Math.cos(latR) * Math.cos(lngR);
    const y  =  Math.sin(latR);
    const z  = -Math.cos(latR) * Math.sin(lngR);

    // Rotate by phi around Y
    const x1 =  x * Math.cos(phi) + z * Math.sin(phi);
    const z1 = -x * Math.sin(phi) + z * Math.cos(phi);

    // Rotate by theta around X
    const y2 =  y * Math.cos(theta) - z1 * Math.sin(theta);
    const z2 =  y * Math.sin(theta) + z1 * Math.cos(theta);

    if (z2 <= 0) return null; // Behind the globe

    // Cobe renders the globe at 80% of the canvas size
    const ax = x1 * 0.8;
    const ay = y2 * 0.8;

    return { sx: (ax + 1) / 2 * W, sy: (1 - ay) / 2 * W };
  };

  const getCursor = (clientX: number, clientY: number, dragging: boolean) => {
    if (dragging) return "grabbing";
    const container = containerRef.current;
    if (!container) return "grab";
    const rect = container.getBoundingClientRect();
    const W    = widthRef.current;
    if (W <= 0) return "grab";
    const cx   = clientX - rect.left;
    const cy   = clientY - rect.top;
    const phi  = phiRef.current + rs.get();
    for (const marker of markers) {
      const proj = projectMarker(marker, phi, W);
      if (!proj) continue;
      if (Math.hypot(cx - proj.sx, cy - proj.sy) < 40) return "pointer";
    }
    return "grab";
  };

  const handleClick = (e: React.MouseEvent) => {
    if (dragTotal.current > 5) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const W    = widthRef.current;
    if (W <= 0) return;
    const cx   = e.clientX - rect.left;
    const cy   = e.clientY - rect.top;
    const phi  = phiRef.current + rs.get();
    for (const marker of markers) {
      const proj = projectMarker(marker, phi, W);
      if (!proj) continue;
      if (Math.hypot(cx - proj.sx, cy - proj.sy) < 40) {
        onMarkerClick(marker.id);
        return;
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onResize = () => { widthRef.current = canvas.offsetWidth; };
    window.addEventListener("resize", onResize);
    onResize();
    const onContextLost = (e: Event) => e.preventDefault();
    canvas.addEventListener("webglcontextlost", onContextLost);
    let globe: ReturnType<typeof createGlobe> | null = null;
    try {
      globe = createGlobe(canvas, {
        ...config,
        width:  widthRef.current * 2,
        height: widthRef.current * 2,
        onRender: (state) => {
          if (!pointerDown.current) phiRef.current += 0.004;
          state.phi    = phiRef.current + rs.get();
          state.width  = widthRef.current * 2;
          state.height = widthRef.current * 2;
        },
      });
    } catch {}
    setTimeout(() => { canvas.style.opacity = "1"; }, 0);
    return () => {
      globe?.destroy();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("resize", onResize);
    };
  }, [config, rs]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 mx-auto aspect-square w-full", className)}
      style={{ cursor: "grab" }}
      onClick={handleClick}
      onPointerDown={(e) => {
        pointerDown.current = e.clientX;
        dragTotal.current = 0;
        if (containerRef.current) containerRef.current.style.cursor = "grabbing";
      }}
      onPointerUp={(e) => {
        pointerDown.current = null;
        if (containerRef.current) containerRef.current.style.cursor = getCursor(e.clientX, e.clientY, false);
      }}
      onPointerOut={() => {
        pointerDown.current = null;
        if (containerRef.current) containerRef.current.style.cursor = "grab";
      }}
      onMouseMove={(e) => {
        if (pointerDown.current !== null) {
          const delta = e.clientX - pointerDown.current;
          dragTotal.current += Math.abs(delta);
          r.set(r.get() + delta / 400);
          pointerDown.current = e.clientX;
        } else {
          if (containerRef.current) containerRef.current.style.cursor = getCursor(e.clientX, e.clientY, false);
        }
      }}
      onTouchMove={(e) => {
        if (e.touches[0] && pointerDown.current !== null) {
          const delta = e.touches[0].clientX - pointerDown.current;
          dragTotal.current += Math.abs(delta);
          r.set(r.get() + delta / 400);
          pointerDown.current = e.touches[0].clientX;
        }
      }}
    >
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-500"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function GlobeSection() {
  const router = useRouter();

  const openGallery  = (id: string) => {
    sessionStorage.setItem("justReturnedFromPhotos", "true");
    router.push(`/photos/${id}`);
  };

  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: false, margin: "-15%" });
  const [entryKey, setEntryKey] = useState(0);
  const prevInView = useRef(false);

  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

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

        <div className="h-[100svh] flex flex-col items-center px-6 md:px-16 pt-14 pb-0 overflow-hidden relative z-10">

          {/* Heading + description + location chips */}
          <motion.div
            className="flex flex-col gap-3 items-center text-center z-10 shrink-0"
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : -20,
              filter: isInView ? "blur(0px)" : "blur(6px)",
            }}
            transition={{ duration: 0.75, delay: isInView ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-bold leading-none tracking-tighter" style={{ fontSize: "clamp(4rem, 11vw, 8rem)" }}>
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
            <p className="text-base md:text-lg text-neutral-500 dark:text-white/40 max-w-sm leading-relaxed">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D97D5B] mr-2 mb-0.5 align-middle" />
              Every pin is a place I&apos;ve been. Tap the dot to see it through my lens.
            </p>

          </motion.div>

          {/* Globe — oversized, crops at bottom for horizon effect */}
          <motion.div
            className="relative flex-1 w-full overflow-hidden"
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.85 }}
            transition={{ duration: 0.8, delay: isInView ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The inner div is larger than the clip container so the globe bleeds off the bottom */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ width: "min(120vw, 120vh)", height: "min(120vw, 120vh)", top: "-5%" }}
            >
              <GlobeClickable
                config={isDark ? DARK_CONFIG : LIGHT_CONFIG}
                markers={LOCATIONS}
                onMarkerClick={openGallery}
              />
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
