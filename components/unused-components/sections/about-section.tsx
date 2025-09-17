'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import SkillsMatrix from '@/components/skills-matrix';
import TimelineExplorer from '@/components/timeline-explorer';
import { AnimatedStats } from '@/components/animated-stats';
import { PhotoGallery } from '@/components/photo-gallery';
import { Testimonials } from '@/components/testimonials';

export function AboutSection() {
  const [activeTab, setActiveTab] = useState('overview');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👨‍💻' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'journey', label: 'Journey', icon: '🚀' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬' },
  ];

  return (
    <section id="about" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 neural-bg opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
            <span className="cyberpunk-text">About</span>
            <span className="text-neural-300"> Me</span>
          </h2>
          <p className="text-xl text-neural-400 max-w-3xl mx-auto">
            Passionate AI Engineer with expertise in building intelligent systems that transform how we interact with technology.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-cyberpunk-neon text-neural-900 neural-glow'
                  : 'glass text-neural-300 hover:text-cyberpunk-neon hover:bg-neural-800/50'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          className="min-h-[600px]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {activeTab === 'overview' && (
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-cyberpunk-neon mb-4">
                  AI Engineer & Full-Stack Developer
                </h3>
                <p className="text-lg text-neural-300 leading-relaxed">
                  I specialize in building production-grade AI systems using cutting-edge technologies like 
                  Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and vector databases. 
                  My expertise spans the entire AI development lifecycle, from research and prototyping to 
                  deployment and scaling.
                </p>
                <p className="text-lg text-neural-300 leading-relaxed">
                  With a strong foundation in machine learning, natural language processing, and full-stack 
                  development, I create intelligent solutions that understand context, learn from data, and 
                  provide meaningful interactions. I'm passionate about pushing the boundaries of what's 
                  possible with AI technology.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <AnimatedStats />
                </div>
              </div>
              
              <div className="relative">
                <PhotoGallery />
              </div>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SkillsMatrix />
            </motion.div>
          )}

          {activeTab === 'journey' && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <TimelineExplorer />
            </motion.div>
          )}

          {activeTab === 'testimonials' && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Testimonials />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
