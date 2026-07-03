import { useEffect, useState } from "react";
import { toast } from "sonner";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight"];

const EasterEggs = () => {
  const [cyber, setCyber] = useState(false);
  const [matrix, setMatrix] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];
    let typed = "";
    let typedTimer: number | undefined;

    const onKey = (e: KeyboardEvent) => {
      // Konami
      buffer.push(e.key);
      if (buffer.length > KONAMI.length) buffer.shift();
      if (buffer.join(",") === KONAMI.join(",")) {
        setCyber((c) => !c);
        toast.success("🕶️ Cyber mode " + (cyber ? "deactivated" : "activated"));
        buffer = [];
      }

      // typing "matrix"
      if (e.key.length === 1) typed += e.key.toLowerCase();
      if (typed.length > 10) typed = typed.slice(-10);
      window.clearTimeout(typedTimer);
      typedTimer = window.setTimeout(() => (typed = ""), 1500);
      if (typed.includes("matrix")) {
        setMatrix((m) => !m);
        toast.success("💊 Matrix mode " + (matrix ? "off" : "on"));
        typed = "";
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cyber, matrix]);

  useEffect(() => {
    document.documentElement.classList.toggle("cyber-mode", cyber);
    document.documentElement.classList.toggle("matrix-mode", matrix);
  }, [cyber, matrix]);

  return null;
};

export default EasterEggs;
