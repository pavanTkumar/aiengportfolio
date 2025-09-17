'use client';

import { motion } from 'framer-motion';

interface VectorDBIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export function VectorDBIcon({ className = '', size = 48, animated = true }: VectorDBIconProps) {
  const IconComponent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="vectordb-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="vector-glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* 3D Space Container */}
      <motion.rect
        x="8"
        y="8"
        width="32"
        height="32"
        rx="4"
        stroke="url(#vectordb-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#vector-glow)"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Vector Points with Animation */}
      {[
        { x: 16, y: 16, delay: 0.2 },
        { x: 32, y: 20, delay: 0.4 },
        { x: 20, y: 32, delay: 0.6 },
        { x: 28, y: 28, delay: 0.8 },
        { x: 24, y: 24, delay: 1.0 }
      ].map((point, index) => (
        <motion.circle
          key={index}
          cx={point.x}
          cy={point.y}
          r="2"
          fill="url(#vectordb-gradient)"
          filter="url(#vector-glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeOut", 
            delay: point.delay 
          }}
        />
      ))}
      
      {/* Connection Lines */}
      {[
        { from: { x: 16, y: 16 }, to: { x: 24, y: 24 }, delay: 1.2 },
        { from: { x: 32, y: 20 }, to: { x: 24, y: 24 }, delay: 1.4 },
        { from: { x: 20, y: 32 }, to: { x: 24, y: 24 }, delay: 1.6 },
        { from: { x: 28, y: 28 }, to: { x: 24, y: 24 }, delay: 1.8 }
      ].map((line, index) => (
        <motion.path
          key={index}
          d={`M${line.from.x} ${line.from.y}L${line.to.x} ${line.to.y}`}
          stroke="url(#vectordb-gradient)"
          strokeWidth="1"
          strokeOpacity="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut", 
            delay: line.delay 
          }}
        />
      ))}
      
      {/* Dimension Indicators */}
      <motion.path
        d="M8 8L4 4M40 8L44 4M8 40L4 44"
        stroke="url(#vectordb-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
      />
    </svg>
  );

  return animated ? (
    <motion.div
      className="cursor-pointer"
      whileHover={{ scale: 1.1, rotate: -1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
    >
      {IconComponent}
    </motion.div>
  ) : IconComponent;
}
