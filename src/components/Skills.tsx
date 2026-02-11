import { Code2, Palette, Database, Wrench } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Skills = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Bootstrap"],
    },
    {
      icon: Palette,
      title: "Design & UI/UX",
      skills: ["Responsive Design", "UI/UX Principles", "Modern Layouts", "Figma", "Adobe XD", "Color Theory"],
    },
    {
      icon: Database,
      title: "Backend & Database",
      skills: ["Firebase", "Supabase", "RESTful APIs", "Database Design", "PostgreSQL", "Authentication"],
    },
    {
      icon: Wrench,
      title: "Tools & Workflow",
      skills: ["Git", "GitHub", "VS Code", "Vercel", "NPM/Yarn", "Chrome DevTools", "Postman"],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 relative" ref={elementRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg">Technologies I work with to build amazing projects</p>
          <div className="section-divider"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`glass-card p-7 rounded-2xl hover:glow-effect transition-all hover:scale-105 hover:-translate-y-3 duration-300 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms`, transitionDuration: "700ms" }}
            >
              <div className="inline-flex p-4 rounded-xl bg-primary/15 mb-5 group-hover:bg-primary/25 group-hover:scale-110 transition-all">
                <category.icon className="h-7 w-7 text-primary" />
              </div>

              <h3 className="text-lg font-semibold mb-4">{category.title}</h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-secondary/80 text-xs font-medium text-foreground/80 hover:bg-primary/20 hover:text-primary transition-colors border border-border/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
