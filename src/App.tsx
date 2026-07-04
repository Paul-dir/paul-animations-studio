import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DeveloperModeProvider } from "@/contexts/DeveloperModeContext";
import DeveloperModeToggle from "@/components/DeveloperModeToggle";
import DeveloperPanel from "@/components/DeveloperPanel";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <DeveloperModeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <DeveloperModeToggle />
            <DeveloperPanel />
          </BrowserRouter>
        </TooltipProvider>
      </DeveloperModeProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
