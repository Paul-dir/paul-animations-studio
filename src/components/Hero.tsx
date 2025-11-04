import { Button } from "@/components/ui/button";
import { Github, Mail, Phone, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated 3D-style gradient shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] opacity-30 animate-morph animate-rotate-slow"
          style={{
            background: 'radial-gradient(circle at 30% 30%, hsl(187 85% 55%) 0%, hsl(207 85% 60%) 40%, transparent 70%)',
            filter: 'blur(80px)',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-[600px] h-[600px] opacity-25 animate-morph"
          style={{
            background: 'radial-gradient(circle at 70% 70%, hsl(207 85% 60%) 0%, hsl(187 85% 65%) 40%, transparent 70%)',
            filter: 'blur(90px)',
            animationDelay: '3s',
            animationDuration: '12s',
            transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Text content */}
        <div className="space-y-6 animate-fade-in">
          <p className="text-muted-foreground text-lg">Hello, I'm</p>
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="gradient-text">Pawlos Diriba</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground/90">
            Software Developer
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            A passionate Software Engineering student crafting responsive and user-friendly web experiences with modern technologies.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-primary hover:bg-primary-glow text-primary-foreground font-semibold px-8 py-6 text-lg glow-effect transition-all hover:scale-105"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-primary/50 hover:border-primary text-foreground font-semibold px-8 py-6 text-lg transition-all hover:scale-105"
              asChild
            >
              <a href="/resume.pdf" download>
                Download Resume
              </a>
            </Button>
          </div>

          <div className="flex gap-4 pt-4">
            <a 
              href="https://github.com/Paul-dir" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-all hover:scale-110 glow-effect"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="mailto:paudiriba@gmail.com"
              className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-all hover:scale-110 glow-effect"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a 
              href="tel:+251941551883"
              className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-all hover:scale-110 glow-effect"
            >
              <Phone className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Right side - Profile image with 3D effect */}
        <div className="flex justify-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <div 
            className="relative group"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary rounded-full blur-3xl opacity-40 animate-glow group-hover:opacity-60 transition-opacity"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full animate-morph"></div>
            <img 
              src="https://github.com/Paul-dir.png" 
              alt="Pawlos Diriba" 
              className="relative rounded-full w-80 h-80 md:w-96 md:h-96 object-cover border-4 border-primary/40 shadow-2xl transition-all duration-300 group-hover:border-primary/60 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-primary" />
      </div>
    </section>
  );
};

export default Hero;
