'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CyberpunkNameProps {
  size?: 'small' | 'medium' | 'large' | 'xl' | 'xs';
  showGlitch?: boolean;
  className?: string;
  variant?: 'default' | 'subtle' | 'intense';
}

export default function CyberpunkName({ 
  size = 'medium', 
  showGlitch = true, 
  className = '',
  variant = 'default'
}: CyberpunkNameProps) {
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });

  // Size configurations
  const sizeConfig = {
    xs: {
      fontSize: 'text-sm',
      letterSpacing: 'tracking-normal',
      glowIntensity: '0.2'
    },
    small: {
      fontSize: 'text-2xl md:text-3xl',
      letterSpacing: 'tracking-wide',
      glowIntensity: '0.3'
    },
    medium: {
      fontSize: 'text-4xl md:text-5xl',
      letterSpacing: 'tracking-wider',
      glowIntensity: '0.5'
    },
    large: {
      fontSize: 'text-6xl md:text-7xl',
      letterSpacing: 'tracking-widest',
      glowIntensity: '0.7'
    },
    xl: {
      fontSize: 'text-8xl md:text-9xl',
      letterSpacing: 'tracking-widest',
      glowIntensity: '0.8'
    }
  };

  // Variant configurations
  const variantConfig = {
    default: {
      color: 'var(--terminal-green)',
      shadowColor1: 'rgba(0, 255, 255, 0.75)',
      shadowColor2: 'rgba(255, 0, 255, 0.75)',
      glitchIntensity: 1
    },
    subtle: {
      color: 'var(--terminal-green)',
      shadowColor1: 'rgba(0, 255, 255, 0.4)',
      shadowColor2: 'rgba(255, 0, 255, 0.4)',
      glitchIntensity: 0.5
    },
    intense: {
      color: 'var(--terminal-green)',
      shadowColor1: 'rgba(0, 255, 255, 1)',
      shadowColor2: 'rgba(255, 0, 255, 1)',
      glitchIntensity: 1.5
    }
  };

  const config = sizeConfig[size];
  const variantStyle = variantConfig[variant];

  // Random glitch effect
  useEffect(() => {
    if (!showGlitch) return;

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to glitch
        setGlitchActive(true);
        setGlitchOffset({
          x: (Math.random() - 0.5) * 4 * variantStyle.glitchIntensity,
          y: (Math.random() - 0.5) * 2 * variantStyle.glitchIntensity
        });
        
        setTimeout(() => {
          setGlitchActive(false);
          setGlitchOffset({ x: 0, y: 0 });
        }, 100 + Math.random() * 200);
      }
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(glitchInterval);
  }, [showGlitch, variantStyle.glitchIntensity]);

  const nameText = 'PAVAN TEJAVATH';

  return (
    <motion.span
      className={`
        font-terminal font-bold inline-block
        ${config.fontSize}
        ${config.letterSpacing}
        ${className}
        ${glitchActive ? 'cyberpunk-name-glitch' : ''}
      `}
      style={{
        color: variantStyle.color,
        textShadow: `
          0.05em 0 0 ${variantStyle.shadowColor1}, 
          -0.025em -0.05em 0 ${variantStyle.shadowColor2},
          0 0 20px rgba(0, 255, 0, ${config.glowIntensity})
        `,
        transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
        transition: glitchActive ? 'none' : 'transform 0.1s ease-out'
      }}
      data-text={nameText}
      animate={glitchActive ? {
        textShadow: [
          `0.05em 0 0 ${variantStyle.shadowColor1}, -0.025em -0.05em 0 ${variantStyle.shadowColor2}`,
          `-0.05em 0 0 ${variantStyle.shadowColor1}, 0.025em 0.05em 0 ${variantStyle.shadowColor2}`,
          `0.05em 0 0 ${variantStyle.shadowColor1}, -0.025em -0.05em 0 ${variantStyle.shadowColor2}`
        ]
      } : {}}
      transition={{ duration: 0.1, repeat: glitchActive ? 3 : 0 }}
    >
      {nameText}
      
      {/* Glitch overlay effects */}
      {glitchActive && (
        <>
          <motion.span
            className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
            style={{
              color: 'var(--cyan)',
              textShadow: '-1px 0 var(--cyan)',
              clipPath: 'inset(45% 0 56% 0)',
              transform: 'translateX(2px)'
            }}
            animate={{
              opacity: [0, 1, 0],
              transform: ['translateX(2px)', 'translateX(4px)', 'translateX(2px)']
            }}
            transition={{ duration: 0.1, repeat: 3 }}
          >
            {nameText}
          </motion.span>
          
          <motion.span
            className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
            style={{
              color: 'var(--magenta)',
              textShadow: '-1px 0 var(--magenta)',
              clipPath: 'inset(2% 0 60% 0)',
              transform: 'translateX(-2px)'
            }}
            animate={{
              opacity: [0, 1, 0],
              transform: ['translateX(-2px)', 'translateX(-4px)', 'translateX(-2px)']
            }}
            transition={{ duration: 0.1, repeat: 3, delay: 0.05 }}
          >
            {nameText}
          </motion.span>
        </>
      )}
    </motion.span>
  );
}
