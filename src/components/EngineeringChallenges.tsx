import { motion, AnimatePresence } from "framer-motion";
import { Users, AlertTriangle, Lightbulb, TrendingUp, Database, Zap, Shield, Layers, ImageIcon, X } from "lucide-react";
import { useState } from "react";

type Challenge = {
  icon: typeof Users;
  challenge: string;
  problem: string;
  solution: string;
  result: string;
  resultDetail: string;
  tags: string[];
  image: string;
  imageAlt: string;
};

const CHALLENGES: Challenge[] = [
  {
    icon: Users,
    challenge: "100,000 Users",
    problem: "Slow dashboard query on join-heavy report (4.2s p95)",
    solution: "Composite index + materialized view + Redis cache",
    result: "87% Faster",
    resultDetail: "4.2s → 540ms p95",
    tags: ["PostgreSQL", "Redis", "Indexing"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop",
    imageAlt: "Query performance dashboard",
  },
  {
    icon: Database,
    challenge: "10M+ Records",
    problem: "Full-table scans blocking analytics pipeline",
    solution: "Partitioning by month + partial indexes on hot ranges",
    result: "12x Throughput",
    resultDetail: "Batch job: 6h → 30min",
    tags: ["Partitioning", "SQL", "ETL"],
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&auto=format&fit=crop",
    imageAlt: "Data pipeline visualization",
  },
  {
    icon: Zap,
    challenge: "API at Scale",
    problem: "REST endpoints timing out under concurrent load",
    solution: "Connection pooling, N+1 elimination, response streaming",
    result: "3x Capacity",
    resultDetail: "200 → 600 rps per node",
    tags: ["Node.js", "Pooling", "Profiling"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop",
    imageAlt: "API server monitoring",
  },
  {
    icon: Shield,
    challenge: "Zero-Downtime Deploy",
    problem: "Schema migrations locking production tables",
    solution: "Expand-contract pattern + shadow writes + backfill jobs",
    result: "0s Downtime",
    resultDetail: "Across 8 major releases",
    tags: ["Migrations", "CI/CD", "Postgres"],
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=900&auto=format&fit=crop",
    imageAlt: "CI/CD deployment pipeline",
  },
  {
    icon: Layers,
    challenge: "Monolith → Services",
    problem: "Coupled modules blocking independent releases",
    solution: "Domain boundaries, event bus, contract tests",
    result: "5x Deploy Speed",
    resultDetail: "Weekly → daily releases",
    tags: ["Architecture", "Events", "Testing"],
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=900&auto=format&fit=crop",
    imageAlt: "Microservices architecture diagram",
  },
  {
    icon: TrendingUp,
    challenge: "Realtime Sync",
    problem: "Polling exhausting mobile battery + bandwidth",
    solution: "WebSocket channels + delta updates + backoff",
    result: "-72% Payload",
    resultDetail: "Battery drain cut in half",
    tags: ["WebSockets", "Realtime", "Mobile"],
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=900&auto=format&fit=crop",
    imageAlt: "Realtime network traffic",
  },
];

const StageLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary/70">{children}</span>
);

const Arrow = () => (
  <div className="flex justify-center py-2" aria-hidden="true">
    <motion.div
      className="w-px h-6 bg-gradient-to-b from-primary/60 to-transparent"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{ transformOrigin: "top" }}
    />
  </div>
);

const ChallengeCard = ({ c, i }: { c: Challenge; i: number }) => {
  const [hover, setHover] = useState(false);
  const Icon = c.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ y: -6 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group border border-border/50 hover:border-primary/50 transition-colors"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(400px circle at 50% 0%, hsl(var(--primary)/0.08), transparent 60%)",
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <StageLabel>Challenge</StageLabel>
            <h3 className="text-lg font-bold text-foreground leading-tight">{c.challenge}</h3>
          </div>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">#{String(i + 1).padStart(2, "0")}</span>
      </div>

      {/* Pipeline */}
      <div className="space-y-0 relative z-10">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
          <div>
            <StageLabel>Problem</StageLabel>
            <p className="text-sm text-foreground/85 leading-relaxed">{c.problem}</p>
          </div>
        </div>

        <Arrow />

        <div className="flex items-start gap-3">
          <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div>
            <StageLabel>Solution</StageLabel>
            <p className="text-sm text-foreground/85 leading-relaxed">{c.solution}</p>
          </div>
        </div>

        <Arrow />

        <motion.div
          className="rounded-xl border border-primary/30 bg-primary/5 p-4 mt-2"
          animate={hover ? { boxShadow: "0 0 30px hsl(var(--primary)/0.25)" } : { boxShadow: "0 0 0px hsl(var(--primary)/0)" }}
        >
          <StageLabel>Result</StageLabel>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold gradient-text">{c.result}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">{c.resultDetail}</p>
        </motion.div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-5 relative z-10">
        {c.tags.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md bg-secondary/50 border border-border/60 text-[10px] font-mono text-foreground/70"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
};

const EngineeringChallenges = () => {
  return (
    <section id="challenges" className="py-24 px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary/80">
            $ ./challenges --show-impact
          </span>
          <h2 className="section-heading mt-3">
            Engineering <span className="gradient-text">Challenges</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real problems, real trade-offs, measurable outcomes — how I think through tough systems work.
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHALLENGES.map((c, i) => (
            <ChallengeCard key={c.challenge} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringChallenges;
