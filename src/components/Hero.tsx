import { Button } from "@/components/ui/button";
import { Github, Mail, Phone, ChevronDown, Download } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadCV = () => {
    window.open("/Pawlos-Diriba-CV.pdf", "_blank");
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800"
    >
      {/* Animated background elements - kept from existing */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>

      {/* Main container - using EXACT target layout */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Desktop: Two-column flex layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* LEFT COLUMN: All text content (EXACT TARGET CONTENT) */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Greeting text */}
            <p className="text-xl md:text-2xl text-blue-400 font-medium mb-2">
              Hello, I'm
            </p>
            
            {/* Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">
              <span className="text-white">Pawlos </span>
              <span className="text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Diriba
              </span>
            </h1>
            
            {/* Role title */}
            <div className="h-12 md:h-14 mb-6">
              <p className="text-2xl md:text-3xl text-blue-300 font-medium">
                Software Developer
              </p>
            </div>

            {/* Description text - EXACT from target */}
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              A passionate Software Engineering student crafting responsive and
              user-friendly web experiences with modern technologies.
            </p>

            {/* CTA Buttons - kept existing functionality */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg transition-all hover:scale-105 shadow-lg"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-6 text-lg transition-all hover:scale-105 group backdrop-blur-sm"
                onClick={downloadCV}
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </div>

            {/* Social Links - kept from existing */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/Paul-dir"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500 transition-all hover:scale-110 hover:shadow-lg"
                aria-label="GitHub Profile"
              >
                <Github className="h-6 w-6 text-white" />
              </a>
              <a
                href="mailto:paudiriba@gmail.com"
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500 transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Send Email"
              >
                <Mail className="h-6 w-6 text-white" />
              </a>
              <a
                href="tel:+251941551883"
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500 transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Call Phone"
              >
                <Phone className="h-6 w-6 text-white" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Large circular profile image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl"></div>
              
              {/* Profile image container - large and circular */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 z-10"></div>
                <img
                  src="/paul_profile.jpg"
                  alt="Pawlos Diriba - Software Developer"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                
                {/* Subtle animation rings */}
                <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-ping-slow"></div>
                <div className="absolute inset-4 border-2 border-purple-400/20 rounded-full animate-ping-slower"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator - kept from existing */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all animate-bounce mt-12"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="h-6 w-6 text-white" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
