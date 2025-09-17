'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const experienceData = [
  {
    id: 1,
    company: "Optivus Technologies",
    role: "AI Engineer",
    period: "Sept 2025 - Present",
    type: "current",
    description: "Design and implement LLM-powered features using RAG pipelines and vector DBs",
    achievements: [
      "Ship production-grade FastAPI microservices integrated with Next.js frontend",
      "Built guardrails with structured outputs, validation, caching, and prompt-safety",
      "Ensuring correctness, low latency, and cost efficiency in AI systems",
      "Full observability with structured logs, traces, and metrics"
    ],
    technologies: ["Python", "FastAPI", "LangChain", "Pinecone", "AWS", "Next.js"],
    color: "terminal-green"
  },
  {
    id: 2,
    company: "Suviko LLC",
    role: "Software Developer",
    period: "July 2024 - Sept 2025",
    type: "previous",
    description: "Developed cross-platform apps using Flutter, Firebase, and FastAPI",
    achievements: [
      "Scaled Fish Pond and CaféConnect apps to 1500+ MAUs",
      "Integrated APIs, push notifications, and analytics dashboards",
      "Built real-time sync pipelines across event applications",
      "Full-stack development with cross-platform mobile solutions"
    ],
    technologies: ["Flutter", "Firebase", "FastAPI", "Python", "Dart"],
    color: "cyan"
  },
  {
    id: 3,
    company: "The Tejavath (Founder)",
    role: "Founder / AI + Full Stack Engineer",
    period: "Jan 2025 - Sept 2025",
    type: "previous",
    description: "Delivered AI chatbots and digital platforms for various clients",
    achievements: [
      "Built AI assistants with LangChain, Pinecone, RAG for semantic search",
      "Enabled memory-based reasoning and multi-agent orchestration",
      "Integrated AI features into React/Next.js + FastAPI stacks",
      "Deployed on AWS (Lambda, EC2) with CI/CD pipelines"
    ],
    technologies: ["LangChain", "Pinecone", "React", "Next.js", "FastAPI", "AWS"],
    color: "magenta"
  },
  {
    id: 4,
    company: "George Mason University",
    role: "AI Research Assistant",
    period: "Sept 2022 - May 2024",
    type: "previous",
    description: "Designed NLP pipelines with HuggingFace Transformers for information extraction",
    achievements: [
      "Built RAG prototypes improving accuracy by 92%",
      "Benchmarked FAISS, Weaviate, Qdrant for semantic search",
      "Automated ingestion workflows using AWS Glue + Athena",
      "Research focus on information extraction and NLP pipelines"
    ],
    technologies: ["Python", "HuggingFace", "FAISS", "Weaviate", "AWS", "PyTorch"],
    color: "terminal-green"
  }
];

export function CyberpunkExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timelineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: index * 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.2,
      transition: { duration: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: index * 0.3 + 0.5,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="experience" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-bg-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terminal-green rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl font-terminal text-center mb-16 text-terminal-green glow-green"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="glitch-text" data-text="EXPERIENCE TIMELINE">EXPERIENCE TIMELINE</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div ref={lineRef} className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-neural-800 transform md:-translate-x-0.5 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-terminal-green via-cyan to-magenta"
              style={{ height: lineFill }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {experienceData.map((experience, index) => (
              <motion.div
                key={experience.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={index}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    className={`w-4 h-4 rounded-full border-2 ${
                      experience.color === 'terminal-green' ? 'border-terminal-green bg-terminal-green' :
                      experience.color === 'cyan' ? 'border-cyan bg-cyan' :
                      'border-magenta bg-magenta'
                    }`}
                    variants={nodeVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover="hover"
                    custom={index}
                  >
                    <motion.div
                      className={`w-full h-full rounded-full ${
                        experience.color === 'terminal-green' ? 'bg-terminal-green' :
                        experience.color === 'cyan' ? 'bg-cyan' :
                        'bg-magenta'
                      }`}
                      style={{
                        filter: 'drop-shadow(0 0 6px rgba(0,255,255,0.6))'
                      }}
                    />
                  </motion.div>
                </div>

                {/* Experience Card */}
                <div className={`ml-16 md:ml-0 w-full md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <motion.div
                    className="bg-neural-900 border border-terminal-green rounded-lg p-6 hover:border-cyan transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/20"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-terminal text-xl text-cyan mb-1">
                          $ {experience.role}
                        </h3>
                        <h4 className="font-mono text-lg text-terminal-green">
                          {experience.company}
                        </h4>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm text-text-light">
                          {experience.period}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          experience.type === 'current' 
                            ? 'bg-terminal-green text-bg-dark' 
                            : 'bg-neural-800 text-text-light'
                        }`}>
                          {experience.type.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-text-light mb-4 text-sm">
                      {experience.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h5 className="font-terminal text-sm text-cyan mb-2">Key Achievements:</h5>
                      <ul className="space-y-1">
                        {experience.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            className="text-text-light text-xs flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: (index * 0.3) + 0.8 + (i * 0.1) }}
                          >
                            <span className="text-terminal-green mr-2 mt-1">▶</span>
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-neural-800 border border-terminal-green rounded text-xs font-mono text-terminal-green"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="bg-neural-900 border border-magenta rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="font-terminal text-2xl text-magenta mb-4 glow-magenta">
              $ experience --summary
            </h3>
            <p className="text-text-light font-mono text-lg leading-relaxed">
              Over 3 years of experience building production AI systems, with expertise in RAG architectures, 
              vector databases, and large language models. Delivered scalable solutions serving thousands of users 
              in production environments with focus on correctness, low latency, and cost efficiency.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: "Years Experience", value: "3+" },
                { label: "Companies", value: "4" },
                { label: "AI Projects", value: "15+" },
                { label: "MAUs Served", value: "1500+" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="p-4 bg-neural-800 border border-terminal-green rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 2 + (index * 0.1) }}
                >
                  <div className="text-2xl font-terminal text-terminal-green font-bold">
                    {stat.value}
                  </div>
                  <div className="text-text-light text-sm font-mono">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
