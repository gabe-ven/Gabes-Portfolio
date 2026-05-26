import type { CSSProperties, ReactNode, RefObject } from "react";

export interface ScrollVelocityProps {
  texts?: ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: CSSProperties;
  scrollerStyle?: CSSProperties;
  scrollContainerRef?: RefObject<HTMLElement>;
}

export declare const ScrollVelocity: (props: ScrollVelocityProps) => JSX.Element;
export default ScrollVelocity;
