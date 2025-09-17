'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AIPlaygroundProps {
  className?: string;
}

interface SearchResult {
  id: string;
  content: string;
  relevance: number;
  source: string;
}

const sampleDocuments = [
  {
    id: '1',
    content: 'Large Language Models (LLMs) are transformer-based neural networks trained on vast amounts of text data to understand and generate human-like text.',
    source: 'AI Fundamentals',
    embedding: [0.1, 0.8, 0.3, 0.9, 0.2]
  },
  {
    id: '2',
    content: 'RAG (Retrieval-Augmented Generation) combines retrieval of relevant documents with generation to provide accurate, contextual responses.',
    source: 'RAG Architecture',
    embedding: [0.9, 0.2, 0.7, 0.4, 0.6]
  },
  {
    id: '3',
    content: 'Vector databases store high-dimensional embeddings and enable efficient similarity search for semantic understanding.',
    source: 'Vector Databases',
    embedding: [0.5, 0.6, 0.9, 0.1, 0.8]
  },
  {
    id: '4',
    content: 'Embeddings are dense vector representations that capture semantic meaning of text in a continuous space.',
    source: 'Embeddings Guide',
    embedding: [0.7, 0.4, 0.2, 0.8, 0.5]
  },
  {
    id: '5',
    content: 'Pinecone is a managed vector database service that provides fast similarity search at scale.',
    source: 'Pinecone Documentation',
    embedding: [0.3, 0.9, 0.6, 0.2, 0.7]
  }
];

export default function AIPlayground({ className }: AIPlaygroundProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [showVectorSpace, setShowVectorSpace] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple similarity search simulation
  const performSearch = async (searchQuery: string) => {
    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple keyword matching for demo
    const results = sampleDocuments
      .map(doc => {
        const relevance = calculateRelevance(searchQuery, doc.content);
        return {
          id: doc.id,
          content: doc.content,
          relevance,
          source: doc.source
        };
      })
      .filter(result => result.relevance > 0.3)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3);
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const calculateRelevance = (query: string, content: string): number => {
    const queryWords = query.toLowerCase().split(' ');
    const contentWords = content.toLowerCase().split(' ');
    
    let matches = 0;
    queryWords.forEach(word => {
      if (contentWords.some(cWord => cWord.includes(word) || word.includes(cWord))) {
        matches++;
      }
    });
    
    return matches / queryWords.length;
  };

  const handleSearch = () => {
    if (query.trim()) {
      performSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Vector space visualization
  useEffect(() => {
    if (!showVectorSpace || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawVectorSpace = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < canvas.width / window.devicePixelRatio; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height / window.devicePixelRatio);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height / window.devicePixelRatio; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width / window.devicePixelRatio, y);
        ctx.stroke();
      }

      // Draw documents as points
      sampleDocuments.forEach((doc, index) => {
        const x = (doc.embedding[0] + doc.embedding[2]) * canvas.width / window.devicePixelRatio * 0.8 + 50;
        const y = (doc.embedding[1] + doc.embedding[3]) * canvas.height / window.devicePixelRatio * 0.8 + 50;
        
        // Draw point
        ctx.fillStyle = '#00ff88';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw label
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter';
        ctx.fillText(doc.source, x + 10, y - 5);
      });

      // Draw query vector if searching
      if (query && searchResults.length > 0) {
        const queryX = 100;
        const queryY = 100;
        
        ctx.fillStyle = '#ff6b35';
        ctx.beginPath();
        ctx.arc(queryX, queryY, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections to relevant documents
        searchResults.forEach((result, index) => {
          const doc = sampleDocuments.find(d => d.id === result.id);
          if (doc) {
            const docX = (doc.embedding[0] + doc.embedding[2]) * canvas.width / window.devicePixelRatio * 0.8 + 50;
            const docY = (doc.embedding[1] + doc.embedding[3]) * canvas.height / window.devicePixelRatio * 0.8 + 50;
            
            ctx.strokeStyle = `rgba(255, 107, 53, ${result.relevance})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(queryX, queryY);
            ctx.lineTo(docX, docY);
            ctx.stroke();
          }
        });
      }
    };

    drawVectorSpace();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [showVectorSpace, query, searchResults]);

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">AI Playground</h3>
        <p className="text-neural-300">Experience RAG in action with a simplified demo</p>
      </div>

      {/* Search Interface */}
      <div className="glass rounded-2xl p-6">
        <div className="flex space-x-4 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about AI, RAG, or vector databases..."
              className="w-full px-4 py-3 bg-neural-800/50 border border-neural-600 rounded-lg text-white placeholder-neural-400 focus:outline-none focus:border-cyberpunk-neon focus:ring-1 focus:ring-cyberpunk-neon transition-all"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <motion.div
                animate={{ rotate: isSearching ? 360 : 0 }}
                transition={{ duration: 1, repeat: isSearching ? Infinity : 0, ease: 'linear' }}
              >
                <svg className="w-5 h-5 text-cyberpunk-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.div>
            </div>
          </div>
          <motion.button
            onClick={handleSearch}
            disabled={!query.trim() || isSearching}
            className="px-6 py-3 bg-cyberpunk-neon text-neural-900 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyberpunk-neon/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </motion.button>
        </div>

        {/* Search Results */}
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              <h4 className="text-lg font-semibold text-white mb-3">Search Results</h4>
              {searchResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-neural-800/30 rounded-lg border border-neural-600 cursor-pointer hover:border-cyberpunk-neon/50 transition-colors"
                  onClick={() => setSelectedResult(result)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-white">{result.source}</h5>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-neural-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-cyberpunk-neon"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.relevance * 100}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                      <span className="text-sm text-cyberpunk-neon">
                        {Math.round(result.relevance * 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-neural-300 text-sm line-clamp-2">{result.content}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vector Space Toggle */}
        <div className="mt-6 flex justify-center">
          <motion.button
            onClick={() => setShowVectorSpace(!showVectorSpace)}
            className="px-4 py-2 bg-neural-700 hover:bg-neural-600 text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showVectorSpace ? 'Hide' : 'Show'} Vector Space
          </motion.button>
        </div>
      </div>

      {/* Vector Space Visualization */}
      <AnimatePresence>
        {showVectorSpace && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-2xl p-6"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Vector Embedding Space</h4>
            <div className="relative h-64 bg-neural-900/50 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
              />
              <div className="absolute top-4 left-4 text-sm text-neural-300">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-cyberpunk-neon"></div>
                    <span>Documents</span>
                  </div>
                  {query && (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-cyberpunk-orange"></div>
                      <span>Query</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Detail */}
      <AnimatePresence>
        {selectedResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-white mb-1">{selectedResult.source}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-cyberpunk-neon font-semibold">
                    {Math.round(selectedResult.relevance * 100)}% relevance
                  </span>
                  <div className="w-20 h-2 bg-neural-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyberpunk-neon"
                      style={{ width: `${selectedResult.relevance * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => setSelectedResult(null)}
                className="p-2 rounded-lg hover:bg-neural-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-neural-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            <p className="text-neural-300 leading-relaxed">{selectedResult.content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}