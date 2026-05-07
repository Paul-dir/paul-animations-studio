import { Globe, Smartphone, Code, Zap, Palette, Database } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies like React, Next.js, and Tailwind CSS.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading"],
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Mobile-first approach ensuring your website looks perfect on all devices and screen sizes.",
    features: ["Mobile Friendly", "Cross-browser", "Adaptive Layout"],
  },
  {
    icon: Code,
    title: "Frontend Development",
    description: "Beautiful, interactive user interfaces with clean code and modern JavaScript frameworks.",
    features: ["React/Next.js", "TypeScript", "Component-based"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Fast, efficient websites optimized for speed and user experience with best practices.",
    features: ["Fast Loading", "Optimized Images", "Code Splitting"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Modern, intuitive interfaces that provide excellent user experience and visual appeal.",
    features: ["User-Centered", "Modern Design", "Accessibility"],
  },
  {
    icon: Database,
    title: "Backend Integration",
    description: "Seamless integration with databases and APIs using Firebase and modern backend services.",
    features: ["Firebase", "REST APIs", "Data Management"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">
            Services I <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional web development services to bring your ideas to life
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 rounded-2xl hover:glow-effect transition-all duration-300 group relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              whileHover={{ scale: 1.04, y: -8 }}
            >
              {/* Animated border glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), transparent, hsl(var(--accent) / 0.1))" }} />

              <div className="mb-6 relative">
                <motion.div
                  className="inline-flex p-4 rounded-xl bg-primary/15 mb-5 group-hover:bg-primary/25 transition-all"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <service.icon className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm mb-4">{service.description}</p>
              </div>

              <div className="space-y-2 border-t border-border/30 pt-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
