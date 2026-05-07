import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ContactMap from "./ContactMap";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { name: formData.name.trim(), email: formData.email.trim(), message: formData.message.trim() },
      });
      if (error) throw error;
      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "paudiriba@gmail.com", link: "mailto:paudiriba@gmail.com" },
    { icon: Phone, label: "Phone", value: "+251 941 551 883", link: "tel:+251941551883" },
    { icon: MapPin, label: "Location", value: "Addis Ababa, Ethiopia", link: null },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
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
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg">Have a project in mind? Let's work together!</p>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <div className="glass-card p-8 rounded-2xl h-full">
              <h3 className="text-xl font-semibold mb-8">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.label}
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    <div className="p-3 rounded-xl bg-primary/15 group-hover:bg-primary/25 transition-colors">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">{info.label}</p>
                      {info.link ? (
                        <a href={info.link} className="text-foreground hover:text-primary transition-colors font-medium text-sm">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium text-sm">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium mb-2 uppercase tracking-wider text-muted-foreground">Name</label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required
                  className="bg-secondary/50 border-border/50 focus:border-primary rounded-xl transition-all focus:shadow-[0_0_20px_hsl(var(--primary)/0.15)]" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-2 uppercase tracking-wider text-muted-foreground">Email</label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required
                  className="bg-secondary/50 border-border/50 focus:border-primary rounded-xl transition-all focus:shadow-[0_0_20px_hsl(var(--primary)/0.15)]" />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium mb-2 uppercase tracking-wider text-muted-foreground">Message</label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message here..." rows={5} required
                  className="bg-secondary/50 border-border/50 focus:border-primary resize-none rounded-xl transition-all focus:shadow-[0_0_20px_hsl(var(--primary)/0.15)]" />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-base glow-effect transition-all disabled:opacity-50 rounded-xl relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ContactMap />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
