import { useEffect, useState, RefObject } from 'react';

/**
 * Hook to lazy load components when they're about to enter viewport
 * @param ref - Reference to the element to observe
 * @param rootMargin - Margin around the viewport (default: 400px before viewport)
 * @returns boolean indicating if the component should load
 */
export function useLazyLoad<T extends HTMLElement>(
  ref: RefObject<T | null>,
  rootMargin: string = '400px'
): boolean {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return shouldLoad;
}
