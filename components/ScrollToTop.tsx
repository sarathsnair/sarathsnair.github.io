'use client';

import { motion, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > 300);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 glass rounded-full flex items-center justify-center group hover:bg-blue-500/20 transition-all duration-300 shadow-lg shadow-blue-500/20"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} className="text-blue-400 group-hover:text-blue-300 group-hover:-translate-y-1 transition-all" />
    </motion.button>
  );
}
