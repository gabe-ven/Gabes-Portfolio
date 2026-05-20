"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TargetCursor from "@/components/TargetCursor";
import PageBackground from "@/components/PageBackground";
import { HeroAboutBlendProvider } from "@/components/HeroAboutBlend";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import GlobeSection from "@/components/GlobeSection";
import ScrollDrivenDarkVeil from "@/components/ScrollDrivenDarkVeil";
import Particles from "@/components/Particles";

// Particles are always fully visible — the DarkVeil on top fades out as you
// leave the hero, revealing the particles underneath. No scroll-driven opacity
// on the particles means zero pop-in or seam between sections.
function GlobalParticles() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const t = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(t);
  }, []);

  if (!mounted || isMobile) return null;

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
      <Particles
        particleCount={80}
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

export default function Home() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

  return (
    <>
      <PageBackground />
      <div className="text-white" style={{ position: "relative", zIndex: 1 }}>
        {!isMobile && <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn hoverDuration={0.2} />}
        <Header />
        {/* Particles sit below DarkVeil in DOM → DarkVeil paints on top */}
        <GlobalParticles />
        <HeroAboutBlendProvider>
          {/* DarkVeil fades from 1 → 0 as user leaves hero, fully uncovering particles */}
          <ScrollDrivenDarkVeil />
          <HeroSection />
          <AboutSection />
        </HeroAboutBlendProvider>
        <ExperienceSection />
        <ProjectsSection />
        <GlobeSection />
      </div>
    </>
  );
}
