import { Button } from "@/components/ui/button";
import { Github, Mail, Phone, ChevronDown, Download } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Transforming Ideas into Animated Reality";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-48 h-48 rounded-full border-4 border-primary/50 overflow-hidden mb-8 animate-float">
            <img
              src="/og-image.png"
              alt="Pawlos Diriba"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Pawlos <span className="text-primary">Diriba</span>
          </h1>
          <div className="h-12 mb-8">
            <p className="text-xl md:text-2xl text-muted-foreground">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mb-12">
            Passionate Software Engineering student crafting responsive and
            user-friendly web experiences with modern technologies.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg transition-all hover:scale-105"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary/50 hover:border-primary hover:bg-primary/10 text-foreground font-semibold px-8 py-6 text-lg transition-all hover:scale-105 group"
              onClick={() => window.open("/Pawlos-Diriba-CV.pdf", "_blank")}
            >
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Download Resume
            </Button>
          </div>
          <div className="flex gap-6 mt-12">
            <a
              href="https://github.com/Paul-dir"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border hover:border-primary hover:bg-primary/10 transition-all hover:scale-110"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="mailto:paudiriba@gmail.com"
              className="p-3 rounded-full border hover:border-primary hover:bg-primary/10 transition-all hover:scale-110"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="tel:+251941551883"
              className="p-3 rounded-full border hover:border-primary hover:bg-primary/10 transition-all hover:scale-110"
            >
              <Phone className="h-6 w-6" />
            </a>
          </div>
          <button
            onClick={() => scrollToSection("about")}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full border hover:border-primary hover:bg-primary/10 transition-all animate-bounce"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
