import type { ReactNode, CSSProperties, ForwardRefExoticComponent, RefAttributes, MouseEvent } from "react";

export interface CardProps {
  customClass?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  [key: string]: unknown;
}

export declare const Card: ForwardRefExoticComponent<CardProps & RefAttributes<HTMLDivElement>>;

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
}

declare const CardSwap: (props: CardSwapProps) => JSX.Element;
export default CardSwap;
