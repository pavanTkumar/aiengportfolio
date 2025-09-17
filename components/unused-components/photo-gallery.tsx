'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const photos = [
  {
    id: 1,
    src: '/images/photo1.jpg',
    alt: 'Pavan at AI conference',
    caption: 'Speaking at AI Conference 2024',
  },
  {
    id: 2,
    src: '/images/photo2.jpg',
    alt: 'Working on AI project',
    caption: 'Building RAG Pipeline',
  },
  {
    id: 3,
    src: '/images/photo3.jpg',
    alt: 'Team collaboration',
    caption: 'Team Collaboration Session',
  },
  {
    id: 4,
    src: '/images/photo4.jpg',
    alt: 'Award ceremony',
    caption: 'Innovation Award 2024',
  },
];

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative">
      {/* Main Photo Display */}
      <motion.div
        className="relative aspect-[4/3] rounded-lg overflow-hidden glass"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src={photos[currentIndex].src}
          alt={photos[currentIndex].alt}
          className="w-full h-full object-cover"
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neural-900/80 via-transparent to-transparent" />
        
        {/* Caption */}
        <div className="absolute bottom-4 left-4 right-4">
          <motion.p
            className="text-white font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {photos[currentIndex].caption}
          </motion.p>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevPhoto}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-neural-900/50 hover:bg-neural-900/80 rounded-full flex items-center justify-center text-white transition-all duration-300"
        >
          ←
        </button>
        <button
          onClick={nextPhoto}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-neural-900/50 hover:bg-neural-900/80 rounded-full flex items-center justify-center text-white transition-all duration-300"
        >
          →
        </button>
      </motion.div>

      {/* Thumbnail Navigation */}
      <div className="flex space-x-2 mt-4 justify-center">
        {photos.map((photo, index) => (
          <motion.button
            key={photo.id}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'w-16 h-16 rounded-lg overflow-hidden transition-all duration-300',
              currentIndex === index
                ? 'ring-2 ring-cyberpunk-neon scale-110'
                : 'opacity-60 hover:opacity-100 hover:scale-105'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Photo Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-neural-400">
          {currentIndex + 1} / {photos.length}
        </span>
      </div>
    </div>
  );
}
