'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseOut = () => setIsVisible(false);

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseout', handleMouseOut);

    // Add hover listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseout', handleMouseOut);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          x: -8,
          y: -8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="relative">
          {/* Outer Ring */}
          <motion.div
            className="w-4 h-4 border-2 border-green-400 rounded-full"
            animate={{
              scale: isHovering ? 1.2 : 1,
              opacity: isHovering ? 0.8 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Inner Dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: isHovering ? 0.5 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Glow Effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-8 h-8 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-20 blur-sm"
            animate={{
              scale: isHovering ? 1.5 : 0.8,
              opacity: isHovering ? 0.3 : 0.1,
            }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.div>

      {/* Trailing Cursor */}
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          x: -4,
          y: -4,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
      >
        <motion.div
          className="w-2 h-2 bg-cyan-400 rounded-full opacity-60"
          animate={{
            scale: isHovering ? 0.8 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </>
  );
}