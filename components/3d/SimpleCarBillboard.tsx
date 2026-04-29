// components/3d/SimpleCarBillboard.tsx
"use client";

import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

interface SimpleCarBillboardProps {
  imageUrl: string;
}

export function SimpleCarBillboard({ imageUrl }: SimpleCarBillboardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, imageUrl);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
      // Always face camera (billboard effect)
      meshRef.current.lookAt(state.camera.position);
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 1.6]} />
      <meshStandardMaterial 
        map={texture} 
        side={THREE.DoubleSide}
        transparent
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}