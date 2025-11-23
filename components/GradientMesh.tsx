'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Animated Gradient Mesh Background
 * Creates organic, flowing gradient orbs that animate smoothly
 */

interface GradientOrbProps {
  color: string;
  size: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
}

function GradientOrb({ color, size, top, left, right, bottom, delay = 0 }: GradientOrbProps) {
  return (
    <motion.div
      className="absolute rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-70"
      style={{
        background: color,
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
      }}
      animate={{
        x: [0, 30, -30, 0],
        y: [0, -30, 30, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export interface GradientMeshProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'vibrant';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

export function GradientMesh({
  variant = 'primary',
  intensity = 'medium',
  className = ''
}: GradientMeshProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define color schemes based on variant
  const colorSchemes = {
    primary: {
      orb1: 'radial-gradient(circle, rgba(255, 107, 107, 0.8) 0%, rgba(255, 107, 107, 0) 70%)',
      orb2: 'radial-gradient(circle, rgba(78, 205, 196, 0.8) 0%, rgba(78, 205, 196, 0) 70%)',
      orb3: 'radial-gradient(circle, rgba(69, 183, 209, 0.8) 0%, rgba(69, 183, 209, 0) 70%)',
    },
    secondary: {
      orb1: 'radial-gradient(circle, rgba(155, 89, 182, 0.8) 0%, rgba(155, 89, 182, 0) 70%)',
      orb2: 'radial-gradient(circle, rgba(52, 152, 219, 0.8) 0%, rgba(52, 152, 219, 0) 70%)',
      orb3: 'radial-gradient(circle, rgba(46, 204, 113, 0.8) 0%, rgba(46, 204, 113, 0) 70%)',
    },
    accent: {
      orb1: 'radial-gradient(circle, rgba(255, 193, 7, 0.8) 0%, rgba(255, 193, 7, 0) 70%)',
      orb2: 'radial-gradient(circle, rgba(255, 87, 34, 0.8) 0%, rgba(255, 87, 34, 0) 70%)',
      orb3: 'radial-gradient(circle, rgba(233, 30, 99, 0.8) 0%, rgba(233, 30, 99, 0) 70%)',
    },
    vibrant: {
      orb1: 'radial-gradient(circle, rgba(255, 0, 255, 0.6) 0%, rgba(255, 0, 255, 0) 70%)',
      orb2: 'radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, rgba(0, 255, 255, 0) 70%)',
      orb3: 'radial-gradient(circle, rgba(255, 255, 0, 0.6) 0%, rgba(255, 255, 0, 0) 70%)',
    },
  };

  const colors = colorSchemes[variant];

  // Adjust opacity based on intensity
  const opacityMap = {
    subtle: 'opacity-30',
    medium: 'opacity-50',
    strong: 'opacity-70',
  };

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Top left orb */}
      <GradientOrb
        color={colors.orb1}
        size="400px"
        top="-10%"
        left="-10%"
        delay={0}
      />

      {/* Top right orb */}
      <GradientOrb
        color={colors.orb2}
        size="350px"
        top="10%"
        right="-5%"
        delay={5}
      />

      {/* Bottom center orb */}
      <GradientOrb
        color={colors.orb3}
        size="450px"
        bottom="-15%"
        left="30%"
        delay={10}
      />

      {/* Middle orb */}
      <GradientOrb
        color={colors.orb1}
        size="300px"
        top="50%"
        right="20%"
        delay={7}
      />

      {/* Overlay to soften effect */}
      <div className={`absolute inset-0 bg-white/20 backdrop-blur-[1px] ${opacityMap[intensity]}`} />
    </div>
  );
}

/**
 * Simpler gradient mesh for sections
 */
export function SectionGradientMesh({ variant = 'primary' }: { variant?: 'primary' | 'secondary' | 'accent' }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <GradientOrb
        color="radial-gradient(circle, var(--primary) 0%, transparent 70%)"
        size="300px"
        top="-10%"
        right="-5%"
        delay={0}
      />
      <GradientOrb
        color="radial-gradient(circle, var(--secondary) 0%, transparent 70%)"
        size="250px"
        bottom="-10%"
        left="-5%"
        delay={5}
      />
    </div>
  );
}
