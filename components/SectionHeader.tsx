/**
 * Reusable Section Header component
 * Used across all major sections (Experience, Projects, Education, etc.)
 */

'use client';

import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import { animations } from '@/lib/animations';
import { textStyles, colorStyles } from '@/lib/styles';

export interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  description,
  className = 'mb-16 md:mb-20'
}: SectionHeaderProps) {
  const { ref, isInView } = useSectionInView();

  return (
    <motion.div
      ref={ref}
      initial={animations.sectionHeader.initial}
      animate={isInView ? animations.sectionHeader.animate : animations.sectionHeader.initial}
      transition={animations.sectionHeader.transition}
      className={className}
    >
      {/* Label badge with asymmetric accent */}
      <div className="relative inline-block mb-8">
        <div className="relative px-6 py-2 bg-black text-white text-sm font-mono uppercase tracking-widest z-10">
          {label}
        </div>
        {/* Asymmetric accent bars */}
        <div className="absolute top-0 -left-2 w-1 h-full" style={colorStyles.primaryBg} />
        <div className="absolute bottom-0 -right-2 w-12 h-1" style={colorStyles.primaryBg} />
      </div>

      {/* Title with subtitle and asymmetric underline */}
      <div className="relative overflow-visible">
        <h2 className={textStyles.h1}>
          <span className="block text-black relative">
            {title}
            {/* Shine effect on scroll */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={isInView ? { x: '200%' } : { x: '-100%' }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
              style={{ mixBlendMode: 'overlay' }}
            />
          </span>
          <span className="block relative inline-block gradient-text-animated pr-2">
            {subtitle}
            {/* Asymmetric underline */}
            <div className="absolute -bottom-3 left-0 right-0 h-2 flex gap-2">
              <div className="flex-1 h-full bg-black" />
              <div className="w-8 h-full" style={colorStyles.primaryBg} />
              <div className="w-4 h-full bg-black" />
            </div>
          </span>
        </h2>
      </div>

      {/* Optional description */}
      {description && (
        <p className={`${textStyles.bodyLarge} font-medium max-w-2xl mt-10`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
