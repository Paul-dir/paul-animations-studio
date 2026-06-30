import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeName = "cyan" | "light" | "purple" | "golden";

export const THEME_ORDER: ThemeName[] = ["cyan", "light", "purple", "golden"];

export const THEME_META: Record<ThemeName, { label: string; tagline: string }> = {
  cyan: { label: "Ocean Cyan", tagline: "Deep cyber dark" },
  light: { label: "Lavender Light", tagline: "Soft daylight" },
  purple: { label: "Midnight Violet", tagline: "Royal nebula" },
  golden: { label: "Royal Amber", tagline: "Warm luxury" },
};

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "cyan", setTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const stored = localStorage.getItem("portfolio-theme") as ThemeName | null;
    return stored && THEME_ORDER.includes(stored) ? stored : "cyan";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
