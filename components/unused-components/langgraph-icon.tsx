'use client';

import { motion } from 'framer-motion';

interface LangGraphIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export function LangGraphIcon({ className = '', size = 48, animated = true }: LangGraphIconProps) {
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
        <linearGradient id="langgraph-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id="langgraph-glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <marker
          id="arrowhead-graph"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="url(#langgraph-gradient)"
          />
        </marker>
      </defs>
      
      {/* Graph Nodes */}
      {[
        { x: 12, y: 12, delay: 0.2 },
        { x: 36, y: 12, delay: 0.4 },
        { x: 12, y: 36, delay: 0.6 },
        { x: 36, y: 36, delay: 0.8 },
        { x: 24, y: 24, delay: 1.0 }
      ].map((node, index) => (
        <motion.circle
          key={index}
          cx={node.x}
          cy={node.y}
          r="4"
          stroke="url(#langgraph-gradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#langgraph-glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut", 
            delay: node.delay 
          }}
        />
      ))}
      
      {/* Directed Edges */}
      {[
        { from: { x: 16, y: 12 }, to: { x: 32, y: 12 }, delay: 1.2 },
        { from: { x: 12, y: 16 }, to: { x: 12, y: 32 }, delay: 1.4 },
        { from: { x: 16, y: 36 }, to: { x: 32, y: 36 }, delay: 1.6 },
        { from: { x: 36, y: 16 }, to: { x: 36, y: 32 }, delay: 1.8 },
        { from: { x: 20, y: 20 }, to: { x: 28, y: 28 }, delay: 2.0 }
      ].map((edge, index) => (
        <motion.path
          key={index}
          d={`M${edge.from.x} ${edge.from.y}L${edge.to.x} ${edge.to.y}`}
          stroke="url(#langgraph-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd="url(#arrowhead-graph)"
          filter="url(#langgraph-glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut", 
            delay: edge.delay 
          }}
        />
      ))}
      
      {/* Node Labels */}
      {[
        { x: 12, y: 12, text: 'A', delay: 2.2 },
        { x: 36, y: 12, text: 'B', delay: 2.4 },
        { x: 12, y: 36, text: 'C', delay: 2.6 },
        { x: 36, y: 36, text: 'D', delay: 2.8 },
        { x: 24, y: 24, text: 'E', delay: 3.0 }
      ].map((label, index) => (
        <motion.text
          key={index}
          x={label.x}
          y={label.y + 1}
          textAnchor="middle"
          fontSize="8"
          fill="url(#langgraph-gradient)"
          filter="url(#langgraph-glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeOut", 
            delay: label.delay 
          }}
        >
          {label.text}
        </motion.text>
      ))}
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
