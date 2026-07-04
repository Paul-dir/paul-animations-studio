import ArchitecturePlayground from "./ArchitecturePlayground";
import LiveSystemSimulation from "./LiveSystemSimulation";
import { motion } from "framer-motion";

const SystemsPlayground = () => {
  return (
    <section id="playground" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary/80 mb-2">
            &lt;/ interactive systems &gt;
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            <span className="gradient-text">Explore the architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hover, click and deploy. Poke at the same systems I ship in production —
            without touching a terminal.
          </p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <ArchitecturePlayground />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <LiveSystemSimulation />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SystemsPlayground;
