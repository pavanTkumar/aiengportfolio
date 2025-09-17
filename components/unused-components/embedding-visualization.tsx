'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmbeddingVisualizationProps {
  isRunning: boolean;
}

const sampleTexts = [
  'The quick brown fox jumps over the lazy dog',
  'Machine learning algorithms process data efficiently',
  'Natural language processing enables text understanding',
  'Vector embeddings capture semantic meaning',
  'Artificial intelligence transforms technology',
];

export function EmbeddingVisualization({ isRunning }: EmbeddingVisualizationProps) {
  const [selectedText, setSelectedText] = useState('');
  const [embedding, setEmbedding] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    'Text Input',
    'Tokenization',
    'Embedding Generation',
    'Vector Output',
  ];

  const generateEmbedding = (text: string) => {
    setSelectedText(text);
    setIsGenerating(true);
    setStep(0);
    setEmbedding([]);

    // Simulate embedding generation process
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsGenerating(false);
          // Generate a random embedding vector
          const vector = Array.from({ length: 8 }, () => Math.random() * 2 - 1);
          setEmbedding(vector);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const normalizeVector = (vector: number[]) => {
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return vector.map(val => val / magnitude);
  };

  const calculateSimilarity = (vec1: number[], vec2: number[]) => {
    if (vec1.length !== vec2.length) return 0;
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    return Math.max(0, dotProduct);
  };

  return (
    <div className="space-y-8">
      {/* Text Selection */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-bold text-cyberpunk-neon mb-4">
          Text to Vector Embedding
        </h3>
        <p className="text-neural-400 mb-6">
          Select a text to see how it's converted into a numerical vector representation.
        </p>
        
        <div className="space-y-3">
          {sampleTexts.map((text, index) => (
            <motion.button
              key={index}
              onClick={() => generateEmbedding(text)}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
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

      {/* Process Steps */}
      {selectedText && (
        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-bold text-cyberpunk-neon mb-4">
            Embedding Generation Process
          </h3>
          
          <div className="space-y-4">
            {steps.map((stepName, index) => (
              <motion.div
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                  step >= index
                    ? 'bg-cyberpunk-neon/10 border border-cyberpunk-neon/20'
                    : 'bg-neural-800/50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= index ? 'bg-cyberpunk-neon text-neural-900' : 'bg-neural-700 text-neural-400'
                }`}>
                  {step > index ? '✓' : index + 1}
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    step >= index ? 'text-cyberpunk-neon' : 'text-neural-400'
                  }`}>
                    {stepName}
                  </h4>
                  <p className="text-sm text-neural-500">
                    {index === 0 && 'Input text is received and prepared for processing'}
                    {index === 1 && 'Text is broken down into individual tokens (words/subwords)'}
                    {index === 2 && 'Neural network generates high-dimensional vector representation'}
                    {index === 3 && 'Final embedding vector is output for use in applications'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Embedding Visualization */}
      {embedding.length > 0 && (
        <motion.div
          className="glass rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-bold text-cyberpunk-neon mb-4">
            Generated Embedding Vector
          </h3>
          
          <div className="space-y-4">
            {/* Vector Values */}
            <div>
              <h4 className="font-semibold text-neural-300 mb-2">Vector Values:</h4>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {embedding.map((value, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-2 bg-neural-800 rounded-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="text-xs text-neural-400">Dim {index + 1}</div>
                    <div className="text-sm font-mono text-cyberpunk-neon">
                      {value.toFixed(3)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Vector Magnitude */}
            <div>
              <h4 className="font-semibold text-neural-300 mb-2">Vector Properties:</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-neural-800/50 rounded-lg">
                  <div className="text-sm text-neural-400">Magnitude</div>
                  <div className="text-lg font-bold text-cyberpunk-green">
                    {Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0)).toFixed(3)}
                  </div>
                </div>
                <div className="p-3 bg-neural-800/50 rounded-lg">
                  <div className="text-sm text-neural-400">Dimensions</div>
                  <div className="text-lg font-bold text-cyberpunk-purple">
                    {embedding.length}
                  </div>
                </div>
                <div className="p-3 bg-neural-800/50 rounded-lg">
                  <div className="text-sm text-neural-400">Range</div>
                  <div className="text-lg font-bold text-cyberpunk-orange">
                    [{Math.min(...embedding).toFixed(2)}, {Math.max(...embedding).toFixed(2)}]
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Representation */}
            <div>
              <h4 className="font-semibold text-neural-300 mb-2">Visual Representation:</h4>
              <div className="h-32 bg-neural-900 rounded-lg p-4 flex items-end justify-center space-x-1">
                {embedding.map((value, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-t from-cyberpunk-neon to-cyberpunk-purple rounded-sm"
                    style={{ width: '20px' }}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.abs(value) * 100 + 20}px` }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Embedding Information */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-lg font-bold text-cyberpunk-purple mb-4">
          About Embeddings
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-cyberpunk-neon mb-2">What are Embeddings?</h4>
            <p className="text-sm text-neural-300 leading-relaxed">
              Embeddings are numerical representations of text that capture semantic meaning. 
              They enable computers to understand relationships between words and concepts by 
              representing them as points in high-dimensional space.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-cyberpunk-green mb-2">Applications:</h4>
            <ul className="text-sm text-neural-300 space-y-1">
              <li>• Semantic search and similarity matching</li>
              <li>• Recommendation systems</li>
              <li>• Text classification and clustering</li>
              <li>• Machine translation</li>
              <li>• Question answering systems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
