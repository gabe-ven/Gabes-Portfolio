"use client";

import projectsData from "@/app/data/projects.json";
import DecryptedText from "./DecryptedText";
import Carousel from "@/components/ui/carousel";

const { projects } = projectsData;

export default function ProjectsSection() {
  const slides = projects.map((project) => ({
    title: project.title,
    src: project.image,
    description: project.description,
    tags: project.tags,
    github: project.github,
    demo: project.demo,
    imageBg: (project as { imageBg?: string }).imageBg,
  }));

  return (
    <section
      id="projects"
      className="snap-start relative flex flex-col overflow-hidden"
      style={{ height: "100svh" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4 overflow-hidden">
        <h2
          className="text-4xl md:text-5xl font-semibold tracking-[0.18em] uppercase shrink-0 text-center"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <DecryptedText
            text="PROJECTS"
            animateOn="view"
            sequential={true}
            revealDirection="center"
            speed={80}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            className="text-white/90"
            encryptedClassName="text-white/25"
          />
        </h2>

        <Carousel slides={slides} />
      </div>
    </section>
  );
}
