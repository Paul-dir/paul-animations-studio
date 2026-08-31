import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  AlertTriangle,
  UserCheck,
  Clock,
  Lightbulb,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { getCaseStudyBySlug, allProjectSlugs, projectPath } from "@/data/projectSlug";

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-sm md:text-base leading-relaxed">
        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
        <span className="text-foreground/85">{item}</span>
      </li>
    ))}
  </ul>
);

const Block = ({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay }}
    className="glass-card rounded-2xl p-6 md:p-7"
  >
    <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold mb-4">
      <Icon className="h-5 w-5 text-primary" />
      {title}
    </h2>
    {children}
  </motion.section>
);

const ProjectDetail = () => {
  const { slug = "" } = useParams();
  const project = useMemo(() => getCaseStudyBySlug(slug), [slug]);
  const others = useMemo(
    () => allProjectSlugs().filter((p) => p.slug !== slug).slice(0, 4),
    [slug]
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (!project) return;
    document.title = `${project.title} — Case Study | Pawlos Diriba`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", project.tagline.slice(0, 158));
  }, [project]);

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-5 px-4 text-center">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <p className="text-muted-foreground">
          This case study doesn’t exist (or has moved).
        </p>
        <Button asChild>
          <Link to="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to projects
          </Link>
        </Button>
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="pb-16">
        {/* Hero */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={project.screenshots[0]}
              alt={`${project.title} cover`}
              className="w-full h-full object-cover opacity-40"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
          </div>

          <div className="relative container mx-auto max-w-5xl px-4 pt-10 pb-12">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm text-foreground/75 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> Back to projects
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-3">
                <span className="gradient-text">{project.title}</span>
              </h1>
              <p className="text-base md:text-lg text-foreground/80 max-w-2xl">
                {project.tagline}
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                {project.link && (
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Visit live site
                    </a>
                  </Button>
                )}
                {project.repo && (
                  <Button asChild variant="outline">
                    <a href={project.repo} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Source
                    </a>
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-md bg-primary/15 text-primary text-xs md:text-sm font-medium border border-primary/25"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto max-w-5xl px-4 grid gap-6 md:grid-cols-2">
          <Block icon={Sparkles} title="Key features">
            <Bullets items={project.features} />
          </Block>
          <Block icon={Layers} title="Architecture" delay={0.05}>
            <Bullets items={project.architecture} />
          </Block>
          <Block icon={AlertTriangle} title="Challenges">
            <Bullets items={project.challenges} />
          </Block>
          <Block icon={UserCheck} title="My role" delay={0.05}>
            <Bullets items={project.contribution} />
          </Block>
          <Block icon={Clock} title="Timeline">
            <ol className="relative border-l border-primary/30 pl-6 space-y-5">
              {project.timeline.map((t, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                  <h3 className="font-semibold text-foreground">{t.phase}</h3>
                  <p className="text-sm text-muted-foreground">{t.detail}</p>
                </li>
              ))}
            </ol>
          </Block>
          <Block icon={Lightbulb} title="What I learned" delay={0.05}>
            <Bullets items={project.lessons} />
          </Block>

          {/* Gallery */}
          {project.screenshots.length > 1 && (
            <div className="md:col-span-2">
              <Block icon={Cpu} title="Screens">
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.screenshots.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${project.title} screen ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="rounded-xl border border-border/60 w-full h-52 object-cover"
                    />
                  ))}
                </div>
              </Block>
            </div>
          )}

          {/* Other projects */}
          <div className="md:col-span-2">
            <Block icon={Layers} title="Other projects">
              <div className="flex flex-wrap gap-2">
                {others.map((p) => (
                  <Link
                    key={p.slug}
                    to={projectPath(p.title)}
                    className="px-3.5 py-2 rounded-full text-sm border border-border/60 bg-card/40 hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </Block>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
