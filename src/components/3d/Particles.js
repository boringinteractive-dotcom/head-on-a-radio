"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

// Custom Shader Material with CRAZY mouse interaction
const ParticleShaderMaterial = shaderMaterial(
    // Uniforms
    {
        uTime: 0,
        uColor: new THREE.Color(0.2, 0.5, 1.0),
        uMouse: new THREE.Vector2(0, 0),
        uMouseVelocity: new THREE.Vector2(0, 0),
        uPixelRatio: 1,
        uTheme: 0,
    },
    // Vertex Shader - ENHANCED
    `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uMouseVelocity;
    uniform float uPixelRatio;
    
    attribute float aScale;
    attribute vec3 aRandomness;
    
    varying vec3 vPosition;
    varying float vDistance;
    
    void main() {
      vPosition = position;
      
      // Organic floating movement
      vec3 pos = position;
      float speed = 0.5 + aRandomness.x;
      pos.x += sin(uTime * speed + aRandomness.x * 10.0) * 0.15;
      pos.y += cos(uTime * speed * 0.7 + aRandomness.y * 10.0) * 0.15;
      pos.z += sin(uTime * speed * 0.5 + aRandomness.z * 10.0) * 0.2;
      
      // CRAZY Mouse interaction - explosive repulsion with gravity
      vec3 mousePos = vec3(uMouse.x * 3.0, uMouse.y * 3.0, 0.0);
      vec3 toMouse = pos - mousePos;
      float dist = length(toMouse.xy);
      vDistance = dist;
      
      // Explosive repulsion zone
      float explosionRadius = 2.5;
      float explosionStrength = smoothstep(explosionRadius, 0.0, dist);
      
      if (explosionStrength > 0.0) {
        vec3 repelDir = normalize(toMouse);
        // Exponential repulsion - gets MUCH stronger near mouse
        float power = pow(explosionStrength, 0.5) * 2.0;
        pos += repelDir * power;
        
        // Add velocity-based displacement for trailing effect
        float velocityMag = length(uMouseVelocity);
        pos += vec3(uMouseVelocity * velocityMag * explosionStrength * 0.5, 0.0);
      }
      
      // Distant attraction (gravity well)
      float attractionRadius = 5.0;
      if (dist > explosionRadius && dist < attractionRadius) {
        float attractionStrength = smoothstep(attractionRadius, explosionRadius, dist);
        vec3 attractDir = -normalize(toMouse);
        pos += attractDir * attractionStrength * 0.3;
      }
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Dynamic size based on distance to mouse
      float sizeMultiplier = 1.0 + explosionStrength * 2.0;
      gl_PointSize = aScale * uPixelRatio * sizeMultiplier * (40.0 / -mvPosition.z);
    }
  `,
    // Fragment Shader - ENHANCED
    `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uTheme;
    
    varying float vDistance;
    
    void main() {
      // Circular particle
      float r = distance(gl_PointCoord, vec2(0.5));
      if (r > 0.5) discard;
      
      // Intense glow
      float glow = 1.0 - (r * 2.0);
      glow = pow(glow, 2.0);
      
      // Color shifting based on distance to mouse
      vec3 color = uColor;
      
      // Particles near mouse get HOT (red/orange)
      float heat = smoothstep(2.0, 0.0, vDistance);
      if (heat > 0.0) {
        vec3 hotColor = vec3(1.0, 0.3, 0.1); // Orange/red
        color = mix(color, hotColor, heat * 0.8);
      }
      
      // Pulsing effect
      float pulse = sin(uTime * 2.0 + vDistance) * 0.1 + 0.9;
      
      // Theme-based alpha
      float alpha = uTheme > 0.5 ? 0.8 : 0.6;
      alpha *= pulse;
      
      gl_FragColor = vec4(color, alpha * glow);
    }
  `
);

extend({ ParticleShaderMaterial });

export default function Particles() {
    const materialRef = useRef();
    const { mouse } = useThree();
    const prevMouse = useRef(new THREE.Vector2(0, 0));
    const velocity = useRef(new THREE.Vector2(0, 0));

    // More particles for denser effect
    const count = 500;
    const [positions, scales, randomness] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const randomness = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Wider distribution
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

            scales[i] = Math.random() * 0.8 + 0.2;

            randomness[i * 3] = Math.random();
            randomness[i * 3 + 1] = Math.random();
            randomness[i * 3 + 2] = Math.random();
        }

        return [positions, scales, randomness];
    }, [count]);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.getElapsedTime();
            materialRef.current.uMouse = mouse;

            // Calculate mouse velocity for trailing effects
            velocity.current.x = (mouse.x - prevMouse.current.x) * 0.5;
            velocity.current.y = (mouse.y - prevMouse.current.y) * 0.5;
            materialRef.current.uMouseVelocity = velocity.current;

            prevMouse.current.copy(mouse);

            // Theme detection
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            materialRef.current.uTheme = isDark ? 1.0 : 0.0;

            // Dynamic colors
            if (isDark) {
                materialRef.current.uColor = new THREE.Color('#60A5FA');
            } else {
                materialRef.current.uColor = new THREE.Color('#3B82F6');
            }
        }
    });

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    count={scales.length}
                    array={scales}
                    itemSize={1}
                />
                <bufferAttribute
                    attach="attributes-aRandomness"
                    count={randomness.length / 3}
                    array={randomness}
                    itemSize={3}
                />
            </bufferGeometry>
            <particleShaderMaterial
                ref={materialRef}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
