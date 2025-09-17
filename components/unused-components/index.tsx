export { LangChainIcon } from './langchain-icon';
export { RAGIcon } from './rag-icon';
export { VectorDBIcon } from './vector-db-icon';
export { PineconeIcon } from './pinecone-icon';
export { FAISSIcon } from './faiss-icon';
export { WeaviateIcon } from './weaviate-icon';
export { LangGraphIcon } from './langgraph-icon';

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
