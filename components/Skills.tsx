'use client';

import { getSkills, type SkillCategory } from '@/lib/data';
import { SectionHeader } from '@/components/SectionHeader';
import { Badge } from '@/components/Badge';
import { textStyles, colorStyles } from '@/lib/styles';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCardInView } from '@/lib/hooks';
import { getStaggeredAnimation, animations } from '@/lib/animations';

const skills = getSkills();

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const { ref, isInView } = useCardInView();
  const animation = getStaggeredAnimation(animations.cardEntrance, index);

  // Map color to style
  const categoryColor =
    category.color === 'secondary'
      ? colorStyles.secondaryBg
      : category.color === 'accent'
      ? colorStyles.accentBg
      : colorStyles.primaryBg;

  return (
    <motion.div
      ref={ref}
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      transition={animation.transition}
      className="relative group h-full"
    >
      {/* Main card */}
      <div className="relative bg-white border-4 border-black p-6 md:p-8 flex flex-col h-full z-10">

        {/* Category header with asymmetric accent */}
        <div className="relative mb-6">
          <h3 className={`${textStyles.h3} mb-1 relative inline-block`}>
            {category.category}
            {/* Asymmetric highlight bar */}
            <div
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-10"
              style={categoryColor}
            />
          </h3>
          {/* Decorative line */}
          <div className="flex gap-2 mt-3">
            <div className="flex-1 h-1 bg-black" />
            <div className="w-12 h-1" style={categoryColor} />
          </div>
        </div>

        {/* Skills grid */}
        <div className="flex flex-wrap gap-2 md:gap-2.5">
          {category.skills.map((skill, i) => (
            <Badge key={i} variant="outline" interactive className="whitespace-nowrap text-black">
              {skill}
            </Badge>
          ))}
        </div>

        {/* Colored shadow with asymmetric offset */}
        <div
          className="absolute inset-0 -z-10 transition-all duration-300 translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3"
          style={categoryColor}
        />

        {/* Corner accent - top right */}
        <div
          className="absolute -top-2 -right-2 w-8 h-8 border-4 border-black bg-white transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-[60deg] z-20"
        />

        {/* Corner accent - bottom left */}
        <div
          className="absolute -bottom-2 -left-2 w-6 h-6 bg-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
          style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { scrollY } = useScroll();

  // Parallax effect for decorative block
  const yBlock = useTransform(scrollY, [600, 1400], [0, -100]);

  return (
    <section id="skills" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Decorative blocks with parallax */}
      <motion.div
        className="absolute top-32 right-0 w-56 md:w-80 h-56 md:h-80 -rotate-12 translate-x-28 md:translate-x-40"
        style={{ backgroundColor: 'var(--secondary)', opacity: 0.1, y: yBlock }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          label="Technical Expertise"
          title="Core"
          subtitle="Skills"
          description="Technologies and tools I work with to build scalable, high-performance applications."
        />

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {skills.map((category, index) => (
            <SkillCategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
