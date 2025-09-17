'use client';

import { motion } from 'framer-motion';

interface PineconeIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export function PineconeIcon({ className = '', size = 48, animated = true }: PineconeIconProps) {
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
        <linearGradient id="pinecone-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <filter id="pinecone-glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Pine Cone Shape */}
      <motion.path
        d="M24 4L32 12L28 16L36 20L32 24L40 28L36 32L44 36L24 44L4 36L8 32L0 28L4 24L-4 20L0 16L-4 12L16 4Z"
        stroke="url(#pinecone-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#pinecone-glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Geometric Pattern Layers */}
      {[
        { y: 8, delay: 0.5 },
        { y: 20, delay: 0.8 },
        { y: 32, delay: 1.1 }
      ].map((layer, index) => (
        <motion.path
          key={index}
          d={`M24 ${layer.y}L28 ${layer.y + 4}L24 ${layer.y + 8}L20 ${layer.y + 4}Z`}
          stroke="url(#pinecone-gradient)"
          strokeWidth="1.5"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut", 
            delay: layer.delay 
          }}
        />
      ))}
      
      {/* Central Core */}
      <motion.circle
        cx="24"
        cy="24"
        r="3"
        fill="url(#pinecone-gradient)"
        filter="url(#pinecone-glow)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
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
