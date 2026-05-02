import { useState, useMemo } from "react";

type RadarSkill = { name: string; level: number; description: string };

const radarSkills: RadarSkill[] = [
  { name: "React", level: 92, description: "Component architecture, hooks, state management, performance optimization" },
  { name: "TypeScript", level: 80, description: "Type-safe development, generics, utility types, strict mode" },
  { name: "Tailwind", level: 95, description: "Utility-first styling, custom design systems, responsive layouts" },
  { name: "Backend", level: 83, description: "Supabase, Firebase, REST APIs, authentication flows" },
  { name: "UI/UX", level: 87, description: "Figma, responsive design, accessibility, micro-interactions" },
  { name: "DevOps", level: 85, description: "Git workflows, Vercel deployments, CI/CD, monitoring" },
];

const SIZE = 300;
const CENTER = SIZE / 2;
const RINGS = 4;
const MAX_RADIUS = 120;

function polarToXY(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

interface Props {
  isVisible: boolean;
}

const SkillsRadar = ({ isVisible }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const count = radarSkills.length;
  const angleStep = 360 / count;

  const gridRings = useMemo(
    () =>
      Array.from({ length: RINGS }, (_, i) => {
        const r = ((i + 1) / RINGS) * MAX_RADIUS;
        const points = Array.from({ length: count }, (_, j) => {
          const { x, y } = polarToXY(j * angleStep, r);
          return `${x},${y}`;
        }).join(" ");
        return points;
      }),
    [count, angleStep]
  );

  const dataPoints = useMemo(
    () =>
      radarSkills.map((skill, i) => {
        const r = (skill.level / 100) * MAX_RADIUS;
        return polarToXY(i * angleStep, r);
      }),
    [angleStep]
  );

  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[340px] drop-shadow-lg"
        role="img"
        aria-label="Skills radar chart"
      >
        {/* Grid rings */}
        {gridRings.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="hsl(var(--primary) / 0.12)"
            strokeWidth="0.7"
          />
        ))}

        {/* Axis lines */}
        {radarSkills.map((_, i) => {
          const { x, y } = polarToXY(i * angleStep, MAX_RADIUS);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="hsl(var(--primary) / 0.08)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={dataPath}
          fill="hsl(var(--primary) / 0.15)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinejoin="round"
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0)",
            transformOrigin: "center",
          }}
        />

        {/* Data points & labels */}
        {radarSkills.map((skill, i) => {
          const pt = dataPoints[i];
          const labelPt = polarToXY(i * angleStep, MAX_RADIUS + 20);
          const isHovered = hoveredIndex === i;

          return (
            <g
              key={skill.name}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
            >
              {/* Hit area */}
              <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />

              {/* Dot */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 6 : 4}
                fill="hsl(var(--primary))"
                className="transition-all duration-300"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${i * 100 + 400}ms`,
                  filter: isHovered ? "drop-shadow(0 0 6px hsl(var(--primary)))" : "none",
                }}
              />

              {/* Label */}
              <text
                x={labelPt.x}
                y={labelPt.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-foreground/80 text-[10px] font-medium select-none"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 0.5s ease",
                  transitionDelay: `${i * 100 + 600}ms`,
                }}
              >
                {skill.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      <div
        className="mt-4 h-16 flex items-center justify-center transition-all duration-300"
        aria-live="polite"
      >
        {hoveredIndex !== null ? (
          <div className="glass-card px-5 py-3 rounded-xl text-center animate-fade-in max-w-xs">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="font-semibold text-sm">{radarSkills[hoveredIndex].name}</span>
              <span className="text-xs font-mono text-primary">{radarSkills[hoveredIndex].level}%</span>
            </div>
            <p className="text-xs text-muted-foreground">{radarSkills[hoveredIndex].description}</p>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground/60 italic">Hover a point to see details</p>
        )}
      </div>
    </div>
  );
};

export default SkillsRadar;
