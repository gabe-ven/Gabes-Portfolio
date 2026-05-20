"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import ProjectFlipCard, { type FlipProject } from "@/components/ProjectFlipCard";

export type SlideData = Omit<FlipProject, "image"> & {
  src: string;
};

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>(undefined);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      slideRef.current.style.setProperty("--x", `${xRef.current}px`);
      slideRef.current.style.setProperty("--y", `${yRef.current}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const isActive = current === index;
  const project: FlipProject = {
    title: slide.title,
    description: slide.description,
    image: slide.src,
    imageBg: slide.imageBg,
    tags: slide.tags,
    github: slide.github,
    demo: slide.demo,
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d] flex-shrink-0">
      <li
        ref={slideRef}
        className="relative w-[min(70vmin,50vh)] h-[min(70vmin,50vh)] mx-[4vmin] rounded-[1%] overflow-hidden cursor-pointer"
        onClick={() => {
          if (!isActive) handleSlideClick(index);
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isActive ? "scale(1) rotateX(0deg)" : "scale(0.98) rotateX(8deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute inset-0 transition-all duration-150 ease-out"
          style={{
            transform:
              isActive && !isFlipped
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <ProjectFlipCard
            project={project}
            isActive={isActive}
            onFlipChange={setIsFlipped}
            className="h-full w-full"
          />
        </div>
      </li>
    </div>
  );
};


interface CarouselControlProps {
  type: "previous" | "next";
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({ type, title, handleClick }: CarouselControlProps) => (
  <button
    className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-800 border border-white/15 rounded-full hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
      type === "previous" ? "rotate-180" : ""
    }`}
    title={title}
    onClick={handleClick}
  >
    <IconArrowNarrowRight className="text-white" />
  </button>
);

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const n = slides.length;
  const CLONES = 2;
  // 2 clones on each end so both neighbors are visible even mid-wrap animation
  const extended = [
    slides[n - 2], slides[n - 1],
    ...slides,
    slides[0], slides[1],
  ];

  // Start at CLONES (the real first slide)
  const [current, setCurrent] = useState(CLONES);
  const [animated, setAnimated] = useState(true);

  const goTo = (index: number) => {
    setAnimated(true);
    setCurrent(index);
  };

  // After animating to a clone region, snap instantly to the real equivalent.
  // Guard against child Slide transitions (0.5s) bubbling up and firing early.
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLUListElement>) => {
    if (e.target !== e.currentTarget) return;
    if (current < CLONES) {
      setAnimated(false);
      setCurrent(current + n);
    } else if (current > n + CLONES - 1) {
      setAnimated(false);
      setCurrent(current - n);
    }
  };

  useEffect(() => {
    if (!animated) {
      const t = setTimeout(() => setAnimated(true), 20);
      return () => clearTimeout(t);
    }
  }, [animated]);

  const id = useId();

  return (
    <div className="flex flex-col items-center gap-6 w-full" aria-labelledby={`carousel-heading-${id}`}>
      {/* Track */}
      <div className="w-full overflow-hidden">
        <ul
          className="flex"
          style={{
            // margin-left 50% = half of parent width, then subtract leftMargin + halfCard
            // so card[0]'s center lands at the container's midpoint
            marginLeft: `calc(50% - 4vmin - min(35vmin, 25vh))`,
            transform: `translateX(calc(-${current} * (min(70vmin, 50vh) + 8vmin)))`,
            transition: animated ? "transform 1000ms ease-in-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={(i) => {
                if (i < current) goTo(current - 1);
                else if (i > current) goTo(current + 1);
              }}
            />
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <CarouselControl type="previous" title="Previous" handleClick={() => goTo(current - 1)} />
        <CarouselControl type="next" title="Next" handleClick={() => goTo(current + 1)} />
      </div>
    </div>
  );
}
