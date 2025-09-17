'use client';

import { motion } from 'framer-motion';

interface FAISSIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export function FAISSIcon({ className = '', size = 48, animated = true }: FAISSIconProps) {
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
        <linearGradient id="faiss-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="faiss-glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Search Magnifying Glass */}
      <motion.circle
        cx="20"
        cy="20"
        r="8"
        stroke="url(#faiss-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#faiss-glow)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.path
        d="M26 26L32 32"
        stroke="url(#faiss-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#faiss-glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
      />
      
      {/* Similarity Indicators */}
      {[
        { y: 12, opacity: 0.8, delay: 0.5 },
        { y: 20, opacity: 0.6, delay: 0.7 },
        { y: 28, opacity: 0.4, delay: 0.9 },
        { y: 36, opacity: 0.2, delay: 1.1 }
      ].map((indicator, index) => (
        <motion.circle
          key={index}
          cx="36"
          cy={indicator.y}
          r="3"
          fill="url(#faiss-gradient)"
          opacity={indicator.opacity}
          filter="url(#faiss-glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: indicator.opacity }}
          transition={{ 
            duration: 0.4, 
            ease: "easeOut", 
            delay: indicator.delay 
          }}
        />
      ))}
      
      {/* Connection Lines */}
      {[
        { delay: 0.6 },
        { delay: 0.8 },
        { delay: 1.0 },
        { delay: 1.2 }
      ].map((line, index) => (
        <motion.path
          key={index}
          d="M28 20L33 12"
          stroke="url(#faiss-gradient)"
          strokeWidth="1"
          strokeOpacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeInOut", 
            delay: line.delay 
          }}
        />
      ))}
      
      {/* Search Pattern */}
      <motion.circle
        cx="20"
        cy="20"
        r="4"
        stroke="url(#faiss-gradient)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="2,2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1.4 }}
      />
    </svg>
  );

  return animated ? (
    <motion.div
      className="cursor-pointer"
      whileHover={{ scale: 1.1, rotate: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
    >
      {IconComponent}
    </motion.div>
  ) : IconComponent;
}
