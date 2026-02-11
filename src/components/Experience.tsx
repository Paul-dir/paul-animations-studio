import { Briefcase, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Experience = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const experiences = [
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2023 - Present",
      description:
        "Building custom web applications for clients using React, Next.js, and modern web technologies. Delivered multiple successful projects including task management systems and business websites.",
      achievements: [
        "Completed 5+ client projects with 100% satisfaction",
        "Specialized in React and Next.js applications",
        "Implemented responsive designs and modern UI/UX",
      ],
    },
    {
      title: "Web Development Projects",
      company: "Academic & Personal",
      period: "2022 - 2023",
      description:
        "Developed various web applications as part of academic curriculum and personal learning journey. Focused on modern frontend frameworks and backend integration.",
      achievements: [
        "Built task manager with Firebase backend",
        "Created garage management system",
        "Developed multiple landing pages and portfolios",
      ],
    },
    {
      title: "Software Engineering Student",
      company: "Haramaya University",
      period: "2021 - Present",
      description:
        "Pursuing Bachelor's degree in Software Engineering with focus on web development, algorithms, and software design patterns.",
      achievements: [
        "4th year student with strong academic performance",
        "Active participation in coding projects",
        "Continuous learning of new technologies",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 px-4 relative" ref={elementRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading">
            Experience & <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey and educational background
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative pl-10 md:pl-14 pb-14 last:pb-0 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />

              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-2.5 h-2.5 bg-primary rounded-full -translate-x-[4.5px] ring-4 ring-background shadow-[0_0_12px_hsl(var(--primary)/0.4)]" />

              <div className="glass-card p-7 rounded-2xl hover:glow-effect transition-all hover:scale-[1.02] duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-primary">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-medium text-sm">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2 md:mt-0 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{exp.description}</p>

                <div className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                      <p className="text-foreground/80 text-sm">{achievement}</p>
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
