"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useState } from "react";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  imageBg?: string;
  github?: string;
  demo?: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const getRotation = (index: number) => Math.round(Math.sin(index * 2.5 + 1) * 8);
  const activeItem = testimonials[active];

  return (
    <div className="mx-auto w-full max-w-sm px-4 pb-12 pt-4 font-sans antialiased md:max-w-5xl md:px-8 md:pb-16 lg:max-w-6xl lg:px-10">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* Image stack */}
        <div className="w-full">
          <div className="relative mx-auto h-72 w-full max-w-sm md:h-80 md:max-w-none">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: getRotation(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : getRotation(index),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: getRotation(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <motion.div
                    className="h-full w-full overflow-hidden rounded-3xl"
                    style={{
                      backgroundColor: testimonial.imageBg ?? "#0a0a0a",
                    }}
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className={`h-full w-full rounded-3xl ${
                        testimonial.imageBg
                          ? "object-contain object-center p-5"
                          : "object-cover object-center"
                      }`}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text */}
        <div className="flex min-h-[18rem] flex-col py-2 md:min-h-[20rem] md:py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex flex-col"
            >
              <h3 className="text-2xl font-bold text-black dark:text-white md:text-[1.65rem]">
                {activeItem.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">
                {activeItem.designation}
              </p>

              <motion.p className="mt-6 text-base leading-relaxed text-gray-500 line-clamp-5 dark:text-neutral-300 md:text-lg">
                {activeItem.quote.split(" ").map((word, index) => (
                  <motion.span
                    key={`${active}-${index}`}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>

              <div className="mt-6 flex min-h-[1.75rem] flex-wrap items-center gap-4">
                {activeItem.demo && (
                  <a
                    href={activeItem.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target text-sm font-medium text-amber-400 transition-colors hover:text-amber-300 md:text-base"
                    data-cursor-pad="6"
                  >
                    Live demo →
                  </a>
                )}
                {activeItem.github && (
                  <a
                    href={activeItem.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target text-sm font-medium text-white/55 transition-colors hover:text-white/90 md:text-base"
                    data-cursor-pad="6"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        </div>

        <div className="flex items-center justify-center gap-6 pt-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous project"
            className="group/button flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
          >
            <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-300" />
          </button>
          <span className="min-w-[3.5rem] text-center font-mono text-xs tracking-widest text-neutral-500">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next project"
            className="group/button flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
          >
            <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
