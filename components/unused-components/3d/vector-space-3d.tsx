'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

interface VectorSpace3DProps {
  selectedText: string;
  allTexts: string[];
  isRunning: boolean;
}

export function VectorSpace3D({ selectedText, allTexts, isRunning }: VectorSpace3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(allTexts.length * 3);
    const colors = new Float32Array(allTexts.length * 3);
    
    allTexts.forEach((text, i) => {
      // Generate positions in a sphere
      const radius = 3;
      const theta = (i / allTexts.length) * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Color based on selection
      const isSelected = text === selectedText;
      const color = new THREE.Color();
      if (isSelected) {
        color.setHex(0x00ffff);
      } else {
        color.setHSL(0.6, 0.8, 0.6);
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });
    
    return { positions, colors };
  }, [allTexts, selectedText]);

  useFrame((state) => {
    if (groupRef.current && isRunning) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Vector Points */}
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* Text Labels */}
      {allTexts.map((text, index) => {
        const isSelected = text === selectedText;
        const x = positions[index * 3];
        const y = positions[index * 3 + 1];
        const z = positions[index * 3 + 2];
        
        return (
          <Text
            key={index}
            position={[x, y + 0.3, z]}
            fontSize={0.1}
            color={isSelected ? '#00ffff' : '#64748b'}
            anchorX="center"
            anchorY="middle"
          >
            {text.split(' ')[0]}
          </Text>
        );
      })}
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
    </group>
  );
}
