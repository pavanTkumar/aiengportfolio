'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  relevance: number;
  type: 'project' | 'technology' | 'experience' | 'skill';
}

interface AdvancedSearchProps {
  className?: string;
  placeholder?: string;
  onResultSelect?: (result: SearchResult) => void;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'RAG Pipeline Implementation',
    description: 'Complete guide to building Retrieval-Augmented Generation systems with LangChain and vector databases',
    category: 'AI/ML',
    url: '/projects/rag-pipeline',
    relevance: 0.95,
    type: 'project'
  },
  {
    id: '2',
    title: 'Vector Database Optimization',
    description: 'Best practices for optimizing vector database performance with Pinecone and FAISS',
    category: 'Database',
    url: '/projects/vector-optimization',
    relevance: 0.88,
    type: 'project'
  },
  {
    id: '3',
    title: 'LLM Fine-tuning Guide',
    description: 'Step-by-step process for fine-tuning large language models for specific use cases',
    category: 'AI/ML',
    url: '/projects/llm-finetuning',
    relevance: 0.82,
    type: 'project'
  },
  {
    id: '4',
    title: 'LangChain Framework',
    description: 'Advanced framework for building applications with large language models',
    category: 'Technology',
    url: '/technologies/langchain',
    relevance: 0.90,
    type: 'technology'
  },
  {
    id: '5',
    title: 'Pinecone Vector Database',
    description: 'Managed vector database service for machine learning applications',
    category: 'Technology',
    url: '/technologies/pinecone',
    relevance: 0.85,
    type: 'technology'
  },
  {
    id: '6',
    title: 'AI Engineer at Optivus',
    description: 'Implementing LLM-powered features with RAG pipelines and vector databases',
    category: 'Experience',
    url: '/experience/optivus',
    relevance: 0.78,
    type: 'experience'
  }
];

export function AdvancedSearch({ 
  className = '', 
  placeholder = 'Search projects, technologies, or topics...',
  onResultSelect 
}: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Debounced search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with debounce
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Filter results based on query
      const filteredResults = mockSearchResults.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a, b) => b.relevance - a.relevance);

      setResults(filteredResults);
      setIsOpen(filteredResults.length > 0);
      setSelectedIndex(-1);
    } catch (err) {
      setError('Search failed. Please try again.');
      setResults([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle input change with debounce
  const handleInputChange = (value: string) => {
    setQuery(value);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleResultSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle result selection
  const handleResultSelect = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
    }
    
    // Add to search history
    if (!searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
    }
    
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-cyberpunk-neon/20 text-cyberpunk-neon px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project': return '🚀';
      case 'technology': return '⚡';
      case 'experience': return '💼';
      case 'skill': return '🎯';
      default: return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'text-cyberpunk-green';
      case 'technology': return 'text-cyberpunk-neon';
      case 'experience': return 'text-cyberpunk-purple';
      case 'skill': return 'text-cyberpunk-orange';
      default: return 'text-neural-400';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const resultVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1],
      },
    }),
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`} ref={resultsRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            placeholder={placeholder}
            className="w-full px-6 py-4 pl-14 bg-neural-800/50 border border-neural-700 rounded-lg text-neural-200 placeholder-neural-500 focus:border-cyberpunk-neon focus:outline-none focus:ring-2 focus:ring-cyberpunk-neon/20 transition-all duration-300"
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <motion.div
              animate={{ 
                rotate: isLoading ? 360 : 0,
                scale: isLoading ? 1.1 : 1 
              }}
              transition={{ 
                rotate: { duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" },
                scale: { duration: 0.3 }
              }}
            >
              <svg
                className="w-6 h-6 text-neural-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-cyberpunk-neon/30 border-t-cyberpunk-neon rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 right-0 mt-2 bg-neural-900 border border-neural-700 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto"
          >
            {error ? (
              <div className="p-4 text-center">
                <div className="text-cyberpunk-pink mb-2">⚠️</div>
                <p className="text-neural-400 text-sm">{error}</p>
                <button
                  onClick={() => performSearch(query)}
                  className="mt-2 px-4 py-2 bg-cyberpunk-neon text-neural-900 rounded-lg text-sm font-medium hover:bg-cyberpunk-neon/80 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : results.length === 0 && query.trim() ? (
              <div className="p-6 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-neural-300 font-medium mb-2">No results found</h3>
                <p className="text-neural-500 text-sm">
                  Try searching for "RAG", "Vector Database", "LLM", or "AI"
                </p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result, index) => (
                  <motion.div
                    key={result.id}
                    custom={index}
                    variants={resultVariants}
                    initial="hidden"
                    animate="visible"
                    className={`px-4 py-3 cursor-pointer transition-all duration-200 ${
                      index === selectedIndex
                        ? 'bg-cyberpunk-neon/10 border-l-4 border-cyberpunk-neon'
                        : 'hover:bg-neural-800/50'
                    }`}
                    onClick={() => handleResultSelect(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">{getTypeIcon(result.type)}</span>
                          <h4 className="text-neural-200 font-medium">
                            {highlightText(result.title, query)}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(result.type)} bg-neural-800`}>
                            {result.type}
                          </span>
                        </div>
                        <p className="text-neural-400 text-sm mb-2 line-clamp-2">
                          {highlightText(result.description, query)}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-neural-800 text-neural-300 text-xs rounded-full">
                            {result.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-cyberpunk-green rounded-full" />
                            <span className="text-xs text-neural-500">
                              {Math.round(result.relevance * 100)}% match
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 text-neural-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search History */}
      {searchHistory.length > 0 && !isOpen && (
        <div className="mt-2">
          <p className="text-xs text-neural-500 mb-2">Recent searches:</p>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => handleInputChange(term)}
                className="px-2 py-1 bg-neural-800 text-neural-400 text-xs rounded hover:bg-neural-700 hover:text-cyberpunk-neon transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
