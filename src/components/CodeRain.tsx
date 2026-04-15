import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const themeHexColors: Record<string, string> = {
  cyan: '#3ECBDB',
  golden: '#E8A020',
  purple: '#9B59E0',
};

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;

    let animationFrame: number;
    const color = themeHexColors[theme] || '#3ECBDB';

    const draw = () => {
      ctx.fillStyle = 'rgba(14, 16, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animationFrame = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animationFrame); window.removeEventListener('resize', handleResize); };
  }, [theme]);

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-[0.04] pointer-events-none" />
  );
};

export default CodeRain;
