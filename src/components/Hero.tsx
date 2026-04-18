import { Button } from "@/components/ui/button";
import { Github, Mail, Phone, ChevronDown, Download, Sparkles, Star, Sparkle } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadCV = () => {
    window.open("/Pawlos-Diriba-CV.pdf", "_blank");
  };

  const d = (ms: number) => ({ transitionDelay: `${ms}ms` });

  const anim = (delay: number) =>
    `transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl animate-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full mix-blend-screen filter blur-3xl animate-glow" style={{ animationDelay: "1.5s" }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full animate-morph filter blur-[100px]"></div>

      {/* Floating particles */}
      <div className="absolute top-20 left-[10%] w-1 h-1 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute top-40 right-[15%] w-2 h-2 bg-primary rounded-full animate-float opacity-40" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-32 left-[20%] w-1.5 h-1.5 bg-primary rounded-full animate-float opacity-50" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[60%] right-[10%] w-1 h-1 bg-primary rounded-full animate-float opacity-70" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* LEFT COLUMN */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <p className={`text-xl md:text-2xl text-primary font-medium mb-2 ${anim(0)}`} style={d(100)}>
              Hello, I'm
            </p>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 ${anim(200)}`} style={d(200)}>
              <span className="text-foreground">Pawlos </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Diriba
              </span>
            </h1>
            
            <div className={`h-12 md:h-14 mb-6 ${anim(300)}`} style={d(300)}>
              <p className="text-2xl md:text-3xl text-primary/80 font-medium">
                Software Developer
              </p>
            </div>

            <p className={`text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed ${anim(400)}`} style={d(400)}>
              A passionate Software Engineering student crafting responsive and
              user-friendly web experiences with modern technologies.
            </p>

            <div className={`flex flex-wrap gap-4 justify-center lg:justify-start mb-12 ${anim(500)}`} style={d(500)}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg transition-all hover:scale-105 shadow-lg glow-effect"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-border hover:border-primary hover:bg-primary/10 text-foreground font-semibold px-8 py-6 text-lg transition-all hover:scale-105 group backdrop-blur-sm"
                onClick={downloadCV}
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </div>

            <div className={`flex gap-4 justify-center lg:justify-start ${anim(600)}`} style={d(600)}>
              <a
                href="https://github.com/Paul-dir"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 border border-border hover:border-primary transition-all hover:scale-110 hover:shadow-lg hover:glow-effect"
                aria-label="GitHub Profile"
              >
                <Github className="h-6 w-6 text-foreground" />
              </a>
              <a
                href="mailto:paudiriba@gmail.com"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 border border-border hover:border-primary transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Send Email"
              >
                <Mail className="h-6 w-6 text-foreground" />
              </a>
              <a
                href="tel:+251941551883"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 border border-border hover:border-primary transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Call Phone"
              >
                <Phone className="h-6 w-6 text-foreground" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Profile image with magical animations */}
          <div className={`lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0 transition-all duration-1000 ease-out ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} style={d(300)}>
            <div className="relative animate-float">
              {/* Outer magical aura layers */}
              <div className="absolute -inset-10 bg-gradient-to-r from-primary via-accent to-primary-glow rounded-full opacity-40 blur-3xl animate-glow"></div>
              <div className="absolute -inset-6 bg-gradient-to-tr from-accent via-primary to-accent rounded-full opacity-30 blur-2xl animate-glow" style={{ animationDelay: "1s" }}></div>

              {/* Rotating conic gradient ring */}
              <div className="absolute -inset-3 rounded-full animate-rotate-slow opacity-80"
                   style={{
                     background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary-glow)), transparent, hsl(var(--primary)))",
                     filter: "blur(2px)"
                   }}></div>

              {/* Counter-rotating dashed ring */}
              <div className="absolute -inset-1 rounded-full border-2 border-dashed border-primary/40 animate-rotate-slow"
                   style={{ animationDirection: "reverse", animationDuration: "30s" }}></div>

              {/* Sparkles */}
              <div className="absolute top-4 -right-2 w-3 h-3 bg-primary rounded-full animate-ping opacity-75"></div>
              <div className="absolute -top-2 left-1/3 w-2 h-2 bg-accent rounded-full animate-ping opacity-60" style={{ animationDelay: "0.7s" }}></div>
              <div className="absolute bottom-6 -left-3 w-2.5 h-2.5 bg-primary-glow rounded-full animate-ping opacity-70" style={{ animationDelay: "1.4s" }}></div>
              <div className="absolute -bottom-1 right-1/4 w-2 h-2 bg-accent rounded-full animate-ping opacity-60" style={{ animationDelay: "2.1s" }}></div>

              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background shadow-2xl ring-4 ring-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15 z-10 mix-blend-overlay"></div>
                <img
                  src="/paul_profile.jpg"
                  alt="Pawlos Diriba - Software Developer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="eager"
                />
                <div className="absolute inset-0 border-2 border-primary/40 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("about")}
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-secondary hover:bg-primary/10 border border-border transition-all animate-bounce mt-12 ${anim(800)}`}
          style={d(800)}
          aria-label="Scroll to next section"
        >
          <ChevronDown className="h-6 w-6 text-foreground" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
