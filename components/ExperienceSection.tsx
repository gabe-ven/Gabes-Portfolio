"use client";

import Image from "next/image";
import { createContext, useContext, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Timeline } from "@/components/ui/timeline";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import DecryptedText from "./DecryptedText";

const ScrollContainerContext = createContext<React.RefObject<HTMLDivElement | null>>({ current: null });

const experiences = [
  {
    dateLabel: "Jun '26",
    company: "BS Code",
    title: "Software Engineer Intern",
    period: "Jun 2026 – Aug 2026",
    location: "Tokyo, Japan",
    logo: "bscode-logo.png",
    skills: ["TypeScript", "React", "Software Engineering"],
  },
  {
    dateLabel: "Jan '26",
    company: "GenServe.AI",
    title: "AI Platform Testing Intern",
    period: "Jan 2026 – Apr 2026",
    location: "Remote",
    logo: "genserve.jpeg",
    skills: ["AI", "Testing", "QA"],
  },
  {
    dateLabel: "Oct '25",
    company: "AI Collective",
    title: "Software Engineer Associate",
    period: "Oct 2025 – Present",
    location: "Davis, CA",
    logo: "aicollective.png",
    skills: ["AI", "LLMs", "Python", "Next.js"],
  },
  {
    dateLabel: "Oct '25",
    company: "#include at Davis",
    title: "Frontend Developer",
    period: "Oct 2025 – Present",
    location: "Davis, CA",
    logo: "include.jpeg",
    circular: true,
    skills: ["React", "TypeScript", "Tailwind"],
  },
  {
    dateLabel: "Feb '25",
    company: "NASA JPL",
    title: "Software Engineer Intern",
    period: "Feb 2025 – Sep 2026",
    location: "Pasadena, CA",
    logo: "nasa_jpl.jpg",
    whiteBg: true,
    skills: ["Python", "C++", "Systems"],
  },
  {
    dateLabel: "Aug '22",
    company: "Mathnasium",
    title: "Math Instructor",
    period: "Aug 2022 – Aug 2024",
    location: "La Cañada, CA",
    logo: "mathnasium.jpg",
    whiteBg: true,
    skills: ["Teaching", "Curriculum Design"],
  },
];

const HANDOFF_COOLDOWN = 700;

function ExperienceCard({ exp }: { exp: typeof experiences[0] }) {
  const scrollContainer = useContext(ScrollContainerContext);
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateXRaw = useMotionValue(22);
  const opacityRaw = useMotionValue(0.3);
  const rotateX = useSpring(rotateXRaw, { stiffness: 160, damping: 26 });
  const opacity  = useSpring(opacityRaw,  { stiffness: 160, damping: 26 });

  useEffect(() => {
    const container = scrollContainer.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const update = () => {
      const cRect = container.getBoundingClientRect();
      const kRect = card.getBoundingClientRect();
      const containerCenter = cRect.top + cRect.height / 2;
      const cardCenter = kRect.top + kRect.height / 2;

      // How far the card center is from the container center, normalised to [0,1]
      // 0 = card is centred (flat), 1 = card is a full half-height away (fully tilted)
      const distFromCenter = cardCenter - containerCenter;
      const halfH = cRect.height / 2;
      const progress = Math.max(0, Math.min(1, distFromCenter / halfH));

      rotateXRaw.set(22 * progress);
      opacityRaw.set(Math.max(0.3, 1 - progress * 0.7));
    };

    update();
    container.addEventListener("scroll", update, { passive: true });
    return () => container.removeEventListener("scroll", update);
  }, [scrollContainer, rotateXRaw, opacityRaw]);

  return (
    <div ref={cardRef} style={{ perspective: "1200px" }}>
      <motion.div style={{ rotateX, opacity, transformStyle: "preserve-3d" }}>
        <CardContainer containerClassName="w-fit mx-auto" className="inter-var">
          <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-white/[0.1] bg-black border-white/[0.2] w-[min(90vw,32rem)] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ={80}
              className="text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {exp.company}
            </CardItem>
            <CardItem as="p" translateZ={60} className="text-neutral-400 text-sm mt-2">
              {exp.title}
            </CardItem>
            <CardItem translateZ={100} className="w-full mt-4">
              <div className="h-72 w-full rounded-xl overflow-hidden flex items-center justify-center bg-white p-4">
                <Image
                  src={`/logos/${exp.logo}`}
                  alt={exp.company}
                  width={1200}
                  height={1200}
                  quality={100}
                  sizes="(max-width: 768px) 90vw, 32rem"
                  className={
                    exp.circular
                      ? "rounded-full w-52 h-52 object-cover scale-110"
                      : "mix-blend-multiply w-full h-full object-contain"
                  }
                />
              </div>
            </CardItem>
            <div className="flex justify-between items-center mt-6">
              <CardItem translateZ={50} className="text-xs font-mono text-neutral-500">
                {exp.period}
              </CardItem>
              <CardItem translateZ={50} className="text-xs text-neutral-500">
                {exp.location}
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </motion.div>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const handingOffRef = useRef(false);

  const handoff = useCallback((direction: "up" | "down") => {
    if (handingOffRef.current) return;
    handingOffRef.current = true;
    setTimeout(() => { handingOffRef.current = false; }, HANDOFF_COOLDOWN);
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const idx = sections.indexOf(sectionRef.current!);
    const target = direction === "up" ? sections[idx - 1] : sections[idx + 1];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const atTop    = el.scrollTop <= 2;
      const atBottom = el.scrollTop >= el.scrollHeight - el.clientHeight - 2;
      if (e.deltaY < 0 && atTop)    { e.preventDefault(); handoff("up");   return; }
      if (e.deltaY > 0 && atBottom) { e.preventDefault(); handoff("down"); return; }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [handoff]);

  const data = experiences.map((exp) => ({
    title: exp.dateLabel,
    content: <ExperienceCard exp={exp} />,
  }));

  return (
    <ScrollContainerContext.Provider value={scrollRef}>
      <section
        ref={sectionRef}
        id="experience"
        style={{ height: "100svh", overflow: "hidden", scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        <div
          ref={scrollRef}
          style={{ height: "100%", overflowY: "scroll", scrollbarWidth: "none" }}
        >
          <Timeline
            data={data}
            scrollContainer={scrollRef}
            heading={
              <h2
                className="text-4xl md:text-5xl font-semibold tracking-[0.18em] uppercase"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <DecryptedText
                  text="EXPERIENCE"
                  animateOn="view"
                  sequential
                  revealDirection="center"
                  speed={80}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                  className="text-white/90"
                  encryptedClassName="text-white/25"
                />
              </h2>
            }
          />
        </div>
      </section>
    </ScrollContainerContext.Provider>
  );
}
