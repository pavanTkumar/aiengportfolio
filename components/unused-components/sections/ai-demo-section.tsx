'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RAGPipelineFlow } from '@/components/rag-pipeline-flow';
import AIPlayground from '@/components/ai-playground';
import { VectorSpaceVisualization } from '@/components/vector-space-visualization';
import { PromptEngineeringDemo } from '@/components/prompt-engineering-demo';
import { ChatbotInterface } from '@/components/chatbot-interface';
import { EmbeddingVisualization } from '@/components/embedding-visualization';

export function AIDemoSection() {
  const [activeDemo, setActiveDemo] = useState('rag');
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const demos = [
    { id: 'rag', label: 'RAG Pipeline', icon: '🔍', description: 'Interactive RAG system demonstration' },
    { id: 'playground', label: 'AI Playground', icon: '🎮', description: 'Interactive AI experience with search and visualization' },
    { id: 'vectors', label: 'Vector Space', icon: '📊', description: 'Visualize embeddings and similarity' },
    { id: 'prompts', label: 'Prompt Engineering', icon: '✍️', description: 'Live prompt optimization' },
    { id: 'chatbot', label: 'AI Chatbot', icon: '💬', description: 'Conversational AI interface' },
    { id: 'embeddings', label: 'Embeddings', icon: '🧠', description: 'Text-to-vector transformation' },
  ];

  return (
    <section id="ai-demo" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 neural-bg opacity-30" />
      <div className="absolute inset-0 cyberpunk-grid opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
            <span className="cyberpunk-text">AI</span>
            <span className="text-neural-300"> Demo</span>
          </h2>
          <p className="text-xl text-neural-400 max-w-3xl mx-auto">
            Experience AI in action. Interact with live demonstrations of RAG pipelines, 
            vector embeddings, and intelligent systems I've built.
          </p>
        </motion.div>

        {/* Demo Selector */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {demos.map((demo) => (
            <motion.button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeDemo === demo.id
                  ? 'bg-cyberpunk-neon text-neural-900 neural-glow'
                  : 'glass text-neural-300 hover:text-cyberpunk-neon hover:bg-neural-800/50'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span className="text-lg">{demo.icon}</span>
                <span>{demo.label}</span>
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Demo Controls */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={() => setIsDemoRunning(!isDemoRunning)}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
              isDemoRunning
                ? 'bg-cyberpunk-pink text-neural-900'
                : 'bg-cyberpunk-green text-neural-900'
            }`}
          >
            {isDemoRunning ? 'Stop Demo' : 'Start Demo'}
          </button>
        </motion.div>

        {/* Demo Content */}
        <motion.div
          className="min-h-[600px]"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {activeDemo === 'rag' && (
            <RAGPipelineFlow />
          )}
          
          {activeDemo === 'playground' && (
            <AIPlayground />
          )}
          
          {activeDemo === 'vectors' && (
            <VectorSpaceVisualization isRunning={isDemoRunning} />
          )}
          
          {activeDemo === 'prompts' && (
            <PromptEngineeringDemo isRunning={isDemoRunning} />
          )}
          
          {activeDemo === 'chatbot' && (
            <ChatbotInterface isRunning={isDemoRunning} />
          )}
          
          {activeDemo === 'embeddings' && (
            <EmbeddingVisualization isRunning={isDemoRunning} />
          )}
        </motion.div>

        {/* Demo Info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="glass rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-cyberpunk-neon mb-4">
              {demos.find(d => d.id === activeDemo)?.label}
            </h3>
            <p className="text-neural-300 mb-4">
              {demos.find(d => d.id === activeDemo)?.description}
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-cyberpunk-green font-bold">Real-time</div>
                <div className="text-neural-400">Live Processing</div>
              </div>
              <div className="text-center">
                <div className="text-cyberpunk-orange font-bold">Interactive</div>
                <div className="text-neural-400">User Controlled</div>
              </div>
              <div className="text-center">
                <div className="text-cyberpunk-purple font-bold">Production</div>
                <div className="text-neural-400">Ready Technology</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
