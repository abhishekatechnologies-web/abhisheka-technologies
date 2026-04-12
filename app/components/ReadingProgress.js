'use client';

/**
 * ReadingProgress — fixed 2px Electric Blue progress bar at the top of the viewport.
 *
 * Tracks scroll position as a percentage of total scrollable height.
 * Passive scroll listener keeps the main thread unblocked.
 * Used on case study detail pages to give readers a sense of how far through they are.
 *
 * Renders above the NavBar (z-[60]) with an accessible progressbar role.
 */

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
      style={{ backgroundColor: 'transparent' }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%`, backgroundColor: '#3E6AE1' }}
      />
    </div>
  );
}
