import { useEffect, useRef } from "react";

const LightAnimatedBackground = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth - 0.5) * 20;
      const yPercent = (clientY / innerHeight - 0.5) * 20;
      const blobs = canvasRef.current.querySelectorAll(".light-blob");
      blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.3;
        (blob as HTMLElement).style.transform =
          `translate(${xPercent * speed}px, ${yPercent * speed}px)`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Large cyan blob top-left */}
      <div
        className="light-blob absolute animate-float"
        style={{
          top: "-10%",
          left: "-5%",
          width: "55vw",
          height: "55vw",
          maxWidth: "800px",
          maxHeight: "800px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, hsl(187 85% 70% / 0.55), hsl(195 90% 75% / 0.25) 50%, transparent 75%)",
          filter: "blur(60px)",
          animationDuration: "12s",
          transition: "transform 0.4s ease-out",
        }}
      />

      {/* Sky blue blob top-right */}
      <div
        className="light-blob absolute animate-float"
        style={{
          top: "5%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          maxWidth: "700px",
          maxHeight: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 60% 40%, hsl(210 90% 75% / 0.5), hsl(220 85% 80% / 0.2) 55%, transparent 75%)",
          filter: "blur(70px)",
          animationDuration: "15s",
          animationDelay: "2s",
          transition: "transform 0.4s ease-out",
        }}
      />

      {/* Soft pink/peach blob mid-left */}
      <div
        className="light-blob absolute animate-float"
        style={{
          top: "40%",
          left: "10%",
          width: "45vw",
          height: "45vw",
          maxWidth: "650px",
          maxHeight: "650px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, hsl(340 90% 80% / 0.45), hsl(20 95% 80% / 0.2) 55%, transparent 75%)",
          filter: "blur(70px)",
          animationDuration: "18s",
          animationDelay: "1s",
          transition: "transform 0.4s ease-out",
        }}
      />

      {/* Mint/teal blob bottom-right */}
      <div
        className="light-blob absolute animate-float"
        style={{
          bottom: "-10%",
          right: "5%",
          width: "50vw",
          height: "50vw",
          maxWidth: "750px",
          maxHeight: "750px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 60%, hsl(160 75% 70% / 0.5), hsl(180 80% 75% / 0.2) 55%, transparent 75%)",
          filter: "blur(70px)",
          animationDuration: "14s",
          animationDelay: "3s",
          transition: "transform 0.4s ease-out",
        }}
      />

      {/* Lavender blob center-bottom */}
      <div
        className="light-blob absolute animate-float"
        style={{
          bottom: "10%",
          left: "30%",
          width: "40vw",
          height: "40vw",
          maxWidth: "600px",
          maxHeight: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, hsl(265 85% 80% / 0.45), hsl(280 80% 85% / 0.2) 55%, transparent 75%)",
          filter: "blur(80px)",
          animationDuration: "20s",
          animationDelay: "4s",
          transition: "transform 0.4s ease-out",
        }}
      />
    </div>
  );
};

export default LightAnimatedBackground;
