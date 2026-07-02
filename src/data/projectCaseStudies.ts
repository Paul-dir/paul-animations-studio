export type CaseStudy = {
  title: string;
  tagline: string;
  screenshots: string[];
  tech: string[];
  architecture: string[];
  features: string[];
  challenges: string[];
  contribution: string[];
  timeline: { phase: string; detail: string }[];
  lessons: string[];
  link?: string;
  repo?: string;
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "Task Manager": {
    title: "Task Manager",
    tagline: "A modern task management platform for teams and individuals.",
    screenshots: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&auto=format&fit=crop",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
    architecture: [
      "Next.js App Router with server components for fast initial loads",
      "Client-side state via Zustand with persisted storage",
      "REST API layer with optimistic UI updates",
      "Component-driven design system with Tailwind tokens",
    ],
    features: [
      "Drag-and-drop task boards (Kanban style)",
      "Due dates, priorities, and labels",
      "Dark / light theming with saved preference",
      "Keyboard-first quick actions",
      "Responsive layout across desktop, tablet, mobile",
    ],
    challenges: [
      "Keeping drag-drop 60fps with large lists",
      "Persisting state without hydration mismatches in SSR",
      "Designing an accessible focus flow for keyboard users",
    ],
    contribution: [
      "Owned the full frontend architecture end-to-end",
      "Built the design system and reusable primitives",
      "Implemented drag-drop, filters and persistence",
      "Ship-ready deployment on Vercel with CI checks",
    ],
    timeline: [
      { phase: "Discovery", detail: "1 week — flows, wireframes, tech choices" },
      { phase: "MVP Build", detail: "3 weeks — core CRUD, boards, auth" },
      { phase: "Polish", detail: "1 week — animations, a11y, perf pass" },
      { phase: "Launch", detail: "Deployed to production on Vercel" },
    ],
    lessons: [
      "Optimistic updates dramatically improve perceived speed",
      "A design system pays back after just a few components",
      "Accessibility is easier when designed in, not bolted on",
    ],
  },
  "Garage123": {
    title: "Garage123",
    tagline: "A garage management system for service tracking and customers.",
    screenshots: [
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&auto=format&fit=crop",
    ],
    tech: ["React", "Firebase", "Firestore", "CSS Modules", "Vite"],
    architecture: [
      "React SPA served from Vercel edge",
      "Firebase Auth for garage staff login",
      "Firestore for realtime service records",
      "Cloud Functions for invoice generation",
    ],
    features: [
      "Realtime service ticket board",
      "Customer & vehicle profiles",
      "Invoice generation and printable receipts",
      "Role-based access (owner / mechanic)",
    ],
    challenges: [
      "Modeling relational data in a NoSQL store",
      "Handling offline edits with sync-on-reconnect",
      "Balancing realtime listeners vs read cost",
    ],
    contribution: [
      "Full-stack implementation, solo developer",
      "Designed data model and security rules",
      "Built the UI, auth flow, and invoicing pipeline",
    ],
    timeline: [
      { phase: "Research", detail: "Interviews with a local garage owner" },
      { phase: "Build", detail: "4 weeks of iterative delivery" },
      { phase: "Handoff", detail: "Training + docs for the staff" },
    ],
    lessons: [
      "Talking to real users beats guessing every time",
      "Firestore rules deserve their own test suite",
      "Simple, printable outputs earn user trust",
    ],
  },
  "E-Commerce Platform": {
    title: "E-Commerce Platform",
    tagline: "Full-featured storefront with cart, checkout, and Stripe payments.",
    screenshots: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1400&auto=format&fit=crop",
    ],
    tech: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "Prisma"],
    architecture: [
      "Next.js hybrid rendering (SSG for catalog, SSR for cart)",
      "Stripe Checkout + webhooks for order state",
      "Prisma ORM against Postgres",
      "Image optimization via next/image",
    ],
    features: [
      "Product catalog with filters and search",
      "Cart, saved items, and guest checkout",
      "Secure Stripe payment flow",
      "Order confirmation emails",
    ],
    challenges: [
      "Reliable webhook handling with idempotency",
      "Cart sync across devices for logged-in users",
      "SEO for thousands of product pages",
    ],
    contribution: [
      "Architected checkout and payment flow",
      "Built catalog + search UX",
      "Set up webhook processing and order lifecycle",
    ],
    timeline: [
      { phase: "Setup", detail: "Repo, CI, design tokens" },
      { phase: "Core", detail: "Catalog, cart, Stripe integration" },
      { phase: "Polish", detail: "SEO, perf, analytics" },
    ],
    lessons: [
      "Webhook idempotency is non-negotiable",
      "SSG + ISR is a sweet spot for commerce",
      "Small UX cuts in checkout raise conversion a lot",
    ],
  },
  "Weather Dashboard": {
    title: "Weather Dashboard",
    tagline: "Real-time weather with forecasts, maps, and alerts.",
    screenshots: [
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=1400&auto=format&fit=crop",
    ],
    tech: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
    architecture: [
      "SPA fetching OpenWeather REST endpoints",
      "Client-side caching per location",
      "Chart.js for hourly and 7-day visuals",
    ],
    features: [
      "Search any city, save favorites",
      "Hourly + 7-day forecasts",
      "Severe weather alerts",
      "Interactive charts",
    ],
    challenges: [
      "Rate-limit friendly caching",
      "Readable charts on tiny screens",
    ],
    contribution: [
      "Built the entire UI and data layer",
      "Designed the mobile-first responsive layout",
    ],
    timeline: [
      { phase: "MVP", detail: "1 week for core forecast view" },
      { phase: "Polish", detail: "Charts, alerts, favorites" },
    ],
    lessons: [
      "Cache smartly to stay under API limits",
      "Weather data quality varies — degrade gracefully",
    ],
  },
  "MyPortfolio": {
    title: "MyPortfolio",
    tagline: "A personal portfolio built with vanilla HTML, CSS, and JS.",
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1400&auto=format&fit=crop",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    architecture: [
      "Static site hosted on GitHub Pages",
      "Zero-dependency vanilla JS",
    ],
    features: [
      "Hero, about, projects, contact",
      "Smooth scroll navigation",
      "Fully responsive",
    ],
    challenges: [
      "Making it feel modern without any framework",
    ],
    contribution: ["Designed and coded end-to-end"],
    timeline: [{ phase: "Build", detail: "A focused weekend project" }],
    lessons: [
      "You can go far with just HTML + CSS + a little JS",
    ],
  },
  "Kalkidan Cup Cafe": {
    title: "Kalkidan Cup Cafe",
    tagline: "Elegant marketing site for a local cafe.",
    screenshots: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1400&auto=format&fit=crop",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    architecture: ["Static site, GitHub Pages hosting"],
    features: [
      "Menu showcase",
      "Location + hours",
      "Contact + ordering CTA",
    ],
    challenges: ["Making a warm, brand-aligned feel with limited assets"],
    contribution: ["Full design and implementation"],
    timeline: [{ phase: "Build", detail: "Delivered in under a week" }],
    lessons: ["Great typography does most of the heavy lifting"],
  },
};
