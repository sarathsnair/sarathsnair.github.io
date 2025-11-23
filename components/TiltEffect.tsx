'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltEffect({
  children,
  className = '',
  intensity = 15
}: TiltEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate rotation based on mouse position
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -intensity;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * intensity;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 0.2
      }}
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
