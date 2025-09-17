'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Experience } from '@/types';

interface CareerPath3DProps {
  experiences: Experience[];
  activeExperience: number;
  onExperienceChange: (index: number) => void;
}

export function CareerPath3D({ experiences, activeExperience, onExperienceChange }: CareerPath3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(experiences.length * 3);
    const colors = new Float32Array(experiences.length * 3);
    
    experiences.forEach((experience, i) => {
      // Create a path that curves upward
      const t = i / (experiences.length - 1);
      const x = Math.sin(t * Math.PI) * 3;
      const y = t * 4 - 2;
      const z = Math.cos(t * Math.PI) * 2;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Color based on experience type
      const color = new THREE.Color();
      if (experience.current) {
        color.setHex(0x00ffff); // Cyan for current
      } else if (experience.company.includes('University')) {
        color.setHex(0x8b5cf6); // Purple for education
      } else if (experience.position.includes('Founder')) {
        color.setHex(0xf472b6); // Pink for entrepreneurship
      } else {
        color.setHex(0x10b981); // Green for work
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });
    
    return { positions, colors };
  }, [experiences]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Experience Nodes */}
      {experiences.map((experience, index) => {
        const x = positions[index * 3];
        const y = positions[index * 3 + 1];
        const z = positions[index * 3 + 2];
        const isActive = activeExperience === index;
        
        return (
          <group key={experience.id} position={[x, y, z]}>
            <Sphere args={[isActive ? 0.3 : 0.2]}>
              <meshStandardMaterial
                color={colors[index * 3] * 255}
                transparent
                opacity={0.8}
                emissive={colors[index * 3] * 255}
                emissiveIntensity={isActive ? 0.3 : 0.1}
              />
            </Sphere>
            
            <Text
              position={[0, -0.5, 0]}
              fontSize={0.15}
              color={isActive ? '#00ffff' : '#64748b'}
              anchorX="center"
              anchorY="middle"
            >
              {experience.company.split(' ')[0]}
            </Text>
          </group>
        );
      })}

      {/* Connection Lines */}
      {experiences.map((_, index) => {
        if (index === experiences.length - 1) return null;
        
        const startPos = new THREE.Vector3(
          positions[index * 3],
          positions[index * 3 + 1],
          positions[index * 3 + 2]
        );
        const endPos = new THREE.Vector3(
          positions[(index + 1) * 3],
          positions[(index + 1) * 3 + 1],
          positions[(index + 1) * 3 + 2]
        );
        
        return (
          <Line
            key={index}
            points={[startPos, endPos]}
            color="#00ffff"
            lineWidth={2}
            transparent
            opacity={0.6}
          />
        );
      })}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
    </group>
  );
}
