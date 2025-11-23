'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceCapabilities } from '@/lib/performance';

function AnimatedSphere({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * speed * 0.05;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.03;
    }
  });

  return (
    <Float speed={speed * 0.3} rotationIntensity={0.2} floatIntensity={0.3}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={2}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.2}
          speed={0.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.4}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField({ particleCount }: { particleCount: number }) {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} />
    </points>
  );
}

export default function ThreeBackground() {
  const capabilities = useDeviceCapabilities();
  const [colors, setColors] = useState({
    primary: '#3b82f6',
    secondary: '#06b6d4',
    accent: '#8b5cf6'
  });

  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement;
      const primary = getComputedStyle(root).getPropertyValue('--primary').trim();
      const secondary = getComputedStyle(root).getPropertyValue('--secondary').trim();
      const accent = getComputedStyle(root).getPropertyValue('--accent').trim();

      setColors({ primary, secondary, accent });
    };

    // Initial load
    updateColors();

    // Debounced update for better performance
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateColors, 100);
    };

    // Listen for CSS variable changes
    const observer = new MutationObserver(debouncedUpdate);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  // Don't render on low-end devices or if reduced motion is preferred
  if (!capabilities.shouldLoadHeavyEffects) {
    return null;
  }

  // Reduce complexity on mobile
  const particleCount = capabilities.isMobile ? 200 : 500;

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
        frameloop="demand" // Only render when needed
        dpr={capabilities.isMobile ? 1 : [1, 2]} // Lower DPR on mobile
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color={colors.secondary} />

        {!capabilities.isMobile && (
          <>
            <AnimatedSphere position={[-3, 2, -2]} color={colors.primary} speed={0.5} />
            <AnimatedSphere position={[4, -2, -3]} color={colors.secondary} speed={0.7} />
            <AnimatedSphere position={[0, 0, -5]} color={colors.accent} speed={0.3} />
          </>
        )}

        <ParticleField particleCount={particleCount} />
      </Canvas>
    </div>
  );
}
