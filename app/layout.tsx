import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getProfile } from '@/lib/data';
import StructuredData from '@/components/StructuredData';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const profile = getProfile();

export const metadata: Metadata = {
  metadataBase: new URL('https://sarathsnair.me'),
  title: {
    default: `${profile.name} - ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.bio,
  keywords: [
    'Sarath S Nair',
    'Staff Software Engineer',
    'Twilio Engineer',
    'Salesforce Engineer',
    'React Developer',
    'TypeScript Expert',
    'Frontend Architect',
    'UI/UX Developer',
    'Next.js Developer',
    'GraphQL Developer',
    'JavaScript Expert',
    'Web Development',
    'Bangalore Software Engineer',
    'Portfolio',
    'Micro-frontend',
    'Monorepo Architecture',
  ],
  authors: [{ name: profile.name, url: 'https://sarathsnair.me' }],
  creator: profile.name,
  publisher: profile.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sarathsnair.me',
    title: `${profile.name} - ${profile.title}`,
    description: profile.bio,
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: '/images/profilepic.png',
        width: 1200,
        height: 630,
        alt: `${profile.name} - Professional Portfolio`,
        type: 'image/png',
      },
    ],
    emails: [profile.contact.email],
    phoneNumbers: [profile.contact.phone],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} - ${profile.title}`,
    description: profile.bio,
    creator: '@sarath_snair',
    images: ['/images/profilepic.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://sarathsnair.me',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <StructuredData />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
