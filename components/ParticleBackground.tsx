'use client';

import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, Container } from '@tsparticles/engine';
import { useDeviceCapabilities } from '@/lib/performance';

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const capabilities = useDeviceCapabilities();

  useEffect(() => {
    // Only initialize if we should load particles
    if (capabilities.particleCount === 0) {
      return;
    }

    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, [capabilities.particleCount]);

  const particlesLoaded = useCallback(async (container?: Container) => {
    // Particles loaded callback
  }, []);

  // Don't render if reduced motion or no particles
  if (!init || capabilities.particleCount === 0) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-10"
      particlesLoaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: capabilities.fpsLimit,
        interactivity: {
          events: {
            onHover: {
              enable: !capabilities.isMobile, // Disable hover interactions on mobile
              mode: 'grab',
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
              },
            },
          },
        },
        particles: {
          color: {
            value: ['#3b82f6', '#06b6d4', '#8b5cf6'],
          },
          links: {
            color: '#3b82f6',
            distance: 150,
            enable: true,
            opacity: 0.15,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 0.3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: capabilities.particleCount,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
