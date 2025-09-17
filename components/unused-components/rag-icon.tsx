'use client';

import { motion } from 'framer-motion';

interface RAGIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export function RAGIcon({ className = '', size = 48, animated = true }: RAGIconProps) {
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
        <linearGradient id="rag-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id="rag-glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Document Input */}
      <motion.rect
        x="4"
        y="8"
        width="12"
        height="16"
        rx="2"
        stroke="url(#rag-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#rag-glow)"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.path
        d="M8 12H12M8 16H12M8 20H10"
        stroke="url(#rag-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
      />
      
      {/* Vector Transformation */}
      <motion.circle
        cx="24"
        cy="16"
        r="8"
        stroke="url(#rag-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#rag-glow)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
      />
      <motion.path
        d="M20 12L24 16L28 12M20 20L24 16L28 20"
        stroke="url(#rag-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
      />
      
      {/* Output */}
      <motion.rect
        x="32"
        y="8"
        width="12"
        height="16"
        rx="2"
        stroke="url(#rag-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#rag-glow)"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
      />
      <motion.path
        d="M36 12H40M36 16H40M36 20H38"
        stroke="url(#rag-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Flow Arrows */}
      <motion.path
        d="M16 16H20"
        stroke="url(#rag-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.path
        d="M28 16H32"
        stroke="url(#rag-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.9 }}
      />
      
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="url(#rag-gradient)"
          />
        </marker>
      </defs>
    </svg>
  );

  return animated ? (
    <motion.div
      className="cursor-pointer"
      whileHover={{ scale: 1.1, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
    >
      {IconComponent}
    </motion.div>
  ) : IconComponent;
}
