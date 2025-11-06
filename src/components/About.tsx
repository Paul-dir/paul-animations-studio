import { GraduationCap, Target, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 px-4" ref={elementRef}>
      <div className="container mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Description */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate Software Engineering student at Haramaya University with hands-on experience in web development. I specialize in creating responsive and user-friendly websites using modern technologies like HTML, CSS, JavaScript, React, and Next.js.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With over 3 years of coding experience, I've successfully delivered multiple projects ranging from task management applications to business websites. I'm dedicated to writing clean, maintainable code and staying updated with the latest web development trends.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My goal is to grow as a full-stack developer and contribute to impactful software projects that make a difference in people's lives. I'm particularly interested in modern JavaScript frameworks, cloud technologies, and creating seamless user experiences.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">Available for Freelance</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-sm">Open to Opportunities</span>
              </div>
            </div>
          </div>

          {/* Right side - Info cards */}
          <div className={`space-y-4 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="glass-card p-6 rounded-xl hover:glow-effect transition-all hover:scale-105 hover:-translate-y-2 duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p className="text-muted-foreground">4th Year Software Engineering Student</p>
                  <p className="text-foreground/80 font-medium">Haramaya University</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl hover:glow-effect transition-all hover:scale-105 hover:-translate-y-2 duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Focus</h3>
                  <p className="text-muted-foreground">Web Development & Full-Stack Engineering</p>
                  <p className="text-foreground/80 font-medium">Building impactful software solutions</p>
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
