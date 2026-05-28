import { Award, Users, Coffee, FolderGit2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const Stats = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  const stats = [
    { icon: FolderGit2, value: 15, label: "Projects Completed", suffix: "+" },
    { icon: Users, value: 10, label: "Happy Clients", suffix: "+" },
    { icon: Coffee, value: 500, label: "Cups of Coffee", suffix: "+" },
    { icon: Award, value: 3, label: "Years Experience", suffix: "+" },
  ];

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
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
  }, [isInView]);

  return (
    <section className="py-20 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center glass-card p-8 rounded-2xl hover:glow-effect transition-all duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {counters[index]}{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
