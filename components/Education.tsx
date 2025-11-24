'use client';

import { getEducation } from '@/lib/data';
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';
import { GraduationCap } from 'lucide-react';
import { textStyles } from '@/lib/styles';
import { motion, useScroll, useTransform } from 'framer-motion';

const education = getEducation();

export default function Education() {
  const { scrollY } = useScroll();

  // Enhanced parallax for decorative blocks
  const yBlock = useTransform(scrollY, [1500, 3000], [0, 150]);
  const rotateBlock = useTransform(scrollY, [1500, 3000], [12, 30]);

  return (
    <section id="education" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Decorative blocks with enhanced parallax */}
      <motion.div
        className="absolute bottom-20 right-0 w-40 md:w-64 h-40 md:h-64 translate-x-20 md:translate-x-32"
        style={{
          backgroundColor: 'var(--primary)',
          opacity: 0.1,
          y: yBlock,
          rotate: rotateBlock
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header with gradient text */}
        <SectionHeader
          label="Academic Background"
          title="Education"
          subtitle="& Learning"
        />

        {/* Education Cards with parallax */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {education.map((edu, index) => (
            <Card key={edu.id} index={index} animationDirection={index % 2 === 0 ? 'left' : 'right'}>
              {/* Icon */}
              <div className="mb-4">
                <div className="w-16 h-16 border-4 border-black flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className={`${textStyles.h3} mb-2`}>
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
