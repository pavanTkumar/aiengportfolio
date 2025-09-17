'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'challenges', label: 'Challenges', icon: '🎯' },
    { id: 'results', label: 'Results', icon: '📊' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-neural-900/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-6xl max-h-[90vh] glass-strong rounded-2xl overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-neural-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-cyberpunk-neon mb-2">
                  {project.title}
                </h2>
                <p className="text-neural-300">
                  {project.longDescription}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-neural-800 hover:bg-neural-700 rounded-full flex items-center justify-center text-neural-400 hover:text-cyberpunk-neon transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 py-4 border-b border-neural-700">
            <div className="flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                    'flex items-center space-x-2',
                    activeTab === tab.id
                      ? 'bg-cyberpunk-neon text-neural-900'
                      : 'text-neural-300 hover:text-cyberpunk-neon hover:bg-neural-800/50'
                  )}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Project Images */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-cyberpunk-neon/20 to-cyberpunk-purple/20 rounded-lg flex items-center justify-center">
                      <div className="text-6xl opacity-50">
                        {project.category === 'ai' ? '🤖' : '🌐'}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={cn(
                            'w-16 h-16 rounded-lg bg-gradient-to-br from-cyberpunk-neon/20 to-cyberpunk-purple/20 flex items-center justify-center',
                            currentImageIndex === index ? 'ring-2 ring-cyberpunk-neon' : ''
                          )}
                        >
                          <span className="text-2xl opacity-50">
                            {project.category === 'ai' ? '🤖' : '🌐'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-cyberpunk-neon mb-2">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-neural-800 text-neural-300 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.metrics && (
                      <div>
                        <h3 className="text-lg font-semibold text-cyberpunk-neon mb-2">
                          Key Metrics
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(project.metrics).map(([key, value]) => (
                            <div key={key} className="text-center p-3 bg-neural-800/50 rounded-lg">
                              <div className="text-lg font-bold text-cyberpunk-neon">
                                {value}
                              </div>
                              <div className="text-xs text-neural-400 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && project.architecture && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-cyberpunk-neon mb-3">
                      Components
                    </h3>
                    <ul className="space-y-2">
                      {project.architecture.components.map((component, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-cyberpunk-green mr-2">•</span>
                          <span className="text-neural-300 text-sm">{component}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-cyberpunk-neon mb-3">
                      Data Flow
                    </h3>
                    <ul className="space-y-2">
                      {project.architecture.dataFlow.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-cyberpunk-orange mr-2">→</span>
                          <span className="text-neural-300 text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-cyberpunk-neon mb-3">
                      Tech Stack
                    </h3>
                    <ul className="space-y-2">
                      {project.architecture.technologies.map((tech, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-cyberpunk-purple mr-2">⚡</span>
                          <span className="text-neural-300 text-sm">{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'challenges' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-cyberpunk-pink mb-3">
                      Challenges Faced
                    </h3>
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-cyberpunk-pink mr-2">⚠️</span>
                          <span className="text-neural-300">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-cyberpunk-green mb-3">
                      Solutions Implemented
                    </h3>
                    <ul className="space-y-3">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-cyberpunk-green mr-2">✅</span>
                          <span className="text-neural-300">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-cyberpunk-neon mb-4">
                  Project Results & Impact
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.results.map((result, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-neural-800/50 rounded-lg border border-cyberpunk-neon/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start">
                        <span className="text-cyberpunk-neon mr-2">🎯</span>
                        <span className="text-neural-300 text-sm">{result}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-neural-700 flex justify-between items-center">
            <div className="flex space-x-4">
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-cyberpunk-neon text-neural-900 rounded-lg font-medium hover:bg-cyberpunk-neon/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Live Demo
                </motion.a>
              )}
              
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 glass text-cyberpunk-neon rounded-lg font-medium hover:bg-neural-800/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Source Code
                </motion.a>
              )}
            </div>
            
            <button
              onClick={onClose}
              className="px-6 py-2 text-neural-400 hover:text-cyberpunk-neon transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
