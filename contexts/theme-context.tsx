'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'cyberpunk' | 'monochrome';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('cyberpunk');

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme && (savedTheme === 'cyberpunk' || savedTheme === 'monochrome')) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem('portfolio-theme', theme);
    
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'cyberpunk' ? 'monochrome' : 'cyberpunk');
  };

  const isDark = theme === 'cyberpunk';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
