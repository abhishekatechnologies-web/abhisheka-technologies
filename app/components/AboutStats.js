'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { value: 12, suffix: '+', label: 'Years building things', description: 'Across startups, agencies, and in-house teams.' },
  { value: 40, suffix: '+', label: 'Projects shipped', description: 'Mobile, backend, AI, web — from 0 to production.' },
  { value: 8, suffix: '', label: 'Industries worked in', description: 'Finance, health, logistics, retail, and more.' },
  { value: 100, suffix: '%', label: 'Repeat-client rate', description: 'People come back. That\'s the measure that matters.' },
];

function useCountUp(target, duration = 1400, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime = null;
    let animId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [shouldStart, target, duration]);

  return count;
}

function StatCard({ stat, index, isInView }) {
  const [started, setStarted] = useState(false);
  const count = useCountUp(stat.value, 1200 + index * 100, started);

  useEffect(() => {
    if (isInView && !started) {
      const timer = setTimeout(() => setStarted(true), index * 80);
      return () => clearTimeout(timer);
    }
  }, [isInView, started, index]);

  return (
    <div
      className="rounded-xl p-6 transition-colors duration-[330ms] group"
      style={{ border: '1px solid #EEEEEE', backgroundColor: '#FFFFFF' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3E6AE1'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EEEEEE'; }}
    >
      <p
        className="font-medium leading-none mb-3 tabular-nums"
        style={{ fontSize: 'clamp(32px, 4vw, 44px)', color: '#171A20' }}
      >
        {count}{stat.suffix}
      </p>
      <p className="text-sm font-medium mb-1.5" style={{ color: '#171A20' }}>
        {stat.label}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: '#5C5E62' }}>
        {stat.description}
      </p>
    </div>
  );
}

export default function AboutStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} isInView={isInView} />
      ))}
    </div>
  );
}
