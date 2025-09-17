'use client';

import { motion } from 'framer-motion';

interface LangChainIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export function LangChainIcon({ className = '', size = 48, animated = true }: LangChainIconProps) {
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
        <linearGradient id="langchain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Chain Links */}
      <motion.path
        d="M12 16C12 12.6863 14.6863 10 18 10H30C33.3137 10 36 12.6863 36 16V20C36 23.3137 33.3137 26 30 26H18C14.6863 26 12 23.3137 12 20V16Z"
        stroke="url(#langchain-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M12 28C12 24.6863 14.6863 22 18 22H30C33.3137 22 36 24.6863 36 28V32C36 35.3137 33.3137 38 30 38H18C14.6863 38 12 35.3137 12 32V28Z"
        stroke="url(#langchain-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
      />
      
      {/* Connection Lines */}
      <motion.path
        d="M24 26V22"
        stroke="url(#langchain-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.path
        d="M24 10V6"
        stroke="url(#langchain-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.path
        d="M24 38V42"
        stroke="url(#langchain-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
      />
    </svg>
  );

  return animated ? (
    <motion.div
      className="cursor-pointer"
      whileHover={{ scale: 1.1, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
    >
      {IconComponent}
    </motion.div>
  ) : IconComponent;
}
