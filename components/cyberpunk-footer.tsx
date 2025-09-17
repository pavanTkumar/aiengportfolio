'use client';

import { motion } from 'framer-motion';
import { CyberpunkGitHubIcon, CyberpunkLinkedInIcon, CyberpunkEmailIcon } from './icons/cyberpunk-social-icons';
import CyberpunkName from './cyberpunk-name';
import { useState, useEffect, useRef } from 'react';

interface LogEntry {
  type: 'log' | 'status';
  message: string;
  timestamp?: string;
}

export function CyberpunkFooter() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline'>('online');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Real-time terminal logs functionality
  useEffect(() => {
    // Create EventSource connection
    const eventSource = new EventSource('/api/logs');
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setIsConnected(true);
      setSystemStatus('online');
    };

    eventSource.onmessage = (event) => {
      try {
        const data: LogEntry = JSON.parse(event.data);
        
        if (data.type === 'log') {
          setLogs(prevLogs => {
            const newLogs = [...prevLogs, data];
            // Keep only last 10 logs for the footer
            return newLogs.slice(-10);
          });
        } else if (data.type === 'status') {
          setSystemStatus('online');
        }
      } catch (error) {
        console.error('Error parsing log data:', error);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      setSystemStatus('offline');
    };

    // Cleanup on unmount
    return () => {
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const systemLogs = [
    "System initialized successfully",
    "Neural networks loaded",
    "Vector databases connected",
    "RAG pipeline operational",
    "All systems nominal"
  ];

  return (
    <footer className="bg-neural-900 border-t border-terminal-green relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, #00ff00 100%),
            linear-gradient(0deg, transparent 98%, #00ff00 100%)
          `,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        {/* System Status */}
        <motion.div
          className="mb-8 p-6 bg-neural-800 border border-terminal-green rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <motion.div
                className={`w-3 h-3 rounded-full mr-3 ${
                  systemStatus === 'online' ? 'bg-terminal-green' : 'bg-red-500'
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="font-terminal text-lg text-terminal-green">
                System Status: {systemStatus.toUpperCase()}
              </span>
            </div>
            <div className="font-mono text-sm text-text-light">
              {formatTime(currentTime)}
            </div>
          </div>

          {/* System Logs */}
          <div className="space-y-1 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-terminal-green/30 scrollbar-track-transparent">
            {logs.length > 0 ? (
              logs.map((log, index) => {
                const message = log.message.replace(/^\[\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}\] /, '');
                return (
                  <motion.div
                    key={`${log.timestamp}-${index}`}
                    className="font-mono text-xs text-text-light flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-terminal-green mr-2">▶</span>
                    {message}
                  </motion.div>
                );
              })
            ) : (
              // Fallback static logs while loading
              systemLogs.map((log, index) => (
                <motion.div
                  key={index}
                  className="font-mono text-xs text-text-light flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="text-terminal-green mr-2">▶</span>
                  {log}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Personal Info */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              <CyberpunkName size="small" variant="subtle" />
            </div>
            <p className="text-text-light font-mono text-sm mb-4">
              AI Engineer specializing in Large Language Models, 
              RAG systems, and Vector Databases.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {[
                { name: 'GitHub', url: 'https://github.com/pavanTkumar', icon: CyberpunkGitHubIcon },
                { name: 'LinkedIn', url: 'https://linkedin.com/in/geekypavan', icon: CyberpunkLinkedInIcon },
                { name: 'Email', url: 'mailto:hirepavan@thetejavath.com', icon: CyberpunkEmailIcon }
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-green hover:text-cyan transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="font-terminal text-lg text-cyan mb-4 glow-cyan">
              $ navigation --quick
            </h4>
            <div className="space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Experience', href: '#experience' },
                { name: 'Contact', href: '#contact' }
              ].map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block font-mono text-sm text-text-light hover:text-terminal-green transition-colors duration-300"
                  whileHover={{ x: 10 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1), duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  ▶ {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="text-center md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="font-terminal text-lg text-magenta mb-4 glow-magenta">
              $ tech --stack
            </h4>
            <div className="space-y-2">
              {[
                'Python', 'LangChain', 'Pinecone', 'Weaviate', 
                'FastAPI', 'Docker', 'AWS', 'Kubernetes'
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  className="font-mono text-sm text-text-light"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-terminal-green pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-sm text-text-light mb-4 md:mb-0 flex items-center">
            © {new Date().getFullYear()} <CyberpunkName size="xs" variant="subtle" className="ml-1" />. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="font-mono text-sm text-terminal-green">
              End of transmission
            </div>
            <motion.div
              className="flex space-x-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-1 h-1 bg-terminal-green rounded-full"></div>
              <div className="w-1 h-1 bg-terminal-green rounded-full"></div>
              <div className="w-1 h-1 bg-terminal-green rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
