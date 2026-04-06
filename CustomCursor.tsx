import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouchDevice, isVisible, mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="custom-cursor"
      style={{
        x: springX,
        y: springY,
        pointerEvents: 'none',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isClicked ? 0.9 : 1,
        rotate: isClicked ? -5 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Glow ring */}
      <div
        style={{
          position: 'absolute',
          top: '-10px',
          left: '-10px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(5px)',
        }}
      />
      {/* Pen cursor */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.8))',
        }}
      >
        <path
          d="M2 18L7 13L13 19L19 13L13 7L19 1L13 7L7 1L1 7L7 13L2 18Z"
          fill="#00FFFF"
          stroke="#00FFFF"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
};

export default CustomCursor;