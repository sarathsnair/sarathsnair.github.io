'use client';

import { getProfile, getExperience, getEducation } from '@/lib/data';
import { useMemo } from 'react';

export default function StructuredData() {
  const profile = getProfile();
  const experience = getExperience();
  const education = getEducation();

  // Use a fixed date to prevent hydration mismatch
  const currentDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    url: 'https://sarathsnair.me',
    image: 'https://sarathsnair.me/images/profilepic.webp',
    email: profile.contact.email,
    telephone: profile.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location.city,
      addressRegion: profile.location.state,
      postalCode: profile.location.pincode,
      addressCountry: 'IN',
    },
    sameAs: [
      profile.social.github,
      profile.social.linkedin,
      profile.social.twitter,
    ].filter(Boolean),
    alumniOf: education.map(edu => ({
      '@type': 'EducationalOrganization',
      name: edu.institution,
    })),
    worksFor: experience
      .filter(exp => exp.endDate === 'Present')
      .map(exp => ({
        '@type': 'Organization',
        name: exp.company,
        url: exp.url,
      }))[0],
    hasOccupation: {
      '@type': 'Occupation',
      name: profile.title,
      occupationLocation: {
        '@type': 'City',
        name: profile.location.city,
      },
      skills: [
        'React.js',
        'TypeScript',
        'GraphQL',
        'Next.js',
        'Redux',
        'JavaScript',
        'Frontend Development',
        'UI/UX',
      ],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${profile.name} Portfolio`,
    url: 'https://sarathsnair.me',
    description: profile.bio,
    author: {
      '@type': 'Person',
      name: profile.name,
    },
    inLanguage: 'en-IN',
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2024-01-01',
    dateModified: currentDate,
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.title,
      description: profile.bio,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://sarathsnair.me',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Experience',
        item: 'https://sarathsnair.me#experience',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Projects',
        item: 'https://sarathsnair.me#projects',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Education',
        item: 'https://sarathsnair.me#education',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
