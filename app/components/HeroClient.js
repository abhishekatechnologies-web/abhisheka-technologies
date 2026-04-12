'use client';

/**
 * HeroClient — animated hero content rendered client-side.
 *
 * Extracted from the server-component page.js so Framer Motion can run in
 * the browser. Uses a single shared `variants` map with a `custom` delay
 * prop to stagger: label → headline → sub-copy → CTAs.
 *
 * The parent HeroSection supplies the dark background and scroll indicator.
 */

import Link from 'next/link';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function HeroClient() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
      {/* Label */}
      <motion.p
        custom={0.1}
        initial="hidden"
        animate="visible"
        variants={variants}
        className="text-xs uppercase tracking-widest mb-6"
        style={{ color: '#5C5E62' }}
      >
        Tech consulting · Strategy · Execution
      </motion.p>

      {/* Headline */}
      <motion.h1
        custom={0.25}
        initial="hidden"
        animate="visible"
        variants={variants}
        className="font-medium leading-tight mb-6"
        style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#FFFFFF' }}
      >
        Technology that
        <br />
        actually helps.
      </motion.h1>

      {/* Sub-copy */}
      <motion.p
        custom={0.4}
        initial="hidden"
        animate="visible"
        variants={variants}
        className="text-base leading-relaxed mb-10 max-w-lg"
        style={{ color: '#8E8E8E' }}
      >
        I help startups and growing businesses make clearer technology decisions,
        build the right things, and avoid the expensive mistakes.
      </motion.p>

      {/* CTAs */}
      <motion.div
        custom={0.55}
        initial="hidden"
        animate="visible"
        variants={variants}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/#contact"
          className="text-sm font-medium text-white px-7 py-3 transition-colors duration-[330ms] hover:bg-[#2d58c8]"
          style={{ borderRadius: '4px', backgroundColor: '#3E6AE1' }}
        >
          Let&apos;s work together
        </Link>
        <Link
          href="/#work"
          className="text-sm font-medium text-white px-7 py-3 transition-colors duration-[330ms] hover:border-white/70"
          style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          See my work
        </Link>
      </motion.div>
    </div>
  );
}
