import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import LightAnimatedBackground from "@/components/LightAnimatedBackground";
import CodeRain from "@/components/CodeRain";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="min-h-screen">
      {isLight ? (
        <LightAnimatedBackground />
      ) : (
        <>
          <CodeRain />
          <AnimatedBackground />
        </>
      )}
      <Navigation />
      <Hero />
      <About />
      <Stats />
      <Skills />
      <Experience />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
