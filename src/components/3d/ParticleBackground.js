"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Particles from "./Particles";

export default function ParticleBackground() {
  return (
    <div className="particle-bg">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
      <style jsx>{`
        .particle-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          background: var(--bg-color);
          transition: background-color 0.3s ease;
        }
        .particle-bg :global(canvas) {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
