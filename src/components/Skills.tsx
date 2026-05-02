import { Code2, Palette, Database, Wrench } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SkillsRadar from "@/components/SkillsRadar";

type Skill = { name: string; level: number };
type Category = {
  icon: typeof Code2;
  title: string;
  skills: Skill[];
};

const Skills = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const skillCategories: Category[] = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: [
        { name: "React.js", level: 92 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 95 },
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "HTML5 / CSS3", level: 95 },
      ],
    },
    {
      icon: Palette,
      title: "Design & UI/UX",
      skills: [
        { name: "Responsive Design", level: 92 },
        { name: "UI/UX Principles", level: 85 },
        { name: "Figma", level: 80 },
        { name: "Color Theory", level: 78 },
        { name: "Modern Layouts", level: 88 },
      ],
    },
    {
      icon: Database,
      title: "Backend & Database",
      skills: [
        { name: "Supabase", level: 85 },
        { name: "Firebase", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "RESTful APIs", level: 85 },
        { name: "Authentication", level: 82 },
      ],
    },
    {
      icon: Wrench,
      title: "Tools & Workflow",
      skills: [
        { name: "Git / GitHub", level: 90 },
        { name: "VS Code", level: 95 },
        { name: "Vercel", level: 88 },
        { name: "NPM / Yarn", level: 85 },
        { name: "Postman", level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 relative" ref={elementRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg">Tools, frameworks, and craft I bring to every project</p>
          <div className="section-divider"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`glass-card shine p-7 rounded-2xl hover:glow-effect transition-all hover:-translate-y-1 duration-500 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 120}ms`, transitionDuration: "700ms" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex p-3 rounded-xl bg-primary/15 group-hover:bg-primary/25 group-hover:scale-110 transition-all">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>

              <ul className="space-y-4">
                {category.skills.map((skill, i) => (
                  <li key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground/90">{skill.name}</span>
                      <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-secondary/60 overflow-hidden">
                      <div
                        className="skill-fill"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 120 + i * 80 + 200}ms`,
                        }}
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${skill.name} proficiency`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
