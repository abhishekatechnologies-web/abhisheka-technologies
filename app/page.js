/**
 * HomePage — landing page root (server component).
 *
 * Assembles all landing sections in order. Interactive sections are extracted
 * as 'use client' components and imported here; this file itself stays server-
 * rendered for fast initial load and SSR-friendly metadata.
 *
 * Sections: Hero → About → Services → Case Studies → Contact
 */

import Link from 'next/link';
import NavBar from '@/app/components/NavBar';
import ContactForm from '@/app/components/ContactForm';
import ServicesSection from '@/app/components/ServicesSection';
import HeroClient from '@/app/components/HeroClient';
import AboutStats from '@/app/components/AboutStats';
import CaseStudyCards from '@/app/components/CaseStudyCards';
import { Reveal, StaggerReveal, StaggerItem } from '@/app/components/ScrollReveal';

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-6"
      style={{ backgroundColor: '#171A20' }}
    >
      <HeroClient />

      {/* Animated scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest uppercase" style={{ color: '#5C5E62' }}>
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className="animate-bounce-slow"
        >
          <path
            d="M8 0v20M1 13l7 7 7-7"
            stroke="#5C5E62"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}

// ─── About Section ───────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 px-6" style={{ backgroundColor: '#F4F4F4' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Text */}
        <Reveal>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#5C5E62' }}>
            About
          </p>
          <h2
            className="font-medium mb-6 leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#171A20' }}
          >
            A curious technologist,
            <br />not just a developer.
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: '#393C41' }}>
            <p>
              I&apos;ve shipped production software across mobile, backend, cloud, and AI — from
              native Android and iOS apps to enterprise headless commerce platforms serving
              customers in 50+ countries. The technology has always been secondary to the business
              problem it was solving.
            </p>
            <p>
              What I do is help organisations find the clearest path forward. That sometimes means
              building the product from scratch. More often it means asking better questions,
              cutting scope, and making sure the thing that gets built is the thing that was
              actually needed.
            </p>
            <p>
              I work with seed-stage startups making their first architecture decisions, SMEs
              modernising systems that have outgrown their original design, and growth-stage
              companies that need a steady hand on engineering direction without hiring a
              full-time CTO.
            </p>
          </div>
        </Reveal>

        {/* Animated stat cards */}
        <AboutStats />
      </div>
    </section>
  );
}

// ─── Case Studies Section ─────────────────────────────────────────────────────
function CaseStudiesSection() {
  return (
    <section id="work" className="py-24 px-6" style={{ backgroundColor: '#F4F4F4' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#5C5E62' }}>
            Work
          </p>
          <h2
            className="font-medium mb-14 leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#171A20' }}
          >
            Selected work.
          </h2>
        </Reveal>
        <CaseStudyCards />
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="contact" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <Reveal>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#5C5E62' }}>
            Contact
          </p>
          <h2
            className="font-medium mb-6 leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#171A20' }}
          >
            Let&apos;s work together.
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: '#5C5E62' }}>
            I&apos;m available for consulting engagements on a project or retainer basis. Whether
            you&apos;re building something new, untangling something broken, or trying to make a
            clearer technology decision — get in touch.
          </p>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#5C5E62' }}>
            I also work with clients through{' '}
            <a
              href="https://www.upwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: '#393C41' }}
            >
              Upwork
            </a>{' '}
            and{' '}
            <a
              href="https://www.fiverr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: '#393C41' }}
            >
              Fiverr
            </a>{' '}
            for well-scoped engagements.
          </p>
          <a
            href="mailto:avi.kr16@gmail.com"
            className="text-sm transition-colors duration-300 hover:text-[#2d58c8]"
            style={{ color: '#3E6AE1' }}
          >
            avi.kr16@gmail.com
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const links = [
    { label: 'Upwork', href: 'https://www.upwork.com' },
    { label: 'Fiverr', href: 'https://www.fiverr.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhishek-kumar' },
    { label: 'GitHub', href: 'https://github.com/avi-kr' },
  ];

  return (
    <footer style={{ backgroundColor: '#171A20' }} className="py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          <div>
            <p className="font-medium text-base mb-1" style={{ color: '#FFFFFF' }}>
              Abhisheka Technologies
            </p>
            <p className="text-sm" style={{ color: '#5C5E62' }}>
              Building what matters.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-300 hover:text-white"
                style={{ color: '#9E9E9E' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs" style={{ color: '#5C5E62' }}>
            &copy; 2024 Abhisheka Technologies
          </p>
          <p className="text-xs" style={{ color: '#5C5E62' }}>
            Crafted with intent.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CaseStudiesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
