import './globals.css';
import MotionProvider from '@/app/components/MotionProvider';

export const metadata = {
  title: 'Abhisheka Technologies — Tech Consulting',
  description:
    'Technology consulting for startups and SMEs. Strategy, product development, AI integration, and technical leadership.',
  keywords:
    'tech consulting, technology strategy, AI integration, product development, fractional CTO, Upwork, Fiverr',
  openGraph: {
    siteName: 'Abhisheka Technologies',
    title: 'Abhisheka Technologies — Tech Consulting',
    description:
      'Technology consulting for startups and SMEs. Strategy, product development, AI integration, and technical leadership.',
    type: 'website',
    url: 'https://abhisheka-technologies.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhisheka Technologies — Tech Consulting',
    description:
      'Technology consulting for startups and SMEs. Strategy, product development, AI integration, and technical leadership.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><MotionProvider>{children}</MotionProvider></body>
    </html>
  );
}
