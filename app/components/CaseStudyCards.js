'use client';

/**
 * CaseStudyCards — responsive 3-column grid of project cards.
 *
 * The grid uses a single Framer Motion parent with staggered children:
 * each CaseStudyCard fades + slides up 32px with an 80ms per-card delay.
 * Animation triggers once when the grid scrolls into view (useInView, once: true).
 *
 * Data lives in the `caseStudies` array below — add new entries here and
 * also update generateStaticParams + sitemap.js for the detail page to be built.
 *
 * Card anatomy: number badge · outcome badge (green dot = live product) ·
 * title · client type · tagline · tech tags · "Read case study →" link.
 */

import Link from 'next/link';
import { m, useInView } from 'framer-motion';
import { useRef } from 'react';

const caseStudies = [
  {
    number: '01',
    slug: 'aafes-shop-my-exchange',
    title: 'AAFES — Shop My Exchange',
    client: 'Enterprise Headless Commerce',
    tagline: 'Composable storefront on Frontastic with AI personalisation, Flutter mobile, and Node.js backend — serving military customers across 50+ countries.',
    tags: ['Frontastic', 'Flutter', 'Node.js', 'Enterprise'],
    outcome: 'Active engagement',
    live: false,
    featured: true,
    image: '/images/cs/aafes.gif',
  },
  {
    number: '02',
    slug: 'bright-smile',
    title: 'Bright Smile',
    client: 'Dental Clinic Platform',
    tagline: 'Complete clinic management system on Firebase serverless — zero infrastructure, real-time sync, role-based access for admin, doctor, and staff.',
    tags: ['Flutter', 'Firebase', 'Serverless'],
    outcome: 'Live product',
    live: true,
    image: '/images/cs/healthcare.jpg',
  },
  {
    number: '03',
    slug: 'nari-care',
    title: 'NariCare',
    client: 'Gynecology & Obstetrics',
    tagline: 'Women\'s health clinic platform with ANC tracking, IVF cycles, lab results, and automated reminders — serverless Firebase backend.',
    tags: ['Flutter', 'Firebase', 'Serverless'],
    outcome: 'Live product',
    live: true,
    image: '/images/cs/nari-care.jpg',
  },
  {
    number: '04',
    slug: 'algotrader-pro',
    title: 'AlgoTrader Pro',
    client: 'Personal Project',
    tagline: 'Algorithmic trading platform for Indian stocks and crypto — strategy builder, backtesting on historical data, TradingView-style charts. Deployed serverlessly on Vercel.',
    tags: ['Next.js', 'Vercel', 'FinTech'],
    outcome: 'Live product',
    live: true,
    image: '/images/cs/finance.jpg',
  },
  {
    number: '05',
    slug: 'job-search-agent',
    title: 'Job Search Agent',
    client: 'Personal AI Project',
    tagline: 'Multi-agent pipeline that fetches real jobs, scores them against a résumé, tailors the résumé, and writes a cover letter — fully autonomous, end to end.',
    tags: ['Python', 'CrewAI', 'Groq', 'Multi-Agent'],
    outcome: 'Personal project',
    live: false,
    image: '/images/cs/jobs.gif',
  },
  {
    number: '06',
    slug: 'microservices-on-gcp',
    title: 'Microservices on GCP',
    client: 'SaaS Backend Migration',
    tagline: 'Node.js monolith extracted into independently deployable Cloud Run services with Pub/Sub event bus, Java Spring Boot for high-throughput domains, Terraform IaC.',
    tags: ['Node.js', 'Java', 'Spring Boot', 'GCP'],
    outcome: '5 services extracted',
    live: false,
    image: '/images/cs/gcp.jpg',
  },
  {
    number: '07',
    slug: 'bs-food-beverage',
    title: 'BS Food & Beverage',
    client: 'Business Operations Platform',
    tagline: 'Web-first operations platform unifying inventory and staff workflows — Flutter Web, Firebase serverless backend, real-time sync across all devices.',
    tags: ['Flutter Web', 'Firebase', 'Serverless'],
    outcome: 'Live product',
    live: true,
    image: '/images/cs/retail.gif',
  },
];

function CaseStudyCard({ study, index }) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 },
        },
      }}
      className={`flex flex-col ${study.featured ? 'sm:col-span-2 lg:col-span-1' : ''}`}
    >
      <Link href={`/case-studies/${study.slug}`} className="block group flex-1">
        <div
          className="rounded-xl h-full flex flex-col transition-colors duration-[330ms]"
          style={{ border: '1px solid #EEEEEE' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3E6AE1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EEEEEE'; }}
        >
          <div className="p-7 flex flex-col flex-1">
          {/* Number + status */}
          <div className="flex items-start justify-between mb-5">
            <span
              className="font-medium text-sm transition-colors duration-[330ms] group-hover:text-[#3E6AE1]"
              style={{ color: '#D0D1D2' }}
            >
              {study.number}
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded"
              style={{ backgroundColor: '#F4F4F4', color: '#5C5E62' }}
            >
              {study.live && (
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#22c55e' }} aria-hidden="true" />
              )}
              {study.outcome}
            </span>
          </div>

          {/* Title + client */}
          <h3
            className="font-medium mb-1 transition-colors duration-[330ms] group-hover:text-[#3E6AE1]"
            style={{ fontSize: '18px', color: '#171A20' }}
          >
            {study.title}
          </h3>
          <p className="text-xs mb-4" style={{ color: '#8E8E8E' }}>
            {study.client}
          </p>

          {/* Tagline */}
          <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#5C5E62' }}>
            {study.tagline}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded"
                style={{ border: '1px solid #EEEEEE', color: '#5C5E62' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div
            className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-[330ms] group-hover:text-[#3E6AE1]"
            style={{ color: '#8E8E8E' }}
          >
            <span>Read case study</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          </div>
        </div>
      </Link>
    </m.div>
  );
}

export default function CaseStudyCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <m.div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {caseStudies.map((study, i) => (
        <CaseStudyCard key={study.slug} study={study} index={i} />
      ))}
    </m.div>
  );
}
