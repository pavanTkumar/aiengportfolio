'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 0-100
  color: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface SkillsMatrixProps {
  className?: string;
}

const skills: Skill[] = [
  // AI/ML Skills
  { id: 'llm', name: 'LLMs', category: 'AI/ML', proficiency: 95, color: '#00ff88' },
  { id: 'rag', name: 'RAG', category: 'AI/ML', proficiency: 98, color: '#00ff88' },
  { id: 'embeddings', name: 'Embeddings', category: 'AI/ML', proficiency: 92, color: '#00ff88' },
  { id: 'vector-db', name: 'Vector DBs', category: 'AI/ML', proficiency: 90, color: '#00ff88' },
  { id: 'langchain', name: 'LangChain', category: 'AI/ML', proficiency: 88, color: '#00ff88' },
  { id: 'pinecone', name: 'Pinecone', category: 'AI/ML', proficiency: 85, color: '#00ff88' },
  { id: 'faiss', name: 'FAISS', category: 'AI/ML', proficiency: 82, color: '#00ff88' },
  { id: 'weaviate', name: 'Weaviate', category: 'AI/ML', proficiency: 80, color: '#00ff88' },
  { id: 'langgraph', name: 'LangGraph', category: 'AI/ML', proficiency: 85, color: '#00ff88' },
  { id: 'crewai', name: 'CrewAI', category: 'AI/ML', proficiency: 78, color: '#00ff88' },
  
  // Programming Languages
  { id: 'python', name: 'Python', category: 'Programming', proficiency: 95, color: '#ff6b35' },
  { id: 'javascript', name: 'JavaScript', category: 'Programming', proficiency: 88, color: '#ff6b35' },
  { id: 'typescript', name: 'TypeScript', category: 'Programming', proficiency: 85, color: '#ff6b35' },
  { id: 'react', name: 'React', category: 'Programming', proficiency: 90, color: '#ff6b35' },
  { id: 'nextjs', name: 'Next.js', category: 'Programming', proficiency: 87, color: '#ff6b35' },
  { id: 'fastapi', name: 'FastAPI', category: 'Programming', proficiency: 92, color: '#ff6b35' },
  { id: 'flask', name: 'Flask', category: 'Programming', proficiency: 85, color: '#ff6b35' },
  
  // Databases
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases', proficiency: 88, color: '#8b5cf6' },
  { id: 'pgvector', name: 'pgvector', category: 'Databases', proficiency: 85, color: '#8b5cf6' },
  { id: 'neo4j', name: 'Neo4j', category: 'Databases', proficiency: 75, color: '#8b5cf6' },
  { id: 'redis', name: 'Redis', category: 'Databases', proficiency: 80, color: '#8b5cf6' },
  
  // Cloud & DevOps
  { id: 'aws', name: 'AWS', category: 'Cloud/DevOps', proficiency: 85, color: '#06b6d4' },
  { id: 'docker', name: 'Docker', category: 'Cloud/DevOps', proficiency: 88, color: '#06b6d4' },
  { id: 'cicd', name: 'CI/CD', category: 'Cloud/DevOps', proficiency: 82, color: '#06b6d4' },
  { id: 'lambda', name: 'Lambda', category: 'Cloud/DevOps', proficiency: 80, color: '#06b6d4' },
  { id: 's3', name: 'S3', category: 'Cloud/DevOps', proficiency: 85, color: '#06b6d4' },
  { id: 'ec2', name: 'EC2', category: 'Cloud/DevOps', proficiency: 78, color: '#06b6d4' },
];

const categoryColors = {
  'AI/ML': '#00ff88',
  'Programming': '#ff6b35',
  'Databases': '#8b5cf6',
  'Cloud/DevOps': '#06b6d4',
};

export default function SkillsMatrix({ className }: SkillsMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize skills with random positions and velocities
    const initializedSkills = skills.map(skill => ({
      ...skill,
      x: Math.random() * canvas.width / window.devicePixelRatio,
      y: Math.random() * canvas.height / window.devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    let currentSkills = [...initializedSkills];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      // Update positions
      currentSkills = currentSkills.map(skill => {
        let newX = skill.x! + skill.vx!;
        let newY = skill.y! + skill.vy!;
        let newVx = skill.vx!;
        let newVy = skill.vy!;

        // Bounce off walls
        if (newX < 0 || newX > canvas.width / window.devicePixelRatio) {
          newVx = -newVx;
          newX = Math.max(0, Math.min(canvas.width / window.devicePixelRatio, newX));
        }
        if (newY < 0 || newY > canvas.height / window.devicePixelRatio) {
          newVy = -newVy;
          newY = Math.max(0, Math.min(canvas.height / window.devicePixelRatio, newY));
        }

        return {
          ...skill,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
        };
      });

      // Draw connections between skills in the same category
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < currentSkills.length; i++) {
        for (let j = i + 1; j < currentSkills.length; j++) {
          const skill1 = currentSkills[i];
          const skill2 = currentSkills[j];
          
          if (skill1.category === skill2.category) {
            const distance = Math.sqrt(
              Math.pow(skill1.x! - skill2.x!, 2) + Math.pow(skill1.y! - skill2.y!, 2)
            );
            
            if (distance < 150) {
              const opacity = Math.max(0, 1 - distance / 150);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
              ctx.beginPath();
              ctx.moveTo(skill1.x!, skill1.y!);
              ctx.lineTo(skill2.x!, skill2.y!);
              ctx.stroke();
            }
          }
        }
      }

      // Draw skills
      currentSkills.forEach(skill => {
        const radius = Math.max(8, (skill.proficiency / 100) * 20);
        const isHovered = hoveredSkill?.id === skill.id;
        const isSelected = selectedSkill?.id === skill.id;
        
        // Glow effect
        if (isHovered || isSelected) {
          const gradient = ctx.createRadialGradient(
            skill.x!, skill.y!, 0,
            skill.x!, skill.y!, radius * 2
          );
          gradient.addColorStop(0, `${skill.color}40`);
          gradient.addColorStop(1, `${skill.color}00`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(skill.x!, skill.y!, radius * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Skill circle
        ctx.fillStyle = skill.color;
        ctx.beginPath();
        ctx.arc(skill.x!, skill.y!, radius, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = isHovered || isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = isHovered || isSelected ? 2 : 1;
        ctx.stroke();

        // Proficiency ring
        ctx.strokeStyle = skill.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(skill.x!, skill.y!, radius + 5, 0, (skill.proficiency / 100) * Math.PI * 2);
        ctx.stroke();
      });

      if (isAnimating) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredSkill, selectedSkill, isAnimating]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find clicked skill
    const clickedSkill = skills.find(skill => {
      const radius = Math.max(8, (skill.proficiency / 100) * 20);
      const distance = Math.sqrt(Math.pow(skill.x! - x, 2) + Math.pow(skill.y! - y, 2));
      return distance <= radius;
    });

    setSelectedSkill(clickedSkill || null);
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find hovered skill
    const hovered = skills.find(skill => {
      const radius = Math.max(8, (skill.proficiency / 100) * 20);
      const distance = Math.sqrt(Math.pow(skill.x! - x, 2) + Math.pow(skill.y! - y, 2));
      return distance <= radius;
    });

    setHoveredSkill(hovered || null);
  };

  return (
    <div className={cn('relative w-full h-96 glass rounded-2xl overflow-hidden', className)}>
      <div className="absolute inset-0 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Skills Matrix</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-cyberpunk-neon"></div>
              <span className="text-neural-300">AI/ML</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-cyberpunk-orange"></div>
              <span className="text-neural-300">Programming</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-cyberpunk-purple"></div>
              <span className="text-neural-300">Databases</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-cyberpunk-cyan"></div>
              <span className="text-neural-300">Cloud/DevOps</span>
            </div>
          </div>
        </div>
        
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-pointer"
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={() => setHoveredSkill(null)}
        />
      </div>

      {/* Skill Details Panel */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 glass-strong rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">{selectedSkill.name}</h4>
                <p className="text-sm text-neural-300">{selectedSkill.category}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-cyberpunk-neon">
                  {selectedSkill.proficiency}%
                </div>
                <div className="w-20 h-2 bg-neural-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyberpunk-neon"
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.proficiency}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredSkill && !selectedSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 glass rounded-lg p-3"
          >
            <div className="text-sm">
              <div className="font-semibold text-white">{hoveredSkill.name}</div>
              <div className="text-neural-300">{hoveredSkill.proficiency}% proficiency</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}