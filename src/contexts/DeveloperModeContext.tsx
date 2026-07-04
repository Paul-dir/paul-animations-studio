import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface DeveloperModeContextType {
  devMode: boolean;
  setDevMode: (v: boolean) => void;
  toggleDevMode: () => void;
}

const DeveloperModeContext = createContext<DeveloperModeContextType>({
  devMode: false,
  setDevMode: () => {},
  toggleDevMode: () => {},
});

export const useDeveloperMode = () => useContext(DeveloperModeContext);

export const DeveloperModeProvider = ({ children }: { children: ReactNode }) => {
  const [devMode, setDevMode] = useState<boolean>(() => {
    return localStorage.getItem("portfolio-dev-mode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-dev-mode", String(devMode));
    document.documentElement.classList.toggle("dev-mode", devMode);
  }, [devMode]);

  return (
    <DeveloperModeContext.Provider
      value={{ devMode, setDevMode, toggleDevMode: () => setDevMode(!devMode) }}
    >
      {children}
    </DeveloperModeContext.Provider>
  );
};
