'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useLazyLoad } from '@/lib/useLazyLoad';
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

const Skills = dynamic(() => import('@/components/Skills'), {
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
  // Refs for lazy loading sections
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  // Lazy load sections when they're about to enter viewport
  const loadExperience = useLazyLoad(experienceRef);
  const loadSkills = useLazyLoad(skillsRef);
  const loadTestimonials = useLazyLoad(testimonialsRef);
  const loadProjects = useLazyLoad(projectsRef);
  const loadEducation = useLazyLoad(educationRef);
  const loadAchievements = useLazyLoad(achievementsRef);

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

        <div ref={experienceRef} className="min-h-screen">
          {loadExperience && <Experience />}
        </div>

        <SectionDivider variant="blocks" />

        <div ref={skillsRef} className="min-h-screen">
          {loadSkills && <Skills />}
        </div>

        <SectionDivider variant="zigzag" />

        <div ref={testimonialsRef} className="min-h-screen">
          {loadTestimonials && <Testimonials />}
        </div>

        <SectionDivider variant="blocks" />

        <div ref={projectsRef} className="min-h-screen">
          {loadProjects && <Projects />}
        </div>

        <SectionDivider variant="line" />

        <div ref={educationRef} className="min-h-screen">
          {loadEducation && <Education />}
        </div>

        <SectionDivider variant="zigzag" />

        <div ref={achievementsRef} className="min-h-screen">
          {loadAchievements && <Achievements />}
        </div>
      </main>
      <Footer />
      <ColorPaletteSwitcher />
    </>
  );
}
