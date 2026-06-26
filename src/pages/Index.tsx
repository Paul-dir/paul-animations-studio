import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SciFiBackground from "@/components/SciFiBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CursorFollower from "@/components/CursorFollower";
import CommandPalette from "@/components/CommandPalette";
import { useIsMobile } from "@/hooks/use-mobile";

// Eager imports for desktop (preserves previous behavior)
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Lazy versions used only on small screens
const AboutLazy = lazy(() => import("@/components/About"));
const StatsLazy = lazy(() => import("@/components/Stats"));
const SkillsLazy = lazy(() => import("@/components/Skills"));
const ExperienceLazy = lazy(() => import("@/components/Experience"));
const ServicesLazy = lazy(() => import("@/components/Services"));
const ProjectsLazy = lazy(() => import("@/components/Projects"));
const ContactLazy = lazy(() => import("@/components/Contact"));
const FooterLazy = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="py-24 px-4">
    <div className="container mx-auto h-32 rounded-2xl bg-card/5 animate-pulse" />
  </div>
);

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <CursorFollower />
      <CommandPalette />
      <ScrollProgress />
      <SciFiBackground />
      <Navigation />
      <Hero />
      {isMobile ? (
        <Suspense fallback={<SectionFallback />}>
          <AboutLazy />
          <StatsLazy />
          <SkillsLazy />
          <ExperienceLazy />
          <ServicesLazy />
          <ProjectsLazy />
          <ContactLazy />
          <FooterLazy />
        </Suspense>
      ) : (
        <>
          <About />
          <Stats />
          <Skills />
          <Experience />
          <Services />
          <Projects />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
