'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { AndroidIcon, IOSIcon } from './icons/platform-icons';
import { 
  PromptFlowsStudioImage, 
  RecruitAIImage, 
  MyAIThetejavathImage, 
  LearnKannadaImage, 
  FishPondImage, 
  CafeConnectImage 
} from './project-images';

const projectsData = [
  {
    id: 1,
    title: "PromptFlows Studio",
    description: "Platform for RAG + agent workflows with CoT prompting and LangGraph orchestration",
    longDescription: "Built a comprehensive platform for RAG and agent workflows featuring Chain of Thought prompting, LangGraph orchestration, and retrieval evaluation. Enables developers to create sophisticated AI applications with advanced reasoning capabilities.",
    image: PromptFlowsStudioImage,
    technologies: ["LangChain", "Pinecone", "FastAPI", "Streamlit", "Python"],
    category: "AI/ML",
    status: "completed",
    metrics: {
      performance: "Advanced CoT",
      accuracy: "High precision",
      features: "Full RAG pipeline"
    },
    features: [
      "Chain of Thought prompting workflows",
      "LangGraph orchestration for complex agents",
      "Retrieval evaluation and optimization",
      "Interactive Streamlit interface",
      "Production-ready FastAPI backend"
    ],
    githubUrl: null, // Private repo
    liveUrl: null // Not available
  },
  {
    id: 2,
    title: "RecruitAI",
    description: "AI-powered recruitment assistant with automated candidate screening",
    longDescription: "Developed an AI-powered recruitment assistant prototype that automates candidate screening through embeddings and semantic search. Integrated into a full-stack application with Flask backend and React frontend.",
    image: RecruitAIImage,
    technologies: ["FAISS", "Flask", "React", "Python", "Machine Learning"],
    category: "AI/ML",
    status: "completed",
    metrics: {
      performance: "Automated screening",
      accuracy: "High precision",
      efficiency: "10x faster"
    },
    features: [
      "Automated candidate screening via embeddings",
      "Semantic search for resume matching",
      "Full-stack integration with React/Flask",
      "Real-time candidate evaluation",
      "Scalable vector search architecture"
    ],
    githubUrl: null, // Private repo
    liveUrl: null // Not available
  },
  {
    id: 3,
    title: "myai.thetejavath.com",
    description: "Personal GenAI assistant for scheduling, semantic search, and conversations",
    longDescription: "Built a personal Generative AI assistant featuring scheduling capabilities, semantic search, and natural conversations with Text-to-Speech and RAG integration. Deployed on cloud infrastructure with Google Calendar API integration.",
    image: MyAIThetejavathImage,
    technologies: ["Pinecone", "LangChain", "Google Calendar API", "Python", "Cloud"],
    category: "AI/ML",
    status: "completed",
    metrics: {
      performance: "Real-time responses",
      accuracy: "Context-aware",
      integration: "Calendar sync"
    },
    features: [
      "Personal scheduling and calendar management",
      "Semantic search across personal data",
      "Natural conversation with TTS capabilities",
      "RAG integration for knowledge retrieval",
      "Google Calendar API integration"
    ],
    githubUrl: "https://github.com/pavanTkumar/myai-assistant",
    liveUrl: "https://myai.thetejavath.com"
  },
  {
    id: 4,
    title: "Fish Pond App",
    description: "Cross-platform mobile app for fish pond management with real-time features",
    longDescription: "Developed a cross-platform mobile application using Flutter, Firebase, and FastAPI. Integrated APIs, push notifications, analytics dashboards, and real-time sync pipelines for fish pond management.",
    image: FishPondImage,
    technologies: ["Flutter", "Firebase", "FastAPI", "Dart", "Python"],
    category: "Mobile",
    status: "completed",
    metrics: {
      performance: "1000+ MAUs",
      platforms: "Cross-platform",
      features: "Real-time sync"
    },
    features: [
      "Cross-platform Flutter development",
      "Firebase integration for real-time data",
      "Push notifications and analytics",
      "FastAPI backend with real-time sync",
      "Scalable architecture for growth"
    ],
    githubUrl: null, // Private repo
    liveUrl: null // Not available
  },
  {
    id: 5,
    title: "CaféConnect App",
    description: "Cross-platform mobile app for café management and customer engagement",
    longDescription: "Developed a cross-platform mobile application using Flutter, Firebase, and FastAPI. Integrated APIs, push notifications, analytics dashboards, and real-time sync pipelines for café management and customer engagement.",
    image: CafeConnectImage,
    technologies: ["Flutter", "Firebase", "FastAPI", "Dart", "Python"],
    category: "Mobile",
    status: "completed",
    metrics: {
      performance: "500+ MAUs",
      platforms: "Cross-platform",
      features: "Real-time sync"
    },
    features: [
      "Cross-platform Flutter development",
      "Firebase integration for real-time data",
      "Push notifications and analytics",
      "FastAPI backend with real-time sync",
      "Scalable architecture for growth"
    ],
    githubUrl: null, // Private repo
    liveUrl: null // Not available
  },
  {
    id: 6,
    title: "Learn Kannada by Suviko",
    description: "Educational mobile app for learning Kannada language with flashcards and quizzes",
    longDescription: "Developed a comprehensive language learning app for Kannada with flashcards, audio support, quizzes, and multilingual support. Available on both Android and iOS platforms with dark mode and progress tracking.",
    image: LearnKannadaImage,
    technologies: ["Flutter", "Dart", "Audio Processing", "Localization", "Cross-platform"],
    category: "Mobile",
    status: "completed",
    metrics: {
      performance: "Educational focus",
      platforms: "Android & iOS",
      features: "Multilingual support"
    },
    features: [
      "Flashcards designed to boost memory",
      "Audio pronunciation to speak like a local",
      "Short quizzes to test and reinforce knowledge",
      "Multilingual support (Telugu, English, Hindi, Kannada)",
      "Dark mode and progress tracking"
    ],
    githubUrl: "https://github.com/pavanTkumar/Kannada_App",
    liveUrl: null, // Multiple store links instead
    storeLinks: {
      android: "https://play.google.com/store/apps/details?id=com.suviko.learn_kannada.internal&pcampaignid=web_share",
      ios: "https://apps.apple.com/in/app/learn-kannada-by-suviko/id6741718580"
    }
  }
];

const categories = ['all', 'AI/ML', 'Mobile'];

export function CyberpunkProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = filter === 'all' 
    ? projectsData
    : projectsData.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.9,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        filter: { duration: 0.6 }
      }
    },
    hover: {
      scale: 1.03,
      y: -8,
      boxShadow: "0 25px 50px rgba(0, 255, 255, 0.4), 0 0 30px rgba(0, 255, 0, 0.2)",
      borderColor: "rgba(0, 255, 255, 0.8)",
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        boxShadow: { duration: 0.3 }
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <section id="projects" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-bg-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-terminal-green rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-cyan rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl font-terminal text-center mb-16 text-terminal-green glow-green"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="glitch-text" data-text="PROJECTS SHOWCASE">PROJECTS SHOWCASE</span>
        </motion.h2>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              className={`cyberpunk-btn px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === cat 
                  ? 'bg-terminal-green text-bg-dark border-terminal-green' 
                  : 'border-terminal-green text-terminal-green hover:border-cyan hover:text-cyan'
              }`}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.toUpperCase()}
              {filter === cat && <span className="ml-2 animate-pulse">_</span>}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              className="relative bg-neural-900 border border-terminal-green rounded-lg overflow-hidden cursor-pointer group backdrop-blur-sm"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
              style={{ 
                background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.05) 0%, rgba(0, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <project.image className="w-full h-full" />
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-mono ${
                    project.status === 'completed' 
                      ? 'bg-terminal-green text-bg-dark' 
                      : 'bg-cyan text-bg-dark'
                  }`}>
                    {project.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="font-terminal text-xl text-cyan mb-2 group-hover:text-terminal-green transition-colors duration-300">
                  $ {project.title}
                </h3>
                <p className="text-text-light text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-neural-800 border border-terminal-green rounded text-xs font-mono text-terminal-green">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-neural-800 border border-cyan rounded text-xs font-mono text-cyan">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-terminal-green font-bold">{value}</div>
                      <div className="text-text-light">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              {hoveredProject === project.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-terminal-green/10 to-cyan/10 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-bg-dark bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="relative bg-neural-900 border border-cyan rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-cyan hover:text-terminal-green transition-colors duration-200 text-2xl font-terminal"
                  onClick={() => setSelectedProject(null)}
                >
                  [X]
                </button>
                
                <h3 className="font-terminal text-3xl text-terminal-green mb-4 glow-green">
                  $ {selectedProject.title}
                </h3>
                <p className="text-text-light mb-6 text-lg">{selectedProject.longDescription}</p>
                
                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-terminal text-xl text-cyan mb-3">Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-text-light">
                        <span className="text-terminal-green mr-2 mt-1">▶</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="font-terminal text-xl text-cyan mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-2 bg-neural-800 border border-terminal-green rounded-lg text-sm font-mono text-terminal-green">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {/* GitHub Code Button */}
                  {selectedProject.githubUrl ? (
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyberpunk-btn px-6 py-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Code
                    </motion.a>
                  ) : (
                    <motion.button
                      disabled
                      className="cyberpunk-btn-disabled px-6 py-2 opacity-50 cursor-not-allowed"
                      title="Sorry for not being able to show the code due to security reasons/ the repo is private"
                    >
                      View Code
                    </motion.button>
                  )}

                  {selectedProject.liveUrl ? (
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyberpunk-btn px-6 py-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                    </motion.a>
                  ) : selectedProject.storeLinks ? (
                    // Special handling for apps with store links
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-text-light mb-2">Download App:</span>
                      <div className="flex gap-3">
                        <motion.a
                          href={selectedProject.storeLinks.android}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cyberpunk-btn px-4 py-2 flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <AndroidIcon size={16} />
                          Android
                        </motion.a>
                        <motion.a
                          href={selectedProject.storeLinks.ios}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cyberpunk-btn px-4 py-2 flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <IOSIcon size={16} />
                          iOS
                        </motion.a>
                      </div>
                    </div>
                  ) : (
                    <motion.button
                      disabled
                      className="cyberpunk-btn-disabled px-6 py-2 opacity-50 cursor-not-allowed"
                      title="Sorry for not being able to show the live demo due to security reasons/ the repo is private"
                    >
                      Live Demo
                    </motion.button>
                  )}

                  {'caseStudy' in selectedProject && selectedProject.caseStudy && (
                    <motion.a
                      href={selectedProject.caseStudy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyberpunk-btn px-6 py-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Case Study
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
