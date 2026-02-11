import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Projects = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const projects = [
    {
      title: "Task Manager",
      description: "A comprehensive task management application with user-friendly interface for organizing and tracking daily tasks efficiently.",
      tech: ["React", "Next.js", "Tailwind CSS"],
      link: "https://task-manager-five-psi-75.vercel.app/",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop",
    },
    {
      title: "Garage123",
      description: "A modern garage management system designed to streamline vehicle service tracking and customer management.",
      tech: ["React", "Firebase", "CSS"],
      link: "https://garage-aid-i6gc.vercel.app/",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop",
    },
    {
      title: "E-Commerce Platform",
      description: "Full-featured online shopping platform with product catalog, cart management, and secure checkout process.",
      tech: ["Next.js", "TypeScript", "Stripe"],
      link: "https://github.com/Paul-dir",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop",
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather application with detailed forecasts, interactive maps, and location-based weather alerts.",
      tech: ["React", "OpenWeather API", "Chart.js"],
      link: "https://github.com/Paul-dir",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop",
    },
    {
      title: "MyPortfolio",
      description: "A personal portfolio website showcasing my projects and skills with a clean and modern design.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://paul-dir.github.io/myPortfolio/",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    },
    {
      title: "Kalkidan Cup Cafe",
      description: "An elegant website for a local cafe featuring menu items, location information, and online ordering capabilities.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://paul-dir.github.io/Kalkidan-cup-cafe/",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 relative" ref={elementRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">Some of the projects I've worked on recently</p>
          <div className="section-divider"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-14">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`glass-card rounded-2xl overflow-hidden hover:glow-effect transition-all hover:scale-[1.03] hover:-translate-y-2 duration-500 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms`, transitionDuration: "700ms" }}
            >
              <div className="relative overflow-hidden h-44 bg-secondary">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all group-hover:scale-110 duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
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

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-border hover:border-primary hover:bg-primary/10 group/btn"
                  asChild
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                    <ExternalLink className="ml-2 h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
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
