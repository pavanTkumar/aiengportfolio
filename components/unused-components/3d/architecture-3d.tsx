'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Line } from '@react-three/drei';
import * as THREE from 'three';

interface Architecture3DProps {
  architecture: {
    name: string;
    description: string;
    components: Array<{
      name: string;
      position: [number, number, number];
      color: string;
    }>;
    connections: number[][];
  };
}

export function Architecture3D({ architecture }: Architecture3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Components */}
      {architecture.components.map((component, index) => (
        <group key={index} position={component.position}>
          <Box args={[1, 0.5, 0.5]}>
            <meshStandardMaterial
              color={component.color}
              transparent
              opacity={0.7}
              emissive={component.color}
              emissiveIntensity={0.2}
            />
          </Box>
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.2}
            color={component.color}
            anchorX="center"
            anchorY="middle"
          >
            {component.name}
          </Text>
        </group>
      ))}

      {/* Connections */}
      {architecture.connections.map((connection, index) => {
        const start = architecture.components[connection[0]];
        const end = architecture.components[connection[1]];
        
        const startPos = new THREE.Vector3(...start.position);
        const endPos = new THREE.Vector3(...end.position);
        
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
