import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Sparkles,
  Download,
  Github,
  Linkedin,
  GraduationCap,
  Target,
  Rocket,
  Cpu,
  Layers,
  Code2,
} from "lucide-react";

type TabKey = "focus" | "journey" | "education";

const TABS: { key: TabKey; label: string }[] = [
  { key: "focus", label: "01. Focus" },
  { key: "journey", label: "02. Journey" },
  { key: "education", label: "03. Education" },
];

const FOCUS = [
  {
    icon: Layers,
    title: "Full-Stack Web Apps",
    body: "Building responsive, production-ready interfaces with React, Next.js and TypeScript backed by clean REST APIs.",
  },
  {
    icon: Cpu,
    title: "Scalable Systems",
    body: "Designing maintainable architectures — modular components, typed data flow and thoughtful state management.",
  },
];

const JOURNEY = [
  { year: "2024 — Present", title: "Freelance & Client Projects", body: "Delivering business websites, task management apps and admin dashboards for real users." },
  { year: "2023", title: "INSA Internship", body: "Hands-on experience with secure software practices and enterprise development workflows." },
  { year: "2022", title: "Started Building for the Web", body: "Deep-dive into HTML, CSS, JavaScript and the React ecosystem." },
];

const EDUCATION = [
  { year: "2021 — Present", title: "BSc. Software Engineering", body: "Haramaya University — 4th year, focused on web development and full-stack engineering." },
  { year: "Ongoing", title: "Self-directed learning", body: "Next.js, TypeScript, Supabase, system design and modern UI/motion." },
];

const STACK = ["TypeScript", "React", "Next.js", "Node.js", "Tailwind", "Supabase"];

const About = () => {
  const [tab, setTab] = useState<TabKey>("focus");

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Get to know me and what drives my passion for development
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Identity column */}
          <motion.div
            className="lg:col-span-4 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/40 transition duration-500" />
              <div className="relative glass-card border border-primary/30 rounded-2xl p-6 flex flex-col items-center text-center">
                {/* Monogram avatar */}
                <div className="relative w-32 h-32 mb-5">
                  <div className="absolute inset-0 border-2 border-primary rounded-full animate-[spin_10s_linear_infinite] border-t-transparent border-l-transparent" />
                  <div className="absolute inset-2 border border-primary/30 rounded-full" />
                  <div className="absolute inset-4 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center">
                    <span className="text-3xl font-bold gradient-text tracking-tight">PD</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold tracking-tight">Pawlos Diriba</h3>
                <div className="mt-2 px-3 py-1 bg-primary/10 border border-primary/40 rounded-full text-[10px] font-mono text-primary tracking-widest uppercase">
                  Software Engineer
                </div>

                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Addis Ababa, Ethiopia</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-center">
                    <div className="text-xl font-bold text-primary">3+</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Years Coding</div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-center">
                    <div className="text-xl font-bold text-primary">20+</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Projects</div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-[11px] font-medium border border-primary/20 inline-flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Available for Freelance
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-[11px] font-medium border border-border/50">
                    Open to Work
                  </span>
                </div>
              </div>
            </div>

            {/* Core stack card */}
            <div className="glass-card border border-primary/20 rounded-xl p-5">
              <h4 className="text-xs font-mono text-primary/70 uppercase mb-3 tracking-widest flex items-center gap-2">
                <Code2 className="h-3.5 w-3.5" /> Core Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {STACK.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-[11px] bg-secondary/60 border border-primary/30 text-primary rounded font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            className="lg:col-span-8 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-primary" />
                <h3 className="text-primary font-mono text-xs uppercase tracking-widest">Identity Data</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Engineering <span className="gradient-text">reliable, human-friendly</span> web experiences.
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                I'm a Software Engineering student at Haramaya University with 3+ years of hands-on coding. I build responsive, user-friendly websites and apps using React, Next.js and modern web tooling — writing clean, maintainable code and shipping projects real people use.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                My goal is to grow as a full-stack engineer and contribute to impactful products that make everyday work simpler.
              </p>
            </div>

            {/* Tabs card */}
            <div className="glass-card border border-primary/20 rounded-2xl overflow-hidden">
              <div className="flex border-b border-primary/20 bg-primary/5">
                {TABS.map((t) => {
                  const active = tab === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`relative px-4 sm:px-6 py-4 text-xs sm:text-sm font-mono transition-colors ${
                        active ? "text-primary" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {t.label}
                      {active && (
                        <motion.span
                          layoutId="about-tab-underline"
                          className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="p-6">
                {tab === "focus" && (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {FOCUS.map((f, i) => (
                      <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        className="group p-5 rounded-xl bg-card/40 border border-primary/10 hover:border-primary/40 transition-all duration-300"
                      >
                        <div className="w-9 h-9 rounded bg-primary/15 flex items-center justify-center mb-3">
                          <f.icon className="h-4 w-4 text-primary" />
                        </div>
                        <h4 className="font-semibold mb-1.5">{f.title}</h4>
                        <p className="text-muted-foreground text-sm leading-snug">{f.body}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {tab === "journey" && (
                  <ol className="relative space-y-6 pl-6">
                    <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
                    {JOURNEY.map((j, i) => (
                      <motion.li
                        key={j.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        className="relative"
                      >
                        <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]" />
                        <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-0.5">{j.year}</div>
                        <div className="font-semibold flex items-center gap-2">
                          <Rocket className="h-3.5 w-3.5 text-primary" /> {j.title}
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">{j.body}</p>
                      </motion.li>
                    ))}
                  </ol>
                )}

                {tab === "education" && (
                  <div className="space-y-4">
                    {EDUCATION.map((e, i) => (
                      <motion.div
                        key={e.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        className="flex gap-4 p-5 rounded-xl bg-card/40 border border-primary/10 hover:border-primary/40 transition-all"
                      >
                        <div className="p-2.5 rounded-lg bg-primary/15 h-fit">
                          {i === 0 ? (
                            <GraduationCap className="h-5 w-5 text-primary" />
                          ) : (
                            <Target className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-0.5">{e.year}</div>
                          <h4 className="font-semibold">{e.title}</h4>
                          <p className="text-muted-foreground text-sm mt-1">{e.body}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/Pawlos-Diriba-Resume-Modern.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
              <div className="flex gap-3">
                <a
                  href="https://github.com/pawlos-diriba"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-11 h-11 border border-primary/30 rounded-lg flex items-center justify-center hover:bg-primary/10 hover:border-primary/60 transition-colors text-primary"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 border border-primary/30 rounded-lg flex items-center justify-center hover:bg-primary/10 hover:border-primary/60 transition-colors text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
