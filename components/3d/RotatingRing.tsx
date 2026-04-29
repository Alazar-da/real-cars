// components/3d/RotatingRing.tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function RotatingRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      ringRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -state.clock.getElapsedTime() * 0.15;
      ringRef2.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });
  
  return (
    <>
      <mesh ref={ringRef} position={[0, 0, -1]}>
        <torusGeometry args={[2.2, 0.06, 64, 300]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} emissive="#FFD700" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ringRef2} position={[0, 0, -1.5]}>
        <torusGeometry args={[2.8, 0.04, 64, 400]} />
        <meshStandardMaterial color="#FFA500" metalness={0.8} roughness={0.2} emissive="#FFA500" emissiveIntensity={0.3} transparent opacity={0.7} />
      </mesh>
    </>
  );
}