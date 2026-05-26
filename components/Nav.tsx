"use client";

import StaggeredMenu from "./StaggeredMenu";

const NAV_ITEMS = [
  { label: "Home",       ariaLabel: "Go to top",           link: "#"           },
  { label: "About",      ariaLabel: "About me",            link: "#about"      },
  { label: "Experience", ariaLabel: "My experience",       link: "#experience" },
  { label: "Projects",   ariaLabel: "View my projects",    link: "#projects"   },
  { label: "Photos",     ariaLabel: "Browse my photos",    link: "#photos"     },
  { label: "Contact",    ariaLabel: "Get in touch",        link: "#contact"    },
];

const SOCIAL_ITEMS = [
  { label: "GitHub",   link: "https://github.com/gabe-ven"                  },
  { label: "LinkedIn", link: "https://linkedin.com/in/gabriel-venezia"       },
  { label: "Email",    link: "mailto:gabrielvenezia6@gmail.com"              },
];

export default function Nav() {
  return (
    <StaggeredMenu
      position="right"
      isFixed={true}
      items={NAV_ITEMS}
      socialItems={SOCIAL_ITEMS}
      displaySocials={true}
      displayItemNumbering={true}
      logo={
        <span style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.02em", color: "#ffffff" }}>
          gv.
        </span>
      }
      menuButtonColor="#ffffff"
      openMenuButtonColor="#ffffff"
      colors={["#e8c4b8", "#D97D5B"]}
      accentColor="#D97D5B"
      changeMenuColorOnOpen={false}
    />
  );
}
