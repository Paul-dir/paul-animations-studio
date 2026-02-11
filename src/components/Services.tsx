import { Globe, Smartphone, Code, Zap, Palette, Database } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Services = () => {
  const { elementRef, isVisible } = useScrollAnimation();

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

  return (
    <section id="services" className="py-24 px-4 relative overflow-hidden" ref={elementRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading">
            Services I <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional web development services to bring your ideas to life
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-2xl hover:glow-effect transition-all hover:scale-[1.04] hover:-translate-y-2 duration-300 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms`, transitionDuration: "700ms" }}
            >
              <div className="mb-6">
                <div className="inline-flex p-4 rounded-xl bg-primary/15 mb-5 group-hover:bg-primary/25 group-hover:scale-110 transition-all">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
