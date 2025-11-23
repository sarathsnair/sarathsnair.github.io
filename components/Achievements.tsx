'use client';

import { getAchievements } from '@/lib/data';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const achievements = getAchievements();

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="achievements" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-block px-6 py-2 bg-black text-white text-sm font-mono uppercase tracking-widest mb-6">
            Honors & Awards
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
            <span className="block">Key</span>
            <span className="block" style={{ color: 'var(--primary)' }}>Achievements</span>
          </h2>
        </motion.div>

        {/* Achievements List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative group"
            >
              {/* Main card */}
              <div className="relative bg-white border-4 border-black p-4 md:p-6">
                {/* Colored shadow */}
                <div
                  className="absolute inset-0 translate-x-2 translate-y-2 -z-10"
                  style={{ backgroundColor: 'var(--primary)' }}
                />

                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 border-4 border-black flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-black mb-2">
                  {achievement.title}
                </h3>
                {achievement.date && (
                  <span className="inline-block px-3 py-1 bg-black text-white text-xs font-mono uppercase tracking-wider">
                    {achievement.date}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
