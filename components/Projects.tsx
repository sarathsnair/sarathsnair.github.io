'use client';

import { getProjects, type Project } from '@/lib/data';
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { textStyles, colorStyles } from '@/lib/styles';
import Link from 'next/link';
import { Github, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = getProjects();

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Card index={index} padding="md">

        {/* Header */}
        <div className="mb-4">
          <h3 className={`${textStyles.h3} mb-2`}>
            {project.title}
          </h3>
          {project.description && (
            <p className="text-sm md:text-base leading-[1.7] text-black">
              {project.description}
            </p>
          )}
        </div>

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 md:gap-2.5 mb-6">
            {project.technologies.map((tech: string, i: number) => (
              <Badge key={i} variant="primary" className="whitespace-nowrap">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 mt-auto">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 bg-white border-2 border-black font-bold uppercase text-xs tracking-wider hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 border-2 border-black font-bold uppercase text-xs tracking-wider text-white transition-colors flex items-center justify-center gap-2 group/btn"
              style={colorStyles.primaryBg}
            >
              <span>Demo</span>
              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>
    </Card>
  );
}

export default function Projects() {
  const { scrollY } = useScroll();

  // Parallax effect for decorative block - optimized for mobile
  const yBlock = useTransform(scrollY, [400, 1200], [0, -120]);

  return (
    <section id="projects" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Decorative blocks with parallax */}
      <motion.div
        className="absolute top-40 left-0 w-48 md:w-72 h-48 md:h-72 -rotate-12 -translate-x-24 md:-translate-x-36"
        style={{ backgroundColor: 'var(--primary)', opacity: 0.1, y: yBlock }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          label="Hobby Projects"
          title="Personal"
          subtitle="Projects"
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
