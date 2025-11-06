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
    { icon: Award, value: 3, label: "Years Experience", suffix: "" }
  ];

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = end;
              return newCounters;
            });
            clearInterval(timer);
          } else {
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = Math.floor(start);
              return newCounters;
            });
          }
        }, 16);

        return () => clearInterval(timer);
      });
    }
  }, [isVisible]);

  return (
    <section className="py-16 px-4 relative" ref={elementRef}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
      
      <div className="container mx-auto relative z-10">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center glass-card p-6 rounded-xl hover:glow-effect transition-all hover:scale-110 duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex p-4 rounded-full bg-primary/20 mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {counters[index]}{stat.suffix}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
