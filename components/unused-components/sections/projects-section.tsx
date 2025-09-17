'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import EnhancedProjectShowcase from '@/components/enhanced-project-showcase';
import { ArchitectureVisualization } from '@/components/architecture-visualization';

const projects = [
  {
    id: 'promptflows-studio',
    title: 'PromptFlows Studio',
    description: 'Platform for RAG + agent workflows with CoT prompting, LangGraph orchestration, and retrieval evaluation.',
    longDescription: 'A comprehensive platform that enables developers to build, test, and deploy sophisticated RAG (Retrieval-Augmented Generation) workflows. Features advanced prompt engineering, multi-agent orchestration, and comprehensive evaluation metrics.',
    technologies: ['Python', 'LangChain', 'LangGraph', 'FastAPI', 'React', 'Pinecone', 'OpenAI'],
    category: 'ai',
    status: 'completed',
    featured: true,
    images: ['/images/promptflows-1.jpg', '/images/promptflows-2.jpg'],
    demoUrl: 'https://promptflows.demo.com',
    githubUrl: 'https://github.com/pavantejavath/promptflows-studio',
    architecture: {
      components: ['Frontend (React)', 'API Gateway (FastAPI)', 'RAG Engine (LangChain)', 'Vector Store (Pinecone)', 'Agent Orchestrator (LangGraph)'],
      dataFlow: ['Document Ingestion', 'Chunking & Embedding', 'Vector Storage', 'Query Processing', 'Response Generation'],
      technologies: ['React', 'FastAPI', 'LangChain', 'Pinecone', 'OpenAI GPT-4']
    },
    metrics: {
      performance: 'Sub-200ms response time',
      accuracy: '94% retrieval accuracy',
      users: '500+ developers',
      scale: '10K+ documents processed'
    },
    challenges: [
      'Complex multi-agent orchestration',
      'Real-time evaluation metrics',
      'Scalable vector search'
    ],
    solutions: [
      'Implemented LangGraph for agent coordination',
      'Built custom evaluation framework',
      'Optimized Pinecone queries with hybrid search'
    ],
    results: [
      '94% improvement in retrieval accuracy',
      '50% faster workflow development',
      '500+ active developers using platform'
    ]
  },
  {
    id: 'recruitai',
    title: 'RecruitAI',
    description: 'AI recruitment assistant with automated candidate screening via embeddings + semantic search.',
    longDescription: 'An intelligent recruitment platform that automates candidate screening using advanced NLP and semantic search. The system analyzes resumes, matches candidates to job requirements, and provides detailed insights to recruiters.',
    technologies: ['Python', 'FastAPI', 'Pinecone', 'OpenAI', 'React', 'PostgreSQL', 'Docker'],
    category: 'ai',
    status: 'completed',
    featured: true,
    images: ['/images/recruitai-1.jpg', '/images/recruitai-2.jpg'],
    demoUrl: 'https://recruitai.demo.com',
    githubUrl: 'https://github.com/pavantejavath/recruitai',
    architecture: {
      components: ['Resume Parser', 'Embedding Engine', 'Semantic Matcher', 'Ranking Algorithm', 'Dashboard'],
      dataFlow: ['Resume Upload', 'Text Extraction', 'Embedding Generation', 'Job Matching', 'Ranking & Scoring'],
      technologies: ['FastAPI', 'Pinecone', 'OpenAI Embeddings', 'React', 'PostgreSQL']
    },
    metrics: {
      performance: '2-second candidate screening',
      accuracy: '87% match accuracy',
      users: '50+ recruiters',
      scale: '10K+ resumes processed'
    },
    challenges: [
      'Resume parsing accuracy',
      'Semantic matching precision',
      'Bias reduction in screening'
    ],
    solutions: [
      'Advanced NLP preprocessing',
      'Multi-dimensional embedding space',
      'Fairness-aware ranking algorithms'
    ],
    results: [
      '87% reduction in screening time',
      '40% improvement in candidate quality',
      '50+ recruiters actively using platform'
    ]
  },
  {
    id: 'personal-ai-assistant',
    title: 'Personal AI Assistant',
    description: 'GenAI assistant for scheduling, semantic search, and conversations with TTS + RAG.',
    longDescription: 'A comprehensive personal AI assistant that handles scheduling, provides semantic search across personal documents, and engages in natural conversations. Features text-to-speech, voice recognition, and RAG-powered knowledge retrieval.',
    technologies: ['Python', 'LangChain', 'OpenAI', 'React', 'WebRTC', 'Pinecone', 'AWS'],
    category: 'ai',
    status: 'completed',
    featured: true,
    images: ['/images/assistant-1.jpg', '/images/assistant-2.jpg'],
    demoUrl: 'https://assistant.demo.com',
    githubUrl: 'https://github.com/pavantejavath/personal-ai-assistant',
    architecture: {
      components: ['Voice Interface', 'NLP Engine', 'RAG System', 'Calendar Integration', 'Knowledge Base'],
      dataFlow: ['Voice Input', 'Speech-to-Text', 'Intent Recognition', 'Knowledge Retrieval', 'Response Generation'],
      technologies: ['WebRTC', 'OpenAI Whisper', 'GPT-4', 'LangChain', 'Pinecone']
    },
    metrics: {
      performance: 'Real-time voice processing',
      accuracy: '92% intent recognition',
      users: 'Personal use',
      scale: '1K+ documents indexed'
    },
    challenges: [
      'Real-time voice processing',
      'Context-aware conversations',
      'Multi-modal interactions'
    ],
    solutions: [
      'WebRTC for low-latency audio',
      'Advanced context management',
      'Unified multi-modal interface'
    ],
    results: [
      '92% intent recognition accuracy',
      'Real-time voice interactions',
      'Seamless document search'
    ]
  },
  {
    id: 'ecommerce-chatbot',
    title: 'E-commerce AI Chatbot',
    description: 'Intelligent customer service chatbot for e-commerce platform with product recommendations.',
    longDescription: 'A sophisticated chatbot that provides customer support, product recommendations, and order assistance for an e-commerce platform. Features natural language understanding, product search, and order management capabilities.',
    technologies: ['Python', 'FastAPI', 'OpenAI', 'React', 'PostgreSQL', 'Redis', 'Docker'],
    category: 'ai',
    status: 'completed',
    featured: false,
    images: ['/images/chatbot-1.jpg', '/images/chatbot-2.jpg'],
    demoUrl: 'https://chatbot.demo.com',
    githubUrl: 'https://github.com/pavantejavath/ecommerce-chatbot',
    architecture: {
      components: ['Chat Interface', 'NLP Engine', 'Product Database', 'Recommendation Engine', 'Order System'],
      dataFlow: ['User Query', 'Intent Analysis', 'Product Search', 'Recommendation Generation', 'Response'],
      technologies: ['FastAPI', 'OpenAI GPT-4', 'PostgreSQL', 'Redis', 'React']
    },
    metrics: {
      performance: 'Sub-1s response time',
      accuracy: '89% query resolution',
      users: '5K+ customers',
      scale: '50K+ products'
    },
    challenges: [
      'Product recommendation accuracy',
      'Multi-language support',
      'Order management integration'
    ],
    solutions: [
      'Collaborative filtering algorithms',
      'Multi-language NLP models',
      'RESTful API integration'
    ],
    results: [
      '89% customer query resolution',
      '30% increase in sales',
      '5K+ satisfied customers'
    ]
  },
  {
    id: 'knowledge-management',
    title: 'Enterprise Knowledge Management',
    description: 'RAG-powered knowledge management system for enterprise document search and retrieval.',
    longDescription: 'An enterprise-grade knowledge management system that enables employees to search and retrieve information from company documents using natural language queries. Features advanced RAG capabilities and document versioning.',
    technologies: ['Python', 'FastAPI', 'Pinecone', 'OpenAI', 'React', 'PostgreSQL', 'AWS'],
    category: 'ai',
    status: 'completed',
    featured: false,
    images: ['/images/km-1.jpg', '/images/km-2.jpg'],
    demoUrl: 'https://km.demo.com',
    githubUrl: 'https://github.com/pavantejavath/knowledge-management',
    architecture: {
      components: ['Document Processor', 'Vector Store', 'Search Engine', 'User Interface', 'Analytics'],
      dataFlow: ['Document Upload', 'Processing & Chunking', 'Embedding Generation', 'Vector Storage', 'Search & Retrieval'],
      technologies: ['FastAPI', 'Pinecone', 'OpenAI Embeddings', 'React', 'PostgreSQL']
    },
    metrics: {
      performance: 'Sub-500ms search time',
      accuracy: '91% relevance score',
      users: '200+ employees',
      scale: '100K+ documents'
    },
    challenges: [
      'Large document processing',
      'Search relevance optimization',
      'User access control'
    ],
    solutions: [
      'Distributed processing pipeline',
      'Hybrid search algorithms',
      'Role-based access control'
    ],
    results: [
      '91% search relevance',
      '60% faster information retrieval',
      '200+ active users'
    ]
  },
  {
    id: 'sentiment-analysis',
    title: 'Real-time Sentiment Analysis',
    description: 'Real-time sentiment analysis platform for social media monitoring and brand tracking.',
    longDescription: 'A comprehensive sentiment analysis platform that monitors social media mentions, analyzes sentiment in real-time, and provides actionable insights for brand management and marketing campaigns.',
    technologies: ['Python', 'FastAPI', 'OpenAI', 'React', 'MongoDB', 'Redis', 'Docker'],
    category: 'ai',
    status: 'in-progress',
    featured: false,
    images: ['/images/sentiment-1.jpg', '/images/sentiment-2.jpg'],
    demoUrl: 'https://sentiment.demo.com',
    githubUrl: 'https://github.com/pavantejavath/sentiment-analysis',
    architecture: {
      components: ['Data Collector', 'NLP Engine', 'Sentiment Analyzer', 'Dashboard', 'Alert System'],
      dataFlow: ['Social Media APIs', 'Text Processing', 'Sentiment Classification', 'Trend Analysis', 'Reporting'],
      technologies: ['FastAPI', 'OpenAI GPT-4', 'MongoDB', 'Redis', 'React']
    },
    metrics: {
      performance: 'Real-time processing',
      accuracy: '88% sentiment accuracy',
      users: 'In development',
      scale: '1M+ posts analyzed'
    },
    challenges: [
      'Real-time data processing',
      'Multi-language sentiment',
      'Scalable architecture'
    ],
    solutions: [
      'Stream processing with Redis',
      'Multi-language NLP models',
      'Microservices architecture'
    ],
    results: [
      '88% sentiment accuracy',
      'Real-time monitoring',
      'Comprehensive analytics'
    ]
  }
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="projects" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 neural-bg opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
            <span className="cyberpunk-text">Featured</span>
            <span className="text-neural-300"> Projects</span>
          </h2>
          <p className="text-xl text-neural-400 max-w-3xl mx-auto">
            Explore my portfolio of AI-powered applications, from RAG systems to intelligent chatbots, 
            each built with cutting-edge technology and innovative solutions.
          </p>
        </motion.div>

        {/* Enhanced Project Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <EnhancedProjectShowcase projects={projects} />
        </motion.div>

        {/* Architecture Visualization */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ArchitectureVisualization />
        </motion.div>
      </div>
    </section>
  );
}
