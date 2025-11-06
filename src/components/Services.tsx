import { Globe, Smartphone, Code, Zap, Palette, Database } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Services = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies like React, Next.js, and Tailwind CSS.",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading"]
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first approach ensuring your website looks perfect on all devices and screen sizes.",
      features: ["Mobile Friendly", "Cross-browser", "Adaptive Layout"]
    },
    {
      icon: Code,
      title: "Frontend Development",
      description: "Beautiful, interactive user interfaces with clean code and modern JavaScript frameworks.",
      features: ["React/Next.js", "TypeScript", "Component-based"]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Fast, efficient websites optimized for speed and user experience with best practices.",
      features: ["Fast Loading", "Optimized Images", "Code Splitting"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Modern, intuitive interfaces that provide excellent user experience and visual appeal.",
      features: ["User-Centered", "Modern Design", "Accessibility"]
    },
    {
      icon: Database,
      title: "Backend Integration",
      description: "Seamless integration with databases and APIs using Firebase and modern backend services.",
      features: ["Firebase", "REST APIs", "Data Management"]
    }
  ];

  return (
    <section id="services" className="py-20 px-4 relative overflow-hidden" ref={elementRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Services I <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional web development services to bring your ideas to life
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-xl hover:glow-effect transition-all hover:scale-105 hover:-translate-y-2 duration-300 group ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-primary to-primary-glow mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2 border-t border-border/50 pt-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
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
