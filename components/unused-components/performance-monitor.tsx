'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPerformanceMetrics, detectDeviceCapabilities } from '@/lib/utils';

interface PerformanceData {
  fps: number;
  memory: number;
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

export function PerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [capabilities, setCapabilities] = useState<any>(null);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    // Toggle visibility with Ctrl+Shift+P
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    // FPS calculation
    const calculateFPS = () => {
      frameCountRef.current++;
      const currentTime = performance.now();
      
      if (currentTime - lastTimeRef.current >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / (currentTime - lastTimeRef.current));
        setPerformanceData(prev => prev ? { ...prev, fps } : null);
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }
      
      requestAnimationFrame(calculateFPS);
    };

    // Initial data collection
    const collectData = () => {
      const perfData = getPerformanceMetrics();
      const deviceCapabilities = detectDeviceCapabilities();
      
      setPerformanceData(perfData);
      setCapabilities(deviceCapabilities);
    };

    collectData();
    calculateFPS();

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed bottom-4 right-4 z-50 glass-strong rounded-lg p-4 min-w-[300px]"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-cyberpunk-neon">Performance Monitor</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-neural-400 hover:text-cyberpunk-neon transition-colors"
            >
              ✕
            </button>
          </div>

          {performanceData && (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neural-400">FPS:</span>
                <span className={`font-mono ${performanceData.fps >= 60 ? 'text-cyberpunk-green' : performanceData.fps >= 30 ? 'text-cyberpunk-orange' : 'text-cyberpunk-pink'}`}>
                  {performanceData.fps}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-neural-400">Memory:</span>
                <span className="font-mono text-cyberpunk-neon">
                  {performanceData.memory.toFixed(1)} MB
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-neural-400">Load Time:</span>
                <span className="font-mono text-cyberpunk-neon">
                  {performanceData.loadTime.toFixed(0)} ms
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-neural-400">Render Time:</span>
                <span className="font-mono text-cyberpunk-neon">
                  {performanceData.renderTime.toFixed(0)} ms
                </span>
              </div>
            </div>
          )}

          {capabilities && (
            <div className="space-y-2 text-xs">
              <div className="border-t border-neural-700 pt-2">
                <h4 className="text-neural-400 font-semibold mb-2">Device Capabilities</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(capabilities).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-neural-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className={`font-mono ${value ? 'text-cyberpunk-green' : 'text-cyberpunk-pink'}`}>
                        {value ? '✓' : '✗'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-neural-500 pt-2 border-t border-neural-700">
            Press Ctrl+Shift+P to toggle
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
