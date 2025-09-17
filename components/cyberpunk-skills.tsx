'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  LLMIcon, 
  RAGIcon, 
  LangChainIcon, 
  VectorDBIcon,
  PythonIcon, 
  FastAPIIcon, 
  AWSIcon, 
  DockerIcon,
  PostgreSQLIcon,
  RedisIcon,
  GitIcon,
  KubernetesIcon,
  TerraformIcon,
  ReactIcon,
  NextJSIcon,
  TypeScriptIcon,
  TailwindIcon
} from './icons/tech-stack-icons';

const skillsData = [
  {
    category: "AI",
    skills: [
      { name: "Large Language Models", level: 95, icon: LLMIcon },
      { name: "RAG Systems", level: 90, icon: RAGIcon },
      { name: "LangChain", level: 88, icon: LangChainIcon },
      { name: "Vector Databases", level: 90, icon: VectorDBIcon },
      { name: "Prompt Engineering", level: 90, icon: LLMIcon }
    ]
  },
  {
    category: "ML",
    skills: [
      { name: "ML Algorithms", level: 92, icon: PythonIcon },
      { name: "MLOps", level: 88, icon: DockerIcon },
      { name: "Model Deployment", level: 85, icon: AWSIcon },
      { name: "Feature Engineering", level: 90, icon: PythonIcon },
      { name: "Model Evaluation", level: 88, icon: PythonIcon }
    ]
  },
  {
    category: "Deep Learning",
    skills: [
      { name: "TensorFlow", level: 90, icon: PythonIcon },
      { name: "PyTorch", level: 88, icon: PythonIcon },
      { name: "Neural Networks", level: 92, icon: LLMIcon },
      { name: "Transformers", level: 90, icon: LLMIcon },
      { name: "Keras", level: 85, icon: PythonIcon }
    ]
  },
  {
    category: "Computer Vision",
    skills: [
      { name: "OpenCV", level: 88, icon: PythonIcon },
      { name: "Image Processing", level: 90, icon: PythonIcon },
      { name: "Object Detection", level: 85, icon: PythonIcon },
      { name: "Neo4j", level: 80, icon: VectorDBIcon },
      { name: "Graph Databases", level: 82, icon: VectorDBIcon }
    ]
  },
  {
    category: "Languages",
    skills: [
      { name: "Python", level: 95, icon: PythonIcon },
      { name: "JavaScript", level: 85, icon: ReactIcon },
      { name: "TypeScript", level: 80, icon: TypeScriptIcon },
      { name: "R", level: 75, icon: PythonIcon },
      { name: "Cipher Language", level: 70, icon: PythonIcon }
    ]
  }
];

export function CyberpunkSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const hexagonVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -45 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    hover: {
      scale: 1.1,
      rotateY: 10,
      rotateX: 5,
      z: 50,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.5 }
    })
  };

  return (
    <section id="skills" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-bg-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-terminal-green rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-magenta rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl font-terminal text-center mb-16 text-magenta glow-magenta"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="glitch-text" data-text="SKILLS MATRIX">SKILLS MATRIX</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="space-y-6"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
            >
              <h3 className="font-terminal text-2xl text-cyan text-center mb-6 glow-cyan">
                $ {category.category}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="relative group"
                    variants={hexagonVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover="hover"
                    transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Hexagonal Card */}
                    <div className="relative bg-neural-900 border-2 border-terminal-green rounded-lg p-6 hover:border-cyan transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/30 group-hover:bg-neural-800/50">
                      {/* Skill Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-terminal-green group-hover:text-cyan transition-colors duration-300">
                          <skill.icon size={28} />
                        </div>
                        <span className="font-terminal text-lg text-terminal-green group-hover:text-cyan transition-colors duration-300">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Skill Name */}
                      <h4 className="font-mono text-base text-text-light mb-4 group-hover:text-cyan transition-colors duration-300">
                        {skill.name}
                      </h4>
                      
                      {/* Progress Bar */}
                      <div className="relative h-3 bg-neural-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-terminal-green via-cyan to-magenta rounded-full"
                          variants={progressVariants}
                          initial="hidden"
                          animate={isInView ? "visible" : "hidden"}
                          custom={skill.level}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                      
                      {/* Hover Effect */}
                      {hoveredSkill === skill.name && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-terminal-green/10 to-cyan/10 rounded-lg pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="bg-neural-900 border border-magenta rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="font-terminal text-2xl text-magenta mb-4 glow-magenta">
              $ skills --summary
            </h3>
            <p className="text-text-light font-mono text-lg leading-relaxed">
              Specialized in building production-ready AI systems with expertise in RAG architectures, 
              vector databases, and large language models. Proven track record of delivering scalable ML systems 
              with focus on correctness, low latency, and cost efficiency.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {['Production AI', 'Vector Search', 'RAG Systems', 'FastAPI', 'AWS Cloud'].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 bg-terminal-green/20 border border-terminal-green rounded-full text-terminal-green font-mono text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 + (index * 0.1) }}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 255, 0, 0.3)' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
