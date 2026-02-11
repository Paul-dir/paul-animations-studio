import { Award, Users, Coffee, FolderGit2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

const Stats = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  const stats = [
    { icon: FolderGit2, value: 15, label: "Projects Completed", suffix: "+" },
    { icon: Users, value: 10, label: "Happy Clients", suffix: "+" },
    { icon: Coffee, value: 500, label: "Cups of Coffee", suffix: "+" },
    { icon: Award, value: 3, label: "Years Experience", suffix: "+" },
  ];

  useEffect(() => {
    if (!isVisible) return;
    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCounters((prev) => { const n = [...prev]; n[index] = end; return n; });
          clearInterval(timer);
        } else {
          setCounters((prev) => { const n = [...prev]; n[index] = Math.floor(start); return n; });
        }
      }, 16);
    });
  }, [isVisible]);

  return (
    <section className="py-20 px-4 relative" ref={elementRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center glass-card p-8 rounded-2xl hover:glow-effect transition-all hover:scale-105 hover:-translate-y-2 duration-300 group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {counters[index]}{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
