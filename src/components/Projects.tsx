import { ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useMemo, useState } from "react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  link: string;
  repo?: string;
  image: string;
  category: "Web App" | "Frontend" | "Full Stack";
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "Task Manager",
    description: "A comprehensive task management application with user-friendly interface for organizing and tracking daily tasks efficiently.",
    tech: ["React", "Next.js", "Tailwind CSS"],
    link: "https://task-manager-five-psi-75.vercel.app/",
    repo: "https://github.com/Paul-dir",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop",
    category: "Web App",
    featured: true,
  },
  {
    title: "Garage123",
    description: "A modern garage management system designed to streamline vehicle service tracking and customer management.",
    tech: ["React", "Firebase", "CSS"],
    link: "https://garage-aid-i6gc.vercel.app/",
    repo: "https://github.com/Paul-dir",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "E-Commerce Platform",
    description: "Full-featured online shopping platform with product catalog, cart management, and secure checkout process.",
    tech: ["Next.js", "TypeScript", "Stripe"],
    link: "https://github.com/Paul-dir",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop",
    category: "Full Stack",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application with detailed forecasts, interactive maps, and location-based weather alerts.",
    tech: ["React", "OpenWeather API", "Chart.js"],
    link: "https://github.com/Paul-dir",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop",
    category: "Web App",
  },
  {
    title: "MyPortfolio",
    description: "A personal portfolio website showcasing my projects and skills with a clean and modern design.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://paul-dir.github.io/myPortfolio/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    category: "Frontend",
  },
  {
    title: "Kalkidan Cup Cafe",
    description: "An elegant website for a local cafe featuring menu items, location information, and online ordering capabilities.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://paul-dir.github.io/Kalkidan-cup-cafe/",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop",
    category: "Frontend",
  },
];

const CATEGORIES = ["All", "Web App", "Full Stack", "Frontend"] as const;
type Category = (typeof CATEGORIES)[number];

const Projects = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [filter, setFilter] = useState<Category>("All");

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="py-24 px-4 relative" ref={elementRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">A selection of recent work — filter by category</p>
          <div className="section-divider"></div>
        </div>

        {/* Filter chips */}
        <div
          role="tablist"
          aria-label="Project category filter"
          className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {CATEGORIES.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300
                  ${active
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_hsl(var(--primary)/0.4)] scale-105"
                    : "bg-card/30 border-border/60 text-foreground/80 hover:border-primary/60 hover:text-primary hover:bg-primary/5"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-14">
          {filtered.map((project, index) => (
            <article
              key={project.title}
              className={`glass-card shine rounded-2xl overflow-hidden hover:glow-effect transition-all hover:scale-[1.02] hover:-translate-y-2 duration-500 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 80}ms`, transitionDuration: "700ms" }}
            >
              <div className="relative overflow-hidden h-48 bg-secondary">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover transition-all duration-[1200ms] group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-90" />

                {/* Category badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-md text-[11px] font-semibold tracking-wide text-foreground border border-border/50">
                  {project.category}
                </span>

                {/* Featured */}
                {project.featured && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/90 text-primary-foreground text-[11px] font-semibold backdrop-blur-md">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </span>
                )}

                {/* Hover overlay quick action */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                  >
                    Live Preview <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-primary/15 text-primary text-xs font-medium border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-border hover:border-primary hover:bg-primary/10 group/btn"
                    asChild
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live`}>
                      Live
                      <ExternalLink className="ml-2 h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  {project.repo && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border hover:border-primary hover:bg-primary/10"
                      asChild
                    >
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} source code`}>
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={`text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button
            variant="outline"
            className="border-2 border-primary/40 hover:border-primary hover:bg-primary/10 px-8 py-6 text-lg group"
            asChild
          >
            <a href="https://github.com/Paul-dir" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              View More on GitHub
              <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
