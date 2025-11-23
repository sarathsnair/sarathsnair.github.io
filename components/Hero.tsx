'use client';

import { getProfile } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticEffect from './MagneticEffect';
import TiltEffect from './TiltEffect';

const profile = getProfile();

export default function Hero() {
  const { scrollY } = useScroll();

  // Parallax transforms - optimized for mobile with shorter scroll distances
  const yBlock1 = useTransform(scrollY, [0, 300], [0, 100]);
  const yBlock2 = useTransform(scrollY, [0, 300], [0, -80]);

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
                    style={i % 2 === 0 ? { color: '#000000', fontWeight: 900 } : { color: 'var(--primary)', fontWeight: 900 }}
                  >
                    {word}
                  </motion.div>
                ))}
              </h1>
            </motion.div>

            {/* Role - Bold statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative inline-block"
            >
              <h2
                className="text-2xl md:text-5xl font-bold uppercase leading-tight text-white px-4 py-3 md:px-6 md:py-4 -rotate-2"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {profile.title}
              </h2>
              {/* Decorative line */}
              <div className="absolute -bottom-2 -right-2 w-full h-full border-4 border-black -z-10" />
            </motion.div>

            <div className="order-3 lg:order-none space-y-8">
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-2xl leading-[1.7] max-w-2xl text-black"
              style={{ fontWeight: 500 }}
            >
              {profile.bio}
            </motion.p>

            {/* Stats - Brutalist boxes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { value: '11+', label: 'YEARS' },
                { value: '15+', label: 'PRODUCTS' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="relative group"
                >
                  <div className="px-8 py-6 bg-black text-white border-4 border-black transform group-hover:translate-x-2 group-hover:translate-y-2 transition-transform">
                    <div className="text-4xl font-black">{stat.value}</div>
                    <div className="text-xs font-mono tracking-widest mt-1">{stat.label}</div>
                  </div>
                  <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'var(--primary)' }} />
                </div>
              ))}
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
                  className="group relative inline-block px-8 py-4 bg-black text-white text-lg font-bold uppercase tracking-wider border-4 border-black hover:bg-white hover:text-black transition-colors"
                >
                  <span className="flex items-center gap-2">
                    View Work
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Link>
              </MagneticEffect>

              <MagneticEffect className="inline-block">
                <Link
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block px-8 py-4 bg-white text-black text-lg font-bold uppercase tracking-wider border-4 border-black transition-colors relative overflow-hidden"
                >
                  <span className="relative z-10">Resume</span>
                  <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" style={{ backgroundColor: 'var(--primary)' }} />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-white z-20 transition-opacity">Resume</span>
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
                { icon: Github, href: profile.social.github, label: 'GH' },
                { icon: Linkedin, href: profile.social.linkedin, label: 'LI' },
                { icon: Mail, href: `mailto:${profile.contact.email}`, label: 'EM' },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'EM' ? '_blank' : undefined}
                  rel={social.label !== 'EM' ? 'noopener noreferrer' : undefined}
                  className="group relative w-16 h-16 flex items-center justify-center bg-white border-4 border-black hover:bg-black transition-colors"
                >
                  <social.icon className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-black opacity-0 group-hover:opacity-100 transition-opacity">
                    {social.label}
                  </div>
                </Link>
              ))}
            </motion.div>
            </div>
          </div>

          {/* Right - Image with brutalist treatment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-2 w-full"
            style={{ perspective: 1000 }}
          >
            {/* Main image container */}
            <div className="relative aspect-square max-w-[600px] mx-auto">
              {/* Background layers - offset */}
              <div className="absolute inset-0 translate-x-8 translate-y-8" style={{ backgroundColor: 'var(--primary)' }} />
              <div className="absolute inset-0 bg-black translate-x-4 translate-y-4" />

              {/* Image with Tilt Effect */}
              <TiltEffect intensity={8}>
                <div className="relative aspect-square border-4 border-black overflow-hidden bg-gray-100 group/image">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  className="object-cover grayscale group-hover/image:grayscale-0 group-hover/image:scale-105 transition-all duration-700"
                  priority
                />
                {/* Grain texture overlay */}
                <div className="absolute inset-0 opacity-0 group-hover/image:opacity-10 transition-opacity duration-700 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

                {/* Overlay text */}
                <div className="absolute top-3 left-3 md:top-6 md:left-6 text-white px-2 py-1 md:px-4 md:py-2 font-mono text-xs md:text-sm uppercase tracking-widest border-2 border-white" style={{ backgroundColor: 'var(--primary)' }}>
                  Tech Lead
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 bg-black text-white p-3 md:p-6 font-bold text-sm md:text-xl uppercase tracking-tight border-t-4 border-white">
                  Staff Engineer @ Twilio
                </div>
                </div>
              </TiltEffect>

              {/* Floating accent block - smaller on mobile */}
              <motion.div
                animate={{
                  x: [0, -10, 0],
                  y: [0, -10, 0],
                  rotate: [0, -3, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-16 h-16 md:w-32 md:h-32 border-2 md:border-4 border-black"
                style={{ backgroundColor: 'var(--primary)' }}
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
