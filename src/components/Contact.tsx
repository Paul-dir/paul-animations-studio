import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import ContactMap from "./ContactMap";

const Contact = () => {
  const { elementRef, isVisible } = useScrollAnimation();
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
    <section id="contact" className="py-24 px-4 relative" ref={elementRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg">Have a project in mind? Let's work together!</p>
          <div className="section-divider"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="glass-card p-8 rounded-2xl h-full">
              <h3 className="text-xl font-semibold mb-8">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4 group">
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium mb-2 uppercase tracking-wider text-muted-foreground">Name</label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required
                  className="bg-secondary/50 border-border/50 focus:border-primary rounded-xl" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-2 uppercase tracking-wider text-muted-foreground">Email</label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required
                  className="bg-secondary/50 border-border/50 focus:border-primary rounded-xl" />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium mb-2 uppercase tracking-wider text-muted-foreground">Message</label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message here..." rows={5} required
                  className="bg-secondary/50 border-border/50 focus:border-primary resize-none rounded-xl" />
              </div>
              <Button type="submit" disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-base glow-effect transition-all hover:scale-[1.02] disabled:opacity-50 rounded-xl">
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>

        <div className={`mt-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <ContactMap />
        </div>
      </div>
    </section>
  );
};

export default Contact;
