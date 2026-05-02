export type RadarSkill = {
  name: string;
  level: number;
  description: string;
};

const radarSkills: RadarSkill[] = [
  { name: "React", level: 92, description: "Component architecture, hooks, state management, performance optimization" },
  { name: "TypeScript", level: 80, description: "Type-safe development, generics, utility types, strict mode" },
  { name: "Tailwind", level: 95, description: "Utility-first styling, custom design systems, responsive layouts" },
  { name: "Backend", level: 83, description: "Supabase, Firebase, REST APIs, authentication flows" },
  { name: "UI/UX", level: 87, description: "Figma, responsive design, accessibility, micro-interactions" },
  { name: "DevOps", level: 85, description: "Git workflows, Vercel deployments, CI/CD, monitoring" },
];

export default radarSkills;
