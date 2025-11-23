'use client';

import { getProfile } from '@/lib/data';
import Link from 'next/link';
import { Github, Linkedin, Mail, MapPin, ArrowUp } from 'lucide-react';

const profile = getProfile();

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-black text-white py-20 md:py-32 overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 opacity-10" style={{ backgroundColor: 'var(--primary)' }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-16">
          {/* Left - Contact */}
          <div>
            <div className="inline-block px-6 py-2 bg-white text-black text-sm font-mono uppercase tracking-widest mb-6">
              Get In Touch
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
              <span className="block">Let&apos;s Work</span>
              <span className="block" style={{ color: 'var(--primary)' }}>Together</span>
            </h2>

            <div className="space-y-4 mb-8">
              <Link
                href={`mailto:${profile.contact.email}`}
                className="group flex items-center gap-3 text-xl font-bold hover:translate-x-2 transition-transform"
              >
                <Mail className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                <span>{profile.contact.email}</span>
              </Link>
              {profile.location && (
                <div className="flex items-start gap-3 text-lg">
                  <MapPin className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                  <span>
                    {profile.location.city}, {profile.location.state}
                  </span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Github, href: profile.social.github, label: 'Github' },
                { icon: Linkedin, href: profile.social.linkedin, label: 'LinkedIn' },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 border-4 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right - Quick Links */}
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Quick Links</h3>
            <nav className="space-y-3">
              {[
                { label: 'Experience', href: '#experience' },
                { label: 'Projects', href: '#projects' },
                { label: 'Education', href: '#education' },
                { label: 'Achievements', href: '#achievements' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-lg font-bold hover:translate-x-2 transition-transform"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="mt-8 px-6 py-3 bg-white text-black border-4 border-white font-black uppercase text-sm tracking-wider transition-colors flex items-center gap-2 group"
              style={{
                boxShadow: '4px 4px 0 var(--primary)',
              }}
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-4 border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-mono text-sm uppercase tracking-wider">
              © {currentYear} {profile.name}. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
