/**
 * Products page — marketplace for Abhisheka Technologies' SaaS products.
 *
 * Three live platforms available to license or white-label:
 *  - Bright Smile  (dental clinic management)
 *  - NariCare      (OB-GYN clinic platform)
 *  - BS Operations (business operations & inventory)
 *
 * Server component — no client interactivity needed; static content with links.
 */

import Link from 'next/link';
import NavBar from '@/app/components/NavBar';

export const metadata = {
  title: 'Products — Abhisheka Technologies',
  description:
    'Production-ready SaaS platforms for Indian clinics and businesses. Bright Smile (dental), NariCare (OB-GYN), and BS Operations (inventory). License, white-label, or customise.',
};

// ─── Product data ──────────────────────────────────────────────────────────────
const products = [
  {
    id: 'bright-smile',
    number: '01',
    name: 'Bright Smile',
    category: 'Dental Clinic Management',
    tagline: 'Complete clinic management for dental practices — paperless, serverless, ready on day one.',
    description:
      'Handles the full patient lifecycle: registration, appointments, digital dental charting, multi-phase treatment plans, billing, and GST-compliant PDF invoices. Built for single-location practices that need professional software without the professional IT overhead.',
    features: [
      'Patient records & digital FDI dental charting',
      'Appointment scheduling & queue management',
      'Multi-phase treatment plans with cost estimates',
      'GST-compliant invoicing & PDF export',
      'Role-based access — Admin, Doctor, Staff',
      'Real-time sync across all devices',
      'Firebase serverless — zero infrastructure cost',
    ],
    price: '₹1,999',
    pricePeriod: '/month',
    priceNote: 'Per clinic location. Annual billing saves 20%.',
    liveUrl: 'https://bright-smile-35523.web.app/',
    caseStudySlug: 'bright-smile',
    color: '#F0FDF4',
    accent: '#16A34A',
    accentLight: '#DCFCE7',
    industry: 'Healthcare',
    ideal: 'Dental clinics, 1–20 doctors',
    stack: 'Flutter · Firebase · Serverless',
  },
  {
    id: 'nari-care',
    number: '02',
    name: 'NariCare',
    category: 'OB-GYN Clinic Platform',
    tagline: 'Built for gynaecology and obstetrics — with the domain-specific modules no generic software covers.',
    description:
      'Covers the complete women\'s health journey: antenatal care by WHO guideline, IVF stimulation cycles, ultrasound reports, hormonal lab tracking, contraception records, and postnatal follow-up. Extended from Bright Smile — all standard clinic operations come included.',
    features: [
      'Antenatal care (full WHO visit schedule)',
      'IVF & infertility cycle tracking',
      'Ultrasound & structured lab result management',
      'Pregnancy, delivery & postnatal records',
      'Automated ANC & vaccination reminders',
      'All Bright Smile features included',
      'Firebase serverless — zero infrastructure cost',
    ],
    price: '₹2,499',
    pricePeriod: '/month',
    priceNote: 'Per clinic location. Annual billing saves 20%.',
    liveUrl: 'https://nari-care.web.app/',
    caseStudySlug: 'nari-care',
    color: '#FFF1F2',
    accent: '#E11D48',
    accentLight: '#FFE4E6',
    industry: 'Healthcare',
    ideal: 'Gynaecology & obstetrics clinics',
    stack: 'Flutter · Firebase · Serverless',
  },
  {
    id: 'bs-operations',
    number: '03',
    name: 'BS Operations',
    category: 'Business Operations & Inventory',
    tagline: 'Web-first operations platform for F&B and retail — runs in the browser, no app install required.',
    description:
      'One platform for inventory, staff, and daily business operations. Staff log in from any device through a clean browser interface. The owner gets real-time visibility without being on-site. No server to maintain, no app to update — it just works.',
    features: [
      'Real-time inventory tracking & alerts',
      'Staff management & role-based access',
      'Owner dashboard with business-wide visibility',
      'Works on any device — no app install needed',
      'Real-time sync across all devices & locations',
      'Public-facing site + staff portal under one URL',
      'Firebase serverless — zero infrastructure cost',
    ],
    price: '₹999',
    pricePeriod: '/month',
    priceNote: 'Per business location. Annual billing saves 20%.',
    liveUrl: 'https://bs-food-beverage.web.app/',
    caseStudySlug: 'bs-food-beverage',
    color: '#FFF7ED',
    accent: '#EA580C',
    accentLight: '#FFEDD5',
    industry: 'Retail & F&B',
    ideal: 'Food & beverage businesses, restaurants, retail',
    stack: 'Flutter Web · Firebase · Serverless',
  },
];

// ─── Why buy here ──────────────────────────────────────────────────────────────
const reasons = [
  {
    title: 'Already live, already used',
    body: 'These are not prototypes or demos. Real clinics and businesses are running on these platforms today. You are licensing proven, production-tested software.',
  },
  {
    title: 'Zero infrastructure overhead',
    body: 'Every product runs on Firebase serverless. No servers to provision, no databases to back up, no capacity to plan. Costs scale to near-zero when the business is closed.',
  },
  {
    title: 'White-label ready',
    body: 'Rebrand with your clinic or business name, colours, and logo. The codebase is structured for fast customisation — most white-label deployments take under a week.',
  },
  {
    title: 'Custom versions available',
    body: 'Need a module your industry requires that is not listed? The platforms are built to extend. Reach out and we will scope a custom version.',
  },
];

// ─── Product card ──────────────────────────────────────────────────────────────
function ProductCard({ product }) {
  return (
    <div
      className="rounded-xl overflow-hidden accent-border-hover"
      style={{ '--card-accent': product.accent }}
    >
      {/* Coloured header band */}
      <div
        className="px-8 py-6 flex items-start justify-between gap-4"
        style={{ backgroundColor: product.color }}
      >
        <div>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: product.accentLight, color: product.accent }}
          >
            {product.industry}
          </span>
          <h2
            className="font-medium mt-3 mb-1"
            style={{ fontSize: 'clamp(22px, 3vw, 28px)', color: '#171A20' }}
          >
            {product.name}
          </h2>
          <p className="text-sm font-medium" style={{ color: product.accent }}>
            {product.category}
          </p>
        </div>
        <span
          className="text-xs font-medium shrink-0 mt-1"
          style={{ color: product.accent, opacity: 0.5 }}
        >
          {product.number}
        </span>
      </div>

      {/* Body */}
      <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white">

        {/* Left — description + features */}
        <div className="lg:col-span-3">
          <p className="text-base leading-relaxed mb-6" style={{ color: '#393C41' }}>
            {product.description}
          </p>
          <ul className="space-y-2.5">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm" style={{ color: '#5C5E62' }}>
                <span
                  className="mt-[3px] w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: product.accentLight }}
                  aria-hidden="true"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l2 2 3-3" stroke={product.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
          <p className="text-xs mt-5" style={{ color: '#8E8E8E' }}>
            Stack: {product.stack}
          </p>
        </div>

        {/* Right — pricing + CTAs */}
        <div className="lg:col-span-2 flex flex-col justify-between gap-6">
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: product.color }}
          >
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#8E8E8E' }}>
              Pricing
            </p>
            <div className="flex items-end gap-1 mb-1">
              <span className="font-medium" style={{ fontSize: '32px', color: '#171A20', lineHeight: 1 }}>
                {product.price}
              </span>
              <span className="text-sm mb-1" style={{ color: '#5C5E62' }}>
                {product.pricePeriod}
              </span>
            </div>
            <p className="text-xs" style={{ color: '#8E8E8E' }}>
              {product.priceNote}
            </p>
            <p className="text-xs mt-2" style={{ color: '#8E8E8E' }}>
              Ideal for: {product.ideal}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:abhishekatechnologies@gmail.com?subject=Demo request — ${product.name}&body=Hi, I'd like to schedule a demo for ${product.name}.`}
              className="text-sm font-medium text-white text-center py-3 px-6 rounded transition-colors duration-[330ms] hover:bg-[#2d58c8]"
              style={{ backgroundColor: '#3E6AE1', borderRadius: '4px' }}
            >
              Request a demo
            </a>
            <a
              href={product.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-center py-3 px-6 rounded transition-colors duration-[330ms] hover:border-[#8E8E8E]"
              style={{ border: '1px solid #EEEEEE', color: '#393C41', borderRadius: '4px' }}
            >
              View live demo ↗
            </a>
            <Link
              href={`/case-studies/${product.caseStudySlug}`}
              className="text-sm text-center transition-colors duration-[330ms] hover:text-[#3E6AE1]"
              style={{ color: '#8E8E8E' }}
            >
              Read case study →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  return (
    <>
      <NavBar />
      <main>
        {/* Hero */}
        <section
          className="pt-32 pb-20 px-6"
          style={{ backgroundColor: '#171A20' }}
        >
          <div className="max-w-6xl mx-auto">
            <p className="text-xs uppercase tracking-widest mb-5" style={{ color: '#5C5E62' }}>
              Products
            </p>
            <h1
              className="font-medium leading-tight mb-6 max-w-2xl"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#FFFFFF' }}
            >
              Production SaaS, ready to deploy.
            </h1>
            <p className="text-base leading-relaxed max-w-xl mb-10" style={{ color: '#8E8E8E' }}>
              Three live platforms built for Indian clinics and businesses. License as-is, rebrand
              as your own, or commission a custom version — all running on Firebase serverless
              with zero infrastructure overhead.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:abhishekatechnologies@gmail.com?subject=Product enquiry"
                className="text-sm font-medium text-white px-7 py-3 transition-colors duration-[330ms] hover:bg-[#2d58c8]"
                style={{ borderRadius: '4px', backgroundColor: '#3E6AE1' }}
              >
                Get in touch
              </a>
              <a
                href="#products"
                className="text-sm font-medium text-white px-7 py-3 transition-colors duration-[330ms] hover:border-white/70"
                style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                Browse products
              </a>
            </div>
          </div>
        </section>

        {/* Product cards */}
        <section id="products" className="py-20 px-6" style={{ backgroundColor: '#F4F4F4' }}>
          <div className="max-w-6xl mx-auto space-y-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Why buy here */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#5C5E62' }}>
              Why license from us
            </p>
            <h2
              className="font-medium mb-14 leading-tight"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: '#171A20' }}
            >
              Not prototypes. Production systems.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {reasons.map((r) => (
                <div key={r.title}>
                  <h3 className="font-medium mb-3 text-base" style={{ color: '#171A20' }}>
                    {r.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5E62' }}>
                    {r.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom solutions CTA */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F4F4F4' }}>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h2
                className="font-medium mb-2 leading-tight"
                style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: '#171A20' }}
              >
                Need something different?
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#5C5E62' }}>
                Custom clinic systems, industry-specific modules, white-label deployments — let&apos;s scope it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="mailto:abhishekatechnologies@gmail.com?subject=Custom development enquiry"
                className="text-sm font-medium text-white px-7 py-3 transition-colors duration-[330ms] hover:bg-[#2d58c8] whitespace-nowrap"
                style={{ borderRadius: '4px', backgroundColor: '#3E6AE1' }}
              >
                Discuss a custom build
              </a>
              <Link
                href="/#work"
                className="text-sm font-medium px-7 py-3 transition-colors duration-[330ms] hover:border-[#8E8E8E] whitespace-nowrap"
                style={{ borderRadius: '4px', border: '1px solid #EEEEEE', color: '#393C41' }}
              >
                See case studies
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal footer on sub-pages */}
      <footer style={{ backgroundColor: '#171A20' }} className="py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-sm" style={{ color: '#5C5E62' }}>
            ← Back to Abhisheka Technologies
          </Link>
          <p className="text-xs" style={{ color: '#5C5E62' }}>
            &copy; 2025 Abhisheka Technologies
          </p>
        </div>
      </footer>
    </>
  );
}
