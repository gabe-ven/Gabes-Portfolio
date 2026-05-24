"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

type ContainerScrollProps = {
  titleComponent?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  /** section = tall Aceternity scroll demo; inline = compact wrapper (e.g. hero terminal) */
  mode?: "section" | "inline";
};

export const ContainerScroll = ({
  titleComponent,
  children,
  className,
  cardClassName,
  mode = "section",
}: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: mode === "inline" ? ["start start", "end start"] : undefined,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.93]);

  if (mode === "inline") {
    return (
      <div
        ref={containerRef}
        className={cn("flex flex-col items-center w-full", className)}
        style={{ perspective: "1200px" }}
      >
        {titleComponent && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {titleComponent}
          </motion.div>
        )}
        <motion.div
          className="w-full"
          style={{
            rotateX: scrollRotate,
            scale: scrollScale,
            transformOrigin: "50% 0%",
            willChange: "transform",
          }}
          initial={{ rotateX: 20, scale: 0.97, opacity: 0 }}
          animate={{ rotateX: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20",
        className
      )}
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        {titleComponent && (
          <Header translate={translate} titleComponent={titleComponent} />
        )}
        <Card rotate={rotate} scale={scale} className={cardClassName}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div style={{ y: translate }} className="max-w-5xl mx-auto text-center">
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
  className,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className={cn(
        "max-w-6xl -mt-12 mx-auto h-[32rem] md:h-[44rem] w-full border-4 border-white/10 p-2 md:p-4 bg-[#1F2121] rounded-[30px] shadow-2xl",
        className
      )}
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-[#0a0a0a]/80 md:rounded-2xl md:p-3">
        {children}
      </div>
    </motion.div>
  );
};

export function ScrollAnimatedCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={cn("w-full shrink-0", className)}>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -20px 0px" }}
        transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
