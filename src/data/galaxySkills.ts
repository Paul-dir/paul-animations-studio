export type GalaxySkill = {
  name: string;
  level: number; // 0-100
  color: string; // hex or hsl
  description: string;
  orbit: number; // ring index (1..3)
  angle: number; // starting angle in degrees
  duration: number; // seconds per full orbit
};

const galaxySkills: GalaxySkill[] = [
  { name: "React",   level: 92, color: "#61DAFB", description: "Hooks, context, performance, component architecture", orbit: 1, angle: 0,   duration: 28 },
  { name: "TypeScript", level: 82, color: "#3178C6", description: "Type-safe apps, generics, strict mode", orbit: 1, angle: 180, duration: 28 },
  { name: "Next.js", level: 85, color: "#ffffff", description: "SSR, ISR, App Router, edge functions", orbit: 2, angle: 45,  duration: 42 },
  { name: "Node.js", level: 80, color: "#68A063", description: "REST APIs, Express, async patterns", orbit: 2, angle: 165, duration: 42 },
  { name: "Java",    level: 78, color: "#F89820", description: "Spring Boot, OOP, backend services", orbit: 2, angle: 285, duration: 42 },
  { name: "Python",  level: 72, color: "#FFD43B", description: "Automation, scripting, data tooling", orbit: 3, angle: 30,  duration: 60 },
  { name: "Flutter", level: 70, color: "#54C5F8", description: "Cross-platform mobile apps with Dart", orbit: 3, angle: 120, duration: 60 },
  { name: "PHP",     level: 68, color: "#8892BF", description: "Laravel, legacy systems, server-side rendering", orbit: 3, angle: 210, duration: 60 },
  { name: "Tailwind",level: 95, color: "#38BDF8", description: "Utility-first styling, custom design systems", orbit: 3, angle: 300, duration: 60 },
];

export default galaxySkills;
