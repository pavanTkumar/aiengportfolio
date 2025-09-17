'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';

// Advanced scroll-based animation variants
export const scrollVariants = {
  // Cinematic parallax with depth and blur
  parallax: {
    hidden: { 
      y: 150, 
      opacity: 0,
      scale: 0.9,
      filter: "blur(20px)"
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 25,
        mass: 1.2,
        duration: 1.2
      }
    }
  },

  // Cinematic staggered reveal with 3D effects
  staggeredReveal: {
    hidden: { 
      y: 80, 
      opacity: 0, 
      scale: 0.7,
      rotateX: -15,
      filter: "brightness(0.3)"
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      filter: "brightness(1)",
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.9,
        duration: 1
      }
    })
  },

  // Advanced glitch reveal with cyberpunk effects
  glitchReveal: {
    hidden: { 
      opacity: 0,
      x: -50,
      y: 20,
      filter: "blur(15px) brightness(0) contrast(0)",
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px) brightness(1) contrast(1)",
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        filter: { duration: 0.8 },
        scale: { type: "spring", stiffness: 120, damping: 20 }
      }
    }
  },

  // Morphing scale with 3D rotation and hue shift
  morphScale: {
    hidden: { 
      scale: 0.2, 
      rotate: -270, 
      rotateX: -90,
      opacity: 0,
      borderRadius: "50%",
      filter: "hue-rotate(180deg)"
    },
    visible: {
      scale: 1,
      rotate: 0,
      rotateX: 0,
      opacity: 1,
      borderRadius: "12px",
      filter: "hue-rotate(0deg)",
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        scale: { type: "spring", stiffness: 80, damping: 20 },
        rotate: { duration: 1, ease: "easeOut" },
        rotateX: { duration: 0.8, ease: "easeOut" },
        filter: { duration: 1.2 }
      }
    }
  },

  // Slide in from different directions
  slideInLeft: {
    hidden: { x: -100, opacity: 0, rotateY: -90 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  },

  slideInRight: {
    hidden: { x: 100, opacity: 0, rotateY: 90 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  },

  // Floating animation with subtle rotation
  float: {
    hidden: { y: 30, opacity: 0, rotate: -5 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        y: {
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      }
    }
  },

  // Matrix-style reveal with cyberpunk effects
  matrixReveal: {
    hidden: { 
      opacity: 0,
      y: 40,
      scale: 0.8,
      filter: "brightness(0) contrast(0) blur(20px)",
      rotateX: -30
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "brightness(1) contrast(1) blur(0px)",
      rotateX: 0,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        filter: { duration: 1 },
        scale: { type: "spring", stiffness: 100, damping: 20 },
        rotateX: { duration: 0.8, ease: "easeOut" }
      }
    }
  },

  // New cinematic effects
  cinematicZoom: {
    hidden: { 
      scale: 0.3, 
      opacity: 0,
      filter: "blur(30px) brightness(0)",
      rotateZ: -180
    },
    visible: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px) brightness(1)",
      rotateZ: 0,
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        scale: { type: "spring", stiffness: 60, damping: 25 },
        filter: { duration: 1.2 }
      }
    }
  },

  // Cyberpunk reveal with scanline effect
  cyberpunkReveal: {
    hidden: { 
      opacity: 0,
      y: 100,
      scale: 0.5,
      filter: "brightness(0) contrast(0) saturate(0)",
      clipPath: "inset(100% 0 0 0)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "brightness(1) contrast(1) saturate(1)",
      clipPath: "inset(0% 0 0 0)",
      transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        clipPath: { duration: 1.2, ease: "easeInOut" },
        filter: { duration: 1.4 }
      }
    }
  }
};

// Hook for advanced scroll-based animations
export function useAdvancedScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.3
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Spring-based transforms for smooth motion
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]), {
    stiffness: 100,
    damping: 30
  });

  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 360]), {
    stiffness: 50,
    damping: 30
  });

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]), {
    stiffness: 100,
    damping: 30
  });

  return {
    ref,
    isInView,
    scrollYProgress,
    y,
    scale,
    rotate,
    opacity
  };
}

// Component for parallax scrolling effects
export function ParallaxElement({ 
  children, 
  speed = 0.5, 
  direction = 'up' 
}: { 
  children: React.ReactNode; 
  speed?: number; 
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const x = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  const transform = direction === 'up' || direction === 'down' ? y : x;

  return (
    <motion.div
      ref={ref}
      style={{ y: direction === 'up' || direction === 'down' ? transform : 0, x: direction === 'left' || direction === 'right' ? transform : 0 }}
    >
      {children}
    </motion.div>
  );
}

// Component for scroll-triggered reveal animations
export function ScrollReveal({ 
  children, 
  variant = 'parallax',
  delay = 0,
  custom = 0,
  amount = 0.2,
  margin = "-50px",
  revealOnMount = false
}: { 
  children: React.ReactNode; 
  variant?: keyof typeof scrollVariants;
  delay?: number;
  custom?: number;
  amount?: number;
  margin?: string;
  revealOnMount?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const observedInView = useInView(ref, { 
    once: true, 
    margin,
    amount
  });
  // Allow a deliberate reveal on initial mount to avoid rare IO quirks without changing visuals
  const isInView = revealOnMount ? true : observedInView;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scrollVariants[variant]}
      custom={custom}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// Component for magnetic hover effects
export function MagneticElement({ 
  children, 
  strength = 0.3 
}: { 
  children: React.ReactNode; 
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.1s ease-out' }}
    >
      {children}
    </div>
  );
}
