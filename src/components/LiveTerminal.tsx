import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Minus, Square, X } from "lucide-react";

type Line = { type: "input" | "output" | "system"; text: string };

const WHOAMI = [
  "Paul Diriba",
  "Software Engineer",
  "Backend Developer",
  "React Developer",
  "Problem Solver",
];

const HELP_TEXT = `Available commands:
  whoami        Who is Paul Diriba
  about         Short bio
  skills        Tech I work with
  projects      Featured projects
  experience    Work timeline
  contact       Get in touch
  socials       Links (GitHub, etc.)
  resume        Download CV
  theme <name>  cyan | light | purple | golden
  clear         Clear the terminal
  help          Show this help`;

const SKILLS = `Frontend  : React, Next.js, TypeScript, Tailwind
Backend   : Node.js, Java, Spring, PHP, Python
Mobile    : Flutter
Database  : PostgreSQL, MySQL, MongoDB
Tools     : Git, Docker, Supabase, Figma`;

const PROJECTS = `1. Garage123 — Auto service platform (React + Node)
2. Tax Management System — Enterprise Java/Spring
3. Portfolio AI — This site + Ask Pawlos AI
4. Atlas — Internal tooling suite
   → Type 'goto projects' to scroll to section`;

const EXPERIENCE = `2023 – Present  Software Engineer @ INSA
2022 – 2023     Full-Stack Developer (Contract)
2018 – 2022     BSc Computer Science, Haramaya University`;

const CONTACT = `Email : paudiriba@gmail.com
Phone : +251 941 551 883
Site  : paul-animations-studio.lovable.app
   → Type 'goto contact' to open the form`;

const SOCIALS = `GitHub : https://github.com/Paul-dir
Email  : mailto:paudiriba@gmail.com`;

const ABOUT = `Hi, I'm Paul (Pawlos) Diriba — a software engineer who loves
crafting fast, beautiful web experiences and reliable backends.
I ship things end-to-end: design, code, deploy, iterate.`;

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const LiveTerminal = () => {
  const [lines, setLines] = useState<Line[]>([
    { type: "system", text: "Pawlos OS v1.0.0 — interactive shell" },
    { type: "system", text: "Type 'help' to see available commands." },
    { type: "input", text: "whoami" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [whoamiIdx, setWhoamiIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Rotating whoami typewriter
  useEffect(() => {
    const current = WHOAMI[whoamiIdx];
    if (!deleting && typed === current) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }
    if (deleting && typed === "") {
      setDeleting(false);
      setWhoamiIdx((i) => (i + 1) % WHOAMI.length);
      return;
    }
    const t = setTimeout(
      () => {
        setTyped((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      },
      deleting ? 40 : 80
    );
    return () => clearTimeout(t);
  }, [typed, deleting, whoamiIdx]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, typed]);

  const print = (text: string) => setLines((l) => [...l, { type: "output", text }]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    setLines((l) => [...l, { type: "input", text: cmd || "" }]);
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);

    const [name, ...args] = cmd.split(/\s+/);
    switch (name.toLowerCase()) {
      case "help": print(HELP_TEXT); break;
      case "whoami": print(WHOAMI.join("\n")); break;
      case "about": print(ABOUT); break;
      case "skills": print(SKILLS); break;
      case "projects": print(PROJECTS); break;
      case "experience": print(EXPERIENCE); break;
      case "contact": print(CONTACT); break;
      case "socials": case "social": case "links": print(SOCIALS); break;
      case "resume": case "cv":
        print("Opening CV download…");
        import("@/lib/utils").then(({ downloadFile }) =>
          downloadFile("/Pawlos-Diriba-CV.pdf", "Pawlos-Diriba-CV.pdf")
        );
        break;
      case "goto":
        if (!args[0]) { print("usage: goto <section>"); break; }
        print(`Scrolling to '${args[0]}'…`);
        scrollToId(args[0].toLowerCase());
        break;
      case "theme": {
        const t = args[0]?.toLowerCase();
        const allowed = ["cyan", "light", "purple", "golden"];
        if (!t || !allowed.includes(t)) {
          print(`usage: theme <${allowed.join("|")}>`); break;
        }
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("portfolio-theme", t);
        print(`Theme switched to ${t}. Reload if UI doesn't fully swap.`);
        break;
      }
      case "echo": print(args.join(" ")); break;
      case "date": print(new Date().toString()); break;
      case "clear": case "cls": setLines([]); break;
      case "sudo": print("Nice try 😄 — you already have root here."); break;
      case "exit": print("There is no escape from Pawlos OS."); break;
      default: print(`command not found: ${name}. Type 'help'.`);
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { runCommand(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next); setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < 0) return;
      const next = histIdx + 1;
      if (next >= history.length) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(next); setInput(history[next]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = ["help","whoami","about","skills","projects","experience","contact","socials","resume","theme","clear","goto","echo","date"];
      const match = cmds.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault(); setLines([]);
    }
  };

  return (
    <section id="terminal" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 mb-4">
            <TerminalIcon className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-primary">interactive_shell</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Say hi via <span className="text-gradient">terminal</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Type <code className="text-primary">help</code> to explore. Try{" "}
            <code className="text-primary">projects</code>,{" "}
            <code className="text-primary">skills</code>, or{" "}
            <code className="text-primary">theme purple</code>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="rounded-xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/10 bg-[#0b0f14]/95"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/90" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/90" />
              <span className="w-3 h-3 rounded-full bg-green-500/90" />
            </div>
            <div className="text-xs font-mono text-white/50 flex items-center gap-2">
              <TerminalIcon className="w-3.5 h-3.5" />
              paul@portfolio: ~
            </div>
            <div className="flex items-center gap-3 text-white/40">
              <Minus className="w-3.5 h-3.5" />
              <Square className="w-3 h-3" />
              <X className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Body */}
          <div
            ref={bodyRef}
            className="p-4 md:p-5 h-[420px] overflow-y-auto font-mono text-sm text-green-300/90 leading-relaxed"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace" }}
          >
            {lines.map((line, i) => {
              if (line.type === "input") {
                // First auto whoami runs the typewriter
                const isAutoWhoami = i === 2 && line.text === "whoami";
                return (
                  <div key={i} className="flex gap-2 flex-wrap">
                    <span className="text-primary">paul@portfolio</span>
                    <span className="text-white/60">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white/60">$</span>
                    <span className="text-white/90">{line.text}</span>
                  </div>
                );
              }
              if (line.type === "system") {
                return <div key={i} className="text-cyan-400/70 italic">{line.text}</div>;
              }
              return (
                <pre key={i} className="whitespace-pre-wrap text-white/85 mb-2">
                  {line.text}
                </pre>
              );
            })}

            {/* Auto whoami rotating output */}
            <div className="text-white/85 min-h-[1.5em]">
              {typed}
              <span className="inline-block w-2 h-4 bg-primary ml-0.5 align-middle animate-pulse" />
            </div>

            {/* Live prompt */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-primary">paul@portfolio</span>
              <span className="text-white/60">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white/60">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
                className="flex-1 bg-transparent outline-none border-none text-white/95 caret-primary font-mono"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveTerminal;
