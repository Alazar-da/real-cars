// components/3d/GlowingOrbs.tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GlowingOrbs() {
  const orbRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    orbRefs.current.forEach((orb, i) => {
      if (orb) {
        orb.position.y = Math.sin(state.clock.getElapsedTime() * 1.5 + i) * 0.3;
        orb.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 3 + i) * 0.2);
      }
    });
  });
  
  const positions = [
    [-2, 0.5, -1.5], [2, 0.5, -1.5], [-1.5, -0.5, -2], [1.5, -0.5, -2],
    [-2.5, 1, -0.5], [2.5, 1, -0.5], [0, 1.5, -2.5], [0, -1, -2]
  ];
  
  return (
    <>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) orbRefs.current[i] = el; }}
          position={[pos[0], pos[1], pos[2]]}
        >
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </>
  );
}