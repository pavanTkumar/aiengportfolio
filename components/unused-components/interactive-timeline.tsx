'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const timelineData = [
  {
    year: '2025',
    title: 'AI Engineer at Optivus Technologies',
    description: 'Implementing LLM-powered features with RAG pipelines and vector databases. Building production-grade FastAPI microservices with Next.js frontend.',
    achievements: [
      'Built scalable RAG pipeline processing 10K+ documents',
      'Improved response accuracy by 40% through advanced prompt engineering',
      'Deployed AI features serving 50K+ users',
    ],
    technologies: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'Next.js'],
    type: 'work',
  },
  {
    year: '2024-2025',
    title: 'Software Developer at Suviko LLC',
    description: 'Developed cross-platform applications using Flutter, Firebase, and FastAPI. Scaled applications to 1500+ monthly active users.',
    achievements: [
      'Built 3 cross-platform mobile applications',
      'Implemented real-time features using Firebase',
      'Achieved 99.9% uptime for production services',
    ],
    technologies: ['Flutter', 'Firebase', 'FastAPI', 'Dart', 'Python'],
    type: 'work',
  },
  {
    year: '2025',
    title: 'Founder & AI Engineer at The Tejavath',
    description: 'Delivered AI chatbots and platforms for clients including JarongMedia and Bismillahalalfoods. Built assistants with LangChain, Pinecone, and RAG.',
    achievements: [
      'Launched AI chatbot for e-commerce platform',
      'Built custom RAG system for knowledge management',
      'Delivered 5+ AI solutions to clients',
    ],
    technologies: ['LangChain', 'Pinecone', 'RAG', 'AWS', 'React'],
    type: 'entrepreneurship',
  },
  {
    year: '2022-2024',
    title: 'AI Research Assistant at George Mason University',
    description: 'Designed NLP pipelines with HuggingFace Transformers and built RAG prototypes improving accuracy by 92%.',
    achievements: [
      'Published research on transformer architectures',
      'Built RAG prototype with 92% accuracy improvement',
      'Collaborated on 3 research papers',
    ],
    technologies: ['PyTorch', 'HuggingFace', 'Transformers', 'NLP', 'Research'],
    type: 'research',
  },
  {
    year: '2022',
    title: 'M.S. in Information Systems',
    description: 'Graduated with focus on AI and machine learning. Completed thesis on transformer-based language models.',
    achievements: [
      'GPA: 3.8/4.0',
      'Thesis on transformer architectures',
      'Graduate Research Assistant',
    ],
    technologies: ['Machine Learning', 'NLP', 'Research', 'Statistics'],
    type: 'education',
  },
  {
    year: '2022',
    title: 'B.Tech in Computer Science',
    description: 'Graduated with honors. Focused on software engineering and artificial intelligence fundamentals.',
    achievements: [
      'GPA: 3.7/4.0',
      'Dean\'s List for 3 semesters',
      'Final year project on AI chatbot',
    ],
    technologies: ['Computer Science', 'Software Engineering', 'AI Fundamentals'],
    type: 'education',
  },
];

export function InteractiveTimeline() {
  const [activeItem, setActiveItem] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return '#00ffff';
      case 'entrepreneurship': return '#8b5cf6';
      case 'research': return '#f472b6';
      case 'education': return '#10b981';
      default: return '#64748b';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work': return '💼';
      case 'entrepreneurship': return '🚀';
      case 'research': return '🔬';
      case 'education': return '🎓';
      default: return '📅';
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyberpunk-neon via-cyberpunk-purple to-cyberpunk-pink" />

      <div className="space-y-8">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex items-start space-x-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Timeline Dot */}
            <div className="relative z-10">
              <motion.div
                className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center text-2xl',
                  'border-4 border-neural-800 transition-all duration-300'
                )}
                style={{
                  backgroundColor: activeItem === index ? getTypeColor(item.type) : 'transparent',
                  borderColor: hoveredItem === index ? getTypeColor(item.type) : '#1e293b',
                  boxShadow: activeItem === index ? `0 0 20px ${getTypeColor(item.type)}` : 'none',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveItem(index)}
              >
                {getTypeIcon(item.type)}
              </motion.div>
            </div>

            {/* Content */}
            <motion.div
              className={cn(
                'flex-1 glass rounded-lg p-6 transition-all duration-300',
                activeItem === index ? 'neural-glow' : 'hover:bg-neural-800/30'
              )}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-cyberpunk-neon font-mono mb-1">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-neural-200">
                    {item.title}
                  </h3>
                </div>
                <div className="text-sm text-neural-400 capitalize">
                  {item.type}
                </div>
              </div>

              <p className="text-neural-300 mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Achievements */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-cyberpunk-neon mb-2">
                  Key Achievements:
                </h4>
                <ul className="space-y-1">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-neural-400 flex items-start">
                      <span className="text-cyberpunk-green mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-neural-800 text-neural-300 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center mt-12">
        <div className="flex space-x-2">
          {timelineData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveItem(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                activeItem === index ? 'bg-cyberpunk-neon' : 'bg-neural-600'
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
