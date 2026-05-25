"use client";

import { useState, useEffect, useRef, type ComponentType } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import PageBackground from "@/components/PageBackground";
import { HeroAboutBlendProvider } from "@/components/HeroAboutBlend";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ScrollDrivenDarkVeil from "@/components/ScrollDrivenDarkVeil";

// Lightweight dynamic imports — small chunks, safe to include in initial manifest
const TargetCursor = dynamic(() => import("@/components/TargetCursor"), { ssr: false });
const ExperienceSection = dynamic(() => import("@/components/ExperienceSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"), { ssr: false });

// Particles — ogl is ~6MB of vendor code. Load only after the page is interactive
// via a raw import() in useEffect so Next.js never adds the ogl chunk to the
// initial HTML manifest.
function GlobalParticles() {
  const [ParticlesComp, setParticlesComp] = useState<ComponentType<Record<string, unknown>> | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) return;
    const t = setTimeout(() => {
      import("@/components/Particles").then((m) => {
        setParticlesComp(() => m.default as ComponentType<Record<string, unknown>>);
      });
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  if (!ParticlesComp || isMobile) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <ParticlesComp
        particleCount={40}
        particleSpread={10}
        speed={0.1}
        particleColors={["#ffffff"]}
        alphaParticles
        particleBaseSize={90}
        sizeRandomness={1.4}
        disableRotation={false}
        cameraDistance={18}
      />
    </div>
  );
}

// GlobeSection — Three.js + ThreeGlobe is ~16MB uncompressed. Load only when
// the user has scrolled near the section via IntersectionObserver.
function LazyGlobeSection() {
  const [GlobeSectionComp, setGlobeSectionComp] = useState<ComponentType | null>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = placeholderRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          import("@/components/GlobeSection").then((m) => {
            setGlobeSectionComp(() => m.default as ComponentType);
          });
        }
      },
      { rootMargin: "400px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (GlobeSectionComp) return <GlobeSectionComp />;
  return <div ref={placeholderRef} style={{ minHeight: "100svh" }} />;
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

  return (
    <>
      <PageBackground />
      <div className="text-white" style={{ position: "relative", zIndex: 1 }}>
        {!isMobile && <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn hoverDuration={0.2} />}
        <Header />
        <GlobalParticles />
        <HeroAboutBlendProvider>
          <ScrollDrivenDarkVeil />
          <HeroSection />
          <AboutSection />
        </HeroAboutBlendProvider>
        <ExperienceSection />
        <ProjectsSection />
        <LazyGlobeSection />
      </div>
    </>
  );
}
