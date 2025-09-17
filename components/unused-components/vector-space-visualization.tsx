'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { VectorSpace3D } from '@/components/3d/vector-space-3d';

interface VectorSpaceVisualizationProps {
  isRunning: boolean;
}

const sampleTexts = [
  'Machine learning algorithms',
  'Deep learning neural networks',
  'Natural language processing',
  'Computer vision systems',
  'Artificial intelligence research',
  'Data science methodologies',
  'Statistical analysis techniques',
  'Predictive modeling approaches',
];

export function VectorSpaceVisualization({ isRunning }: VectorSpaceVisualizationProps) {
  const [selectedText, setSelectedText] = useState('');
  const [similarTexts, setSimilarTexts] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [show3D, setShow3D] = useState(false);

  const handleTextSelect = (text: string) => {
    setSelectedText(text);
    setIsCalculating(true);
    
    // Simulate similarity calculation
    setTimeout(() => {
      const similarities = sampleTexts
        .filter(t => t !== text)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setSimilarTexts(similarities);
      setIsCalculating(false);
    }, 1500);
  };

  const calculateSimilarity = (text1: string, text2: string) => {
    // Simple similarity calculation based on common words
    const words1 = text1.toLowerCase().split(' ');
    const words2 = text2.toLowerCase().split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return (commonWords.length / Math.max(words1.length, words2.length)) * 100;
  };

  return (
    <div className="space-y-8">
      {/* Text Selection */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-bold text-cyberpunk-neon mb-4">
          Vector Space Visualization
        </h3>
        <p className="text-neural-400 mb-6">
          Select a text to see its position in the vector space and find similar texts.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {sampleTexts.map((text, index) => (
            <motion.button
              key={index}
              onClick={() => handleTextSelect(text)}
              className={`p-4 rounded-lg text-left transition-all duration-300 ${
                selectedText === text
                  ? 'bg-cyberpunk-neon text-neural-900 neural-glow'
                  : 'bg-neural-800 hover:bg-neural-700 text-neural-300'
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📝</span>
                <span className="font-medium">{text}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Visualization Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShow3D(!show3D)}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            show3D
              ? 'bg-cyberpunk-purple text-neural-100'
              : 'glass text-neural-300 hover:text-cyberpunk-neon hover:bg-neural-800/50'
          }`}
        >
          {show3D ? '2D View' : '3D View'}
        </button>
      </div>

      {/* Visualization */}
      <div className="glass rounded-lg p-6">
        {show3D ? (
          <div className="h-96">
            <Suspense fallback={<div className="w-full h-full bg-neural-800 flex items-center justify-center">Loading 3D...</div>}>
              <Canvas
                camera={{ position: [0, 0, 10], fov: 75 }}
                style={{ background: 'transparent' }}
              >
                <VectorSpace3D 
                  selectedText={selectedText}
                  allTexts={sampleTexts}
                  isRunning={isRunning}
                />
              </Canvas>
            </Suspense>
          </div>
        ) : (
          <div className="h-96 relative">
            <svg width="100%" height="100%" viewBox="0 0 400 300" className="overflow-visible">
              {/* Background Grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Vector Points */}
              {sampleTexts.map((text, index) => {
                const x = 50 + (index % 4) * 80;
                const y = 50 + Math.floor(index / 4) * 80;
                const isSelected = selectedText === text;
                const isSimilar = similarTexts.includes(text);
                
                return (
                  <motion.g
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 12 : isSimilar ? 8 : 6}
                      fill={isSelected ? '#00ffff' : isSimilar ? '#8b5cf6' : '#64748b'}
                      stroke={isSelected ? '#00ffff' : isSimilar ? '#8b5cf6' : '#374151'}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <text
                      x={x}
                      y={y + 25}
                      textAnchor="middle"
                      className="text-xs fill-current"
                      fill={isSelected ? '#00ffff' : isSimilar ? '#8b5cf6' : '#9ca3af'}
                    >
                      {text.split(' ')[0]}
                    </text>
                  </motion.g>
                );
              })}
              
              {/* Similarity Lines */}
              {selectedText && similarTexts.map((similarText, index) => {
                const selectedIndex = sampleTexts.indexOf(selectedText);
                const similarIndex = sampleTexts.indexOf(similarText);
                
                const x1 = 50 + (selectedIndex % 4) * 80;
                const y1 = 50 + Math.floor(selectedIndex / 4) * 80;
                const x2 = 50 + (similarIndex % 4) * 80;
                const y2 = 50 + Math.floor(similarIndex / 4) * 80;
                
                return (
                  <motion.line
                    key={index}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  />
                );
              })}
            </svg>
          </div>
        )}
      </div>

      {/* Similarity Results */}
      {selectedText && (
        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-bold text-cyberpunk-neon mb-4">
            Similarity Analysis
          </h3>
          
          {isCalculating ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyberpunk-neon"></div>
              <span className="ml-3 text-neural-400">Calculating similarities...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-cyberpunk-neon/10 rounded-lg border border-cyberpunk-neon/20">
                <h4 className="font-semibold text-cyberpunk-neon mb-2">Selected Text:</h4>
                <p className="text-neural-300">{selectedText}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-cyberpunk-purple mb-3">Most Similar Texts:</h4>
                <div className="space-y-3">
                  {similarTexts.map((text, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-neural-800/50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-neural-300">{text}</span>
                      <span className="text-cyberpunk-purple font-bold">
                        {calculateSimilarity(selectedText, text).toFixed(1)}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
