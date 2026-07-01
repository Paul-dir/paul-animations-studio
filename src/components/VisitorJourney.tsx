import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const STEPS = [
  "Initializing...",
  "Loading Portfolio...",
  "Preparing Experience...",
  "Rendering Animations...",
  "Welcome to Pawlos Diriba's Portfolio",
];

const STORAGE_KEY = "pd_visitor_journey_shown";

const VisitorJourney = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
    sessionStorage.setItem(STORAGE_KEY, "1");

    const stepDur = 550;
    const total = STEPS.length * stepDur;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / total);
      setProgress(p);
      setStep(Math.min(STEPS.length - 1, Math.floor(elapsed / stepDur)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 500);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          aria-hidden={!visible}
          role="status"
          aria-live="polite"
        >
          {/* Ambient glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px] animate-glow" style={{ animationDelay: "1s" }} />
          </div>

          <div className="relative flex flex-col items-center gap-8 px-6 text-center">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-primary via-accent to-primary blur-2xl opacity-60 animate-glow" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
                <Sparkles className="h-9 w-9 text-primary-foreground" />
              </div>
              <div
                className="absolute -inset-2 rounded-2xl border border-primary/40 animate-rotate-slow"
                style={{ borderStyle: "dashed" }}
              />
            </motion.div>

            {/* Name */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="text-foreground">Pawlos </span>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Diriba
                </span>
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 tracking-widest uppercase">
                Portfolio Experience
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-72 md:w-96">
              <div className="h-1.5 w-full rounded-full bg-secondary/60 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary-glow"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>{Math.round(progress * 100)}%</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={step}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-primary/90"
                  >
                    {STEPS[step]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VisitorJourney;
