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
    <div ref={canvasRef} className="fixed inset-0 pointer-events-none overflow-hidden transition-colors duration-700 z-0">
      {/* Large primary blob */}
      <div
        className="parallax-shape absolute top-[10%] left-[15%] w-[500px] h-[500px] animate-morph animate-rotate-slow"
        style={{
          background: `radial-gradient(circle, hsl(${colors.c1} / 0.7) 0%, hsl(${colors.c2} / 0.4) 50%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
      {/* Secondary blob */}
      <div
        className="parallax-shape absolute top-[40%] right-[10%] w-[600px] h-[600px] animate-morph"
        style={{
          background: `radial-gradient(circle, hsl(${colors.c2} / 0.6) 0%, hsl(${colors.c3} / 0.3) 50%, transparent 70%)`,
          filter: 'blur(45px)',
          animationDelay: '3s',
          animationDuration: '10s',
        }}
      />
      {/* Third blob */}
      <div
        className="parallax-shape absolute bottom-[15%] left-[25%] w-[450px] h-[450px] animate-morph animate-rotate-slow"
        style={{
          background: `radial-gradient(circle, hsl(${colors.c3} / 0.6) 0%, hsl(${colors.c1} / 0.3) 50%, transparent 70%)`,
          filter: 'blur(50px)',
          animationDelay: '5s',
          animationDirection: 'reverse',
        }}
      />
      {/* Extra glow accent */}
      <div
        className="parallax-shape absolute top-[60%] left-[50%] w-[350px] h-[350px] animate-morph animate-glow"
        style={{
          background: `radial-gradient(circle, hsl(${colors.c1} / 0.5) 0%, transparent 60%)`,
          filter: 'blur(35px)',
          animationDelay: '7s',
        }}
      />
      {/* Floating particles */}
      <div className="parallax-shape absolute top-1/3 left-1/2 w-3 h-3 bg-primary rounded-full opacity-80 animate-float" />
      <div className="parallax-shape absolute top-2/3 left-1/4 w-4 h-4 bg-primary rounded-full opacity-70 animate-float" style={{ animationDelay: '2s' }} />
      <div className="parallax-shape absolute top-1/2 right-1/3 w-3 h-3 bg-primary rounded-full opacity-90 animate-float" style={{ animationDelay: '4s' }} />
      <div className="parallax-shape absolute top-[20%] right-[20%] w-2 h-2 bg-primary rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }} />
      <div className="parallax-shape absolute bottom-[30%] right-[40%] w-3 h-3 bg-primary rounded-full opacity-75 animate-float" style={{ animationDelay: '3s' }} />
    </div>
  );
};

export default AnimatedBackground;
