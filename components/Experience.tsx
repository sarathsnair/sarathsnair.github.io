'use client';

import { getExperience, formatDateRange, type Experience } from '@/lib/data';
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';
import { TechBadge, DateBadge, AccentBadge } from '@/components/Badge';
import { textStyles } from '@/lib/styles';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { trackExperienceClick } from '@/lib/analytics';

const experience = getExperience();

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  return (
    <Card
      index={index}
      animationDirection={index % 2 === 0 ? 'left' : 'right'}
      padding="lg"
    >

        {/* Top row - Logo and Link Icon */}
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div className="flex-shrink-0 relative">
            <div className="relative w-16 h-16 md:w-24 md:h-24 border-3 md:border-4 border-black p-1.5 md:p-2 bg-white z-10">
              <Image
                src={exp.logo}
                alt={`${exp.company} logo`}
                width={96}
                height={96}
                className="object-contain w-full h-full"
                loading="lazy"
              />
            </div>
            {/* Asymmetric corner accent */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-4 border-l-4 border-black" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4" style={{ backgroundColor: 'var(--primary)' }} />
          </div>

          {exp.url && (
            <Link
              href={exp.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackExperienceClick(exp.company)}
              className="group/link relative w-10 h-10 flex items-center justify-center border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <ArrowUpRight className="w-5 h-5 group-hover/link:rotate-45 transition-transform duration-300" />
              {/* Asymmetric hover accent */}
              <div className="absolute -bottom-1 -right-1 w-2 h-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'var(--primary)' }} />
            </Link>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2 md:space-y-3">
          {/* Position */}
          <h3 className={textStyles.h3}>
            {exp.position}
          </h3>

          {/* Company */}
          <div className="text-base md:text-lg font-bold text-black">
            {exp.company}
          </div>

          {/* Duration and Current tag */}
          <div className="flex flex-wrap items-center gap-2">
            <DateBadge>
              {formatDateRange(exp.startDate, exp.endDate)}
            </DateBadge>
            {exp.endDate === 'Present' && (
              <AccentBadge>Current</AccentBadge>
            )}
          </div>

          {/* Description */}
          {exp.description && (
            <p className="text-base md:text-lg leading-[1.8] text-black mt-4" style={{ fontWeight: 500 }}>
                {exp.description}
              </p>
            )}

          {/* Responsibilities */}
          {exp.responsibilities && exp.responsibilities.length > 0 && (
            <div className="space-y-3 mt-5">
              <h4 className="text-sm font-black uppercase tracking-wider text-black">Key Achievements:</h4>
              <ul className="space-y-3">
                {exp.responsibilities.slice(0, 3).map((resp: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 flex-shrink-0 mt-2.5" style={{ backgroundColor: 'var(--primary)' }} />
                    <span className="text-base md:text-lg leading-[1.8] text-black" style={{ fontWeight: 500 }}>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech stack */}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
              {exp.technologies.slice(0, 6).map((tech: string, i: number) => (
                <TechBadge key={i}>{tech}</TechBadge>
              ))}
            </div>
          )}
        </div>
    </Card>
  );
}

export default function Experience() {
  const { scrollY } = useScroll();

  // Parallax effects for decorative blocks - optimized for mobile
  const yBlock1 = useTransform(scrollY, [100, 800], [0, -100]);
  const yBlock2 = useTransform(scrollY, [100, 800], [0, 80]);

  return (
    <section id="experience" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Decorative blocks with parallax */}
      <motion.div
        className="absolute top-20 right-0 w-40 md:w-64 h-40 md:h-64 rotate-12 translate-x-20 md:translate-x-32"
        style={{ backgroundColor: 'var(--primary)', opacity: 0.1, y: yBlock1 }}
      />
      <motion.div
        className="absolute bottom-20 left-0 w-32 md:w-48 h-32 md:h-48 -rotate-12 -translate-x-16 md:-translate-x-24 bg-black opacity-5"
        style={{ y: yBlock2 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          label="Work History"
          title="Professional"
          subtitle="Experience"
        />

        {/* Experience Cards */}
        <div className="space-y-8 md:space-y-12">
          {experience.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
