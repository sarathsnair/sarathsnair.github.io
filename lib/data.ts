import profile from '@/data/profile.json';
import experience from '@/data/experience.json';
import projects from '@/data/projects.json';
import education from '@/data/education.json';
import achievements from '@/data/achievements.json';
import testimonials from '@/data/testimonials.json';
import skills from '@/data/skills.json';

export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: {
    city: string;
    state: string;
    pincode: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  social: {
    github: string;
    linkedin: string;
    facebook?: string;
    twitter?: string;
    stackoverflow?: string;
    skype?: string;
  };
  resume: string;
  image: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  logo: string;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  url?: string | null;
  icon?: string;
  github?: string;
  demo?: string;
  technologies?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: 'certification' | 'award';
  showCompany: boolean;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  color: 'primary' | 'secondary' | 'accent';
  skills: string[];
}

export const getProfile = (): Profile => profile;
export const getExperience = (): Experience[] => experience;
export const getProjects = (): Project[] => projects;
export const getEducation = (): Education[] => education;
export const getAchievements = (): Achievement[] => achievements as Achievement[];
export const getTestimonials = (): Testimonial[] => testimonials;
export const getSkills = (): SkillCategory[] => skills as SkillCategory[];

export const formatDateRange = (start: string, end: string): string => {
  const formatDate = (dateStr: string): string => {
    if (dateStr === 'Present') return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return `${formatDate(start)} - ${formatDate(end)}`;
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
