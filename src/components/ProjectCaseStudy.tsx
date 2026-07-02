import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
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
import type { CaseStudy } from "@/data/projectCaseStudies";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  caseStudy: CaseStudy | null;
};

const SECTIONS = [
  { id: "features", label: "Features", icon: Sparkles },
  { id: "tech", label: "Tech Stack", icon: Cpu },
  { id: "architecture", label: "Architecture", icon: Layers },
  { id: "challenges", label: "Challenges", icon: AlertTriangle },
  { id: "contribution", label: "My Role", icon: UserCheck },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "lessons", label: "Lessons", icon: Lightbulb },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const ProjectCaseStudy = ({ open, onOpenChange, caseStudy }: Props) => {
  const [slide, setSlide] = useState(0);
  const [tab, setTab] = useState<SectionId>("features");

  useEffect(() => {
    if (open) {
      setSlide(0);
      setTab("features");
    }
  }, [open, caseStudy?.title]);

  useEffect(() => {
    if (!open || !caseStudy) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setSlide((s) => (s + 1) % caseStudy.screenshots.length);
      if (e.key === "ArrowLeft")
        setSlide((s) => (s - 1 + caseStudy.screenshots.length) % caseStudy.screenshots.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, caseStudy]);

  if (!caseStudy) return null;

  const next = () => setSlide((s) => (s + 1) % caseStudy.screenshots.length);
  const prev = () =>
    setSlide((s) => (s - 1 + caseStudy.screenshots.length) % caseStudy.screenshots.length);

  const renderList = (items: string[]) => (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm md:text-base leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
          <span className="text-foreground/85">{item}</span>
        </li>
      ))}
    </ul>
  );

  const renderTab = () => {
    switch (tab) {
      case "features":
        return renderList(caseStudy.features);
      case "tech":
        return (
          <div className="flex flex-wrap gap-2">
            {caseStudy.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-md bg-primary/15 text-primary text-sm font-medium border border-primary/25"
              >
                {t}
              </span>
            ))}
          </div>
        );
      case "architecture":
        return renderList(caseStudy.architecture);
      case "challenges":
        return renderList(caseStudy.challenges);
      case "contribution":
        return renderList(caseStudy.contribution);
      case "timeline":
        return (
          <ol className="relative border-l border-primary/30 pl-6 space-y-5">
            {caseStudy.timeline.map((t, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                <h4 className="font-semibold text-foreground">{t.phase}</h4>
                <p className="text-sm text-muted-foreground">{t.detail}</p>
              </li>
            ))}
          </ol>
        );
      case "lessons":
        return renderList(caseStudy.lessons);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto p-0 border-primary/30 bg-card/95 backdrop-blur-xl">
        <div className="relative">
          {/* Image slider */}
          <div className="relative h-64 md:h-80 bg-secondary overflow-hidden rounded-t-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={slide}
                src={caseStudy.screenshots[slide]}
                alt={`${caseStudy.title} screenshot ${slide + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

            {caseStudy.screenshots.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/70 backdrop-blur-md border border-border hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/70 backdrop-blur-md border border-border hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {caseStudy.screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      aria-label={`Go to screenshot ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === slide ? "w-6 bg-primary" : "w-1.5 bg-foreground/40 hover:bg-foreground/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="px-6 md:px-8 pt-6 pb-8">
            <DialogHeader className="text-left mb-5">
              <DialogTitle className="text-2xl md:text-3xl font-bold">
                <span className="gradient-text">{caseStudy.title}</span>
              </DialogTitle>
              <DialogDescription className="text-base text-foreground/70">
                {caseStudy.tagline}
              </DialogDescription>
            </DialogHeader>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {caseStudy.link && (
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                  <a href={caseStudy.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                </Button>
              )}
              {caseStudy.repo && (
                <Button asChild size="sm" variant="outline">
                  <a href={caseStudy.repo} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Source
                  </a>
                </Button>
              )}
            </div>

            {/* Tabs */}
            <div
              role="tablist"
              className="flex flex-wrap gap-1.5 mb-6 pb-3 border-b border-border/60"
            >
              {SECTIONS.map(({ id, label, icon: Icon }) => {
                const active = tab === id;
                return (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all ${
                      active
                        ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(var(--primary)/0.35)]"
                        : "bg-card/40 border border-border/60 text-foreground/75 hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                );
              })}
            </div>

            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="min-h-[180px]"
            >
              {renderTab()}
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCaseStudy;
