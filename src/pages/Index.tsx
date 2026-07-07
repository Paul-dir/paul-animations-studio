import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SciFiBackground from "@/components/SciFiBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CursorFollower from "@/components/CursorFollower";
import CommandPalette from "@/components/CommandPalette";
import AskPawlosAI from "@/components/AskPawlosAI";
import VisitorJourney from "@/components/VisitorJourney";
import FloatingNotifications from "@/components/FloatingNotifications";
import EasterEggs from "@/components/EasterEggs";
import CodeAndAchievements from "@/components/CodeAndAchievements";
import DownloadCenter from "@/components/DownloadCenter";
import SystemsPlayground from "@/components/SystemsPlayground";
import EngineeringChallenges from "@/components/EngineeringChallenges";
import { useIsMobile } from "@/hooks/use-mobile";

// Eager imports for desktop (preserves previous behavior)
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import LiveTerminal from "@/components/LiveTerminal";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Lazy versions used only on small screens
const AboutLazy = lazy(() => import("@/components/About"));
const StatsLazy = lazy(() => import("@/components/Stats"));
const SkillsLazy = lazy(() => import("@/components/Skills"));
const LiveTerminalLazy = lazy(() => import("@/components/LiveTerminal"));
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
      <VisitorJourney />
      <CursorFollower />
      <CommandPalette />
      <AskPawlosAI />
      <FloatingNotifications />
      <EasterEggs />
      <ScrollProgress />
      <SciFiBackground />
      <Navigation />
      <Hero />
      {isMobile ? (
        <Suspense fallback={<SectionFallback />}>
          <AboutLazy />
          <StatsLazy />
          <SkillsLazy />
          <LiveTerminalLazy />
          <CodeAndAchievements />
          <ExperienceLazy />
          <ServicesLazy />
          <ProjectsLazy />
          <SystemsPlayground />
          <DownloadCenter />
          <ContactLazy />
          <FooterLazy />
        </Suspense>
      ) : (
        <>
          <About />
          <Stats />
          <Skills />
          <LiveTerminal />
          <CodeAndAchievements />
          <Experience />
          <Services />
          <Projects />
          <EngineeringChallenges />
          <SystemsPlayground />
          <DownloadCenter />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
