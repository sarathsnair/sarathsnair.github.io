'use client';

import { getAchievements } from '@/lib/data';
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';
import { Trophy } from 'lucide-react';
import { textStyles } from '@/lib/styles';
import { motion, useScroll, useTransform } from 'framer-motion';

const achievements = getAchievements();

export default function Achievements() {
  const { scrollY } = useScroll();

  // Enhanced parallax for decorative blocks
  const yBlock1 = useTransform(scrollY, [2000, 3500], [0, -120]);
  const rotateBlock1 = useTransform(scrollY, [2000, 3500], [-8, -20]);
  const yBlock2 = useTransform(scrollY, [2000, 3500], [0, 100]);
  const rotateBlock2 = useTransform(scrollY, [2000, 3500], [15, 30]);

  return (
    <section id="achievements" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Decorative blocks with enhanced parallax */}
      <motion.div
        className="absolute top-32 left-0 w-48 md:w-80 h-48 md:h-80 -translate-x-24 md:-translate-x-40"
        style={{
          backgroundColor: 'var(--secondary)',
          opacity: 0.1,
          y: yBlock1,
          rotate: rotateBlock1
        }}
      />
      <motion.div
        className="absolute bottom-20 right-0 w-40 md:w-64 h-40 md:h-64 translate-x-20 md:translate-x-32"
        style={{
          backgroundColor: 'var(--primary)',
          opacity: 0.1,
          y: yBlock2,
          rotate: rotateBlock2
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header with gradient text */}
        <SectionHeader
          label="Honors & Awards"
          title="Key"
          subtitle="Achievements"
        />

        {/* Achievements Cards with parallax */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((achievement, index) => (
            <Card key={achievement.id} index={index} padding="md" animationDirection="scale">
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
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {achievement.date && (
                  <span className="inline-block px-3 py-1 bg-black text-white text-xs font-mono uppercase tracking-wider">
                    {achievement.date}
                  </span>
                )}
                {achievement.showCompany && achievement.organization && (
                  <span className="inline-block px-3 py-1 text-black text-xs font-bold uppercase tracking-wider border-2 border-black">
                    {achievement.organization}
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
