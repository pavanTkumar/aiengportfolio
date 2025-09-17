'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechCorp',
    content: 'Pavan delivered an exceptional AI chatbot that transformed our customer service. His expertise in RAG and vector databases is unmatched.',
    rating: 5,
    avatar: '/images/avatar1.jpg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'InnovateAI',
    content: 'Working with Pavan was a game-changer. He built a sophisticated RAG pipeline that improved our search accuracy by 92%.',
    rating: 5,
    avatar: '/images/avatar2.jpg',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'StartupXYZ',
    content: 'Pavan\'s AI solutions helped us scale from 0 to 10K users. His technical expertise and communication skills are outstanding.',
    rating: 5,
    avatar: '/images/avatar3.jpg',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Engineering Director',
    company: 'DataFlow Inc',
    content: 'The vector database implementation Pavan created for us is incredibly fast and scalable. Highly recommend his services.',
    rating: 5,
    avatar: '/images/avatar4.jpg',
  },
];

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div ref={ref} className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-bold text-cyberpunk-neon mb-4">
          What Clients Say
        </h3>
        <p className="text-neural-400 max-w-2xl mx-auto">
          Don't just take my word for it. Here's what industry leaders say about working with me.
        </p>
      </motion.div>

      {/* Testimonial Display */}
      <motion.div
        className="relative max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="glass rounded-lg p-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-cyberpunk-neon via-cyberpunk-purple to-cyberpunk-pink" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              {/* Quote */}
              <div className="text-6xl text-cyberpunk-neon opacity-30 mb-4">
                "
              </div>
              
              <blockquote className="text-xl text-neural-200 leading-relaxed mb-8">
                {testimonials[currentTestimonial].content}
              </blockquote>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="text-cyberpunk-orange text-xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-purple p-0.5">
                  <div className="w-full h-full rounded-full bg-neural-800 flex items-center justify-center">
                    <span className="text-2xl">
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-neural-200">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-neural-400">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-neural-800/50 hover:bg-neural-800 rounded-full flex items-center justify-center text-cyberpunk-neon transition-all duration-300"
            >
              ←
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-neural-800/50 hover:bg-neural-800 rounded-full flex items-center justify-center text-cyberpunk-neon transition-all duration-300"
            >
              →
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                currentTestimonial === index ? 'bg-cyberpunk-neon' : 'bg-neural-600'
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {[
          { label: 'Client Satisfaction', value: '100%' },
          { label: 'Projects Delivered', value: '50+' },
          { label: 'Average Rating', value: '5.0' },
          { label: 'Repeat Clients', value: '80%' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center glass rounded-lg p-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-3xl font-bold cyberpunk-text mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-neural-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
