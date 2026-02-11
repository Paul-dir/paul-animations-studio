import { Github, Mail, Phone, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="relative border-t border-border/30 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-2">PD.</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Software Developer passionate about creating beautiful, performant web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-wrap gap-3 justify-center">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() =>
                    document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="https://github.com/Paul-dir" target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-secondary/50 hover:bg-primary/20 border border-border/50 hover:border-primary/50 transition-all hover:scale-110">
                <Github className="h-4 w-4" />
              </a>
              <a href="mailto:paudiriba@gmail.com"
                className="p-2.5 rounded-lg bg-secondary/50 hover:bg-primary/20 border border-border/50 hover:border-primary/50 transition-all hover:scale-110">
                <Mail className="h-4 w-4" />
              </a>
              <a href="tel:+251941551883"
                className="p-2.5 rounded-lg bg-secondary/50 hover:bg-primary/20 border border-border/50 hover:border-primary/50 transition-all hover:scale-110">
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider + bottom */}
        <div className="mt-10 pt-6 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} Pawlos Diriba. Built with <Heart className="h-3 w-3 text-primary fill-primary" /> and code.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary transition-all hover:scale-110 hover:-translate-y-1"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
export default Footer;
