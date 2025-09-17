'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const skillCategories = [
  {
    name: 'AI & ML',
    color: '#00ffff',
    skills: [
      { name: 'Large Language Models', level: 95, years: 3 },
      { name: 'RAG Pipelines', level: 90, years: 2 },
      { name: 'Vector Databases', level: 88, years: 2 },
      { name: 'Embeddings', level: 92, years: 3 },
      { name: 'Prompt Engineering', level: 94, years: 3 },
      { name: 'Fine-tuning', level: 85, years: 2 },
    ]
  },
  {
    name: 'Backend',
    color: '#8b5cf6',
    skills: [
      { name: 'Python', level: 95, years: 4 },
      { name: 'FastAPI', level: 90, years: 3 },
      { name: 'LangChain', level: 88, years: 2 },
      { name: 'AWS', level: 85, years: 3 },
      { name: 'Docker', level: 87, years: 3 },
      { name: 'PostgreSQL', level: 82, years: 3 },
    ]
  },
  {
    name: 'Frontend',
    color: '#f472b6',
    skills: [
      { name: 'React', level: 90, years: 3 },
      { name: 'Next.js', level: 88, years: 2 },
      { name: 'TypeScript', level: 85, years: 2 },
      { name: 'Three.js', level: 75, years: 1 },
      { name: 'Tailwind CSS', level: 92, years: 3 },
      { name: 'Framer Motion', level: 80, years: 2 },
    ]
  },
  {
    name: 'Tools',
    color: '#10b981',
    skills: [
      { name: 'Git', level: 90, years: 4 },
      { name: 'CI/CD', level: 85, years: 3 },
      { name: 'Jupyter', level: 88, years: 3 },
      { name: 'VS Code', level: 95, years: 4 },
      { name: 'Figma', level: 70, years: 2 },
      { name: 'Postman', level: 85, years: 3 },
    ]
  }
];

export function SkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4">
        {skillCategories.map((category, index) => (
          <motion.button
            key={category.name}
            onClick={() => setActiveCategory(index)}
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all duration-300',
              activeCategory === index
                ? 'text-neural-900 neural-glow'
                : 'glass text-neural-300 hover:text-cyberpunk-neon hover:bg-neural-800/50'
            )}
            style={{
              backgroundColor: activeCategory === index ? category.color : undefined,
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {skillCategories[activeCategory].skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="glass rounded-lg p-6 hover:bg-neural-800/30 transition-all duration-300"
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold text-neural-200">
                {skill.name}
              </h4>
              <div className="text-sm text-neural-400">
                {skill.years} years
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-neural-800 rounded-full h-2 mb-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: skillCategories[activeCategory].color }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                />
              </div>
              <div className="text-sm text-neural-400">
                {skill.level}% proficiency
              </div>
            </div>

            {hoveredSkill === index && (
              <motion.div
                className="absolute -top-2 -right-2 bg-cyberpunk-neon text-neural-900 px-3 py-1 rounded-full text-sm font-bold"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                {skill.level}%
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Skills Summary */}
      <motion.div
        className="glass rounded-lg p-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-cyberpunk-neon mb-4">
          Technical Expertise Summary
        </h3>
        <p className="text-neural-300 leading-relaxed max-w-3xl mx-auto">
          With over 3 years of experience in AI and machine learning, I've developed expertise across 
          the entire technology stack. From building sophisticated RAG pipelines to deploying scalable 
          AI applications, I combine deep technical knowledge with practical implementation skills.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[
            { label: 'AI Projects', value: '50+' },
            { label: 'Technologies', value: '25+' },
            { label: 'Years Experience', value: '3+' },
            { label: 'Certifications', value: '5' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            >
              <div className="text-3xl font-bold cyberpunk-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neural-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
