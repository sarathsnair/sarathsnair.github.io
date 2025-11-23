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
  // Card entrance animation
  cardEntrance: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },

  // Card entrance from left
  cardEntranceLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },

  // Card entrance from right
  cardEntranceRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },

  // Section header animation
  sectionHeader: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: durations.slow,
      ease: easings.smooth,
    },
  },

  // Scale entrance
  scaleEntrance: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },

  // Fade in
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
} as const;

/**
 * Get staggered animation with delay based on index
 */
export function getStaggeredAnimation(
  baseAnimation: any,
  index: number,
  staggerDelay: number = 0.15
) {
  return {
    ...baseAnimation,
    transition: {
      ...baseAnimation.transition,
      delay: index * staggerDelay,
    },
  };
}
