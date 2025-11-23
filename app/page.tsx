'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SectionDivider from '@/components/SectionDivider';

// Lazy load heavy visual effects
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
});

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), {
  ssr: false,
});

const PageLoader = dynamic(() => import('@/components/PageLoader'), {
  ssr: false,
});

const KeyboardNav = dynamic(() => import('@/components/KeyboardNav'), {
  ssr: false,
});

// Lazy load below-the-fold components for faster initial page load
const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});

const Projects = dynamic(() => import('@/components/Projects'), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});

const Education = dynamic(() => import('@/components/Education'), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});

const Achievements = dynamic(() => import('@/components/Achievements'), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
});

const ColorPaletteSwitcher = dynamic(() => import('@/components/ColorPaletteSwitcher'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <KeyboardNav />
      {/* Only load one background effect - Three.js is more impressive but heavier */}
      <ThreeBackground />
      <Header />
      <main>
        <Hero />
        <SectionDivider variant="line" />
        <Experience />
        <SectionDivider variant="blocks" />
        <Testimonials />
        <SectionDivider variant="zigzag" />
        <Projects />
        <SectionDivider variant="blocks" />
        <Education />
        <SectionDivider variant="line" />
        <Achievements />
      </main>
      <Footer />
      <ColorPaletteSwitcher />
    </>
  );
}
