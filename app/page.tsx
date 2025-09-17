'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/loading-screen';
import CyberpunkHeader from '@/components/cyberpunk-header';
import CyberpunkHero from '@/components/cyberpunk-hero';
import { CyberpunkAbout } from '@/components/cyberpunk-about';
import { CyberpunkSkills } from '@/components/cyberpunk-skills';
import { CyberpunkProjects } from '@/components/cyberpunk-projects';
import { CyberpunkExperience } from '@/components/cyberpunk-experience';
import { CyberpunkContact } from '@/components/cyberpunk-contact';
import { CyberpunkFooter } from '@/components/cyberpunk-footer';
import CustomCursor from '@/components/custom-cursor';
import { ScrollReveal, ParallaxElement } from '@/components/advanced-scroll-animations';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => setIsLoading(false);

      return (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-light)' }}>
          <CustomCursor />

      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen onComplete={handleLoadingComplete} />
        ) : (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="scanlines"
          >
            <CyberpunkHeader />
            <CyberpunkHero />
            <ScrollReveal variant="parallax">
              <CyberpunkAbout />
            </ScrollReveal>
            <ScrollReveal variant="staggeredReveal">
              <CyberpunkSkills />
            </ScrollReveal>
            <ScrollReveal variant="morphScale">
              <CyberpunkProjects />
            </ScrollReveal>
            <ScrollReveal variant="glitchReveal">
              <CyberpunkExperience />
            </ScrollReveal>
            <ScrollReveal variant="cyberpunkReveal" amount={0.01} margin="-10% 0px -10% 0px" revealOnMount>
              <CyberpunkContact />
            </ScrollReveal>
            <CyberpunkFooter />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}