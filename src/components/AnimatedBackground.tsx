import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const themeColors = {
    cyan: { c1: "187 85% 53%", c2: "195 80% 40%", c3: "180 70% 45%" },
    golden: { c1: "38 95% 55%", c2: "20 90% 55%", c3: "30 95% 60%" },
    purple: { c1: "270 80% 60%", c2: "290 80% 55%", c3: "280 80% 65%" },
  };

  const colors = themeColors[theme];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth - 0.5) * 10;
      const yPercent = (clientY / innerHeight - 0.5) * 10;
      const shapes = canvasRef.current.querySelectorAll('.parallax-shape');
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.2;
        (shape as HTMLElement).style.transform =
          `translate(${xPercent * speed}px, ${yPercent * speed}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={canvasRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large outer ellipse - the biggest visible rotating shape */}
      <div
        className="parallax-shape absolute animate-rotate-slow"
        style={{
          top: '5%',
          left: '25%',
          width: '55vw',
          height: '75vh',
          borderRadius: '50%',
          background: 'transparent',
          border: `2px solid hsl(${colors.c1} / 0.35)`,
          animationDuration: '25s',
        }}
      />

      {/* Second large tilted ellipse overlapping */}
      <div
        className="parallax-shape absolute animate-rotate-slow"
        style={{
          top: '-5%',
          left: '20%',
          width: '50vw',
          height: '80vh',
          borderRadius: '50%',
          background: 'transparent',
          border: `2px solid hsl(${colors.c1} / 0.3)`,
          animationDuration: '30s',
          animationDirection: 'reverse',
          transform: 'rotate(-30deg)',
        }}
      />

      {/* Inner bright core ellipse */}
      <div
        className="parallax-shape absolute animate-rotate-slow"
        style={{
          top: '15%',
          left: '30%',
          width: '35vw',
          height: '50vh',
          borderRadius: '50%',
          background: 'transparent',
          border: `2px solid hsl(${colors.c1} / 0.4)`,
          animationDuration: '20s',
        }}
      />

      {/* Ambient glow behind the ellipses */}
      <div
        className="parallax-shape absolute"
        style={{
          top: '10%',
          left: '25%',
          width: '50vw',
          height: '60vh',
          borderRadius: '50%',
          background: `radial-gradient(ellipse at 50% 50%, hsl(${colors.c1} / 0.15) 0%, transparent 60%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Small accent circle bottom-right */}
      <div
        className="parallax-shape absolute animate-rotate-slow"
        style={{
          bottom: '10%',
          right: '10%',
          width: '20vw',
          height: '20vw',
          maxWidth: '300px',
          maxHeight: '300px',
          borderRadius: '50%',
          background: 'transparent',
          border: `2px solid hsl(${colors.c1} / 0.3)`,
          animationDuration: '18s',
          animationDirection: 'reverse',
        }}
      />

      {/* Floating particles */}
      <div className="parallax-shape absolute top-[15%] right-[15%] w-2 h-2 bg-primary rounded-full opacity-60 animate-float" />
      <div className="parallax-shape absolute top-[40%] left-[60%] w-1.5 h-1.5 bg-primary rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }} />
      <div className="parallax-shape absolute top-[60%] right-[25%] w-2 h-2 bg-primary rounded-full opacity-40 animate-float" style={{ animationDelay: '3s' }} />
      <div className="parallax-shape absolute top-[75%] left-[20%] w-1.5 h-1.5 bg-primary rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }} />
      <div className="parallax-shape absolute top-[5%] left-[45%] w-2 h-2 bg-primary rounded-full opacity-45 animate-float" style={{ animationDelay: '4s' }} />
      <div className="parallax-shape absolute bottom-[30%] right-[50%] w-1.5 h-1.5 bg-primary rounded-full opacity-35 animate-float" style={{ animationDelay: '5s' }} />
    </div>
  );
};

export default AnimatedBackground;
