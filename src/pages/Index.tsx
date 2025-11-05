import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import Scene3D from "@/components/Scene3D";
import CodeRain from "@/components/CodeRain";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Scene3D />
      <CodeRain />
      <AnimatedBackground />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
