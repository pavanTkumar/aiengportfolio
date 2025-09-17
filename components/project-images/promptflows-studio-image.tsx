'use client';

import { motion } from 'framer-motion';

interface ProjectImageProps {
  className?: string;
}

export function PromptFlowsStudioImage({ className = "" }: ProjectImageProps) {
  return (
    <div className={`relative w-full h-full bg-bg-dark rounded-lg overflow-hidden ${className}`}>
      {/* Main Panel */}
      <div className="absolute inset-4 bg-neural-900 rounded-lg border border-cyan/30 overflow-hidden">
        {/* Scanlines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
              style={{ top: `${i * 5}%` }}
            />
          ))}
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-purple/5" />
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
              PROMPTFLOWS
            </motion.h3>
            <motion.h4
              className="font-terminal text-xl md:text-2xl font-bold text-cyan"
              style={{
                textShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
                filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
              }}
            >
              STUDIO
            </motion.h4>
          </motion.div>
        </div>
        
        {/* Border Glow */}
        <div className="absolute inset-0 rounded-lg border border-cyan/50 shadow-[0_0_30px_rgba(0,255,255,0.3)]" />
      </div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-cyan rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-2 left-2 w-1 h-1 bg-purple rounded-full"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  );
}
