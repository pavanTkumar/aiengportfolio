'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { createParticleSystem, updateParticles, getRandomFloat } from '@/lib/utils';

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

export function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    particlesRef.current = createParticleSystem({
      count: 100,
      size: 2,
      speed: 0.5,
      color: '#00ffff',
      opacity: 0.6,
      shape: 'circle',
      behavior: 'float',
    });

    // Animation loop
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particles
      updateParticles(particlesRef.current, deltaTime);

      // Draw particles
      particlesRef.current.forEach(particle => {
        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.opacity * particle.life;
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Remove dead particles and add new ones
      particlesRef.current = particlesRef.current.filter(particle => particle.life > 0);
      
      while (particlesRef.current.length < 100) {
        particlesRef.current.push({
          id: Math.random().toString(36).substr(2, 9),
          x: getRandomFloat(0, canvas.width),
          y: getRandomFloat(0, canvas.height),
          vx: getRandomFloat(-0.5, 0.5),
          vy: getRandomFloat(-0.5, 0.5),
          size: getRandomFloat(1, 3),
          color: '#00ffff',
          opacity: 0.6,
          life: 1,
          maxLife: 1,
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
}
