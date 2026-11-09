import { CASE_STUDIES } from "@/data/projectCaseStudies";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  link: string;
  repo?: string;
  image: string;
  category: "Web App" | "Frontend" | "Full Stack";
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: "AI Resume Analyzer",
    description: "Resumind reviews PDF resumes against target job descriptions, with ATS insights, category scores and actionable improvement suggestions.",
    tech: ["React 19", "TypeScript", "React Router", "Puter.js", "PDF.js"],
    link: "https://ai-resume-analyzer-teal-mu.vercel.app/",
    repo: "https://github.com/Paul-dir/ai-resume-analyzer",
    image: CASE_STUDIES["AI Resume Analyzer"].screenshots[0],
    category: "Full Stack",
    featured: true,
  },
  {
    title: "Audit Planning System",
    description: "An enterprise audit planning platform for scheduling engagements, assigning audit teams, tracking findings and generating compliance reports.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    link: "https://audit-planning-system.vercel.app/",
    repo: "https://github.com/Paul-dir",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "Fayda Style OTP Demo",
    description: "Ethiopian identity (Fayda-style) verification hub with real cellular SMS OTP delivery, carrier detection and secure hashed code verification.",
    tech: ["React", "Express", "TypeScript", "SMS API"],
    link: "https://fayda-style-otp-demo-kq4c.vercel.app/",
    repo: "https://github.com/Paul-dir/Fayda-Style-OTP-Demo",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "ITAS Audit System",
    description: "Integrated Tax Administration System tax-audit module for Ethiopia's Ministry of Revenue: annual planning, committee review and five audit execution types.",
    tech: ["Java 21", "Spring Boot", "PostgreSQL", "React 19", "Keycloak"],
    link: "https://itas-audit-system.vercel.app/",
    repo: "https://github.com/Paul-dir/itas-audit-system",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "Task Manager",
    description: "A comprehensive task management application with user-friendly interface for organizing and tracking daily tasks efficiently.",
    tech: ["React", "Next.js", "Tailwind CSS"],
    link: "https://task-manager-five-psi-75.vercel.app/",
    repo: "https://github.com/Paul-dir",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop",
    category: "Web App",
    featured: true,
  },
  {
    title: "Garage123",
    description: "A modern garage management system designed to streamline vehicle service tracking and customer management.",
    tech: ["React", "Firebase", "CSS"],
    link: "https://garage-aid-i6gc.vercel.app/",
    repo: "https://github.com/Paul-dir",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "E-Commerce Platform",
    description: "Full-featured online shopping platform with product catalog, cart management, and secure checkout process.",
    tech: ["Next.js", "TypeScript", "Stripe"],
    link: "https://github.com/Paul-dir",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop",
    category: "Full Stack",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application with detailed forecasts, interactive maps, and location-based weather alerts.",
    tech: ["React", "OpenWeather API", "Chart.js"],
    link: "https://github.com/Paul-dir",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop",
    category: "Web App",
  },
  {
    title: "MyPortfolio",
    description: "A personal portfolio website showcasing my projects and skills with a clean and modern design.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://paul-dir.github.io/myPortfolio/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    category: "Frontend",
  },
  {
    title: "Kalkidan Cup Cafe",
    description: "An elegant website for a local cafe featuring menu items, location information, and online ordering capabilities.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://paul-dir.github.io/Kalkidan-cup-cafe/",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop",
    category: "Frontend",
  },
];

