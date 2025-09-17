'use client';

import { motion } from 'framer-motion';

interface ProjectImageProps {
  className?: string;
}

export function CafeConnectImage({ className = "" }: ProjectImageProps) {
  return (
    <div className={`relative w-full h-full bg-bg-dark rounded-lg overflow-hidden ${className}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Main Frame */}
      <div className="absolute inset-4 bg-neural-900 rounded-lg border-4 border-purple overflow-hidden">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-lg border-4 border-transparent bg-gradient-to-br from-purple via-cyan to-purple p-1">
          <div className="w-full h-full bg-neural-900 rounded-lg" />
        </div>
        
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
                filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))',
                // Glitch effect simulation
                background: 'linear-gradient(90deg, #00ffff 0%, #ff00ff 50%, #00ffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              CaféConnect
            </motion.h3>
            <motion.h4
              className="font-terminal text-lg md:text-xl text-cyan"
              style={{
                textShadow: '0 0 15px rgba(0, 255, 255, 0.6)'
              }}
            >
              App
            </motion.h4>
          </motion.div>
          
          {/* Bottom Wave Pattern */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-purple to-cyan"
                style={{ height: `${Math.random() * 20 + 10}px` }}
                animate={{ height: [`${Math.random() * 20 + 10}px`, `${Math.random() * 20 + 10}px`] }}
                transition={{ duration: 1 + Math.random(), repeat: Infinity, repeatType: "reverse" }}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Frame Glow */}
        <div className="absolute inset-0 rounded-lg border-4 border-transparent bg-gradient-to-br from-purple via-cyan to-purple p-1 shadow-[0_0_30px_rgba(128,0,255,0.3)]">
          <div className="w-full h-full bg-neural-900 rounded-lg" />
        </div>
      </div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-cyan rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-2 left-2 w-1 h-1 bg-purple rounded-full"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  );
}
