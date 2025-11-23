'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 25;
      });
    }, 120);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 400);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden"
        >
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_2px,transparent_2px),linear-gradient(to_bottom,#000_2px,transparent_2px)] bg-[size:60px_60px]" />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-12">

            {/* Animated brutalist logo */}
            <div className="relative">
              {/* Main letter box */}
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="relative"
              >
                {/* Main box with border */}
                <div className="relative w-32 h-32 border-[6px] border-black bg-white">
                  {/* Large S */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-7xl font-black text-black">S</span>
                  </motion.div>

                  {/* Inner pulsing square */}
                  <motion.div
                    animate={{
                      scale: [1, 0.95, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-4 border-2 border-black"
                  />
                </div>

                {/* Colored offset shadow */}
                <motion.div
                  animate={{
                    x: [8, 12, 8],
                    y: [8, 12, 8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 w-32 h-32 -z-10"
                  style={{ backgroundColor: 'var(--primary)' }}
                />

                {/* Corner accent squares */}
                {[
                  { top: -8, left: -8 },
                  { top: -8, right: -8 },
                  { bottom: -8, left: -8 },
                  { bottom: -8, right: -8 },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.4 + i * 0.1,
                      duration: 0.3,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="absolute w-4 h-4 bg-black"
                    style={pos}
                  />
                ))}
              </motion.div>
            </div>

            {/* Progress section */}
            <div className="flex flex-col items-center gap-6 w-80">
              {/* Loading text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="relative"
              >
                <h2 className="text-3xl font-black uppercase tracking-tighter text-black">
                  LOADING
                </h2>
                {/* Underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="h-2 bg-black mt-2 origin-left"
                  style={{ backgroundColor: 'var(--primary)' }}
                />
              </motion.div>

              {/* Brutalist progress bar */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="w-full"
              >
                <div className="relative w-full h-6 border-4 border-black bg-white">
                  {/* Progress fill */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-full relative overflow-hidden"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    {/* Animated stripes */}
                    <motion.div
                      animate={{ x: ['0%', '100%'] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.1)_25%,rgba(0,0,0,0.1)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.1)_75%)] bg-[length:20px_20px]"
                    />
                  </motion.div>

                  {/* Offset shadow for progress bar */}
                  <div
                    className="absolute inset-0 translate-x-1 translate-y-1 -z-10 border-4 border-black"
                    style={{ backgroundColor: 'var(--secondary)' }}
                  />
                </div>

                {/* Percentage with brutalist badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-end mt-3"
                >
                  <div className="relative inline-block">
                    <div className="px-4 py-1 bg-black text-white font-mono text-sm font-bold border-2 border-black">
                      {Math.min(Math.round(progress), 100)}%
                    </div>
                    <div
                      className="absolute inset-0 translate-x-1 translate-y-1 -z-10"
                      style={{ backgroundColor: 'var(--primary)' }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Animated dots */}
              <div className="flex gap-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                    className="w-4 h-4 border-4 border-black bg-white relative"
                  >
                    <div
                      className="absolute inset-0 translate-x-0.5 translate-y-0.5 -z-10 w-4 h-4"
                      style={{ backgroundColor: 'var(--primary)' }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative brutalist blocks */}
          <motion.div
            initial={{ x: -100, y: -100, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-10 left-10 w-24 h-24 border-4 border-black -rotate-12"
            style={{ backgroundColor: 'var(--secondary)' }}
          />

          <motion.div
            initial={{ x: 100, y: 100, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-10 right-10 w-32 h-32 border-4 border-black rotate-12"
            style={{ backgroundColor: 'var(--accent)' }}
          />

          {/* Corner triangles */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-black border-l-[60px] border-l-transparent"
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="absolute bottom-0 left-0 w-0 h-0 border-b-[60px] border-b-black border-r-[60px] border-r-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
