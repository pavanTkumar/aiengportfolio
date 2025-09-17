'use client';

import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// Cyberpunk GitHub Icon - Based on original GitHub logo
export function CyberpunkGitHubIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* GitHub cat silhouette - cyberpunk style */}
      <path
        d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.843 20.35 8.859 21.49C9.349 21.58 9.521 21.27 9.521 21.01C9.521 20.78 9.512 20.14 9.507 19.31C6.726 19.91 6.14 18.04 6.14 18.04C5.685 16.81 5.029 16.5 5.029 16.5C4.121 15.88 5.097 15.9 5.097 15.9C6.101 15.97 6.629 16.93 6.629 16.93C7.521 18.45 8.97 18 9.54 17.76C9.631 17.11 9.889 16.67 10.175 16.42C7.954 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6.01 9.5 6.649 8.79C6.546 8.54 6.203 7.5 6.747 6.15C6.747 6.15 7.586 5.88 9.496 7.17C10.294 6.95 11.15 6.84 12.006 6.84C12.862 6.84 13.718 6.95 14.516 7.17C16.426 5.88 17.265 6.15 17.265 6.15C17.809 7.5 17.466 8.54 17.363 8.79C18.002 9.5 18.392 10.39 18.392 11.5C18.392 15.32 16.054 16.16 13.826 16.41C14.172 16.72 14.494 17.33 14.494 18.26C14.494 19.6 14.481 20.68 14.481 21.01C14.481 21.27 14.653 21.59 15.143 21.49C19.157 20.35 22 16.418 22 12C22 6.477 17.523 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Digital circuit patterns */}
      <path d="M8 6H16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M8 8H14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M8 10H16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M8 12H12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      
      {/* Code indicators */}
      <circle cx="6" cy="6" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="18" cy="6" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="6" cy="10" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="18" cy="10" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="6" cy="14" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="18" cy="14" r="0.5" fill="currentColor" opacity="0.7" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

// Cyberpunk LinkedIn Icon - Based on original LinkedIn logo
export function CyberpunkLinkedInIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* LinkedIn "in" symbol - cyberpunk style */}
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      
      {/* "in" letters */}
      <path
        d="M8 7C8.552 7 9 7.448 9 8V16C9 16.552 8.552 17 8 17C7.448 17 7 16.552 7 16V8C7 7.448 7.448 7 8 7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      <path
        d="M15 7C16.105 7 17 7.895 17 9V16C17 16.552 16.552 17 16 17C15.448 17 15 16.552 15 16V10C15 9.448 14.552 9 14 9C13.448 9 13 9.448 13 10V16C13 16.552 12.552 17 12 17C11.448 17 11 16.552 11 16V9C11 7.895 11.895 7 13 7H15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Digital network connections */}
      <path d="M6 6H8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M16 6H18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M6 18H8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M16 18H18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      
      {/* Professional network indicators */}
      <circle cx="5" cy="5" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="19" cy="5" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="5" cy="19" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="19" cy="19" r="0.5" fill="currentColor" opacity="0.7" />
      
      {/* Connection lines */}
      <path d="M5 5L7 7" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
      <path d="M19 5L17 7" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
      <path d="M5 19L7 17" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
      <path d="M19 19L17 17" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

// Cyberpunk Email Icon - Digital Envelope
export function CyberpunkEmailIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Envelope base */}
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      
      {/* Envelope flap */}
      <path d="M3 8L12 14L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Digital elements */}
      <rect x="6" y="10" width="12" height="6" rx="1" fill="currentColor" opacity="0.1" />
      
      {/* Data lines */}
      <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 14H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Transmission indicators */}
      <circle cx="18" cy="10" r="1" fill="currentColor" />
      <circle cx="18" cy="12" r="1" fill="currentColor" />
      <circle cx="18" cy="14" r="1" fill="currentColor" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

// Cyberpunk Website Icon - Digital Globe
export function CyberpunkWebsiteIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Globe base */}
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      
      {/* Latitude lines */}
      <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 8C8 8 16 8 20 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 16C8 16 16 16 20 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Longitude lines */}
      <path d="M12 2C12 6 12 18 12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 2C8 6 8 18 8 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 2C16 6 16 18 16 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Digital nodes */}
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="16" cy="16" r="1" fill="currentColor" />
      
      {/* Connection lines */}
      <path d="M8 8L16 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M16 8L8 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

// Cyberpunk Twitter/X Icon - Digital Signal
export function CyberpunkTwitterIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Signal waves */}
      <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 8H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 16H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* X symbol */}
      <path d="M8 8L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 8L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Digital indicators */}
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
      <circle cx="18" cy="18" r="1" fill="currentColor" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

// Cyberpunk Instagram Icon - Digital Camera
export function CyberpunkInstagramIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Camera body */}
      <rect x="6" y="8" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
      
      {/* Camera lens */}
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
      
      {/* Viewfinder */}
      <rect x="8" y="6" width="8" height="2" rx="1" stroke="currentColor" strokeWidth="2" />
      
      {/* Flash */}
      <rect x="10" y="4" width="4" height="2" rx="1" fill="currentColor" opacity="0.5" />
      
      {/* Digital elements */}
      <path d="M9 10H15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M9 14H15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.05" />
    </svg>
  );
}
