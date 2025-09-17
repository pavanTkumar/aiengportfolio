'use client';

import { motion } from 'framer-motion';

interface TechIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1, 
    rotate: 2,
    transition: { 
      duration: 0.3, 
      ease: [0.42, 0, 0.58, 1] 
    } 
  },
};

export function LangChainIcon({ className = '', size = 48, animated = true }: TechIconProps) {
  const IconComponent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="langchain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* Chain Links */}
      <path
        d="M12 16C12 12.6863 14.6863 10 18 10H30C33.3137 10 36 12.6863 36 16V20C36 23.3137 33.3137 26 30 26H18C14.6863 26 12 23.3137 12 20V16Z"
        stroke="url(#langchain-gradient)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 28C12 24.6863 14.6863 22 18 22H30C33.3137 22 36 24.6863 36 28V32C36 35.3137 33.3137 38 30 38H18C14.6863 38 12 35.3137 12 32V28Z"
        stroke="url(#langchain-gradient)"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Connection Lines */}
      <path
        d="M24 26V22"
        stroke="url(#langchain-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 10V6"
        stroke="url(#langchain-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 38V42"
        stroke="url(#langchain-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return animated ? (
    <motion.div
      variants={iconVariants}
      initial="rest"
      whileHover="hover"
      className="cursor-pointer"
    >
      {IconComponent}
    </motion.div>
  ) : IconComponent;
}

export function RAGIcon({ className = '', size = 48, animated = true }: TechIconProps) {
  const IconComponent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="rag-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      
      {/* Document Input */}
      <rect
        x="4"
        y="8"
        width="12"
        height="16"
        rx="2"
        stroke="url(#rag-gradient)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M8 12H12M8 16H12M8 20H10"
        stroke="url(#rag-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Vector Transformation */}
      <circle
        cx="24"
        cy="16"
        r="8"
        stroke="url(#rag-gradient)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M20 12L24 16L28 12M20 20L24 16L28 20"
        stroke="url(#rag-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Output */}
      <rect
        x="32"
        y="8"
        width="12"
        height="16"
        rx="2"
        stroke="url(#rag-gradient)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M36 12H40M36 16H40M36 20H38"
        stroke="url(#rag-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Flow Arrows */}
      <path
        d="M16 16H20M28 16H32"
        stroke="url(#rag-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#arrowhead)"
      />
      
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="url(#rag-gradient)"
          />
        </marker>
      </defs>
    </svg>
  );

  return animated ? (
    <motion.div
      variants={iconVariants}
      initial="rest"
      whileHover="hover"
      className="cursor-pointer"
    >
      {IconComponent}
    </motion.div>
  ) : IconComponent;
}

export function VectorDBIcon({ className = '', size = 48, animated = true }: TechIconProps) {
  const IconComponent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="vectordb-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* 3D Space */}
      <rect
        x="8"
        y="8"
        width="32"
        height="32"
        rx="4"
        stroke="url(#vectordb-gradient)"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Vector Points */}
      <circle cx="16" cy="16" r="2" fill="url(#vectordb-gradient)" />
      <circle cx="32" cy="20" r="2" fill="url(#vectordb-gradient)" />
      <circle cx="20" cy="32" r="2" fill="url(#vectordb-gradient)" />
      <circle cx="28" cy="28" r="2" fill="url(#vectordb-gradient)" />
      <circle cx="24" cy="24" r="2" fill="url(#vectordb-gradient)" />
      
      {/* Connection Lines */}
      <path
        d="M16 16L24 24M32 20L24 24M20 32L24 24M28 28L24 24"
        stroke="url(#vectordb-gradient)"
        strokeWidth="1"
        strokeOpacity="0.6"
      />
      
      {/* Dimension Indicators */}
      <path
        d="M8 8L4 4M40 8L44 4M8 40L4 44"
        stroke="url(#vectordb-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  );

  return animated ? (
    <motion.div
      variants={iconVariants}
      initial="rest"
      whileHover="hover"
      className="cursor-pointer"
    >
      {IconComponent}
    </motion.div>
  ) : IconComponent;
}

export function PineconeIcon({ className = '', size = 48, animated = true }: TechIconProps) {
  const IconComponent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="pinecone-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      
      {/* Pine Cone Shape */}
      <path
        d="M24 4L32 12L28 16L36 20L32 24L40 28L36 32L44 36L24 44L4 36L8 32L0 28L4 24L-4 20L0 16L-4 12L16 4Z"
        stroke="url(#pinecone-gradient)"
        strokeWidth="2"
        fill="none"
        transform="translate(4, 2)"
      />
      
      {/* Geometric Pattern */}
      <path
        d="M24 8L28 12L24 16L20 12Z"
        stroke="url(#pinecone-gradient)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M24 20L28 24L24 28L20 24Z"
        stroke="url(#pinecone-gradient)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M24 32L28 36L24 40L20 36Z"
        stroke="url(#pinecone-gradient)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );

  return animated ? (
    <motion.div
      variants={iconVariants}
      initial="rest"
      whileHover="hover"
      className="cursor-pointer"
    >
      {IconComponent}
    </motion.div>
  ) : IconComponent;
}

export function FAISSIcon({ className = '', size = 48, animated = true }: TechIconProps) {
  const IconComponent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="faiss-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      
      {/* Search Magnifying Glass */}
      <circle
        cx="20"
        cy="20"
        r="8"
        stroke="url(#faiss-gradient)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M26 26L32 32"
        stroke="url(#faiss-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Similarity Indicators */}
      <circle cx="36" cy="12" r="3" fill="url(#faiss-gradient)" opacity="0.8" />
      <circle cx="36" cy="20" r="3" fill="url(#faiss-gradient)" opacity="0.6" />
      <circle cx="36" cy="28" r="3" fill="url(#faiss-gradient)" opacity="0.4" />
      <circle cx="36" cy="36" r="3" fill="url(#faiss-gradient)" opacity="0.2" />
      
      {/* Connection Lines */}
      <path
        d="M28 20L33 12M28 20L33 20M28 20L33 28M28 20L33 36"
        stroke="url(#faiss-gradient)"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
    </svg>
  );

  return animated ? (
    <motion.div
      variants={iconVariants}
      initial="rest"
      whileHover="hover"
      className="cursor-pointer"
    >
      {IconComponent}
    </motion.div>
  ) : IconComponent;
}

export function WeaviateIcon({ className = '', size = 48, animated = true }: TechIconProps) {
  const IconComponent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="weaviate-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* Central Hub */}
      <circle
        cx="24"
        cy="24"
        r="6"
        stroke="url(#weaviate-gradient)"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Network Nodes */}
      <circle cx="12" cy="12" r="3" fill="url(#weaviate-gradient)" />
      <circle cx="36" cy="12" r="3" fill="url(#weaviate-gradient)" />
      <circle cx="12" cy="36" r="3" fill="url(#weaviate-gradient)" />
      <circle cx="36" cy="36" r="3" fill="url(#weaviate-gradient)" />
      <circle cx="24" cy="8" r="3" fill="url(#weaviate-gradient)" />
      <circle cx="24" cy="40" r="3" fill="url(#weaviate-gradient)" />
      <circle cx="8" cy="24" r="3" fill="url(#weaviate-gradient)" />
      <circle cx="40" cy="24" r="3" fill="url(#weaviate-gradient)" />
      
      {/* Weaving Connections */}
      <path
        d="M24 18L12 12M24 18L36 12M24 30L12 36M24 30L36 36M18 24L12 12M18 24L12 36M30 24L36 12M30 24L36 36"
        stroke="url(#weaviate-gradient)"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
    </svg>
  );

  return animated ? (
    <motion.div
      variants={iconVariants}
      initial="rest"
      whileHover="hover"
      className="cursor-pointer"
    >
      {IconComponent}
    </motion.div>
  ) : IconComponent;
}

export function LangGraphIcon({ className = '', size = 48, animated = true }: TechIconProps) {
  const IconComponent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="langgraph-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      
      {/* Graph Nodes */}
      <circle cx="12" cy="12" r="4" stroke="url(#langgraph-gradient)" strokeWidth="2" fill="none" />
      <circle cx="36" cy="12" r="4" stroke="url(#langgraph-gradient)" strokeWidth="2" fill="none" />
      <circle cx="12" cy="36" r="4" stroke="url(#langgraph-gradient)" strokeWidth="2" fill="none" />
      <circle cx="36" cy="36" r="4" stroke="url(#langgraph-gradient)" strokeWidth="2" fill="none" />
      <circle cx="24" cy="24" r="4" stroke="url(#langgraph-gradient)" strokeWidth="2" fill="none" />
      
      {/* Directed Edges */}
      <path
        d="M16 12L32 12"
        stroke="url(#langgraph-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#arrowhead-graph)"
      />
      <path
        d="M12 16L12 32"
        stroke="url(#langgraph-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#arrowhead-graph)"
      />
      <path
        d="M16 36L32 36"
        stroke="url(#langgraph-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#arrowhead-graph)"
      />
      <path
        d="M36 16L36 32"
        stroke="url(#langgraph-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#arrowhead-graph)"
      />
      <path
        d="M20 20L28 28"
        stroke="url(#langgraph-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#arrowhead-graph)"
      />
      
      <defs>
        <marker
          id="arrowhead-graph"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="url(#langgraph-gradient)"
          />
        </marker>
      </defs>
    </svg>
  );

  return animated ? (
    <motion.div
      variants={iconVariants}
      initial="rest"
      whileHover="hover"
      className="cursor-pointer"
    >
      {IconComponent}
    </motion.div>
  ) : IconComponent;
}

// Technology mapping for easy access
export const techIcons = {
  langchain: LangChainIcon,
  rag: RAGIcon,
  vectordb: VectorDBIcon,
  pinecone: PineconeIcon,
  faiss: FAISSIcon,
  weaviate: WeaviateIcon,
  langgraph: LangGraphIcon,
} as const;

export type TechIconName = keyof typeof techIcons;
