import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Helper to compute duration string from a start date to an end date (or now)
const getDuration = (startDate: string, endDate?: string | null) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();
  if (months < 1) months = 1;

  if (months < 12) return `${months} ${months === 1 ? 'mo' : 'mos'}`;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (remainingMonths === 0) return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
  return `${years} ${years === 1 ? 'yr' : 'yrs'} ${remainingMonths} mos`;
};

const Experience = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const experiences = [
    {
      title: "Software Development Intern",
      company: "Information Network Security Administration (INSA)",
      location: "Ethiopia",
      startDate: "2026-02-01",
      endDate: null,
      description: "Working as a software development intern, contributing to real-world projects and systems while improving skills in web development.",
      achievements: [
        "Contributing to real-world projects and systems",
        "Improving skills in web development (Frontend & Backend)",
        "Collaborating with team members and learning industry practices",
        "Gaining experience in problem-solving and system design"
      ],
      logo: "/insa-logo.png"
    },
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      startDate: "2023-01-01",
      endDate: null,
      description: "Building custom web applications for clients using React, Next.js, and modern web technologies. Delivered multiple successful projects including task management systems and business websites.",
      achievements: [
        "Completed 5+ client projects with 100% satisfaction",
        "Specialized in React and Next.js applications",
        "Implemented responsive designs and modern UI/UX"
      ]
    },
    {
      title: "Software Engineering Student",
      company: "Haramaya University",
      location: "Ethiopia",
      startDate: "2021-09-01",
      endDate: null,
      description: "Pursuing Bachelor's degree in Software Engineering with focus on full‑stack development.",
      achievements: [
        "4th year student with strong academic performance",
        "Active participation in coding projects",
        "Continuous learning of new technologies"
      ],
      logo: "/haramaya-logo.png"
    },
    {
      title: "Web Development Projects",
      company: "Academic & Personal",
      startDate: "2022-01-01",
      endDate: "2023-12-31",
      description: "Developed various web applications as part of academic curriculum and personal projects.",
      achievements: [
        "Built task manager with Firebase backend",
        "Created garage management system",
        "Developed multiple landing pages and portfolios"
      ]
    }
  ];

  const enrichedExperiences = experiences.map(exp => {
    const duration = getDuration(exp.startDate, exp.endDate);
    const endLabel = exp.endDate ? null : "Present";
    return { ...exp, duration, endLabel };
  });

  return (
    <section id="experience" className="py-20 px-4 relative" ref={elementRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey and educational background in software development.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Continuous timeline line */}
          <div className="absolute left-[7px] md:left-[7px] top-0 bottom-0 w-0.5 bg-primary/30" />

          {enrichedExperiences.map((exp, index) => (
            <div
              key={index}
              className={`relative pl-10 md:pl-14 pb-12 last:pb-0 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline dot - at the top of each card */}
              <div className="absolute left-0 top-6 w-4 h-4 bg-primary rounded-full -translate-x-[0.5px] ring-4 ring-background z-10">
                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
              </div>

              <div className="glass-card p-6 rounded-xl hover:glow-effect transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-3">
                  <div className="flex items-start gap-3">
                    {exp.logo && (
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="h-10 w-10 rounded-lg object-contain bg-white/10 p-1 flex-shrink-0"
                        loading="lazy"
                        width={40}
                        height={40}
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-primary">
                        {!exp.logo && <Briefcase className="h-4 w-4" />}
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground text-sm flex-shrink-0">
                    <Calendar className="h-4 w-4" />
                    {exp.endLabel && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                        {exp.endLabel}
                      </span>
                    )}
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                      {exp.duration}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-foreground/80">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Bottom timeline cap dot */}
          <div className="absolute left-0 bottom-0 w-4 h-4 bg-primary/50 rounded-full -translate-x-[0.5px] ring-4 ring-background z-10" />
          {/* Top timeline cap dot */}
          <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full -translate-x-[0.5px] ring-4 ring-background z-10" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
