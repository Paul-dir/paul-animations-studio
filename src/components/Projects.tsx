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
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop"
    },
    {
      title: "Garage123",
      description: "A modern garage management system designed to streamline vehicle service tracking and customer management.",
      tech: ["React", "Firebase", "CSS"],
      link: "https://garage-aid-i6gc.vercel.app/",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop"
    },
    {
      title: "MyPortfolio",
      description: "A personal portfolio website showcasing my projects and skills with a clean and modern design.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://paul-dir.github.io/myPortfolio/",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
    },
    {
      title: "Kalkidan Cup Cafe",
      description: "An elegant website for a local cafe featuring menu items, location information, and online ordering capabilities.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://paul-dir.github.io/Kalkidan-cup-cafe/",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4" ref={elementRef}>
      <div className="container mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">Some of the projects I've worked on recently</p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`glass-card rounded-xl overflow-hidden hover:glow-effect transition-all hover:scale-105 hover:-translate-y-2 duration-500 group ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <div className="relative overflow-hidden h-48 bg-secondary">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all group-hover:scale-125 group-hover:rotate-2 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full border-primary/50 hover:border-primary hover:bg-primary/10 group"
                  asChild
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Button
            variant="outline"
            className="border-2 border-primary/50 hover:border-primary hover:bg-primary/10 px-8 py-6 text-lg group"
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
