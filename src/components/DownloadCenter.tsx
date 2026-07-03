import { FileText, Download, Award, GraduationCap, Briefcase, Mail } from "lucide-react";
import { downloadFile } from "@/lib/utils";

const ITEMS = [
  { icon: FileText, label: "Resume", desc: "1-page snapshot", file: "/resume.pdf", name: "Pawlos-Diriba-Resume.pdf" },
  { icon: Briefcase, label: "CV", desc: "Full curriculum vitae", file: "/cv.pdf", name: "Pawlos-Diriba-CV.pdf" },
  { icon: Award, label: "Certificates", desc: "Professional certifications", file: "/certificates.pdf", name: "Certificates.pdf" },
  { icon: GraduationCap, label: "Transcript", desc: "Academic records", file: "/transcript.pdf", name: "Transcript.pdf" },
  { icon: FileText, label: "Portfolio PDF", desc: "Complete portfolio deck", file: "/portfolio.pdf", name: "Portfolio.pdf" },
  { icon: Mail, label: "References", desc: "Recommendation letters", file: "/references.pdf", name: "References.pdf" },
];

const DownloadCenter = () => {
  return (
    <section id="downloads" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Download Center
            </span>
          </h2>
          <p className="text-muted-foreground">Everything you need — one professional hub.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map(({ icon: Icon, label, desc, file, name }) => (
            <button
              key={label}
              onClick={() => downloadFile(file, name)}
              className="glass-card rounded-2xl p-6 border border-primary/20 hover:border-primary/60 transition-all hover:-translate-y-1 group text-left flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{label}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadCenter;
