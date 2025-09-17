'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ContactForm } from '@/components/contact-form';
import { SocialLinks } from '@/components/social-links';
import { ContactInfo } from '@/components/contact-info';
import { MessageTransmission } from '@/components/message-transmission';

export function ContactSection() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleFormSubmit = async (formData: any) => {
    setIsTransmitting(true);
    
    // Simulate message transmission
    setTimeout(() => {
      setIsTransmitting(false);
      setIsFormSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsFormSubmitted(false);
      }, 3000);
    }, 2000);
  };

  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 neural-bg opacity-30" />
      <div className="absolute inset-0 cyberpunk-grid opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
            <span className="cyberpunk-text">Get In</span>
            <span className="text-neural-300"> Touch</span>
          </h2>
          <p className="text-xl text-neural-400 max-w-3xl mx-auto">
            Ready to build the future of AI together? Let's discuss your project and explore 
            how we can create something extraordinary.
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass rounded-lg p-8">
              <h3 className="text-2xl font-bold text-cyberpunk-neon mb-6">
                Send Message
              </h3>
              
              {isFormSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h4 className="text-xl font-bold text-cyberpunk-green mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-neural-400">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <ContactForm onSubmit={handleFormSubmit} />
              )}
            </div>

            {/* Message Transmission Animation */}
            {isTransmitting && (
              <MessageTransmission />
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactInfo />
            
            <SocialLinks />
            
            {/* Availability Status */}
            <div className="glass rounded-lg p-6">
              <h3 className="text-lg font-bold text-cyberpunk-neon mb-4">
                Current Status
              </h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-cyberpunk-green rounded-full animate-pulse"></div>
                <span className="text-neural-300">Available for new projects</span>
              </div>
              <div className="text-sm text-neural-400">
                <p>• Open to full-time opportunities</p>
                <p>• Available for consulting projects</p>
                <p>• Interested in AI research collaborations</p>
                <p>• Response time: Within 24 hours</p>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="glass rounded-lg p-6">
              <h3 className="text-lg font-bold text-cyberpunk-neon mb-4">
                Quick Contact
              </h3>
              <div className="space-y-3">
                <motion.a
                  href="mailto:hirepavan@thetejavath.com"
                  className="flex items-center space-x-3 p-3 bg-neural-800/50 rounded-lg hover:bg-neural-800 transition-colors"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="font-medium text-neural-200">Email</div>
                    <div className="text-sm text-neural-400">hirepavan@thetejavath.com</div>
                  </div>
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/pavantejavath"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-neural-800/50 rounded-lg hover:bg-neural-800 transition-colors"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="text-2xl">💼</span>
                  <div>
                    <div className="font-medium text-neural-200">LinkedIn</div>
                    <div className="text-sm text-neural-400">linkedin.com/in/pavantejavath</div>
                  </div>
                </motion.a>
                
                <motion.a
                  href="https://github.com/pavantejavath"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-neural-800/50 rounded-lg hover:bg-neural-800 transition-colors"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="text-2xl">🐙</span>
                  <div>
                    <div className="font-medium text-neural-200">GitHub</div>
                    <div className="text-sm text-neural-400">github.com/pavantejavath</div>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="glass rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-cyberpunk-neon mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-neural-300 mb-6 leading-relaxed">
              Whether you're looking to implement AI solutions, build intelligent systems, 
              or explore the possibilities of machine learning, I'm here to help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-cyberpunk-neon text-neural-900 rounded-lg font-bold hover:bg-cyberpunk-neon/80 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.button>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 glass text-cyberpunk-neon rounded-lg font-bold hover:bg-neural-800/50 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
