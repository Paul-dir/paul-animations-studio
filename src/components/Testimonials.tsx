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
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      text: "Working with Pawlos was a great experience. He understood our vision and created a modern, functional web application.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Marketing Manager",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      text: "Outstanding work! The website is beautiful, fast, and exactly what we needed. Great communication throughout the project.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-4 relative" ref={elementRef}>
      <div className="container mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            What clients say about working with me
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-xl hover:glow-effect transition-all hover:scale-105 hover:-translate-y-2 duration-300 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Quote className="h-10 w-10 text-primary/30 mb-4" />
              
              <p className="text-muted-foreground leading-relaxed mb-6 min-h-[100px]">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full bg-secondary"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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
