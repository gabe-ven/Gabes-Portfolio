import type { ReactNode } from "react";
import * as Si from "react-icons/si";
import * as Fa from "react-icons/fa";
import skillsData from "@/app/data/skills.json";
import type { LogoItem } from "@/components/LogoLoop";

type IconComponent = React.ComponentType<{ style?: React.CSSProperties; className?: string; "aria-hidden"?: boolean }>;

const icons: Record<string, IconComponent> = { ...Si, ...Fa };

const WHITE = "rgba(255,255,255,0.88)";

/** Icons with baked-in backgrounds that read as boxes on dark UI */
const TEXT_ONLY_ICONS = new Set(["SiCplusplus", "SiNextdotjs"]);

function skillNode(skill: { name: string; icon: string }): ReactNode {
  if (TEXT_ONLY_ICONS.has(skill.icon)) {
    const label =
      skill.icon === "SiNextdotjs"
        ? "Next"
        : skill.name === "SFML"
          ? "SFML"
          : "C++";
    return (
      <span className="skill-text-logo" style={{ color: WHITE }} aria-hidden>
        {label}
      </span>
    );
  }

  const Icon = icons[skill.icon];
  if (!Icon) {
    return (
      <span className="skill-text-logo" style={{ color: WHITE }}>
        {skill.name}
      </span>
    );
  }

  return <Icon className="skill-icon-logo" style={{ color: WHITE, display: "block" }} aria-hidden />;
}

export function buildSkillLogos(): LogoItem[] {
  return skillsData.categories.flatMap((category) =>
    category.skills.map((skill) => ({
      node: skillNode(skill),
      title: skill.name,
    })),
  );
}
