'use client';

import { motion } from 'framer-motion';

interface IconProps {
  className?: string;
  size?: number;
}

export function BrainCircuitIcon({ className = '', size = 24 }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Hexagonal Brain Shape */}
      <path
        d="M12 2L18 6V12L12 16L6 12V6L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Neural Connections */}
      <path
        d="M8 8L16 8M8 12L16 12M8 16L16 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Circuit Nodes */}
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" />
      <circle cx="16" cy="12" r="1.5" fill="currentColor" />
      <circle cx="8" cy="16" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" />
    </motion.svg>
  );
}

export function NeuralNetworkIcon({ className = '', size = 24 }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Network Nodes */}
      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
      
      {/* Connections */}
      <path
        d="M8 6L16 6M8 18L16 18M6 8L6 16M18 8L18 16M8 8L16 16M8 16L16 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Central Hub Connections */}
      <path
        d="M10 10L14 14M14 10L10 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export function CircuitBoardIcon({ className = '', size = 24 }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Circuit Board Outline */}
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Circuit Traces */}
      <path
        d="M6 6H18M6 10H14M6 14H18M6 18H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Vertical Traces */}
      <path
        d="M10 6V18M14 6V14M18 6V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Circuit Components */}
      <rect x="4" y="4" width="2" height="2" fill="currentColor" />
      <rect x="18" y="4" width="2" height="2" fill="currentColor" />
      <rect x="4" y="18" width="2" height="2" fill="currentColor" />
      <rect x="18" y="18" width="2" height="2" fill="currentColor" />
      
      {/* Resistors/Capacitors */}
      <rect x="8" y="7" width="4" height="1" fill="currentColor" />
      <rect x="8" y="15" width="4" height="1" fill="currentColor" />
    </motion.svg>
  );
}

export function TimelineIcon({ className = '', size = 24 }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Timeline Line */}
      <path
        d="M12 2V22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Data Points */}
      <circle cx="12" cy="4" r="2" fill="currentColor" />
      <circle cx="12" cy="8" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="16" r="2" fill="currentColor" />
      <circle cx="12" cy="20" r="2" fill="currentColor" />
      
      {/* Connection Lines */}
      <path
        d="M8 4L16 4M8 8L16 8M8 12L16 12M8 16L16 16M8 20L16 20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export function TerminalIcon({ className = '', size = 24 }: IconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Terminal Window */}
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Terminal Header */}
      <rect
        x="2"
        y="4"
        width="20"
        height="4"
        rx="2"
        fill="currentColor"
        fillOpacity="0.1"
      />
      
      {/* Terminal Dots */}
      <circle cx="5" cy="6" r="1" fill="currentColor" />
      <circle cx="8" cy="6" r="1" fill="currentColor" />
      <circle cx="11" cy="6" r="1" fill="currentColor" />
      
      {/* Command Prompt */}
      <path
        d="M4 12H8M4 16H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Cursor */}
      <motion.rect
        x="12"
        y="15"
        width="1"
        height="2"
        fill="currentColor"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.svg>
  );
}

