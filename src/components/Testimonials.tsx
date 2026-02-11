import { Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Testimonials = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      text: "Pawlos delivered an excellent website for my business. Professional, responsive, and exceeded expectations. Highly recommended!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      text: "Working with Pawlos was a great experience. He understood our vision and created a modern, functional web application.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Marketing Manager",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      text: "Outstanding work! The website is beautiful, fast, and exactly what we needed. Great communication throughout the project.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-4 relative" ref={elementRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            What clients say about working with me
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-2xl hover:glow-effect transition-all hover:scale-[1.03] hover:-translate-y-2 duration-300 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms`, transitionDuration: "700ms" }}
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors" />

              <p className="text-muted-foreground leading-relaxed mb-6 text-sm min-h-[80px]">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <div className="flex items-center gap-4 pt-5 border-t border-border/30">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-11 h-11 rounded-full bg-secondary ring-2 ring-primary/20"
                />
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
