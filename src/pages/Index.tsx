import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
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
      <Stats />
      <Skills />
      <Experience />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
