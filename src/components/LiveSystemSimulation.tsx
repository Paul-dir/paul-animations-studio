import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Rocket, RotateCcw, XCircle } from "lucide-react";

type Step = {
  label: string;
  detail: string;
  duration: number;
};

const STEPS: Step[] = [
  { label: "Starting Containers", detail: "docker compose up -d api web worker", duration: 900 },
  { label: "Connecting Database", detail: "postgres://cluster-prod:5432/tax_audit ✓", duration: 750 },
  { label: "Loading Redis Cache", detail: "redis-cli PING → PONG (0.4ms)", duration: 550 },
  { label: "Building React App", detail: "vite build → 182KB gzipped in 3.2s", duration: 1200 },
  { label: "Starting API", detail: "listening on :8080 · 42 routes registered", duration: 700 },
  { label: "Running Migrations", detail: "23 migrations applied · schema up to date", duration: 650 },
  { label: "Health Check", detail: "GET /healthz → 200 OK (12ms)", duration: 600 },
];

type Status = "idle" | "pending" | "running" | "done" | "fail";

const LiveSystemSimulation = () => {
  const [statuses, setStatuses] = useState<Status[]>(() => STEPS.map(() => "idle"));
  const [logs, setLogs] = useState<string[]>([]);
  const [deploying, setDeploying] = useState(false);
  const [ready, setReady] = useState(false);
  const timers = useRef<number[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStatuses(STEPS.map(() => "idle"));
    setLogs([]);
    setDeploying(false);
    setReady(false);
  };

  const deploy = () => {
    if (deploying) return;
    reset();
    setDeploying(true);
    setLogs(["> pawlos@portfolio: ./deploy --env=demo tax-audit-system", "» acquiring build context…"]);

    let cursor = 0;
    const runStep = (i: number) => {
      setStatuses((prev) => {
        const next = [...prev];
        next[i] = "running";
        return next;
      });
      setLogs((l) => [...l, `[${new Date().toLocaleTimeString()}] → ${STEPS[i].label}…`]);

      const t = window.setTimeout(() => {
        setStatuses((prev) => {
          const next = [...prev];
          next[i] = "done";
          return next;
        });
        setLogs((l) => [...l, `  ✓ ${STEPS[i].detail}`]);
        cursor++;
        if (cursor < STEPS.length) {
          runStep(cursor);
        } else {
          const done = window.setTimeout(() => {
            setDeploying(false);
            setReady(true);
            setLogs((l) => [...l, "", "✓ Application ready → https://tax-audit.demo.app"]);
          }, 400);
          timers.current.push(done);
        }
      }, STEPS[i].duration);
      timers.current.push(t);
    };
    runStep(0);
  };

  return (
    <div className="rounded-2xl border border-primary/25 bg-card/60 backdrop-blur-xl p-4 md:p-6 shadow-lg shadow-primary/10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h4 className="text-lg md:text-xl font-bold gradient-text">
            Live System Simulation
          </h4>
          <p className="text-xs text-muted-foreground font-mono">
            Press deploy to watch a simulated pipeline spin up the system
          </p>
        </div>
        <div className="flex gap-2">
          {ready && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border/70 text-xs font-medium text-foreground/80 hover:text-primary hover:border-primary/50"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          )}
          <button
            onClick={deploy}
            disabled={deploying}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold shadow-[0_0_16px_hsl(var(--primary)/0.4)] hover:opacity-90 disabled:opacity-50"
          >
            <Rocket className="h-3.5 w-3.5" />
            {deploying ? "Deploying…" : ready ? "Redeploy" : "Deploy Demo"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Step checklist */}
        <div className="rounded-xl border border-border/60 bg-background/60 p-3 space-y-1.5">
          {STEPS.map((s, i) => {
            const st = statuses[i];
            return (
              <motion.div
                key={s.label}
                initial={false}
                animate={{
                  opacity: st === "idle" ? 0.55 : 1,
                }}
                className={`flex items-start gap-2.5 p-2 rounded-md border transition-colors ${
                  st === "running"
                    ? "border-primary/60 bg-primary/10"
                    : st === "done"
                    ? "border-primary/25 bg-primary/[0.04]"
                    : "border-transparent"
                }`}
              >
                <span className="mt-0.5">
                  {st === "done" && (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  )}
                  {st === "running" && (
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  )}
                  {st === "fail" && <XCircle className="h-4 w-4 text-destructive" />}
                  {st === "idle" && (
                    <span className="block h-4 w-4 rounded-full border border-border" />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-medium ${
                      st === "done" || st === "running"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </div>
                  {st !== "idle" && (
                    <div className="text-[11px] font-mono text-muted-foreground truncate">
                      {s.detail}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          <AnimatePresence>
            {ready && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 rounded-lg border border-primary/50 bg-primary/15 text-center"
              >
                <div className="text-sm font-bold text-primary">
                  ✓ Application Ready
                </div>
                <div className="text-[11px] font-mono text-muted-foreground">
                  All systems nominal · 7/7 checks passed
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Terminal log */}
        <div className="rounded-xl border border-primary/30 bg-[#0b0f14]/95 p-0 overflow-hidden flex flex-col min-h-[280px]">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-white/[0.03]">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-[11px] font-mono text-white/60">
              deploy.log
            </span>
          </div>
          <div
            ref={logRef}
            className="flex-1 overflow-y-auto p-3 font-mono text-[11px] leading-relaxed text-green-300/90 whitespace-pre-wrap"
          >
            {logs.length === 0 ? (
              <span className="text-white/40">
                # awaiting deploy command…
              </span>
            ) : (
              logs.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.startsWith("  ✓")
                      ? "text-cyan-300/90"
                      : l.startsWith("✓")
                      ? "text-primary font-semibold"
                      : l.startsWith(">")
                      ? "text-white/80"
                      : ""
                  }
                >
                  {l || "\u00A0"}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSystemSimulation;
