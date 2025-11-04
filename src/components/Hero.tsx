import { Button } from "@/components/ui/button";
import { Github, Mail, Phone, ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
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

        {/* Right side - Profile image */}
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-full blur-2xl opacity-30 animate-glow"></div>
            <img 
              src="https://github.com/Paul-dir.png" 
              alt="Pawlos Diriba" 
              className="relative rounded-full w-80 h-80 md:w-96 md:h-96 object-cover border-4 border-primary/30 shadow-2xl animate-float"
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
