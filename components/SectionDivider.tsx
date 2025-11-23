'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionDividerProps {
  variant?: 'line' | 'blocks' | 'zigzag';
}

export default function SectionDivider({ variant = 'line' }: SectionDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  if (variant === 'blocks') {
    return (
      <div ref={ref} className="relative py-8 overflow-hidden">
        <div className="flex justify-center gap-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-4 h-16 md:w-6 md:h-24 border-4 border-black"
              style={{
                backgroundColor: i === 2 ? 'var(--primary)' : i % 2 === 0 ? 'black' : 'white',
                originY: 0.5
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'zigzag') {
    return (
      <div ref={ref} className="relative py-8 overflow-hidden">
        <div className="flex justify-center items-center gap-2">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, delay: i * 0.02 }}
              className="w-2 md:w-3 border-2 border-black"
              style={{
                height: i % 2 === 0 ? '32px' : '16px',
                backgroundColor: i % 4 === 0 ? 'var(--primary)' : 'white',
                originX: 0.5
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default: line variant
  return (
    <div ref={ref} className="relative py-8 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative h-1">
          {/* Main line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-black"
            style={{ originX: 0 }}
          />

          {/* Accent square */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={isInView ? { x: '0%', opacity: 1 } : { x: '-100%', opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 -top-4 w-10 h-10 border-4 border-black"
            style={{ backgroundColor: 'var(--primary)' }}
          />
        </div>
      </div>
    </div>
  );
}
