'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/theme-context';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-12 h-6 bg-gray-800 border border-gray-600 rounded-full transition-all duration-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-400"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Toggle Track */}
      <div className="absolute inset-0 rounded-full transition-colors duration-300">
        {theme === 'cyberpunk' ? (
          <div className="absolute inset-0 bg-gradient-to-r from-terminal-green/20 to-cyan/20 rounded-full" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-500 rounded-full" />
        )}
      </div>

      {/* Toggle Handle */}
      <motion.div
        className="relative w-4 h-4 rounded-full shadow-lg"
        animate={{
          x: theme === 'cyberpunk' ? -8 : 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {theme === 'cyberpunk' ? (
          <div className="w-full h-full bg-gradient-to-br from-terminal-green to-cyan rounded-full shadow-lg border border-terminal-green/50" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-white to-gray-300 rounded-full shadow-lg border border-gray-400" />
        )}
      </motion.div>

      {/* Theme Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
        {/* Cyberpunk Icon */}
        <motion.div
          className="text-[8px]"
          animate={{
            opacity: theme === 'cyberpunk' ? 1 : 0.3,
            scale: theme === 'cyberpunk' ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'cyberpunk' ? (
            <span className="text-terminal-green">◉</span>
          ) : (
            <span className="text-gray-500">◉</span>
          )}
        </motion.div>

        {/* Monochrome Icon */}
        <motion.div
          className="text-[8px]"
          animate={{
            opacity: theme === 'monochrome' ? 1 : 0.3,
            scale: theme === 'monochrome' ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'monochrome' ? (
            <span className="text-white">◯</span>
          ) : (
            <span className="text-gray-500">◯</span>
          )}
        </motion.div>
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        animate={{
          opacity: theme === 'cyberpunk' ? 0.2 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-terminal-green rounded-full blur-sm" />
      </motion.div>
    </motion.button>
  );
}
