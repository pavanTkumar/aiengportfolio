'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CyberpunkName from './cyberpunk-name';

interface LoadingScreenProps {
  onComplete: () => void;
}

const systemLogs = [
  "Initializing neural network architecture...",
  "Loading vector embedding models...",
  "System initialization complete."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    if (currentLogIndex >= systemLogs.length) {
      setShowGlitch(true);
      setTimeout(() => {
        onComplete();
      }, 300);
      return;
    }

    if (isTyping) {
      const currentLog = systemLogs[currentLogIndex];
      if (currentText.length < currentLog.length) {
        const timer = setTimeout(() => {
          setCurrentText(currentLog.slice(0, currentText.length + 1));
        }, 30); // Even faster typing
        return () => clearTimeout(timer);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setCurrentLogIndex(prev => prev + 1);
          setCurrentText('');
          setIsTyping(true);
        }, 100); // Very short pause between logs
      }
    }
  }, [currentText, currentLogIndex, isTyping, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ backgroundColor: '#0a0a1a' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30"
          animate={{ y: [0, 1000, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Glitch Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <CyberpunkName size="xl" variant="intense" />
          </motion.div>

          {/* System Logs */}
          <div className="font-mono text-green-400 text-lg md:text-xl space-y-2 max-w-2xl">
            {systemLogs.slice(0, currentLogIndex).map((log, index) => (
              <motion.div
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-green-500 mr-2">$</span>
                <span className="text-green-400">{log}</span>
                <motion.span
                  className="ml-2 text-green-500"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ✓
                </motion.span>
              </motion.div>
            ))}
            
            {currentLogIndex < systemLogs.length && (
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-green-500 mr-2">$</span>
                <span className="text-green-400">{currentText}</span>
                <motion.span
                  className="ml-1 text-green-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              </motion.div>
            )}
          </div>

          {/* Progress Bar */}
          <motion.div
            className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </motion.div>
          
          {/* Progress Percentage */}
          <motion.div
            className="mt-2 font-mono text-green-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {Math.min(Math.round((currentLogIndex / systemLogs.length) * 100), 100)}% Complete
          </motion.div>
        </div>

        {/* Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}