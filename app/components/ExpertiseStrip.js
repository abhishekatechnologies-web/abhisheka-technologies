'use client';

import { Reveal } from '@/app/components/ScrollReveal';

const languages = [
  { name: 'Java', note: 'Spring Boot · enterprise APIs' },
  { name: 'Kotlin', note: 'Android · JVM' },
  { name: 'Swift', note: 'iOS · native' },
  { name: 'Android', note: 'Java · Kotlin · native' },
  { name: 'Flutter', note: 'cross-platform · production' },
  { name: 'Node.js', note: 'TypeScript · REST · APIs' },
];

const tools = [
  'Firebase', 'GCP', 'Vercel', 'Frontastic',
  'CrewAI', 'Groq', 'Docker', 'Terraform',
  'Spring Boot', 'Next.js', 'GoRouter', 'BLoC',
];

export default function ExpertiseStrip() {
  return (
    <div className="py-16 px-6" style={{ backgroundColor: '#F4F4F4', borderTop: '1px solid #EEEEEE' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          {/* Primary languages */}
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: '#8E8E8E' }}>
            Primary languages
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="rounded-xl px-4 py-4 bg-white"
                style={{ border: '1px solid #EEEEEE' }}
              >
                <p className="font-medium text-sm mb-0.5" style={{ color: '#171A20' }}>
                  {lang.name}
                </p>
                <p className="text-xs leading-snug" style={{ color: '#8E8E8E' }}>
                  {lang.note}
                </p>
              </div>
            ))}
          </div>

          {/* Tools & platforms */}
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#8E8E8E' }}>
            Platforms &amp; tools
          </p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="text-xs font-medium px-3 py-1.5 rounded bg-white"
                style={{ border: '1px solid #EEEEEE', color: '#5C5E62' }}
              >
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
