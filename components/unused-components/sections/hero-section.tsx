'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { NeuralNetwork3D } from '@/components/3d/neural-network-3d';
import { ParticleField } from '@/components/3d/particle-field';
import { CodeGeneration } from '@/components/code-generation';
import { ScrollIndicator } from '@/components/scroll-indicator';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSpecialty, setCurrentSpecialty] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const controls = useAnimation();

  const specialties = [
    'RAG Pipeline Architect',
    'Vector Database Specialist', 
    'LLM Engineer',
    'Machine Learning Expert',
    'AI Systems Designer'
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpecialty((prev) => (prev + 1) % specialties.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const specialtyVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects - Proper Layering */}
      <div className="absolute inset-0 neural-bg opacity-40" />
      <div className="absolute inset-0 cyberpunk-grid opacity-10" />
      
      {/* 3D Scene - Background Layer */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-neural-900" />}>
          <Canvas
            camera={{ position: [0, 0, 10], fov: 75 }}
            style={{ background: 'transparent' }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
          >
            <NeuralNetwork3D mousePosition={mousePosition} />
            <ParticleField />
          </Canvas>
        </Suspense>
      </div>

      {/* Content - Foreground Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-12"
        >
          {/* Title Section with Proper Spacing */}
          <div className="space-y-6">
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold font-display leading-tight"
              variants={titleVariants}
            >
              <span className="cyberpunk-text">Pavan</span>
              <br />
              <span className="neon-text">Tejavath</span>
            </motion.h1>
            
            <motion.div
              className="text-2xl md:text-3xl lg:text-4xl text-neural-300 font-light h-16 flex items-center justify-center"
              variants={itemVariants}
            >
              <motion.span
                key={currentSpecialty}
                variants={specialtyVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="inline-block"
              >
                {specialties[currentSpecialty]}
              </motion.span>
            </motion.div>
          </div>

          {/* Description with Better Typography */}
          <motion.p
            className="text-lg md:text-xl text-neural-400 max-w-3xl mx-auto leading-relaxed px-4"
            variants={itemVariants}
          >
            Building the future of AI with cutting-edge LLMs, RAG pipelines, and vector databases. 
            Transforming ideas into intelligent systems that understand, learn, and adapt.
          </motion.p>

          {/* CTA Buttons with Enhanced Spacing */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4"
            variants={itemVariants}
          >
            <motion.button
              className="px-10 py-4 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-purple text-neural-900 font-bold rounded-lg hover:shadow-cyberpunk-glow transition-all duration-300 interactive"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </motion.button>
            
            <motion.button
              className="px-10 py-4 glass text-cyberpunk-neon font-bold rounded-lg hover:bg-neural-800/50 transition-all duration-300 interactive"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Stats Grid with Better Spacing */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-20"
            variants={containerVariants}
          >
            {[
              { number: '3+', label: 'Years Experience' },
              { number: '50+', label: 'AI Projects' },
              { number: '10+', label: 'Technologies' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={itemVariants}
              >
                <div className="text-3xl md:text-4xl font-bold cyberpunk-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-neural-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Code Generation Animation - Properly Positioned */}
      <div className="absolute bottom-24 left-4 right-4 z-10">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <CodeGeneration />
        </motion.div>
      </div>

      {/* Scroll Indicator - Enhanced */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <ScrollIndicator />
        </motion.div>
      </div>
    </section>
  );
}
