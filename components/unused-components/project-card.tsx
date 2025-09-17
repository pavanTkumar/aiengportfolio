'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onClick: () => void;
  variant?: 'default' | 'compact';
}

export function ProjectCard({ project, isHovered, onClick, variant = 'default' }: ProjectCardProps) {
  const isCompact = variant === 'compact';

  return (
    <motion.div
      className={cn(
        'relative glass rounded-lg overflow-hidden cursor-pointer group',
        isCompact ? 'h-80' : 'h-96'
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow: isHovered 
          ? '0 0 30px rgba(0, 255, 255, 0.3)' 
          : '0 0 20px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-cyberpunk-neon/20 via-cyberpunk-purple/20 to-cyberpunk-pink/20 flex items-center justify-center">
          <div className="text-6xl opacity-50">
            {project.category === 'ai' ? '🤖' : 
             project.category === 'web' ? '🌐' : 
             project.category === 'mobile' ? '📱' : '🔬'}
          </div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neural-900/90 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={cn(
            'px-3 py-1 rounded-full text-xs font-medium',
            project.status === 'completed' ? 'bg-cyberpunk-green text-neural-900' :
            project.status === 'in-progress' ? 'bg-cyberpunk-orange text-neural-900' :
            'bg-cyberpunk-pink text-neural-900'
          )}>
            {project.status === 'completed' ? 'Completed' :
             project.status === 'in-progress' ? 'In Progress' : 'Planned'}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-cyberpunk-neon text-neural-900 rounded-full text-xs font-bold">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neural-200 mb-2 group-hover:text-cyberpunk-neon transition-colors">
          {project.title}
        </h3>
        
        <p className={cn(
          'text-neural-400 mb-4',
          isCompact ? 'text-sm line-clamp-2' : 'line-clamp-3'
        )}>
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, isCompact ? 3 : 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-neural-800 text-neural-300 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > (isCompact ? 3 : 4) && (
            <span className="px-2 py-1 bg-neural-800 text-neural-300 text-xs rounded-full">
              +{project.technologies.length - (isCompact ? 3 : 4)}
            </span>
          )}
        </div>

        {/* Metrics (only for default variant) */}
        {!isCompact && project.metrics && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-sm font-semibold text-cyberpunk-neon">
                  {value}
                </div>
                <div className="text-xs text-neural-500 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <motion.button
            className="flex-1 px-4 py-2 bg-cyberpunk-neon text-neural-900 rounded-lg font-medium hover:bg-cyberpunk-neon/80 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              if (project.demoUrl) window.open(project.demoUrl, '_blank');
            }}
          >
            View Demo
          </motion.button>
          
          {project.githubUrl && (
            <motion.button
              className="px-4 py-2 glass text-cyberpunk-neon rounded-lg font-medium hover:bg-neural-800/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubUrl, '_blank');
              }}
            >
              Code
            </motion.button>
          )}
        </div>
      </div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyberpunk-neon/10 via-cyberpunk-purple/10 to-cyberpunk-pink/10 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
