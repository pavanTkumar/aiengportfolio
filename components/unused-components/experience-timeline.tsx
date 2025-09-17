'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience } from '@/types';
import { cn } from '@/lib/utils';

interface ExperienceTimelineProps {
  experiences: Experience[];
  activeExperience: number;
  onExperienceChange: (index: number) => void;
}

export function ExperienceTimeline({ experiences, activeExperience, onExperienceChange }: ExperienceTimelineProps) {
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);

  const getTypeColor = (index: number) => {
    const colors = ['#00ffff', '#8b5cf6', '#f472b6', '#10b981'];
    return colors[index % colors.length];
  };

  const getTypeIcon = (experience: Experience) => {
    if (experience.current) return '💼';
    if (experience.company.includes('University')) return '🎓';
    if (experience.position.includes('Founder')) return '🚀';
    return '💻';
  };

  return (
    <div className="space-y-8">
      {/* Timeline Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {experiences.map((experience, index) => (
          <motion.button
            key={experience.id}
            onClick={() => onExperienceChange(index)}
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all duration-300',
              'flex items-center space-x-2',
              activeExperience === index
                ? 'neural-glow'
                : 'glass text-neural-300 hover:text-cyberpunk-neon hover:bg-neural-800/50'
            )}
            style={{
              backgroundColor: activeExperience === index ? getTypeColor(index) : undefined,
              color: activeExperience === index ? '#0f172a' : undefined,
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredExperience(index)}
            onMouseLeave={() => setHoveredExperience(null)}
          >
            <span className="text-lg">{getTypeIcon(experience)}</span>
            <span>{experience.company}</span>
            {experience.current && (
              <span className="px-2 py-1 bg-cyberpunk-green text-neural-900 text-xs rounded-full">
                Current
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Timeline Content */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyberpunk-neon via-cyberpunk-purple to-cyberpunk-pink" />

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className="relative flex items-start space-x-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredExperience(index)}
              onMouseLeave={() => setHoveredExperience(null)}
            >
              {/* Timeline Dot */}
              <div className="relative z-10">
                <motion.div
                  className={cn(
                    'w-16 h-16 rounded-full flex items-center justify-center text-2xl',
                    'border-4 border-neural-800 transition-all duration-300'
                  )}
                  style={{
                    backgroundColor: activeExperience === index ? getTypeColor(index) : 'transparent',
                    borderColor: hoveredExperience === index ? getTypeColor(index) : '#1e293b',
                    boxShadow: activeExperience === index ? `0 0 20px ${getTypeColor(index)}` : 'none',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onExperienceChange(index)}
                >
                  {getTypeIcon(experience)}
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                className={cn(
                  'flex-1 glass rounded-lg p-6 transition-all duration-300',
                  activeExperience === index ? 'neural-glow' : 'hover:bg-neural-800/30'
                )}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-cyberpunk-neon font-mono mb-1">
                      {new Date(experience.startDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })} - {experience.endDate ? 
                        new Date(experience.endDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        }) : 'Present'}
                    </div>
                    <h3 className="text-2xl font-bold text-neural-200 mb-1">
                      {experience.position}
                    </h3>
                    <div className="text-lg text-cyberpunk-neon font-semibold">
                      {experience.company}
                    </div>
                    <div className="text-sm text-neural-400">
                      {experience.location}
                    </div>
                  </div>
                  {experience.current && (
                    <div className="px-3 py-1 bg-cyberpunk-green text-neural-900 text-sm rounded-full font-bold">
                      Current Role
                    </div>
                  )}
                </div>

                <p className="text-neural-300 mb-6 leading-relaxed">
                  {experience.description}
                </p>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-cyberpunk-neon mb-3">
                    Key Achievements:
                  </h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-cyberpunk-green mr-2 mt-1">•</span>
                        <span className="text-neural-300 text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-cyberpunk-purple mb-3">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-neural-800 text-neural-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h4 className="text-sm font-semibold text-cyberpunk-orange mb-3">
                    Notable Projects:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.projects.map((project, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-cyberpunk-orange/20 text-cyberpunk-orange text-xs rounded-full border border-cyberpunk-orange/30"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience Navigation */}
      <div className="flex justify-center mt-12">
        <div className="flex space-x-2">
          {experiences.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => onExperienceChange(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                activeExperience === index ? 'neural-glow' : 'bg-neural-600'
              )}
              style={{
                backgroundColor: activeExperience === index ? getTypeColor(index) : undefined,
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
