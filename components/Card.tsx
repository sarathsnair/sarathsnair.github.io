/**
 * Reusable Card component with brutalist design
 * Used across Experience, Projects, Testimonials, Education, Achievements
 */

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useCardInView } from '@/lib/hooks';
import { getStaggeredAnimation, animations } from '@/lib/animations';
import { cardStyles, colorStyles, cn } from '@/lib/styles';
import { useRef } from 'react';

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
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Optimized parallax for mobile - reduced range but still present
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Parallax effect - reduced speeds on mobile for better performance
  const getParallaxSpeed = (idx: number) => {
    const tier = idx % 3;
    const mobileFactor = isMobile ? 0.4 : 1; // 40% of desktop speed on mobile

    if (tier === 0) return 60 * mobileFactor;  // Fast moving cards
    if (tier === 1) return -40 * mobileFactor; // Medium moving cards (opposite direction)
    return 30 * mobileFactor;                   // Slow moving cards
  };

  const parallaxSpeed = getParallaxSpeed(index);
  // Use smooth easing for parallax transitions
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [parallaxSpeed, parallaxSpeed * 0.5, -parallaxSpeed * 0.5, -parallaxSpeed]
  );

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

  // Get gradient shadow colors for depth
  const getGradientShadow = () => {
    if (shadowColor === 'secondary') {
      return 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)';
    } else if (shadowColor === 'accent') {
      return 'linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%)';
    }
    return 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)';
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      transition={animation.transition}
      className="relative group h-full card-parallax"
    >
      {/* Main card with varied border thickness */}
      <div ref={ref} className={cn('relative bg-white border-4 border-black', paddingClass, 'flex flex-col border-t-[3px] border-l-[5px] border-r-[3px] border-b-[6px]', className)}>
        {/* Noise texture overlay */}
        <div className={cn(cardStyles.noise, 'overflow-hidden')} />

        {/* Colored shadow with gradient */}
        <div
          className={cn(
            'absolute inset-0 -z-10 transition-all duration-500 ease-out',
            'translate-x-2 translate-y-2',
            'group-hover:translate-x-3 group-hover:translate-y-3'
          )}
          style={{ background: getGradientShadow() }}
        />

        {/* Card content */}
        <div className="relative z-[1]">
          {children}
        </div>

        {/* Corner accent - top right */}
        <div
          className="absolute -top-2 -right-2 w-8 h-8 border-4 border-black bg-white transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-[60deg] z-[100] pointer-events-none"
        />

        {/* Corner accent - bottom left */}
        <div
          className="absolute -bottom-2 -left-2 w-6 h-6 bg-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-[100] pointer-events-none"
          style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
        />
      </div>
    </motion.div>
  );
}
