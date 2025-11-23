/**
 * Custom hook for 3D tilt effect on mouse movement
 * Creates an interactive parallax tilt effect
 */

import { useRef, useState, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export interface Use3DTiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  gyroscope?: boolean;
}

export function use3DTilt({
  maxTilt = 15,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
  gyroscope = false
}: Use3DTiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth animations
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth, natural movement
  const springConfig = { damping: 20, stiffness: speed };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const scaleValue = useSpring(useMotionValue(1), springConfig);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate position relative to center
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      // Update motion values
      x.set(percentX);
      y.set(percentY);

      // Apply tilt (note: rotateX uses Y mouse movement and vice versa)
      rotateX.set(-percentY * maxTilt);
      rotateY.set(percentX * maxTilt);
      scaleValue.set(scale);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // Reset to neutral position
      rotateX.set(0);
      rotateY.set(0);
      scaleValue.set(1);
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, scale, x, y, rotateX, rotateY, scaleValue]);

  return {
    ref,
    style: {
      transform: isHovered ? 'preserve-3d' : undefined,
      transformStyle: 'preserve-3d' as const,
    },
    motionStyle: {
      rotateX,
      rotateY,
      scale: scaleValue,
    },
    isHovered,
  };
}
