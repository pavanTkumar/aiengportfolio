'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CyberpunkName from './cyberpunk-name';
import { ThemeToggle } from './theme-toggle';
import { 
  BrainCircuitIcon, 
  NeuralNetworkIcon, 
  CircuitBoardIcon, 
  TimelineIcon, 
  TerminalIcon 
} from './icons/navigation-icons';

const navigationItems = [
  { id: 'about', label: 'About', icon: BrainCircuitIcon, href: '#about' },
  { id: 'skills', label: 'Skills', icon: CircuitBoardIcon, href: '#skills' },
  { id: 'projects', label: 'Projects', icon: NeuralNetworkIcon, href: '#projects' },
  { id: 'experience', label: 'Experience', icon: TimelineIcon, href: '#experience' },
  { id: 'contact', label: 'Contact', icon: TerminalIcon, href: '#contact' },
];

export default function CyberpunkHeader() {
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-black/20' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Extreme Left */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <CyberpunkName size="small" variant="subtle" />
          </motion.div>

          {/* Desktop Navigation - Extreme Right */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <div key={item.id} className="flex items-center space-x-2">
                  {/* Add theme toggle before About button */}
                  {item.id === 'about' && (
                    <div className="mr-2">
                      <ThemeToggle />
                    </div>
                  )}
                  
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-250 ${
                      isActive
                        ? 'text-cyan-400 glow-cyan'
                        : 'text-gray-300 hover:text-cyan-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent 
                      size={18} 
                      className={isActive ? 'text-cyan-400' : 'text-current'} 
                    />
                    <span className="font-body text-sm font-medium">{item.label}</span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover Underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.25 }}
                    />
                  </motion.button>
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Button - Extreme Right */}
          <motion.button
            className="md:hidden p-2 rounded-lg border border-green-400 text-green-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden border-t border-gray-800 bg-black/50 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
        <div className="px-4 py-4 space-y-2">
          {/* Theme Toggle in Mobile Menu */}
          <div className="flex justify-center py-2 mb-4">
            <ThemeToggle />
          </div>
          
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-250 ${
                  isActive
                    ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ x: 0 }}
              >
                <IconComponent size={20} />
                <span className="font-body text-sm font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
        </motion.div>
      )}
    </motion.header>
  );
}

