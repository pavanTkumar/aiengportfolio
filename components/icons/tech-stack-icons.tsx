'use client';

import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// AI/ML Icons
export function LLMIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="17" r="2" fill="currentColor" />
    </svg>
  );
}

export function RAGIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 9H15V15H9V9Z" stroke="currentColor" strokeWidth="2" />
      <path d="M9 3V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 3V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 9H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LangChainIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 7L16 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 7L8 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function VectorDBIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="9" r="2" fill="currentColor" />
      <circle cx="15" cy="15" r="2" fill="currentColor" />
      <circle cx="15" cy="9" r="2" fill="currentColor" />
      <circle cx="9" cy="15" r="2" fill="currentColor" />
    </svg>
  );
}

// Backend Icons
export function PythonIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Python snake body - cyberpunk style */}
      <path
        d="M8 4C6 4 4 6 4 8V10C4 12 6 14 8 14H10C12 14 14 16 14 18V20C14 22 16 24 18 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 20C18 20 20 18 20 16V14C20 12 18 10 16 10H14C12 10 10 8 10 6V4C10 2 8 0 6 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Snake heads */}
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="16" r="2" stroke="currentColor" strokeWidth="2" />
      
      {/* Digital scales */}
      <circle cx="7" cy="7" r="0.5" fill="currentColor" />
      <circle cx="9" cy="7" r="0.5" fill="currentColor" />
      <circle cx="7" cy="9" r="0.5" fill="currentColor" />
      <circle cx="9" cy="9" r="0.5" fill="currentColor" />
      
      <circle cx="15" cy="15" r="0.5" fill="currentColor" />
      <circle cx="17" cy="15" r="0.5" fill="currentColor" />
      <circle cx="15" cy="17" r="0.5" fill="currentColor" />
      <circle cx="17" cy="17" r="0.5" fill="currentColor" />
      
      {/* Circuit patterns */}
      <path d="M6 2H8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M16 22H18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

export function FastAPIIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Lightning bolt - FastAPI symbol */}
      <path
        d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Digital circuit lines */}
      <path d="M8 6H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 10H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 14H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 18H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Circuit nodes */}
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="10" r="1" fill="currentColor" />
      <circle cx="14" cy="10" r="1" fill="currentColor" />
      <circle cx="6" cy="14" r="1" fill="currentColor" />
      <circle cx="18" cy="14" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
      
      {/* Energy particles */}
      <circle cx="10" cy="4" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="14" cy="4" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="10" cy="20" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="14" cy="20" r="0.5" fill="currentColor" opacity="0.7" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

export function AWSIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Cloud shape - AWS symbol */}
      <path
        d="M18 10C19.1 10 20 10.9 20 12C20 13.1 19.1 14 18 14H6C4.9 14 4 13.1 4 12C4 10.9 4.9 10 6 10C6 7.8 7.8 6 10 6C12.2 6 14 7.8 14 10H18Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Cloud layers */}
      <path
        d="M16 8C17.1 8 18 8.9 18 10C18 11.1 17.1 12 16 12H8C6.9 12 6 11.1 6 10C6 8.9 6.9 8 8 8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      
      {/* Data flow arrows */}
      <path d="M8 12L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 12L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 12L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Service nodes */}
      <circle cx="10" cy="10" r="1" fill="currentColor" />
      <circle cx="14" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
      
      {/* Network connections */}
      <path d="M6 6L10 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M18 6L14 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M6 18L10 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M18 18L14 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

export function DockerIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Docker whale body */}
      <path
        d="M4 10C4 8 6 6 8 6H16C18 6 20 8 20 10V16C20 18 18 20 16 20H8C6 20 4 18 4 16V10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Container blocks */}
      <rect x="6" y="10" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.8" />
      <rect x="10.5" y="10" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.8" />
      <rect x="15" y="10" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.8" />
      <rect x="6" y="14.5" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.8" />
      <rect x="10.5" y="14.5" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.8" />
      <rect x="15" y="14.5" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.8" />
      
      {/* Docker whale head */}
      <path
        d="M8 4C8 2 9 1 11 1H13C15 1 16 2 16 4V6H8V4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Container connections */}
      <path d="M9 11.5H10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M13.5 11.5H15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M9 16H10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M13.5 16H15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      
      {/* Digital indicators */}
      <circle cx="7.5" cy="11.5" r="0.5" fill="currentColor" />
      <circle cx="12" cy="11.5" r="0.5" fill="currentColor" />
      <circle cx="16.5" cy="11.5" r="0.5" fill="currentColor" />
      <circle cx="7.5" cy="16" r="0.5" fill="currentColor" />
      <circle cx="12" cy="16" r="0.5" fill="currentColor" />
      <circle cx="16.5" cy="16" r="0.5" fill="currentColor" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

// Frontend Icons
export function ReactIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* React atom structure */}
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      
      {/* Orbital rings */}
      <ellipse cx="12" cy="12" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" opacity="0.7" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" opacity="0.7" transform="rotate(150 12 12)" />
      <ellipse cx="12" cy="12" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" opacity="0.7" transform="rotate(270 12 12)" />
      
      {/* Nucleus */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      
      {/* Electrons */}
      <circle cx="20" cy="12" r="1.5" fill="currentColor" />
      <circle cx="4" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" />
      <circle cx="6" cy="18" r="1.5" fill="currentColor" />
      
      {/* Energy connections */}
      <path d="M12 12L20 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M12 12L4 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M12 12L12 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M12 12L12 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

export function NextJSIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Next.js N symbol */}
      <path
        d="M6 4L6 20L8 20L8 7L18 20L20 20L20 4L18 4L18 17L8 4L6 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Digital framework lines */}
      <path d="M4 6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 18H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Framework nodes */}
      <circle cx="5" cy="6" r="0.5" fill="currentColor" />
      <circle cx="19" cy="6" r="0.5" fill="currentColor" />
      <circle cx="5" cy="18" r="0.5" fill="currentColor" />
      <circle cx="19" cy="18" r="0.5" fill="currentColor" />
      
      {/* Performance indicators */}
      <path d="M10 8H14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M10 10H16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M10 12H14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M10 14H16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M10 16H12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

export function TypeScriptIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* TypeScript TS symbol */}
      <path
        d="M6 4L6 20L8 20L8 6L16 6L16 4L6 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 4L18 20L20 20L20 4L18 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12L18 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Type safety indicators */}
      <path d="M4 6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 18H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Type annotations */}
      <circle cx="5" cy="6" r="0.5" fill="currentColor" />
      <circle cx="19" cy="6" r="0.5" fill="currentColor" />
      <circle cx="5" cy="18" r="0.5" fill="currentColor" />
      <circle cx="19" cy="18" r="0.5" fill="currentColor" />
      
      {/* Code structure lines */}
      <path d="M10 8H14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M10 10H16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M10 14H16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M10 16H12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

export function TailwindIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Tailwind wind symbol */}
      <path
        d="M6 8C8 6 10 8 12 6C14 4 16 6 18 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 12C8 10 10 12 12 10C14 8 16 10 18 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 16C8 14 10 16 12 14C14 12 16 14 18 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 20C8 18 10 20 12 18C14 16 16 18 18 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Utility class indicators */}
      <circle cx="6" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="6" r="1" fill="currentColor" />
      <circle cx="18" cy="4" r="1" fill="currentColor" />
      <circle cx="6" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      <circle cx="18" cy="8" r="1" fill="currentColor" />
      <circle cx="6" cy="16" r="1" fill="currentColor" />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
      <circle cx="18" cy="12" r="1" fill="currentColor" />
      <circle cx="6" cy="20" r="1" fill="currentColor" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
      <circle cx="18" cy="16" r="1" fill="currentColor" />
      
      {/* Responsive breakpoints */}
      <path d="M4 6H6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M18 6H20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M4 10H6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M18 10H20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M4 14H6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M18 14H20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M4 18H6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M18 18H20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

// Database Icons
export function PostgreSQLIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="12" cy="12" rx="10" ry="6" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M6 8L18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 8L6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function RedisIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 8H16V16H8V8Z" stroke="currentColor" strokeWidth="2" />
      <path d="M10 10H14V14H10V10Z" fill="currentColor" />
      <path d="M8 3V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

// Tools Icons
export function GitIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 7L18 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 7L6 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

export function KubernetesIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 8H16V16H8V8Z" stroke="currentColor" strokeWidth="2" />
      <path d="M10 10H14V14H10V10Z" fill="currentColor" />
      <path d="M8 3V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function TerraformIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 8H16V16H8V8Z" stroke="currentColor" strokeWidth="2" />
      <path d="M10 10H14V14H10V10Z" fill="currentColor" />
      <path d="M8 3V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
