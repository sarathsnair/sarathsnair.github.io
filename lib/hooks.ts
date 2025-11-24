/**
 * Custom React hooks for common patterns
 */

import { useRef } from 'react';
import { useInView, type UseInViewOptions } from 'framer-motion';

/**
 * Hook for section reveal animations
 * Returns a ref and isInView boolean that can be used with framer-motion
 * Increased margin to trigger animations earlier for smoother experience
 */
export function useSectionInView(margin: string = '0px 0px -200px 0px') {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin } as UseInViewOptions);

  return { ref, isInView };
}

/**
 * Hook for card reveal animations with custom margin
 * Trigger animations earlier (when 200px from bottom of viewport) for smoother scrolling
 */
export function useCardInView(margin: string = '0px 0px -200px 0px') {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin } as UseInViewOptions);

  return { ref, isInView };
}
