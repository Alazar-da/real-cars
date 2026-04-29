// components/3d/CarGallery3D.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

interface CarGallery3DProps {
  images: string[];
  autoRotate?: boolean;
}

export function CarGallery3D({ images, autoRotate = true }: CarGallery3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textures, setTextures] = useState<THREE.Texture[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load all car images
  useEffect(() => {
    const loader = new TextureLoader();
    const loadedTextures: THREE.Texture[] = [];
    let loadedCount = 0;
    
    images.forEach((url, index) => {
      loader.load(url,
        (tex) => {
          loadedTextures[index] = tex;
          loadedCount++;
          if (loadedCount === images.length) {
            setTextures(loadedTextures);
            setLoading(false);
          }
        },
        undefined,
        (error) => {
          console.error(`Error loading image ${index}:`, error);
          loadedCount++;
          if (loadedCount === images.length) {
            setTextures(loadedTextures);
            setLoading(false);
          }
        }
      );
    });
  }, [images]);

  // Auto-rotate through images
  useEffect(() => {
    if (!autoRotate || textures.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % textures.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoRotate, textures.length]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  if (loading) return null;

  const currentTexture = textures[currentImageIndex];
  if (!currentTexture) return null;

  return (
    <group ref={groupRef}>
      {/* Main Car Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[2.8, 1.4]} />
        <meshStandardMaterial 
          map={currentTexture}
          side={THREE.DoubleSide}
          metalness={0.8}
          roughness={0.2}
          emissive="#FFD700"
          emissiveIntensity={0.15}
        />
      </mesh>
      
      {/* Chrome Frame */}
      <mesh position={[0, 0, -0.03]}>
        <boxGeometry args={[2.85, 1.45, 0.06]} />
        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.1} emissive="#FFD700" emissiveIntensity={0.1} />
      </mesh>
      
      {/* Glass effect overlay */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[2.6, 1.2]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.1} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* LED Light strips */}
      <mesh position={[1.3, 0.2, 0.05]}>
        <boxGeometry args={[0.1, 0.05, 0.02]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-1.3, 0.2, 0.05]}>
        <boxGeometry args={[0.1, 0.05, 0.02]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Ground shadow */}
      <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 16]} />
        <meshStandardMaterial color="#000" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}