import { useEffect, useState, useMemo } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useTheme, THEME_ORDER, THEME_META, ThemeName } from "@/contexts/ThemeContext";
import { toast } from "@/hooks/use-toast";
import { downloadFile } from "@/lib/utils";
import {
  Home, User, Code, Briefcase, Wrench, FolderGit2, Mail,
  Download, Sparkles, Sun, Moon, Github, Phone, Copy, ExternalLink, Palette,
} from "lucide-react";

const themeIcon: Record<ThemeName, typeof Sun> = {
  cyan: Moon,
  light: Sun,
  purple: Sparkles,
  golden: Palette,
};


const sections = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "services", label: "Services", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "contact", label: "Contact", icon: Mail },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    setTimeout(fn, 80);
  };

  const goto = (id: string) =>
    run(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }));

  const copyEmail = () =>
    run(() => {
      navigator.clipboard.writeText("paudiriba@gmail.com");
      toast({ title: "Email copied!", description: "paudiriba@gmail.com" });
    });

  const triggerHint = useMemo(
    () => (navigator.platform.toLowerCase().includes("mac") ? "⌘K" : "Ctrl K"),
    []
  );

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 px-4 py-3 rounded-full
                   glass-card border border-primary/40 hover:border-primary
                   shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300
                   backdrop-blur-xl bg-background/60"
      >
        <Sparkles className="h-4 w-4 text-primary group-hover:animate-pulse" />
        <span className="text-sm font-medium text-foreground hidden sm:inline">Quick Nav</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded
                        bg-primary/10 border border-primary/30 text-[10px] font-mono text-primary">
          {triggerHint}
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden max-w-xl border-primary/30 bg-background/95 backdrop-blur-2xl">
          <DialogTitle className="sr-only">Quick navigation command palette</DialogTitle>
          <DialogDescription className="sr-only">
            Search portfolio sections, downloads, contact actions, links, and appearance settings.
          </DialogDescription>
          <Command className="bg-transparent">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList className="max-h-[400px]">
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup heading="Navigate">
                {sections.map((s) => (
                  <CommandItem key={s.id} onSelect={() => goto(s.id)}>
                    <s.icon className="mr-2 h-4 w-4 text-primary" />
                    <span>Go to {s.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Downloads">
                <CommandItem onSelect={() => run(() => void downloadFile("/Pawlos-Diriba-CV.pdf", "Pawlos-Diriba-CV.pdf"))}>
                  <Download className="mr-2 h-4 w-4 text-primary" />
                  <span>Download CV</span>
                  <CommandShortcut>PDF</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => run(() => void downloadFile("/Pawlos-Diriba-Resume-Modern.pdf", "Pawlos-Diriba-Resume-Modern.pdf"))}>
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Download Modern Resume</span>
                  <CommandShortcut>PDF</CommandShortcut>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Actions">
                <CommandItem onSelect={copyEmail}>
                  <Copy className="mr-2 h-4 w-4 text-primary" />
                  <span>Copy email address</span>
                </CommandItem>
                <CommandItem onSelect={() => run(() => (window.location.href = "mailto:paudiriba@gmail.com"))}>
                  <Mail className="mr-2 h-4 w-4 text-primary" />
                  <span>Send email</span>
                </CommandItem>
                <CommandItem onSelect={() => run(() => (window.location.href = "tel:+251941551883"))}>
                  <Phone className="mr-2 h-4 w-4 text-primary" />
                  <span>Call phone</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Links">
                <CommandItem onSelect={() => run(() => window.open("https://github.com/Paul-dir", "_blank"))}>
                  <Github className="mr-2 h-4 w-4 text-primary" />
                  <span>Open GitHub</span>
                  <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Appearance">
                {THEME_ORDER.filter((t) => t !== theme).map((t) => {
                  const Icon = themeIcon[t];
                  return (
                    <CommandItem key={t} onSelect={() => run(() => setTheme(t))}>
                      <Icon className="mr-2 h-4 w-4 text-primary" />
                      <span>Switch to {THEME_META[t].label}</span>
                      <CommandShortcut className="text-[10px]">{THEME_META[t].tagline}</CommandShortcut>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommandPalette;

            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommandPalette;
