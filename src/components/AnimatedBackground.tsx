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
      const xPercent = (clientX / innerWidth - 0.5) * 15;
      const yPercent = (clientY / innerHeight - 0.5) * 15;
      const shapes = canvasRef.current.querySelectorAll('.parallax-shape');
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        (shape as HTMLElement).style.transform =
          `translate(${xPercent * speed}px, ${yPercent * speed}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={canvasRef} className="fixed inset-0 pointer-events-none overflow-hidden transition-colors duration-700" style={{ zIndex: 1 }}>
      {/* Large central morphing blob */}
      <div
        className="parallax-shape absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-morph"
        style={{
          width: '800px',
          height: '800px',
          background: `radial-gradient(ellipse at 40% 40%, hsl(${colors.c1} / 0.6) 0%, hsl(${colors.c2} / 0.35) 40%, transparent 70%)`,
          filter: 'blur(40px)',
          animationDuration: '12s',
        }}
      />
      {/* Inner brighter core blob */}
      <div
        className="parallax-shape absolute animate-morph animate-rotate-slow"
        style={{
          top: '30%',
          left: '30%',
          width: '500px',
          height: '500px',
          background: `radial-gradient(ellipse at 50% 50%, hsl(${colors.c1} / 0.7) 0%, hsl(${colors.c2} / 0.3) 50%, transparent 75%)`,
          filter: 'blur(30px)',
          animationDuration: '8s',
          animationDelay: '1s',
        }}
      />
      {/* Secondary offset blob */}
      <div
        className="parallax-shape absolute animate-morph"
        style={{
          top: '20%',
          left: '45%',
          width: '600px',
          height: '600px',
          background: `radial-gradient(ellipse at 60% 30%, hsl(${colors.c2} / 0.5) 0%, hsl(${colors.c3} / 0.2) 45%, transparent 70%)`,
          filter: 'blur(35px)',
          animationDuration: '15s',
          animationDirection: 'reverse',
        }}
      />
      {/* Bottom-right glow */}
      <div
        className="parallax-shape absolute animate-morph animate-glow"
        style={{
          bottom: '10%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, hsl(${colors.c1} / 0.4) 0%, transparent 60%)`,
          filter: 'blur(40px)',
          animationDelay: '5s',
        }}
      />
      {/* Floating particles */}
      <div className="parallax-shape absolute top-[15%] right-[15%] w-3 h-3 bg-primary rounded-full opacity-70 animate-float" />
      <div className="parallax-shape absolute top-1/3 left-[55%] w-2 h-2 bg-primary rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }} />
      <div className="parallax-shape absolute top-[55%] right-[30%] w-2 h-2 bg-primary rounded-full opacity-50 animate-float" style={{ animationDelay: '3s' }} />
      <div className="parallax-shape absolute top-2/3 left-1/4 w-3 h-3 bg-primary rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }} />
      <div className="parallax-shape absolute bottom-[25%] right-[45%] w-2 h-2 bg-primary rounded-full opacity-55 animate-float" style={{ animationDelay: '4s' }} />
      <div className="parallax-shape absolute top-[10%] left-[10%] w-2 h-2 bg-primary rounded-full opacity-45 animate-float" style={{ animationDelay: '5s' }} />
    </div>
  );
};

export default AnimatedBackground;
