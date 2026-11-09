import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Search, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import { PROJECTS } from "@/data/projects";
import { projectPath } from "@/data/projectSlug";

const categories = ["All", "Full Stack", "Web App", "Frontend"] as const;

const Portfolio = () => {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const projects = useMemo(() => PROJECTS.filter((project) =>
    (category === "All" || project.category === category) &&
    `${project.title} ${project.description} ${project.tech.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [category, query]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Portfolio — Projects | Pawlos Diriba";
    const description = document.querySelector('meta[name="description"]');
    const previous = description?.getAttribute("content");
    description?.setAttribute("content", "Explore Pawlos Diriba’s software projects, technologies and full case studies.");
    return () => { if (previous) description?.setAttribute("content", previous); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50">
        <div className="container mx-auto max-w-7xl px-4 py-5 flex items-center justify-between gap-4">
          <Link to="/" className="text-xl font-bold gradient-text" aria-label="Pawlos Diriba home">PD.</Link>
          <Button variant="ghost" asChild><Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to home</Link></Button>
        </div>
      </header>
      <main className="container mx-auto max-w-7xl px-4 pt-10 md:pt-14 pb-20">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <p className="text-sm font-medium text-primary mb-3">Pawlos Diriba / Selected work</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
            <p className="text-muted-foreground text-base md:text-lg">Web applications, enterprise systems and AI-powered experiences.</p>
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap pt-2 hidden sm:block">{PROJECTS.length} projects</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-y border-border/50 py-5 mb-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Project categories">
            {categories.map((item) => (
              <Button key={item} variant={category === item ? "default" : "outline"} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</Button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search projects" placeholder="Search projects or technologies" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-5" aria-live="polite">{projects.length} {projects.length === 1 ? "project" : "projects"}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article key={project.title} className="group flex flex-col rounded-lg overflow-hidden border border-border/60 bg-card">
              <Link to={projectPath(project.title)} aria-label={`View ${project.title} case study`} className="block overflow-hidden aspect-video bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
                <img src={project.image} alt={`${project.title} preview`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-semibold text-primary mb-3">{project.category}</span>
                <h2 className="text-xl font-semibold mb-3"><Link to={projectPath(project.title)} className="hover:text-primary">{project.title}</Link></h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">{project.tech.map((tech) => <span key={tech} className="text-xs px-2 py-1 rounded border border-border bg-secondary/50 text-foreground">{tech}</span>)}</div>
                <Button asChild variant="outline" className="mt-auto justify-between"><Link to={projectPath(project.title)} aria-label={`Read ${project.title} case study`}>Read case study<ArrowUpRight className="h-4 w-4" /></Link></Button>
              </div>
            </article>
          ))}
        </div>
        {projects.length === 0 && <div className="py-20 text-center"><FolderOpen className="h-10 w-10 text-muted-foreground mx-auto mb-4" /><h2 className="text-xl font-semibold mb-4">No projects found</h2><Button variant="outline" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</Button></div>}
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;