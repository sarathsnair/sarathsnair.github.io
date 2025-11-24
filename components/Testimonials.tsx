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
import { trackSocialClick } from '@/lib/analytics';

const testimonials = getTestimonials();

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <Card index={index} padding="md">
        {/* Quote icon */}
        <div className="mb-4 relative inline-block">
          <div
            className="relative w-12 h-12 border-4 border-black flex items-center justify-center rotate-6"
            style={colorStyles.primaryBg}
          >
            <Quote className="w-6 h-6 text-white -rotate-6" />
          </div>
        </div>

        {/* Quote text */}
        <blockquote className="flex-1 mb-8">
          <p className="text-base md:text-lg leading-[1.9] text-black font-normal italic">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        {/* Author info */}
        <div className="border-t-4 border-black pt-5 mt-auto">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className={`${textStyles.h4} mb-2`}>
                {testimonial.name}
              </div>
              <div className="text-sm md:text-base font-medium text-black/80 mb-3">
                {testimonial.title}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary">
                  {testimonial.company}
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
        <div className="flex justify-center mt-8" style={{ position: 'relative', zIndex: 100 }}>
          <div className="relative">
            {/* Main Button */}
            <Link
              href="https://www.linkedin.com/in/sarathsnairxyz"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialClick('linkedin')}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white border-4 border-black font-black uppercase text-base tracking-wider text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              <span>View All Recommendations</span>
            </Link>

            {/* Colored shadow */}
            <div
              className="absolute inset-0 translate-x-2 translate-y-2 -z-10 transition-all duration-300"
              style={colorStyles.primaryBg}
            />

            {/* Corner accents on hover */}
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-4 border-r-4 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
