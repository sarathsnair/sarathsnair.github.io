'use client';

import { useEffect } from 'react';

export default function KeyboardNav() {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const sections = ['hero', 'experience', 'projects', 'education', 'achievements'];
      const currentSection = sections.findIndex(id => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
      });

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        const nextSection = sections[Math.min(currentSection + 1, sections.length - 1)];
        document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        const prevSection = sections[Math.max(currentSection - 1, 0)];
        document.getElementById(prevSection)?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return null;
}
