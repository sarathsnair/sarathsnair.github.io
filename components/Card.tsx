/**
 * Reusable Card component with brutalist design
 * Used across Experience, Projects, Testimonials, Education, Achievements
 */

'use client';

import { motion } from 'framer-motion';
import { useCardInView } from '@/lib/hooks';
import { getStaggeredAnimation, animations } from '@/lib/animations';
import { cardStyles, colorStyles, cn } from '@/lib/styles';

export interface CardProps {
  children: React.ReactNode;
  index?: number;
  shadowColor?: 'primary' | 'secondary' | 'accent';
  padding?: 'sm' | 'md' | 'lg';
  animationDirection?: 'up' | 'left' | 'right' | 'scale';
  className?: string;
}

export function Card({
  children,
  index = 0,
  shadowColor = 'primary',
  padding = 'md',
  animationDirection = 'up',
  className
}: CardProps) {
  const { ref, isInView } = useCardInView();

  // Select animation based on direction
  const baseAnimation =
    animationDirection === 'left'
      ? animations.cardEntranceLeft
      : animationDirection === 'right'
      ? animations.cardEntranceRight
      : animationDirection === 'scale'
      ? animations.scaleEntrance
      : animations.cardEntrance;

  const animation = getStaggeredAnimation(baseAnimation, index);

  // Map padding size to className
  const paddingClass =
    padding === 'sm'
      ? cardStyles.paddingSm
      : padding === 'lg'
      ? cardStyles.paddingLg
      : cardStyles.paddingMd;

  // Map shadow color to style
  const shadowStyle =
    shadowColor === 'secondary'
      ? colorStyles.secondaryBg
      : shadowColor === 'accent'
      ? colorStyles.accentBg
      : colorStyles.primaryBg;

  return (
    <motion.div
      ref={ref}
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      transition={animation.transition}
      className="relative group h-full"
    >
      {/* Main card */}
      <div className={cn(cardStyles.base, paddingClass, 'flex flex-col', className)}>
        {/* Colored shadow */}
        <div
          className={cn(cardStyles.shadow, cardStyles.shadowHover)}
          style={shadowStyle}
        />

        {/* Card content */}
        {children}
      </div>
    </motion.div>
  );
}
