export type Project = {
  id: number;
  title: string;
  image?: string;
  logo?: string;
  width?: number;
  height?: number;
  color: string;
  github?: string;
  demo?: string;
};

export const RESUME_URL = "/resume.pdf";

export const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/gabe-ven"                                                           },
  { label: "LinkedIn", href: "https://linkedin.com/in/gabriel-venezia"                                                },
  { label: "Email",    href: "mailto:gabrielvenezia6@gmail.com"                                                        },
] as const;

export const PROJECTS: Project[] = [
  {
    id: 9,
    title: "twiice",
    logo: "/logos/twiice_logo_blue.png",
    width: 1024,
    height: 1024,
    color: "#1a1a1a",
    github: "https://github.com/AICollectiveDavis/clothing-overconsumption-preventer",
    demo:   "https://apps.apple.com/us/app/twiice/id6763200948",
  },
  {
    id: 10,
    title: "Yesterday Vintage",
    logo: "/logos/568685580_17944584729071475_672046258409409050_n.jpg",
    width: 800,
    height: 800,
    color: "#1e2027",
    github: "https://github.com/include-davis/yesterday-vintage",
    demo:   "https://yesterdaydavis.com",
  },
  {
    id: 0,
    title: "LabLink",
    image: "/lablink.png",
    width: 2934,
    height: 1548,
    color: "#111",
    github: "https://github.com/vish2285/LabLink",
    demo:   "https://www.lablinkdavis.org/",
  },
  {
    id: 1,
    title: "Vymix",
    image: "/vymix.png",
    width: 1000,
    height: 1000,
    color: "#0d0d0d",
    github: "https://github.com/gabe-ven/Vymix",
  },
  {
    id: 2,
    title: "AniLog",
    image: "/anilog.png",
    width: 1811,
    height: 941,
    color: "#0d0f14",
    github: "https://github.com/gabe-ven/Anilog",
    demo: "https://gabe-ven.github.io/Anilog/",
  },
  {
    id: 3,
    title: "Graphing Calculator",
    image: "/gc.png",
    width: 1355,
    height: 947,
    color: "#0a0f0a",
    github: "https://github.com/gabe-ven/SFML-Graphing-Calculator",
  },
  {
    id: 4,
    title: "DSA Visualizer",
    image: "/puzzle.png",
    width: 654,
    height: 653,
    color: "#0f0a14",
    github: "https://github.com/gabe-ven/DSA-Showcase",
  },
  {
    id: 5,
    title: "Gabe's Arcade",
    image: "/arcade.png",
    width: 882,
    height: 922,
    color: "#0a0a14",
    github: "https://github.com/gabe-ven/Arcade-Project",
    demo: "https://gabe-ven.github.io/Arcade-Project/",
  },
  {
    id: 6,
    title: "Bookstore Management System",
    image: "/bookstore.jpg",
    width: 5000,
    height: 3333,
    color: "#100a08",
    github: "https://github.com/gabe-ven/Online-Bookstore-Management-System",
  },
];
