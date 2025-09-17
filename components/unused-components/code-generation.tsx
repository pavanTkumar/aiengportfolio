'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const codeSnippets = [
  {
    language: 'python',
    code: `# RAG Pipeline Implementation
from langchain import VectorStoreRetriever
from langchain.embeddings import OpenAIEmbeddings
import pinecone

def build_rag_pipeline():
    # Initialize vector store
    embeddings = OpenAIEmbeddings()
    vectorstore = Pinecone.from_existing_index(
        index_name="knowledge-base",
        embedding=embeddings
    )
    
    # Create retriever
    retriever = VectorStoreRetriever(
        vectorstore=vectorstore,
        search_kwargs={"k": 5}
    )
    
    return retriever`,
    highlight: 'RAG Pipeline'
  },
  {
    language: 'typescript',
    code: `// AI Chat Interface
interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const useAIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const sendMessage = async (content: string) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: content })
    });
    
    return response.json();
  };
  
  return { messages, sendMessage };
};`,
    highlight: 'AI Chat Interface'
  },
  {
    language: 'python',
    code: `# Vector Database Operations
import numpy as np
from sentence_transformers import SentenceTransformer

class VectorDatabase:
    def __init__(self, model_name="all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)
        self.vectors = []
        self.metadata = []
    
    def add_documents(self, documents):
        embeddings = self.model.encode(documents)
        self.vectors.extend(embeddings)
        self.metadata.extend(documents)
    
    def similarity_search(self, query, k=5):
        query_embedding = self.model.encode([query])
        similarities = np.dot(self.vectors, query_embedding.T)
        indices = np.argsort(similarities.flatten())[-k:][::-1]
        return [self.metadata[i] for i in indices]`,
    highlight: 'Vector Database'
  }
];

export function CodeGeneration() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const snippet = codeSnippets[currentSnippet];
    let index = 0;
    
    const typeCode = () => {
      if (index < snippet.code.length) {
        setDisplayedCode(snippet.code.slice(0, index + 1));
        index++;
        setTimeout(typeCode, 20);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
          setDisplayedCode('');
          setIsTyping(true);
        }, 3000);
      }
    };

    const timer = setTimeout(typeCode, 1000);
    return () => clearTimeout(timer);
  }, [currentSnippet]);

  const currentCode = codeSnippets[currentSnippet];

  return (
    <motion.div
      className="max-w-4xl mx-auto glass rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyberpunk-pink rounded-full" />
          <div className="w-3 h-3 bg-cyberpunk-orange rounded-full" />
          <div className="w-3 h-3 bg-cyberpunk-green rounded-full" />
        </div>
        <div className="text-sm text-neural-400 font-mono">
          {currentCode.language}
        </div>
      </div>
      
      <div className="relative">
        <div className="text-xs text-cyberpunk-neon mb-2 font-mono">
          {currentCode.highlight}
        </div>
        
        <pre className="text-sm text-neural-300 font-mono overflow-x-auto">
          <code className="language-python">
            {displayedCode}
            {isTyping && (
              <motion.span
                className="inline-block w-2 h-4 bg-cyberpunk-neon ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
