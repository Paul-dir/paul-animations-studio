import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import galaxySkills, { GalaxySkill } from "@/data/galaxySkills";

interface Props {
  isVisible: boolean;
}

const SIZE = 460;
const CENTER = SIZE / 2;
const ORBIT_RADII = { 1: 90, 2: 150, 3: 210 };

const SkillsGalaxy = ({ isVisible }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const skills = galaxySkills;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        const next = activeIndex === null ? 0 : (activeIndex + 1) % skills.length;
        setActiveIndex(next);
        nodeRefs.current[next]?.focus();
      } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        const prev = activeIndex === null ? skills.length - 1 : (activeIndex - 1 + skills.length) % skills.length;
        setActiveIndex(prev);
        nodeRefs.current[prev]?.focus();
      } else if (e.key === "Escape") {
        setActiveIndex(null);
      }
    },
    [activeIndex, skills.length]
  );

  // Prebuild starfield
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, () => ({
        x: Math.random() * SIZE,
        y: Math.random() * SIZE,
        r: Math.random() * 1.2 + 0.3,
        o: Math.random() * 0.6 + 0.2,
        d: Math.random() * 4 + 2,
      })),
    []
  );

  const active = activeIndex !== null ? skills[activeIndex] : null;

  return (
    <div className="flex flex-col items-center" onKeyDown={handleKeyDown}>
      <div
        className="relative"
        style={{ width: SIZE, height: SIZE, maxWidth: "100%" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Interactive skills galaxy — hover or use arrow keys"
        role="group"
      >
        {/* Nebula backdrop */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, hsl(var(--primary)/0.18) 0%, hsl(var(--primary)/0.05) 40%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* Starfield */}
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {stars.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="hsl(var(--primary))"
              opacity={s.o}
              style={{
                animation: `twinkle ${s.d}s ease-in-out ${i * 0.1}s infinite`,
              }}
            />
          ))}

          {/* Orbit rings */}
          {[1, 2, 3].map((o) => (
            <circle
              key={o}
              cx={CENTER}
              cy={CENTER}
              r={ORBIT_RADII[o as 1 | 2 | 3]}
              fill="none"
              stroke="hsl(var(--primary) / 0.15)"
              strokeWidth="0.8"
              strokeDasharray="2 4"
            />
          ))}
        </svg>

        {/* Center "Me" */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            transition: "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 700ms",
            transform: isVisible
              ? "translate(-50%,-50%) scale(1)"
              : "translate(-50%,-50%) scale(0)",
            opacity: isVisible ? 1 : 0,
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/40 blur-2xl animate-pulse" />
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center font-bold text-primary-foreground text-sm bg-gradient-to-br from-primary to-primary-glow shadow-[0_0_40px_hsl(var(--primary)/0.6)] border border-primary/50">
              Me
            </div>
          </div>
        </div>

        {/* Orbiting skill planets */}
        {skills.map((skill, i) => {
          const radius = ORBIT_RADII[skill.orbit as 1 | 2 | 3];
          const size = 44 + (skill.level - 60) * 0.4; // scale by level
          const isActive = activeIndex === i;

          return (
            <div
              key={skill.name}
              className="absolute left-1/2 top-1/2"
              style={{
                width: 0,
                height: 0,
                animation: `orbit ${skill.duration}s linear infinite`,
                animationDelay: `${-(skill.angle / 360) * skill.duration}s`,
                animationPlayState: paused ? "paused" : "running",
                transformOrigin: "0 0",
                opacity: isVisible ? 1 : 0,
                transition: "opacity 900ms ease",
                transitionDelay: `${i * 80 + 200}ms`,
              }}
            >
              <div
                style={{
                  transform: `translate(${radius}px, 0)`,
                }}
              >
                {/* Counter-rotate so the button stays upright */}
                <div
                  style={{
                    animation: `orbit-reverse ${skill.duration}s linear infinite`,
                    animationDelay: `${-(skill.angle / 360) * skill.duration}s`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                >
                  <button
                    ref={(el) => { nodeRefs.current[i] = el; }}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onFocus={() => setActiveIndex(i)}
                    onBlur={() => setActiveIndex(null)}
                    aria-label={`${skill.name}: ${skill.level}% — ${skill.description}`}
                    className="relative -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-semibold text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-primary transition-transform duration-300 hover:scale-125 cursor-pointer"
                    style={{
                      width: size,
                      height: size,
                      background: `radial-gradient(circle at 30% 30%, ${skill.color}, ${skill.color}88 60%, ${skill.color}22)`,
                      boxShadow: `0 0 ${isActive ? 30 : 14}px ${skill.color}${isActive ? "cc" : "77"}, inset 0 0 10px rgba(0,0,0,0.35)`,
                      color: "#0b1020",
                      border: `1px solid ${skill.color}`,
                      transform: `scale(${isActive ? 1.2 : 1})`,
                    }}
                  >
                    {skill.name}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Connection line from center to active planet */}
        {active && (
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              r={ORBIT_RADII[active.orbit as 1 | 2 | 3]}
              fill="none"
              stroke={active.color}
              strokeWidth="1"
              opacity="0.5"
              className="animate-pulse"
            />
          </svg>
        )}
      </div>

      {/* Tooltip / details */}
      <div
        className="mt-6 min-h-[90px] w-full max-w-md flex items-center justify-center transition-all duration-300"
        aria-live="polite"
      >
        {active ? (
          <div
            className="glass-card px-5 py-4 rounded-xl text-center w-full animate-fade-in border"
            style={{
              borderColor: `${active.color}55`,
              boxShadow: `0 0 24px ${active.color}22`,
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: active.color, boxShadow: `0 0 8px ${active.color}` }}
              />
              <span className="font-semibold text-base">{active.name}</span>
              <span className="text-xs font-mono text-primary">{active.level}%</span>
            </div>
            <p className="text-xs text-muted-foreground">{active.description}</p>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground/60 italic">
            Hover a planet or use arrow keys to explore the galaxy
          </p>
        )}
      </div>
    </div>
  );
};

export default SkillsGalaxy;
