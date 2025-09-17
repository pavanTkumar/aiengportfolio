import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutElastic(t: number): number {
  const c4 = (2 * Math.PI) / 3;
  return t === 0
    ? 0
    : t === 1
    ? 1
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function calculateAngle(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.atan2(y2 - y1, x2 - x1);
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function detectDeviceCapabilities(): {
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
} {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const gl2 = canvas.getContext('webgl2');
  
  return {
    webgl: !!gl,
    webgl2: !!gl2,
    webAudio: !!(window.AudioContext || (window as any).webkitAudioContext),
    webWorkers: typeof Worker !== 'undefined',
    serviceWorker: 'serviceWorker' in navigator,
    touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    accelerometer: 'DeviceMotionEvent' in window,
    gyroscope: 'DeviceOrientationEvent' in window,
    haptic: 'vibrate' in navigator,
    highDPI: window.devicePixelRatio > 1,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    highContrast: window.matchMedia('(prefers-contrast: high)').matches,
  };
}

export function getPerformanceMetrics(): {
  fps: number;
  memory: number;
  loadTime: number;
  renderTime: number;
  interactionTime: number;
} {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const memory = (performance as any).memory;
  
  return {
    fps: 60, // This would need to be calculated in real-time
    memory: memory ? memory.usedJSHeapSize / 1024 / 1024 : 0,
    loadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
    renderTime: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
    interactionTime: navigation ? navigation.domInteractive - navigation.fetchStart : 0,
  };
}

export function createParticleSystem(config: {
  count: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
  shape: 'circle' | 'square' | 'triangle' | 'star';
  behavior: 'float' | 'orbit' | 'flow' | 'explode' | 'attract';
}): Array<{
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}> {
  const particles = [];
  
  for (let i = 0; i < config.count; i++) {
    particles.push({
      id: generateId(),
      x: getRandomFloat(0, window.innerWidth),
      y: getRandomFloat(0, window.innerHeight),
      vx: getRandomFloat(-config.speed, config.speed),
      vy: getRandomFloat(-config.speed, config.speed),
      size: getRandomFloat(config.size * 0.5, config.size * 1.5),
      color: config.color,
      opacity: config.opacity,
      life: 1,
      maxLife: 1,
    });
  }
  
  return particles;
}

export function updateParticles(
  particles: Array<{
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    opacity: number;
    life: number;
    maxLife: number;
  }>,
  deltaTime: number
): void {
  particles.forEach(particle => {
    particle.x += particle.vx * deltaTime;
    particle.y += particle.vy * deltaTime;
    particle.life -= deltaTime * 0.1;
    
    // Boundary checking
    if (particle.x < 0 || particle.x > window.innerWidth) {
      particle.vx *= -1;
    }
    if (particle.y < 0 || particle.y > window.innerHeight) {
      particle.vy *= -1;
    }
    
    // Clamp positions
    particle.x = clamp(particle.x, 0, window.innerWidth);
    particle.y = clamp(particle.y, 0, window.innerHeight);
  });
}

export function generateNeuralNetwork(
  inputNodes: number,
  hiddenLayers: number[],
  outputNodes: number
): Array<{
  id: string;
  x: number;
  y: number;
  z: number;
  connections: string[];
  type: 'input' | 'hidden' | 'output' | 'attention';
  activation: number;
  color: string;
}> {
  const nodes: Array<{
    id: string;
    x: number;
    y: number;
    z: number;
    connections: string[];
    type: 'input' | 'hidden' | 'output' | 'attention';
    activation: number;
    color: string;
  }> = [];
  const layerSpacing = 200;
  const nodeSpacing = 100;
  
  // Input layer
  for (let i = 0; i < inputNodes; i++) {
    nodes.push({
      id: `input-${i}`,
      x: 0,
      y: i * nodeSpacing - (inputNodes - 1) * nodeSpacing / 2,
      z: 0,
      connections: [],
      type: 'input' as const,
      activation: getRandomFloat(0, 1),
      color: '#00ffff',
    });
  }
  
  // Hidden layers
  hiddenLayers.forEach((layerSize, layerIndex) => {
    for (let i = 0; i < layerSize; i++) {
      const nodeId = `hidden-${layerIndex}-${i}`;
      nodes.push({
        id: nodeId,
        x: (layerIndex + 1) * layerSpacing,
        y: i * nodeSpacing - (layerSize - 1) * nodeSpacing / 2,
        z: getRandomFloat(-50, 50),
        connections: [],
        type: 'hidden' as const,
        activation: getRandomFloat(0, 1),
        color: '#8b5cf6',
      });
    }
  });
  
  // Output layer
  for (let i = 0; i < outputNodes; i++) {
    nodes.push({
      id: `output-${i}`,
      x: (hiddenLayers.length + 1) * layerSpacing,
      y: i * nodeSpacing - (outputNodes - 1) * nodeSpacing / 2,
      z: 0,
      connections: [],
      type: 'output' as const,
      activation: getRandomFloat(0, 1),
      color: '#f472b6',
    });
  }
  
  // Create connections
  nodes.forEach(node => {
    if (node.type === 'input') {
      // Connect to first hidden layer
      const firstHiddenLayer = nodes.filter(n => n.id.startsWith('hidden-0-'));
      firstHiddenLayer.forEach(target => {
        node.connections.push(target.id);
      });
    } else if (node.type === 'hidden') {
      const layerIndex = parseInt(node.id.split('-')[1]);
      if (layerIndex < hiddenLayers.length - 1) {
        // Connect to next hidden layer
        const nextLayer = nodes.filter(n => n.id.startsWith(`hidden-${layerIndex + 1}-`));
        nextLayer.forEach(target => {
          node.connections.push(target.id);
        });
      } else {
        // Connect to output layer
        const outputLayer = nodes.filter(n => n.type === 'output');
        outputLayer.forEach(target => {
          node.connections.push(target.id);
        });
      }
    }
  });
  
  return nodes;
}

export function calculateVectorSimilarity(
  vector1: number[],
  vector2: number[]
): number {
  if (vector1.length !== vector2.length) {
    throw new Error('Vectors must have the same length');
  }
  
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;
  
  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
    norm1 += vector1[i] * vector1[i];
    norm2 += vector2[i] * vector2[i];
  }
  
  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

export function generateRandomVector(dimensions: number): number[] {
  const vector = [];
  for (let i = 0; i < dimensions; i++) {
    vector.push(getRandomFloat(-1, 1));
  }
  return vector;
}

export function normalizeVector(vector: number[]): number[] {
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map(val => val / magnitude);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve();
  }
}

export function downloadFile(content: string, filename: string, type: string = 'text/plain'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getContrastColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#000000';
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
}

export function createGradient(
  colors: string[],
  direction: 'horizontal' | 'vertical' | 'diagonal' | 'radial' = 'diagonal'
): string {
  const gradients = {
    horizontal: 'to right',
    vertical: 'to bottom',
    diagonal: 'to bottom right',
    radial: 'circle at center',
  };
  
  const directionValue = gradients[direction];
  return `linear-gradient(${directionValue}, ${colors.join(', ')})`;
}

export function animateValue(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number,
  callback?: (value: number) => void
): void {
  const startTime = performance.now();
  
  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    const current = start + (end - start) * eased;
    
    if (callback) {
      callback(current);
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  });
}

export function createResizeObserver(
  callback: ResizeObserverCallback
): ResizeObserver {
  return new ResizeObserver(callback);
}

export function createMutationObserver(
  callback: MutationCallback,
  options?: MutationObserverInit
): MutationObserver {
  return new MutationObserver(callback);
}

export function requestIdleCallback(
  callback: () => void,
  options?: { timeout?: number }
): number {
  if ('requestIdleCallback' in window) {
    return (window as any).requestIdleCallback(callback, options);
  } else {
    return setTimeout(callback, 1) as any;
  }
}

export function cancelIdleCallback(id: number): void {
  if ('cancelIdleCallback' in window) {
    (window as any).cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}
