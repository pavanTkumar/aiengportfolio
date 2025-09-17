'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CyberpunkName from './cyberpunk-name';

export default function CyberpunkHero() {
  const [typedText, setTypedText] = useState('');
  const [currentSpecialty, setCurrentSpecialty] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const specialties = [
    { text: 'LLMs', color: '#00ff00' },
    { text: 'RAG', color: '#00ffff' },
    { text: 'Vector Databases', color: '#ff00ff' },
  ];

  const mainText = 'AI ENGINEER';
  const subText = 'Specializing in';

  // Typewriter effect for main headline
  useEffect(() => {
    if (typedText.length < mainText.length) {
      const timer = setTimeout(() => {
        setTypedText(mainText.slice(0, typedText.length + 1));
      }, 150);
      return () => clearTimeout(timer);
    } else {
      // Start glitch effect after typing is complete
      setTimeout(() => setShowGlitch(true), 1000);
    }
  }, [typedText, mainText]);

  // Rotate specialties
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSpecialty((prev) => (prev + 1) % specialties.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [specialties.length]);

  // Generate particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    color: Math.random() > 0.5 ? '#00ff00' : '#00ffff',
    delay: Math.random() * 5,
  }));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0a0a1a' }}
    >
      {/* Parallax Background Layers */}
      <motion.div
        className="absolute inset-0"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "25%"]) }}
      >
        <div className="w-full h-full bg-gradient-to-br from-green-900/10 via-transparent to-cyan-900/10" />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "35%"]) }}
      >
        <div className="w-full h-full bg-gradient-to-tl from-magenta-900/10 via-transparent to-green-900/10" />
      </motion.div>

      {/* Particle System */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Scanline Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          y: [0, typeof window !== 'undefined' ? window.innerHeight : 1000, 0] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
        style={{ opacity }}
      >
        {/* Main Headline */}
        <div className="mb-8">
          {/* Cyberpunk Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <CyberpunkName size="large" variant="intense" />
          </motion.div>
          
          <motion.h1
            className={`font-terminal text-6xl md:text-8xl lg:text-9xl font-bold mb-4 ${
              showGlitch ? 'glitch-text' : ''
            }`}
            data-text={typedText}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {typedText}
            {typedText.length < mainText.length && (
              <motion.span
                className="text-green-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="font-body text-2xl md:text-3xl text-gray-300 mb-4">
            {subText}
          </p>
          <motion.span
            key={currentSpecialty}
            className="font-terminal text-3xl md:text-4xl font-bold"
            style={{ color: specialties[currentSpecialty].color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {specialties[currentSpecialty].text}
          </motion.span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            className="cyberpunk-btn group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10">View Projects</span>
            <motion.div
              className="absolute inset-0 bg-green-400"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.button>

          <motion.button
            className="cyberpunk-btn group border-cyan-400 text-cyan-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10">Contact Me</span>
            <motion.div
              className="absolute inset-0 bg-cyan-400"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.button>
        </motion.div>

        {/* Terminal-style Info */}
        <motion.div
          className="mt-16 font-terminal text-green-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <span>$</span>
            <span>system_status: online</span>
            <motion.span
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-green-400 rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

