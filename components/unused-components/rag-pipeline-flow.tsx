'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RAGPipelineFlowProps {
  className?: string;
}

const pipelineSteps = [
  {
    id: 'document',
    title: 'Document Ingestion',
    description: 'Raw documents are ingested and preprocessed for processing',
    icon: '📄',
    color: 'from-blue-500 to-cyan-500',
    details: 'Documents are loaded, cleaned, and prepared for chunking. This includes text extraction, formatting normalization, and metadata preservation.',
  },
  {
    id: 'chunking',
    title: 'Text Chunking',
    description: 'Documents are intelligently split into optimal chunks',
    icon: '✂️',
    color: 'from-cyan-500 to-teal-500',
    details: 'Using semantic chunking strategies, documents are divided into overlapping segments that maintain context while fitting within token limits.',
  },
  {
    id: 'embedding',
    title: 'Embedding Generation',
    description: 'Text chunks are converted to high-dimensional vectors',
    icon: '🧠',
    color: 'from-teal-500 to-green-500',
    details: 'Advanced embedding models (like OpenAI embeddings or sentence-transformers) convert text into dense vector representations that capture semantic meaning.',
  },
  {
    id: 'storage',
    title: 'Vector Storage',
    description: 'Embeddings are indexed in vector database',
    icon: '💾',
    color: 'from-green-500 to-emerald-500',
    details: 'Vectors are stored in specialized databases like Pinecone, FAISS, or Weaviate with efficient indexing for fast similarity search.',
  },
  {
    id: 'query',
    title: 'Query Processing',
    description: 'User query is vectorized for similarity matching',
    icon: '🔍',
    color: 'from-emerald-500 to-yellow-500',
    details: 'The user query is processed through the same embedding model to create a query vector that can be compared against stored embeddings.',
  },
  {
    id: 'search',
    title: 'Similarity Search',
    description: 'Most relevant chunks are retrieved using vector similarity',
    icon: '🎯',
    color: 'from-yellow-500 to-orange-500',
    details: 'Cosine similarity or other distance metrics are used to find the most relevant document chunks based on semantic similarity to the query.',
  },
  {
    id: 'context',
    title: 'Context Assembly',
    description: 'Retrieved chunks are assembled as context for the LLM',
    icon: '📋',
    color: 'from-orange-500 to-red-500',
    details: 'The most relevant chunks are combined with the original query to create a comprehensive context that the LLM can use to generate accurate responses.',
  },
  {
    id: 'generation',
    title: 'Response Generation',
    description: 'LLM generates contextual response using retrieved information',
    icon: '✨',
    color: 'from-red-500 to-pink-500',
    details: 'The language model processes the query and context to generate a coherent, accurate response that incorporates the retrieved information.',
  },
];

export function RAGPipelineFlow({ className = '' }: RAGPipelineFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % pipelineSteps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setIsPlaying(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-neural-200 mb-4">
          RAG Pipeline Visualization
        </h2>
        <p className="text-neural-400 max-w-2xl mx-auto">
          Explore how Retrieval-Augmented Generation works step by step, from document ingestion to response generation.
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-3 bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-purple text-neural-900 font-bold rounded-lg hover:shadow-cyberpunk-glow transition-all duration-300"
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <div className="text-sm text-neural-400">
            Step {currentStep + 1} of {pipelineSteps.length}
          </div>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="relative mb-12">
        {/* Flow Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyberpunk-neon via-cyberpunk-purple to-cyberpunk-pink transform -translate-y-1/2 z-0 rounded-full" />
        
        {/* Progress Indicator */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-cyberpunk-neon transform -translate-y-1/2 z-10 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep + 1) / pipelineSteps.length) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
        />
        
        {/* Steps */}
        <motion.div
          className="relative flex justify-between items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {pipelineSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => handleStepClick(index)}
              variants={stepVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Step Circle */}
              <motion.div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl mb-3 relative z-10 transition-all duration-500 ${
                  index === currentStep
                    ? `bg-gradient-to-r ${step.color} shadow-lg shadow-cyberpunk-neon/30`
                    : index < currentStep
                    ? 'bg-gradient-to-r from-cyberpunk-neon/20 to-cyberpunk-purple/20 border-2 border-cyberpunk-neon/50'
                    : 'bg-neural-800 border-2 border-neural-600 hover:border-cyberpunk-neon/50'
                }`}
                animate={{
                  scale: index === currentStep ? 1.1 : 1,
                  boxShadow: index === currentStep ? '0 0 30px rgba(0, 255, 255, 0.4)' : 'none',
                }}
                transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
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

              {/* Step Info */}
              <div className="text-center max-w-36">
                <h3 className={`text-sm font-bold mb-1 transition-colors duration-300 ${
                  index === currentStep ? 'text-cyberpunk-neon' : 'text-neural-200'
                }`}>
                  {step.title}
                </h3>
                <p className="text-xs text-neural-400 leading-tight">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detailed View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
          className="glass rounded-lg p-8"
        >
          <div className="flex items-start space-x-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-gradient-to-r ${pipelineSteps[currentStep].color} flex-shrink-0`}>
              {pipelineSteps[currentStep].icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h2 className="text-2xl font-bold text-neural-200">
                  {pipelineSteps[currentStep].title}
                </h2>
                <span className="px-3 py-1 bg-cyberpunk-neon/20 text-cyberpunk-neon text-sm rounded-full">
                  Step {currentStep + 1}
                </span>
              </div>
              
              <p className="text-lg text-neural-300 leading-relaxed mb-4">
                {pipelineSteps[currentStep].description}
              </p>
              
              <div className="bg-neural-800/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-cyberpunk-neon mb-2">Technical Details:</h4>
                <p className="text-neural-400 text-sm leading-relaxed">
                  {pipelineSteps[currentStep].details}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
