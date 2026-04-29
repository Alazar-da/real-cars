// components/3d/LightRays.tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function LightRays() {
  const rayRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    rayRefs.current.forEach((ray, i) => {
      if (ray) {
        ray.rotation.z = state.clock.getElapsedTime() * 0.2 + i;
        ray.scale.x = 0.8 + Math.sin(state.clock.getElapsedTime() * 2 + i) * 0.2;
      }
    });
  });
  
  const rays = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    rays.push(
      <mesh
        key={i}
        ref={(el) => { if (el) rayRefs.current[i] = el; }}
        position={[Math.cos(angle) * 3, Math.sin(angle) * 2, -2.5]}
        rotation={[0, 0, angle]}
      >
        <coneGeometry args={[0.08, 1.2, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.4} transparent opacity={0.6} />
      </mesh>
    );
  }
  
  return <>{rays}</>;
}