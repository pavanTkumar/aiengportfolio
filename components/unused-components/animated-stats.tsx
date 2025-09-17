'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { animateValue } from '@/lib/utils';

const stats = [
  { label: 'AI Projects', value: 50, suffix: '+' },
  { label: 'Technologies', value: 25, suffix: '+' },
  { label: 'Years Experience', value: 3, suffix: '+' },
  { label: 'Client Satisfaction', value: 100, suffix: '%' },
];

export function AnimatedStats() {
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        const element = document.getElementById(`stat-${index}`);
        if (element) {
          animateValue(element, 0, stat.value, 2000, (value) => {
            setAnimatedValues(prev => {
              const newValues = [...prev];
              newValues[index] = Math.round(value);
              return newValues;
            });
          });
        }
      });
    }
  }, [isInView]);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="text-3xl font-bold cyberpunk-text mb-2">
            <span id={`stat-${index}`}>
              {animatedValues[index]}
            </span>
            {stat.suffix}
          </div>
          <div className="text-sm text-neural-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
