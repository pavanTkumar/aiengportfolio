'use client';

import { motion } from 'framer-motion';

export function ContactInfo() {
  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'hirepavan@thetejavath.com',
      description: 'Best for detailed project discussions',
      action: 'mailto:hirepavan@thetejavath.com',
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/pavantejavath',
      description: 'Professional networking and updates',
      action: 'https://linkedin.com/in/pavantejavath',
    },
    {
      icon: '🐙',
      title: 'GitHub',
      value: 'github.com/pavantejavath',
      description: 'View my code and contributions',
      action: 'https://github.com/pavantejavath',
    },
    {
      icon: '🌐',
      title: 'Website',
      value: 'thetejavath.com',
      description: 'Portfolio and project showcase',
      action: 'https://thetejavath.com',
    },
  ];

  return (
    <div className="glass rounded-lg p-6">
      <h3 className="text-lg font-bold text-cyberpunk-neon mb-6">
        Contact Information
      </h3>
      
      <div className="space-y-4">
        {contactMethods.map((method, index) => (
          <motion.a
            key={method.title}
            href={method.action}
            target={method.action.startsWith('http') ? '_blank' : undefined}
            rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="block p-4 bg-neural-800/50 rounded-lg hover:bg-neural-800 transition-all duration-300 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <div className="flex items-start space-x-4">
              <div className="text-2xl group-hover:scale-110 transition-transform">
                {method.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neural-200 group-hover:text-cyberpunk-neon transition-colors">
                  {method.title}
                </h4>
                <p className="text-cyberpunk-neon font-mono text-sm">
                  {method.value}
                </p>
                <p className="text-neural-400 text-xs mt-1">
                  {method.description}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Response Time */}
      <div className="mt-6 p-4 bg-cyberpunk-green/10 rounded-lg border border-cyberpunk-green/20">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-cyberpunk-green rounded-full animate-pulse"></div>
          <div>
            <h4 className="font-semibold text-cyberpunk-green">Quick Response</h4>
            <p className="text-sm text-neural-300">I typically respond within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
