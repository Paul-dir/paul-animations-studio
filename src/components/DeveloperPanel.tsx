import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  FolderTree,
  Lightbulb,
  Gauge,
  Rocket,
  X,
  Layers,
  ChevronRight,
} from "lucide-react";
import { useDeveloperMode } from "@/contexts/DeveloperModeContext";

type SectionId = "frameworks" | "structure" | "decisions" | "performance" | "deployment";

const SECTIONS: { id: SectionId; label: string; icon: typeof Code2 }[] = [
  { id: "frameworks", label: "Frameworks", icon: Layers },
  { id: "structure", label: "Folder Structure", icon: FolderTree },
  { id: "decisions", label: "Design Decisions", icon: Lightbulb },
  { id: "performance", label: "Performance", icon: Gauge },
  { id: "deployment", label: "Deployment", icon: Rocket },
];

const FRAMEWORKS = [
  { name: "React 18", detail: "UI library, concurrent rendering" },
  { name: "Vite 5", detail: "Dev server + build tool" },
  { name: "TypeScript 5", detail: "Static typing" },
  { name: "Tailwind CSS 3", detail: "Utility-first styling" },
  { name: "Framer Motion", detail: "Animations & transitions" },
  { name: "shadcn/ui", detail: "Accessible component primitives" },
  { name: "React Router", detail: "Client-side routing" },
  { name: "TanStack Query", detail: "Server state management" },
  { name: "Lovable Cloud", detail: "Backend, auth, edge functions" },
];

const STRUCTURE = `src/
├── components/
│   ├── ui/            shadcn primitives
│   ├── Hero.tsx
│   ├── Projects.tsx
│   └── ...
├── contexts/          Theme, DeveloperMode
├── data/              Static case studies, skills
├── hooks/             Custom hooks
├── integrations/
│   └── supabase/      Auto-generated client
├── pages/             Route entries
└── index.css          Design tokens
supabase/
└── functions/         Edge functions`;

const DECISIONS = [
  "Semantic design tokens in index.css → dark mode & theme cycling",
  "Framer Motion over CSS-only for orchestrated section entrances",
  "Lazy-load heavy sections on mobile via React.lazy + Suspense",
  "Edge functions for contact form to keep API keys server-side",
  "No 3D scenes — perf-first (removed Three.js Scene3D)",
];

const PERFORMANCE = [
  { label: "Lighthouse Perf", value: "92+" },
  { label: "First Contentful Paint", value: "~1.1s" },
  { label: "Bundle (gzipped)", value: "~180KB" },
  { label: "Image strategy", value: "Lazy + WebP" },
  { label: "Route splitting", value: "Enabled" },
];

const DEPLOYMENT = [
  { label: "Host", value: "Lovable" },
  { label: "CDN", value: "Global edge" },
  { label: "Backend", value: "Lovable Cloud" },
  { label: "CI", value: "Auto on push" },
  { label: "SSL", value: "Auto-provisioned" },
];

const DeveloperPanel = () => {
  const { devMode, setDevMode } = useDeveloperMode();
  const [section, setSection] = useState<SectionId>("frameworks");
  const [fps, setFps] = useState(60);

  useEffect(() => {
    if (!devMode) return;
    let raf = 0;
    let last = performance.now();
    let frames = 0;
    const loop = (t: number) => {
      frames++;
      if (t - last >= 1000) {
        setFps(frames);
        frames = 0;
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [devMode]);

  const renderSection = () => {
    switch (section) {
      case "frameworks":
        return (
          <ul className="space-y-2">
            {FRAMEWORKS.map((f) => (
              <li
                key={f.name}
                className="p-2.5 rounded-md border border-primary/20 bg-primary/5"
              >
                <div className="text-sm font-mono text-primary">{f.name}</div>
                <div className="text-xs text-muted-foreground">{f.detail}</div>
              </li>
            ))}
          </ul>
        );
      case "structure":
        return (
          <pre className="text-xs font-mono text-foreground/80 whitespace-pre leading-relaxed p-3 rounded-md bg-black/40 border border-primary/20 overflow-x-auto">
            {STRUCTURE}
          </pre>
        );
      case "decisions":
        return (
          <ul className="space-y-2.5">
            {DECISIONS.map((d, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground/80">
                <ChevronRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        );
      case "performance":
        return (
          <div className="space-y-2">
            <div className="p-3 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-between">
              <span className="text-sm text-foreground/80">Live FPS</span>
              <span className="font-mono text-primary text-lg">{fps}</span>
            </div>
            {PERFORMANCE.map((p) => (
              <div
                key={p.label}
                className="p-2.5 rounded-md border border-border/60 flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">{p.label}</span>
                <span className="font-mono text-primary">{p.value}</span>
              </div>
            ))}
          </div>
        );
      case "deployment":
        return (
          <div className="space-y-2">
            {DEPLOYMENT.map((d) => (
              <div
                key={d.label}
                className="p-2.5 rounded-md border border-border/60 flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">{d.label}</span>
                <span className="font-mono text-primary">{d.value}</span>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {devMode && (
        <motion.aside
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 24, stiffness: 220 }}
          className="fixed top-0 right-0 z-40 h-screen w-[92vw] sm:w-[380px] backdrop-blur-xl bg-card/85 border-l border-primary/30 shadow-2xl shadow-primary/20 flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-primary/20">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              <span className="font-mono text-sm text-primary">
                &gt; dev_mode --active
              </span>
            </div>
            <button
              onClick={() => setDevMode(false)}
              aria-label="Close developer panel"
              className="p-1.5 rounded-md hover:bg-primary/15 text-muted-foreground hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex flex-wrap gap-1 p-3 border-b border-primary/15">
            {SECTIONS.map(({ id, label, icon: Icon }) => {
              const active = section === id;
              return (
                <button
                  key={id}
                  onClick={() => setSection(id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-[0_0_14px_hsl(var(--primary)/0.4)]"
                      : "bg-card/40 border border-border/60 text-foreground/70 hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {label}
                </button>
              );
            })}
          </nav>

          <div className="flex-1 overflow-y-auto p-4">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderSection()}
            </motion.div>
          </div>

          <div className="p-3 border-t border-primary/20 text-[10px] font-mono text-muted-foreground flex items-center justify-between">
            <span>build: prod</span>
            <span>env: lovable</span>
            <span className="text-primary">● online</span>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default DeveloperPanel;
