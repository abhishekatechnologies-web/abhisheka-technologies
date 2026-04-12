'use client';

import { useEffect, useRef } from 'react';
import { m, useInView, useAnimation } from 'framer-motion';

/**
 * Wraps children in a m.div that fades + slides up when scrolled into view.
 * Respects prefers-reduced-motion automatically via Framer Motion.
 */
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <m.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay } },
      }}
    >
      {children}
    </m.div>
  );
}

/**
 * Staggered reveal container — children animate in sequence.
 */
export function StaggerReveal({ children, className = '', stagger = 0.1 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <m.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </m.div>
  );
}

/**
 * Individual stagger child — use inside StaggerReveal.
 */
export function StaggerItem({ children, className = '' }) {
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </m.div>
  );
}
