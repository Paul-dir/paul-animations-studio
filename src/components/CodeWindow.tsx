import { useEffect, useState } from "react";

const CODE = `const developer = {
  name: "Paul Diriba",
  role: "Software Engineer",
  passion: "Building scalable applications",
  stack: ["React", "Node", "Java", "Python"],
  available: true,
};`;

const highlight = (line: string) => {
  return line
    .replace(/(\/\/.*)/g, '<span class="text-muted-foreground italic">$1</span>')
    .replace(/\b(const|let|var|function|return|true|false)\b/g, '<span class="text-[#c678dd]">$1</span>')
    .replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-[#98c379]">$&</span>')
    .replace(/\b(\d+)\b/g, '<span class="text-[#d19a66]">$1</span>')
    .replace(/([a-zA-Z_]+)(?=:)/g, '<span class="text-[#e06c75]">$1</span>')
    .replace(/\b(developer)\b/g, '<span class="text-[#61afef]">$1</span>');
};

const CodeWindow = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(CODE.slice(0, i));
      if (i >= CODE.length) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, []);

  const lines = text.split("\n");

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-primary/20 shadow-2xl max-w-2xl mx-auto">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-black/40">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-xs text-muted-foreground font-mono">developer.ts</span>
      </div>
      <pre className="p-6 font-mono text-sm md:text-base bg-[#282c34]/90 text-[#abb2bf] overflow-x-auto min-h-[240px]">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-muted-foreground/50 select-none w-6 text-right">{i + 1}</span>
            <span
              dangerouslySetInnerHTML={{
                __html:
                  highlight(line) +
                  (i === lines.length - 1 ? '<span class="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse" />' : ""),
              }}
            />
          </div>
        ))}
      </pre>
    </div>
  );
};

export default CodeWindow;
