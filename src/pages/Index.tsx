import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SciFiBackground from "@/components/SciFiBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CursorFollower from "@/components/CursorFollower";

// Lazy-load below-the-fold sections to keep initial paint fast on mobile
const About = lazy(() => import("@/components/About"));
const Stats = lazy(() => import("@/components/Stats"));
const Skills = lazy(() => import("@/components/Skills"));
const Experience = lazy(() => import("@/components/Experience"));
const Services = lazy(() => import("@/components/Services"));
const Projects = lazy(() => import("@/components/Projects"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="py-24 px-4">
    <div className="container mx-auto h-32 rounded-2xl bg-card/5 animate-pulse" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <CursorFollower />
      <ScrollProgress />
      <SciFiBackground />
      <Navigation />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <About />
        <Stats />
        <Skills />
        <Experience />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
