import { Button } from "@/components/ui/button";
import { Github, Mail, Phone, ChevronDown, Download, Sparkles, Star, Sparkle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ROLES = [
  "Software Developer",
  "Frontend Engineer",
  "React & Next.js Specialist",
  "UI/UX Enthusiast",
];

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Typewriter rotating roles
  useEffect(() => {
    const current = ROLES[roleIdx];
    if (!deleting && typed === current) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && typed === "") {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
      return;
    }
    const delay = deleting ? 40 : 80;
    const t = setTimeout(() => {
      setTyped((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
      );
    }, delay);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  // 3D parallax tilt
  useEffect(() => {
    const el = tiltRef.current;
    const inner = imgWrapRef.current;
    if (!el || !inner) return;

    let raf = 0;
    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = py * -22;
      targetY = px * 22;
    };

    const onLeave = () => { targetX = 0; targetY = 0; };

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      inner.style.transform = `rotateX(${curX.toFixed(2)}deg) rotateY(${curY.toFixed(2)}deg) translateZ(0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadCV = () => {
    window.open("/Pawlos-Diriba-CV.pdf", "_blank");
  };

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background elements with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl animate-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full mix-blend-screen filter blur-3xl animate-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full animate-morph filter blur-[100px]" />

        {/* Floating particles */}
        <div className="absolute top-20 left-[10%] w-1 h-1 bg-primary rounded-full animate-float opacity-60" />
        <div className="absolute top-40 right-[15%] w-2 h-2 bg-primary rounded-full animate-float opacity-40" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-[20%] w-1.5 h-1.5 bg-primary rounded-full animate-float opacity-50" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[60%] right-[10%] w-1 h-1 bg-primary rounded-full animate-float opacity-70" style={{ animationDelay: "3s" }} />

        {/* Extra aurora streaks */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-gradient-to-b from-primary/8 via-transparent to-transparent rounded-full blur-[120px] rotate-12" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[200px] bg-gradient-to-t from-accent/6 via-transparent to-transparent rounded-full blur-[100px] -rotate-12" />
      </motion.div>

      <motion.div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10" style={{ y: textY }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

          {/* LEFT COLUMN */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              {...fadeUp(0.1)}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full glass-card text-xs md:text-sm font-medium text-foreground/90"
            >
              <span className="status-dot" aria-hidden="true" />
              Available for new opportunities
            </motion.div>

            <motion.p {...fadeUp(0.2)} className="text-xl md:text-2xl text-primary font-medium mb-2">
              Hello, I'm
            </motion.p>

            <motion.h1 {...fadeUp(0.3)} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">
              <span className="text-foreground">Pawlos </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Diriba
              </span>
            </motion.h1>

            <motion.div {...fadeUp(0.4)} className="h-12 md:h-14 mb-6" aria-live="polite">
              <p className="text-2xl md:text-3xl text-primary/80 font-medium font-mono tracking-tight">
                <span>{typed}</span>
                <span className="caret" aria-hidden="true" />
              </p>
            </motion.div>

            <motion.p {...fadeUp(0.5)} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              A passionate Software Engineering student crafting responsive and
              user-friendly web experiences with modern technologies.
            </motion.p>

            <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg glow-effect relative overflow-hidden group"
                  onClick={() => scrollToSection("contact")}
                  data-magnetic
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-border hover:border-primary hover:bg-primary/10 text-foreground font-semibold px-8 py-6 text-lg group backdrop-blur-sm"
                  onClick={downloadCV}
                  data-magnetic
                >
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>

            <motion.div {...fadeUp(0.7)} className="flex gap-4 justify-center lg:justify-start">
              {[
                { href: "https://github.com/Paul-dir", label: "GitHub Profile", icon: Github },
                { href: "mailto:paudiriba@gmail.com", label: "Send Email", icon: Mail },
                { href: "tel:+251941551883", label: "Call Phone", icon: Phone },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-3 rounded-full bg-secondary hover:bg-primary/20 border border-border hover:border-primary transition-all hover:shadow-lg hover:glow-effect"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <social.icon className="h-6 w-6 text-foreground" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Profile image with magical animations */}
          <div ref={tiltRef} className="lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0 perspective-1000">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div ref={imgWrapRef} className="relative animate-float preserve-3d will-change-transform">
                {/* Outer magical aura layers */}
                <div className="absolute -inset-10 bg-gradient-to-r from-primary via-accent to-primary-glow rounded-full opacity-40 blur-3xl animate-glow" />
                <div className="absolute -inset-6 bg-gradient-to-tr from-accent via-primary to-accent rounded-full opacity-30 blur-2xl animate-glow" style={{ animationDelay: "1s" }} />

                {/* Rotating conic gradient ring */}
                <div className="absolute -inset-3 rounded-full animate-rotate-slow opacity-80"
                     style={{
                       background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary-glow)), transparent, hsl(var(--primary)))",
                       filter: "blur(2px)"
                     }} />

                {/* Counter-rotating dashed ring */}
                <div className="absolute -inset-1 rounded-full border-2 border-dashed border-primary/40 animate-rotate-slow"
                     style={{ animationDirection: "reverse", animationDuration: "30s" }} />

                {/* Orbiting sparkle icons */}
                <div className="absolute inset-0 pointer-events-none animate-orbit" style={{ animationDuration: "18s" }}>
                  <Sparkles className="absolute -top-6 left-1/2 -translate-x-1/2 h-6 w-6 text-primary drop-shadow-[0_0_8px_hsl(var(--primary))] animate-twinkle" />
                </div>
                <div className="absolute inset-0 pointer-events-none animate-orbit" style={{ animationDuration: "22s", animationDirection: "reverse" }}>
                  <Star className="absolute top-1/2 -right-6 -translate-y-1/2 h-5 w-5 text-accent fill-accent drop-shadow-[0_0_8px_hsl(var(--accent))] animate-twinkle" style={{ animationDelay: "0.6s" }} />
                </div>
                <div className="absolute inset-0 pointer-events-none animate-orbit" style={{ animationDuration: "26s" }}>
                  <Sparkle className="absolute -bottom-5 left-1/2 -translate-x-1/2 h-5 w-5 text-primary-glow fill-primary-glow drop-shadow-[0_0_8px_hsl(var(--primary-glow))] animate-twinkle" style={{ animationDelay: "1.2s" }} />
                </div>
                <div className="absolute inset-0 pointer-events-none animate-orbit" style={{ animationDuration: "20s", animationDirection: "reverse" }}>
                  <Sparkles className="absolute top-1/2 -left-6 -translate-y-1/2 h-4 w-4 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))] animate-twinkle" style={{ animationDelay: "1.8s" }} />
                </div>
                <div className="absolute inset-0 pointer-events-none animate-orbit" style={{ animationDuration: "30s" }}>
                  <Star className="absolute top-[10%] right-[8%] h-3 w-3 text-primary fill-primary drop-shadow-[0_0_6px_hsl(var(--primary))] animate-twinkle" style={{ animationDelay: "2.4s" }} />
                </div>
                <div className="absolute inset-0 pointer-events-none animate-orbit" style={{ animationDuration: "24s", animationDirection: "reverse" }}>
                  <Sparkle className="absolute bottom-[12%] left-[6%] h-4 w-4 text-accent fill-accent drop-shadow-[0_0_6px_hsl(var(--accent))] animate-twinkle" style={{ animationDelay: "0.3s" }} />
                </div>

                {/* Pulsing dot sparkles */}
                <div className="absolute top-4 -right-2 w-3 h-3 bg-primary rounded-full animate-ping opacity-75" />
                <div className="absolute -top-2 left-1/3 w-2 h-2 bg-accent rounded-full animate-ping opacity-60" style={{ animationDelay: "0.7s" }} />
                <div className="absolute bottom-6 -left-3 w-2.5 h-2.5 bg-primary-glow rounded-full animate-ping opacity-70" style={{ animationDelay: "1.4s" }} />
                <div className="absolute -bottom-1 right-1/4 w-2 h-2 bg-accent rounded-full animate-ping opacity-60" style={{ animationDelay: "2.1s" }} />

                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background shadow-2xl ring-4 ring-primary/30 preserve-3d" style={{ transform: "translateZ(60px)" }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15 z-10 mix-blend-overlay pointer-events-none" />
                  <img
                    src="/paul_profile.jpg"
                    alt="Pawlos Diriba - Software Developer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="eager"
                  />
                  <div className="absolute inset-0 border-2 border-primary/40 rounded-full pointer-events-none" />
                  <div className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay opacity-70" style={{ background: "linear-gradient(135deg, hsl(0 0% 100% / 0.35), transparent 45%, transparent 60%, hsl(0 0% 0% / 0.25))" }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-secondary hover:bg-primary/10 border border-border transition-all animate-bounce mt-12"
          aria-label="Scroll to next section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <ChevronDown className="h-6 w-6 text-foreground" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
