"use client";

import { useState } from "react";
import StarryBackground from "@/components/StarryBackground";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollIndicator from "@/components/ScrollIndicator";
import HamburgerMenu from "@/components/HamburgerMenu";
import MobileMenu from "@/components/MobileMenu";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <CustomCursor />
      <StarryBackground />
      <ScrollProgress />
      <ScrollIndicator />
      <HamburgerMenu
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        scrollToSection={scrollToSection}
      />

      {/* Content wrapper */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <TechStackSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
