import { Briefcase, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Experience = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const experiences = [
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2023 - Present",
      description: "Building custom web applications for clients using React, Next.js, and modern web technologies. Delivered multiple successful projects including task management systems and business websites.",
      achievements: [
        "Completed 5+ client projects with 100% satisfaction",
        "Specialized in React and Next.js applications",
        "Implemented responsive designs and modern UI/UX"
      ]
    },
    {
      title: "Web Development Projects",
      company: "Academic & Personal",
      period: "2022 - 2023",
      description: "Developed various web applications as part of academic curriculum and personal learning journey. Focused on modern frontend frameworks and backend integration.",
      achievements: [
        "Built task manager with Firebase backend",
        "Created garage management system",
        "Developed multiple landing pages and portfolios"
      ]
    },
    {
      title: "Software Engineering Student",
      company: "Haramaya University",
      period: "2021 - Present",
      description: "Pursuing Bachelor's degree in Software Engineering with focus on web development, algorithms, and software design patterns.",
      achievements: [
        "4th year student with strong academic performance",
        "Active participation in coding projects",
        "Continuous learning of new technologies"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 relative" ref={elementRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey and educational background in software development
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative pl-8 md:pl-12 pb-12 border-l-2 border-primary/30 last:pb-0 transition-all duration-1000 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full -translate-x-[9px] ring-4 ring-background"></div>
              
              <div className="glass-card p-6 rounded-xl hover:glow-effect transition-all hover:scale-[1.02] duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-primary">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2 md:mt-0">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
