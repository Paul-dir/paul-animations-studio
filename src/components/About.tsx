import { GraduationCap, Target, MapPin, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 px-4 relative" ref={elementRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Get to know me and what drives my passion for development</p>
          <div className="section-divider"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate Software Engineering student at Haramaya University with hands-on experience in web development. I specialize in creating responsive and user-friendly websites using modern technologies like HTML, CSS, JavaScript, React, and Next.js.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With over 3 years of coding experience, I've successfully delivered multiple projects ranging from task management applications to business websites. I'm dedicated to writing clean, maintainable code and staying updated with the latest web development trends.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My goal is to grow as a full-stack developer and contribute to impactful software projects that make a difference in people's lives.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-medium border border-primary/20">
                  <Sparkles className="inline h-3 w-3 mr-1" />Available for Freelance
                </span>
                <span className="px-4 py-1.5 rounded-full bg-secondary text-sm font-medium border border-border/50">Open to Opportunities</span>
              </div>
            </div>
          </div>

          <div className={`space-y-5 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="glass-card p-7 rounded-2xl hover:glow-effect transition-all hover:scale-[1.03] hover:-translate-y-2 duration-300 group">
              <div className="flex items-start gap-5">
                <div className="p-3.5 rounded-xl bg-primary/15 group-hover:bg-primary/25 transition-colors">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1.5">Education</h3>
                  <p className="text-muted-foreground">4th Year Software Engineering Student</p>
                  <p className="text-foreground/80 font-medium mt-0.5">Haramaya University</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-7 rounded-2xl hover:glow-effect transition-all hover:scale-[1.03] hover:-translate-y-2 duration-300 group">
              <div className="flex items-start gap-5">
                <div className="p-3.5 rounded-xl bg-primary/15 group-hover:bg-primary/25 transition-colors">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1.5">Focus</h3>
                  <p className="text-muted-foreground">Web Development & Full-Stack Engineering</p>
                  <p className="text-foreground/80 font-medium mt-0.5">Building impactful software solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
