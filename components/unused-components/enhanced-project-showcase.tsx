'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { techIcons, TechIconName } from '@/components/icons/tech-icons';
import { TiltCard, RippleButton, ShimmerEffect } from '@/components/micro-interactions';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: TechIconName[];
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  metrics: {
    performance: string;
    accuracy: string;
    users: string;
    uptime?: string;
  };
  features: string[];
  challenges: string[];
  solutions: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudy?: string;
}

interface EnhancedProjectShowcaseProps {
  projects: Project[];
  className?: string;
}

export default function EnhancedProjectShowcase({ projects, className = '' }: EnhancedProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.status === 'completed').slice(0, 3);

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      {/* Filter Tabs */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {categories.map((category) => (
          <RippleButton
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              filter === category
                ? 'bg-cyberpunk-neon text-neural-900 neural-glow'
                : 'glass text-neural-300 hover:text-cyberpunk-neon hover:bg-neural-800/50'
            }`}
          >
            {category === 'all' ? 'All Projects' : category}
          </RippleButton>
        ))}
      </motion.div>

      {/* Featured Projects */}
      <motion.div
        className="grid lg:grid-cols-2 gap-8 mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <TiltCard
              className="h-full glass rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <ShimmerEffect className="absolute inset-0">
                  <div className="w-full h-full bg-gradient-to-br from-cyberpunk-neon/20 to-cyberpunk-purple/20 flex items-center justify-center">
                    <div className="text-6xl opacity-50">🚀</div>
                  </div>
                </ShimmerEffect>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-cyberpunk-neon text-neural-900 rounded-full text-sm font-semibold">
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyberpunk-neon transition-colors">
                  {project.title}
                </h3>
                <p className="text-neural-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => {
                    const IconComponent = techIcons[tech];
                    return IconComponent ? (
                      <div key={tech} className="flex items-center space-x-1 px-2 py-1 bg-neural-800 rounded-full">
                        <IconComponent size={16} animated={false} />
                        <span className="text-xs text-neural-300 capitalize">{tech}</span>
                      </div>
                    ) : null;
                  })}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-neural-700 text-neural-300 rounded-full text-xs">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-cyberpunk-neon font-semibold">{project.metrics.performance}</div>
                    <div className="text-neural-400">Performance</div>
                  </div>
                  <div>
                    <div className="text-cyberpunk-neon font-semibold">{project.metrics.accuracy}</div>
                    <div className="text-neural-400">Accuracy</div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* All Projects Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <TiltCard
              className="h-full glass rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <ShimmerEffect className="absolute inset-0">
                  <div className="w-full h-full bg-gradient-to-br from-cyberpunk-neon/20 to-cyberpunk-purple/20 flex items-center justify-center">
                    <div className="text-4xl opacity-50">⚡</div>
                  </div>
                </ShimmerEffect>
              </div>

              <div className="p-4">
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyberpunk-neon transition-colors">
                  {project.title}
                </h4>
                <p className="text-neural-300 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech) => {
                    const IconComponent = techIcons[tech];
                    return IconComponent ? (
                      <div key={tech} className="flex items-center space-x-1 px-2 py-1 bg-neural-800 rounded-full">
                        <IconComponent size={12} animated={false} />
                        <span className="text-xs text-neural-300 capitalize">{tech}</span>
                      </div>
                    ) : null;
                  })}
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' 
                      ? 'bg-cyberpunk-green/20 text-cyberpunk-green'
                      : project.status === 'in-progress'
                      ? 'bg-cyberpunk-orange/20 text-cyberpunk-orange'
                      : 'bg-cyberpunk-purple/20 text-cyberpunk-purple'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-cyberpunk-neon text-sm font-semibold">
                    {project.metrics.accuracy}
                  </span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-neural-900/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                    <p className="text-neural-300 text-lg">{selectedProject.description}</p>
                  </div>
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg hover:bg-neural-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6 text-neural-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Description</h3>
                      <p className="text-neural-300 leading-relaxed">{selectedProject.longDescription}</p>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start space-x-2 text-neural-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-cyberpunk-neon mt-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.technologies.map((tech) => {
                          const IconComponent = techIcons[tech];
                          return IconComponent ? (
                            <motion.div
                              key={tech}
                              className="flex items-center space-x-2 px-3 py-2 bg-neural-800 rounded-lg"
                              whileHover={{ scale: 1.05 }}
                            >
                              <IconComponent size={20} animated={false} />
                              <span className="text-sm text-neural-300 capitalize">{tech}</span>
                            </motion.div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Metrics */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Performance Metrics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-neural-800 rounded-lg">
                          <div className="text-2xl font-bold text-cyberpunk-neon">{selectedProject.metrics.performance}</div>
                          <div className="text-sm text-neural-400">Performance</div>
                        </div>
                        <div className="p-4 bg-neural-800 rounded-lg">
                          <div className="text-2xl font-bold text-cyberpunk-neon">{selectedProject.metrics.accuracy}</div>
                          <div className="text-sm text-neural-400">Accuracy</div>
                        </div>
                        <div className="p-4 bg-neural-800 rounded-lg">
                          <div className="text-2xl font-bold text-cyberpunk-neon">{selectedProject.metrics.users}</div>
                          <div className="text-sm text-neural-400">Users</div>
                        </div>
                        {selectedProject.metrics.uptime && (
                          <div className="p-4 bg-neural-800 rounded-lg">
                            <div className="text-2xl font-bold text-cyberpunk-neon">{selectedProject.metrics.uptime}</div>
                            <div className="text-sm text-neural-400">Uptime</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Challenges & Solutions */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Challenges & Solutions</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-semibold text-cyberpunk-orange mb-2">Challenges</h4>
                          <ul className="space-y-1">
                            {selectedProject.challenges.map((challenge, index) => (
                              <li key={index} className="text-sm text-neural-300">• {challenge}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-cyberpunk-green mb-2">Solutions</h4>
                          <ul className="space-y-1">
                            {selectedProject.solutions.map((solution, index) => (
                              <li key={index} className="text-sm text-neural-300">• {solution}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4">
                      {selectedProject.githubUrl && (
                        <RippleButton
                          onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                          className="flex items-center space-x-2 px-4 py-2 bg-neural-800 hover:bg-neural-700 text-white rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span>GitHub</span>
                        </RippleButton>
                      )}
                      {selectedProject.liveUrl && (
                        <RippleButton
                          onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                          className="flex items-center space-x-2 px-4 py-2 bg-cyberpunk-neon hover:bg-cyberpunk-neon/90 text-neural-900 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span>Live Demo</span>
                        </RippleButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
