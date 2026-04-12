'use client';

/**
 * MotionProvider — wraps the app with Framer Motion's LazyMotion.
 *
 * Using `domAnimation` instead of the full motion bundle cuts ~60KB from the
 * initial JS payload. All components must use `m` (from 'framer-motion')
 * instead of `motion` for this to take effect.
 */

import { LazyMotion, domAnimation } from 'framer-motion';

export default function MotionProvider({ children }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
