'use client';

/**
 * ServicesSection — 6-service layout with a full-width featured card.
 *
 * Layout:
 * - Row 1: 3-column grid of standard service cards (Strategy, Product, Mobile, AI, Headless).
 * - Row 2: Full-width "Cloud & Backend Engineering" featured card with 3 grouped tech panels
 *   (Serverless / Server-based / Infrastructure) to surface depth without listing technologies.
 *
 * All cards use Framer Motion StaggerReveal for scroll-triggered entrance.
 * Hover: border transitions to Electric Blue via onMouseEnter/Leave inline styles
 * (more reliable than Tailwind's group-hover for dynamic border colour).
 *
 * Icons are inline SVGs so they inherit `currentColor` and respond to Tailwind text utilities.
 */

import { Reveal, StaggerReveal, StaggerItem } from '@/app/components/ScrollReveal';

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Technology Strategy',
    description:
      'Helping startups and SMEs choose the right technology for their situation — not the trendiest option on the market. Good strategy saves months of rework.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Product Development',
    description:
      'End-to-end software delivery from initial idea to production launch. Mobile (Flutter), web (Next.js), and everything in between — keeping scope honest and timelines real.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Headless Commerce',
    description:
      'Composable storefronts that let your business team move at business speed. Frontastic, headless CMS, API-first backends — the right architecture for retail, e-commerce, and marketplace platforms at any scale.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'AI Integration',
    description:
      'Embedding practical AI into existing workflows and products without disrupting what already works. No pilots that never ship — just working integrations.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Technical Leadership',
    description:
      'Fractional CTO and tech lead support for growing teams — engineering direction, architecture decisions, hiring guidance, and code quality on a flexible basis.',
  },
];

const featuredService = {
  icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="15" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18.5 14v7M15 17.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  title: 'Cloud & Backend Engineering',
  description:
    'Scalable systems designed for real load and real failure. I work across the full backend spectrum — serverless Firebase and Vercel for event-driven and cost-efficient workloads; server-based microservices on GCP Cloud Run for latency-sensitive services; Java Spring Boot for enterprise-grade throughput; Node.js for lightweight API surfaces. Knowing when to use each is the actual skill.',
  groups: [
    {
      label: 'Serverless',
      items: ['Firebase', 'Cloud Functions', 'Vercel', 'Cloud Run'],
    },
    {
      label: 'Server-based',
      items: ['Node.js', 'Java', 'Spring Boot', 'GCP', 'Docker'],
    },
    {
      label: 'Infrastructure',
      items: ['Pub/Sub', 'Cloud SQL', 'Terraform', 'REST & GraphQL'],
    },
  ],
};

function ServiceCard({ service }) {
  return (
    <StaggerItem>
      <div
        className="rounded-xl p-7 h-full transition-colors duration-[330ms]"
        style={{ border: '1px solid #EEEEEE', cursor: 'default' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3E6AE1'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EEEEEE'; }}
      >
        <span className="block mb-5" style={{ color: '#3E6AE1' }}>
          {service.icon}
        </span>
        <h3 className="font-medium mb-3" style={{ fontSize: '17px', color: '#171A20' }}>
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#5C5E62' }}>
          {service.description}
        </p>
      </div>
    </StaggerItem>
  );
}

function FeaturedServiceCard({ service }) {
  return (
    <StaggerItem className="md:col-span-2 lg:col-span-3">
      <div
        className="rounded-xl p-7 transition-colors duration-[330ms]"
        style={{ border: '1px solid #EEEEEE', cursor: 'default' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3E6AE1'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EEEEEE'; }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          {/* Left — description */}
          <div className="lg:flex-1">
            <span className="block mb-5" style={{ color: '#3E6AE1' }}>
              {service.icon}
            </span>
            <h3 className="font-medium mb-3" style={{ fontSize: '17px', color: '#171A20' }}>
              {service.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#5C5E62' }}>
              {service.description}
            </p>
          </div>

          {/* Right — grouped tech */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-72 shrink-0">
            {service.groups.map((group) => (
              <div
                key={group.label}
                className="flex-1 rounded-lg p-4"
                style={{ backgroundColor: '#F4F4F4' }}
              >
                <p className="text-xs uppercase tracking-widest mb-2.5" style={{ color: '#8E8E8E' }}>
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2 py-0.5 rounded bg-white"
                      style={{ color: '#393C41', border: '1px solid #EEEEEE' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#5C5E62' }}>
            Services
          </p>
          <h2
            className="font-medium mb-14 leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#171A20' }}
          >
            What I can help with.
          </h2>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
          <FeaturedServiceCard service={featuredService} />
        </StaggerReveal>
      </div>
    </section>
  );
}
