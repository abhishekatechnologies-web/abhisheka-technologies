'use client';

/**
 * PageLoader — full-screen loader overlay with 3-ball bounce animation.
 *
 * Strategy: the loader is a fixed overlay (z-[200]) that sits above all content.
 * It shows immediately on mount (covers any SSR flash), waits for the page's
 * `load` event (all assets ready), then holds for a minimum of 500ms so the
 * bounce animation looks intentional rather than like a glitch.
 *
 * Once dismissed, AnimatePresence fades the overlay out and the main content
 * fades up — giving a single controlled reveal instead of sections popping in.
 *
 * Uses `m` (not `motion`) to stay within the LazyMotion budget.
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';

const MIN_DISPLAY_MS = 500;

export default function PageLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = Date.now();

    const dismiss = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => setLoading(false), wait);
    };

    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', dismiss, { once: true });
    }
  }, []);

  return (
    <>
      {/* Loader overlay */}
      <AnimatePresence>
        {loading && (
          <m.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ backgroundColor: '#171A20' }}
            aria-label="Loading"
            aria-live="polite"
          >
            {/* 3 bouncing dots */}
            <div className="flex items-center gap-3">
              {[0, 1, 2].map((i) => (
                <m.span
                  key={i}
                  className="block rounded-full"
                  style={{ width: 10, height: 10, backgroundColor: '#3E6AE1' }}
                  animate={{ y: [0, -14, 0] }}
                  transition={{
                    duration: 0.55,
                    repeat: Infinity,
                    delay: i * 0.14,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Page content — fades in after loader exits */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {children}
      </m.div>
    </>
  );
}
