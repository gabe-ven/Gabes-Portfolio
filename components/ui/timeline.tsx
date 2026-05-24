"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  heading,
  subheading,
  scrollContainer,
}: {
  data: TimelineEntry[];
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  scrollContainer?: React.RefObject<HTMLDivElement | null>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    container: scrollContainer,
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      {(heading || subheading) && (
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          {heading}
          {subheading}
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#09090e] flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-white/10 border border-white/20 p-2" />
              </div>
              <h3
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white/50"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className="md:hidden block text-2xl mb-4 text-left font-bold text-white/50"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-white/20 overflow-hidden">
          <motion.div
            style={{ height: heightTransform, opacity: 1 }}
            className="absolute inset-x-0 top-0 w-[2px] bg-white rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
