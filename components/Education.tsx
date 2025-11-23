'use client';

import { getEducation } from '@/lib/data';
import { GraduationCap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const education = getEducation();

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollY } = useScroll();

  // Parallax effect for decorative block - optimized for mobile
  const yBlock = useTransform(scrollY, [1200, 2200], [0, 100]);

  return (
    <section id="education" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Decorative blocks with parallax */}
      <motion.div
        className="absolute bottom-20 right-0 w-40 md:w-64 h-40 md:h-64 rotate-12 translate-x-20 md:translate-x-32"
        style={{ backgroundColor: 'var(--primary)', opacity: 0.1, y: yBlock }}
      />

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
            Academic Background
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
            <span className="block" style={{ color: 'var(--primary)' }}>Education</span>
          </h2>
        </motion.div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative group"
            >
              {/* Main card */}
              <div className="relative bg-white border-4 border-black p-4 md:p-8">
                {/* Colored shadow */}
                <div
                  className="absolute inset-0 translate-x-2 translate-y-2 -z-10"
                  style={{ backgroundColor: 'var(--primary)' }}
                />

                {/* Icon */}
                <div className="mb-4">
                  <div className="w-16 h-16 border-4 border-black flex items-center justify-center bg-black">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-2">
                  {edu.degree}
                </h3>
                <p className="text-lg font-bold text-black mb-2">{edu.institution}</p>
                <div className="flex flex-wrap items-center gap-3">
                  {edu.year && (
                    <span className="px-3 py-1 bg-black text-white text-xs font-mono uppercase tracking-wider">
                      {edu.year}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
