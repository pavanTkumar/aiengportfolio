export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'ai' | 'web' | 'mobile' | 'research';
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  architecture?: {
    components: string[];
    dataFlow: string[];
    technologies: string[];
  };
  metrics?: {
    performance: string;
    accuracy?: string;
    users?: string;
    scale?: string;
  };
  challenges: string[];
  solutions: string[];
  results: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  projects: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  category: 'ai' | 'backend' | 'frontend' | 'database' | 'cloud' | 'tools';
  level: number; // 1-10
  years: number;
  projects: number;
  description: string;
  certifications?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  icon?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
  relevantCourses: string[];
  logo?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  budget?: string;
  timeline?: string;
}

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
  direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount: number | 'infinite';
}

export interface ParticleConfig {
  count: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
  shape: 'circle' | 'square' | 'triangle' | 'star';
  behavior: 'float' | 'orbit' | 'flow' | 'explode' | 'attract';
}

export interface NeuralNode {
  id: string;
  x: number;
  y: number;
  z: number;
  connections: string[];
  type: 'input' | 'hidden' | 'output' | 'attention';
  activation: number;
  color: string;
}

export interface VectorEmbedding {
  id: string;
  vector: number[];
  text: string;
  metadata: Record<string, any>;
  cluster?: number;
  similarity?: number;
}

export interface RAGPipeline {
  documents: string[];
  chunks: string[];
  embeddings: VectorEmbedding[];
  query: string;
  retrieved: VectorEmbedding[];
  response: string;
  confidence: number;
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  effects: {
    glow: boolean;
    hologram: boolean;
    particles: boolean;
    animations: boolean;
  };
}

export interface PerformanceMetrics {
  fps: number;
  memory: number;
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

export interface DeviceCapabilities {
  webgl: boolean;
  webgl2: boolean;
  webAudio: boolean;
  webWorkers: boolean;
  serviceWorker: boolean;
  touch: boolean;
  accelerometer: boolean;
  gyroscope: boolean;
  haptic: boolean;
  highDPI: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavigationItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  color: string;
  username: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  coverImage?: string;
}

export interface Analytics {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
  referrers: Array<{
    source: string;
    count: number;
  }>;
  devices: Array<{
    type: string;
    percentage: number;
  }>;
}
