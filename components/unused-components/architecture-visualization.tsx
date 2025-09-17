'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Architecture3D } from '@/components/3d/architecture-3d';

const architectures = [
  {
    name: 'RAG Pipeline',
    description: 'Retrieval-Augmented Generation system with vector search and LLM integration',
    components: [
      { name: 'Document Processor', position: [0, 2, 0], color: '#00ffff' },
      { name: 'Embedding Engine', position: [2, 1, 0], color: '#8b5cf6' },
      { name: 'Vector Store', position: [4, 0, 0], color: '#f472b6' },
      { name: 'Retrieval System', position: [2, -1, 0], color: '#10b981' },
      { name: 'LLM Engine', position: [0, -2, 0], color: '#f59e0b' },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4]
    ]
  },
  {
    name: 'AI Chat System',
    description: 'Multi-modal AI assistant with voice, text, and knowledge integration',
    components: [
      { name: 'Voice Interface', position: [-2, 2, 0], color: '#00ffff' },
      { name: 'NLP Engine', position: [0, 2, 0], color: '#8b5cf6' },
      { name: 'Knowledge Base', position: [2, 2, 0], color: '#f472b6' },
      { name: 'Context Manager', position: [0, 0, 0], color: '#10b981' },
      { name: 'Response Generator', position: [0, -2, 0], color: '#f59e0b' },
    ],
    connections: [
      [0, 1], [1, 3], [2, 3], [3, 4]
    ]
  },
  {
    name: 'Vector Database',
    description: 'High-performance vector search and similarity matching system',
    components: [
      { name: 'Index Builder', position: [0, 2, 0], color: '#00ffff' },
      { name: 'Search Engine', position: [2, 0, 0], color: '#8b5cf6' },
      { name: 'Storage Layer', position: [0, -2, 0], color: '#f472b6' },
      { name: 'Query Optimizer', position: [-2, 0, 0], color: '#10b981' },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 0]
    ]
  }
];

export function ArchitectureVisualization() {
  const [activeArchitecture, setActiveArchitecture] = useState(0);
  const [is3DMode, setIs3DMode] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-bold text-cyberpunk-neon mb-4">
          System Architecture
        </h3>
        <p className="text-neural-400 max-w-2xl mx-auto">
          Explore the technical architecture of my AI systems with interactive 3D visualizations
        </p>
      </motion.div>

      {/* Architecture Selector */}
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {architectures.map((arch, index) => (
          <motion.button
            key={arch.name}
            onClick={() => setActiveArchitecture(index)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeArchitecture === index
                ? 'bg-cyberpunk-neon text-neural-900 neural-glow'
                : 'glass text-neural-300 hover:text-cyberpunk-neon hover:bg-neural-800/50'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {arch.name}
          </motion.button>
        ))}
      </motion.div>

      {/* 3D Toggle */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <button
          onClick={() => setIs3DMode(!is3DMode)}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            is3DMode
              ? 'bg-cyberpunk-purple text-neural-100'
              : 'glass text-neural-300 hover:text-cyberpunk-neon hover:bg-neural-800/50'
          }`}
        >
          {is3DMode ? '2D View' : '3D View'}
        </button>
      </motion.div>

      {/* Visualization */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {is3DMode ? (
          <div className="h-96 glass rounded-lg overflow-hidden">
            <Suspense fallback={<div className="w-full h-full bg-neural-800 flex items-center justify-center">Loading 3D...</div>}>
              <Canvas
                camera={{ position: [0, 0, 10], fov: 75 }}
                style={{ background: 'transparent' }}
              >
                <Architecture3D architecture={architectures[activeArchitecture]} />
              </Canvas>
            </Suspense>
          </div>
        ) : (
          <div className="glass rounded-lg p-8">
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-cyberpunk-neon mb-2">
                {architectures[activeArchitecture].name}
              </h4>
              <p className="text-neural-400">
                {architectures[activeArchitecture].description}
              </p>
            </div>

            {/* 2D Architecture Diagram */}
            <div className="relative h-64 flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
                {architectures[activeArchitecture].components.map((component, index) => (
                  <motion.g
                    key={component.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <rect
                      x={component.position[0] * 50 + 150}
                      y={component.position[1] * 30 + 80}
                      width="80"
                      height="40"
                      rx="8"
                      fill={component.color}
                      fillOpacity="0.2"
                      stroke={component.color}
                      strokeWidth="2"
                    />
                    <text
                      x={component.position[0] * 50 + 190}
                      y={component.position[1] * 30 + 105}
                      textAnchor="middle"
                      className="text-xs fill-current"
                      fill={component.color}
                    >
                      {component.name}
                    </text>
                  </motion.g>
                ))}

                {/* Connections */}
                {architectures[activeArchitecture].connections.map((connection, index) => {
                  const start = architectures[activeArchitecture].components[connection[0]];
                  const end = architectures[activeArchitecture].components[connection[1]];
                  
                  return (
                    <motion.line
                      key={index}
                      x1={start.position[0] * 50 + 190}
                      y1={start.position[1] * 30 + 100}
                      x2={end.position[0] * 50 + 190}
                      y2={end.position[1] * 30 + 100}
                      stroke="#00ffff"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Component Details */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {architectures[activeArchitecture].components.map((component, index) => (
                <motion.div
                  key={component.name}
                  className="p-4 bg-neural-800/50 rounded-lg border border-neural-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: component.color }}
                    />
                    <h5 className="font-semibold text-neural-200">
                      {component.name}
                    </h5>
                  </div>
                  <p className="text-sm text-neural-400">
                    Core component handling specific functionality in the system architecture.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
