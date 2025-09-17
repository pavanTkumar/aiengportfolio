'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RAGPipelineVisualizationProps {
  isRunning: boolean;
}

const pipelineSteps = [
  { id: 'input', label: 'User Query', icon: '💬', color: '#00ffff' },
  { id: 'embedding', label: 'Text Embedding', icon: '🧠', color: '#8b5cf6' },
  { id: 'search', label: 'Vector Search', icon: '🔍', color: '#f472b6' },
  { id: 'retrieval', label: 'Document Retrieval', icon: '📄', color: '#10b981' },
  { id: 'generation', label: 'Response Generation', icon: '✨', color: '#f59e0b' },
  { id: 'output', label: 'Final Answer', icon: '🎯', color: '#ef4444' },
];

const sampleQueries = [
  'What is machine learning?',
  'How does RAG work?',
  'Explain vector databases',
  'What are embeddings?',
  'How to build AI chatbots?',
];

export function RAGPipelineVisualization({ isRunning }: RAGPipelineVisualizationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [retrievedDocs, setRetrievedDocs] = useState<string[]>([]);
  const [response, setResponse] = useState('');
  const intervalRef = useRef<NodeJS.Timeout>();

  const sampleDocuments = [
    'Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed.',
    'RAG (Retrieval-Augmented Generation) combines information retrieval with text generation to provide more accurate and contextual responses.',
    'Vector databases store and search high-dimensional vectors efficiently, enabling semantic search and similarity matching.',
    'Embeddings are numerical representations of text that capture semantic meaning and enable similarity comparisons.',
    'AI chatbots can be built using natural language processing, machine learning, and conversational AI frameworks.',
  ];

  useEffect(() => {
    if (isRunning && isProcessing) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= pipelineSteps.length - 1) {
            setIsProcessing(false);
            setResponse('Based on the retrieved documents, here is a comprehensive answer to your query...');
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isProcessing]);

  const handleQuerySubmit = () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    setCurrentStep(0);
    setRetrievedDocs([]);
    setResponse('');
    
    // Simulate document retrieval
    setTimeout(() => {
      setRetrievedDocs(sampleDocuments.slice(0, 3));
    }, 2000);
  };

  const selectSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery);
  };

  return (
    <div className="space-y-8">
      {/* Query Input */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-bold text-cyberpunk-neon mb-4">
          Try the RAG Pipeline
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neural-300 mb-2">
              Enter your question:
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything about AI, ML, or technology..."
                className="flex-1 px-4 py-2 bg-neural-800 border border-neural-700 rounded-lg text-neural-200 placeholder-neural-500 focus:border-cyberpunk-neon focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleQuerySubmit()}
              />
              <button
                onClick={handleQuerySubmit}
                disabled={isProcessing || !query.trim()}
                className="px-6 py-2 bg-cyberpunk-neon text-neural-900 rounded-lg font-medium hover:bg-cyberpunk-neon/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Ask'}
              </button>
            </div>
          </div>

          {/* Sample Queries */}
          <div>
            <p className="text-sm text-neural-400 mb-2">Or try a sample query:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((sampleQuery, index) => (
                <button
                  key={index}
                  onClick={() => selectSampleQuery(sampleQuery)}
                  className="px-3 py-1 bg-neural-800 text-neural-300 text-sm rounded-full hover:bg-neural-700 hover:text-cyberpunk-neon transition-colors"
                >
                  {sampleQuery}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-bold text-cyberpunk-neon mb-6">
          RAG Pipeline Flow
        </h3>
        
        <div className="relative">
          {/* Pipeline Steps */}
          <div className="flex justify-between items-center mb-8">
            {pipelineSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center group cursor-pointer">
                <motion.div
                  className={cn(
                    'w-20 h-20 rounded-full flex items-center justify-center text-2xl mb-3 transition-all duration-500 relative',
                    currentStep >= index ? 'neural-glow' : 'bg-neural-800 border-2 border-neural-600'
                  )}
                  style={{
                    backgroundColor: currentStep >= index ? step.color : undefined,
                    color: currentStep >= index ? '#0f172a' : '#64748b',
                  }}
                  animate={{
                    scale: currentStep === index ? 1.1 : 1,
                    boxShadow: currentStep === index ? `0 0 30px ${step.color}40` : 'none',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {step.icon}
                  
                  {/* Completion Checkmark */}
                  {index < currentStep && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 bg-cyberpunk-green rounded-full flex items-center justify-center text-xs text-neural-900"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      ✓
                    </motion.div>
                  )}
                  
                  {/* Active Step Indicator */}
                  {index === currentStep && (
                    <motion.div
                      className="absolute -inset-1 rounded-full border-2 border-cyberpunk-neon"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
                <span className={cn(
                  "text-sm text-center max-w-24 transition-colors duration-300",
                  currentStep === index ? "text-cyberpunk-neon font-semibold" : "text-neural-300"
                )}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Enhanced Connection Lines */}
          <div className="absolute top-10 left-10 right-10 h-1 bg-neural-700 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-cyberpunk-neon via-cyberpunk-purple to-cyberpunk-pink rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / (pipelineSteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
            />
          </div>
          
          {/* Progress Dots */}
          <div className="absolute top-9 left-10 right-10 flex justify-between">
            {pipelineSteps.map((_, index) => (
              <motion.div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index <= currentStep ? "bg-cyberpunk-neon" : "bg-neural-600"
                )}
                animate={{
                  scale: index === currentStep ? 1.5 : 1,
                  boxShadow: index === currentStep ? "0 0 10px rgba(0, 255, 255, 0.5)" : "none"
                }}
              />
            ))}
          </div>
        </div>

        {/* Step Details */}
        <AnimatePresence mode="wait">
          {currentStep < pipelineSteps.length && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h4 className="text-lg font-semibold text-cyberpunk-neon mb-2">
                {pipelineSteps[currentStep].label}
              </h4>
              <p className="text-neural-400">
                {currentStep === 0 && 'Processing your query and preparing for embedding generation...'}
                {currentStep === 1 && 'Converting text to high-dimensional vector representation...'}
                {currentStep === 2 && 'Searching vector database for similar documents...'}
                {currentStep === 3 && 'Retrieving most relevant documents from knowledge base...'}
                {currentStep === 4 && 'Generating response using retrieved context and LLM...'}
                {currentStep === 5 && 'Finalizing and formatting the response...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      {(retrievedDocs.length > 0 || response) && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Retrieved Documents */}
          {retrievedDocs.length > 0 && (
            <div className="glass rounded-lg p-6">
              <h3 className="text-lg font-bold text-cyberpunk-neon mb-4">
                Retrieved Documents
              </h3>
              <div className="space-y-3">
                {retrievedDocs.map((doc, index) => (
                  <motion.div
                    key={index}
                    className="p-3 bg-neural-800/50 rounded-lg border border-neural-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-2">
                      <span className="text-cyberpunk-green text-sm">📄</span>
                      <p className="text-neural-300 text-sm">{doc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Generated Response */}
          {response && (
            <div className="glass rounded-lg p-6">
              <h3 className="text-lg font-bold text-cyberpunk-neon mb-4">
                Generated Response
              </h3>
              <motion.div
                className="p-4 bg-neural-800/50 rounded-lg border border-cyberpunk-neon/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-neural-300 leading-relaxed">{response}</p>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
