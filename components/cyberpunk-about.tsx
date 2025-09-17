'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const aboutData = {
  education: {
    title: "$ info --education",
    content: [
      "M.S. in Information Systems - George Mason University (2022-2024)",
      "B.Tech in Computer Science - KL University, Hyderabad",
      "Research Focus: NLP pipelines with HuggingFace Transformers",
      "Specialization: Information Extraction & RAG Systems"
    ]
  },
  expertise: {
    title: "$ info --expertise",
    content: [
      "Large Language Models & RAG Pipelines",
      "Vector Databases (Pinecone, FAISS, Weaviate)",
      "Production AI Systems with FastAPI & AWS",
      "Full-Stack Integration (React/Next.js + Python)",
      "Guardrails, Evaluation Workflows & CI/CD"
    ]
  },
  philosophy: {
    title: "$ info --philosophy",
    content: [
      "Delivering production-grade AI assistants and chatbots",
      "Building scalable ML systems with end-to-end ownership",
      "Focusing on correctness, low latency, and cost efficiency",
      "Committed to structured outputs, validation, and observability"
    ]
  }
};

const terminalCode = `import { RAGPipeline } from '@/ai-systems'
import { VectorStore } from '@/databases'
import { LLM } from '@/models'

class PavanTejavath {
  constructor() {
    this.specialties = ['LLMs', 'RAG', 'VectorDBs', 'FastAPI']
    this.experience = '3+ years'
    this.currentRole = 'AI Engineer @ Optivus Technologies'
    this.passion = 'Production AI Systems'
  }

  async buildRAGSystem(query: string) {
    const embeddings = await this.generateEmbeddings(query)
    const context = await this.retrieveRelevantDocs(embeddings)
    const response = await this.generateResponse(context, query)
    
    return {
      answer: response,
      sources: context.sources,
      confidence: response.confidence,
      latency: '< 100ms',
      cost: 'optimized'
    }
  }

  shipProductionFeatures() {
    // FastAPI microservices with Next.js frontend
    // Full observability: structured logs, traces, metrics
    // Guardrails with structured outputs and validation
    // End-to-end ownership from design to deployment
  }
}

const engineer = new PavanTejavath()
console.log('System initialized:', engineer.specialties)`;

export function CyberpunkAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const codeVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-bg-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, #00ff00 100%),
            linear-gradient(0deg, transparent 98%, #00ff00 100%)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl font-terminal text-center mb-16 text-terminal-green glow-green"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="glitch-text" data-text="ABOUT SYSTEM">ABOUT SYSTEM</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Information Cards */}
          <div className="space-y-8">
            {Object.entries(aboutData).map(([key, data], index) => (
              <motion.div
                key={key}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.2 }}
                className="bg-neural-900 border border-terminal-green rounded-lg p-6 hover:border-cyan transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/20"
              >
                <h3 className="font-terminal text-xl text-terminal-green mb-4 glow-green">
                  {data.title}
                </h3>
                <ul className="space-y-2">
                  {data.content.map((item, i) => (
                    <motion.li
                      key={i}
                      className="text-text-light font-mono text-sm flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: (index * 0.2) + (i * 0.1) }}
                    >
                      <span className="text-terminal-green mr-2">▶</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Terminal Window */}
          <motion.div
            variants={codeVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className="bg-black border border-cyan rounded-lg overflow-hidden"
          >
            <div className="bg-neural-800 px-4 py-2 flex items-center border-b border-cyan">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 font-terminal text-sm text-cyan">terminal.exe</span>
            </div>
            <div className="p-4 font-mono text-sm">
              <pre className="text-terminal-green whitespace-pre-wrap">
                <motion.code
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {terminalCode}
                </motion.code>
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {[
            { label: "Years Experience", value: "3+", color: "text-terminal-green" },
            { label: "AI Projects", value: "15+", color: "text-cyan" },
            { label: "Vector DBs", value: "3", color: "text-magenta" },
            { label: "Production Systems", value: "5+", color: "text-terminal-green" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-neural-900 border border-terminal-green rounded-lg hover:border-cyan transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + (index * 0.1) }}
            >
              <div className={`text-3xl font-terminal font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-text-light text-sm font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
