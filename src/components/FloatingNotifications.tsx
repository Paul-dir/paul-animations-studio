import { useEffect, useState } from "react";
import { Bell, X, Sparkles, Briefcase, Rocket, Star } from "lucide-react";

const MESSAGES = [
  { icon: Rocket, text: "New Project Added: Tax Management System", tint: "text-primary" },
  { icon: Briefcase, text: "Currently Available for Freelance", tint: "text-green-400" },
  { icon: Sparkles, text: "Try the ⌘K Command Palette", tint: "text-accent" },
  { icon: Star, text: "Ask Pawlos AI anything — bottom right", tint: "text-yellow-400" },
];

const FloatingNotifications = () => {
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    let i = 0;
    const show = () => {
      setCurrent(i % MESSAGES.length);
      i++;
      setTimeout(() => setCurrent(null), 5500);
    };
    const initial = setTimeout(show, 4000);
    const interval = setInterval(show, 22000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  if (current === null) return null;
  const { icon: Icon, text, tint } = MESSAGES[current];

  return (
    <div className="fixed top-24 right-4 z-40 max-w-xs animate-fade-in">
      <div className="glass-card border border-primary/30 rounded-xl p-3 pr-9 shadow-2xl flex items-center gap-3 relative">
        <div className="relative">
          <Bell className={`w-5 h-5 ${tint}`} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-ping" />
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Icon className={`w-4 h-4 ${tint}`} />
          <span>{text}</span>
        </div>
        <button
          onClick={() => setCurrent(null)}
          className="absolute top-1.5 right-1.5 p-1 rounded hover:bg-white/10"
          aria-label="Dismiss"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default FloatingNotifications;
