'use client';

import { motion } from 'framer-motion';

export function MessageTransmission() {
  return (
    <motion.div
      className="glass rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h3 className="text-lg font-bold text-cyberpunk-neon mb-4">
        Transmitting Message...
      </h3>
      
      <div className="space-y-4">
        {/* Transmission Steps */}
        <div className="space-y-3">
          {[
            { step: 'Encrypting message', progress: 100 },
            { step: 'Establishing secure connection', progress: 100 },
            { step: 'Transmitting data packets', progress: 75 },
            { step: 'Verifying delivery', progress: 25 },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neural-300">{item.step}</span>
                <span className="text-xs text-cyberpunk-neon">{item.progress}%</span>
              </div>
              <div className="w-full bg-neural-800 rounded-full h-2">
                <motion.div
                  className="h-2 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-purple rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Transmission Animation */}
        <div className="flex items-center justify-center py-4">
          <div className="relative">
            <motion.div
              className="w-16 h-16 border-4 border-cyberpunk-neon rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyberpunk-purple rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Status */}
        <div className="text-center">
          <p className="text-sm text-neural-400">
            Your message is being securely transmitted through the neural network...
          </p>
        </div>
      </div>
    </motion.div>
  );
}
