import { FolderGit2, GitBranch, Cpu, GitCommit, Coffee, Infinity as InfinityIcon } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type Stat = {
  icon: typeof FolderGit2;
  value: number;
  label: string;
  suffix?: string;
  pad?: number; // zero-pad digits
  infinite?: boolean;
};

const Stats = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const stats: Stat[] = [
    { icon: FolderGit2, value: 25, label: "Projects Completed", pad: 3 },
    { icon: GitBranch, value: 38, label: "Repositories", pad: 3 },
    { icon: Cpu, value: 17, label: "Technologies", pad: 3 },
    { icon: GitCommit, value: 4500, label: "Commits", suffix: "+" },
    { icon: Coffee, value: 0, label: "Coffee", infinite: true },
  ];

  const [counters, setCounters] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    if (!isInView) return;
    const duration = 2200;
    const start = performance.now();
    const targets = stats.map((s) => s.value);
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCounters(targets.map((v) => Math.floor(v * eased)));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setCounters(targets);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const format = (n: number, pad?: number) => {
    if (!pad) return n.toLocaleString();
    return n.toString().padStart(pad, "0");
  };

  return (
    <section className="py-20 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Statistics</span>{" "}
            <span className="text-foreground">Dashboard</span>
          </h2>
          <p className="text-muted-foreground">Live snapshot of the numbers behind the work.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center glass-card p-6 rounded-2xl hover:glow-effect transition-all duration-300 group relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              whileHover={{ scale: 1.04, y: -6 }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 font-mono tabular-nums">
                {stat.infinite ? (
                  <InfinityIcon className="inline h-9 w-9" aria-label="infinite" />
                ) : (
                  <>
                    {format(counters[index], stat.pad)}
                    {stat.suffix ?? ""}
                  </>
                )}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
