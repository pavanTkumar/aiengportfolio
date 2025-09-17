'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const filters = [
  { id: 'all', label: 'All Projects', icon: '🚀' },
  { id: 'ai', label: 'AI & ML', icon: '🤖' },
  { id: 'web', label: 'Web Apps', icon: '🌐' },
  { id: 'mobile', label: 'Mobile', icon: '📱' },
  { id: 'research', label: 'Research', icon: '🔬' },
];

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            'px-6 py-3 rounded-lg font-medium transition-all duration-300',
            'flex items-center space-x-2',
            activeFilter === filter.id
              ? 'bg-cyberpunk-neon text-neural-900 neural-glow'
              : 'glass text-neural-300 hover:text-cyberpunk-neon hover:bg-neural-800/50'
          )}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-lg">{filter.icon}</span>
          <span>{filter.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
