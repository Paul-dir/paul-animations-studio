import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CursorFollower = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Don't show on touch devices
    if ("ontouchstart" in window) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, [role='button'], input, textarea, select, [data-magnetic]");
      setHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHover);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [visible, x, y]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-primary/80"
          animate={{
            width: hovering ? 48 : 12,
            height: hovering ? 48 : 12,
            opacity: hovering ? 0.3 : 0.8,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>
    </>
  );
};

export default CursorFollower;
