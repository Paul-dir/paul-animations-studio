import { Code2, Palette, Database, Wrench } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Skills = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
      color: "from-primary to-primary-glow"
    },
    {
      icon: Palette,
      title: "Design",
      skills: ["Responsive Design", "UI/UX Principles", "Modern Layouts"],
      color: "from-primary-glow to-primary"
    },
    {
      icon: Database,
      title: "Backend & Database",
      skills: ["Firebase", "RESTful APIs", "Database Management"],
      color: "from-primary to-accent"
    },
    {
      icon: Wrench,
      title: "Tools & Others",
      skills: ["Git", "GitHub", "VS Code", "Vercel Deployment"],
      color: "from-accent to-primary-glow"
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 relative" ref={elementRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary-glow/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg">Technologies I work with to build amazing projects</p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`glass-card p-6 rounded-xl hover:glow-effect transition-all hover:scale-110 hover:-translate-y-3 duration-300 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${index * 0.15}s`,
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${category.color} mb-4`}>
                <category.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-secondary text-sm text-foreground/80 hover:bg-primary/20 hover:text-primary transition-colors"
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
