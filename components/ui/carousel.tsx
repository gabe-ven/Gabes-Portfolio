"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
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

const ROTATE_DEPTH = 17.5;

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const isActive = current === index;

  // Reset flip when this card becomes inactive
  useEffect(() => {
    if (!isActive) setIsFlipped(false);
  }, [isActive]);

  // CometCard-style spring tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxSpring = useSpring(mx);
  const mySpring = useSpring(my);
  const rotateX = useTransform(mySpring, [-0.5, 0.5], [`-${ROTATE_DEPTH}deg`, `${ROTATE_DEPTH}deg`]);
  const rotateY = useTransform(mxSpring, [-0.5, 0.5], [`${ROTATE_DEPTH}deg`, `-${ROTATE_DEPTH}deg`]);
  const glareX = useTransform(mxSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mySpring, [-0.5, 0.5], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.9) 10%, rgba(255,255,255,0.75) 20%, rgba(255,255,255,0) 80%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!slideRef.current || !isActive || isFlipped) return;
    const r = slideRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const handleClick = () => {
    if (!isActive) {
      handleSlideClick(index);
    } else {
      setIsFlipped((f) => !f);
    }
  };

  const project: FlipProject = {
    title: slide.title,
    description: slide.description,
    image: slide.src,
    imageBg: slide.imageBg,
    tags: slide.tags,
    github: slide.github,
    demo: slide.demo,
  };

  const card = (
    <motion.li
      ref={slideRef}
      className="relative w-[min(70vmin,50vh)] h-[min(70vmin,50vh)] rounded-[1%] overflow-hidden cursor-pointer"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ scale: isActive ? 1 : 0.98 }}
      style={{
        rotateX: isActive ? rotateX : "8deg",
        rotateY: isActive ? rotateY : "0deg",
        transformOrigin: "bottom",
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <ProjectFlipCard
        project={project}
        isActive={isActive}
        flipped={isFlipped}
        onFlip={() => setIsFlipped((f) => !f)}
        className="h-full w-full"
      />
      {isActive && !isFlipped && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 rounded-[1%] mix-blend-overlay"
          style={{ background: glareBackground, opacity: 0.6 }}
        />
      )}
    </motion.li>
  );

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d] flex-shrink-0">
      <div className="mx-[4vmin]">{card}</div>
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
