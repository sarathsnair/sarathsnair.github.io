'use client';

import { getProfile } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticEffect from './MagneticEffect';
import TiltEffect from './TiltEffect';
import { useCountUp } from '@/lib/useCountUp';
import { trackResumeDownload, trackSocialClick } from '@/lib/analytics';

const profile = getProfile();

export default function Hero() {
  const { scrollY } = useScroll();

  // Counter animations
  const { count: yearsCount, ref: yearsRef } = useCountUp({ end: 11, duration: 2000 });
  const { count: productsCount, ref: productsRef } = useCountUp({ end: 15, duration: 2000 });

  // Optimized parallax for mobile - reduced movement but still present
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const parallaxFactor = isMobile ? 0.5 : 1; // 50% movement on mobile

  const yBlock1 = useTransform(scrollY, [0, 300], [0, 100 * parallaxFactor]);
  const yBlock2 = useTransform(scrollY, [0, 300], [0, -80 * parallaxFactor]);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Large color block - top left with parallax */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: yBlock1 }}
        className="absolute top-0 left-0 w-[400px] md:w-[800px] h-[300px] md:h-[500px] bg-black -rotate-6 -translate-x-24 md:-translate-x-32 -translate-y-16 md:-translate-y-20 z-0"
      />

      {/* Color accent block - bottom right with parallax */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: yBlock2, backgroundColor: 'var(--primary)' }}
        className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[200px] md:h-[350px] rotate-12 translate-x-28 md:translate-x-40 translate-y-24 md:translate-y-32 z-0"
      />

      <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex flex-col justify-center">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text content */}
          <div className="space-y-8 overflow-visible order-1 lg:order-1">

            {/* Giant name - Brutalist style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-2 relative z-50 bg-white p-6 md:p-8 lg:p-10 -ml-4 md:-ml-10 lg:-ml-12 -mr-4 md:-mr-10 lg:-mr-12 overflow-visible"
            >
              <h1 className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.9] tracking-tighter uppercase">
                {profile.name.split(' ').map((word, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                    className={i % 2 === 0 ? 'text-black' : 'gradient-text-animated'}
                    style={{ fontWeight: 900 }}
                  >
                    {word}
                  </motion.div>
                ))}
              </h1>
            </motion.div>

            {/* Role - Bold statement with asymmetric accents */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative inline-block"
            >
              <h2
                className="text-2xl md:text-5xl font-bold uppercase leading-tight text-white px-4 py-3 md:px-6 md:py-4 -rotate-2 relative z-10"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {profile.title}
              </h2>
              {/* Asymmetric decorative elements */}
              <div className="absolute -bottom-2 -right-2 w-full h-full border-4 border-black -z-10" />
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-black" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-black" style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 100%)' }} />
            </motion.div>

            <div className="order-3 lg:order-none space-y-8">
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-2xl leading-[1.7] max-w-2xl text-black bg-white p-4 md:p-6 relative"
              style={{ fontWeight: 500 }}
            >
              {profile.bio}
            </motion.p>

            {/* Stats - Brutalist boxes with counter animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              {/* Years */}
              <div ref={yearsRef} className="relative group">
                <div className="relative px-8 py-6 bg-black text-white border-4 border-black transform group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300 z-10">
                  <div className="text-4xl font-black tabular-nums">{yearsCount}+</div>
                  <div className="text-xs font-mono tracking-widest mt-1">YEARS</div>
                </div>
                {/* Asymmetric shadow */}
                <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 -z-10 transition-all duration-300 group-hover:translate-x-3 group-hover:translate-y-3" style={{ backgroundColor: 'var(--primary)' }} />
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-4 border-l-4 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Products */}
              <div ref={productsRef} className="relative group">
                <div className="relative px-8 py-6 bg-black text-white border-4 border-black transform group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300 z-10">
                  <div className="text-4xl font-black tabular-nums">{productsCount}+</div>
                  <div className="text-xs font-mono tracking-widest mt-1">PRODUCTS</div>
                </div>
                {/* Asymmetric shadow */}
                <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 -z-10 transition-all duration-300 group-hover:translate-x-3 group-hover:translate-y-3" style={{ backgroundColor: 'var(--primary)' }} />
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-4 border-l-4 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <MagneticEffect className="inline-block">
                <Link
                  href="#projects"
                  className="group relative inline-block px-8 py-4 bg-black text-white text-lg font-bold uppercase tracking-wider border-4 border-black hover:bg-white hover:text-black transition-all duration-300"
                >
                  <span className="flex items-center gap-2 relative z-10">
                    View Work
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-all duration-300" />
                  </span>
                  {/* Asymmetric corner accents */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
                </Link>
              </MagneticEffect>

              <MagneticEffect className="inline-block">
                <Link
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackResumeDownload()}
                  className="group relative inline-block px-8 py-4 bg-white text-black text-lg font-bold uppercase tracking-wider border-4 border-black transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">Resume</span>
                  <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" style={{ backgroundColor: 'var(--primary)' }} />
                  {/* Corner accents */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-4 border-l-4 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                </Link>
              </MagneticEffect>
            </motion.div>

            {/* Social Links - Raw style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex items-center gap-4 pt-8"
            >
              {[
                { icon: Github, href: profile.social.github, label: 'GH', platform: 'github' as const },
                { icon: Linkedin, href: profile.social.linkedin, label: 'LI', platform: 'linkedin' as const },
                { icon: Mail, href: `mailto:${profile.contact.email}`, label: 'EM', platform: 'email' as const },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'EM' ? '_blank' : undefined}
                  rel={social.label !== 'EM' ? 'noopener noreferrer' : undefined}
                  onClick={() => trackSocialClick(social.platform)}
                  className="group relative w-16 h-16 flex items-center justify-center bg-white border-4 border-black hover:bg-black transition-all duration-300"
                >
                  <social.icon className="w-6 h-6 text-black group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  {/* Asymmetric corner accent */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-4 border-l-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-black opacity-0 group-hover:opacity-100 transition-opacity">
                    {social.label}
                  </div>
                </Link>
              ))}
            </motion.div>
            </div>
          </div>

          {/* Right - Image with brutalist treatment and primary color background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-2 w-full"
            style={{ perspective: 1000 }}
          >
            {/* Main image container */}
            <div className="relative aspect-square max-w-[600px] mx-auto">
              {/* Background layers - offset with primary color */}
              <div className="absolute inset-0 translate-x-8 translate-y-8 bg-black" />
              <div className="absolute inset-0 translate-x-4 translate-y-4" style={{ backgroundColor: 'var(--secondary)' }} />

              {/* Image with Tilt Effect */}
              <TiltEffect intensity={8}>
                <div className="relative aspect-square border-8 border-black overflow-hidden group/image" style={{ backgroundColor: 'var(--primary)' }}>
                  {/* Transparent PNG with primary color background - no padding for max zoom */}
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    className="object-contain group-hover/image:scale-105 transition-all duration-700"
                    priority
                  />

                  {/* Bold white inner border - brutalist style with asymmetry */}
                  <div className="absolute top-6 left-8 right-4 bottom-10 md:top-10 md:left-12 md:right-6 md:bottom-14 border-8 border-white pointer-events-none transition-all duration-500 group-hover/image:top-8 group-hover/image:left-10 group-hover/image:right-6 group-hover/image:bottom-12 md:group-hover/image:top-12 md:group-hover/image:left-14 md:group-hover/image:right-8 md:group-hover/image:bottom-16" />

                  {/* Grain texture overlay */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

                  {/* Overlay text - top badge */}
                  <div className="absolute top-3 left-3 md:top-6 md:left-6 px-2 py-1 md:px-4 md:py-2 font-mono text-xs md:text-sm uppercase tracking-widest border-2 border-black bg-black text-white">
                    Tech Lead
                  </div>

                  {/* Bottom label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black text-white p-3 md:p-6 font-bold text-sm md:text-xl uppercase tracking-tight border-t-8 border-black">
                    Staff Engineer @ Twilio
                  </div>

                  {/* Corner accents on hover */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-4 border-black bg-white transform rotate-45 opacity-0 group-hover/image:opacity-100 transition-all duration-300 group-hover/image:rotate-[60deg]" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-black opacity-0 group-hover/image:opacity-100 transition-all duration-300" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
                </div>
              </TiltEffect>

              {/* Floating accent blocks - animated */}
              <motion.div
                animate={{
                  x: [0, -10, 0],
                  y: [0, -10, 0],
                  rotate: [0, -3, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-16 h-16 md:w-32 md:h-32 border-4 border-black"
                style={{ backgroundColor: 'var(--secondary)' }}
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Vertical text decoration - hidden on mobile */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 -rotate-90 text-8xl font-black text-gray-200 select-none pointer-events-none opacity-20">
        PORTFOLIO
      </div>

      {/* Grid overlay - subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
    </section>
  );
}
