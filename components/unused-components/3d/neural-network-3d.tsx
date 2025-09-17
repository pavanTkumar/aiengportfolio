'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

interface NeuralNetwork3DProps {
  mousePosition?: { x: number; y: number };
}

interface Node {
  id: string;
  position: [number, number, number];
  type: 'input' | 'hidden' | 'output';
  technology: string;
  connections: string[];
  velocity: [number, number, number];
  targetPosition: [number, number, number];
}

export function NeuralNetwork3D({ mousePosition = { x: 0, y: 0 } }: NeuralNetwork3DProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // AI Technologies represented as nodes
  const technologies = [
    { name: 'LLMs', type: 'input' as const, color: '#00ffff' },
    { name: 'RAG', type: 'hidden' as const, color: '#8b5cf6' },
    { name: 'Vector DB', type: 'hidden' as const, color: '#f472b6' },
    { name: 'LangChain', type: 'hidden' as const, color: '#10b981' },
    { name: 'Pinecone', type: 'hidden' as const, color: '#f59e0b' },
    { name: 'FAISS', type: 'hidden' as const, color: '#ef4444' },
    { name: 'Weaviate', type: 'hidden' as const, color: '#06b6d4' },
    { name: 'Embeddings', type: 'output' as const, color: '#8b5cf6' },
  ];

  // Generate neural network structure with physics
  const { nodes, connections } = useMemo(() => {
    const nodeList: Node[] = technologies.map((tech, i) => {
      const angle = (i / technologies.length) * Math.PI * 2;
      const radius = 2 + Math.random() * 1;
      const height = (Math.random() - 0.5) * 2;
      
      return {
        id: tech.name,
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ] as [number, number, number],
        type: tech.type,
        technology: tech.name,
        connections: [],
        velocity: [0, 0, 0] as [number, number, number],
        targetPosition: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ] as [number, number, number]
      };
    });

    // Create connections based on technology relationships
    const connectionMap: { [key: string]: string[] } = {
      'LLMs': ['RAG', 'LangChain'],
      'RAG': ['Vector DB', 'Embeddings', 'LangChain'],
      'Vector DB': ['Pinecone', 'FAISS', 'Weaviate'],
      'LangChain': ['RAG', 'LLMs'],
      'Pinecone': ['Vector DB', 'Embeddings'],
      'FAISS': ['Vector DB', 'Embeddings'],
      'Weaviate': ['Vector DB', 'Embeddings'],
      'Embeddings': ['RAG', 'Vector DB']
    };

    nodeList.forEach(node => {
      node.connections = connectionMap[node.id] || [];
    });

    // Create positions and colors arrays
    const positions = new Float32Array(nodeList.length * 3);
    const colors = new Float32Array(nodeList.length * 3);
    
    nodeList.forEach((node, i) => {
      positions[i * 3] = node.position[0];
      positions[i * 3 + 1] = node.position[1];
      positions[i * 3 + 2] = node.position[2];
      
      const tech = technologies.find(t => t.name === node.technology);
      const color = new THREE.Color(tech?.color || '#00ffff');
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });
    
    return { nodes: nodeList, connections: { positions, colors } };
  }, []);

  // Create connection lines with physics-based tension
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    
    nodes.forEach((node) => {
      node.connections.forEach(connectionId => {
        const targetNode = nodes.find(n => n.id === connectionId);
        if (targetNode) {
          // Add line from node to target
          positions.push(
            node.position[0], node.position[1], node.position[2],
            targetNode.position[0], targetNode.position[1], targetNode.position[2]
          );
          
          // Color based on connection strength
          const tech = technologies.find(t => t.name === node.technology);
          const color = new THREE.Color(tech?.color || '#00ffff');
          colors.push(color.r, color.g, color.b, color.r, color.g, color.b);
        }
      });
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    return geometry;
  }, [nodes]);

  // Physics simulation with spring tension
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Update node positions with physics
    nodes.forEach((node, i) => {
      // Mouse influence
      const mouseInfluence = 0.5;
      const mouseX = (mousePosition.x - 0.5) * 4;
      const mouseY = (mousePosition.y - 0.5) * 4;
      
      // Spring physics
      const springForce = 0.02;
      const damping = 0.95;
      
      // Calculate forces
      const dx = node.targetPosition[0] + mouseX - node.position[0];
      const dy = node.targetPosition[1] + mouseY - node.position[1];
      const dz = node.targetPosition[2] - node.position[2];
      
      // Apply spring force
      node.velocity[0] += dx * springForce;
      node.velocity[1] += dy * springForce;
      node.velocity[2] += dz * springForce;
      
      // Apply damping
      node.velocity[0] *= damping;
      node.velocity[1] *= damping;
      node.velocity[2] *= damping;
      
      // Update position
      node.position[0] += node.velocity[0];
      node.position[1] += node.velocity[1];
      node.position[2] += node.velocity[2];
      
      // Add subtle floating motion
      node.position[1] += Math.sin(time + i) * 0.001;
      
      // Update positions array
      if (pointsRef.current) {
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        positions[i * 3] = node.position[0];
        positions[i * 3 + 1] = node.position[1];
        positions[i * 3 + 2] = node.position[2];
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    });
    
    // Rotate the entire network slowly
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05;
    }
    
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.03;
    }
  });

  return (
    <group>
      {/* Neural Network Nodes with Glow Effect */}
      <Points ref={pointsRef} positions={connections.positions} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* Glow Effect for Nodes */}
      <Points ref={pointsRef} positions={connections.positions} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
      
      {/* Connection Lines with Physics-based Tension */}
      <group ref={linesRef}>
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={0.4}
            linewidth={2}
          />
        </lineSegments>
      </group>
      
      {/* Technology Labels */}
      {nodes.map((node, i) => (
        <Text
          key={node.id}
          position={[node.position[0], node.position[1] + 0.3, node.position[2]]}
          fontSize={0.1}
          color={hoveredNode === node.id ? "#00ffff" : "#ffffff"}
          anchorX="center"
          anchorY="middle"
          visible={hoveredNode === node.id}
        >
          {node.technology}
        </Text>
      ))}
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00ffff" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#8b5cf6" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#f472b6" />
      
      {/* Volumetric Fog Effect */}
      <fog attach="fog" args={['#0f172a', 5, 15]} />
    </group>
  );
}

