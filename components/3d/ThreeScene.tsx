// components/3d/ThreeScene.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";
import { FloatingParticles } from "./FloatingParticles";
import { RotatingRing } from "./RotatingRing";
import { GlowingOrbs } from "./GlowingOrbs";
import { LightRays } from "./LightRays";

export function ThreeScene() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) return null;
  
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />
        <pointLight position={[0, 2, 2]} intensity={0.6} color="#FFD700" />
        
        <Suspense fallback={null}>
          <FloatingParticles />
          <RotatingRing />
          <GlowingOrbs />
          <LightRays />
          <Sparkles count={500} scale={10} size={0.08} speed={0.5} color="#FFD700" />
          <Environment preset="night" background={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}