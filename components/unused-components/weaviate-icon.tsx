'use client';

import { motion } from 'framer-motion';

interface WeaviateIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export function WeaviateIcon({ className = '', size = 48, animated = true }: WeaviateIconProps) {
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
        <linearGradient id="weaviate-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="weaviate-glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Central Hub */}
      <motion.circle
        cx="24"
        cy="24"
        r="6"
        stroke="url(#weaviate-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#weaviate-glow)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Network Nodes */}
      {[
        { x: 12, y: 12, delay: 0.2 },
        { x: 36, y: 12, delay: 0.4 },
        { x: 12, y: 36, delay: 0.6 },
        { x: 36, y: 36, delay: 0.8 },
        { x: 24, y: 8, delay: 1.0 },
        { x: 24, y: 40, delay: 1.2 },
        { x: 8, y: 24, delay: 1.4 },
        { x: 40, y: 24, delay: 1.6 }
      ].map((node, index) => (
        <motion.circle
          key={index}
          cx={node.x}
          cy={node.y}
          r="3"
          fill="url(#weaviate-gradient)"
          filter="url(#weaviate-glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeOut", 
            delay: node.delay 
          }}
        />
      ))}
      
      {/* Weaving Connections */}
      {[
        { from: { x: 24, y: 18 }, to: { x: 12, y: 12 }, delay: 1.8 },
        { from: { x: 24, y: 18 }, to: { x: 36, y: 12 }, delay: 2.0 },
        { from: { x: 24, y: 30 }, to: { x: 12, y: 36 }, delay: 2.2 },
        { from: { x: 24, y: 30 }, to: { x: 36, y: 36 }, delay: 2.4 },
        { from: { x: 18, y: 24 }, to: { x: 12, y: 12 }, delay: 2.6 },
        { from: { x: 18, y: 24 }, to: { x: 12, y: 36 }, delay: 2.8 },
        { from: { x: 30, y: 24 }, to: { x: 36, y: 12 }, delay: 3.0 },
        { from: { x: 30, y: 24 }, to: { x: 36, y: 36 }, delay: 3.2 }
      ].map((connection, index) => (
        <motion.path
          key={index}
          d={`M${connection.from.x} ${connection.from.y}L${connection.to.x} ${connection.to.y}`}
          stroke="url(#weaviate-gradient)"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut", 
            delay: connection.delay 
          }}
        />
      ))}
      
      {/* Central Pattern */}
      <motion.circle
        cx="24"
        cy="24"
        r="2"
        fill="url(#weaviate-gradient)"
        filter="url(#weaviate-glow)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 3.4 }}
      />
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
