import { Github, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              © {currentYear} <span className="gradient-text font-semibold">Pawlos Diriba</span>. All rights reserved.
            </p>
          </div>

          <div className="flex gap-4">
            <a 
              href="https://github.com/Paul-dir" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-all hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="mailto:paudiriba@gmail.com"
              className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-all hover:scale-110"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a 
              href="tel:+251941551883"
              className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-all hover:scale-110"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
