import { useTheme, ThemeName } from "@/contexts/ThemeContext";
import { Palette } from "lucide-react";
import { useState } from "react";

const themes: { name: ThemeName; label: string; colors: string[] }[] = [
  { name: "cyan", label: "Ocean", colors: ["hsl(187,85%,55%)", "hsl(207,85%,60%)"] },
  { name: "golden", label: "Sunset", colors: ["hsl(38,95%,55%)", "hsl(20,90%,55%)"] },
  { name: "purple", label: "Nebula", colors: ["hsl(270,80%,60%)", "hsl(290,80%,55%)"] },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 border border-border/50 transition-all hover:scale-110 backdrop-blur-sm"
        aria-label="Switch theme"
      >
        <Palette className="h-5 w-5 text-primary" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 p-3 rounded-xl glass-card border border-border/50 shadow-xl animate-fade-in min-w-[160px] z-50">
          <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Theme</p>
          <div className="space-y-1">
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => { setTheme(t.name); setOpen(false); }}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  theme === t.name
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <div className="flex gap-0.5">
                  {t.colors.map((c, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full border border-border/30"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                {t.label}
                {theme === t.name && <span className="ml-auto text-primary">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
