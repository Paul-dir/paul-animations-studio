import { Briefcase, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Helper to compute duration string from a start date (YYYY-MM-DD)
const getDuration = (startDate: string) => {
  const start = new Date(startDate);
  const now = new Date();

  let months = (now.getFullYear() - start.getFullYear()) * 12;
  months += now.getMonth() - start.getMonth();

  if (months < 12) return `${months} ${months === 1 ? 'mo' : 'mos'}`;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (remainingMonths === 0) return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
  return `${years} ${years === 1 ? 'yr' : 'yrs'} ${remainingMonths} mos`;
};

// Format month-year: e.g., "Feb 2026"
const formatMonthYear = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const Experience = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  // Experience data – only one copy, with computed durations
  const experiences = [
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      startDate: "2023-01-01",   // adjust as needed
      endDate: null,             // null = present
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
      startDate: "2022-01-01",
      endDate: "2023-12-31",
      description: "Developed various web applications as part of academic curriculum and personal projects.",
      achievements: [
        "Built task manager with Firebase backend",
        "Created garage management system",
        "Developed multiple landing pages and portfolios"
      ]
    },
    {
      title: "Software Engineering Student",
      company: "Haramaya University",
      startDate: "2021-09-01",
      endDate: null,
      description: "Pursuing Bachelor's degree in Software Engineering with focus on full‑stack development.",
      achievements: [
        "4th year student with strong academic performance",
        "Active participation in coding projects",
        "Continuous learning of new technologies"
      ]
    },
    {
      title: "Software Engineer Intern",
      company: "Information Network Security Administration (INSA)",
      startDate: "2026-02-01",
      endDate: null,
      description: "Collaborating with senior engineers on real‑world software projects, working with Java, Python, MySQL, and web technologies.",
      achievements: [
        "Collaborated with senior engineers on real‑world software projects",
        "Developed applications using Java and Python",
        "Worked with MySQL for database design and queries",
        "Contributed to web-based systems and participated in code reviews"
      ],
      logo: "/insa-logo.png"
    }
  ];

  // Build period and duration strings dynamically
  const enrichedExperiences = experiences.map(exp => {
    const start = new Date(exp.startDate);
    const startStr = formatMonthYear(start);
    const end = exp.endDate ? new Date(exp.endDate) : null;
    const endStr = end ? formatMonthYear(end) : "Present";
    const period = `${startStr} – ${endStr}`;
    const duration = end ? getDuration(exp.startDate) : getDuration(exp.startDate); // always compute from start to now
    return { ...exp, period, duration };
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

        <div className="max-w-4xl mx-auto">
          {enrichedExperiences.map((exp, index) => (
            <div
  key={index}
  className={`relative pl-8 md:pl-12 pb-12 border-l-2 border-primary/30 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
  style={{ animationDelay: `${index * 0.2}s` }}
>
              {/* Timeline dot */}
              <div className="absolute left-0 bottom-0 w-4 h-4 bg-primary rounded-full -translate-x-1/2 translate-y-1/2" />
              <div className="glass-card p-6 rounded-xl hover:glow-effect transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-primary">
                      {exp.logo ? (
                        <img src={exp.logo} alt={exp.company} className="h-5 w-5 object-contain" />
                      ) : (
                        <Briefcase className="h-4 w-4" />
                      )}
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.period}</span>
                    <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">
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
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
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
