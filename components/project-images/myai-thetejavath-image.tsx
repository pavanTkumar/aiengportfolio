'use client';

import { motion } from 'framer-motion';

interface ProjectImageProps {
  className?: string;
}

export function MyAIThetejavathImage({ className = "" }: ProjectImageProps) {
  return (
    <div className={`relative w-full h-full bg-bg-dark rounded-lg overflow-hidden ${className}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neural-800 to-neural-900" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
        {/* Logo Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-cyan to-terminal-green rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-bg-dark">AI</span>
          </div>
        </motion.div>
        
        {/* Main URL */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-terminal text-xl md:text-2xl font-bold text-white mb-2 text-center"
        >
          myai.thetejavath.com
        </motion.h3>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-text-light text-sm text-center mb-8"
        >
          Your dedicated platform for seamless AI workflow integration.
        </motion.p>
        
        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-2xl"
        >
          {/* RAG Card */}
          <div className="bg-neural-800 border border-gray-600 rounded-lg p-3">
            <h4 className="font-terminal text-sm font-bold text-white mb-2">RAG</h4>
            <p className="text-xs text-text-light">
              Leverage powerful Retrieval-Augmented Generation for context-aware AI responses.
            </p>
          </div>
          
          {/* Agent Workflows Card */}
          <div className="bg-neural-800 border border-gray-600 rounded-lg p-3">
            <h4 className="font-terminal text-sm font-bold text-white mb-2">Agent Workflows</h4>
            <p className="text-xs text-text-light">
              Orchestrate complex tasks with intelligent, autonomous AI agents.
            </p>
          </div>
          
          {/* Scalability Card */}
          <div className="bg-neural-800 border border-gray-600 rounded-lg p-3">
            <h4 className="font-terminal text-sm font-bold text-white mb-2">Scalability</h4>
            <p className="text-xs text-text-light">
              Built for performance, handling demanding AI workloads with ease.
            </p>
          </div>
        </motion.div>
        
        {/* Status Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-text-light font-mono">
            [Initializing AI services... Please standby.]
          </p>
        </motion.div>
      </div>
      
      {/* Subtle Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-terminal-green/5" />
    </div>
  );
}
