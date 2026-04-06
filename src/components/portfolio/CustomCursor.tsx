import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CursorPos = {
  x: number;
  y: number;
};

const CustomCursor = () => {
  const [pos, setPos] = useState<CursorPos>({ x: 0, y: 0 });
  const [clicking, setClicking] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "custom-cursor-hide-style";
    style.textContent = `
      body,
      button,
      input,
      textarea,
      select,
      a,
      [role="button"],
      [role="link"] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "button, input, select, textarea, a, [role='button'], [role='link']"
        )
      ) {
        setHovering(true);
      }
    };

    const out = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "button, input, select, textarea, a, [role='button'], [role='link']"
        )
      ) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over, true);
    window.addEventListener("mouseout", out, true);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over, true);
      window.removeEventListener("mouseout", out, true);
      style.remove();
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      animate={{
        x: pos.x - 12,
        y: pos.y - 12,
        scale: clicking ? 0.85 : hovering ? 1.2 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer geometric pen shape */}
        <path
          d="M12 2 L19 8 L17 16 L12 20 L7 16 L5 8 Z"
          fill="none"
          stroke="#00FFFF"
          strokeWidth="2"
          strokeLinejoin="miter"
          strokeLinecap="round"
        />
        {/* Inner diagonal line */}
        <path
          d="M5 8 L19 8"
          fill="none"
          stroke="#00FFFF"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Center detail circle */}
        <circle cx="12" cy="10" r="1.8" fill="none" stroke="#00FFFF" strokeWidth="1.8" />
        <circle cx="12" cy="10" r="1" fill="#00FFFF" />
      </svg>
    </motion.div>
  );
};

export default CustomCursor;