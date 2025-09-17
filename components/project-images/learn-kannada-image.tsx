'use client';

import { motion } from 'framer-motion';

interface ProjectImageProps {
  className?: string;
}

export function LearnKannadaImage({ className = "" }: ProjectImageProps) {
  // Generate binary code pattern
  const generateBinaryCode = () => {
    const binary = ['0', '1'];
    return Array.from({ length: 50 }, () => binary[Math.floor(Math.random() * binary.length)]);
  };

  const binaryCode = generateBinaryCode();

  return (
    <div className={`relative w-full h-full bg-bg-dark rounded-lg overflow-hidden ${className}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Main Card */}
      <div className="absolute inset-4 bg-neural-900 rounded-lg border border-cyan/50 overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-purple/10" />
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.h3
              className="font-terminal text-2xl md:text-3xl font-bold text-cyan mb-2"
              style={{
                textShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
                filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
              }}
            >
              Learn Kannada
            </motion.h3>
            <motion.h4
              className="font-terminal text-lg md:text-xl text-text-light"
            >
              by Suviko
            </motion.h4>
          </motion.div>
        </div>
        
        {/* Border Glow */}
        <div className="absolute inset-0 rounded-lg border border-cyan/50 shadow-[0_0_30px_rgba(0,255,255,0.3)]" />
      </div>
      
      {/* Binary Code Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {binaryCode.map((digit, i) => (
          <motion.span
            key={i}
            className="absolute text-xs font-mono opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: ['#00ff00', '#00ffff', '#ff00ff', '#ffffff'][Math.floor(Math.random() * 4)]
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {digit}
          </motion.span>
        ))}
      </div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-cyan rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-2 left-2 w-1 h-1 bg-green-400 rounded-full"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  );
}
