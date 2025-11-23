'use client';

import { getTestimonials, type Testimonial } from '@/lib/data';
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { textStyles, colorStyles, buttonStyles } from '@/lib/styles';
import { useSectionInView } from '@/lib/hooks';
import { animations } from '@/lib/animations';
import { Quote, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const testimonials = getTestimonials();

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <Card index={index} padding="md">
        {/* Quote icon */}
        <div className="mb-4">
          <div
            className="w-12 h-12 border-4 border-black flex items-center justify-center rotate-6"
            style={colorStyles.primaryBg}
          >
            <Quote className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Quote text */}
        <blockquote className="flex-1 mb-6">
          <p className="text-base md:text-lg leading-[1.7] text-black font-medium">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        {/* Author info */}
        <div className="border-t-4 border-black pt-4 mt-auto">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className={`${textStyles.h4} mb-1`}>
                {testimonial.name}
              </div>
              <div className="text-sm font-bold text-black mb-2">
                {testimonial.title}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary">
                  {testimonial.company}
                </Badge>
                <Badge
                  variant="sm"
                  className="text-white border-2 border-black"
                  style={colorStyles.primaryBg}
                >
                  {testimonial.relationship}
                </Badge>
              </div>
            </div>
          </div>
        </div>
    </Card>
  );
}

export default function Testimonials() {
  const { ref, isInView } = useSectionInView();

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Decorative blocks */}
      <motion.div
        className="absolute top-20 right-0 w-40 md:w-64 h-40 md:h-64 rotate-12 translate-x-20 md:translate-x-32 bg-black opacity-5"
        initial={{ rotate: 12 }}
        animate={{ rotate: [12, 15, 12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          label="What People Say"
          title="Kind Words"
          subtitle="From Colleagues"
          description="Recommendations from managers, peers, and collaborators I've had the privilege to work with."
        />

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* View More Link */}
        <motion.div
          initial={animations.fadeIn.initial}
          animate={isInView ? animations.fadeIn.animate : animations.fadeIn.initial}
          transition={{ ...animations.fadeIn.transition, delay: 0.6 }}
          className="flex justify-center"
        >
          <Link
            href="https://www.linkedin.com/in/sarathsnairxyz"
            target="_blank"
            rel="noopener noreferrer"
            className={`group ${buttonStyles.primary}`}
          >
            {/* Button shadow */}
            <div
              className="absolute inset-0 translate-x-2 translate-y-2 -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"
              style={colorStyles.primaryBg}
            />

            <Linkedin className="w-5 h-5" />
            <span>View All Recommendations</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
