import { GraduationCap, Target, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2 variants={fadeUp} custom={0} className="section-heading">
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg max-w-xl mx-auto">
            Get to know me and what drives my passion for development
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
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
          </motion.div>

          <motion.div
            className="space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {[
              { icon: GraduationCap, title: "Education", sub: "4th Year Software Engineering Student", org: "Haramaya University" },
              { icon: Target, title: "Focus", sub: "Web Development & Full-Stack Engineering", org: "Building impactful software solutions" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i + 2}
                className="glass-card p-7 rounded-2xl hover:glow-effect transition-all hover:scale-[1.03] hover:-translate-y-2 duration-300 group"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-5">
                  <div className="p-3.5 rounded-xl bg-primary/15 group-hover:bg-primary/25 transition-colors">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1.5">{item.title}</h3>
                    <p className="text-muted-foreground">{item.sub}</p>
                    <p className="text-foreground/80 font-medium mt-0.5">{item.org}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
