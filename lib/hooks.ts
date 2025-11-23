/**
 * Custom React hooks for common patterns
 */

import { useRef } from 'react';
import { useInView, type UseInViewOptions } from 'framer-motion';

/**
 * Hook for section reveal animations
 * Returns a ref and isInView boolean that can be used with framer-motion
 */
export function useSectionInView(margin: string = '-100px') {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin } as UseInViewOptions);

  return { ref, isInView };
}

/**
 * Hook for card reveal animations with custom margin
 */
export function useCardInView(margin: string = '-50px') {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin } as UseInViewOptions);

  return { ref, isInView };
}
