'use client';

import { getProfile } from '@/lib/data';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Home } from 'lucide-react';
import { useState, useEffect } from 'react';

const profile = getProfile();

const navItems = [
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'ACHIEVEMENTS', href: '#achievements' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show navbar at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <>
      {/* Desktop Navigation - Top fixed bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="w-12 h-12 border-4 border-black bg-white flex items-center justify-center group-hover:bg-black transition-colors duration-300">
              <Home className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group px-4 lg:px-6 py-3 font-bold uppercase tracking-wider text-xs lg:text-sm overflow-hidden"
              >
                <span className="relative z-10 text-black group-hover:text-white transition-colors">
                  {item.label}
                </span>
                <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block px-4 lg:px-6 py-3 text-white font-bold uppercase tracking-wider text-xs lg:text-sm border-4 transition-colors hover:bg-white group"
            style={{
              backgroundColor: 'var(--primary)',
              borderColor: 'var(--primary)',
            }}
          >
            <span className="group-hover:text-black transition-colors" style={{ color: 'white' }}>HIRE ME</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center border-4 border-black bg-white text-black hover:bg-black hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu - Full screen overlay */}
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <div className="flex flex-col h-full justify-center items-center gap-8 p-8">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-black uppercase text-white hover:text-black transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="inline-block px-12 py-6 bg-white text-black font-black text-2xl uppercase border-4 border-white hover:bg-black hover:text-white transition-colors"
              >
                HIRE ME
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}

    </>
  );
}
