// components/3d/RealCar3D.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface RealCar3DProps {
  carImageUrl?: string;
  autoRotate?: boolean;
  scale?: number;
}

export function RealCar3D({ 
  carImageUrl = "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format",
  autoRotate = true,
  scale = 1.2 
}: RealCar3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Load the car image texture
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(carImageUrl, 
      (tex) => {
        setTexture(tex);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading car image:", error);
        setLoading(false);
      }
    );
  }, [carImageUrl]);

  useFrame((state) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  if (loading) {
    return (
      <Html center>
        <div className="text-amber-500 text-sm">Loading 3D Car...</div>
      </Html>
    );
  }

  return (
    <group ref={groupRef}>
      {/* Main Car Body - Double-sided plane with car image */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[2.5, 1.2]} />
        {texture && (
          <meshStandardMaterial 
            map={texture} 
            side={THREE.DoubleSide}
            metalness={0.7}
            roughness={0.3}
            emissive="#FFD700"
            emissiveIntensity={0.1}
          />
        )}
      </mesh>
      
      {/* Back face - mirror reflection */}
      <mesh position={[0, 0, -0.05]} rotation={[0, Math.PI, 0]} castShadow>
        <planeGeometry args={[2.5, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Chrome Outline Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.55, 1.25, 0.05]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.2} emissive="#FFD700" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Bottom Shadow */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 16]} />
        <meshStandardMaterial color="#000" transparent opacity={0.3} />
      </mesh>
      
      {/* Glow effect around the car */}
      <pointLight position={[0, 0.5, 0.5]} intensity={0.5} color="#FFD700" distance={3} />
    </group>
  );
}