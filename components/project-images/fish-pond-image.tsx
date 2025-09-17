'use client';

import { motion } from 'framer-motion';

interface ProjectImageProps {
  className?: string;
}

export function FishPondImage({ className = "" }: ProjectImageProps) {
  return (
    <div className={`relative w-full h-full bg-bg-dark rounded-lg overflow-hidden ${className}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Main Frame */}
      <div className="absolute inset-4 bg-neural-900 rounded-lg border-4 border-cyan overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
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
              className="font-terminal text-2xl md:text-3xl font-bold text-magenta mb-4"
              style={{
                textShadow: '0 0 20px rgba(255, 0, 255, 0.8)',
                filter: 'drop-shadow(0 0 10px rgba(255, 0, 255, 0.5))'
              }}
            >
              Fish Pond App
            </motion.h3>
            
            {/* Binary Code */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-mono text-xs text-magenta/70 space-y-1"
            >
              <div>11010110010110001011101001011</div>
              <div>00101101011011</div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Frame Glow */}
        <div className="absolute inset-0 rounded-lg border-4 border-cyan shadow-[0_0_30px_rgba(0,255,255,0.5)]" />
      </div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-cyan rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-2 left-2 w-1 h-1 bg-magenta rounded-full"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  );
}
