import { motion } from "framer-motion";
import { Globe, Terminal } from "lucide-react";
import { useDeveloperMode } from "@/contexts/DeveloperModeContext";

const DeveloperModeToggle = () => {
  const { devMode, toggleDevMode } = useDeveloperMode();

  return (
    <motion.button
      onClick={toggleDevMode}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      aria-pressed={devMode}
      aria-label={devMode ? "Disable Developer Mode" : "Enable Developer Mode"}
      title={devMode ? "Developer Mode (on)" : "Normal Mode"}
      className={`fixed z-40 bottom-6 left-6 group inline-flex items-center gap-2 px-3.5 py-2 rounded-full border backdrop-blur-xl shadow-lg transition-all ${
        devMode
          ? "bg-primary/15 border-primary/50 text-primary shadow-primary/25"
          : "bg-card/70 border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40"
      }`}
    >
      <span
        className={`relative flex h-6 w-11 items-center rounded-full transition-colors ${
          devMode ? "bg-primary/40" : "bg-muted/60"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full shadow ${
            devMode ? "ml-[22px] bg-primary text-primary-foreground" : "ml-0.5 bg-background text-foreground"
          }`}
        >
          {devMode ? <Terminal className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
        </motion.span>
      </span>
      <span className="text-xs font-mono hidden sm:inline">
        {devMode ? "Developer Mode" : "Normal Mode"}
      </span>
    </motion.button>
  );
};

export default DeveloperModeToggle;
