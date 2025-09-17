'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { CareerPath3D } from '@/components/3d/career-path-3d';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

const experiences = [
  {
    id: 'optivus',
    company: 'Optivus Technologies',
    position: 'AI Engineer',
    location: 'Remote',
    startDate: '2025-09-01',
    endDate: null,
    current: true,
    description: 'Implementing LLM-powered features with RAG pipelines and vector databases. Building production-grade FastAPI microservices with Next.js frontend.',
    achievements: [
      'Built scalable RAG pipeline processing 10K+ documents',
      'Improved response accuracy by 40% through advanced prompt engineering',
      'Deployed AI features serving 50K+ users',
      'Implemented guardrails with structured outputs and validation',
    ],
    technologies: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'Next.js', 'AWS', 'Docker'],
    projects: ['RAG Pipeline System', 'AI Chat Interface', 'Vector Search Engine'],
    logo: '/images/optivus-logo.png',
  },
  {
    id: 'suviko',
    company: 'Suviko LLC',
    position: 'Software Developer',
    location: 'Remote',
    startDate: '2024-07-01',
    endDate: '2025-09-01',
    current: false,
    description: 'Developed cross-platform applications using Flutter, Firebase, and FastAPI. Scaled applications to 1500+ monthly active users.',
    achievements: [
      'Built 3 cross-platform mobile applications',
      'Implemented real-time features using Firebase',
      'Achieved 99.9% uptime for production services',
      'Reduced app load time by 60% through optimization',
    ],
    technologies: ['Flutter', 'Firebase', 'FastAPI', 'Dart', 'Python', 'PostgreSQL'],
    projects: ['Mobile E-commerce App', 'Real-time Chat System', 'Analytics Dashboard'],
    logo: '/images/suviko-logo.png',
  },
  {
    id: 'thetejavath',
    company: 'The Tejavath',
    position: 'Founder & AI Engineer',
    location: 'Remote',
    startDate: '2025-01-01',
    endDate: '2025-09-01',
    current: false,
    description: 'Delivered AI chatbots and platforms for clients including JarongMedia and Bismillahalalfoods. Built assistants with LangChain, Pinecone, and RAG.',
    achievements: [
      'Launched AI chatbot for e-commerce platform',
      'Built custom RAG system for knowledge management',
      'Delivered 5+ AI solutions to clients',
      'Generated $50K+ in revenue',
    ],
    technologies: ['LangChain', 'Pinecone', 'RAG', 'AWS', 'React', 'Python', 'OpenAI'],
    projects: ['E-commerce AI Chatbot', 'Knowledge Management System', 'Client AI Solutions'],
    logo: '/images/thetejavath-logo.png',
  },
  {
    id: 'gmu',
    company: 'George Mason University',
    position: 'AI Research Assistant',
    location: 'Fairfax, VA',
    startDate: '2022-09-01',
    endDate: '2024-05-01',
    current: false,
    description: 'Designed NLP pipelines with HuggingFace Transformers and built RAG prototypes improving accuracy by 92%.',
    achievements: [
      'Published research on transformer architectures',
      'Built RAG prototype with 92% accuracy improvement',
      'Collaborated on 3 research papers',
      'Presented findings at 2 international conferences',
    ],
    technologies: ['PyTorch', 'HuggingFace', 'Transformers', 'NLP', 'Research', 'Python'],
    projects: ['RAG Research Prototype', 'Transformer Architecture Study', 'NLP Pipeline Development'],
    logo: '/images/gmu-logo.png',
  },
];

export function ExperienceSection() {
  const [activeExperience, setActiveExperience] = useState(0);
  const [viewMode, setViewMode] = useState<'timeline' | '3d'>('timeline');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="experience" ref={ref} className="py-20 relative overflow-hidden">
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
            <span className="cyberpunk-text">Career</span>
            <span className="text-neural-300"> Journey</span>
          </h2>
          <p className="text-xl text-neural-400 max-w-3xl mx-auto">
            My professional journey through AI research, software development, and entrepreneurship. 
            Each role has shaped my expertise in building intelligent systems.
          </p>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex bg-neural-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                viewMode === 'timeline'
                  ? 'bg-cyberpunk-neon text-neural-900'
                  : 'text-neural-300 hover:text-cyberpunk-neon'
              }`}
            >
              Timeline View
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                viewMode === '3d'
                  ? 'bg-cyberpunk-neon text-neural-900'
                  : 'text-neural-300 hover:text-cyberpunk-neon'
              }`}
            >
              3D Journey
            </button>
          </div>
        </motion.div>

        {/* Experience Content */}
        <motion.div
          className="min-h-[600px]"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {viewMode === 'timeline' ? (
            <ExperienceTimeline 
              experiences={experiences}
              activeExperience={activeExperience}
              onExperienceChange={setActiveExperience}
            />
          ) : (
            <div className="h-96 glass rounded-lg overflow-hidden">
              <Suspense fallback={<div className="w-full h-full bg-neural-800 flex items-center justify-center">Loading 3D...</div>}>
                <Canvas
                  camera={{ position: [0, 0, 10], fov: 75 }}
                  style={{ background: 'transparent' }}
                >
                  <CareerPath3D 
                    experiences={experiences}
                    activeExperience={activeExperience}
                    onExperienceChange={setActiveExperience}
                  />
                </Canvas>
              </Suspense>
            </div>
          )}
        </motion.div>

        {/* Experience Stats */}
        <motion.div
          className="mt-16 grid md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { label: 'Years Experience', value: '3+', icon: '⏰' },
            { label: 'Companies', value: '4', icon: '🏢' },
            { label: 'Projects Delivered', value: '20+', icon: '🚀' },
            { label: 'Technologies', value: '25+', icon: '🛠️' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center glass rounded-lg p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold cyberpunk-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neural-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
