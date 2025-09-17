'use client';

import { motion } from 'framer-motion';

export function SocialLinks() {
  const socialPlatforms = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/pavantejavath',
      icon: '💼',
      color: '#0077b5',
      description: 'Professional network',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/pavantejavath',
      icon: '🐙',
      color: '#333',
      description: 'Code repositories',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/pavantejavath',
      icon: '🐦',
      color: '#1da1f2',
      description: 'Tech insights',
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@pavantejavath',
      icon: '📝',
      color: '#00ab6c',
      description: 'Technical articles',
    },
    {
      name: 'Portfolio',
      url: 'https://thetejavath.com',
      icon: '🌐',
      color: '#00ffff',
      description: 'Project showcase',
    },
  ];

  return (
    <div className="glass rounded-lg p-6">
      <h3 className="text-lg font-bold text-cyberpunk-neon mb-6">
        Connect With Me
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {socialPlatforms.map((platform, index) => (
          <motion.a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 bg-neural-800/50 rounded-lg hover:bg-neural-800 transition-all duration-300 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              {platform.icon}
            </div>
            <h4 className="font-semibold text-neural-200 group-hover:text-cyberpunk-neon transition-colors text-sm">
              {platform.name}
            </h4>
            <p className="text-xs text-neural-400 mt-1">
              {platform.description}
            </p>
          </motion.a>
        ))}
      </div>

      {/* Follow Me Text */}
      <div className="mt-6 text-center">
        <p className="text-sm text-neural-400">
          Follow me for the latest updates on AI, machine learning, and technology insights
        </p>
      </div>
    </div>
  );
}
