'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
  isEnabled: boolean;
  toggleAudio: () => void;
  playSound: (type: 'hover' | 'click' | 'success' | 'error') => void;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API with proper browser compatibility
    if (typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        try {
          audioContextRef.current = new AudioContextClass();
          gainNodeRef.current = audioContextRef.current.createGain();
          gainNodeRef.current.connect(audioContextRef.current.destination);
          gainNodeRef.current.gain.value = volume;
        } catch (error) {
          console.warn('Web Audio API not supported:', error);
        }
      }
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const toggleAudio = () => {
    setIsEnabled(!isEnabled);
  };

  const playSound = (type: 'hover' | 'click' | 'success' | 'error') => {
    if (!isEnabled || !audioContextRef.current || !gainNodeRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(gainNodeRef.current);

      // Different frequencies for different sounds
      const frequencies = {
        hover: 800,
        click: 600,
        success: 1000,
        error: 300,
      };

      oscillator.frequency.setValueAtTime(frequencies[type], audioContextRef.current.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.1, audioContextRef.current.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.1);

      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + 0.1);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  };

  const handleSetVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume;
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isEnabled,
        toggleAudio,
        playSound,
        setVolume: handleSetVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
