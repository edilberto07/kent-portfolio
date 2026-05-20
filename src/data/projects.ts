export type ProjectBadge = "WEB" | "MOBILE" | "GAME" | "HW";

export type Project = {
  id: string;
  title: string;
  badge: ProjectBadge;
  stack: string;
  /** Path under /public/images — TODO: add screenshot per project */
  image: string;
  /** TODO: Add live demo URL when available */
  liveUrl?: string;
  /** TODO: Add repository URL when available */
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    id: "bisu-payroll",
    title: "BISU Payroll System",
    badge: "WEB",
    stack: "Next.js · Laravel · MySQL",
    image: "/images/bisu-payroll.png",
    // TODO: Add liveUrl and repoUrl
  },
  {
    id: "folk-dance-ai",
    title: "Folk Dance AI App",
    badge: "MOBILE",
    stack: "Flutter · AI/ML",
    image: "/images/folk-dance-ai.png",
    // TODO: Add liveUrl and repoUrl
  },
  {
    id: "motor-parts-ecommerce",
    title: "Motor Parts E-Commerce",
    badge: "WEB",
    stack: "Next.js · Laravel",
    image: "/images/motor-parts-ecommerce.png",
    // TODO: Add liveUrl and repoUrl
  },
  {
    id: "barmmhrs-survey",
    title: "BARMMHRS Survey System",
    badge: "MOBILE",
    stack: "Expo · React Native",
    image: "/images/barmmhrs-survey.png",
    // TODO: Add liveUrl and repoUrl
  },
  {
    id: "rpg-game",
    title: "RPG Game",
    badge: "GAME",
    stack: "Godot Engine",
    image: "/images/rpg-game.png",
    // TODO: Add liveUrl and repoUrl
  },
  {
    id: "arduino-insect-bot",
    title: "Arduino Insect Bot",
    badge: "HW",
    stack: "Arduino · C++",
    image: "/images/arduino-insect-bot.png",
    // TODO: Add liveUrl and repoUrl
  },
  {
    id: "real-estate-website",
    title: "Real Estate Website",
    badge: "WEB",
    stack: "PHP",
    image: "/images/real-estate-website.png",
    // TODO: Add liveUrl and repoUrl
  },
];

/** Badge display colors (matches design system) */
export const badgeStyles: Record<
  ProjectBadge,
  { color: string; className: string }
> = {
  WEB: { color: "#38bdf8", className: "badge-web" },
  MOBILE: { color: "#34d399", className: "badge-mobile" },
  GAME: { color: "#fbbf24", className: "badge-game" },
  HW: { color: "#f87171", className: "badge-hw" },
};
