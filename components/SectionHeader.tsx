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
      {/* Label badge */}
      <div className="inline-block px-6 py-2 bg-black text-white text-sm font-mono uppercase tracking-widest mb-6">
        {label}
      </div>

      {/* Title with subtitle */}
      <h2 className={textStyles.h1}>
        <span className="block text-black">{title}</span>
        <span className="block" style={colorStyles.primaryText}>{subtitle}</span>
      </h2>

      {/* Optional description */}
      {description && (
        <p className={`${textStyles.bodyLarge} font-medium max-w-2xl mt-6`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
