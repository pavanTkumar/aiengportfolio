'use client';

import { motion } from 'framer-motion';

interface ProjectImageProps {
  className?: string;
}

export function RecruitAIImage({ className = "" }: ProjectImageProps) {
  return (
    <div className={`relative w-full h-full bg-bg-dark rounded-lg overflow-hidden ${className}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-bg-dark to-teal-900/20" />
      
      {/* Main Card */}
      <div className="absolute inset-4 bg-neural-900 rounded-lg border border-cyan/30 overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-magenta/5" />
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-6"
          >
            <motion.h3
              className="font-terminal text-2xl md:text-3xl font-bold mb-4"
              style={{
                background: 'linear-gradient(90deg, #00ffff 0%, #ff00ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
                filter: 'drop-shadow(0 0 15px rgba(255, 0, 255, 0.5))'
              }}
            >
              RecruitAI
            </motion.h3>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4"
          >
            <motion.button
              className="px-4 py-2 bg-transparent border border-cyan rounded-lg text-cyan text-sm font-mono hover:bg-cyan/10 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)'
              }}
            >
              Explore Jobs
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-transparent border border-magenta rounded-lg text-magenta text-sm font-mono hover:bg-magenta/10 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 0 15px rgba(255, 0, 255, 0.3)'
              }}
            >
              Post a Job
            </motion.button>
          </motion.div>
        </div>
        
        {/* Border Glow */}
        <div className="absolute inset-0 rounded-lg border border-cyan/50 shadow-[0_0_30px_rgba(0,255,255,0.2)]" />
      </div>
      
      {/* Icon Placeholders */}
      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-6 h-6 border border-gray-400 rounded flex items-center justify-center"
          >
            <span className="text-xs text-gray-400">Icon</span>
          </div>
        ))}
      </motion.div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-cyan rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-2 left-2 w-1 h-1 bg-magenta rounded-full"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  );
}
