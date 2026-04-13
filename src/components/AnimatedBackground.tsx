import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const themeColors = {
    cyan: { c1: "187 85% 55%", c2: "207 85% 60%", c3: "187 85% 65%" },
    golden: { c1: "38 95% 55%", c2: "20 90% 55%", c3: "30 95% 60%" },
    purple: { c1: "270 80% 60%", c2: "290 80% 55%", c3: "280 80% 65%" },
  };

  const colors = themeColors[theme];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth - 0.5) * 20;
      const yPercent = (clientY / innerHeight - 0.5) * 20;
      const shapes = canvasRef.current.querySelectorAll('.parallax-shape');
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        (shape as HTMLElement).style.transform =
          `translate(${xPercent * speed}px, ${yPercent * speed}px) rotate(${xPercent * 0.5}deg)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={canvasRef} className="fixed inset-0 pointer-events-none overflow-hidden transition-colors duration-700">
      <div
        className="parallax-shape absolute top-1/4 left-1/4 w-96 h-96 opacity-30 animate-morph animate-rotate-slow"
        style={{
          background: `radial-gradient(circle, hsl(${colors.c1}) 0%, hsl(${colors.c2}) 50%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      <div
        className="parallax-shape absolute top-1/2 right-1/4 w-[30rem] h-[30rem] opacity-25 animate-morph"
        style={{
          background: `radial-gradient(circle, hsl(${colors.c2}) 0%, hsl(${colors.c3}) 50%, transparent 70%)`,
          filter: 'blur(70px)',
          animationDelay: '3s',
          animationDuration: '10s',
        }}
      />
      <div
        className="parallax-shape absolute bottom-1/4 left-1/3 w-80 h-80 opacity-20 animate-morph animate-rotate-slow"
        style={{
          background: `radial-gradient(circle, hsl(${colors.c3}) 0%, hsl(${colors.c2}) 50%, transparent 70%)`,
          filter: 'blur(80px)',
          animationDelay: '5s',
          animationDirection: 'reverse',
        }}
      />
      <div className="parallax-shape absolute top-1/3 left-1/2 w-2 h-2 bg-primary rounded-full opacity-50 animate-float" />
      <div className="parallax-shape absolute top-2/3 left-1/4 w-3 h-3 bg-primary rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }} />
      <div className="parallax-shape absolute top-1/2 right-1/3 w-2 h-2 bg-primary rounded-full opacity-60 animate-float" style={{ animationDelay: '4s' }} />
    </div>
  );
};

export default AnimatedBackground;
