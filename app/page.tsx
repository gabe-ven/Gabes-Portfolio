"use client";

import Header from "@/components/Header";
import TargetCursor from "@/components/TargetCursor";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
export default function Home() {
  return (
    <div className="text-white">
      <TargetCursor spinDuration={2} hideDefaultCursor={true} parallaxOn={true} />
      <Header />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <TechStackSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
