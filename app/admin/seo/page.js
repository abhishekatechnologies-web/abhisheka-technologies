'use client';

import { useState, useEffect } from 'react';

const DEFAULT_PAGES = [
  {
    key: 'home',
    label: 'Home',
    defaults: {
      title: 'Abhisheka Technologies — Tech Consulting',
      description:
        'Technology consulting for startups and SMEs. Strategy, product development, headless commerce, AI integration, and technical leadership.',
      keywords: 'tech consulting, technology strategy, AI integration, product development, headless commerce, Flutter, Node.js, fractional CTO',
    },
  },
  {
    key: 'case-study-aafes',
    label: 'Case Study: AAFES — Shop My Exchange',
    defaults: {
      title: 'AAFES Shop My Exchange — Abhisheka Technologies',
      description:
        'Enterprise headless commerce platform on Frontastic with Flutter mobile, Node.js backend, and Monetate AI personalisation — serving military customers across 50+ countries.',
      keywords: 'headless commerce, Frontastic, Flutter, Node.js, enterprise, e-commerce, Monetate, composable storefront',
    },
  },
  {
    key: 'case-study-bright-smile',
    label: 'Case Study: Bright Smile',
    defaults: {
      title: 'Bright Smile Dental Clinic Platform — Abhisheka Technologies',
      description:
        'Complete dental clinic management system built on Firebase serverless — real-time sync, role-based access, digital dental charting, and PDF invoice generation.',
      keywords: 'Flutter, Firebase, serverless, clinic management, healthcare, dental, BLoC',
    },
  },
  {
    key: 'case-study-nari-care',
    label: 'Case Study: NariCare',
    defaults: {
      title: 'NariCare Women\'s Health Platform — Abhisheka Technologies',
      description:
        'Gynaecology and obstetrics clinic system with ANC tracking, IVF cycles, ultrasound reports, and automated reminders — built serverlessly on Firebase.',
      keywords: 'Flutter, Firebase, serverless, OB-GYN, gynaecology, obstetrics, antenatal care, healthcare',
    },
  },
  {
    key: 'case-study-algotrader',
    label: 'Case Study: AlgoTrader Pro',
    defaults: {
      title: 'AlgoTrader Pro — Abhisheka Technologies',
      description:
        'Algorithmic trading platform for Indian stocks and crypto with strategy builder and backtesting — deployed serverlessly on Vercel.',
      keywords: 'Next.js, Vercel, serverless, algorithmic trading, fintech, India, backtesting, NSE',
    },
  },
  {
    key: 'case-study-job-search-agent',
    label: 'Case Study: Job Search Multi-Agent System',
    defaults: {
      title: 'Job Search Multi-Agent System — Abhisheka Technologies',
      description:
        'Fully autonomous multi-agent pipeline using CrewAI and Groq that fetches jobs, scores them against a résumé, tailors the résumé, and writes a cover letter.',
      keywords: 'CrewAI, Groq, multi-agent AI, Python, LLM, job search automation, AI agents',
    },
  },
  {
    key: 'case-study-microservices-gcp',
    label: 'Case Study: Microservices on GCP',
    defaults: {
      title: 'Microservices Migration on GCP — Abhisheka Technologies',
      description:
        'Node.js monolith extracted into independently deployable Google Cloud Run services with Pub/Sub event bus and Java Spring Boot for high-throughput domains.',
      keywords: 'Node.js, Java, Spring Boot, GCP, Cloud Run, microservices, Pub/Sub, Terraform, Docker',
    },
  },
  {
    key: 'case-study-bs-food',
    label: 'Case Study: BS Food & Beverage',
    defaults: {
      title: 'BS Food & Beverage Business Platform — Abhisheka Technologies',
      description:
        'Web-first operations platform unifying inventory and staff workflows on Firebase serverless — Flutter Web, real-time sync, no app install required.',
      keywords: 'Flutter Web, Firebase, serverless, inventory management, business operations, Cloud Firestore',
    },
  },
];

function useSeoData(key, defaults) {
  const storageKey = `at_seo_${key}`;
  const [data, setData] = useState(defaults);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setData(JSON.parse(stored));
    } catch (e) {}
  }, [storageKey]);

  const save = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {}
  };

  return { data, setData, save, saved };
}

function SeoPageEditor({ page }) {
  const { data, setData, save, saved } = useSeoData(page.key, page.defaults);

  const inputClass =
    'w-full border border-cloud rounded px-4 py-2.5 text-sm text-graphite placeholder-pewter transition-colors duration-330 focus:border-blue focus:outline-none';

  return (
    <div
      className="bg-white rounded-xl p-7 mb-5"
      style={{ border: '1px solid #EEEEEE' }}
    >
      <h3
        className="font-medium mb-5"
        style={{ fontSize: '15px', color: '#171A20' }}
      >
        {page.label}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-widest mb-1.5" style={{ color: '#9E9E9E' }}>
            Meta Title
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
            className={inputClass}
          />
          <p className="text-xs mt-1" style={{ color: '#9E9E9E' }}>
            {data.title.length}/60 characters
          </p>
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-widest mb-1.5" style={{ color: '#9E9E9E' }}>
            Meta Description
          </label>
          <textarea
            rows={2}
            value={data.description}
            onChange={(e) =>
              setData((d) => ({ ...d, description: e.target.value }))
            }
            className={`${inputClass} resize-none`}
          />
          <p className="text-xs mt-1" style={{ color: '#9E9E9E' }}>
            {data.description.length}/160 characters
          </p>
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-widest mb-1.5" style={{ color: '#9E9E9E' }}>
            Keywords
          </label>
          <input
            type="text"
            value={data.keywords}
            onChange={(e) => setData((d) => ({ ...d, keywords: e.target.value }))}
            className={inputClass}
            placeholder="comma, separated, keywords"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-5">
        <button
          onClick={save}
          className="text-sm font-medium text-white px-5 py-2.5 transition-opacity hover:opacity-85"
          style={{ backgroundColor: '#3E6AE1', borderRadius: '4px' }}
        >
          Save
        </button>
        {saved && (
          <p className="text-sm" style={{ color: '#5C5E62' }}>
            Saved.
          </p>
        )}
      </div>
    </div>
  );
}

export default function SeoManagerPage() {
  const handleExport = () => {
    const config = {};
    DEFAULT_PAGES.forEach((page) => {
      try {
        const stored = localStorage.getItem(`at_seo_${page.key}`);
        config[page.key] = stored ? JSON.parse(stored) : page.defaults;
      } catch (e) {
        config[page.key] = page.defaults;
      }
    });

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seo-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="px-8 py-10">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="font-medium mb-1" style={{ fontSize: '22px', color: '#171A20' }}>
            SEO Manager
          </h1>
          <p className="text-sm mb-2" style={{ color: '#5C5E62' }}>
            Edit metadata for each page. Changes are saved to your browser and can be exported as JSON.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex-shrink-0 text-sm font-medium px-5 py-2.5 transition-opacity hover:opacity-70"
          style={{
            border: '1px solid #EEEEEE',
            borderRadius: '4px',
            color: '#393C41',
            backgroundColor: '#FFFFFF',
          }}
        >
          Export SEO config
        </button>
      </div>

      <div
        className="p-4 rounded-xl mb-8 text-sm"
        style={{ backgroundColor: '#FFF9E6', border: '1px solid #F0D070' }}
      >
        <p style={{ color: '#7A6000' }}>
          <strong>Note:</strong> This is a content planning tool. Changes saved here update the
          exported JSON only. To push metadata changes to the live site, commit the exported
          config to your repo and redeploy.
        </p>
      </div>

      <div>
        {DEFAULT_PAGES.map((page) => (
          <SeoPageEditor key={page.key} page={page} />
        ))}
      </div>
    </div>
  );
}
