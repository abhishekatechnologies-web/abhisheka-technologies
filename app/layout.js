import './globals.css';
import MotionProvider from '@/app/components/MotionProvider';
import PageLoader from '@/app/components/PageLoader';

// Single source of truth for the canonical site URL.
const SITE_URL = 'https://abhisheka-technologies.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Abhisheka Technologies — Tech Consulting India | Abhishek Kumar',
    template: '%s | Abhisheka Technologies',
  },
  description:
    'Independent tech consulting from Noida, India. Product strategy, Flutter & Firebase engineering, AI integration, and fractional CTO support for startups and SMEs. Founded by Abhishek Kumar.',
  applicationName: 'Abhisheka Technologies',
  authors: [{ name: 'Abhishek Kumar', url: SITE_URL }],
  creator: 'Abhishek Kumar',
  publisher: 'Abhisheka Technologies',
  keywords: [
    'Abhisheka Technologies',
    'Abhishek Kumar',
    'tech consulting India',
    'fractional CTO India',
    'Flutter consultant India',
    'Firebase consultant',
    'tech consultant Noida',
    'AI integration consulting',
    'product strategy consultant',
    'startup tech advisor',
    'SaaS consulting India',
    'dental clinic management software',
    'OB-GYN clinic software',
    'inventory management SaaS',
  ],
  verification: {
    google: 'tJh81xmv11aCgdJkVs_yfJalhgDwf6iZKMI3e8AeU4A',
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    siteName: 'Abhisheka Technologies',
    title: 'Abhisheka Technologies — Tech Consulting India',
    description:
      'Independent tech consulting from Noida, India. Product strategy, engineering, AI integration, and fractional CTO support — founded by Abhishek Kumar.',
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    images: [
      {
        url: '/images/logo-blue.png',
        width: 1200,
        height: 630,
        alt: 'Abhisheka Technologies — Tech Consulting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhisheka Technologies — Tech Consulting India',
    description: 'Tech consulting from Noida, India. Founded by Abhishek Kumar.',
    images: ['/images/logo-blue.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ─── Sitewide JSON-LD ────────────────────────────────────────────────────────
// Tells Google exactly which entity this site represents — solves the
// disambiguation problem where the AI Overview was conflating us with
// the unrelated Hyderabad-based "Abhishek Technologies".
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: 'Abhisheka Technologies',
  alternateName: 'Abhishek Kumar Tech Consulting',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-blue.png`,
  image: `${SITE_URL}/images/logo-blue.png`,
  email: 'avi.kr16@gmail.com',
  founder: { '@id': `${SITE_URL}#abhishek-kumar` },
  foundingDate: '2025',
  description:
    'Independent technology consulting practice helping startups and SMEs with product strategy, mobile and backend engineering, AI integration, and fractional CTO services. Also licenses production SaaS platforms for clinics and small businesses.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Place', name: 'Worldwide (remote)' },
  ],
  sameAs: [
    'https://www.linkedin.com/in/abhishek-kumar',
    'https://github.com/avi-kr',
    'https://www.upwork.com',
    'https://www.fiverr.com',
  ],
  knowsAbout: [
    'Flutter development',
    'Firebase serverless architecture',
    'Mobile application development',
    'Healthcare SaaS',
    'AI integration',
    'Product strategy',
    'Fractional CTO services',
    'Cloud architecture',
    'Inventory management software',
  ],
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}#abhishek-kumar`,
  name: 'Abhishek Kumar',
  givenName: 'Abhishek',
  familyName: 'Kumar',
  jobTitle: 'Founder & Technology Consultant',
  email: 'avi.kr16@gmail.com',
  url: SITE_URL,
  image: `${SITE_URL}/images/logo-blue.png`,
  worksFor: { '@id': `${SITE_URL}#organization` },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/in/abhishek-kumar',
    'https://github.com/avi-kr',
    'https://www.upwork.com',
    'https://www.fiverr.com',
  ],
  knowsAbout: [
    'Flutter',
    'Firebase',
    'Mobile development',
    'Backend engineering',
    'Cloud architecture',
    'AI integration',
    'Startup advisory',
    'Healthcare technology',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: 'Abhisheka Technologies',
  publisher: { '@id': `${SITE_URL}#organization` },
  inLanguage: 'en-IN',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, personSchema, websiteSchema]),
          }}
        />
      </head>
      <body>
        <MotionProvider>
          <PageLoader>{children}</PageLoader>
        </MotionProvider>
      </body>
    </html>
  );
}
