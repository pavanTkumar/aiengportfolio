'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'work' | 'education' | 'project';
  color: string;
}

interface TimelineExplorerProps {
  className?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'optivus',
    title: 'AI Engineer',
    company: 'Optivus Technologies',
    period: 'Sept 2025 - Present',
    description: 'Implementing LLM-powered features with RAG pipelines and vector databases, shipping production-grade FastAPI microservices with Next.js frontend.',
    achievements: [
      'Built production-grade RAG pipelines with 95% accuracy',
      'Implemented vector database solutions for 1M+ documents',
      'Developed guardrails with structured outputs and validation',
      'Shipped FastAPI microservices with Next.js frontend'
    ],
    technologies: ['Python', 'FastAPI', 'Next.js', 'RAG', 'Vector DBs', 'LLMs'],
    type: 'work',
    color: '#00ff88'
  },
  {
    id: 'suviko',
    title: 'Software Developer',
    company: 'Suviko LLC',
    period: 'Jul 2024 - Sept 2025',
    description: 'Developed cross-platform applications using Flutter, Firebase, and FastAPI, scaling to 1500+ monthly active users.',
    achievements: [
      'Scaled applications to 1500+ MAUs',
      'Built cross-platform Flutter applications',
      'Implemented Firebase backend solutions',
      'Developed FastAPI microservices'
    ],
    technologies: ['Flutter', 'Firebase', 'FastAPI', 'Dart', 'Python'],
    type: 'work',
    color: '#ff6b35'
  },
  {
    id: 'thetejavath',
    title: 'Founder/AI Engineer',
    company: 'The Tejavath',
    period: 'Jan 2025 - Sept 2025',
    description: 'Delivered AI chatbots and platforms for clients including JarongMedia and Bismillahalalfoods, built assistants with LangChain, Pinecone, and RAG.',
    achievements: [
      'Delivered AI chatbots for multiple clients',
      'Built LangChain-based AI assistants',
      'Implemented Pinecone vector databases',
      'Deployed solutions on AWS infrastructure'
    ],
    technologies: ['LangChain', 'Pinecone', 'RAG', 'AWS', 'Python', 'React'],
    type: 'work',
    color: '#8b5cf6'
  },
  {
    id: 'gmu-research',
    title: 'AI Research Assistant',
    company: 'George Mason University',
    period: 'Sep 2022 - May 2024',
    description: 'Designed NLP pipelines with HuggingFace Transformers and built RAG prototypes improving accuracy by 92%.',
    achievements: [
      'Improved RAG accuracy by 92%',
      'Designed NLP pipelines with HuggingFace',
      'Built transformer-based models',
      'Published research on RAG optimization'
    ],
    technologies: ['HuggingFace', 'Transformers', 'PyTorch', 'NLP', 'RAG'],
    type: 'work',
    color: '#06b6d4'
  },
  {
    id: 'ms-degree',
    title: 'M.S. Information Systems',
    company: 'George Mason University',
    period: 'Aug 2022 - May 2024',
    description: 'Master\'s degree in Information Systems with focus on AI, machine learning, and data science.',
    achievements: [
      'Graduated with distinction',
      'Specialized in AI and ML',
      'Completed thesis on RAG optimization',
      'Published 2 research papers'
    ],
    technologies: ['Python', 'Machine Learning', 'Data Science', 'AI'],
    type: 'education',
    color: '#f59e0b'
  },
  {
    id: 'btech-degree',
    title: 'B.Tech Computer Science',
    company: 'KL University',
    period: 'Jul 2018 - May 2022',
    description: 'Bachelor\'s degree in Computer Science with focus on software engineering and algorithms.',
    achievements: [
      'Graduated with honors',
      'Specialized in software engineering',
      'Completed capstone project on AI',
      'Active in coding competitions'
    ],
    technologies: ['C++', 'Java', 'Data Structures', 'Algorithms'],
    type: 'education',
    color: '#ef4444'
  }
];

export default function TimelineExplorer({ className }: TimelineExplorerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    
    setScrollProgress(progress);
    setIsScrolling(true);
    
    setTimeout(() => setIsScrolling(false), 150);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'work':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        );
      case 'education':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case 'project':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn('relative w-full', className)}>
      {/* Timeline Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Career Timeline</h3>
        <p className="text-neural-300">Explore my journey through AI engineering and software development</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="w-full h-1 bg-neural-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-purple"
            style={{ width: `${scrollProgress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between text-xs text-neural-400 mt-2">
          <span>2018</span>
          <span>2025</span>
        </div>
      </div>

      {/* Timeline Container */}
      <div
        ref={containerRef}
        className="flex space-x-8 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.id}
            className="flex-shrink-0 w-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className={cn(
                'relative glass rounded-2xl p-6 cursor-pointer transition-all duration-300',
                'hover:glass-strong hover:scale-105',
                selectedEvent?.id === event.id && 'glass-strong scale-105'
              )}
              onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Event Type Indicator */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full"
                  style={{ backgroundColor: `${event.color}20` }}
                >
                  <div style={{ color: event.color }}>
                    {getEventIcon(event.type)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neural-400">{event.period}</div>
                  <div className="text-xs text-neural-500 capitalize">{event.type}</div>
                </div>
              </div>

              {/* Event Content */}
              <div className="mb-4">
                <h4 className="text-lg font-bold text-white mb-1">{event.title}</h4>
                <p className="text-cyberpunk-neon font-medium">{event.company}</p>
                <p className="text-sm text-neural-300 mt-2 line-clamp-3">{event.description}</p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {event.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ 
                      backgroundColor: `${event.color}20`,
                      color: event.color,
                      border: `1px solid ${event.color}40`
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {event.technologies.length > 4 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-neural-700 text-neural-300">
                    +{event.technologies.length - 4}
                  </span>
                )}
              </div>

              {/* Connection Line */}
              {index < timelineEvents.length - 1 && (
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-neural-600"></div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Event View */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 glass-strong rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">{selectedEvent.title}</h4>
                <p className="text-xl text-cyberpunk-neon mb-1">{selectedEvent.company}</p>
                <p className="text-neural-300">{selectedEvent.period}</p>
              </div>
              <motion.button
                onClick={() => setSelectedEvent(null)}
                className="p-2 rounded-lg hover:bg-neural-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-neural-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Description */}
              <div>
                <h5 className="text-lg font-semibold text-white mb-3">Description</h5>
                <p className="text-neural-300 leading-relaxed">{selectedEvent.description}</p>
              </div>

              {/* Achievements */}
              <div>
                <h5 className="text-lg font-semibold text-white mb-3">Key Achievements</h5>
                <ul className="space-y-2">
                  {selectedEvent.achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-2 text-neural-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: selectedEvent.color }}
                      />
                      <span className="text-sm">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-6">
              <h5 className="text-lg font-semibold text-white mb-3">Technologies Used</h5>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{ 
                      backgroundColor: `${selectedEvent.color}20`,
                      color: selectedEvent.color,
                      border: `1px solid ${selectedEvent.color}40`
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
