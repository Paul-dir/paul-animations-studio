import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Database,
  ShieldCheck,
  LayoutDashboard,
  Bell,
  Network,
  Cpu,
  Layers,
  Zap,
} from "lucide-react";

type NodeId =
  | "frontend"
  | "auth"
  | "dashboard"
  | "gateway"
  | "notifications"
  | "backend"
  | "db";

type Node = {
  id: NodeId;
  label: string;
  icon: typeof Server;
  x: number; // 0-100
  y: number; // 0-100
  responsibilities: string[];
  tech: string[];
  endpoints?: string[];
  latency: string;
  deployment: string;
};

const NODES: Node[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Layers,
    x: 50,
    y: 8,
    responsibilities: ["Routing", "State management", "SSR-safe rendering"],
    tech: ["React 18", "TypeScript", "Vite", "Tailwind"],
    latency: "TTI ~ 1.2s",
    deployment: "Lovable CDN (edge)",
  },
  {
    id: "auth",
    label: "Authentication",
    icon: ShieldCheck,
    x: 18,
    y: 32,
    responsibilities: ["JWT issuance", "OAuth flows", "Session refresh"],
    tech: ["Supabase Auth", "PostgREST", "RLS"],
    endpoints: ["POST /auth/login", "POST /auth/refresh"],
    latency: "~ 80ms",
    deployment: "Lovable Cloud",
  },
  {
    id: "dashboard",
    label: "Dashboard Module",
    icon: LayoutDashboard,
    x: 82,
    y: 32,
    responsibilities: ["KPI aggregation", "Charting", "Report exports"],
    tech: ["React Query", "Recharts", "TanStack Table"],
    endpoints: ["GET /api/kpis", "GET /api/reports/:id"],
    latency: "~ 110ms",
    deployment: "Bundled with FE",
  },
  {
    id: "gateway",
    label: "API Gateway",
    icon: Network,
    x: 50,
    y: 55,
    responsibilities: ["Auth check", "Rate limiting", "Request routing"],
    tech: ["Edge Function", "Deno", "Zod"],
    endpoints: ["ANY /api/*"],
    latency: "~ 15ms overhead",
    deployment: "Global edge runtime",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    x: 85,
    y: 55,
    responsibilities: ["Email dispatch", "Webhook fanout"],
    tech: ["Resend", "Edge Function"],
    endpoints: ["POST /notify"],
    latency: "~ 200ms",
    deployment: "Async worker",
  },
  {
    id: "backend",
    label: "Backend Services",
    icon: Server,
    x: 50,
    y: 78,
    responsibilities: ["Business rules", "Validation", "Domain events"],
    tech: ["Node.js", "PostgREST", "TypeScript"],
    endpoints: ["/api/audits", "/api/filings"],
    latency: "~ 90ms",
    deployment: "Lovable Cloud",
  },
  {
    id: "db",
    label: "PostgreSQL",
    icon: Database,
    x: 50,
    y: 95,
    responsibilities: ["ACID storage", "RLS policies", "Full-text search"],
    tech: ["PostgreSQL 15", "pgvector", "pg_cron"],
    latency: "p50 ~ 8ms",
    deployment: "Managed cluster",
  },
];

const EDGES: [NodeId, NodeId][] = [
  ["frontend", "auth"],
  ["frontend", "dashboard"],
  ["auth", "gateway"],
  ["dashboard", "gateway"],
  ["gateway", "notifications"],
  ["gateway", "backend"],
  ["backend", "db"],
];

const REQUEST_PATH: NodeId[] = [
  "frontend",
  "auth",
  "gateway",
  "backend",
  "db",
];

const ArchitecturePlayground = () => {
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [selected, setSelected] = useState<NodeId | null>(null);
  const [pulseIdx, setPulseIdx] = useState(-1);
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);

  const active = selected ?? hovered;
  const activeNode = useMemo(() => NODES.find((n) => n.id === active) ?? null, [active]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const simulateRequest = () => {
    if (running) return;
    setRunning(true);
    setPulseIdx(0);
    REQUEST_PATH.forEach((_, i) => {
      const t = window.setTimeout(() => {
        setPulseIdx(i);
        if (i === REQUEST_PATH.length - 1) {
          const done = window.setTimeout(() => {
            setPulseIdx(-1);
            setRunning(false);
          }, 700);
          timers.current.push(done);
        }
      }, i * 650);
      timers.current.push(t);
    });
  };

  const nodeById = (id: NodeId) => NODES.find((n) => n.id === id)!;

  const pulseNodeId = pulseIdx >= 0 ? REQUEST_PATH[pulseIdx] : null;
  const pulseFrom = pulseIdx > 0 ? REQUEST_PATH[pulseIdx - 1] : null;

  return (
    <div className="rounded-2xl border border-primary/25 bg-card/60 backdrop-blur-xl p-4 md:p-6 shadow-lg shadow-primary/10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h4 className="text-lg md:text-xl font-bold gradient-text">
            Tax Audit System — Architecture
          </h4>
          <p className="text-xs text-muted-foreground font-mono">
            Hover a node for details · click to pin · press play to trace a request
          </p>
        </div>
        <button
          onClick={simulateRequest}
          disabled={running}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold shadow-[0_0_16px_hsl(var(--primary)/0.4)] hover:opacity-90 disabled:opacity-50"
        >
          <Zap className="h-3.5 w-3.5" />
          {running ? "Tracing…" : "Simulate Request"}
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_260px] gap-4">
        {/* Diagram */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/11] rounded-xl border border-border/60 bg-background/50 overflow-hidden">
          {/* Grid overlay */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--primary)/0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.08) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            {EDGES.map(([a, b]) => {
              const na = nodeById(a);
              const nb = nodeById(b);
              const isPulse =
                pulseFrom === a && pulseNodeId === b;
              return (
                <g key={`${a}-${b}`}>
                  <line
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke={
                      isPulse
                        ? "hsl(var(--primary))"
                        : "hsl(var(--primary) / 0.25)"
                    }
                    strokeWidth={isPulse ? 0.6 : 0.25}
                    strokeDasharray={isPulse ? "0" : "1 1"}
                    vectorEffect="non-scaling-stroke"
                  />
                  {isPulse && (
                    <circle r="1.2" fill="hsl(var(--primary))">
                      <animate
                        attributeName="cx"
                        from={na.x}
                        to={nb.x}
                        dur="0.55s"
                        fill="freeze"
                      />
                      <animate
                        attributeName="cy"
                        from={na.y}
                        to={nb.y}
                        dur="0.55s"
                        fill="freeze"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {NODES.map((n) => {
            const Icon = n.icon;
            const isActive = active === n.id;
            const isPulse = pulseNodeId === n.id;
            return (
              <button
                key={n.id}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() =>
                  setSelected((s) => (s === n.id ? null : n.id))
                }
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group`}
              >
                <span
                  className={`h-11 w-11 md:h-12 md:w-12 rounded-xl border flex items-center justify-center backdrop-blur transition-all ${
                    isActive
                      ? "border-primary bg-primary/20 shadow-[0_0_22px_hsl(var(--primary)/0.55)] scale-110"
                      : isPulse
                      ? "border-primary bg-primary/25 shadow-[0_0_30px_hsl(var(--primary)/0.7)]"
                      : "border-primary/40 bg-card/80 group-hover:border-primary/70"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 md:h-5 md:w-5 ${
                      isActive || isPulse
                        ? "text-primary"
                        : "text-foreground/70 group-hover:text-primary"
                    }`}
                  />
                </span>
                <span
                  className={`text-[10px] md:text-xs font-mono px-1.5 py-0.5 rounded whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/70 text-foreground/70"
                  }`}
                >
                  {n.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Details panel */}
        <div className="rounded-xl border border-border/60 bg-background/60 p-3 min-h-[220px]">
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <activeNode.icon className="h-4 w-4 text-primary" />
                  <h5 className="font-semibold text-sm text-primary">
                    {activeNode.label}
                  </h5>
                </div>

                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                  Responsibilities
                </p>
                <ul className="mb-2.5 space-y-0.5">
                  {activeNode.responsibilities.map((r) => (
                    <li key={r} className="text-xs text-foreground/80">
                      • {r}
                    </li>
                  ))}
                </ul>

                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                  Tech
                </p>
                <div className="flex flex-wrap gap-1 mb-2.5">
                  {activeNode.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 border border-primary/25 text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {activeNode.endpoints && (
                  <>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                      Endpoints
                    </p>
                    <ul className="mb-2.5 space-y-0.5">
                      {activeNode.endpoints.map((e) => (
                        <li
                          key={e}
                          className="text-[11px] font-mono text-foreground/80"
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
                  <div className="p-2 rounded border border-border/60">
                    <div className="text-muted-foreground text-[10px]">
                      Latency
                    </div>
                    <div className="font-mono text-primary">
                      {activeNode.latency}
                    </div>
                  </div>
                  <div className="p-2 rounded border border-border/60">
                    <div className="text-muted-foreground text-[10px]">
                      Deploy
                    </div>
                    <div className="font-mono text-primary">
                      {activeNode.deployment}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-4"
              >
                <Cpu className="h-6 w-6 mb-2 text-primary/60" />
                <p className="text-xs">
                  Hover any service to inspect its role, tech and endpoints.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturePlayground;
