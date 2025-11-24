declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export const trackResumeDownload = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'resume_download', {
      event_category: 'engagement',
      event_label: 'Resume Download Click',
      value: 1,
    });
  }
};

export const trackSocialClick = (platform: 'github' | 'linkedin' | 'twitter' | 'facebook' | 'stackoverflow' | 'email') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social_click', {
      event_category: 'social',
      event_label: platform,
      social_platform: platform,
    });
  }
};

export const trackProjectClick = (projectName: string, linkType: 'demo' | 'github') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'project_click', {
      event_category: 'projects',
      event_label: `${projectName} - ${linkType}`,
      project_name: projectName,
      link_type: linkType,
    });
  }
};

export const trackExperienceClick = (companyName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'experience_click', {
      event_category: 'experience',
      event_label: companyName,
      company_name: companyName,
    });
  }
};

export const trackExternalLink = (url: string, label?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'external_link', {
      event_category: 'outbound',
      event_label: label || url,
      url: url,
    });
  }
};

export const trackSectionNavigation = (sectionName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'section_navigation', {
      event_category: 'navigation',
      event_label: sectionName,
      section: sectionName,
    });
  }
};

export const trackThemeChange = (themeName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'theme_change', {
      event_category: 'customization',
      event_label: themeName,
      theme_name: themeName,
    });
  }
};
