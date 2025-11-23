/**
 * Performance utilities for optimizing based on device capabilities
 */

import { useState, useEffect } from 'react';

export interface DeviceCapabilities {
  isLowEnd: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  shouldLoadHeavyEffects: boolean;
  particleCount: number;
  fpsLimit: number;
}

export function getDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    // Server-side defaults
    return {
      isLowEnd: false,
      isMobile: false,
      prefersReducedMotion: false,
      shouldLoadHeavyEffects: false,
      particleCount: 200,
      fpsLimit: 60,
    };
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Detect mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;

  // Detect low-end devices based on hardware concurrency and device memory
  const cores = (navigator as any).hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4; // GB
  const isLowEnd = cores <= 2 || memory <= 2;

  // Determine if we should load heavy visual effects
  const shouldLoadHeavyEffects = !prefersReducedMotion && !isLowEnd;

  // Calculate optimal particle count
  let particleCount: number;
  if (prefersReducedMotion || isLowEnd) {
    particleCount = 0; // No particles
  } else if (isMobile) {
    particleCount = 200;
  } else {
    particleCount = 500;
  }

  // Calculate optimal FPS limit
  let fpsLimit: number;
  if (prefersReducedMotion || isLowEnd) {
    fpsLimit = 30;
  } else if (isMobile) {
    fpsLimit = 30;
  } else {
    fpsLimit = 60;
  }

  return {
    isLowEnd,
    isMobile,
    prefersReducedMotion,
    shouldLoadHeavyEffects,
    particleCount,
    fpsLimit,
  };
}

/**
 * Hook to get and subscribe to device capabilities
 */
export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(
    getDeviceCapabilities()
  );

  useEffect(() => {
    // Only set up listeners on client side
    if (typeof window === 'undefined') {
      return;
    }

    const updateCapabilities = () => {
      setCapabilities(getDeviceCapabilities());
    };

    // Listen for resize events (mobile orientation changes)
    window.addEventListener('resize', updateCapabilities);

    // Listen for reduced motion preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', updateCapabilities);

    return () => {
      window.removeEventListener('resize', updateCapabilities);
      motionQuery.removeEventListener('change', updateCapabilities);
    };
  }, []);

  return capabilities;
}
