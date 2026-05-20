import type { ElementType, ReactNode, CSSProperties, ComponentType } from "react";
import "./StarBorder.css";

type StarBorderProps<T extends ElementType = "button"> = {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  innerClassName?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

export default function StarBorder<T extends ElementType = "button">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  innerClassName = "",
  children,
  style,
  ...rest
}: StarBorderProps<T>) {
  const Component = (as ?? "button") as ComponentType<{
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    [key: string]: unknown;
  }>;
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{ padding: `${thickness}px 0`, ...style }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={`inner-content ${innerClassName}`}>{children}</div>
    </Component>
  );
}
