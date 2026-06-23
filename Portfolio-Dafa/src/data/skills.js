import {
  iconReact, iconTs, iconTailwind, iconCss,
  iconNode, iconLaravel, iconRest, iconPython,
  iconMongo, iconDocker, iconK8s, iconVmware,
} from "./assets";

// ─── DATA: SKILLS ─────────────────────────────────────────────────
export const SKILLS_GROUPS = [
  {
    label: "Frontend",
    color: "accent",
    icon: "◈",
    items: [
      { name: "React JS", level: 90, icon: iconReact },
      { name: "TypeScript", level: 80, icon: iconTs },
      { name: "Tailwind CSS", level: 78, icon: iconTailwind },
      { name: "CSS / HTML", level: 80, icon: iconCss },
    ],
  },
  {
    label: "Backend",
    color: "violet",
    icon: "◉",
    items: [
      { name: "Node.js / Express", level: 88, icon: iconNode },
      { name: "Laravel", level: 78, icon: iconLaravel },
      { name: "REST API Design", level: 90, icon: iconRest },
      { name: "Python / FastAPI", level: 70, icon: iconPython },
    ],
  },
  {
    label: "Infra",
    color: "green",
    icon: "◌",
    items: [
      { name: "MongoDB", level: 80, icon: iconMongo },
      { name: "Docker", level: 74, icon: iconDocker },
      { name: "K8s", level: 72, icon: iconK8s },
      { name: "VmWare", level: 75, icon: iconVmware },
    ],
  },
];

export const SKILL_TOOLS = [
  "Git", "CI/CD", "AWS", "Vercel", "Figma", "Supabase",
  "PostgreSQL", "Prisma", "Vitest", "Nx", "Mysql",
];