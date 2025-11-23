'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

/**
 * Parallax Section Wrapper
 * Creates depth by moving elements at different speeds based on scroll
 */

export interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // Multiplier for parallax effect (0 = no movement, 1 = normal scroll)
  className?: string;
  offset?: [number, number]; // Start and end scroll positions
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
  offset = [0, 1]
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Transform scroll progress to Y position
  const y = useTransform(scrollYProgress, offset, [100 * speed, -100 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Multi-layer parallax for complex depth effects
 */
export interface ParallaxLayersProps {
  layers: {
    content: ReactNode;
    speed: number;
    className?: string;
  }[];
  className?: string;
}

export function ParallaxLayers({ layers, className = '' }: ParallaxLayersProps) {
  return (
    <div className={`relative ${className}`}>
      {layers.map((layer, index) => (
        <ParallaxSection
          key={index}
          speed={layer.speed}
          className={layer.className}
        >
          {layer.content}
        </ParallaxSection>
      ))}
    </div>
  );
}

/**
 * Scroll-triggered reveal with parallax
 */
export interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = ''
}: ScrollRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.6']
  });

  // Define directional animations
  const directionConfig = {
    up: { y: [100, 0], x: [0, 0] },
    down: { y: [-100, 0], x: [0, 0] },
    left: { x: [100, 0], y: [0, 0] },
    right: { x: [-100, 0], y: [0, 0] },
  };

  const { y: yRange, x: xRange } = directionConfig[direction];

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const x = useTransform(scrollYProgress, [0, 1], xRange);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale reveal on scroll
 */
export function ScrollScale({
  children,
  scaleFrom = 0.8,
  scaleTo = 1,
  className = ''
}: {
  children: ReactNode;
  scaleFrom?: number;
  scaleTo?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.5']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [scaleFrom, scaleTo]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
