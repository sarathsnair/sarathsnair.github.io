/**
 * Animation constants and presets for consistent animations across the application
 */

export const easings = {
  smooth: [0.22, 1, 0.36, 1] as const,
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.42, 0, 0.58, 1] as const,
} as const;

export const durations = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
} as const;

export const animations = {
  // Card entrance animation - smoother and faster
  cardEntrance: {
    initial: { opacity: 0, y: 40, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },

  // Card entrance from left - smoother and faster
  cardEntranceLeft: {
    initial: { opacity: 0, x: -40, rotateY: -10 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },

  // Card entrance from right - smoother and faster
  cardEntranceRight: {
    initial: { opacity: 0, x: 40, rotateY: 10 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },

  // Section header animation - faster for smoother flow
  sectionHeader: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },

  // Scale entrance - faster pop
  scaleEntrance: {
    initial: { opacity: 0, scale: 0.9, rotate: -3 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1], // Bouncy easing
    },
  },

  // Fade in - slower and smoother
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    },
  },

  // New: Slide up with bounce
  slideUpBounce: {
    initial: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
} as const;

/**
 * Get staggered animation with delay based on index
 * Reduced default stagger delay for smoother, faster reveals
 */
export function getStaggeredAnimation(
  baseAnimation: any,
  index: number,
  staggerDelay: number = 0.08
) {
  return {
    ...baseAnimation,
    transition: {
      ...baseAnimation.transition,
      delay: index * staggerDelay,
    },
  };
}
