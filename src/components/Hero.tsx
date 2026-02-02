import { Button } from "@/components/ui/button";
import { Github, Mail, Phone, ChevronDown, Download, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("");
  const firstNameComplete = useRef(false);
  
  const firstNameText = "Pawlos";
  const lastNameText = "Diriba";
  const titles = [
    "Software Engineer",
    "Full-Stack Developer", 
    "UI/UX Designer",
    "Animation Specialist",
    "Tech Innovator"
  ];

  // Typewriter effect for name
  useEffect(() => {
    if (!firstNameComplete.current) {
      // Type first name
      if (firstName.length < firstNameText.length) {
        const timeout = setTimeout(() => {
          setFirstName(prev => prev + firstNameText[firstName.length]);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        // Start typing last name after a pause
        const timeout = setTimeout(() => {
          firstNameComplete.current = true;
        }, 300);
        return () => clearTimeout(timeout);
      }
    } else {
      // Type last name
      if (lastName.length < lastNameText.length) {
        const timeout = setTimeout(() => {
          setLastName(prev => prev + lastNameText[lastName.length]);
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
  }, [firstName, lastName]);

  // Rotating titles effect
  useEffect(() => {
    if (firstNameComplete.current && lastName.length === lastNameText.length) {
      const currentTitleText = titles[titleIndex];
      
      if (currentTitle.length < currentTitleText.length) {
        const timeout = setTimeout(() => {
          setCurrentTitle(prev => prev + currentTitleText[currentTitle.length]);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // After showing complete title, wait and move to next
        const timeout = setTimeout(() => {
          if (currentTitle.length === currentTitleText.length) {
            // Wait 2 seconds, then erase and show next title
            setTimeout(() => {
              setCurrentTitle("");
              setTitleIndex((prev) => (prev + 1) % titles.length);
            }, 2000);
          }
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentTitle, titleIndex, lastName]);

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
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Column: Profile Image */}
          <div className="lg:w-2/5 relative">
            <div className="relative mx-auto lg:mx-0">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl"></div>
              
              {/* Profile image container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 z-10"></div>
                <img
                  src="/paul_profile.jpg"
                  alt="Pawlos Diriba - Professional Software Developer"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Animated rings */}
                <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-ping-slow"></div>
                <div className="absolute inset-4 border-2 border-purple-400/20 rounded-full animate-ping-slower"></div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg animate-float">
                <Sparkles className="inline mr-2 h-4 w-4" />
                Available for Work
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:w-3/5 text-center lg:text-left">
            {/* Name with typing animation */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-2">
                <span className="text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {firstName}
                  <span className="animate-pulse">|</span>
                </span>
                <span className="text-white ml-2">
                  {lastName}
                  {lastName.length === lastNameText.length ? "" : <span className="animate-pulse">|</span>}
                </span>
              </h1>
              
              {/* Rotating title */}
              <div className="h-12 md:h-16">
                <p className="text-xl md:text-2xl lg:text-3xl text-blue-300 font-medium">
                  {currentTitle}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Crafting exceptional digital experiences with cutting-edge technologies. 
              Specializing in responsive web applications, animation studios, and innovative 
              software solutions that drive business growth.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">3+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg transition-all hover:scale-105 shadow-lg"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-5 w-5" />
                Hire Me
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-6 text-lg transition-all hover:scale-105 group backdrop-blur-sm"
                onClick={downloadCV}
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download CV
              </Button>
            </div>

            {/* Social Links */}
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
        </div>

        {/* Scroll down indicator */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all animate-bounce"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="h-6 w-6 text-white" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
