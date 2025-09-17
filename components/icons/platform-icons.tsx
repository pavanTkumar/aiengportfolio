'use client';

import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// Android Icon - Cyberpunk style
export function AndroidIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Android robot head */}
      <path
        d="M6 18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V12C18 10.9 17.1 10 16 10H8C6.9 10 6 10.9 6 12V18Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Android antennae */}
      <path d="M8 8L7 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 8L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Eyes */}
      <circle cx="10" cy="14" r="1.5" fill="currentColor" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      
      {/* Mouth */}
      <path d="M10 16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Digital elements */}
      <path d="M4 12H6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M18 12H20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M4 16H6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M18 16H20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      
      {/* Circuit patterns */}
      <circle cx="5" cy="12" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="19" cy="12" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="5" cy="16" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="19" cy="16" r="0.5" fill="currentColor" opacity="0.7" />
      
      {/* Glow effect */}
      <circle cx="12" cy="15" r="8" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

// iOS Icon - Cyberpunk style
export function IOSIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Apple logo shape */}
      <path
        d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Digital elements */}
      <path d="M6 6H8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M16 6H18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M6 18H8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M16 18H18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      
      {/* Circuit nodes */}
      <circle cx="7" cy="6" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="17" cy="6" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="7" cy="18" r="0.5" fill="currentColor" opacity="0.7" />
      <circle cx="17" cy="18" r="0.5" fill="currentColor" opacity="0.7" />
      
      {/* Glow effect */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.05" />
    </svg>
  );
}
