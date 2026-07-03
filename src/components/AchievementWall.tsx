import { useState } from "react";
import { Trophy } from "lucide-react";

const ACHIEVEMENTS = [
  { icon: "☕", name: "Java", desc: "Enterprise backends, Spring Boot APIs, and OOP mastery over 3+ years." },
  { icon: "🐘", name: "PHP", desc: "Laravel-powered systems including tax platforms and CRMs." },
  { icon: "⚛️", name: "React", desc: "Modern SPAs with hooks, context, and performant rendering." },
  { icon: "🟢", name: "Node", desc: "REST APIs, real-time services, and Edge Function integrations." },
  { icon: "🤖", name: "AI", desc: "Integrated LLM assistants and Gemini-powered chat experiences." },
  { icon: "🗄️", name: "Databases", desc: "PostgreSQL, MySQL, Supabase — schema design & RLS security." },
  { icon: "🌿", name: "Git", desc: "Advanced workflows: rebasing, branching strategies, code review." },
  { icon: "🔌", name: "REST API", desc: "Designed and consumed dozens of production REST endpoints." },
];

const AchievementWall = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {ACHIEVEMENTS.map((a, i) => (
        <button
          key={a.name}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(i)}
          onBlur={() => setActive(null)}
          className="group relative glass-card rounded-2xl p-5 flex flex-col items-center gap-2 border border-primary/20 hover:border-primary/60 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
        >
          <div className="relative">
            <Trophy className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-1 -right-1 text-lg">{a.icon}</span>
          </div>
          <span className="font-bold text-sm">{a.name}</span>
          <div
            className={`absolute inset-x-2 -bottom-2 translate-y-full glass-card border border-primary/40 rounded-lg p-2 text-xs text-muted-foreground pointer-events-none transition-all duration-200 z-20 ${
              active === i ? "opacity-100 translate-y-[105%]" : "opacity-0"
            }`}
          >
            {a.desc}
          </div>
        </button>
      ))}
    </div>
  );
};

export default AchievementWall;
